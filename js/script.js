/* ===================================
   CodimAi - OPTIMIZED JavaScript with GSAP
   High Performance Animations
   =================================== */

// ===================================
// GSAP INITIALIZATION
// ===================================
gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin);

// Performance optimization settings
gsap.config({
  force3D: true,
  nullTargetWarn: false
});

// Set initial state
gsap.set(['.navbar'], { opacity: 1 });
gsap.set(['.hero-section'], { opacity: 0, display: 'flex' });
gsap.set(['.cta-btn-container'], { display: 'flex' });

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Throttle function for performance
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top < window.innerHeight &&
    rect.bottom > 0
  );
}

// ===================================
// PAGE LOAD ANIMATION - OPTIMIZED
// ===================================
window.addEventListener('load', () => {
  const tl = gsap.timeline();
  
  // Navbar is now static - no entrance animation
  
  // Split text for brand animation - OPTIMIZED
  const brandText = document.querySelector('.codimai-brand-text');
  if (brandText) {
    const text = brandText.textContent;
    brandText.textContent = '';
    brandText.style.willChange = 'transform';
    
    // Split text into words, then characters to prevent word breaking
    text.split(' ').forEach(word => {
      const wordWrapper = document.createElement('span');
      wordWrapper.style.display = 'inline-block';
      wordWrapper.style.whiteSpace = 'nowrap';
      
      word.split('').forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        span.classList.add('char-span');
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.willChange = 'transform, opacity';
        wordWrapper.appendChild(span);
      });
      
      brandText.appendChild(wordWrapper);
      brandText.appendChild(document.createTextNode(' ')); // Maintain word spacing
    });
  }

  // Hero content animations - REDUCED COMPLEXITY
  const heroTl = gsap.timeline();

  // Simplified explosive reveal
  // First fade in the hero section container
  heroTl.to('.hero-section', {
    opacity: 1,
    duration: 1.0,
    ease: 'power2.out'
  })
  // Simplified explosive reveal
  .fromTo('.char-span', 
    {
      opacity: 0,
      scale: 0,
      x: () => (Math.random() - 0.5) * 300, 
      y: () => (Math.random() - 0.5) * 300,
      rotation: () => (Math.random() - 0.5) * 360, 
    },
    {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      rotation: 0,
      duration: 1.5, 
      stagger: {
        each: 0.05, 
        from: "center"
      },
      ease: 'power3.out',
      onComplete: () => {
        // Remove will-change after animation
        document.querySelectorAll('.char-span').forEach(span => {
          span.style.willChange = 'auto';
        });
      }
    },
    '-=0.5'
  )
  .fromTo('.hero-subtitle', 
    { y: 20, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.8')
  .fromTo('.hero-tagline', 
    { y: 20, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.6')
  .fromTo('.hero-cta', 
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.0,
      stagger: 0.2,
      ease: 'power3.out' 
    }, '-=0.6')
  .fromTo('.hero-right img, .hero-3d-scene, .contact-3d-scene, .product-3d-scene', 
    { x: 30, opacity: 0, scale: 0.95 },
    {
      x: 0,
      opacity: 1,
      scale: 1,
      duration: 1.0,
      ease: 'power2.out'
    }, '-=0.8');

  // OPTIMIZED 3D Tilt - Only on desktop and with throttling
  const heroLeft = document.querySelector('.hero-left');
  const brandTextElem = document.querySelector('.codimai-brand-text');
  
  if (heroLeft && brandTextElem && window.innerWidth > 1024) {
    const xTo = gsap.quickTo(brandTextElem, "rotationX", { duration: 0.6, ease: "power2.out" });
    const yTo = gsap.quickTo(brandTextElem, "rotationY", { duration: 0.6, ease: "power2.out" });
    
    gsap.set(brandTextElem, { 
      transformPerspective: 1000, 
      transformOrigin: 'center',
      willChange: 'transform'
    });

    // THROTTLED mouse move
    const handleMouseMove = throttle((e) => {
      if (!isInViewport(heroLeft)) return; // Only animate if in viewport
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xRot = (clientY / innerHeight - 0.5) * 20; // Reduced from 30
      const yRot = (clientX / innerWidth - 0.5) * -20;
      
      xTo(xRot);
      yTo(yRot);
    }, 50); // Throttle to 50ms

    window.addEventListener('mousemove', handleMouseMove);
    
    // Cleanup on resize to mobile
    window.addEventListener('resize', debounce(() => {
      if (window.innerWidth <= 1024) {
        window.removeEventListener('mousemove', handleMouseMove);
        brandTextElem.style.willChange = 'auto';
      }
    }, 250));
  }
});

// ===================================
// GRADIENT ANIMATION - SIMPLIFIED
// ===================================
function initGradientAnim() {
  const highlightGradient = document.querySelector('.highlight-gradient');
  if (highlightGradient) {
    gsap.to(highlightGradient, {
      backgroundPosition: '200% center',
      duration: 8, // Slower = less CPU
      repeat: -1,
      ease: 'none'
    });
  }
}
initGradientAnim();

// ===================================
// HERO SECTION - OPTIMIZED PARALLAX
// ===================================

// Static floating animation (no scroll)
gsap.to('.hero-bg-shape', {
  y: '-=20', // Reduced movement
  x: '+=15',
  rotation: '+=3',
  duration: 10, // Slower
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut'
});

// Scroll parallax - BATCH UPDATES
ScrollTrigger.batch('.hero-bg-shape, .hero-right img', {
  start: 'top top',
  end: 'bottom top',
  onEnter: batch => {
    gsap.to('.hero-bg-shape', {
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      },
      y: 200, // Reduced from 300
      rotation: 30, // Reduced from 45
      scale: 1.3 // Reduced from 1.5
    });
  }
});

