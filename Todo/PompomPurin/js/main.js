/**
 * Navegación Tecnológica - Main JavaScript
 * Optimized for performance and accessibility
 */

document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const closeMenuButton = document.querySelector('.close-menu-button');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const contactForm = document.getElementById('contactForm');
    const allLinks = document.querySelectorAll('a[href^="#"]');

    // Toggle mobile menu with ARIA support
    if (mobileMenuButton && closeMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
            mobileMenuButton.setAttribute('aria-expanded', 'true');
            mobileMenu.setAttribute('aria-hidden', 'false');
        });

        closeMenuButton.addEventListener('click', function() {
            closeMobileMenu();
        });

        // Close menu when clicking on a link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });

        // Close menu when pressing Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        function closeMobileMenu() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
            mobileMenuButton.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('aria-hidden', 'true');
        }
    }

    // Smooth scrolling for all anchor links
    allLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Get header height for offset
                const headerHeight = document.querySelector('.fixed-header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without scrolling
                history.pushState(null, null, targetId);
            }
        });
    });

    // Scroll to Top Button
    if (scrollToTopBtn) {
        // Throttle scroll event for better performance
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            
            scrollTimeout = setTimeout(function() {
                if (window.pageYOffset > 500) {
                    scrollToTopBtn.classList.add('visible');
                } else {
                    scrollToTopBtn.classList.remove('visible');
                }
            }, 100);
        });

        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Form validation and submission
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const messageError = document.getElementById('message-error');

        // Helper functions for form validation
        function resetErrors() {
            nameError.textContent = '';
            emailError.textContent = '';
            messageError.textContent = '';
            nameInput.classList.remove('error');
            emailInput.classList.remove('error');
            messageInput.classList.remove('error');
        }

        function showError(inputElement, errorElement, message) {
            errorElement.textContent = message;
            inputElement.classList.add('error');
        }

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous errors
            resetErrors();
            
            // Validate form
            let isValid = true;
            
            if (!nameInput.value.trim()) {
                showError(nameInput, nameError, 'Por favor, ingresa tu nombre');
                isValid = false;
            }
            
            if (!emailInput.value.trim()) {
                showError(emailInput, emailError, 'Por favor, ingresa tu correo electrónico');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, emailError, 'Por favor, ingresa un correo electrónico válido');
                isValid = false;
            }
            
            if (!messageInput.value.trim()) {
                showError(messageInput, messageError, 'Por favor, ingresa tu mensaje');
                isValid = false;
            }
            
            if (isValid) {
                // Here you would typically send the form data to a server
                // For demonstration, we'll just show a success message
                
                // Create success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = '¡Gracias por tu mensaje! Te contactaremos pronto.';
                successMessage.style.backgroundColor = '#c6f6d5';
                successMessage.style.color = '#2f855a';
                successMessage.style.padding = '1rem';
                successMessage.style.borderRadius = 'var(--border-radius)';
                successMessage.style.marginBottom = '1rem';
                
                // Insert success message before the form
                contactForm.parentNode.insertBefore(successMessage, contactForm);
                
                // Reset form
                contactForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
        
        // Real-time validation
        nameInput.addEventListener('blur', function() {
            if (!this.value.trim()) {
                showError(this, nameError, 'Por favor, ingresa tu nombre');
            }
        });
    }
});