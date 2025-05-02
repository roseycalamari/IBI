/**
 * Responsive behavior handler for Ingrid Bergman Interiors
 * Manages layout switching between desktop and mobile based on screen size
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a real mobile device, not just based on screen size
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Force immediate application of responsive classes based on device type
    handleResize();
    
    // Apply mobile view class immediately if on a true mobile device
    if (isMobileDevice && window.innerWidth <= 992) {
        document.body.classList.add('mobile-view');
        document.body.classList.remove('desktop-view');
        
        // Force display of mobile elements only on real mobile devices
        const mobileElements = document.querySelectorAll('.mobile-header, .mobile-footer, .vertical-slider-container');
        mobileElements.forEach(el => {
            el.style.display = 'block';
        });
        
        // Force hide desktop elements only on real mobile devices
        const desktopElements = document.querySelectorAll('.main-content, .header');
        desktopElements.forEach(el => {
            el.style.display = 'none';
        });
    } else {
        // Make sure desktop view is applied to non-mobile devices
        document.body.classList.add('desktop-view');
        document.body.classList.remove('mobile-view');
        
        // Ensure desktop elements are visible on desktop
        const desktopElements = document.querySelectorAll('.main-content, .header');
        desktopElements.forEach(el => {
            el.style.display = 'block';
        });
        
        // Hide mobile elements on desktop
        const mobileElements = document.querySelectorAll('.mobile-header, .mobile-footer, .vertical-slider-container');
        mobileElements.forEach(el => {
            el.style.display = 'none';
        });
    }
    
    // Initialize responsive behavior
    initResponsive();
    
    // Listen for window resize events
    window.addEventListener('resize', handleResize);
});

/**
 * Initialize responsive behavior
 */
function initResponsive() {
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
    
    // Check for mobile device - use a more reliable test
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Only apply mobile view to actual mobile devices or very small screens
    if ((viewportWidth <= 992 && isMobileDevice) || viewportWidth <= 576) {
        document.body.classList.add('mobile-view');
        document.body.classList.remove('desktop-view');
        
        // Only force mobile display on mobile devices
        if (isMobileDevice) {
            document.querySelectorAll('.mobile-header, .mobile-footer, .vertical-slider-container').forEach(el => {
                el.style.display = 'block';
            });
            
            document.querySelectorAll('.main-content, .header').forEach(el => {
                el.style.display = 'none';
            });
        }
    } else {
        document.body.classList.add('desktop-view');
        document.body.classList.remove('mobile-view');
        
        // Always show desktop elements on large screens
        document.querySelectorAll('.main-content, .header').forEach(el => {
            el.style.display = 'block';
        });
        
        // Hide mobile elements on desktop
        document.querySelectorAll('.mobile-header, .mobile-footer, .vertical-slider-container, .mobile-menu-overlay').forEach(el => {
            el.style.display = 'none';
        });
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