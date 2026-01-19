/* ===================================
   CodimAi - Enhanced JavaScript with GSAP
   Crazy Animations & Smooth Interactions
   =================================== */

// ===================================
// GSAP INITIALIZATION
// ===================================
// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin);
gsap.set(['.hero-section'], { display: 'flex' });
gsap.set(['.navbar'], { display: 'block' });
// ===================================
// PAGE LOAD ANIMATION
// ===================================
window.addEventListener('load', () => {
  // Animated loader (if you want to add one)
  const tl = gsap.timeline();
  
  // Navbar slides down
  tl.from('.navbar', {
    y: -100,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  });
  
  // Helper to split text into characters for animation
  const brandText = document.querySelector('.codimai-brand-text');
  if (brandText) {
    const text = brandText.textContent;
    brandText.textContent = '';
    text.split('').forEach(char => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.display = 'inline-block';
      span.style.opacity = '0'; // Initial hidden state
      brandText.appendChild(span);
    });
  }

  // Hero content animations
  const heroTl = gsap.timeline();

  // Explosive Center Reveal for "CodimAi"
  heroTl.fromTo('.codimai-brand-text span', 
    {
      opacity: 0,
      scale: 0,
      x: () => (Math.random() - 0.5) * 600,
      y: () => (Math.random() - 0.5) * 600,
      rotation: () => (Math.random() - 0.5) * 720,
      filter: 'blur(15px)'
    },
    {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      rotation: 0,
      filter: 'blur(0px)',
      duration: 1,
      stagger: {
        each: 0.03,
        from: "center"
      },
      ease: 'expo.out'
    }
  )
  // Animate the rest (ULTRA FAST)
  .from('.hero-subtitle', {
    y: 20,
    opacity: 0,
    duration: 0.3,
    ease: 'power2.out'
  }, '-=0.6')
  .from('.highlight-gradient', {
    backgroundPosition: '200% center',
    duration: 1,
    ease: 'power2.out'
  }, '<')
  .from('.hero-tagline', {
    y: 20,
    opacity: 0,
    duration: 0.3,
    ease: 'power2.out'
  }, '-=0.2')
  .from('.hero-cta', {
    scale: 0,
    opacity: 0,
    duration: 0.4,
    stagger: 0.1,
    ease: 'back.out(2)'
  }, '-=0.2')
  .from('.hero-right img', {
    x: 30,
    opacity: 0,
    scale: 0.9,
    duration: 0.5,
    ease: 'power3.out'
  }, '-=0.4');

  // NEW: Optimized Interactive 3D Perspective Tilt with quickTo
  const heroLeft = document.querySelector('.hero-left');
  const brandTextElem = document.querySelector('.codimai-brand-text');
  
  if (heroLeft && brandTextElem && window.innerWidth > 1024) {
    // Create optimize setters
    const xTo = gsap.quickTo(brandTextElem, "rotationX", { duration: 0.8, ease: "power2.out" });
    const yTo = gsap.quickTo(brandTextElem, "rotationY", { duration: 0.8, ease: "power2.out" });
    
    // Set perspective once
    gsap.set(brandTextElem, { transformPerspective: 1000, transformOrigin: 'center' });

    window.addEventListener('mousemove', (e) => {
      if (window.innerWidth <= 1024) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate rotation based on mouse position
      const xRot = (clientY / innerHeight - 0.5) * 30; 
      const yRot = (clientX / innerWidth - 0.5) * -30; 
      
      xTo(xRot);
      yTo(yRot);

      // Letter offset - simpler version for performance
      // Only updating every few frames or skipping simpler letters could help, 
      // but keeping it simple for now, just checking size.
    });
  }

});

// ===================================
// ANIMATED TEXT GRADIENT
// ===================================
// Handled by GSAP Timeline above, but creating it if needed manually
function initGradientAnim() {
  const highlightGradient = document.querySelector('.highlight-gradient');
  if (highlightGradient) {
    gsap.to(highlightGradient, {
      backgroundPosition: '200% center',
      duration: 5,
      repeat: -1,
      ease: 'none'
    });
  }
}
initGradientAnim();

// ===================================
// HERO SECTION - PARALLAX & 3D EFFECTS
// ===================================
gsap.to('.hero-bg-shape', {
  scrollTrigger: {
    trigger: '.hero-section',
    start: 'top top',
    end: 'bottom top',
    scrub: 1
  },
  y: 300,
  rotation: 45,
  scale: 1.5
});

// Continuous floating animation for hero shape
gsap.to('.hero-bg-shape', {
  y: '-=30',
  x: '+=20',
  rotation: '+=5',
  duration: 8,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut'
});

