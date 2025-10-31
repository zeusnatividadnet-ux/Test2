const projectsData = [
            {
                id: 1,
                title: "E-Commerce Platform",
                description: "A modern, fully responsive e-commerce solution with real-time inventory management, secure payment integration, and an intuitive admin dashboard.",
                fullDescription: "A comprehensive e-commerce platform built with modern web technologies. Features include real-time inventory tracking, secure payment processing with Stripe, user authentication, order management, and a powerful admin dashboard with analytics.",
                image: "images/project1-thumb.png",
                category: "web",
                featured: true,
                tags: ["React", "Node.js", "MongoDB", "Stripe"],
                role: "Full Stack Developer",
                duration: "3 months",
                technologies: "React, Node.js, Express, MongoDB, Stripe API",
                status: "Live",
                demoLink: "#",
                githubLink: "#"
            },
            {
                id: 2,
                title: "Task Management App",
                description: "Collaborative task management tool with real-time updates and advanced analytics.",
                fullDescription: "A real-time collaborative task management application that helps teams stay organized and productive. Features include drag-and-drop task organization, real-time synchronization, team collaboration tools, and comprehensive analytics dashboard.",
                image: "images/project2-thumb.png",
                category: "web",
                featured: false,
                tags: ["Vue.js", "Firebase", "Tailwind"],
                role: "Frontend Developer",
                duration: "2 months",
                technologies: "Vue.js, Firebase, Tailwind CSS, Vuex",
                status: "Live",
                demoLink: "#",
                githubLink: "#"
            },
            {
                id: 3,
                title: "Interactive Game Hub",
                description: "Engaging browser-based game platform with multiplayer capabilities and leaderboards.",
                fullDescription: "A browser-based gaming platform featuring multiple interactive games with multiplayer support. Includes real-time leaderboards, user profiles, achievement system, and WebSocket-powered multiplayer functionality.",
                image: "images/project3-thumb.png",
                category: "design",
                featured: false,
                tags: ["JavaScript", "Canvas", "WebSocket"],
                role: "Game Developer",
                duration: "4 months",
                technologies: "JavaScript, HTML5 Canvas, WebSocket, Node.js",
                status: "In Development",
                demoLink: "#",
                githubLink: "#"
            }
        ];

        console.log("%c💡 Welcome to my portfolio, fellow developer!", "font-size: 24px; font-weight: bold; color: #6366f1;");
        console.log("%cNice inspection skills! 🔍", "font-size: 16px; color: #ec4899;");
        console.log("%cWant to collaborate? Reach out! 🚀", "font-size: 14px; color: #8b5cf6;");

        // Theme Management
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const savedTheme = localStorage.getItem('theme');
        if (!savedTheme) {
            const systemTheme = prefersDarkScheme.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', systemTheme);
            localStorage.setItem('theme', systemTheme);
        } else {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }

        // Preloader
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.querySelector('.preloader').classList.add('hidden');
                loadProjects();
            }, 2000);
        });

        // Mobile Navigation
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });

        // Custom Cursor
        const cursor = document.querySelector('.cursor');
        const cursorGlow = document.querySelector('.cursor-glow');
        let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0, glowX = 0, glowY = 0;
        const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

        if (!isTouchDevice) {
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

            document.querySelectorAll('a, button, .project-card, input, textarea').forEach(el => {
                el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
                el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
            });
        }

        // Theme Toggle
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
            setTimeout(() => transition.classList.remove('active'), 500);
        }

        // Navigation Highlighting
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.nav-link');

        function highlightNav() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href').includes(current)) {
                    item.classList.add('active');
                }
            });
        }

        // Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });

        // Scroll Events
        const backToTopBtn = document.querySelector('.back-to-top');
        const scrollIndicator = document.querySelector('.scroll-indicator');

        window.addEventListener('scroll', () => {
            const scrollProgress = document.querySelector('.scroll-progress');
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / scrollHeight) * 100;
            scrollProgress.style.transform = `scaleX(${scrolled / 100})`;

            if (window.scrollY > 500) backToTopBtn.classList.add('visible');
            else backToTopBtn.classList.remove('visible');

            if (window.scrollY > 100) scrollIndicator.classList.add('hidden');

            highlightNav();

            const scrollY = window.scrollY;
            document.querySelectorAll('.gradient-blob').forEach((blob, index) => {
                const speed = 0.1 + (index * 0.05);
                blob.style.transform = `translateY(${scrollY * speed}px)`;
            });
        });

        function scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Particles
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
        createParticles();

        // Intersection Observer
        const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('active');
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        // Counter Animation
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

        // Projects
        function loadProjects() {
            const projectsGrid = document.getElementById('projectsGrid');
            projectsGrid.innerHTML = '';

            projectsData.forEach((project, index) => {
                const projectCard = document.createElement('div');
                projectCard.className = `project-card ${project.featured ? 'featured' : ''} reveal reveal-delay-${Math.min(index + 1, 4)}`;
                projectCard.setAttribute('data-category', project.category);
                projectCard.setAttribute('data-project-id', project.id);
                projectCard.setAttribute('tabindex', '0');
                
                projectCard.innerHTML = `
                    <div class="project-img loading">
                        <img src="${project.image}" alt="${project.title}" loading="lazy" onerror="this.style.display='none'">
                    </div>
                    <div class="project-info">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="project-tags">
                            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        <div class="project-links">
                            <a href="${project.demoLink}" class="project-link project-link-primary" onclick="event.stopPropagation()">
                                <span>Live Demo</span>
                                <span>🔗</span>
                            </a>
                            <a href="${project.githubLink}" class="project-link project-link-secondary" onclick="event.stopPropagation()">
                                <span>GitHub</span>
                                <span>💻</span>
                            </a>
                        </div>
                    </div>
                `;

                const img = projectCard.querySelector('img');
                img.addEventListener('load', function() {
                    this.classList.add('loaded');
                    this.parentElement.classList.remove('loading');
                });

                projectCard.addEventListener('click', () => openProjectModal(project));
                projectsGrid.appendChild(projectCard);
            });

            document.querySelectorAll('.project-card').forEach(el => observer.observe(el));
        }

        // Project Filters
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const projectCards = document.querySelectorAll('.project-card');
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
                        setTimeout(() => card.style.display = 'none', 300);
                    }
                });
            });
        });

        // Project Modal
        function openProjectModal(project) {
            const modal = document.getElementById('projectModal');
            document.getElementById('modalProjectImage').src = project.image;
            document.getElementById('modalProjectTitle').textContent = project.title;
            document.getElementById('modalProjectDescription').textContent = project.fullDescription;
            document.getElementById('modalProjectRole').textContent = project.role;
            document.getElementById('modalProjectDuration').textContent = project.duration;
            document.getElementById('modalProjectTech').textContent = project.technologies;
            document.getElementById('modalProjectStatus').textContent = project.status;
            document.getElementById('modalProjectTags').innerHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
            document.getElementById('modalProjectLinks').innerHTML = `
                <a href="${project.demoLink}" class="project-link project-link-primary"><span>Live Demo</span><span>🔗</span></a>
                <a href="${project.githubLink}" class="project-link project-link-secondary"><span>GitHub</span><span>💻</span></a>
            `;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeProjectModal() {
            document.getElementById('projectModal').classList.remove('active');
            document.body.style.overflow = '';
        }

        document.getElementById('projectModal').addEventListener('click', (e) => {
            if (e.target.classList.contains('project-modal')) closeProjectModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeProjectModal();
            const focusedElement = document.activeElement;
            if (e.key === 'Enter' && focusedElement.classList.contains('project-card')) {
                const projectId = focusedElement.getAttribute('data-project-id');
                const project = projectsData.find(p => p.id == projectId);
                if (project) openProjectModal(project);
            }
        });

        // Copy Email Function
        function copyEmail() {
            const emailElement = document.getElementById('emailAddress');
            const email = emailElement ? emailElement.textContent : 'your.email@example.com';
            
            navigator.clipboard.writeText(email).then(() => {
                const feedback = document.querySelector('.copy-feedback');
                feedback.classList.add('show');
                setTimeout(() => feedback.classList.remove('show'), 2000);
            }).catch(err => {
                console.error('Failed to copy email:', err);
                // Fallback for older browsers
                alert('Email: ' + email);
            });
        }

        // Contact Form Validation
        const contactForm = document.getElementById('contactForm');
        
        function validateEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        function showError(fieldId, message) {
            const field = document.getElementById(fieldId);
            const errorElement = document.getElementById(fieldId + 'Error');
            field.classList.add('error');
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }

        function clearError(fieldId) {
            const field = document.getElementById(fieldId);
            const errorElement = document.getElementById(fieldId + 'Error');
            field.classList.remove('error');
            errorElement.classList.remove('show');
        }

        function showFormStatus(type, message) {
            const statusElement = document.getElementById('formStatus');
            statusElement.className = `form-status ${type} show`;
            statusElement.innerHTML = `<span>${type === 'success' ? '✓' : '✗'}</span><span>${message}</span>`;
        }

        function hideFormStatus() {
            document.getElementById('formStatus').classList.remove('show');
        }

        // Clear errors on input
        ['name', 'email', 'message'].forEach(field => {
            document.getElementById(field).addEventListener('input', () => {
                clearError(field);
                hideFormStatus();
            });
        });

        // Contact Form Submission with Formspree
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Clear previous errors
            ['name', 'email', 'message'].forEach(clearError);
            hideFormStatus();

            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                message: document.getElementById('message').value.trim()
            };

            // Validate fields
            let hasError = false;
            if (formData.name.length < 2) { 
                showError('name', 'Name must be at least 2 characters'); 
                hasError = true; 
            }
            if (!validateEmail(formData.email)) { 
                showError('email', 'Please enter a valid email address'); 
                hasError = true; 
            }
            if (formData.message.length < 10) { 
                showError('message', 'Message must be at least 10 characters'); 
                hasError = true; 
            }

            if (hasError) return;

            // Update button state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;

            try {
                // Submit to Formspree
                const response = await fetch('https://formspree.io/f/manlbbwq', {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    showFormStatus('success', 'Message sent successfully! I\'ll get back to you soon.');
                    
                    // Show success overlay after 1 second
                    setTimeout(() => {
                        hideFormStatus();
                        document.querySelector('.message-sent-overlay').classList.add('show');
                    }, 1000);
                } else {
                    // Formspree returned an error
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                // Network error or other issues
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                showFormStatus('error', 'Oops! Something went wrong. Please try again.');
                console.error('Form submission error:', error);
            }
        });

        // Close Message Overlay
        function closeMessageOverlay() {
            document.querySelector('.message-sent-overlay').classList.remove('show');
        }

        document.querySelector('.message-sent-overlay').addEventListener('click', (e) => {
            if (e.target.classList.contains('message-sent-overlay')) closeMessageOverlay();
        });

        // Scroll Indicator Click
        document.querySelector('.scroll-indicator').addEventListener('click', () => {
            document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
        });

        // Form Input Focus Effects
        document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
                this.parentElement.style.transition = 'transform 0.3s ease';
            });
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
        });