// Dashboard parallax - OPTIMIZED
const heroDashboard = document.querySelector('.hero-right img');
if (heroDashboard) {
  gsap.set(heroDashboard, { willChange: 'transform' });
  
  gsap.to(heroDashboard, {
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      invalidateOnRefresh: true
    },
    y: 100, // Reduced from 150
    rotationY: -10,
    rotationX: 3,
    ease: 'none'
  });
  
  // THROTTLED mouse move 3D effect
  if (window.innerWidth > 1024) {
    const rotXTo = gsap.quickTo(heroDashboard, "rotationX", { duration: 0.4, ease: "power2.out" });
    const rotYTo = gsap.quickTo(heroDashboard, "rotationY", { duration: 0.4, ease: "power2.out" });

    const handleDashboardMove = throttle((e) => {
      if (!isInViewport(heroDashboard)) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPos = (clientX / innerWidth - 0.5) * 15; // Reduced from 20
      const yPos = (clientY / innerHeight - 0.5) * 15;
      
      rotYTo(-5 + xPos);
      rotXTo(2 + yPos);
    }, 50);

    document.addEventListener('mousemove', handleDashboardMove);
  }
}

// ===================================
// FEATURE CARDS - OPTIMIZED
// ===================================
gsap.from('.feature-card', {
  scrollTrigger: {
    trigger: '.automation-platform-section',
    start: 'top 80%',
    toggleActions: 'play none none none', // Don't reverse
    once: true // Only animate once
  },
  y: 60, // Reduced from 80
  opacity: 0,
  scale: 0.95, // Reduced from 0.9
  duration: 0.6,
  stagger: 0.15,
  ease: 'power2.out'
});

// Simplified hover effect - CSS is better for simple hovers
// Remove GSAP hover listeners for cards, use CSS instead

// ===================================
// SOLUTIONS/PRODUCTS - OPTIMIZED
// ===================================
// ===================================
// SOLUTIONS/PRODUCTS - SIMPLE CSS ANIMATION
// ===================================

// Simple Intersection Observer for Fade Up
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Only animate once
    }
  });
}, observerOptions);

document.querySelectorAll('.solution-card').forEach((card, index) => {
  // Add base class for CSS animation
  card.classList.add('fade-in-up');
  
  // Add stagger delay via inline style
  card.style.transitionDelay = `${index * 0.1}s`;
  
  // Start observing
  observer.observe(card);
});

// ===================================
// WHY CARDS - OPTIMIZED
// ===================================
gsap.from('.why-card', {
  scrollTrigger: {
    trigger: '.why-choose-us-section',
    start: 'top 75%',
    toggleActions: 'play none none none',
    once: true
  },
  scale: 0,
  rotation: 90, 
  opacity: 0,
  duration: 0.6,
  stagger: 0.1,
  ease: 'back.out(1.4)'
});

// ===================================
// APPROACH SECTION - OPTIMIZED
// ===================================
// ===================================
// APPROACH SECTION - SIMPLE CSS ANIMATION
// ===================================

