// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const sidebarClose = document.getElementById('sidebarClose');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarThemeToggle = document.getElementById('sidebarThemeToggle');

    // Open sidebar
    navToggle.addEventListener('click', () => {
        mobileSidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close sidebar
    function closeSidebar() {
        mobileSidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    sidebarClose.addEventListener('click', closeSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);

    // Close sidebar when clicking on a link
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.addEventListener('click', () => {
            closeSidebar();
        });
    });

    // Sidebar theme toggle
    sidebarThemeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        
        // Update both theme toggles
        const themeIcon = document.querySelector('.theme-icon');
        const sidebarThemeIcon = document.querySelector('.sidebar-theme-icon');
        const sidebarThemeText = document.querySelector('.sidebar-theme-text');
        
        if (isDark) {
            themeIcon.textContent = '☀️';
            sidebarThemeIcon.textContent = '☀️';
            sidebarThemeText.textContent = 'الوضع المضيء';
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.textContent = '🌙';
            sidebarThemeIcon.textContent = '🌙';
            sidebarThemeText.textContent = 'الوضع المظلم';
            localStorage.setItem('theme', 'light');
        }
    });

    // Legacy mobile menu support (keeping for compatibility)
    if (navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Add scroll event listener for header transparency
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.25)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.15)';
        }
    });

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

    // Add dynamic particles
    createParticles();
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
let isDarkMode = true; // Current state is dark mode

// Original light theme colors
const lightTheme = {
    heroBackground: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 40%, #4facfe 70%, #2a5298 85%, #1e3c72 100%)',
    gradientOverlay: 'radial-gradient(ellipse at center, rgba(79, 172, 254, 0.3) 0%, rgba(30, 60, 114, 0.8) 70%)',
    aboutBackground: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 30%, #4facfe 60%, #2a5298 80%, #1e3c72 100%)',
    aboutGradient: 'radial-gradient(ellipse at center, rgba(79, 172, 254, 0.3) 0%, rgba(30, 60, 114, 0.8) 70%)',
    learningBackground: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 30%, #4facfe 60%, #2a5298 80%, #1e3c72 100%)',
    learningGradient: 'radial-gradient(ellipse at center, rgba(79, 172, 254, 0.3) 0%, rgba(30, 60, 114, 0.8) 70%)',
    contactBackground: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 30%, #4facfe 60%, #2a5298 80%, #1e3c72 100%)',
    contactGradient: 'radial-gradient(ellipse at center, rgba(79, 172, 254, 0.3) 0%, rgba(30, 60, 114, 0.8) 70%)',
    footerBackground: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 30%, #4facfe 60%, #2a5298 80%, #1e3c72 100%)',
    footerGradient: 'radial-gradient(ellipse at center, rgba(79, 172, 254, 0.3) 0%, rgba(30, 60, 114, 0.8) 70%)',
    headerBackground: 'rgba(255, 255, 255, 0.15)',
    headerBorder: 'rgba(255, 255, 255, 0.2)',
    navBackground: 'rgba(255, 255, 255, 0.05)',
    navBorder: 'rgba(255, 255, 255, 0.1)',
    cardBackground: 'rgba(255, 255, 255, 0.2)',
    cardContentBackground: 'rgba(255, 255, 255, 0.15)'
};

