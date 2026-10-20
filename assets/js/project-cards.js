/* ==========================================================================
   project-cards.js
   Renders project cards from window.Portfolio.projects (projects-data.js)
   and handles the 3D flip interaction. Also exposes small DOM helpers on
   window.Portfolio.utils for project-detail.js.

   Containers it fills:
     <div class="project-grid" data-project-grid="all"></div>       every project
     <div class="project-grid" data-project-grid="featured"></div>  featured only
     <ul class="project-list" data-project-list></ul>               compact list
   ========================================================================== */
(function () {
  "use strict";

  const Portfolio = (window.Portfolio = window.Portfolio || {});
  const projects = Array.isArray(Portfolio.projects) ? Portfolio.projects : [];
  const settings = Portfolio.settings || {};

  // This script lives in assets/js/, so the site root is two folders up. Resolving
  // data paths against it makes them work from any page depth and under a
  // GitHub Pages project subpath.
  const scriptSrc = document.currentScript ? document.currentScript.src : window.location.href;
  const SITE_ROOT = new URL("../../", scriptSrc);

  const ACCENTS = ["red", "green", "blue"];
  const CARD_TECH_LIMIT = 4;

  const ICONS = {
    flip:
      '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" focusable="false"><path d="M2.5 8a5.5 5.5 0 0 1 9.4-3.9L13.5 5.5"/><path d="M13.5 2v3.5H10"/><path d="M13.5 8a5.5 5.5 0 0 1-9.4 3.9L2.5 10.5"/><path d="M2.5 14v-3.5H6"/></svg>',
    arrow:
      '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" focusable="false"><path d="M3 8h10M9 4l4 4-4 4"/></svg>',
    external:
      '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" focusable="false"><path d="M6 3H3v10h10v-3"/><path d="M9 3h4v4M13 3 7 9"/></svg>'
  };

  /* ---------- Helpers ---------- */

  /** Returns a new SVG element for one of the static ICONS above. */
  function icon(name) {
    const template = document.createElement("template");
    template.innerHTML = ICONS[name];
    return template.content.firstElementChild;
  }

  function hasValue(value) {
    return typeof value === "string" && value.trim() !== "";
  }

  function isTodo(value) {
    return hasValue(value) && /^\s*TODO/i.test(value);
  }

  /** Resolves a site-root-relative path (or full URL) to an absolute URL. */
  function resolvePath(path) {
    if (!hasValue(path)) return "";
    try {
      return new URL(path.trim(), SITE_ROOT).href;
    } catch (error) {
      return "";
    }
  }

  function isExternal(href) {
    try {
      return new URL(href).origin !== window.location.origin;
    } catch (error) {
      return false;
    }
  }

  /**
   * Small element factory.
   * attrs: { className, text, ...attributes }. null/false values are skipped.
   * children: array of nodes or strings (falsy entries are ignored).
   */
  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    Object.entries(attrs || {}).forEach(function ([key, value]) {
      if (value === null || value === undefined || value === false) return;
      if (key === "className") node.className = value;
      else if (key === "text") node.textContent = value;
      else node.setAttribute(key, value === true ? "" : String(value));
    });
    (children || []).forEach(function (child) {
      if (child) node.append(child);
    });
    return node;
  }

  /** Paragraph/span with placeholder highlighting when the text starts with "TODO". */
  function textEl(tag, text, className) {
    const classes = [className, isTodo(text) ? "todo" : ""].filter(Boolean).join(" ");
    return el(tag, { className: classes || null, text: text });
  }

  function initials(title) {
    const words = String(title || "")
      .replace(/^sample:\s*/i, "")
      .split(/\s+/)
      .filter(Boolean);
    return words
      .slice(0, 2)
      .map(function (word) {
        return word[0].toUpperCase();
      })
      .join("");
  }

  /** Image with a generated fallback underneath (shown if src is missing or fails). */
  function createMedia(src, alt, label, options) {
    const opts = options || {};
    const media = el("div", { className: "project-media " + (opts.className || "") }, [
      el("div", { className: "project-media__fallback", "aria-hidden": "true" }, [
        el("span", { text: initials(label) })
      ])
    ]);

    const href = resolvePath(src);
    if (href) {
      const img = el("img", {
        className: "project-media__img",
        src: href,
        alt: alt || "",
        width: opts.width || 1200,
        height: opts.height || 900,
        loading: opts.eager ? "eager" : "lazy",
        decoding: "async"
      });
      img.addEventListener(
        "error",
        function () {
          img.remove();
        },
        { once: true }
      );
      media.append(img);
    }
    return media;
  }

  function createLink(def, className) {
    const href = resolvePath(def.url);
    const external = isExternal(href);
    const link = el("a", { className: className, href: href, "data-link-kind": def.kind }, [
      el("span", { text: def.label }),
      def.context ? el("span", { className: "visually-hidden", text: " for " + def.context }) : null,
      external ? el("span", { className: "visually-hidden", text: " (opens in a new tab)" }) : null,
      icon(external ? "external" : "arrow")
    ]);
    if (external) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
    return link;
  }

  /** Builds the available action links for a project; missing URLs are skipped. */
  function projectLinks(project, options) {
    const opts = options || {};
    const defs = [
      opts.includeDetails !== false && { url: project.detailsUrl, label: "View details", kind: "details" },
      { url: project.demoUrl, label: "Play / demo", kind: "demo" },
      { url: project.githubUrl, label: "GitHub", kind: "github" },
      { url: project.videoUrl, label: "Watch video", kind: "video" }
    ];
    return defs
      .filter(function (def) {
        return def && hasValue(def.url) && resolvePath(def.url);
      })
      .map(function (def, index) {
        def.context = project.title;
        const variant = index === 0 && opts.primaryFirst ? "btn--primary" : "btn--secondary";
        return createLink(def, ["btn", opts.small ? "btn--small" : "", variant].filter(Boolean).join(" "));
      });
  }

  function createMeta(project, className) {
    const items = [project.projectType, project.status, project.year].filter(hasValue);
    return el(
      "p",
      { className: className || "project-card__meta" },
      [project.isSample ? el("span", { className: "badge", text: "Sample" }) : null].concat(
        items.map(function (item) {
          return el("span", { className: "project-card__meta-item", text: item });
        })
      )
    );
  }

  function createTagList(technologies, limit) {
    const list = Array.isArray(technologies) ? technologies.filter(hasValue) : [];
    if (!list.length) return null;
    const shown = limit ? list.slice(0, limit) : list;
    const items = shown.map(function (tech) {
      return el("li", { className: "tag", text: tech });
    });
    if (list.length > shown.length) {
      const extra = list.length - shown.length;
      items.push(
        el("li", { className: "tag tag--more" }, [
          el("span", { "aria-hidden": "true", text: "+" + extra }),
          el("span", { className: "visually-hidden", text: extra + " more" })
        ])
      );
    }
    return el("ul", { className: "tag-list", "aria-label": "Technologies" }, items);
  }

  function accentFor(project) {
    if (ACCENTS.indexOf(project.accent) !== -1) return project.accent;
    const index = projects.indexOf(project);
    return ACCENTS[(index < 0 ? 0 : index) % ACCENTS.length];
  }

  function slug(value) {
    return String(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  /* ---------- Card ---------- */

  let cardCount = 0;

  function createCard(project) {
    cardCount += 1;
    const baseId = "card-" + slug(project.id || "project") + "-" + cardCount;
    const titleId = baseId + "-title";
    const backId = baseId + "-back";

    const toggle = el(
      "button",
      {
        className: "project-card__toggle",
        type: "button",
        "aria-expanded": "false",
        "aria-controls": backId
      },
      [
        icon("flip"),
        el("span", { text: "Details" }),
        el("span", { className: "visually-hidden", text: " for " + project.title })
      ]
    );

    const front = el("div", { className: "project-card__face project-card__face--front" }, [
      createMedia(project.frontImage, hasValue(project.frontImageAlt) ? project.frontImageAlt : "Screenshot of " + project.title, project.title),
      el("div", { className: "project-card__shade", "aria-hidden": "true" }),
      el("div", { className: "project-card__body" }, [
        createMeta(project),
        el("h3", { className: "project-card__title", id: titleId, text: project.title }),
        hasValue(project.shortDescription) ? textEl("p", project.shortDescription, "project-card__summary") : null
      ])
    ]);

    const links = projectLinks(project, { small: true, primaryFirst: true });
    const back = el("div", { className: "project-card__face project-card__face--back", id: backId, inert: true }, [
      createMedia(project.backImage, "", project.title),
      el("div", { className: "project-card__shade", "aria-hidden": "true" }),
      el("div", { className: "project-card__body" }, [
        createMeta(project),
        el("p", { className: "project-card__title", "aria-hidden": "true", text: project.title }),
        textEl("p", hasValue(project.description) ? project.description : project.shortDescription || "", "project-card__description"),
        createTagList(project.technologies, CARD_TECH_LIMIT),
        links.length ? el("div", { className: "project-card__links" }, links) : null,
        el("p", { className: "project-card__hint" }, [
          icon("flip"),
          el("span", { text: "Click or tap the card to flip back" })
        ])
      ])
    ]);

    return el(
      "article",
      {
        className: "project-card",
        "data-accent": accentFor(project),
        "data-project-id": project.id,
        "aria-labelledby": titleId
      },
      [toggle, el("div", { className: "project-card__inner" }, [front, back])]
    );
  }

  /* ---------- Flip interaction ---------- */

  function setFlipped(card, flipped, moveFocus) {
    const toggle = card.querySelector(".project-card__toggle");
    const front = card.querySelector(".project-card__face--front");
    const back = card.querySelector(".project-card__face--back");

    card.classList.toggle("is-flipped", flipped);
    toggle.setAttribute("aria-expanded", String(flipped));
    // inert keeps the hidden face out of the tab order and accessibility tree.
    front.toggleAttribute("inert", flipped);
    back.toggleAttribute("inert", !flipped);

    if (moveFocus) toggle.focus({ preventScroll: true });
  }

  function hasSelectedText(card) {
    const selection = window.getSelection ? window.getSelection() : null;
    return Boolean(selection && !selection.isCollapsed && card.contains(selection.anchorNode));
  }

  function handleClick(event) {
    const card = event.target.closest(".project-card");
    if (!card) return;
    // Links on the back face navigate normally and never flip the card.
    if (event.target.closest("a")) return;

    const onToggle = Boolean(event.target.closest(".project-card__toggle"));
    // Let visitors select text on the back face without flipping it away.
    if (!onToggle && hasSelectedText(card)) return;

    const flipped = !card.classList.contains("is-flipped");
    const active = document.activeElement;
    const focusWillBeHidden = active && card.contains(active) && !active.classList.contains("project-card__toggle");
    setFlipped(card, flipped, focusWillBeHidden);
  }

  function handleKeydown(event) {
    if (event.key !== "Escape") return;
    const card = event.target.closest(".project-card.is-flipped");
    if (!card) return;
    event.preventDefault();
    setFlipped(card, false, true);
  }

  function bindFlip(container) {
    if (container.dataset.flipBound) return;
    container.dataset.flipBound = "true";
    container.addEventListener("click", handleClick);
    container.addEventListener("keydown", handleKeydown);
  }

  /* ---------- Renderers ---------- */

  function getFeatured() {
    const limit = Number(settings.featuredLimit) > 0 ? Number(settings.featuredLimit) : 3;
    return projects
      .filter(function (project) {
        return project && project.featured;
      })
      .slice(0, limit);
  }

  function isRenderable(project) {
    return project && hasValue(project.id) && hasValue(project.title);
  }

  function renderGrid(container) {
    const list = (container.dataset.projectGrid === "featured" ? getFeatured() : projects).filter(isRenderable);
    if (!list.length) {
      container.replaceChildren(el("p", { className: "project-grid__empty", text: "Projects coming soon." }));
      return;
    }
    container.replaceChildren.apply(container, list.map(createCard));
    bindFlip(container);
  }

  function renderList(container) {
    const items = projects.filter(isRenderable).map(function (project) {
      const titleLink = hasValue(project.detailsUrl)
        ? el("a", { href: resolvePath(project.detailsUrl), text: project.title })
        : document.createTextNode(project.title);
      const links = projectLinks(project, { includeDetails: false, small: true });
      return el("li", { className: "project-list__item" }, [
        el("h3", { className: "project-list__title" }, [
          titleLink,
          project.isSample ? el("span", { className: "badge", text: "Sample" }) : null
        ]),
        createMeta(project, "project-card__meta"),
        hasValue(project.shortDescription) ? textEl("p", project.shortDescription) : null,
        createTagList(project.technologies),
        links.length ? el("div", { className: "detail-actions project-list__links" }, links) : null
      ]);
    });
    container.replaceChildren.apply(container, items);
  }

  document.querySelectorAll("[data-project-grid]").forEach(renderGrid);
  document.querySelectorAll("[data-project-list]").forEach(renderList);

  /* ---------- Shared API ---------- */
  Portfolio.utils = {
    el: el,
    textEl: textEl,
    hasValue: hasValue,
    isTodo: isTodo,
    resolvePath: resolvePath,
    createMedia: createMedia,
    createMeta: createMeta,
    createTagList: createTagList,
    projectLinks: projectLinks,
    accentFor: accentFor,
    icon: icon
  };

  Portfolio.getProject = function (id) {
    return projects.find(function (project) {
      return project && project.id === id;
    });
  };
})();
