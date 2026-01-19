/* ===================================
   CodimAi - Main JavaScript
   Smooth Interactions & Animations
   =================================== */

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  // Add/remove scrolled class for styling
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ===================================
// MOBILE MENU FUNCTIONALITY
// ===================================
const hamburgerMenu = document.querySelector('.hamburger-menu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileMenuClose = document.querySelector('.mobile-menu-close');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const body = document.body;

// Open mobile menu
hamburgerMenu?.addEventListener('click', () => {
  mobileMenuOverlay.classList.add('active');
  body.style.overflow = 'hidden';
});

// Close mobile menu
mobileMenuClose?.addEventListener('click', () => {
  mobileMenuOverlay.classList.remove('active');
  body.style.overflow = '';
});

// Close menu when clicking overlay
mobileMenuOverlay?.addEventListener('click', (e) => {
  if (e.target === mobileMenuOverlay) {
    mobileMenuOverlay.classList.remove('active');
    body.style.overflow = '';
  }
});

// Close menu when clicking a link
mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuOverlay.classList.remove('active');
    body.style.overflow = '';
  });
});

// Close menu on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
    mobileMenuOverlay.classList.remove('active');
    body.style.overflow = '';
  }
});

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Skip if href is just "#"
    if (href === '#') {
      e.preventDefault();
      return;
    }
    
    const target = document.querySelector(href);
    
    if (target) {
      e.preventDefault();
      
      const navbarHeight = navbar.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = targetPosition - navbarHeight - 20;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===================================
// ACTIVE NAV LINK HIGHLIGHTING
// ===================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

function highlightActiveSection() {
  const scrollPosition = window.pageYOffset + navbar.offsetHeight + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
  
  // Highlight home link when at top
  if (window.pageYOffset < 100) {
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === 'index.html' || link.getAttribute('href') === '#') {
        link.classList.add('active');
      }
    });
  }
}

window.addEventListener('scroll', highlightActiveSection);
highlightActiveSection(); // Call on load

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const fadeInElements = document.querySelectorAll('.feature-card, .solution-card, .why-card, .step-card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '0';
      entry.target.style.transform = 'translateY(30px)';
      
      // Trigger animation
      setTimeout(() => {
        entry.target.style.transition = 'all 0.6s ease-out';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, 100);
      
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

fadeInElements.forEach(element => {
  observer.observe(element);
});

// ===================================
// HERO DASHBOARD IMAGE PARALLAX EFFECT
// ===================================
const heroDashboard = document.querySelector('.hero-right img');

if (heroDashboard) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.3;
    
    if (scrolled < window.innerHeight) {
      heroDashboard.style.transform = `
        perspective(1000px) 
        rotateY(-5deg) 
        rotateX(2deg) 
        translateY(${scrolled * parallaxSpeed}px)
      `;
    }
  });
}

// ===================================
// BUTTON RIPPLE EFFECT
// ===================================
const buttons = document.querySelectorAll('.hero-cta, .cta-btn, .get-started-btn, .mobile-get-started-btn');

buttons.forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple-effect');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple CSS dynamically
const style = document.createElement('style');
style.textContent = `
  .ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ===================================
// GRADIENT ANIMATION FOR HIGHLIGHT TEXT
// ===================================
const highlightGradients = document.querySelectorAll('.highlight-gradient');

highlightGradients.forEach(element => {
  let hue = 0;
  setInterval(() => {
    hue = (hue + 1) % 20;
    element.style.filter = `hue-rotate(${hue}deg)`;
  }, 100);
});

// ===================================
// LOADING STATE
// ===================================
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Add fade-in animation to main content
  const mainContent = document.querySelector('.hero-section');
  if (mainContent) {
    mainContent.style.animation = 'fadeIn 0.8s ease-out';
  }
});

// ===================================
// PERFORMANCE: DEBOUNCE SCROLL EVENTS
// ===================================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll handlers
const debouncedHighlight = debounce(highlightActiveSection, 50);
window.addEventListener('scroll', debouncedHighlight);

// ===================================
// ACCESSIBILITY: FOCUS TRAP IN MOBILE MENU
// ===================================
const focusableElements = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])';
let focusableContent;
let firstFocusableElement;
let lastFocusableElement;

function trapFocus(e) {
  const isTabPressed = e.key === 'Tab';
  
  if (!isTabPressed) return;
  
  if (e.shiftKey) {
    if (document.activeElement === firstFocusableElement) {
      lastFocusableElement.focus();
      e.preventDefault();
    }
  } else {
    if (document.activeElement === lastFocusableElement) {
      firstFocusableElement.focus();
      e.preventDefault();
    }
  }
}

hamburgerMenu?.addEventListener('click', () => {
  const mobilePanel = document.querySelector('.mobile-menu-panel');
  if (mobilePanel) {
    focusableContent = mobilePanel.querySelectorAll(focusableElements);
    firstFocusableElement = focusableContent[0];
    lastFocusableElement = focusableContent[focusableContent.length - 1];
    
    document.addEventListener('keydown', trapFocus);
    
    setTimeout(() => {
      firstFocusableElement?.focus();
    }, 100);
  }
});

mobileMenuClose?.addEventListener('click', () => {
  document.removeEventListener('keydown', trapFocus);
  hamburgerMenu?.focus();
});

// ===================================
// CONSOLE WELCOME MESSAGE
// ===================================
console.log(
  '%cCodimAi',
  'font-size: 40px; font-weight: bold; color: #E31E24; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);'
);
console.log(
  '%cBuilding AI Products That Solve Real Business Problems',
  'font-size: 14px; color: #666;'
);
console.log(
  '%cWebsite crafted with ❤️',
  'font-size: 12px; color: #999;'
);

// ===================================
// DETECT REDUCED MOTION PREFERENCE
// ===================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // Disable animations
  document.documentElement.style.setProperty('--transition-fast', '0s');
  document.documentElement.style.setProperty('--transition-base', '0s');
  document.documentElement.style.setProperty('--transition-slow', '0s');
}

// ===================================
// HERO TEXT TYPING ANIMATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  const heroSpan = document.querySelector('.hero-title .highlight-gradient');
  
  if (heroSpan) {
    const originalText = heroSpan.textContent.trim();
    // Start empty
    heroSpan.textContent = '';
    
    // Create cursor
    const cursor = document.createElement('span');
    cursor.className = 'cursor-blink';
    // Insert cursor after the highlight span
    heroSpan.parentNode.insertBefore(cursor, heroSpan.nextSibling);

    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
      let typeSpeed = 100;

      if (isDeleting) {
        heroSpan.textContent = originalText.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; // Faster deleting speed
      } else {
        heroSpan.textContent = originalText.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100 + Math.random() * 50; // Random typing speed
      }

      if (!isDeleting && charIndex === originalText.length) {
        // Finished typing, wait before deleting
        isDeleting = true;
        typeSpeed = 2000; 
      } else if (isDeleting && charIndex === 0) {
        // Finished deleting, wait before typing again
        isDeleting = false;
        typeSpeed = 500;
      }

      setTimeout(typeEffect, typeSpeed);
    }
    
    // Start typing after initial animations (approx 1s)
    setTimeout(typeEffect, 1000);
  }
});