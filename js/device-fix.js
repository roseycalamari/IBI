/**
 * Responsive layout management for Ingrid Bergman Interiors
 * This script ensures the right layout is shown based on screen size
 */

// Execute immediately
(function() {
    function setViewBasedOnScreenSize() {
        var isSmallScreen = window.innerWidth <= 992;
        
        // Apply classes based on screen size
        if (isSmallScreen) {
            document.documentElement.className = 'mobile-device';
            document.body.className = 'mobile-view';
        } else {
            document.documentElement.className = 'desktop-device';
            document.body.className = 'desktop-view';
            
            // Force desktop elements to show
            showDesktopElements();
        }
    }
    
    // Function to show desktop elements
    function showDesktopElements() {
        // Get all desktop elements
        var desktop = document.querySelectorAll('.main-content, .header');
        for (var i = 0; i < desktop.length; i++) {
            desktop[i].style.display = 'block';
        }
        
        // Hide all mobile elements
        var mobile = document.querySelectorAll('.mobile-header, .mobile-footer, .vertical-slider-container, .mobile-menu-overlay');
        for (var j = 0; j < mobile.length; j++) {
            mobile[j].style.display = 'none';
        }
    }
    
    // Function to fix layout after DOM is loaded
    function fixLayout() {
        setViewBasedOnScreenSize();
        
        // For desktop view, ensure the right elements are showing
        if (window.innerWidth > 992) {
            showDesktopElements();
            
            // Force the main content to be visible
            var mainContent = document.querySelector('.main-content');
            if (mainContent) {
                mainContent.style.display = 'flex';
                mainContent.style.opacity = '1';
                mainContent.style.visibility = 'visible';
            }
            
            // Force normal scroll
            document.body.style.overflow = 'visible';
        }
    }
    
    // Initial setup
    setViewBasedOnScreenSize();
    
    // Apply fixes when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixLayout);
    } else {
        fixLayout();
    }
    
    // Also apply on load (for images and assets)
    window.addEventListener('load', fixLayout);
    
    // Update on resize
    window.addEventListener('resize', setViewBasedOnScreenSize);
})(); 