/**
 * Mobile-specific enhancements for Ingrid Bergman Interiors
 * Improves touch interactions, scrolling and navigation on mobile devices
 */

// Immediate check to fix desktop view
if (window.innerWidth > 1024) {
    document.body.classList.remove('mobile-slider-active');
}

document.addEventListener('DOMContentLoaded', () => {
    // Check if device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
        || window.innerWidth <= 1024;
    
    if (isMobile) {
        initMobileEnhancements();
    }
    
    // Reinitialize on resize (for orientation changes)
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 1024) {
            initMobileEnhancements();
        }
    });
    
    // Add a special class to the body for mobile targeting
    if (isMobile) {
        document.body.classList.add('is-mobile-device');
    }
});

/**
 * Check if the current device is mobile
 */
function isMobileDevice() {
    return window.innerWidth <= 1024;
}

/**
 * Initialize mobile-specific enhancements
 */
function initMobileEnhancements() {
    // Only apply mobile enhancements if it's actually a mobile device
    if (!isMobileDevice()) {
        document.body.classList.remove('mobile-slider-active');
        return;
    }

    // Check for mobile slider
    const mobileSlider = document.getElementById('mobileSlider');
    if (mobileSlider) {
        document.body.classList.add('mobile-slider-active');
    }
    
    // Fix portrait and section heights
    adjustHeights();
    
    // Improve mobile navigation
    enhanceNavigation();
    
    // Add touch feedback
    addTouchFeedback();
    
    // Fix scrolling issues
    fixScrolling();
    
    // Optimize gallery for mobile
    optimizeGallery();
    
    // Fix hamburger button
    fixHamburgerButton();
    
    // Add double tap protection
    preventDoubleTapZoom();
}

/**
 * Adjust heights for better mobile display
 */
function adjustHeights() {
    // Use viewport height for sizing more reliably
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // Recalculate on resize or orientation change
    window.addEventListener('resize', () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
    
    // Ensure portrait and sections have proper sizing
    const updateElementHeights = () => {
        const viewportHeight = window.innerHeight;
        const sections = document.querySelectorAll('.section');
        const portrait = document.querySelector('.portrait-container');
        
        if (window.innerWidth <= 768) {
            // Adjust section heights on mobile
            sections.forEach(section => {
                section.style.height = `${viewportHeight * 0.28}px`;
                section.style.minHeight = '180px';
            });
            
            // Adjust portrait height on mobile
            if (portrait) {
                portrait.style.height = `${viewportHeight * 0.44}px`;
                portrait.style.minHeight = '250px';
            }
        } else if (window.innerWidth <= 1024) {
            // Adjust for tablets
            sections.forEach(section => {
                section.style.height = `${viewportHeight * 0.33}px`;
                section.style.minHeight = '200px';
            });
            
            if (portrait) {
                portrait.style.height = `${viewportHeight * 0.34}px`;
                portrait.style.minHeight = '280px';
            }
        }
    };
    
    // Run on load and resize
    updateElementHeights();
    window.addEventListener('resize', updateElementHeights);
    window.addEventListener('orientationchange', () => {
        setTimeout(updateElementHeights, 300);
    });
}

/**
 * Enhanced mobile navigation
 */
function enhanceNavigation() {
    const hamburgerButton = document.querySelector('.hamburger-button');
    const offCanvasNav = document.getElementById('offCanvasNav');
    const offCanvasOverlay = document.getElementById('offCanvasOverlay');
    const body = document.body;
    
    // Create hamburger button if it doesn't exist
    if (!hamburgerButton && window.innerWidth <= 768) {
        const newHamburger = document.createElement('div');
        newHamburger.className = 'hamburger-button';
        newHamburger.innerHTML = `
            <div class="hamburger-line line-1"></div>
            <div class="hamburger-line line-2"></div>
            <div class="hamburger-line line-3"></div>
        `;
        document.body.appendChild(newHamburger);
        
        // Add event listener
        newHamburger.addEventListener('click', () => {
            newHamburger.classList.toggle('active');
            offCanvasNav.classList.toggle('active');
            offCanvasOverlay.classList.toggle('active');
            body.classList.toggle('no-scroll');
        });
    }
    
    // Improve mobile section transitions
    const expandButtons = document.querySelectorAll('.expand-btn');
    const aboutBtn = document.querySelector('.about-btn');
    
    expandButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Add timed animation
            setTimeout(() => {
                document.body.classList.add('no-scroll');
            }, 50);
        });
    });
    
    if (aboutBtn) {
        aboutBtn.addEventListener('click', (e) => {
            // Add timed animation
            setTimeout(() => {
                document.body.classList.add('no-scroll');
            }, 50);
        });
    }
    
    // Improve close button interactions
    document.querySelectorAll('.close-about, .close-service, .close-brands, .close-contact').forEach(btn => {
        btn.addEventListener('click', () => {
            // Add smooth exit animation
            document.body.classList.remove('no-scroll');
            
            // Show mobile slider if in mobile mode
            if (window.innerWidth <= 1024) {
                document.body.classList.add('mobile-slider-active');
            }
        });
    });
    
    // Setup back buttons for mobile
    setupMobileBackButtons();
    
    // Handle back button better on mobile
    window.addEventListener('popstate', () => {
        const activeSections = document.querySelectorAll('.section.active');
        if (activeSections.length > 0) {
            activeSections.forEach(section => section.classList.remove('active'));
            document.body.classList.remove('no-scroll');
            document.body.classList.add('mobile-slider-active');
            return false;
        }
    });
}