// Dashboard image parallax and rotation
const heroDashboard = document.querySelector('.hero-right img');
if (heroDashboard) {
  gsap.to(heroDashboard, {
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    },
    y: 150,
    rotationY: -15,
    rotationX: 5,
    ease: 'none'
  });
  
  // Mouse move 3D effect - Optimized
  if (window.innerWidth > 1024) {
    const rotXTo = gsap.quickTo(heroDashboard, "rotationX", { duration: 0.5, ease: "power2.out" });
    const rotYTo = gsap.quickTo(heroDashboard, "rotationY", { duration: 0.5, ease: "power2.out" });

    document.addEventListener('mousemove', (e) => {
      if (window.innerWidth <= 1024) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPos = (clientX / innerWidth - 0.5) * 20;
      const yPos = (clientY / innerHeight - 0.5) * 20;
      
      rotYTo(-5 + xPos);
      rotXTo(2 + yPos);
    });
  }
}

// ===================================
// FEATURE CARDS - STAGGERED REVEAL
// ===================================
gsap.from('.feature-card', {
  scrollTrigger: {
    trigger: '.automation-platform-section',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  },
  y: 80,
  opacity: 0,
  rotation: -5,
  scale: 0.9,
  duration: 0.8,
  stagger: 0.2,
  ease: 'power3.out'
});

// Card icon bounce on hover
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card.querySelector('.card-icon'), {
      y: -10,
      rotation: 360,
      duration: 0.6,
      ease: 'back.out(2)'
    });
  });
  
  card.addEventListener('mouseleave', () => {
    gsap.to(card.querySelector('.card-icon'), {
      y: 0,
      rotation: 0,
      duration: 0.4,
      ease: 'power2.out'
    });
  });
});

// ===================================
// SOLUTIONS/PRODUCTS SECTION - MAGNETIC CARDS
// ===================================
gsap.from('.solution-card', {
  scrollTrigger: {
    trigger: '.solutions-section',
    start: 'top 70%',
    toggleActions: 'play none none reverse'
  },
  y: 100,
  opacity: 0,
  scale: 0.8,
  duration: 1,
  stagger: {
    each: 0.2,
    from: 'start'
  },
  ease: 'power3.out'
});

// Magnetic effect on solution cards
document.querySelectorAll('.solution-card').forEach(card => {
  // Magnetic effect on solution cards - Optimized
  const xTo = gsap.quickTo(card, "x", { duration: 0.5, ease: "power2.out" });
  const yTo = gsap.quickTo(card, "y", { duration: 0.5, ease: "power2.out" });
  const rotTo = gsap.quickTo(card, "rotation", { duration: 0.5, ease: "power2.out" });

  card.addEventListener('mousemove', (e) => {
    if (window.innerWidth <= 1024) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    xTo(x * 0.1);
    yTo(y * 0.1);
    rotTo(x * 0.02);
  });
  
  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      x: 0,
      y: 0,
      rotation: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.3)'
    });
  });
});

// ===================================
// WHY CARDS - FLIP & SCALE ANIMATION
// ===================================
gsap.from('.why-card', {
  scrollTrigger: {
    trigger: '.why-choose-us-section',
    start: 'top 75%',
    toggleActions: 'play none none reverse'
  },
  scale: 0,
  rotation: 180,
  opacity: 0,
  duration: 0.8,
  stagger: {
    each: 0.15,
    from: 'random'
  },
  ease: 'back.out(1.7)'
});

// ===================================
// APPROACH SECTION - TIMELINE REVEAL
// ===================================
// Content side text reveal
gsap.from('.content-side .section-tag', {
  scrollTrigger: {
    trigger: '.ai-approach-section',
    start: 'top 70%',
    toggleActions: 'play none none reverse'
  },
  x: -100,
  opacity: 0,
  duration: 0.8,
  ease: 'power3.out'
});

gsap.from('.content-side .main-heading', {
  scrollTrigger: {
    trigger: '.ai-approach-section',
    start: 'top 70%',
    toggleActions: 'play none none reverse'
  },
  x: -80,
  opacity: 0,
  duration: 1,
  delay: 0.2,
  ease: 'power3.out'
});

gsap.from('.content-side .description p', {
  scrollTrigger: {
    trigger: '.ai-approach-section',
    start: 'top 70%',
    toggleActions: 'play none none reverse'
  },
  x: -60,
  opacity: 0,
  duration: 0.6,
  stagger: 0.1,
  delay: 0.4,
  ease: 'power2.out'
});

