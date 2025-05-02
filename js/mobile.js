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
        galleryBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            // First remove any active modals
            document.querySelectorAll('.mobile-section').forEach(section => {
                if (section.classList.contains('active')) {
                    // Wait a bit before opening the gallery to avoid the section close animation interference
                    setTimeout(createGalleryModal, 100);
                    return;
                }
            });
            // If no active sections, open gallery immediately
            createGalleryModal();
        });
        
        // Improve gallery close button
        const closeGalleryBtn = document.querySelector('.close-gallery');
        if (closeGalleryBtn) {
            closeGalleryBtn.addEventListener('click', () => {
                galleryModal.classList.remove('active');
                document.body.classList.remove('no-scroll');
                
                // Ensure gallery is properly hidden with explicit styles
                galleryModal.style.opacity = '0';
                galleryModal.style.visibility = 'hidden';
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

// Mobile.js - Enhanced mobile functionality for Ingrid Bergman Interiors

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const verticalSlides = document.querySelector('.vertical-slides');
    const slides = document.querySelectorAll('.vertical-slide');
    const dots = document.querySelectorAll('.vertical-slider-dot');
    const menuToggle = document.getElementById('mobileMenuToggle');
    const menuOverlay = document.getElementById('mobileMenuOverlay');
    const menuItems = document.querySelectorAll('.mobile-menu-item');
    const closeButtons = document.querySelectorAll('.mobile-section-close');
    const sectionButtons = document.querySelectorAll('[data-section]');
    const sections = document.querySelectorAll('.mobile-section');
    
    // Initialize
    let currentSlide = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    let slideHeight = window.innerHeight - 140; // Accounting for header and footer
    let isScrolling = false;
    let startTime = 0;
    
    // Set active slide
    function setActiveSlide(index) {
        if (index < 0) index = 0;
        if (index > slides.length - 1) index = slides.length - 1;
        
        currentSlide = index;
        
        // Update slides position
        verticalSlides.style.transform = `translateY(-${index * 33.333}%)`;
        
        // Update active class on slides
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        // Update indicator dots
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Initialize first slide as active
    setActiveSlide(0);
    
    // Handle swipe on vertical slider
    function handleSwipe() {
        const swipeDistance = touchEndY - touchStartY;
        const swipeTime = Date.now() - startTime;
        const isQuickSwipe = swipeTime < 300;
        
        if (swipeDistance > 50 || (isQuickSwipe && swipeDistance > 30)) {
            // Swipe down - go to previous slide
            setActiveSlide(currentSlide - 1);
        } else if (swipeDistance < -50 || (isQuickSwipe && swipeDistance < -30)) {
            // Swipe up - go to next slide
            setActiveSlide(currentSlide + 1);
        }
    }
    
    // Touch event handlers
    verticalSlides.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
        startTime = Date.now();
    }, { passive: true });
    
    verticalSlides.addEventListener('touchmove', function(e) {
        if (isScrolling) return;
        touchEndY = e.touches[0].clientY;
    }, { passive: true });
    
    verticalSlides.addEventListener('touchend', function() {
        if (isScrolling) return;
        handleSwipe();
    });
    
    // Click event for indicator dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            setActiveSlide(index);
        });
    });
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        menuOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Mobile menu item clicks
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            
            // Close menu
            menuOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
            
            // If home, just return to slider
            if (section === 'home') {
                return;
            }
            
            // Open requested section
            openSection(section);
            
            // Update active menu item
            menuItems.forEach(menuItem => {
                menuItem.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Section opening
    function openSection(sectionName) {
        sections.forEach(section => {
            if (section.classList.contains(`mobile-${sectionName}-section`)) {
                section.classList.add('active');
                document.body.classList.add('no-scroll');
            } else {
                section.classList.remove('active');
            }
        });
    }
    
    // Section button clicks
    sectionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            openSection(section);
        });
    });
    
    // Close section
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const section = this.closest('.mobile-section');
            section.classList.remove('active');
            document.body.classList.remove('no-scroll');
            
            // Reset active menu item
            menuItems.forEach(menuItem => {
                if (menuItem.getAttribute('data-section') === 'home') {
                    menuItem.classList.add('active');
                } else {
                    menuItem.classList.remove('active');
                }
            });
        });
    });
    
    // Gallery functionality
    const galleryBtn = document.querySelector('.mobile-gallery-btn');
    const projectInfoBtn = document.querySelector('.mobile-project-info-btn');
    
    if (galleryBtn) {
        galleryBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            // First remove any active modals
            document.querySelectorAll('.mobile-section').forEach(section => {
                if (section.classList.contains('active')) {
                    // Wait a bit before opening the gallery to avoid the section close animation interference
                    setTimeout(createGalleryModal, 100);
                    return;
                }
            });
            // If no active sections, open gallery immediately
            createGalleryModal();
        });
    }
    
    if (projectInfoBtn) {
        projectInfoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            // First remove any active modals
            document.querySelectorAll('.mobile-section').forEach(section => {
                if (section.classList.contains('active')) {
                    // Wait a bit before opening the project description to avoid the section close animation interference
                    setTimeout(createProjectDescriptionModal, 100);
                    return;
                }
            });
            // If no active sections, open project description immediately
            createProjectDescriptionModal();
        });
    }
    
    // Create Gallery Modal
    function createGalleryModal() {
        const galleryModal = document.querySelector('.mobile-gallery-modal');
        
        // Clear previous content
        galleryModal.innerHTML = '';
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.className = 'mobile-gallery-modal-content';
        
        // Header
        const modalHeader = document.createElement('div');
        modalHeader.className = 'mobile-gallery-modal-header';
        modalHeader.innerHTML = `
            <h3 data-translate="projectTitle">Transforming a Family Home</h3>
            <p data-translate="projectLocation">California, US</p>
            <button class="mobile-gallery-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Gallery container
        const galleryContainer = document.createElement('div');
        galleryContainer.className = 'mobile-gallery-container';
        
        // Create gallery with all images from the folder
        const galleryImages = [
            'images/CA project done/IBICali2019-30.jpg',
            'images/CA project done/IBICali2019-31.jpg',
            'images/CA project done/IBICali2019-33.jpg',
            'images/CA project done/IBICali2019-34.jpg',
            'images/CA project done/IBICali2019-351.jpg',
            'images/CA project done/IBICali2019-39.jpg',
            'images/CA project done/IBICali2019-4.jpg',
            'images/CA project done/IBICali2019-40.jpg',
            'images/CA project done/IBICali2019-41.jpg',
            'images/CA project done/IBICali2019-411.jpg',
            'images/CA project done/IBICali2019-42.jpg', 
            'images/CA project done/IBICali2019-43.jpg',
            'images/CA project done/IBICali2019-441.jpg',
            'images/CA project done/IBICali2019-5.jpg',
            'images/CA project done/IBICali2019-6 1.jpg',
            'images/CA project done/IBICali2019-71.jpg',
            'images/CA project done/IBICali2019-8.jpg',
            'images/CA project done/IBICali2019-9 - Copy.jpg',
            'images/CA project done/IBICali2019-12.jpg',
            'images/CA project done/IBICali2019-13.jpg',
            'images/CA project done/IBICali2019-14.jpg',
            'images/CA project done/IBICali2019-15.jpg',
            'images/CA project done/IBICali2019-17.jpg',
            'images/CA project done/IBICali2019-26.jpg',
            'images/CA project done/IBICali2019-29.jpg'
        ];
        
        const gallerySlider = document.createElement('div');
        gallerySlider.className = 'mobile-gallery-slider';
        
        galleryImages.forEach(image => {
            const slide = document.createElement('div');
            slide.className = 'mobile-gallery-slide';
            slide.innerHTML = `<img src="${image}" alt="Project Image" loading="lazy">`;
            gallerySlider.appendChild(slide);
        });
        
        // Controls
        const controls = document.createElement('div');
        controls.className = 'mobile-gallery-controls';
        controls.innerHTML = `
            <button class="mobile-gallery-prev"><i class="fas fa-chevron-left"></i></button>
            <button class="mobile-gallery-next"><i class="fas fa-chevron-right"></i></button>
        `;
        
        // Indicators
        const indicators = document.createElement('div');
        indicators.className = 'mobile-gallery-indicators';
        
        galleryImages.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'mobile-gallery-dot' + (index === 0 ? ' active' : '');
            dot.setAttribute('data-slide', index);
            indicators.appendChild(dot);
        });
        
        // Append all elements
        galleryContainer.appendChild(gallerySlider);
        galleryContainer.appendChild(controls);
        galleryContainer.appendChild(indicators);
        
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(galleryContainer);
        galleryModal.appendChild(modalContent);
        
        // Show modal and ensure it's visible
        galleryModal.style.zIndex = '9999';
        galleryModal.classList.add('active');
        document.body.classList.add('no-scroll');
        
        // Force reflow to ensure visibility
        setTimeout(() => {
            galleryModal.style.opacity = '1';
            galleryModal.style.visibility = 'visible';
        }, 10);
        
        // Gallery functionality
        const slides = gallerySlider.querySelectorAll('.mobile-gallery-slide');
        const dots = indicators.querySelectorAll('.mobile-gallery-dot');
        const prevBtn = controls.querySelector('.mobile-gallery-prev');
        const nextBtn = controls.querySelector('.mobile-gallery-next');
        const closeBtn = modalHeader.querySelector('.mobile-gallery-close');
        
        let currentGallerySlide = 0;
        let isSwiping = false;
        const slideWidth = 100; // in percentage
        
        // Functions
        function updateGallery() {
            gallerySlider.style.transform = `translateX(-${currentGallerySlide * slideWidth}%)`;
            
            dots.forEach((dot, i) => {
                if (i === currentGallerySlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        function nextSlide() {
            if (isSwiping) return;
            currentGallerySlide = (currentGallerySlide + 1) % slides.length;
            updateGallery();
        }
        
        function prevSlide() {
            if (isSwiping) return;
            currentGallerySlide = (currentGallerySlide - 1 + slides.length) % slides.length;
            updateGallery();
        }
        
        // Event listeners
        nextBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event propagation
            nextSlide();
        });
        
        prevBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event propagation
            prevSlide();
        });
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent event propagation
                currentGallerySlide = index;
                updateGallery();
            });
        });
        
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event propagation
            galleryModal.classList.remove('active');
            document.body.classList.remove('no-scroll');
            
            // Ensure modal is hidden
            galleryModal.style.opacity = '0';
            galleryModal.style.visibility = 'hidden';
        });
        
        // Prevent modal from closing when clicking inside the modal content
        modalContent.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent clicks from reaching the background
        });
        
        // Only close when clicking the actual modal background (outside content)
        galleryModal.addEventListener('click', function(e) {
            // Only close if clicking directly on the modal background
            if (e.target === galleryModal) {
                galleryModal.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
        
        // Improved swipe functionality
        let touchStartX = 0;
        let touchEndX = 0;
        let touchMoved = false;
        
        gallerySlider.addEventListener('touchstart', function(e) {
            touchStartX = e.touches[0].clientX;
            touchMoved = false;
            isSwiping = false;
        }, { passive: true });
        
        gallerySlider.addEventListener('touchmove', function(e) {
            touchEndX = e.touches[0].clientX;
            touchMoved = true;
            isSwiping = true;
            
            // Optional: Add visual feedback during swipe
            const diff = touchEndX - touchStartX;
            const threshold = 50;
            if (Math.abs(diff) > threshold) {
                // Apply a gentle transform to indicate swipe direction
                const movePercent = (diff / window.innerWidth) * 15; // Limit movement to 15%
                gallerySlider.style.transform = `translateX(calc(-${currentGallerySlide * slideWidth}% + ${movePercent}%))`;
            }
        }, { passive: true });
        
        gallerySlider.addEventListener('touchend', function(e) {
            e.stopPropagation(); // Prevent event propagation
            
            if (touchMoved) {
                const swipeThreshold = 50;
                const diff = touchEndX - touchStartX;
                
                if (diff > swipeThreshold) {
                    prevSlide();
                } else if (diff < -swipeThreshold) {
                    nextSlide();
                } else {
                    // If swipe wasn't strong enough, reset to current slide
                    updateGallery();
                }
            }
            
            // Reset swiping flag after a short delay
            setTimeout(() => {
                isSwiping = false;
            }, 300);
        });
        
        // Fix for iOS scroll/bounce issues
        modalContent.addEventListener('touchmove', function(e) {
            // Allow scrolling if needed inside a scrollable element
            if (!e.target.closest('.scrollable')) {
                e.preventDefault();
            }
        }, { passive: false });
        
        // Handle keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (!galleryModal.classList.contains('active')) return;
            
            if (e.key === 'ArrowRight') {
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'Escape') {
                galleryModal.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
        
        // Initialize first slide
        updateGallery();
        
        // Ensure modal remains visible by applying inline styles
        galleryModal.style.opacity = '1';
        galleryModal.style.visibility = 'visible';
        
        // Fix for iOS devices
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            galleryModal.style.webkitTransform = 'translateZ(0)';
        }
    }
    
    // Create Project Description Modal
    function createProjectDescriptionModal() {
        const projectModal = document.querySelector('.mobile-project-description-modal');
        
        // Clear previous content
        projectModal.innerHTML = '';
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.className = 'mobile-project-description-content';
        
        // Close button
        const closeButton = document.createElement('button');
        closeButton.className = 'mobile-project-description-close';
        closeButton.innerHTML = '<i class="fas fa-times"></i>';
        
        // Project content
        const projectContent = document.createElement('div');
        projectContent.className = 'mobile-project-description-body';
        projectContent.innerHTML = `
            <div class="mobile-project-description-image">
                <img src="images/CA project done/IBICali2019-30.jpg" alt="California Family Home Project">
            </div>
            <div class="mobile-project-description-text">
                <h3 data-translate="projectTitle">Transforming a Family Home</h3>
                <p data-translate="projectLocation">California, US</p>
                
                <div class="mobile-project-description-separator"></div>
                
                <p data-translate="projectDescription1">"We recently had the pleasure of transforming a classic traditional American quinta into a refined, modern sanctuary for a young family with three children. This full-scale renovation was more than just a makeover—it was a complete reinvention of the space to align with contemporary living while preserving a warm, welcoming atmosphere.</p>
                
                <p data-translate="projectDescription2">The home was fully gutted to allow for a bold redesign, featuring an open floorplan that brings in natural light and flow. At the heart of the home stands a stunning, high-end Italian kitchen—both sleek and functional—paired with a custom-designed bathroom that exudes luxury and serenity.</p>
                
                <p data-translate="projectDescription3">Throughout the house, we laid elegant fishbone oak flooring, adding texture and timeless style. A striking fireplace became a central feature, creating a cozy gathering space for the family. Carefully curated high-end furniture from Eric Kuster, paired with limited edition art and thoughtfully chosen accessories, completed the design with sophistication and personality.</p>
                
                <p data-translate="projectDescription4">Every detail was selected to reflect comfort, elegance, and a touch of boldness—and the result? A truly elevated family home, perfectly tailored to the lifestyle and vision of our delighted clients."</p>
                
                <p class="signature" data-translate="signature">— Ingrid Bergman</p>
            </div>
        `;
        
        // Append all elements
        modalContent.appendChild(closeButton);
        modalContent.appendChild(projectContent);
        projectModal.appendChild(modalContent);
        
        // Show modal and ensure it's visible
        projectModal.style.zIndex = '9999';
        projectModal.classList.add('active');
        document.body.classList.add('no-scroll');
        
        // Force reflow to ensure visibility
        setTimeout(() => {
            projectModal.style.opacity = '1';
            projectModal.style.visibility = 'visible';
        }, 10);
        
        // Prevent modal from closing when clicking inside the modal content
        modalContent.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent clicks from reaching the background
        });
        
        // Only close when clicking the actual modal background (outside content)
        projectModal.addEventListener('click', function(e) {
            // Only close if clicking directly on the modal background
            if (e.target === projectModal) {
                projectModal.classList.remove('active');
                document.body.classList.remove('no-scroll');
                
                // Explicitly set opacity and visibility to ensure the modal is hidden
                projectModal.style.opacity = '0';
                projectModal.style.visibility = 'hidden';
            }
        });
        
        // Close button functionality
        closeButton.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event propagation
            projectModal.classList.remove('active');
            document.body.classList.remove('no-scroll');
            
            // Explicitly set opacity and visibility to ensure the modal is hidden
            projectModal.style.opacity = '0';
            projectModal.style.visibility = 'hidden';
        });
        
        // Handle keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (!projectModal.classList.contains('active')) return;
            
            if (e.key === 'Escape') {
                projectModal.classList.remove('active');
                document.body.classList.remove('no-scroll');
                
                // Explicitly set opacity and visibility to ensure the modal is hidden
                projectModal.style.opacity = '0';
                projectModal.style.visibility = 'hidden';
            }
        });
        
        // Fix for iOS scroll/bounce issues in the project content
        projectContent.addEventListener('touchmove', function(e) {
            e.stopPropagation();
        }, { passive: true });
        
        // Ensure modal remains visible by applying inline styles
        projectModal.style.opacity = '1';
        projectModal.style.visibility = 'visible';
        
        // Fix for iOS devices
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            projectModal.style.webkitTransform = 'translateZ(0)';
        }
    }
    
    // Check for language settings
    const langButtons = document.querySelectorAll('.mobile-lang-btn');
    
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            
            langButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            this.classList.add('active');
            
            // Handle language change event (handled in translations.js)
            const event = new CustomEvent('languageChanged', { detail: { language: lang } });
            document.dispatchEvent(event);
        });
    });
}); 