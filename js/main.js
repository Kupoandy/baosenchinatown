// Main JavaScript for Homepage

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    
    // Function to show a specific slide
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Next slide function
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Previous slide function
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Event listeners for slider controls
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto slide change
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause auto slide on hover
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        heroSlider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
    
    // Phase animation on scroll
    const phases = document.querySelectorAll('.phase');
    
    function checkPhaseVisibility() {
        const triggerBottom = window.innerHeight * 0.8;
        
        phases.forEach(phase => {
            const phaseTop = phase.getBoundingClientRect().top;
            
            if (phaseTop < triggerBottom) {
                phase.classList.add('active');
            }
        });
    }
    
    // Initial check
    checkPhaseVisibility();
    
    // Check on scroll
    window.addEventListener('scroll', checkPhaseVisibility);

    // ===== LIGHTBOX / IMAGE MODAL (SINGLE IMAGE ONLY) =====
    createLightbox();
    initImageClicks();
});

function createLightbox() {
    // Check if lightbox already exists
    if (document.getElementById('lightbox')) return;

    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-overlay"></div>
        <div class="lightbox-container">
            <button class="lightbox-close">&times;</button>
            <div class="lightbox-content">
                <img id="lightbox-image" src="" alt="Enlarged image">
                <p id="lightbox-caption"></p>
            </div>
            <div class="lightbox-counter">
                <span id="lightbox-current">1</span> / <span id="lightbox-total">1</span>
            </div>
        </div>
    `;
    document.body.appendChild(lightbox);

    // Event listeners
    const overlay = lightbox.querySelector('.lightbox-overlay');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    overlay.addEventListener('click', closeLightbox);
    closeBtn.addEventListener('click', closeLightbox);

    // Keyboard: Escape to close
    document.addEventListener('keydown', (e) => {
        const lb = document.getElementById('lightbox');
        if (lb.classList.contains('active') && e.key === 'Escape') {
            closeLightbox();
        }
    });
}

function initImageClicks() {
    // Select all clickable images EXCEPT hero slider images
    const clickableImages = document.querySelectorAll(
        'img:not(.slide-img), .property-image img, .feature-icon img'
    );

    clickableImages.forEach((img) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            openLightbox(img);
        });
    });
}

function openLightbox(clickedImage) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const caption = document.getElementById('lightbox-caption');
    const currentSpan = document.getElementById('lightbox-current');
    const totalSpan = document.getElementById('lightbox-total');

    lightboxImg.src = clickedImage.src;
    caption.textContent = clickedImage.alt || '';
    
    // Always show 1/1 for single image
    currentSpan.textContent = '1';
    totalSpan.textContent = '1';

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}