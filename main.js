/* ════════════════════════════════════════════
   main.js – Portfolio interactions
   ════════════════════════════════════════════ */

// ── Mobile Sidebar Drawer ────────────────────
const mobileToggle = document.getElementById("mobile-toggle");
const sidebar = document.getElementById("sidebar");
const mobileOverlay = document.getElementById("mobile-overlay");

function openSidebar() {
  sidebar?.classList.add("is-open");
  mobileOverlay?.classList.add("is-active");
  mobileToggle?.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}

function closeSidebar() {
  sidebar?.classList.remove("is-open");
  mobileOverlay?.classList.remove("is-active");
  mobileToggle?.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

if (mobileToggle) {
  mobileToggle.addEventListener("click", () => {
    const isOpen = sidebar?.classList.contains("is-open");
    if (isOpen) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });
}

if (mobileOverlay) {
  mobileOverlay.addEventListener("click", closeSidebar);
}

// Close mobile sidebar when any link inside is clicked
const sidebarLinks = document.querySelectorAll(".sidebar-link, .sidebar-status-card, .sidebar-logo");
sidebarLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      closeSidebar();
    }
  });
});

// Close with Escape key
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && sidebar?.classList.contains("is-open")) {
    closeSidebar();
  }
});

// ── Scroll-reveal (Intersection Observer) ────
const revealEls = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

revealEls.forEach((el) => observer.observe(el));

// ── Smooth active nav highlighting ───────────
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".sidebar-link");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((link) => {
          const match = link.getAttribute("href") === `#${id}`;
          link.classList.toggle("active", match);
        });
      }
    });
  },
  { rootMargin: "-30% 0px -60% 0px" }
);

sections.forEach((s) => sectionObserver.observe(s));

