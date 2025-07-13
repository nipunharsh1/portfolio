// Mobile Menu Toggle
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.navbar a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('fa-times');
        navbar.classList.remove('active');
    });
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

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(25, 31, 54, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--bg-color)';
        header.style.backdropFilter = 'none';
    }
});

// Animate skill progress bars when in view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress-bar');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills-content');
if (skillsSection) {
    observer.observe(skillsSection);
}

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name') || contactForm.querySelector('input[type="text"]').value;
        const email = formData.get('email') || contactForm.querySelector('input[type="email"]').value;
        const message = formData.get('message') || contactForm.querySelector('textarea').value;
        
        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.btn');
        const originalText = submitBtn.value;
        submitBtn.value = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
            submitBtn.value = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Lazy loading for images
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '1';
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

// Responsive font size adjustment
function adjustFontSize() {
    const screenWidth = window.innerWidth;
    const html = document.documentElement;
    
    if (screenWidth <= 365) {
        html.style.fontSize = '45%';
    } else if (screenWidth <= 450) {
        html.style.fontSize = '50%';
    } else if (screenWidth <= 768) {
        html.style.fontSize = '55%';
    } else if (screenWidth <= 1200) {
        html.style.fontSize = '60%';
    } else {
        html.style.fontSize = '62.5%';
    }
}

// Call on load and resize
window.addEventListener('load', adjustFontSize);
window.addEventListener('resize', adjustFontSize);

// Smooth reveal animations for sections
const revealElements = document.querySelectorAll('.services-box, .portfolio-box, .activity-box, .achievement-item');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(element);
});

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Header background change
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(25, 31, 54, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--bg-color)';
        header.style.backdropFilter = 'none';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navbar.classList.contains('active')) {
        menuIcon.classList.remove('fa-times');
        navbar.classList.remove('active');
    }
});

// Add focus management for mobile menu
menuIcon.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        menuIcon.click();
    }
});

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'Layer 3.png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Call preload on page load
window.addEventListener('load', preloadImages);

// Enhanced Typewriter Effect
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;
    
    const text = 'Nipun Harshana';
    let index = 0;
    
    // Clear the text initially
    typewriterElement.textContent = '';
    typewriterElement.style.borderRight = '3px solid var(--main-color)';
    
    function typeCharacter() {
        if (index < text.length) {
            typewriterElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeCharacter, 150); // Adjust speed here (150ms per character)
        } else {
            // Start blinking cursor after typing is complete
            setTimeout(() => {
                typewriterElement.style.animation = 'blink-caret 0.75s step-end infinite';
            }, 500);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeCharacter, 1000);
}

// Initialize typewriter effect when page loads
window.addEventListener('load', initTypewriter);