// Step cards animation with morphing effect
gsap.from('.step-card', {
  scrollTrigger: {
    trigger: '.steps-timeline',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  },
  x: 100,
  opacity: 0,
  scale: 0.8,
  rotation: 5,
  duration: 0.8,
  stagger: 0.2,
  ease: 'power3.out'
});

// Step icon rotation on scroll
gsap.utils.toArray('.step-icon').forEach((icon, i) => {
  gsap.to(icon, {
    scrollTrigger: {
      trigger: icon,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1
    },
    rotation: 360 * (i + 1),
    ease: 'none'
  });
});

// ===================================
// INTEGRATIONS SHOWCASE - CHAIN ANIMATION
// ===================================
gsap.from('.integrations-showcase > div > div', {
  scrollTrigger: {
    trigger: '.integrations-showcase',
    start: 'top 75%',
    toggleActions: 'play none none reverse'
  },
  scale: 0,
  opacity: 0,
  duration: 0.6,
  stagger: 0.15,
  ease: 'back.out(2)'
});

// Arrows pulse animation
gsap.to('.integrations-showcase .fa-arrow-right', {
  x: 10,
  duration: 0.8,
  repeat: -1,
  yoyo: true,
  ease: 'power1.inOut',
  stagger: 0.2
});

// ===================================
// CONTACT SECTION - DRAMATIC REVEAL
// ===================================
gsap.from('.contact-section', {
  scrollTrigger: {
    trigger: '.contact-section',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  },
  scale: 0.9,
  opacity: 0,
  duration: 1,
  ease: 'power3.out'
});

gsap.from('.contact-title', {
  scrollTrigger: {
    trigger: '.contact-section',
    start: 'top 75%',
    toggleActions: 'play none none reverse'
  },
  y: 50,
  opacity: 0,
  duration: 1,
  delay: 0.2,
  ease: 'power3.out'
});

gsap.from('.cta-btn', {
  scrollTrigger: {
    trigger: '.contact-section',
    start: 'top 75%',
    toggleActions: 'play none none reverse'
  },
  scale: 0,
  opacity: 0,
  rotation: 180,
  duration: 0.8,
  delay: 0.5,
  stagger: 0.2,
  ease: 'back.out(2)'
});

// ===================================
// FOOTER - WAVE REVEAL
// ===================================
gsap.from('.footer-grid > div', {
  scrollTrigger: {
    trigger: '.footer-section',
    start: 'top 85%',
    toggleActions: 'play none none reverse'
  },
  y: 80,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: 'power3.out'
});

// Social icons pop animation
gsap.from('.social-links a', {
  scrollTrigger: {
    trigger: '.social-links',
    start: 'top 90%',
    toggleActions: 'play none none reverse'
  },
  scale: 0,
  rotation: 360,
  duration: 0.6,
  stagger: 0.1,
  ease: 'back.out(2)'
});

// ===================================
// NAVBAR SCROLL EFFECT WITH GSAP
// ===================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

ScrollTrigger.create({
  start: 'top -50',
  end: 99999,
  onUpdate: (self) => {
    const currentScroll = self.scroll();
    
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Hide navbar on scroll down, show on scroll up
    if (currentScroll > lastScroll && currentScroll > 100) {
      gsap.to(navbar, {
        y: -100,
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      gsap.to(navbar, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
    
    lastScroll = currentScroll;
  }
});

// ===================================
// MOBILE MENU WITH GSAP
// ===================================
const hamburgerMenu = document.querySelector('.hamburger-menu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileMenuClose = document.querySelector('.mobile-menu-close');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const body = document.body;

// Mobile menu animation timeline
const menuTimeline = gsap.timeline({ paused: true });

menuTimeline
  .to(mobileMenuOverlay, {
    display: 'block',
    opacity: 1,
    duration: 0.3,
    ease: 'power2.out'
  })
  .from('.mobile-menu-panel', {
    x: '100%',
    duration: 0.5,
    ease: 'power3.out'
  }, '-=0.2')
  .from('.mobile-menu-header', {
    y: -20,
    opacity: 0,
    duration: 0.4,
    ease: 'power2.out'
  }, '-=0.3')
  .from('.mobile-nav-item', {
    x: 50,
    opacity: 0,
    duration: 0.4,
    stagger: 0.08,
    ease: 'power2.out'
  }, '-=0.2')
  .from('.mobile-menu-footer', {
    y: 30,
    opacity: 0,
    duration: 0.4,
    ease: 'power2.out'
  }, '-=0.2');

// Open mobile menu
hamburgerMenu?.addEventListener('click', () => {
  mobileMenuOverlay.classList.add('active');
  body.style.overflow = 'hidden';
  menuTimeline.play();
});

// Close mobile menu
const closeMobileMenu = () => {
  menuTimeline.reverse();
  setTimeout(() => {
    mobileMenuOverlay.classList.remove('active');
    body.style.overflow = '';
  }, 500);
};

mobileMenuClose?.addEventListener('click', closeMobileMenu);

mobileMenuOverlay?.addEventListener('click', (e) => {
  if (e.target === mobileMenuOverlay) {
    closeMobileMenu();
  }
});

mobileNavLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
    closeMobileMenu();
  }
});

// ===================================
// SMOOTH SCROLL WITH GSAP
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
        duration: 1.2,
        ease: 'power3.inOut'
      });
    }
  });
});

