/**
 * Mobile-Specific JavaScript for Ingrid Bergman Interiors
 * Handles vertical sliding panels and mobile interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize mobile functionality
    initMobileSlider();
    initMobileSections();
    initLanguageSwitcher();
});

/**
 * Initialize the vertical slider
 */
function initMobileSlider() {
    // Elements
    const slidesContainer = document.querySelector('.vertical-slides');
    const slides = document.querySelectorAll('.vertical-slide');
    const dots = document.querySelectorAll('.vertical-slider-dot');
    
    // State
    let currentSlide = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    let isAnimating = false;
    
    // Initialize first slide
    goToSlide(0);
    
    // Add indicators click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Add touch handlers for swipe
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });
    
    // Handle swipe gesture
    function handleSwipe() {
        if (isAnimating) return;
        
        const swipeDistance = touchStartY - touchEndY;
        const threshold = 50; // Minimum distance for a swipe
        
        if (swipeDistance > threshold) {
            // Swipe up - go to next slide
            goToSlide(currentSlide + 1);
        } else if (swipeDistance < -threshold) {
            // Swipe down - go to previous slide
            goToSlide(currentSlide - 1);
        }
    }
    
    // Go to specific slide
    function goToSlide(index) {
        if (isAnimating) return;
        isAnimating = true;
        
        // Ensure index is within bounds
        if (index < 0) index = 0;
        if (index >= slides.length) index = slides.length - 1;
        
        currentSlide = index;
        
        // Update slides transform
        slidesContainer.style.transform = `translateY(-${currentSlide * 33.333}%)`;
        
        // Update indicators
        dots.forEach((dot, i) => {
            if (i === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // Update active class on slides
        slides.forEach((slide, i) => {
            if (i === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        // Re-enable animations after transition
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }
    
    // Set up slide button handlers
    const slideButtons = document.querySelectorAll('.vertical-slide-btn');
    slideButtons.forEach(button => {
        button.addEventListener('click', () => {
            const section = button.getAttribute('data-section');
            openSection(section);
        });
    });
    
    // Contact button in footer
    const contactBtn = document.querySelector('.mobile-contact-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            openSection('contact');
        });
    }
}

/**
 * Initialize mobile content sections
 */
function initMobileSections() {
    // Elements
    const sections = {
        person: document.querySelector('.mobile-about-section'),
        service: document.querySelector('.mobile-service-section'),
        brands: document.querySelector('.mobile-brands-section'),
        contact: document.querySelector('.mobile-contact-section')
    };
    
    // Close buttons
    const closeButtons = document.querySelectorAll('.mobile-section-close');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const section = button.closest('.mobile-section');
            if (section) {
                section.classList.remove('active');
            }
        });
    });
    
    // Handle back button
    window.addEventListener('popstate', () => {
        const activeSection = document.querySelector('.mobile-section.active');
        if (activeSection) {
            activeSection.classList.remove('active');
            return false;
        }
    });
    
    // Add history point when opening a section
    window.openSection = function(sectionName) {
        const section = sections[sectionName];
        if (section) {
            // First remove active class from all sections
            Object.values(sections).forEach(s => {
                if (s) s.classList.remove('active');
            });
            
            // Then add active class to requested section
            section.classList.add('active');
            
            // Add history entry
            history.pushState({ section: sectionName }, '', '#' + sectionName);
        }
    };
    
    // Gallery buttons
    const galleryBtn = document.querySelector('.mobile-gallery-btn');
    if (galleryBtn) {
        galleryBtn.addEventListener('click', () => {
            // This would open the gallery modal
            // We'd need the gallery functionality from the desktop version
            console.log('Open gallery');
        });
    }
    
    // Project info button
    const projectInfoBtn = document.querySelector('.mobile-project-info-btn');
    if (projectInfoBtn) {
        projectInfoBtn.addEventListener('click', () => {
            // This would open the project description
            // We'd need the project description functionality from the desktop version
            console.log('Open project info');
        });
    }
}

/**
 * Initialize language switcher
 */
function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.mobile-lang-btn');
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Skip if already active
            if (btn.classList.contains('active')) return;
            
            // Get language code
            const lang = btn.getAttribute('data-lang');
            
            // Update active state
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Apply language change (assuming translations.js is loaded)
            if (window.applyLanguage) {
                window.applyLanguage(lang);
            }
        });
    });
}

/**
 * Add browser detection for iOS specific fixes
 */
function detectBrowser() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
    if (isIOS) {
        document.documentElement.classList.add('ios');
    }
    
    if (isSafari) {
        document.documentElement.classList.add('safari');
    }
    
    // Fix 100vh issue on iOS
    if (isIOS) {
        const fixHeight = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        
        window.addEventListener('resize', fixHeight);
        window.addEventListener('orientationchange', () => {
            setTimeout(fixHeight, 100);
        });
        
        fixHeight();
    }
}

// Run browser detection
detectBrowser();

/**
 * Add smooth scroll for iOS momentum scrolling
 */
function setupSmoothScroll() {
    const mobileContentAreas = document.querySelectorAll('.mobile-section-content');
    
    mobileContentAreas.forEach(content => {
        content.style.webkitOverflowScrolling = 'touch';
    });
}

// Run smooth scroll setup
setupSmoothScroll();

/**
 * Utility function to add touch feedback
 */
function addTouchFeedback() {
    const touchTargets = document.querySelectorAll('button, .mobile-social-link, .mobile-lang-btn');
    
    touchTargets.forEach(target => {
        target.addEventListener('touchstart', () => {
            target.classList.add('touch-active');
        }, { passive: true });
        
        target.addEventListener('touchend', () => {
            setTimeout(() => {
                target.classList.remove('touch-active');
            }, 200);
        }, { passive: true });
    });
}

// Add touch feedback
addTouchFeedback();

/**
 * Handle orientation changes
 */
window.addEventListener('orientationchange', () => {
    // Force redraw after orientation change
    setTimeout(() => {
        const currentSlides = document.querySelector('.vertical-slides');
        if (currentSlides) {
            const currentTransform = currentSlides.style.transform;
            currentSlides.style.transform = 'none';
            
            // Force reflow
            void currentSlides.offsetHeight;
            
            // Restore transform
            currentSlides.style.transform = currentTransform;
        }
    }, 300);
});

// Add mobile detection to HTML element
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.documentElement.classList.add('mobile-device');
}

// Create a redirect for index.html on mobile
if (window.location.pathname.includes('index.html')) {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 1024;
    if (isMobile && !window.location.pathname.includes('mobile.html')) {
        window.location.href = 'mobile.html';
    }
} 