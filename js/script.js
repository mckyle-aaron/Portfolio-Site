// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navSidebar = document.querySelector('.nav-sidebar');
    
    if (mobileToggle && navSidebar) {
        mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navSidebar.classList.toggle('active');
            
            // Animate toggle lines
            const lines = this.querySelectorAll('.toggle-line');
            if (navSidebar.classList.contains('active')) {
                lines[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                lines[1].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                lines[0].style.transform = 'rotate(0) translate(0, 0)';
                lines[1].style.transform = 'rotate(0) translate(0, 0)';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navSidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
                navSidebar.classList.remove('active');
                const lines = mobileToggle.querySelectorAll('.toggle-line');
                lines[0].style.transform = 'rotate(0) translate(0, 0)';
                lines[1].style.transform = 'rotate(0) translate(0, 0)';
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navSidebar.classList.contains('active')) {
                navSidebar.classList.remove('active');
                const lines = mobileToggle.querySelectorAll('.toggle-line');
                lines[0].style.transform = 'rotate(0) translate(0, 0)';
                lines[1].style.transform = 'rotate(0) translate(0, 0)';
            }
        });
    }
    
    // Project Card Hover Effects
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const border = this.querySelector('.project-border');
            if (border) {
                border.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
            }
        });
        
        // Add subtle tilt effect on mouse move
        this.addEventListener('mousemove', function(e) {
            const cardRect = this.getBoundingClientRect();
            const x = e.clientX - cardRect.left;
            const y = e.clientY - cardRect.top;
            
            const centerX = cardRect.width / 2;
            const centerY = cardRect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            
            const border = this.querySelector('.project-border');
            if (border) {
                border.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
            }
        });
    });
    
    // Active Navigation Highlighting
    function setActiveNav() {
        const currentPage = window.location.pathname.split('/').pop();
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            const link = item.getAttribute('href');
            if (link === currentPage || 
                (currentPage === '' && link === 'index.html') ||
                (currentPage === 'index.html' && link === 'index.html')) {
                item.classList.add('active');
                item.style.color = 'var(--accent-gold)';
            }
        });
    }
    
    setActiveNav();
    
    // Smooth scrolling with offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just '#'
            if (href === '#') return;
            
            // Check if it's an internal page anchor
            if (href.includes('.html')) return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = 0; // No sticky header
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                history.pushState(null, null, href);
                
                // Close mobile menu if open
                if (navSidebar && navSidebar.classList.contains('active')) {
                    navSidebar.classList.remove('active');
                    const lines = mobileToggle.querySelectorAll('.toggle-line');
                    lines[0].style.transform = 'rotate(0) translate(0, 0)';
                    lines[1].style.transform = 'rotate(0) translate(0, 0)';
                }
            }
        });
    });
    
    // Subttye Parallax Effect on Scroll
    function initParallax() {
        const heroSection = document.querySelector('.hero-section');
        const decoration = document.querySelector('.hero-decoration');
        
        if (!heroSection || !decoration) return;
        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            decoration.style.transform = `translateY(${rate}px)`;
        });
    }
    
    initParallax();
    
    // Text Animation on Load
    function animateText() {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        
        if (heroTitle) {
            heroTitle.style.opacity = '0';
            heroTitle.style.transform = 'translateY(20px)';
            heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }, 300);
        }
        
        if (heroSubtitle) {
            heroSubtitle.style.opacity = '0';
            heroSubtitle.style.transform = 'translateY(20px)';
            heroSubtitle.style.transition = 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s';
            
            setTimeout(() => {
                heroSubtitle.style.opacity = '1';
                heroSubtitle.style.transform = 'translateY(0)';
            }, 600);
        }
    }
    
    // Wait for fonts to load
    document.fonts.ready.then(() => {
        animateText();
    });
    
    // Project Cards Staggered Animation
    function animateProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 500 + (index * 100));
        });
    }
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                if (entry.target.classList.contains('projects-grid')) {
                    animateProjectCards();
                }
            }
        });
    }, observerOptions);
    
    // Observe sections
    const sectionsToAnimate = document.querySelectorAll('.featured-work, .quote-section');
    sectionsToAnimate.forEach(section => {
        observer.observe(section);
    });
    
    // Add current year to copyright
    const copyright = document.querySelector('.copyright');
    if (copyright) {
        const currentYear = new Date().getFullYear();
        copyright.textContent = copyright.textContent.replace('2024', currentYear);
    }
    
    // Initialize everything
    window.addEventListener('load', function() {
        // Add loaded class to body for CSS transitions
        document.body.classList.add('loaded');
        
        // Animate in decorative elements
        const decorations = document.querySelectorAll('.page-decoration > *');
        decorations.forEach((deco, index) => {
            deco.style.transition = 'all 0.8s ease';
            setTimeout(() => {
                deco.style.opacity = '1';
            }, 1000 + (index * 100));
        });
    });
});