const revealNodes = document.querySelectorAll("[data-reveal]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -8% 0px",
  }
);

revealNodes.forEach((node) => revealObserver.observe(node));

const parallaxNodes = document.querySelectorAll("[data-parallax]");

if (parallaxNodes.length > 0 && !prefersReducedMotion) {
  let ticking = false;

  const updateParallax = () => {
    const viewportCenter = window.innerHeight / 2;

    parallaxNodes.forEach((node) => {
      const speed = Number(node.dataset.parallax || 0.06);
      const rect = node.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const distance = elementCenter - viewportCenter;
      const shift = distance * speed * -0.18;

      node.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0)`;
    });

    ticking = false;
  };

  updateParallax();

  const requestParallax = () => {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(updateParallax);
  };

  document.addEventListener("scroll", requestParallax, { passive: true });
  window.addEventListener("resize", requestParallax);
}

const backToTop = document.querySelector(".back-to-top");

if (backToTop) {
  const toggleBackToTop = () => {
    backToTop.classList.toggle("is-visible", window.scrollY > 320);
  };

  toggleBackToTop();
  document.addEventListener("scroll", toggleBackToTop, { passive: true });

  backToTop.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  });
}