/**
 * Setup mobile back buttons
 */
function setupMobileBackButtons() {
    // Get all back buttons
    const backButtons = document.querySelectorAll('.mobile-back-btn');
    
    backButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Find the parent section
            const parentSection = btn.closest('.section, .about-section');
            
            if (parentSection) {
                // Remove active class
                parentSection.classList.remove('active');
                
                // Remove no-scroll from body
                document.body.classList.remove('no-scroll');
                document.body.classList.remove('section-active');
                
                // Show mobile slider again
                document.body.classList.add('mobile-slider-active');
            }
        });
    });
}

/**
 * Add touch feedback for a more responsive feel
 */
function addTouchFeedback() {
    // Get all interactive elements
    const touchTargets = document.querySelectorAll('button, .section-title, .expand-btn, .social-link, .off-canvas-menu-item');
    
    touchTargets.forEach(target => {
        // Feedback on touch start
        target.addEventListener('touchstart', () => {
            target.classList.add('touch-active');
        }, { passive: true });
        
        // Remove feedback on touch end
        target.addEventListener('touchend', () => {
            setTimeout(() => {
                target.classList.remove('touch-active');
            }, 200);
        }, { passive: true });
    });
}

/**
 * Fix scrolling issues on mobile
 */
function fixScrolling() {
    // Fix modal scrolling
    const modalContents = document.querySelectorAll('.about-content, .service-content, .brands-content, .contact-content');
    
    modalContents.forEach(content => {
        content.style.webkitOverflowScrolling = 'touch';
        
        // Prevent body scrolling when modal is open
        content.addEventListener('touchmove', (e) => {
            e.stopPropagation();
        }, { passive: true });
    });
    
    // Fix body scroll locking
    document.querySelectorAll('.close-about, .close-service, .close-brands, .close-contact').forEach(btn => {
        btn.addEventListener('click', () => {
            document.body.classList.remove('no-scroll');
        });
    });
    
    // Fix iOS overscroll behavior
    document.body.addEventListener('touchmove', (e) => {
        if (document.body.classList.contains('no-scroll')) {
            e.preventDefault();
        }
    }, { passive: false });
}

/**
 * Optimize gallery view on mobile
 */
function optimizeGallery() {
    const galleryModal = document.getElementById('galleryModal');
    const galleryBtn = document.getElementById('galleryBtn');
    
    if (galleryBtn && galleryModal) {
        // Modify gallery behavior on mobile
        galleryBtn.addEventListener('click', () => {
            document.body.classList.add('no-scroll');
            galleryModal.style.zIndex = '3000';
        });
        
        // Improve gallery close button
        const closeGalleryBtn = document.querySelector('.close-gallery');
        if (closeGalleryBtn) {
            closeGalleryBtn.addEventListener('click', () => {
                document.body.classList.remove('no-scroll');
            });
            
            // Make the close button more visible
            closeGalleryBtn.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
        }
        
        // Make gallery controls more touch-friendly
        const galleryControls = document.querySelectorAll('.gallery-prev, .gallery-next');
        galleryControls.forEach(control => {
            control.style.minWidth = '48px';
            control.style.minHeight = '48px';
        });
    }
}

/**
 * Fix hamburger button display issue
 */
function fixHamburgerButton() {
    const hamburgerButton = document.querySelector('.hamburger-button');
    if (hamburgerButton && window.innerWidth <= 768) {
        hamburgerButton.style.display = 'flex';
        
        // Fix hamburger line display
        const hamburgerLines = hamburgerButton.querySelectorAll('.hamburger-line');
        hamburgerLines.forEach(line => {
            line.style.display = 'block';
        });
    }
}

/**
 * Prevent double tap zooming on iOS
 */
function preventDoubleTapZoom() {
    const touchTargets = document.querySelectorAll('button, .section, .portrait, .off-canvas-menu-item');
    
    touchTargets.forEach(target => {
        target.addEventListener('touchend', (e) => {
            e.preventDefault();
            // Trigger the click after preventing default
            setTimeout(() => {
                if (e.target.click) {
                    e.target.click();
                }
            }, 100);
        }, { passive: false });
    });
}