// Dark theme colors (current)
const darkTheme = {
    heroBackground: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 40%, #16213e 70%, #1a1a2e 85%, #0a0a0a 100%)',
    gradientOverlay: 'radial-gradient(ellipse at center, rgba(79, 172, 254, 0.1) 0%, rgba(10, 10, 10, 0.9) 70%)',
    aboutBackground: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 30%, #16213e 60%, #1a1a2e 80%, #0a0a0a 100%)',
    aboutGradient: 'radial-gradient(ellipse at center, rgba(79, 172, 254, 0.1) 0%, rgba(10, 10, 10, 0.9) 70%)',
    learningBackground: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 30%, #16213e 60%, #1a1a2e 80%, #0a0a0a 100%)',
    learningGradient: 'radial-gradient(ellipse at center, rgba(79, 172, 254, 0.1) 0%, rgba(10, 10, 10, 0.9) 70%)',
    contactBackground: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 30%, #16213e 60%, #1a1a2e 80%, #0a0a0a 100%)',
    contactGradient: 'radial-gradient(ellipse at center, rgba(79, 172, 254, 0.1) 0%, rgba(10, 10, 10, 0.9) 70%)',
    footerBackground: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 30%, #16213e 60%, #1a1a2e 80%, #0a0a0a 100%)',
    footerGradient: 'radial-gradient(ellipse at center, rgba(79, 172, 254, 0.1) 0%, rgba(10, 10, 10, 0.9) 70%)',
    headerBackground: 'rgba(0, 0, 0, 0.4)',
    headerBorder: 'rgba(255, 255, 255, 0.1)',
    navBackground: 'rgba(255, 255, 255, 0.03)',
    navBorder: 'rgba(255, 255, 255, 0.05)',
    cardBackground: 'rgba(79, 172, 254, 0.15)',
    cardContentBackground: 'rgba(42, 82, 152, 0.1)'
};

function toggleTheme() {
    const heroBackground = document.querySelector('.hero-background');
    const gradientOverlay = document.querySelector('.gradient-overlay');
    const aboutBackground = document.querySelector('.about-background');
    const aboutGradient = document.querySelector('.about-gradient');
    const learningBackground = document.querySelector('.learning-background');
    const learningGradient = document.querySelector('.learning-gradient');
    const contactBackground = document.querySelector('.contact-background');
    const contactGradient = document.querySelector('.contact-gradient');
    const footerBackground = document.querySelector('.footer-background');
    const footerGradient = document.querySelector('.footer-gradient');
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const cardHeaders = document.querySelectorAll('.card-header');
    const cardContents = document.querySelectorAll('.card-content');

    if (isDarkMode) {
        // Switch to light mode
        heroBackground.style.background = lightTheme.heroBackground;
        gradientOverlay.style.background = lightTheme.gradientOverlay;
        aboutBackground.style.background = lightTheme.aboutBackground;
        aboutGradient.style.background = lightTheme.aboutGradient;
        if (learningBackground) learningBackground.style.background = lightTheme.learningBackground;
        if (learningGradient) learningGradient.style.background = lightTheme.learningGradient;
        if (contactBackground) contactBackground.style.background = lightTheme.contactBackground;
        if (contactGradient) contactGradient.style.background = lightTheme.contactGradient;
        if (footerBackground) footerBackground.style.background = lightTheme.footerBackground;
        if (footerGradient) footerGradient.style.background = lightTheme.footerGradient;
        header.style.background = lightTheme.headerBackground;
        header.style.borderColor = lightTheme.headerBorder;
        
        navLinks.forEach(link => {
            link.style.background = lightTheme.navBackground;
            link.style.borderColor = lightTheme.navBorder;
        });
        
        cardHeaders.forEach(cardHeader => {
            cardHeader.style.background = lightTheme.cardBackground;
        });
        
        cardContents.forEach(cardContent => {
            cardContent.style.background = lightTheme.cardContentBackground;
        });
        
        themeIcon.textContent = '☀️';
        isDarkMode = false;
    } else {
        // Switch to dark mode
        heroBackground.style.background = darkTheme.heroBackground;
        gradientOverlay.style.background = darkTheme.gradientOverlay;
        aboutBackground.style.background = darkTheme.aboutBackground;
        aboutGradient.style.background = darkTheme.aboutGradient;
        if (learningBackground) learningBackground.style.background = darkTheme.learningBackground;
        if (learningGradient) learningGradient.style.background = darkTheme.learningGradient;
        if (contactBackground) contactBackground.style.background = darkTheme.contactBackground;
        if (contactGradient) contactGradient.style.background = darkTheme.contactGradient;
        if (footerBackground) footerBackground.style.background = darkTheme.footerBackground;
        if (footerGradient) footerGradient.style.background = darkTheme.footerGradient;
        header.style.background = darkTheme.headerBackground;
        header.style.borderColor = darkTheme.headerBorder;
        
        navLinks.forEach(link => {
            link.style.background = darkTheme.navBackground;
            link.style.borderColor = darkTheme.navBorder;
        });
        
        cardHeaders.forEach(cardHeader => {
            cardHeader.style.background = darkTheme.cardBackground;
        });
        
        cardContents.forEach(cardContent => {
            cardContent.style.background = darkTheme.cardContentBackground;
        });
        
        themeIcon.textContent = '🌙';
        isDarkMode = true;
    }
}

