// Global Variables
let currentTypingIndex = 0;
let isTypingComplete = false;
let typingTimeout;

// Typing effect for navigation brand
const typingTexts = ["Revan VR"];
const heroTypingTexts = [
    "Aspiring Full Stack Developer",
    "IoT Innovator", 
    "ML Enthusiast",
    "Problem Solver",
    "Tech Enthusiast"
];

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize typing effects
    initNavTyping();
    initHeroTyping();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize form handling
    initContactForm();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize profile photo animations
    initProfilePhotoAnimations();
    
    // Initialize certification animations
    initCertificationAnimations();
});

// Navigation typing effect
function initNavTyping() {
    const navTypingElement = document.getElementById('typingName');
    const navCursor = document.getElementById('cursor');
    
    if (!navTypingElement || !navCursor) return;
    
    let text = 'Just Coding...';
    let index = 0;
    let isDeleting = false;
    
    function typeNavText() {
        if (isDeleting) {
            navTypingElement.textContent = text.substring(0, index - 1);
            index--;
            
            if (index === 0) {
                isDeleting = false;
                setTimeout(typeNavText, 500);
            } else {
                setTimeout(typeNavText, 50);
            }
        } else {
            navTypingElement.textContent = text.substring(0, index + 1);
            index++;
            
            if (index === text.length) {
                setTimeout(() => {
                    isDeleting = true;
                    typeNavText();
                }, 3000);
            } else {
                setTimeout(typeNavText, 100);
            }
        }
    }
    
    typeNavText();
}

// Hero typing effect
function initHeroTyping() {
    const heroTypingElement = document.getElementById('typingText');
    
    if (!heroTypingElement) return;
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeHeroText() {
        const currentText = heroTypingTexts[textIndex];
        
        if (isDeleting) {
            heroTypingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % heroTypingTexts.length;
                setTimeout(typeHeroText, 500);
            } else {
                setTimeout(typeHeroText, 30);
            }
        } else {
            heroTypingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentText.length) {
                setTimeout(() => {
                    isDeleting = true;
                    typeHeroText();
                }, 2000);
            } else {
                setTimeout(typeHeroText, 80);
            }
        }
    }
    
    // Start typing effect after a small delay
    setTimeout(typeHeroText, 1000);
}

// Profile photo animations
function initProfilePhotoAnimations() {
    const profilePhoto = document.getElementById('profilePhoto');
    
    if (!profilePhoto) return;
    
    // Add random float variations
    setInterval(() => {
        const wrapper = profilePhoto.closest('.profile-photo-wrapper');
        if (wrapper) {
            const randomDelay = Math.random() * 2000;
            setTimeout(() => {
                wrapper.style.animationDuration = `${5 + Math.random() * 3}s`;
            }, randomDelay);
        }
    }, 8000);
    
    // Add parallax effect on mouse move
    document.addEventListener('mousemove', (e) => {
        const wrapper = profilePhoto.closest('.profile-photo-wrapper');
        if (!wrapper) return;
        
        const rect = wrapper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        const maxDistance = 100;
        const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
        
        if (distance < maxDistance) {
            const moveX = (mouseX / maxDistance) * 8;
            const moveY = (mouseY / maxDistance) * 8;
            
            profilePhoto.style.transform = `scale(1.05) translate(${moveX}px, ${moveY}px)`;
        } else {
            profilePhoto.style.transform = 'scale(1) translate(0, 0)';
        }
    });
}

// Certification animations
function initCertificationAnimations() {
    const certCards = document.querySelectorAll('.cert-card');
    
    certCards.forEach((card, index) => {
        // Add floating animation
        const floatDelay = index * 0.5;
        card.style.animation = `float 8s ease-in-out infinite ${floatDelay}s`;
        
        // Add hover tilt effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
        });
        
        // Add click animation
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(-20px) scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'translateY(-15px) scale(1.02)';
            }, 200);
        });
    });
}

// Enhanced scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                
                // Add staggered animation for certification cards
                if (entry.target.classList.contains('certifications-grid')) {
                    const certCards = entry.target.querySelectorAll('.cert-card');
                    certCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('reveal');
                        }, index * 200);
                    });
                }
                
                // Add staggered animation for other grid items
                if (entry.target.classList.contains('skills-grid') || 
                    entry.target.classList.contains('experience-grid') || 
                    entry.target.classList.contains('projects-grid')) {
                    
                    const items = entry.target.querySelectorAll('.skill-card, .exp-card, .project-card');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('reveal');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe all elements with reveal classes
    const elementsToObserve = document.querySelectorAll(
        '.reveal-text, .reveal-up, .skill-card, .exp-card, .project-card, .cert-card, .contact-form, .contact-info, .about-text, .cp-content, .certifications-grid'
    );
    
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
}

// Mobile navigation
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (!contactForm || !formMessage) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const message = formData.get('message').trim();
        
        // Basic validation
        if (!name || !email || !message) {
            showFormMessage('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Form message display
function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    if (!formMessage) return;
    
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 11, 15, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 11, 15, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// Active nav link highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Export functions for potential external use
window.PortfolioAnimations = {
    initNavTyping,
    initHeroTyping,
    initScrollAnimations,
    initMobileNav,
    initContactForm,
    initSmoothScrolling,
    initProfilePhotoAnimations,
    initCertificationAnimations
};
