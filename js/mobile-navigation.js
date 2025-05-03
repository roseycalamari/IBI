/**
 * Mobile Navigation and Interaction System
 * Handles vertical sliding, touch gestures, and mobile-specific behaviors
 */

class MobileNavigation {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.mobile-slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.isAnimating = false;
        this.touchStartY = 0;
        this.touchEndY = 0;
        
        this.init();
    }
    
    init() {
        if (!document.documentElement.classList.contains('mobile-device')) return;
        
        this.setupTouchEvents();
        this.setupIndicators();
        this.setupButtons();
        this.updateSlide(0);
    }
    
    setupTouchEvents() {
        const container = document.querySelector('.mobile-slider-container');
        if (!container) return;
        
        container.addEventListener('touchstart', (e) => {
            this.touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        container.addEventListener('touchend', (e) => {
            this.touchEndY = e.changedTouches[0].clientY;
            this.handleSwipe();
        });
    }
    
    handleSwipe() {
        if (this.isAnimating) return;
        
        const diff = this.touchStartY - this.touchEndY;
        const threshold = 50;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0 && this.currentSlide < this.slides.length - 1) {
                this.updateSlide(this.currentSlide + 1);
            } else if (diff < 0 && this.currentSlide > 0) {
                this.updateSlide(this.currentSlide - 1);
            }
        }
    }
    
    setupIndicators() {
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                if (!this.isAnimating) {
                    this.updateSlide(index);
                }
            });
        });
    }
    
    setupButtons() {
        // Setup explore buttons
        document.querySelectorAll('[data-action]').forEach(button => {
            button.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                this.handleButtonAction(action);
            });
        });
    }
    
    updateSlide(index) {
        if (index === this.currentSlide || this.isAnimating) return;
        
        this.isAnimating = true;
        this.currentSlide = index;
        
        const container = document.querySelector('.mobile-slides');
        container.style.transform = `translateY(-${index * 100}%)`;
        
        // Update indicators
        this.indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        // Update active slide
        this.slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }
    
    handleButtonAction(action) {
        // Trigger the same functions as desktop
        switch (action) {
            case 'open-service':
                if (typeof window.openServiceSection === 'function') {
                    window.openServiceSection();
                }
                break;
            case 'open-about':
                if (typeof window.openAboutSection === 'function') {
                    window.openAboutSection();
                }
                break;
            case 'open-brands':
                if (typeof window.openBrandsSection === 'function') {
                    window.openBrandsSection();
                }
                break;
        }
    }
}

// Initialize mobile navigation
document.addEventListener('DOMContentLoaded', () => {
    new MobileNavigation();
});