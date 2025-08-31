// Modern JavaScript for FACE Website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeMobileMenu();
    initializeFormHandlers();
    initializeAnimations();
    initializeCountdownTimer();
    initializeScrollEffects();
    initializeTypingEffect();
});

// Typing effect for hero title
function initializeTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        const words = ['Innovate.', 'Collaborate.', 'Code.'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function typeWriter() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                // Deleting effect
                heroTitle.innerHTML = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                // Typing effect
                heroTitle.innerHTML = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            // Handle word transitions
            if (!isDeleting && charIndex === currentWord.length) {
                // Pause at end of word
                typingSpeed = 1000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Move to next word
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 500;
            }
            
            setTimeout(typeWriter, typingSpeed);
        }
        
        // Start the typing effect
        setTimeout(typeWriter, 1000);
    }
}

// Mobile menu functionality
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = navMenu.querySelectorAll('.nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

// Form handlers
function initializeFormHandlers() {
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (validateEmail(email)) {
                showNotification('Thank you for subscribing! We\'ll keep you updated.', 'success');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
    
    // Button interactions
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Handle specific button actions
            const buttonText = this.textContent.toLowerCase();
            
            if (buttonText.includes('register')) {
                showNotification('Registration portal coming soon!', 'info');
            } else if (buttonText.includes('learn more') || buttonText.includes('view details')) {
                showNotification('Event details will be available soon!', 'info');
            } else if (buttonText.includes('subscribe')) {
                // Handled by form submit
                return;
            }
        });
    });
}

// Animations and effects
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.event-card, .team-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Timeline animations
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.3, rootMargin: '0px 0px -100px 0px' });
    
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        if (index % 2 === 0) {
            item.style.transform = 'translateX(-50px)';
        } else {
            item.style.transform = 'translateX(50px)';
        }
        item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        timelineObserver.observe(item);
    });
}

// Countdown timer for featured event
function initializeCountdownTimer() {
    const timerNumbers = document.querySelectorAll('.timer-number');
    
    if (timerNumbers.length > 0) {
        // Set target date (January 18, 2025)
        const targetDate = new Date('2025-01-18T00:00:00').getTime();
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = targetDate - now;
            
            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                
                if (timerNumbers[0]) timerNumbers[0].textContent = days;
                if (timerNumbers[1]) timerNumbers[1].textContent = hours;
                if (timerNumbers[2]) timerNumbers[2].textContent = minutes;
            } else {
                // Event has passed
                timerNumbers.forEach(num => {
                    num.textContent = '0';
                });
            }
        }
        
        // Update immediately and then every minute
        updateCountdown();
        setInterval(updateCountdown, 60000);
    }
}

// Scroll effects
function initializeScrollEffects() {
    // Intentionally left blank: navbar visual state is controlled by CSS only.
}

// Navbar scroll listeners removed — keep navbar visuals in CSS only.

// Utility functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: #0d1117;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        font-family: 'Poppins', sans-serif;
        font-size: 0.9rem;
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = '#0ea5e9';
            break;
        case 'error':
            notification.style.background = '#ef4444';
            notification.style.color = '#ffffff';
            break;
        case 'info':
        default:
            notification.style.background = '#161b22';
            notification.style.color = '#ffffff';
            break;
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Enhanced hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Team card hover effects
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 40px rgba(14, 165, 233, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
    
    // Event card hover effects
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 30px rgba(14, 165, 233, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
    

});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation to buttons
document.addEventListener('DOMContentLoaded', function() {
    const primaryButtons = document.querySelectorAll('.btn-primary');
    
    primaryButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                const originalText = this.textContent;
                this.textContent = 'Loading...';
                this.classList.add('loading');
                this.disabled = true;
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.classList.remove('loading');
                    this.disabled = false;
                }, 1500);
            }
        });
    });
});
