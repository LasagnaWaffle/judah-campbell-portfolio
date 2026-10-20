/* ==========================================================================
   main.js — site-wide behaviour: mobile navigation, footer year, and the
   resume download check.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Mobile navigation ---------- */
  function initNav() {
    const toggle = document.querySelector(".nav__toggle");
    const menu = toggle && document.getElementById(toggle.getAttribute("aria-controls"));
    if (!toggle || !menu) return;

    const desktop = window.matchMedia("(min-width: 761px)");

    function isOpen() {
      return toggle.getAttribute("aria-expanded") === "true";
    }

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
    }

    toggle.addEventListener("click", function () {
      setOpen(!isOpen());
    });

    // Close after choosing a link, on Escape, or when tapping outside the nav.
    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener("click", function (event) {
      if (isOpen() && !event.target.closest(".nav")) setOpen(false);
    });

    desktop.addEventListener("change", function (event) {
      if (event.matches) setOpen(false);
    });
  }

  /* ---------- Footer year ---------- */
  function initYear() {
    const year = String(new Date().getFullYear());
    document.querySelectorAll("[data-current-year]").forEach(function (node) {
      node.textContent = year;
    });
  }

  /* ---------- Resume download ----------
     Links marked [data-resume-download] point at assets/documents/resume.pdf.
     If the server reports the file is missing, swap the link for a disabled
     notice so visitors never hit a broken link. When opened via file://,
     fetch is unavailable, so the link is left as-is. */
  function initResumeLinks() {
    const links = document.querySelectorAll("a[data-resume-download]");
    if (!links.length || !window.fetch || window.location.protocol === "file:") return;

    fetch(links[0].href, { method: "HEAD", cache: "no-store" })
      .then(function (response) {
        if (!response.ok) links.forEach(markResumeMissing);
      })
      .catch(function () {
        /* Network error: leave the link alone rather than guessing. */
      });
  }

  function markResumeMissing(link) {
    const notice = document.createElement("span");
    notice.className = link.className + " btn--disabled";
    notice.setAttribute("aria-disabled", "true");
    notice.textContent = "Resume PDF coming soon";
    link.replaceWith(notice);
  }

  initNav();
  initYear();
  initResumeLinks();
})();
