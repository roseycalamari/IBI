/**
 * Mobile Device Detection and Initialization System
 * Preserves desktop functionality while enabling mobile-specific features
 */

const MobileInitializer = {
    // Device detection flags
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    
    // Initialize device detection
    detectDevice() {
        const userAgent = navigator.userAgent.toLowerCase();
        const screenWidth = window.innerWidth;
        
        this.isMobile = /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent) && screenWidth <= 768;
        this.isTablet = (/ipad|android|tablet/i.test(userAgent) || (screenWidth > 768 && screenWidth <= 1024)) && !this.isMobile;
        this.isDesktop = !this.isMobile && !this.isTablet;
        
        // Add device class to HTML element
        document.documentElement.classList.remove('mobile-device', 'tablet-device', 'desktop-device');
        document.documentElement.classList.add(
            this.isMobile ? 'mobile-device' : 
            this.isTablet ? 'tablet-device' : 
            'desktop-device'
        );
        
        // Set viewport-specific CSS variables
        this.setViewportVariables();
    },
    
    setViewportVariables() {
        const root = document.documentElement;
        const vh = window.innerHeight * 0.01;
        root.style.setProperty('--vh', `${vh}px`);
        
        // Update on resize
        window.addEventListener('resize', () => {
            const vh = window.innerHeight * 0.01;
            root.style.setProperty('--vh', `${vh}px`);
            this.detectDevice(); // Re-detect on resize
        });
    },
    
    // Initialize mobile-specific features
    initMobileFeatures() {
        if (this.isMobile) {
            // Load mobile-specific scripts
            this.loadMobileScripts();
            // Initialize mobile UI
            this.initMobileUI();
            // Setup mobile event handlers
            this.setupMobileEvents();
        }
    },
    
    loadMobileScripts() {
        const scripts = [
            'js/mobile-navigation.js',
            'js/mobile-gestures.js',
            'js/mobile-gallery.js'
        ];
        
        scripts.forEach(src => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            document.body.appendChild(script);
        });
    },
    
    initMobileUI() {
        // Create mobile layout container if needed
        if (!document.querySelector('.mobile-layout-container')) {
            const mobileContainer = document.createElement('div');
            mobileContainer.className = 'mobile-layout-container';
            document.body.appendChild(mobileContainer);
        }
    },
    
    setupMobileEvents() {
        // Prevent desktop hover effects on mobile
        if (this.isMobile) {
            document.body.addEventListener('touchstart', () => {}, { passive: true });
        }
    },
    
    // Initialize the system
    init() {
        this.detectDevice();
        this.initMobileFeatures();
        
        // Re-initialize on orientation change
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.detectDevice();
                this.initMobileFeatures();
            }, 250);
        });
    }
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    MobileInitializer.init();
});