// Select elements to animate
const approachElements = document.querySelectorAll('.content-side .section-tag, .content-side .main-heading, .content-side .description, .step-card');

approachElements.forEach((el, index) => {
  // Add base class for CSS animation
  el.classList.add('fade-in-up');
  
  // Stagger functionality could be refined based on simple index or group
  if (el.classList.contains('step-card')) {
     const stepIndex = Array.from(document.querySelectorAll('.step-card')).indexOf(el);
     el.style.transitionDelay = `${stepIndex * 0.15}s`;
  } else {
     el.style.transitionDelay = `${index * 0.1}s`;
  }
  
  observer.observe(el);
});


// About Section Animation
document.querySelectorAll('.about-images, .about-content').forEach((el) => {
  el.classList.add('fade-in-up');
  observer.observe(el);
});

// Contact Page Animation
document.querySelectorAll('.contact-info-col, .contact-form-col, .method-card').forEach((el) => {
  el.classList.add('fade-in-up');
  observer.observe(el);
});

// REMOVED: Step icon rotation on scroll (expensive)
// Use CSS hover instead

// ===================================
// INTEGRATIONS - VERTICAL WORKFLOW
// ===================================
gsap.fromTo('.eco-card, .eco-arrow', 
  { y: 50, opacity: 0, scale: 0.9 },
  {
    scrollTrigger: {
      trigger: '.integrations-showcase',
      start: 'top 80%',
      toggleActions: 'play none none none',
      once: true
    },
    y: 0,
    opacity: 1,
    scale: 1,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
  }
);

// Animated down arrows
gsap.to('.eco-arrow i', {
  y: 10,
  duration: 1.2,
  repeat: -1,
  yoyo: true,
  ease: 'power1.inOut',
  stagger: 0.2
});

// ===================================
// CONTACT SECTION - OPTIMIZED
// ===================================
const contactTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.contact-section',
    start: 'top 90%', // More reliable trigger point
    toggleActions: 'play none none none',
    once: true
  }
});

contactTl
  .fromTo('.contact-title', 
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out'
    }
  )
  .fromTo('.cta-btn', 
    { scale: 0.8, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      stagger: 0.15,
      ease: 'back.out(1.5)'
    }, 
    '-=0.3'
  );

// ===================================
// FOOTER - OPTIMIZED
// ===================================
gsap.from('.footer-grid > div', {
  scrollTrigger: {
    trigger: '.footer-section',
    start: 'top 85%',
    toggleActions: 'play none none none',
    once: true
  },
  y: 60,
  opacity: 0,
  duration: 0.8,
  stagger: 0.15,
  ease: 'power2.out'
});

// gsap.from('.social-links a', {
//   scrollTrigger: {
//     trigger: '.social-links',
//     start: 'top 90%',
//     toggleActions: 'play none none none',
//     once: true
//   },
//   scale: 0,
//   rotation: 180, // Reduced from 360
//   duration: 0.5,
//   stagger: 0.08,
//   ease: 'back.out(1.5)'
// });

// ===================================
// NAVBAR SCROLL - OPTIMIZED
// ===================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;
let ticking = false;

const updateNavbar = () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Keep navbar fixed at top, removed hide-on-scroll logic
  
  lastScroll = currentScroll;
  ticking = false;
};

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateNavbar);
    ticking = true;
  }
}, { passive: true });

// ===================================
// MOBILE MENU - OPTIMIZED
// ===================================
const hamburgerMenu = document.querySelector('.hamburger-menu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileMenuClose = document.querySelector('.mobile-menu-close');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const body = document.body;

const menuTimeline = gsap.timeline({ paused: true });

menuTimeline
  .to(mobileMenuOverlay, {
    display: 'block',
    opacity: 1,
    duration: 0.25,
    ease: 'power2.out'
  })
  .from('.mobile-menu-panel', {
    x: '100%',
    duration: 0.4,
    ease: 'power3.out'
  }, '-=0.15')
  .from('.mobile-nav-item', {
    x: 30,
    opacity: 0,
    duration: 0.3,
    stagger: 0.05,
    ease: 'power2.out'
  }, '-=0.2');

hamburgerMenu?.addEventListener('click', () => {
  mobileMenuOverlay.classList.add('active');
  body.style.overflow = 'hidden';
  menuTimeline.play();
});

const closeMobileMenu = () => {
  menuTimeline.reverse();
  setTimeout(() => {
    mobileMenuOverlay.classList.remove('active');
    body.style.overflow = '';
  }, 400);
};

mobileMenuClose?.addEventListener('click', closeMobileMenu);
mobileMenuOverlay?.addEventListener('click', (e) => {
  if (e.target === mobileMenuOverlay) closeMobileMenu();
});
mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileMenu));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
    closeMobileMenu();
  }
});

