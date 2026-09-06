/* ════════════════════════════════════════════
   main.js – Portfolio interactions
   ════════════════════════════════════════════ */

// ── Navbar scroll effect ──────────────────────
const navbar = document.getElementById("navbar");
const scrollThreshold = 40;

function onScroll() {
  navbar.classList.toggle("scrolled", window.scrollY > scrollThreshold);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll(); // run once on load

// ── Mobile hamburger menu ─────────────────────
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.getElementById("mobile-menu");

hamburger.addEventListener("click", () => {
  const expanded = hamburger.getAttribute("aria-expanded") === "true";
  hamburger.setAttribute("aria-expanded", String(!expanded));
  mobileMenu.hidden = expanded;
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.setAttribute("aria-expanded", "false");
    mobileMenu.hidden = true;
  });
});

// ── Scroll-reveal (Intersection Observer) ────
const revealEls = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

revealEls.forEach(el => observer.observe(el));

// ── Smooth active nav highlighting ───────────
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a, .mobile-menu a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach(s => sectionObserver.observe(s));
