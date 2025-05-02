/**
 * Gallery functionality for Ingrid Bergman Interiors
 * Handles the image gallery modal display and navigation
 */

document.addEventListener('DOMContentLoaded', () => {
    // Gallery elements
    const galleryModal = document.getElementById('galleryModal');
    const closeGalleryBtn = document.getElementById('closeGalleryBtn');
    const gallerySlider = document.getElementById('gallerySlider');
    const galleryIndicators = document.getElementById('galleryIndicators');
    const galleryBtn = document.getElementById('galleryBtn');
    const galleryPreview = document.getElementById('galleryPreview');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Project description elements
    const projectDescriptionModal = document.getElementById('projectDescriptionModal');
    const closeProjectDescriptionBtn = document.getElementById('closeProjectDescriptionBtn');
    const projectInfoBtn = document.getElementById('projectInfoBtn');
    
    // Only initialize if elements exist
    if (!galleryModal || !galleryBtn) {
        console.log('Gallery elements not found, skipping initialization');
        return;
    }
    
    console.log('Gallery initialization started');
    
    // Gallery state
    let currentSlide = 0;
    let isTransitioning = false;
    const transitionDuration = 600; // ms
    
    // Project images - Include all images from CA project done folder
    const projectImages = [
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
    
    // Initialize gallery slider
    function initGallerySlider() {
        // Clear any existing slides
        gallerySlider.innerHTML = '';
        
        // Create slides
        projectImages.forEach((src, index) => {
            const slide = document.createElement('div');
            slide.className = `gallery-slide ${index === 0 ? 'active' : ''}`;
            
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Project Image ${index + 1}`;
            img.loading = 'lazy'; // Add lazy loading for better performance with many images
            
            slide.appendChild(img);
            gallerySlider.appendChild(slide);
        });
        
        // Create indicators
        if (galleryIndicators) {
            galleryIndicators.innerHTML = '';
            
            projectImages.forEach((_, index) => {
                const indicator = document.createElement('div');
                indicator.className = `gallery-indicator ${index === 0 ? 'active' : ''}`;
                indicator.dataset.index = index;
                
                indicator.addEventListener('click', () => {
                    if (!isTransitioning) {
                        goToSlide(index);
                    }
                });
                
                galleryIndicators.appendChild(indicator);
            });
        }
    }
    
    // Initialize gallery
    initGallerySlider();
    
    // Open gallery
    const openGallery = () => {
        // Close project description modal if it's open
        if (projectDescriptionModal && projectDescriptionModal.classList.contains('active')) {
            projectDescriptionModal.classList.remove('active');
        }
        
        // Ensure the gallery has highest z-index
        if (galleryModal) {
            galleryModal.style.zIndex = '9999';
        }
        
        document.body.style.overflow = 'hidden';
        galleryModal.classList.add('active');
        
        // Fix for modal not showing - force reflow
        setTimeout(() => {
            galleryModal.style.opacity = '1';
            galleryModal.style.visibility = 'visible';
        }, 10);
        
        updateSlide();
    };
    
    // Close gallery
    function closeGallery() {
        document.body.style.overflow = '';
        galleryModal.classList.remove('active');
        
        // Explicitly set opacity and visibility to ensure the modal is hidden
        galleryModal.style.opacity = '0';
        galleryModal.style.visibility = 'hidden';
    }
    
    // Navigation
    function goToSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;
        
        const slides = gallerySlider.querySelectorAll('.gallery-slide');
        const indicators = document.querySelectorAll('.gallery-indicator');
        
        if (slides.length === 0 || indicators.length === 0) {
            console.error('No slides or indicators found');
            isTransitioning = false;
            return;
        }
        
        // Remove active class from current slide and indicator
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        
        // Handle infinite loop
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }
        
        currentSlide = index;
        
        // Add active class to new slide and indicator
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
        
        setTimeout(() => {
            isTransitioning = false;
        }, transitionDuration);
    }
    
    function updateSlide() {
        const slides = gallerySlider.querySelectorAll('.gallery-slide');
        const indicators = document.querySelectorAll('.gallery-indicator');
        
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Project description
    function openProjectDescription() {
        if (projectDescriptionModal) {
            // Close gallery modal if it's open
            if (galleryModal && galleryModal.classList.contains('active')) {
                galleryModal.classList.remove('active');
            }
            
            // Ensure the description modal has highest z-index
            projectDescriptionModal.style.zIndex = '9999';
            
            document.body.style.overflow = 'hidden';
            projectDescriptionModal.classList.add('active');
            
            // Fix for modal not showing - force reflow
            setTimeout(() => {
                projectDescriptionModal.style.opacity = '1';
                projectDescriptionModal.style.visibility = 'visible';
            }, 10);
        }
    }
    
    function closeProjectDescription() {
        if (projectDescriptionModal) {
            document.body.style.overflow = '';
            projectDescriptionModal.classList.remove('active');
            
            // Explicitly set opacity and visibility to ensure the modal is hidden
            projectDescriptionModal.style.opacity = '0';
            projectDescriptionModal.style.visibility = 'hidden';
        }
    }
    
    // Ensure modal visibility function
    function ensureModalVisibility(modal) {
        if (!modal) return;
        
        modal.style.zIndex = '9999';
        modal.style.opacity = '1';
        modal.style.visibility = 'visible';
        
        // Force reflow to ensure visibility
        void modal.offsetWidth;
    }
    
    // Event listeners
    if (galleryBtn) {
        galleryBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openGallery();
        });
    }
    
    if (galleryPreview) {
        galleryPreview.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openGallery();
        });
    }
    
    if (closeGalleryBtn) {
        closeGalleryBtn.addEventListener('click', closeGallery);
    }
    
    if (galleryModal) {
        galleryModal.addEventListener('click', (e) => {
            if (e.target === galleryModal) {
                closeGallery();
            }
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!isTransitioning) {
                goToSlide(currentSlide - 1);
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!isTransitioning) {
                goToSlide(currentSlide + 1);
            }
        });
    }
    
    if (projectInfoBtn) {
        projectInfoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openProjectDescription();
        });
    }
    
    if (closeProjectDescriptionBtn) {
        closeProjectDescriptionBtn.addEventListener('click', closeProjectDescription);
    }
    
    if (projectDescriptionModal) {
        projectDescriptionModal.addEventListener('click', (e) => {
            if (e.target === projectDescriptionModal) {
                closeProjectDescription();
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (galleryModal && galleryModal.classList.contains('active')) {
            switch (e.key) {
                case 'ArrowLeft':
                    if (!isTransitioning) {
                        goToSlide(currentSlide - 1);
                    }
                    break;
                case 'ArrowRight':
                    if (!isTransitioning) {
                        goToSlide(currentSlide + 1);
                    }
                    break;
                case 'Escape':
                    closeGallery();
                    break;
            }
        } else if (projectDescriptionModal && projectDescriptionModal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeProjectDescription();
            }
        }
    });
    
    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (gallerySlider) {
        gallerySlider.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        
        gallerySlider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            handleSwipe();
        }, { passive: true });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        if (swipeDistance > swipeThreshold) {
            // Swipe right - go to previous slide
            if (!isTransitioning) {
                goToSlide(currentSlide - 1);
            }
        } else if (swipeDistance < -swipeThreshold) {
            // Swipe left - go to next slide
            if (!isTransitioning) {
                goToSlide(currentSlide + 1);
            }
        }
    }
    
    // Fix for iOS devices
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        if (galleryModal) {
            galleryModal.style.webkitTransform = 'translateZ(0)';
        }
        if (projectDescriptionModal) {
            projectDescriptionModal.style.webkitTransform = 'translateZ(0)';
        }
    }
}); 