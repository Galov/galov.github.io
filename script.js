const revealNodes = document.querySelectorAll("[data-reveal]");

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

const hero = document.querySelector(".hero");
const heroVisual = document.querySelector(".hero-visual");

if (hero && heroVisual && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const updateParallax = () => {
    const rect = hero.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, 1 - rect.top / (rect.height || 1)));
    const shift = progress * 22;

    heroVisual.style.transform = `translateY(${shift}px)`;
  };

  updateParallax();
  document.addEventListener("scroll", updateParallax, { passive: true });
}
