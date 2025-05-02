/**
 * Device-specific fixes for Ingrid Bergman Interiors
 * This script ensures the right layout is shown based on the device type
 */

// Execute immediately
(function() {
    // Simple check for mobile devices
    var isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Add necessary classes
    if (isMobileDevice) {
        document.documentElement.className = 'mobile-device';
        document.body.className = 'mobile-view';
    } else {
        document.documentElement.className = 'desktop-device';
        document.body.className = 'desktop-view';
        
        // Force desktop elements to show
        showDesktopElements();
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
        // For desktop view, ensure the right elements are showing
        if (!isMobileDevice) {
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
    
    // Apply fixes when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixLayout);
    } else {
        fixLayout();
    }
    
    // Also apply on load (for images and assets)
    window.addEventListener('load', fixLayout);
})(); 