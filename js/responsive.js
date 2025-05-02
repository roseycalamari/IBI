/**
 * Responsive behavior handler for Ingrid Bergman Interiors
 * Manages layout switching between desktop and mobile based on screen size
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize responsive behavior
    initResponsive();
    
    // Listen for window resize events
    window.addEventListener('resize', handleResize);
});

/**
 * Initialize responsive behavior
 */
function initResponsive() {
    // Set initial state based on screen size
    handleResize();
    
    // Add special handling for mobile menu toggle
    const menuToggle = document.getElementById('mobileMenuToggle');
    const menuOverlay = document.getElementById('mobileMenuOverlay');
    
    if (menuToggle && menuOverlay) {
        menuToggle.addEventListener('click', function() {
            menuOverlay.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Close menu when clicking a menu item
        const menuItems = document.querySelectorAll('.mobile-menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                menuOverlay.classList.remove('active');
                menuToggle.classList.remove('active');
                
                // Handle section navigation
                const section = this.getAttribute('data-section');
                if (section && section !== 'home') {
                    navigateToSection(section);
                }
            });
        });
    }
    
    // Handle vertical slider navigation
    const slideButtons = document.querySelectorAll('.vertical-slide-btn');
    slideButtons.forEach(button => {
        button.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            if (section) {
                navigateToSection(section);
            }
        });
    });
}

/**
 * Handle window resize events
 */
function handleResize() {
    // Get current viewport width
    const viewportWidth = window.innerWidth;
    
    // Add/remove mobile class to body based on viewport width
    if (viewportWidth <= 992) {
        document.body.classList.add('mobile-view');
        document.body.classList.remove('desktop-view');
    } else {
        document.body.classList.add('desktop-view');
        document.body.classList.remove('mobile-view');
    }
}

/**
 * Navigate to a specific section in mobile view
 * @param {string} section - The section identifier
 */
function navigateToSection(section) {
    // Hide the vertical slider container
    const sliderContainer = document.querySelector('.vertical-slider-container');
    if (sliderContainer) {
        sliderContainer.style.display = 'none';
    }
    
    // Show the appropriate section
    const targetSection = document.querySelector(`.mobile-${section}-section`) || 
                          document.querySelector(`.${section}-section`);
    
    if (targetSection) {
        // Hide all sections first
        const allSections = document.querySelectorAll('.mobile-section, .about-section, .service-section, .brands-section, .contact-section');
        allSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        targetSection.classList.add('active');
        
        // Add back button for mobile
        const backBtn = targetSection.querySelector('.mobile-back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', function() {
                targetSection.classList.remove('active');
                if (sliderContainer) {
                    sliderContainer.style.display = 'block';
                }
            });
        }
        
        // Handle the section close button
        const closeBtn = targetSection.querySelector('.mobile-section-close, .close-service, .close-about');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                targetSection.classList.remove('active');
                if (sliderContainer) {
                    sliderContainer.style.display = 'block';
                }
            });
        }
    }
} 