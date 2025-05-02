/**
 * Advanced Navigation System
 * Provides smooth, performant navigation with enhanced mobile support
 * Optimized for all device sizes and orientations
 */

document.addEventListener('DOMContentLoaded', () => {
    // Navigation elements
    const logoTrigger = document.querySelector('.logo-container');
    const offCanvasNav = document.getElementById('offCanvasNav');
    const offCanvasOverlay = document.getElementById('offCanvasOverlay');
    const body = document.body;
    const menuItems = document.querySelectorAll('.off-canvas-menu-item');
    
    // Current page path for active state
    const currentPath = window.location.pathname;
    
    /**
     * Initialize the navigation system
     */
    const initNavigation = () => {
        // Toggle navigation when clicking the logo
        if (logoTrigger) {
            logoTrigger.addEventListener('click', (e) => {
                e.preventDefault();
                offCanvasNav.classList.toggle('active');
                offCanvasOverlay.classList.toggle('active');
                body.classList.toggle('no-scroll');
                logoTrigger.classList.toggle('active');
            });
        }
        
        // Close when clicking overlay
        if (offCanvasOverlay) {
            offCanvasOverlay.addEventListener('click', () => {
                offCanvasNav.classList.remove('active');
                offCanvasOverlay.classList.remove('active');
                body.classList.remove('no-scroll');
                if (logoTrigger) {
                    logoTrigger.classList.remove('active');
                }
            });
        }
        
        // Set active menu item based on current page
        setActiveMenuItem();
        
        // Handle menu item clicks
        setupMenuItemClicks();
        
        // Close navigation with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && offCanvasNav && offCanvasNav.classList.contains('active')) {
                offCanvasNav.classList.remove('active');
                offCanvasOverlay.classList.remove('active');
                body.classList.remove('no-scroll');
                if (logoTrigger) {
                    logoTrigger.classList.remove('active');
                }
            }
        });
        
        // Prevent content shift when opening menu on small screens
        preventContentShift();
        
        // Add background elements for visual interest
        addBackgroundElements();
        
        // Mobile optimizations
        setupMobileEnhancements();
    };
    
    /**
     * Add interactive background elements to the menu
     */
    const addBackgroundElements = () => {
        if (!offCanvasNav) return;
        
        // Create first background element
        const bg1 = document.createElement('div');
        bg1.classList.add('menu-background-element', 'menu-bg-1');
        offCanvasNav.appendChild(bg1);
        
        // Create second background element
        const bg2 = document.createElement('div');
        bg2.classList.add('menu-background-element', 'menu-bg-2');
        offCanvasNav.appendChild(bg2);
        
        // Add subtle movement to background elements on mouse move
        offCanvasNav.addEventListener('mousemove', (e) => {
            if (!offCanvasNav.classList.contains('active')) return;
            
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * 20;
            const yPos = (clientY / window.innerHeight - 0.5) * 20;
            
            // Use requestAnimationFrame for smooth animation
            requestAnimationFrame(() => {
                bg1.style.transform = `translate(${xPos * 0.5}px, ${yPos * 0.5}px) scale(1)`;
                bg2.style.transform = `translate(${-xPos * 0.3}px, ${-yPos * 0.3}px) scale(1)`;
            });
        });
    };
    
    /**
     * Mobile specific enhancements
     */
    const setupMobileEnhancements = () => {
        // Close nav on orientation change for better mobile experience
        window.addEventListener('orientationchange', () => {
            if (offCanvasNav && offCanvasNav.classList.contains('active')) {
                // Small delay to allow orientation to complete
                setTimeout(closeNavigation, 300);
            }
        });
        
        // Add swipe down to close navigation
        if (offCanvasNav) {
            let touchStartY = 0;
            let touchEndY = 0;
            let touchStartX = 0;
            let touchEndX = 0;
            
            offCanvasNav.addEventListener('touchstart', (e) => {
                touchStartY = e.changedTouches[0].screenY;
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            offCanvasNav.addEventListener('touchend', (e) => {
                touchEndY = e.changedTouches[0].screenY;
                touchEndX = e.changedTouches[0].screenX;
                
                // Detect swipe down or right
                if ((touchEndY - touchStartY > 70 && offCanvasNav.scrollTop <= 0) || 
                    (touchEndX - touchStartX > 100)) {
                    closeNavigation();
                }
            }, { passive: true });
            
            // Improve scrolling within the navigation menu on mobile
            const menuContainer = offCanvasNav.querySelector('.off-canvas-content');
            if (menuContainer) {
                menuContainer.addEventListener('touchmove', (e) => {
                    e.stopPropagation(); // Prevent parent element scrolling issues
                }, { passive: true });
            }
            
            // Better handling of menu item clicks on mobile
            const menuItems = offCanvasNav.querySelectorAll('.off-canvas-menu-item');
            menuItems.forEach(item => {
                item.addEventListener('touchend', (e) => {
                    // Add active state feedback
                    item.classList.add('touch-active');
                    setTimeout(() => {
                        item.classList.remove('touch-active');
                    }, 300);
                }, { passive: true });
            });
            
            // Improve back button handling
            window.addEventListener('popstate', () => {
                if (offCanvasNav.classList.contains('active')) {
                    closeNavigation();
                    history.pushState(null, '', window.location.pathname);
                    return false;
                }
            });
        }
        
        // Detect if device is mobile for specialized handling
        const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobileDevice) {
            document.body.classList.add('is-mobile-device');
            
            // Improve scroll performance
            document.addEventListener('touchmove', (e) => {
                if (document.body.classList.contains('no-scroll')) {
                    e.preventDefault();
                }
            }, { passive: false });
            
            // Ensure consistent active states for touch targets
            const touchTargets = document.querySelectorAll('button, .section-title, .expand-btn, .social-link');
            touchTargets.forEach(target => {
                target.addEventListener('touchstart', () => {
                    target.classList.add('touch-active');
                }, { passive: true });
                
                target.addEventListener('touchend', () => {
                    setTimeout(() => {
                        target.classList.remove('touch-active');
                    }, 300);
                }, { passive: true });
            });
        }
    };
    
    /**
     * Prevent content shift when navigation is opened (modal effect)
     */
    const preventContentShift = () => {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        
        // Store the original padding of body
        const originalPadding = window.getComputedStyle(document.body).paddingRight;
        
        // Store functions that will be used in the event listeners
        const handleBeforeToggle = () => {
            if (!document.body.classList.contains('no-scroll')) {
                document.body.style.paddingRight = `${scrollbarWidth}px`;
            }
        };
        
        const handleAfterToggle = () => {
            if (!document.body.classList.contains('no-scroll')) {
                document.body.style.paddingRight = originalPadding;
            }
        };
        
        // Add event listeners for logo
        logoTrigger.addEventListener('click', handleBeforeToggle, { capture: true });
        logoTrigger.addEventListener('click', () => {
            if (!document.body.classList.contains('no-scroll')) {
                setTimeout(handleAfterToggle, 10);
            }
        }, { capture: false });
    };
    
    /**
     * Set the active menu item based on current page
     */
    const setActiveMenuItem = () => {
        menuItems.forEach(item => {
            const section = item.getAttribute('data-section');
            if (section === 'home' && currentPath === '/') {
                item.classList.add('active');
            } else if (currentPath.includes(section)) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    };
    
    /**
     * Setup event handlers for menu item clicks
     */
    const setupMenuItemClicks = () => {
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                const section = item.getAttribute('data-section');
                if (section) {
                    offCanvasNav.classList.remove('active');
                    offCanvasOverlay.classList.remove('active');
                    body.classList.remove('no-scroll');
                    if (logoTrigger) {
                        logoTrigger.classList.remove('active');
                    }
                    // Handle section navigation here
                }
            });
        });
    };
    
    // Initialize the navigation system
    initNavigation();
    
    // Make functions available globally if needed
    window.navigationSystem = {
        toggleNavigation: () => {
            offCanvasNav.classList.toggle('active');
            offCanvasOverlay.classList.toggle('active');
            body.classList.toggle('no-scroll');
            logoTrigger.classList.toggle('active');
        },
        closeNavigation: () => {
            offCanvasNav.classList.remove('active');
            offCanvasOverlay.classList.remove('active');
            body.classList.remove('no-scroll');
            if (logoTrigger) {
                logoTrigger.classList.remove('active');
            }
        }
    };
});

// Function to handle section activation
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

// Update event listeners to use the new function
document.querySelectorAll('.off-canvas-menu-item, .contact-btn').forEach(item => {
    item.addEventListener('click', function() {
        const section = this.dataset.section;
        if (section === 'home') {
            activateSection(null);
        } else if (section === 'person') {
            activateSection(document.querySelector('.about-section'));
        } else if (section === 'service') {
            activateSection(document.querySelector('.service-section'));
        } else if (section === 'brands') {
            activateSection(document.querySelector('.brands-section'));
        } else if (section === 'contact') {
            activateSection(document.querySelector('.contact-section'));
        }
    });
});

// Update close button handlers
document.querySelectorAll('.close-about, .close-service, .close-brands, .close-contact').forEach(button => {
    button.addEventListener('click', function() {
        activateSection(null);
    });
});