// ===================================
// SMOOTH SCROLL - OPTIMIZED
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') {
      e.preventDefault();
      return;
    }
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navbarHeight = navbar.offsetHeight;
      const targetPosition = target.offsetTop - navbarHeight - 20;
      
      gsap.to(window, {
        scrollTo: {
          y: targetPosition,
          autoKill: false
        },
        duration: 0.8, // Reduced from 1.2
        ease: 'power2.inOut' // Simpler easing
      });
    }
  });
});

// ===================================
// ACTIVE NAV LINK - OPTIMIZED WITH RAF
// ===================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
let navTicking = false;

const updateActiveNav = () => {
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split("/").pop() || 'index.html';
  const isHomePage = currentPage === 'index.html' || currentPage === '';

  if (isHomePage) {
    const scrollPosition = window.pageYOffset + navbar.offsetHeight + 100;
    let sectionActive = false;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        sectionActive = true;
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${sectionId}` || href === `index.html#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });

    if (!sectionActive) {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === 'index.html' || href === '#' || href === './index.html') {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  } else {
    // On other pages, highlight the link that matches the current page filename
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || href === `./${currentPage}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  
  navTicking = false;
};

// Initial call to set active state on load
updateActiveNav();

window.addEventListener('scroll', () => {
  if (!navTicking) {
    requestAnimationFrame(updateActiveNav);
    navTicking = true;
  }
}, { passive: true });

// ===================================
// BUTTON EFFECTS - SIMPLIFIED
// ===================================
const buttons = document.querySelectorAll('.hero-cta, .cta-btn, .get-started-btn, .mobile-get-started-btn');

buttons.forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      pointer-events: none;
    `;
    
    this.appendChild(ripple);
    
    gsap.fromTo(ripple, 
      { scale: 0, opacity: 1 },
      { 
        scale: 2,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => ripple.remove()
      }
    );
  });
});

// ===================================
// CURSOR - ONLY ON DESKTOP, OPTIMIZED
// ===================================
if (window.innerWidth > 1024) {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid #E31E24;
    border-radius: 50%;
    pointer-events: none;
    z-index: 10000;
    mix-blend-mode: difference;
  `;
  document.body.appendChild(cursor);
  
  const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power2.out" });
  const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power2.out" });

  document.addEventListener('mousemove', throttle((e) => {
    xTo(e.clientX - 10);
    yTo(e.clientY - 10);
  }, 16)); // ~60fps
  
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(cursor, { scale: 2, duration: 0.2 });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
    });
  });
}

// ===================================
// PARTICLES - REDUCED COUNT
// ===================================
if (window.innerWidth > 768) {
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles-container';
  particlesContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;
  `;
  document.body.prepend(particlesContainer);
  
  // REDUCED from 30 to 15 particles
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      background: ${Math.random() > 0.5 ? '#E31E24' : '#FFFFFF'};
      border-radius: 50%;
      opacity: ${Math.random() * 0.2 + 0.05};
    `;
    
    particlesContainer.appendChild(particle);
    
    gsap.set(particle, {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight
    });
    
    gsap.to(particle, {
      y: `-=${Math.random() * 400 + 200}`,
      x: `+=${Math.random() * 150 - 75}`,
      opacity: 0,
      duration: Math.random() * 15 + 10, // Slower
      repeat: -1,
      ease: 'none',
      delay: Math.random() * 8
    });
  }
}

// ===================================
// REDUCED MOTION PREFERENCE
// ===================================
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.globalTimeline.timeScale(10); // Fast forward instead of disable
  ScrollTrigger.config({ syncInterval: 500 });
  console.log('ℹ️ Animations simplified for accessibility');
}

// ===================================
// CLEANUP ON VISIBILITY CHANGE
// ===================================
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    gsap.globalTimeline.pause();
  } else {
    gsap.globalTimeline.resume();
  }
});

console.log('%c🚀 CodimAi - Optimized', 'font-size: 16px; color: #E31E24; font-weight: bold;');