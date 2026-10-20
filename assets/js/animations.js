/* ==========================================================================
   animations.js — subtle scroll parallax for decorative background layers and
   reveal-on-scroll for sections. Both are skipped entirely when the visitor
   prefers reduced motion.

   Parallax: add data-parallax="0.2" to a decorative, aria-hidden element.
   The value is how much slower than the page it moves (0 = scrolls normally,
   0.3 = noticeably slower). Keep values between 0.05 and 0.35.

   Reveal: add data-reveal to a section or block. It fades in when scrolled
   into view. Elements already on screen at load are never hidden.
   ========================================================================== */
(function () {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- Parallax ---------- */
  function initParallax() {
    const nodes = document.querySelectorAll("[data-parallax]");
    if (!nodes.length) return;

    const layers = Array.prototype.map.call(nodes, function (node) {
      return {
        node: node,
        speed: Math.max(-0.5, Math.min(0.5, parseFloat(node.dataset.parallax) || 0)),
        scope: node.closest("section, header, .hero, .page-hero, .cta") || node.parentElement,
        start: 0,
        visible: true
      };
    });

    let enabled = false;
    let ticking = false;

    // Measure once (and on resize) instead of on every scroll event.
    // `start` is the scroll position at which the scope enters the viewport,
    // so layers sit at their natural position when first seen.
    function measure() {
      const scrollY = window.scrollY;
      const viewport = window.innerHeight;
      layers.forEach(function (layer) {
        const top = layer.scope.getBoundingClientRect().top + scrollY;
        layer.start = Math.max(0, top - viewport);
      });
    }

    function update() {
      ticking = false;
      const scrollY = window.scrollY;
      layers.forEach(function (layer) {
        if (!layer.visible) return;
        const offset = Math.max(0, scrollY - layer.start) * layer.speed;
        layer.node.style.transform = "translate3d(0, " + offset.toFixed(1) + "px, 0)";
      });
    }

    function requestUpdate() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }

    function onResize() {
      measure();
      requestUpdate();
    }

    // Only animate layers whose section is on screen.
    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
              layers.forEach(function (layer) {
                if (layer.scope === entry.target) layer.visible = entry.isIntersecting;
              });
            });
          })
        : null;

    function setEnabled(on) {
      if (on === enabled) return;
      enabled = on;
      if (on) {
        measure();
        layers.forEach(function (layer) {
          if (observer) observer.observe(layer.scope);
        });
        window.addEventListener("scroll", requestUpdate, { passive: true });
        window.addEventListener("resize", onResize, { passive: true });
        requestUpdate();
      } else {
        if (observer) observer.disconnect();
        window.removeEventListener("scroll", requestUpdate);
        window.removeEventListener("resize", onResize);
        layers.forEach(function (layer) {
          layer.node.style.transform = "";
        });
      }
    }

    setEnabled(!reducedMotion.matches);
    reducedMotion.addEventListener("change", function (event) {
      setEnabled(!event.matches);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    if (reducedMotion.matches || !("IntersectionObserver" in window)) return;

    const viewport = window.innerHeight;
    const pending = Array.prototype.filter.call(document.querySelectorAll("[data-reveal]"), function (node) {
      return node.getBoundingClientRect().top > viewport * 0.9;
    });
    if (!pending.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px" }
    );

    pending.forEach(function (node) {
      node.classList.add("reveal");
      observer.observe(node);
    });
  }

  initParallax();
  initReveal();
})();
