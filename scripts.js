// Typing effect
const text = ["ECE Graduate", "Electronics Enthusiast", "Robotics Explorer", "Future Innovator"];
let i = 0, j = 0, currentText = "", isDeleting = false;
const speed = 120;

function typeEffect() {
  const typeSpan = document.getElementById("type-text");
  if (!typeSpan) return;

  if (!isDeleting && j < text[i].length) {
    currentText += text[i][j++];
    typeSpan.textContent = currentText;
    setTimeout(typeEffect, speed);
  } else if (isDeleting && j > 0) {
    currentText = currentText.slice(0, --j);
    typeSpan.textContent = currentText;
    setTimeout(typeEffect, speed/2);
  } else if (!isDeleting && j === text[i].length) {
    isDeleting = true;
    setTimeout(typeEffect, 1200);
  } else if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i+1) % text.length;
    setTimeout(typeEffect, speed);
  }
}
document.addEventListener("DOMContentLoaded", typeEffect);

// Scroll reveal with staggered animation
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      if (!el.classList.contains("active")) {
        el.classList.add("active");
        const listItems = el.querySelectorAll("li");
        listItems.forEach((li, idx) => {
          setTimeout(() => li.classList.add("visible"), idx * 150);
        });
      }
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// Contact form alert
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    alert("Thank you for reaching out! I'll get back to you soon.");
    e.target.reset();
  });
}

// Theme toggle
const themeBtn = document.getElementById("theme-toggle");
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  if (themeBtn) themeBtn.textContent = "☀️";
}
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
      themeBtn.textContent = "☀️";
      localStorage.setItem("theme", "dark");
    } else {
      themeBtn.textContent = "🌙";
      localStorage.setItem("theme", "light");
    }
  });
}

// Smooth scroll for nav
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;
    const headerOffset = 80;
    const offsetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  });
});
