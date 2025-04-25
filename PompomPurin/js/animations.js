/**
 * Navegación Tecnológica - Animations JavaScript
 * Optimized for performance and accessibility
 */

document.addEventListener('DOMContentLoaded', function() {
    // Wave Animation for Hero Section
    initWaveAnimation();
    
    // Scroll Reveal Animation
    initScrollReveal();
    
    // Intersection Observer for animations
    initIntersectionObserver();
});

/**
 * Initialize wave animation in hero section
 */
function initWaveAnimation() {
    const canvas = document.getElementById('waveCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let isAnimating = true;

    // Set canvas dimensions
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = 200;
    }

    resizeCanvas();
    
    // Throttle resize event for better performance
    let resizeTimeout;
    window.addEventListener('resize', function() {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
        
        resizeTimeout = setTimeout(function() {
            resizeCanvas();
        }, 250);
    });

    // Wave properties
    const waves = [
        { y: 0.5, length: 0.01, amplitude: 20, speed: 0.01 },
        { y: 0.5, length: 0.02, amplitude: 15, speed: 0.02 },
        { y: 0.5, length: 0.015, amplitude: 10, speed: 0.015 }
    ];

    let time = 0;

    // Animation loop with performance optimization
    function animate() {
        if (!isAnimating) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw waves
        waves.forEach((wave, index) => {
            ctx.beginPath();
            ctx.moveTo(0, canvas.height * wave.y);
            
            // Draw wave path with optimized step size
            const step = Math.max(1, Math.floor(canvas.width / 100)); // Reduce points for wider screens
            for (let x = 0; x < canvas.width; x += step) {
                const dx = x * wave.length;
                const y = Math.sin(dx + time * wave.speed) * wave.amplitude + canvas.height * wave.y;
                ctx.lineTo(x, y);
            }
            
            // Complete the wave path
            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.closePath();
            
            // Set wave color
            const alpha = 0.3 - index * 0.1;
            ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`;
            ctx.fill();
        });
        
        time += 0.05;
        animationFrameId = requestAnimationFrame(animate);
    }

    // Start animation
    animate();
    
    // Pause animation when not in viewport for performance
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isAnimating = entry.isIntersecting;
                
                if (isAnimating) {
                    if (!animationFrameId) {
                        animate();
                    }
                } else {
                    if (animationFrameId) {
                        cancelAnimationFrame(animationFrameId);
                        animationFrameId = null;
                    }
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(heroSection);
    }
}

/**
 * Initialize scroll reveal animations
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.service-section, .summary-card, .contact-form-container, .route-step');
    
    // Add CSS for reveal animation
    const style = document.createElement('style');
    style.textContent = `
        .service-section, .summary-card, .contact-form-container, .route-step {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .service-section.revealed, .summary-card.revealed, .contact-form-container.revealed, .route-step.revealed {
            opacity: 1;
            transform: translateY(0);
        }
        
        .summary-card:nth-child(1) { transition-delay: 0.1s; }
        .summary-card:nth-child(2) { transition-delay: 0.2s; }
        .summary-card:nth-child(3) { transition-delay: 0.3s; }
        .summary-card:nth-child(4) { transition-delay: 0.4s; }
        .summary-card:nth-child(5) { transition-delay: 0.5s; }
        
        .route-step:nth-child(1) { transition-delay: 0.1s; }
        .route-step:nth-child(2) { transition-delay: 0.2s; }
        .route-step:nth-child(3) { transition-delay: 0.3s; }
        .route-step:nth-child(4) { transition-delay: 0.4s; }
        .route-step:nth-child(5) { transition-delay: 0.5s; }
    `;
    document.head.appendChild(style);
    
    // Function to check if elements should be revealed
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    }
    
    // Throttle scroll event for better performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(function() {
            checkReveal();
        }, 100);
    });
    
    // Initial check
    window.addEventListener('load', checkReveal);
    
    // Check after a short delay to ensure all elements are properly rendered
    setTimeout(checkReveal, 300);
}

/**
 * Initialize intersection observer for more efficient animations
 */
function initIntersectionObserver() {
    // Only run if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const sections = document.querySelectorAll('.service-section, .summary-section, .contact-section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, { threshold: 0.1 });
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    // Add current year to footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Helper functions for form validation
    window.isValidEmail = function(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
    
    window.showError = function(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
    };
    
    window.resetErrors = function() {
        const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
        const errorMessages = document.querySelectorAll('.error-message');
        
        inputs.forEach(input => input.classList.remove('error'));
        errorMessages.forEach(error => error.textContent = '');
    };
}
