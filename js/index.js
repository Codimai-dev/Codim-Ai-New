
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const closeBtn = document.querySelector('.mobile-menu-close');
    const toggles = document.querySelectorAll('.mobile-dropdown .dropdown-toggle');

    function resetMobileMenu() {
        document.querySelectorAll('.mobile-dropdown').forEach(dd => {
            dd.classList.remove('active');
        });
    }

    // Hamburger toggle
    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            const isActive = overlay.classList.contains('active');
            overlay.classList.toggle('active');
            if (!overlay.classList.contains('active')) {
                resetMobileMenu();
            }
        });
    }

    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            overlay.classList.remove('active');
            resetMobileMenu();
        });
    }

    // Overlay click to close
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                resetMobileMenu();
            }
        });
    }

    // Mobile dropdown toggles
    toggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const parent = this.closest('.mobile-dropdown');
            parent.classList.toggle('active');
        });
    });

    // Optional: Handle window resize to close mobile menu on desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            overlay.classList.remove('active');
            resetMobileMenu();
        }
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
});

/* FAQ Toggle */
document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', () => {
        const parent = item.parentElement;
        parent.classList.toggle('active');
        
        // Close others (optional)
        document.querySelectorAll('.faq-item').forEach(other => {
            if (other !== parent) other.classList.remove('active');
        });
    });
});

/* Stats Animation */
const statItems = document.querySelectorAll('.stat-item');
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated'); // Prevent re-animation on re-scroll
            const delayStr = getComputedStyle(entry.target).getPropertyValue('--delay');
            const delayMs = parseFloat(delayStr) * 1000 || 0;

            setTimeout(() => {
                entry.target.classList.add('visible');

                // Animate counters and progress
                const counter = entry.target.querySelector('.counter-value');
                if (counter) {
                    const target = parseInt(counter.dataset.target);
                    const progressBar = entry.target.querySelector('.progress-bar');
                    let current = 0;
                    const duration = 2000; // 2 seconds total
                    const increment = target / (duration / 16); // ~60fps
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        counter.textContent = Math.floor(current);

                        // Update progress circle (circumference ~440)
                        if (progressBar) {
                            const progress = (current / target) * 100;
                            const dashLength = (progress / 100) * 440;
                            progressBar.style.strokeDasharray = `${dashLength} 440`;
                        }
                    }, 16);
                }
            }, delayMs);
        }
    });
}, observerOptions);

statItems.forEach(item => observer.observe(item));