// Define global mobile navigation helpers
window.mobileNavigation = {
    closeAllSections: function() {
        document.querySelectorAll('.about-section, .service-section, .brands-section, .contact-section').forEach(section => {
            section.classList.remove('active');
        });
        document.body.classList.remove('section-active');
        document.body.classList.remove('no-scroll');
        
        // Show mobile slider in mobile mode
        if (window.innerWidth <= 1024) {
            document.body.classList.add('mobile-slider-active');
        }
    },
    
    closeNav: function() {
        const offCanvasNav = document.getElementById('offCanvasNav');
        const offCanvasOverlay = document.getElementById('offCanvasOverlay');
        const hamburgerButton = document.querySelector('.hamburger-button');
        
        if (offCanvasNav) offCanvasNav.classList.remove('active');
        if (offCanvasOverlay) offCanvasOverlay.classList.remove('active');
        if (hamburgerButton) hamburgerButton.classList.remove('active');
        document.body.classList.remove('no-scroll');
    },
    
    showMobileSlider: function() {
        if (window.innerWidth <= 1024) {
            document.body.classList.add('mobile-slider-active');
        }
    },
    
    hideMobileSlider: function() {
        document.body.classList.remove('mobile-slider-active');
    }
};

/**
 * Mobile Slider Homepage Functionality
 */
(function() {
    // Use function to check mobile status
    let isMobile = isMobileDevice();
    let currentSlide = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    let slideWidth = 0;
    let isAnimating = false;
    
    // Elements
    const mobileSlider = document.getElementById('mobileSlider');
    const slidesContainer = document.getElementById('mobileSlides');
    const slides = document.querySelectorAll('.mobile-slide');
    const indicators = document.querySelectorAll('.mobile-slider-dot');
    const body = document.body;
    
    // Initialize mobile slider
    function initMobileSlider() {
        if (!mobileSlider || !isMobile) {
            // Make sure body doesn't have mobile-slider-active class on desktop
            body.classList.remove('mobile-slider-active');
            return;
        }
        
        // Show mobile slider
        body.classList.add('mobile-slider-active');
        
        // Initialize slide width
        slideWidth = mobileSlider.offsetWidth;
        
        // Setup touch/swipe events
        setupTouchEvents();
        
        // Setup dot indicators
        setupDotIndicators();
        
        // Setup slide buttons
        setupSlideButtons();
        
        // Handle resize
        window.addEventListener('resize', () => {
            // Update mobile detection
            isMobile = isMobileDevice();
            slideWidth = mobileSlider ? mobileSlider.offsetWidth : 0;
            
            if (isMobile) {
                body.classList.add('mobile-slider-active');
                goToSlide(currentSlide);
            } else {
                body.classList.remove('mobile-slider-active');
            }
        });
        
        // Initial slide position
        goToSlide(0);
    }
    
    // Go to a specific slide
    function goToSlide(index) {
        if (isAnimating) return;
        isAnimating = true;
        
        // Keep index within range
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        currentSlide = index;
        
        // Move the slides
        slidesContainer.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        
        // Update active indicators
        indicators.forEach((dot, i) => {
            if (i === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // Update active slides
        slides.forEach((slide, i) => {
            if (i === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        // Allow animations again after transition completes
        setTimeout(() => {
            isAnimating = false;
        }, 400);
    }
    
    // Go to next slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    // Go to previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Setup touch events for swipe
    function setupTouchEvents() {
        slidesContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        slidesContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }
    
    // Handle swipe gesture
    function handleSwipe() {
        const swipeThreshold = 50; // minimum distance for swipe
        const swipeDistance = touchEndX - touchStartX;
        
        if (swipeDistance > swipeThreshold) {
            // Swipe right - go to previous slide
            prevSlide();
        } else if (swipeDistance < -swipeThreshold) {
            // Swipe left - go to next slide
            nextSlide();
        }
    }
    
    // Setup dot indicators
    function setupDotIndicators() {
        indicators.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });
    }
    
    // Setup slide buttons
    function setupSlideButtons() {
        const buttons = document.querySelectorAll('.mobile-slide-btn');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const slide = button.closest('.mobile-slide');
                const section = slide.getAttribute('data-section');
                
                // Activate the appropriate section
                if (section === 'service') {
                    activateSection(document.querySelector('.service-section'));
                } else if (section === 'person') {
                    activateSection(document.querySelector('.about-section'));
                } else if (section === 'brands') {
                    activateSection(document.querySelector('.brands-section'));
                }
                
                // Add no-scroll to body
                body.classList.add('no-scroll');
            });
        });
    }
    
    // Helper function to activate sections
    function activateSection(section) {
        // Remove active class from all sections
        document.querySelectorAll('.about-section, .service-section, .brands-section, .contact-section').forEach(s => {
            s.classList.remove('active');
        });
        
        // Add active class to the selected section
        if (section) {
            section.classList.add('active');
            document.body.classList.add('section-active');
        } else {
            document.body.classList.remove('section-active');
        }
    }
    
    // Initialize when page loads
    document.addEventListener('DOMContentLoaded', () => {
        isMobile = isMobileDevice();
        
        if (isMobile) {
            initMobileSlider();
        } else {
            // Force remove mobile-slider-active on desktop
            body.classList.remove('mobile-slider-active');
        }
    });
})(); 