// Zeus.dev Portfolio - Enhanced JavaScript

// Console Easter Egg
console.log("%c⚡ Welcome to Zeus.dev — handcrafted with precision.", "font-size: 24px; font-weight: bold; color: #6366f1;");
console.log("%cNice inspection skills! 🔍", "font-size: 16px; color: #ec4899;");
console.log("%cWant to collaborate? Reach out! 🚀", "font-size: 14px; color: #8b5cf6;");

// Preloader with enhanced timing
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.preloader').classList.add('hidden');
    }, 2500);
});

// Custom Cursor with smooth following
const cursor = document.querySelector('.cursor');
const cursorGlow = document.querySelector('.cursor-glow');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    glowX += (mouseX - glowX) * 0.15;
    glowY += (mouseY - glowY) * 0.15;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';

    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effect
document.querySelectorAll('a, button, .project-card, input, textarea, .filter-btn').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Theme Toggle with smooth transition
function toggleTheme() {
    const html = document.documentElement;
    const transition = document.querySelector('.theme-transition');
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    transition.classList.add('active');
    
    setTimeout(() => {
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }, 250);
    
    setTimeout(() => {
        transition.classList.remove('active');
    }, 500);
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Enhanced Scroll Progress Bar with parallax
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateScrollEffects();
            ticking = false;
        });
        ticking = true;
    }
});

function updateScrollEffects() {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    scrollProgress.style.transform = `scaleX(${scrolled / 100})`;

    // Parallax effect for background blobs
    const scrollY = window.scrollY;
    document.querySelectorAll('.gradient-blob').forEach((blob, index) => {
        const speed = 0.1 + (index * 0.05);
        blob.style.transform = `translateY(${scrollY * speed}px)`;
    });

    // Parallax for hero elements
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroOffset = hero.getBoundingClientRect().top;
        if (heroOffset < window.innerHeight && heroOffset > -hero.offsetHeight) {
            const heroParallax = (window.innerHeight - heroOffset) * 0.3;
            document.querySelector('.hero-text')?.style.setProperty('transform', `translateY(${heroParallax * 0.05}px)`);
            document.querySelector('.hero-image')?.style.setProperty('transform', `translateY(${heroParallax * -0.03}px)`);
        }
    }

    // Scroll to top button visibility
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (window.scrollY > 400) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
}

// Scroll to top button functionality
document.querySelector('.scroll-to-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Mousemove parallax for hero section
document.querySelector('.hero')?.addEventListener('mousemove', (e) => {
    const hero = e.currentTarget;
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const profileImg = document.querySelector('.profile-img');
    const floatingElements = document.querySelectorAll('.floating-element');

    if (profileImg) {
        profileImg.style.transform = `translateY(${y * 20}px) translateX(${x * 20}px)`;
    }

    floatingElements.forEach((el, index) => {
        const multiplier = (index + 1) * 15;
        el.style.transform = `translateY(${y * multiplier}px) translateX(${x * multiplier}px)`;
    });
});

// Project card tilt effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        card.style.transform = `
            perspective(1000px) 
            rotateY(${x * 5}deg) 
            rotateX(${-y * 5}deg) 
            translateY(-15px) 
            scale(1.02)
        `;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Floating Particles (lazy loaded)
function createParticles() {
    const particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 15 + 15) + 's';
        const colors = ['var(--accent-1)', 'var(--accent-2)', 'var(--accent-3)', 'var(--accent-4)'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        document.body.appendChild(particle);
    }
}

// Lazy load particles after page load
setTimeout(createParticles, 1000);

// Intersection Observer for reveal animations with staggered delays
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// Animated Counters with smooth easing
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    counters.forEach(counter => {
        const animate = () => {
            const value = +counter.getAttribute('data-target');
            const data = +counter.innerText;
            const time = value / speed;

            if (data < value) {
                counter.innerText = Math.ceil(data + time);
                setTimeout(animate, 1);
            } else {
                counter.innerText = value + (value === 100 ? '%' : '+');
            }
        };
        animate();
    });
}

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) statsObserver.observe(statsSection);

// Project Filter with smooth transitions
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Copy Email Function with enhanced feedback
function copyEmail() {
    const email = 'zeus@zeus.dev';
    navigator.clipboard.writeText(email).then(() => {
        const feedback = document.querySelector('.copy-feedback');
        feedback.classList.add('show');
        setTimeout(() => {
            feedback.classList.remove('show');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy email:', err);
        alert('Failed to copy email. Please try again.');
    });
}

// Contact Form Submission (EmailJS Integration Ready)
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;

    // Simulate sending (replace with EmailJS in production)
    setTimeout(() => {
        // Reset form
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Show success overlay
        document.querySelector('.message-sent-overlay').classList.add('show');

        // EmailJS Integration (uncomment and configure):
        /*
        emailjs.init('YOUR_USER_ID');
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
            .then(() => {
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                document.querySelector('.message-sent-overlay').classList.add('show');
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Failed to send message. Please try again.');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        */
    }, 1500);
});

function closeMessageOverlay() {
    document.querySelector('.message-sent-overlay').classList.remove('show');
}

// Close overlay on click outside
document.querySelector('.message-sent-overlay')?.addEventListener('click', (e) => {
    if (e.target.classList.contains('message-sent-overlay')) {
        closeMessageOverlay();
    }
});

// Scroll Indicator Click
document.querySelector('.scroll-indicator')?.addEventListener('click', () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
});

// Enhanced input glow effect with scale
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
        this.parentElement.style.transition = 'transform 0.3s ease';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Performance optimization: Lazy load images with fade-in
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.style.opacity = '0';
                    img.removeAttribute('data-src');
                    
                    img.onload = () => {
                        img.style.transition = 'opacity 0.5s ease';
                        img.style.opacity = '1';
                    };
                    
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Section heading staggered reveal on scroll
const sectionTitles = document.querySelectorAll('.section-title');
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
            titleObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

sectionTitles.forEach(title => {
    title.style.opacity = '0';
    titleObserver.observe(title);
});

// Smooth scroll behavior enhancement
document.documentElement.style.scrollBehavior = 'smooth';

// Performance: Request idle callback for non-critical animations
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Initialize non-critical animations here
        console.log('⚡ Non-critical animations initialized');
    });
}

// Keyboard navigation enhancement
document.addEventListener('keydown', (e) => {
    // Escape key closes overlays
    if (e.key === 'Escape') {
        closeMessageOverlay();
    }
});

// Add focus trap for overlays
const messageSentOverlay = document.querySelector('.message-sent-overlay');
if (messageSentOverlay) {
    messageSentOverlay.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            // Keep focus within overlay
            const focusableElements = messageSentOverlay.querySelectorAll('button, a');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey && document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    });
}