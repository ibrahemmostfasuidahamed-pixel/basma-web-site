// Simplified Navigation - Direct Menu (No Sidebar)
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');

    // Add scroll event listener for header transparency (throttled)
    let ticking = false;
    function updateHeader() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.25)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.15)';
        }
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick, { passive: true });

    // Theme toggle functionality
    const themeIcon = document.querySelector('.theme-icon');
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeIcon) themeIcon.textContent = '☀️';
    } else {
        if (themeIcon) themeIcon.textContent = '🌙';
    }

    // Theme toggle event
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            
            if (isDark) {
                if (themeIcon) themeIcon.textContent = '☀️';
                localStorage.setItem('theme', 'dark');
            } else {
                if (themeIcon) themeIcon.textContent = '🌙';
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Card expand/collapse functionality
    document.querySelectorAll('.card-toggle').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.card');
            const content = card.querySelector('.card-content');
            const isExpanded = card.classList.contains('expanded');
            
            if (isExpanded) {
                card.classList.remove('expanded');
                content.style.maxHeight = '120px';
                this.innerHTML = '<span>المزيد</span> <i>▼</i>';
                this.setAttribute('aria-expanded', 'false');
            } else {
                card.classList.add('expanded');
                content.style.maxHeight = content.scrollHeight + 'px';
                this.innerHTML = '<span>أقل</span> <i>▲</i>';
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Initialize card states
    document.querySelectorAll('.card').forEach(card => {
        const content = card.querySelector('.card-content');
        const toggle = card.querySelector('.card-toggle');
        
        if (content && toggle) {
            content.style.maxHeight = '120px';
            toggle.innerHTML = '<span>المزيد</span> <i>▼</i>';
            toggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Logo animation on scroll
    const logo = document.querySelector('.nav-logo .logo-img');
    if (logo) {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down
                logo.style.transform = 'scale(0.8) rotate(5deg)';
            } else {
                // Scrolling up or at top
                logo.style.transform = 'scale(1) rotate(0deg)';
            }
            
            lastScrollY = currentScrollY;
        }, { passive: true });
    }

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Animate cards on load
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    });

    // Add intersection observer for card animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card').forEach(card => {
        cardObserver.observe(card);
    });
});
