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

const hero = document.querySelector(".hero");
const heroParallaxText = document.querySelector('.hero [data-parallax="text"]');
const heroParallaxImage = document.querySelector('.hero [data-parallax="image"]');

if (hero && heroParallaxText && heroParallaxImage && !prefersReducedMotion) {
  let ticking = false;

  const updateParallax = () => {
    const rect = hero.getBoundingClientRect();
    const distanceScrolled = Math.max(0, -rect.top);
    const textShift = Math.min(distanceScrolled * 0.24, 64);
    const imageShift = Math.min(distanceScrolled * 0.38, 112);
    const textOpacity = Math.max(1 - distanceScrolled / 350, 0.44);
    const imageOpacity = Math.max(1 - distanceScrolled / 600, 0.8);

    heroParallaxText.style.transform = `translate3d(0, ${textShift.toFixed(2)}px, 0)`;
    heroParallaxImage.style.transform = `translate3d(0, ${imageShift.toFixed(2)}px, 0)`;
    heroParallaxText.style.opacity = textOpacity.toFixed(3);
    heroParallaxImage.style.opacity = imageOpacity.toFixed(3);

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
