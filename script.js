// ============================================
// MOBILE MENU TOGGLE
// ============================================
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close menu when a link is clicked
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// ============================================
// DARK MODE TOGGLE
// ============================================
const themeToggle = document.getElementById("themeToggle");
const htmlElement = document.documentElement;

// Check localStorage for theme preference
const currentTheme = localStorage.getItem("theme") || "light";
if (currentTheme === "dark") {
  htmlElement.classList.add("dark-mode-active");
  updateThemeIcon(true);
}

themeToggle.addEventListener("click", () => {
  const isDark = htmlElement.classList.toggle("dark-mode-active");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateThemeIcon(isDark);
});

function updateThemeIcon(isDark) {
  const icon = themeToggle.querySelector("i");
  if (isDark) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================
const searchInput = document.getElementById("searchInput");
const blogContainer = document.getElementById("blogContainer");
const blogCards = blogContainer.querySelectorAll(".blog-card");

searchInput.addEventListener("keyup", function() {
  const filter = searchInput.value.toLowerCase().trim();
  
  blogCards.forEach(card => {
    const title = card.querySelector("h2").textContent.toLowerCase();
    const excerpt = card.querySelector(".excerpt").textContent.toLowerCase();
    const tag = card.querySelector(".tag").textContent.toLowerCase();
    
    if (title.includes(filter) || excerpt.includes(filter) || tag.includes(filter)) {
      card.style.display = "flex";
      card.style.animation = "fadeIn 0.3s ease";
    } else {
      card.style.display = "none";
    }
  });
  
  // Show no results message if needed
  const visibleCards = Array.from(blogCards).filter(card => card.style.display !== "none");
  if (visibleCards.length === 0 && filter !== "") {
    if (!document.getElementById("noResults")) {
      const noResults = document.createElement("div");
      noResults.id = "noResults";
      noResults.style.cssText = "grid-column: 1/-1; text-align: center; padding: 2rem; color: #666;";
      noResults.innerHTML = "<p style='font-size: 1.1rem;'>No articles found matching your search.</p>";
      blogContainer.appendChild(noResults);
    }
  } else {
    const noResults = document.getElementById("noResults");
    if (noResults) {
      noResults.remove();
    }
  }
});

// ============================================
// NEWSLETTER FORM
// ============================================
const newsletterForm = document.getElementById("newsletterForm");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const email = this.querySelector("input[type='email']").value;
    alert(`Thank you for subscribing with ${email}! Check your inbox.`);
    this.reset();
  });
}

// ============================================
// SMOOTH SCROLL FOR NAVIGATION
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    const href = this.getAttribute("href");
    if (href !== "#" && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

// ============================================
// READ MORE BUTTON FUNCTIONALITY (removed - now links)
// ============================================

// ============================================
// ADD FADE-IN ANIMATION
// ============================================
const style = document.createElement("style");
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .blog-card {
    animation: fadeIn 0.4s ease;
  }
`;
document.head.appendChild(style);

// ============================================
// INTERSECTION OBSERVER FOR LAZY LOADING
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px 50px 0px"
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

blogCards.forEach(card => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  observer.observe(card);
});