// ===================================
// ACTIVE NAV LINK HIGHLIGHTING
// ===================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

ScrollTrigger.create({
  trigger: 'body',
  start: 'top top',
  end: 'bottom bottom',
  onUpdate: () => {
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
    
    if (window.pageYOffset < 100) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === 'index.html' || link.getAttribute('href') === '#') {
          link.classList.add('active');
        }
      });
    }
  }
});

// ===================================
// BUTTON RIPPLE EFFECT WITH GSAP
// ===================================
const buttons = document.querySelectorAll('.hero-cta, .cta-btn, .get-started-btn, .mobile-get-started-btn, .read-more');

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
      background: rgba(255, 255, 255, 0.6);
      pointer-events: none;
    `;
    
    this.appendChild(ripple);
    
    gsap.fromTo(ripple, 
      { scale: 0, opacity: 1 },
      { 
        scale: 2.5, 
        opacity: 0, 
        duration: 0.6, 
        ease: 'power2.out',
        onComplete: () => ripple.remove()
      }
    );
  });
  
  // Button hover animation
  button.addEventListener('mouseenter', function() {
    gsap.to(this, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  button.addEventListener('mouseleave', function() {
    gsap.to(this, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  });
});

// Add hover effects for cards that had CSS transitions removed
document.querySelectorAll('.feature-card, .solution-card, .why-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, {
      y: -8,
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
      borderColor: '#E31E24',
      duration: 0.4,
      ease: 'power2.out'
    });
  });
  
  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      y: 0,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      borderColor: 'rgba(0,0,0,0)', // Or original border color
      duration: 0.4,
      ease: 'power2.out',
      clearProps: 'borderColor' // Revert to CSS
    });
  });
});

// ===================================
// CURSOR FOLLOW EFFECT (OPTIONAL)
// ===================================
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
  display: none;
`;
document.body.appendChild(cursor);

// Only show on desktop
if (window.innerWidth > 1024) {
  cursor.style.display = 'block';
  
  let cursorX = 0;
  let cursorY = 0;
  
  const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power2.out" });
  const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power2.out" });

  document.addEventListener('mousemove', (e) => {
    xTo(e.clientX - 10);
    yTo(e.clientY - 10);
  });
  
  // removed the loop-based implementation

  
  // Cursor grow on hover
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(cursor, {
        scale: 2,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    el.addEventListener('mouseleave', () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
}

// ===================================
// BACKGROUND PARTICLES EFFECT
// ===================================
function createParticles() {
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
  
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      background: ${Math.random() > 0.5 ? '#E31E24' : '#FFFFFF'};
      border-radius: 50%;
      opacity: ${Math.random() * 0.3 + 0.1};
    `;
    
    particlesContainer.appendChild(particle);
    
    gsap.set(particle, {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight
    });
    
    gsap.to(particle, {
      y: `-=${Math.random() * 500 + 300}`,
      x: `+=${Math.random() * 200 - 100}`,
      opacity: 0,
      duration: Math.random() * 10 + 5,
      repeat: -1,
      ease: 'none',
      delay: Math.random() * 5
    });
  }
}

// Initialize particles on desktop only
if (window.innerWidth > 768) {
  createParticles();
}

// ===================================
// CONSOLE WELCOME MESSAGE
// ===================================
console.log(
  '%cCodimAi',
  'font-size: 50px; font-weight: bold; background: linear-gradient(135deg, #E31E24, #B91419); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);'
);
console.log(
  '%c🚀 Building AI Products That Solve Real Business Problems',
  'font-size: 16px; color: #E31E24; font-weight: bold;'
);
console.log(
  '%c✨ Powered by GSAP Animations',
  'font-size: 14px; color: #666;'
);

// ===================================
// PERFORMANCE MONITORING
// ===================================
if (window.performance) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
    }, 0);
  });
}

// ===================================
// DETECT REDUCED MOTION PREFERENCE
// ===================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // Disable GSAP animations
  gsap.globalTimeline.timeScale(0);
  ScrollTrigger.disable();
  console.log('ℹ️ Animations disabled due to user preference');
}