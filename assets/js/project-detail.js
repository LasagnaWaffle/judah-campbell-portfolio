/* ==========================================================================
   project-detail.js
   Fills a project detail page from projects-data.js.    A detail page only needs:

     <article class="project-detail" data-project-detail="your-project-id"></article>

   If data-project-detail is empty, the id is read from ?id= in the URL
   (used by projects/project-template.html). Sections without data are left out.
   Requires projects-data.js and project-cards.js to load first.
   ========================================================================== */
(function () {
  "use strict";

  const root = document.querySelector("[data-project-detail]");
  const Portfolio = window.Portfolio || {};
  const utils = Portfolio.utils;
  if (!root || !utils) return;

  const el = utils.el;
  const textEl = utils.textEl;
  const hasValue = utils.hasValue;

  const id = (root.dataset.projectDetail || "").trim() || new URLSearchParams(window.location.search).get("id") || "";
  const project = id ? Portfolio.getProject(id) : null;

  function backLink() {
    return el("a", { className: "link-arrow detail-back", href: utils.resolvePath("projects.html") }, [
      utils.icon("arrow"),
      el("span", { text: "All projects" })
    ]);
  }

  function section(title, children) {
    const content = children.filter(Boolean);
    if (!content.length) return null;
    return el("section", { className: "detail-section" }, [el("h2", { text: title })].concat(content));
  }

  function list(items, className) {
    const values = (Array.isArray(items) ? items : []).filter(hasValue);
    if (!values.length) return null;
    return el(
      "ul",
      { className: className || null },
      values.map(function (item) {
        return textEl("li", item);
      })
    );
  }

  function renderNotFound() {
    root.replaceChildren(
      el("div", { className: "container detail-header" }, [
        backLink(),
        el("h1", { text: "Project not found" }),
        el("p", { className: "lead" }, [
          "No project with the id ",
          el("code", { text: '"' + (id || "") + '"' }),
          " exists in assets/js/projects-data.js. Check that the data-project-detail attribute on this page matches a project id."
        ])
      ])
    );
  }

  function renderChallenges(challenges) {
    const valid = (Array.isArray(challenges) ? challenges : []).filter(function (item) {
      return item && (hasValue(item.challenge) || hasValue(item.solution));
    });
    return valid.map(function (item) {
      const rows = [];
      if (hasValue(item.challenge)) rows.push(el("dt", { text: "Challenge" }), textEl("dd", item.challenge));
      if (hasValue(item.solution)) rows.push(el("dt", { text: "Solution" }), textEl("dd", item.solution));
      return el("article", { className: "challenge" }, [
        hasValue(item.title) ? textEl("h3", item.title) : null,
        el("dl", null, rows)
      ]);
    });
  }

  function renderGallery(gallery) {
    const items = (Array.isArray(gallery) ? gallery : []).filter(function (item) {
      return item && hasValue(item.src);
    });
    if (!items.length) return null;
    return el(
      "ul",
      { className: "gallery" },
      items.map(function (item) {
        return el("li", null, [
          el("figure", null, [
            utils.createMedia(item.src, item.alt || "", project.title, {
              className: "gallery__media",
              width: 1200,
              height: 900
            }),
            hasValue(item.caption) ? textEl("figcaption", item.caption) : null
          ])
        ]);
      })
    );
  }

  function renderInfo(details) {
    const rows = [
      ["Role", details.role],
      ["Type", project.projectType],
      ["Status", project.status],
      ["Year", project.year]
    ].filter(function (row) {
      return hasValue(row[1]);
    });

    const tags = utils.createTagList(project.technologies);
    const links = utils.projectLinks(project, { includeDetails: false, small: true });

    return el("aside", { className: "detail-aside card", "data-accent": utils.accentFor(project), "aria-label": "Project information" }, [
      rows.length
        ? el(
            "dl",
            { className: "info-list" },
            rows.map(function (row) {
              return el("div", null, [el("dt", { text: row[0] }), textEl("dd", row[1])]);
            })
          )
        : null,
      tags ? el("div", null, [el("h2", { className: "eyebrow", text: "Technologies" }), tags]) : null,
      links.length ? el("div", { className: "detail-actions" }, links) : null
    ]);
  }

  function render() {
    const details = project.details || {};
    const brandNode = document.querySelector(".nav__brand span:last-child");
    const brand = brandNode ? brandNode.textContent.trim() : "Portfolio";
    document.title = project.title + " | " + brand;
    const overview = (Array.isArray(details.overview) ? details.overview : []).filter(hasValue);
    const paragraphs = overview.length ? overview : [project.description].filter(hasValue);
    const headerLinks = utils.projectLinks(project, { includeDetails: false, primaryFirst: true });

    const header = el("header", { className: "detail-header" }, [
      backLink(),
      project.isSample
        ? el("div", { className: "notice", role: "note" }, [
            el("p", null, [
              el("strong", { text: "Sample project. " }),
              "This page shows placeholder content to demonstrate the layout. Replace it in assets/js/projects-data.js."
            ])
          ])
        : null,
      utils.createMeta(project),
      el("h1", { text: project.title }),
      hasValue(project.shortDescription) ? textEl("p", project.shortDescription, "lead") : null,
      headerLinks.length ? el("div", { className: "detail-actions" }, headerLinks) : null
    ]);

    const hero = el("figure", { className: "detail-hero" }, [
      utils.createMedia(project.frontImage, hasValue(project.frontImageAlt) ? project.frontImageAlt : "Screenshot of " + project.title, project.title, {
        eager: true
      })
    ]);

    const roleSection = section("Role and contributions", [
      hasValue(details.role) ? textEl("p", details.role) : null,
      list(details.contributions)
    ]);

    const main = el("div", null, [
      section("Overview", paragraphs.map(function (text) {
        return textEl("p", text);
      })),
      roleSection,
      section("Technical challenges", renderChallenges(details.challenges)),
      section("Screenshots and media", [renderGallery(details.gallery)])
    ]);

    root.replaceChildren(
      el("div", { className: "container" }, [header, hero, el("div", { className: "detail-layout" }, [main, renderInfo(details)])])
    );
  }

  if (project) render();
  else renderNotFound();
})();