// Add event listener to theme toggle button
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// Scroll Animation for About Section with Fade In/Out
function animateOnScroll() {
    const aboutTitle = document.querySelector('.about-title');
    const aboutQuote = document.querySelector('.about-quote');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Element is visible - fade in
                entry.target.classList.add('animate');
                entry.target.classList.remove('fade-out');
            } else {
                // Element is not visible - fade out
                entry.target.classList.remove('animate');
                entry.target.classList.add('fade-out');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px 0px 0px'
    });
    
    if (aboutTitle) observer.observe(aboutTitle);
    if (aboutQuote) observer.observe(aboutQuote);
}

// Contact form submission handler
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const country = document.getElementById('country').value;
        const phone = document.getElementById('phone').value;
        const gender = document.querySelector('input[name="gender"]:checked')?.value;
        const device = document.querySelector('input[name="device"]:checked')?.value;
        
        // Validate name (should have at least 4 words)
        const nameWords = name.trim().split(/\s+/);
        if (nameWords.length < 4) {
            showMessage('يرجى إدخال الاسم الرباعي كاملاً', 'error');
            return;
        }
        
        // Validate phone number
        if (phone.length < 7) {
            showMessage('يرجى إدخال رقم هاتف صحيح', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.classList.add('loading');
        submitBtn.textContent = 'جاري الإرسال...';
        showMessage('جاري الإرسال...', 'loading');
        
        // Submit to Google Sheets
        submitToGoogleSheets({
            name: name,
            country: country,
            phone: phone,
            gender: gender,
            device: device,
            timestamp: new Date().toLocaleString('ar-EG')
        }, this);
    });

    // Function to submit data to Google Sheets
    function submitToGoogleSheets(formData, form) {
        // Replace this URL with your Google Apps Script Web App URL
        const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzm8rdvKfz4sW2a0IXXGBqEYv3yvSofeOV4szoy3KRUYt4VD4xvqKvwo5jGLQ_vGagr/exec';
        
        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(() => {
            // Show success state
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('success');
            submitBtn.textContent = '✓ تم الإرسال بنجاح!';
            showMessage('تم الإرسال بنجاح! سنتواصل معك قريباً', 'success');
            
            // Reset form after 3 seconds
            setTimeout(() => {
                form.reset();
                // Reset country to Egypt
                document.getElementById('country').value = '+20';
                // Reset button
                submitBtn.classList.remove('success');
                submitBtn.textContent = 'إرسال';
            }, 3000);
        })
        .catch((error) => {
            console.error('Error:', error);
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.classList.remove('loading');
            submitBtn.textContent = 'إرسال';
            showMessage('حدث خطأ في الإرسال. يرجى المحاولة مرة أخرى', 'error');
        });
    }

    // Function to show messages
    function showMessage(message, type) {
        // Remove existing message if any
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        // Insert message before submit button
        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.parentNode.insertBefore(messageDiv, submitBtn);
        
        // Remove message after 4 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 4000);
    }

    // Initialize scroll animations and cards
    animateOnScroll();
    initializeCards();
});

// Card Expansion Animation
function initializeCards() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Close other cards first
            cards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('expanded');
                }
            });
            
            // Toggle current card expansion
            card.classList.toggle('expanded');
        });
    });
}


// Create floating particles
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 10 + 5}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Add CSS for floating particles animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .nav-menu.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(30, 60, 114, 0.95);
        backdrop-filter: blur(20px);
        flex-direction: column;
        padding: 2rem;
        border-radius: 0 0 20px 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
    }
`;
document.head.appendChild(style);
