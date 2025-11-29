// scripts/app.js

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  /* =========================
     WELCOME SCREEN + YEAR
     ========================= */
  const welcome = document.getElementById("welcome-screen");
  setTimeout(() => {
    body.classList.add("page-loaded");
    if (welcome) welcome.classList.add("hidden");
    typeBranch(); // Start typing only after welcome
  }, 1400);

  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  /* =========================
     CUSTOM CURSOR
     ========================= */
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorOutline = document.querySelector(".cursor-outline");
  if (cursorDot && cursorOutline) {
    window.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      cursorDot.style.transform = `translate(${clientX}px, ${clientY}px)`;
      cursorOutline.style.transform = `translate(${clientX}px, ${clientY}px)`;
    });
  }

  /* =========================
     NAV ACTIVE ON SCROLL
     ========================= */
  const navLinks = document.querySelectorAll(".nav-link[href^='#']");
  const sections = [...navLinks].map((link) =>
    document.querySelector(link.getAttribute("href"))
  );

  function setActiveNav() {
    const scrollPos = window.scrollY;
    const offset = 120;

    sections.forEach((sec, idx) => {
      if (!sec) return;
      const top = sec.offsetTop - offset;
      const bottom = top + sec.offsetHeight;

      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach((l) => l.classList.remove("active"));
        navLinks[idx].classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveNav);
  setActiveNav();

  /* =========================
     HAMBURGER MENU
     ========================= */
  const hamburger = document.querySelector(".hamburger");
  const navList = document.querySelector(".nav-list");
  if (hamburger && navList) {
    hamburger.addEventListener("click", () =>
      navList.classList.toggle("open")
    );
    navLinks.forEach((link) =>
      link.addEventListener("click", () =>
        navList.classList.remove("open")
      )
    );
  }

/* =========================
   SINGLE-LINE CHANGING TYPING TEXT
   ========================= */

const typedBranchEl = document.getElementById("typed-branch");

const textOptions = [
  "Integrated Bachelor and Master of Technology",
  "Electronics & Communication Engineering",
  "Indian Institute of Information Technology Design & Manufacturing, Kurnool"
];

let currentTextIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeSingleLine() {
  const currentText = textOptions[currentTextIndex];

  typedBranchEl.textContent = currentText.substring(0, charIndex);

  const speed = isDeleting ? 70 : 90;

  if (!isDeleting && charIndex < currentText.length) {
    charIndex++;
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
  }

  if (charIndex === currentText.length) {
    setTimeout(() => (isDeleting = true), 1600);
  } else if (charIndex === 0 && isDeleting) {
    isDeleting = false;
    currentTextIndex = (currentTextIndex + 1) % textOptions.length;
  }

  setTimeout(typeSingleLine, speed);
}

// Start typing after welcome fade
setTimeout(typeSingleLine, 1600);


  /* =========================
     SCROLL TOP BUTTON
     ========================= */
  const scrollTopBtn = document.querySelector(".scroll-top");
  window.addEventListener("scroll", () => {
    if (!scrollTopBtn) return;
    scrollTopBtn.classList.toggle("visible", window.scrollY > 400);
  });

  /* =========================
     REVEAL ON SCROLL
     ========================= */
  const revealEls = document.querySelectorAll(".reveal-up");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("reveal-visible"));
  }

  /* =========================
     TILT EFFECT
     ========================= */
  const tiltCards = document.querySelectorAll(".tilt");
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 10;
      const rotateY = (x / rect.width) * 10;
      card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  /* =========================
     PROFILE IMAGE ROTATION
     ========================= */
  const profileImg = document.querySelector(".profile-image");
  if (profileImg) {
    window.addEventListener("scroll", () => {
      const scroll = window.scrollY;
      let rotation = scroll * 0.02;
      rotation = Math.min(Math.max(rotation, -12), 12);
      profileImg.style.transform = `rotate(${rotation}deg)`;
      if (scroll <= 5) profileImg.style.transform = "rotate(0deg)";
    });
  }

  /* =========================
     SKILL FADE ROTATOR
     ========================= */
  const rotatorEl = document.getElementById("skill-rotator");
  const skills = [
    "VLSI Design",
    "Embedded Systems",
    "PCB Design",
    "IoT Systems",
    "Drone & UAV Tech",
    "Signal Processing",
  ];
  if (rotatorEl) {
    let idx = 0;
    setInterval(() => {
      rotatorEl.classList.add("fade-out");
      setTimeout(() => {
        idx = (idx + 1) % skills.length;
        rotatorEl.textContent = skills[idx];
        rotatorEl.classList.remove("fade-out");
      }, 350);
    }, 2200);
  }

  /* =========================
     PARTICLES.JS
     ========================= */
  if (window.particlesJS) {
    particlesJS("particles-js", {
      particles: {
        number: { value: 70, density: { enable: true, value_area: 800 } },
        color: { value: ["#38bdf8", "#d946ef", "#22d3ee"] },
        shape: { type: "circle" },
        opacity: { value: 0.3, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 140,
          color: "#38bdf8",
          opacity: 0.25,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1.2,
          random: true,
          out_mode: "out",
        },
      },
      interactivity: {
        events: {
          onhover: { enable: true, mode: "repulse" },
        },
        modes: { repulse: { distance: 80, duration: 0.4 } },
      },
      retina_detect: true,
    });
  }

  /* =========================
     CYBER LINES BACKGROUND
     ========================= */
  const bg = document.getElementById("fullscreen-bg");
  if (bg) {
    for (let i = 0; i < 18; i++) {
      const line = document.createElement("div");
      line.classList.add("circuit-line");
      line.style.left = `${Math.random() * 100}%`;
      line.style.animationDelay = `${Math.random() * 6}s`;
      line.style.animationDuration = `${7 + Math.random() * 4}s`;
      bg.appendChild(line);
    }
  }

  /* =========================
     PARALLAX LAYERS
     ========================= */
  const layers = document.querySelectorAll(
    ".wafer-bg, .die-circuits, .metal-routing, .laser-scan"
  );
  document.addEventListener("mousemove", (e) => {
    let x = (e.clientX / window.innerWidth - 0.5) * 6;
    let y = (e.clientY / window.innerHeight - 0.5) * 6;
    layers.forEach((layer, i) => {
      let speed = (i + 1) * 0.6;
      layer.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });
/* =========================
   STAT COUNTER ANIMATION
   ========================= */
const statValues = document.querySelectorAll(".stat-value");
let statsStarted = false;

function animateStats() {
  if (statsStarted) return;
  statsStarted = true;

  statValues.forEach((valueEl) => {
    const targetValue = parseInt(valueEl.getAttribute("data-target") || valueEl.textContent);
    let current = 0;
    const duration = 1800; // speed of count animation (ms)
    const increment = targetValue / (duration / 30);

    const counter = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        current = targetValue;
        clearInterval(counter);
      }
      valueEl.textContent = Math.floor(current);
    }, 30);
  });
}

const heroSection = document.querySelector(".hero-stats");
if (heroSection) {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) animateStats();
    },
    { threshold: 0.4 }
  );
  observer.observe(heroSection);
}


}); // END DOMContentLoaded
const form = document.getElementById("contact-form");
const statusText = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    message: document.getElementById("message").value.trim()
  };

  statusText.textContent = "Sending…";
  statusText.style.color = "#22c55e";

  try {
    const res = await fetch("https://script.google.com/macros/s/AKfycbxw62-uVaLFr3OKW9p9liDAlUrAzreYb52nnviG636odbrVtIdHeOpnSBDoLtHGvae4/exec", {
      method: "POST",
      contentType: "application/json",
      body: JSON.stringify(data)
    });

    form.reset();
    statusText.textContent = "Message sent successfully!";
  } catch (err) {
    statusText.textContent = "Something went wrong. Try again!";
    statusText.style.color = "#ff4444";
  }
});

const navToggle = document.querySelector(".nav-toggle");
const navList = document.querySelector(".nav-list");

navToggle.addEventListener("click", () => {
  navList.classList.toggle("open");
  navToggle.classList.toggle("active");
});
