document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentTestimonial = 0;
    
    function showTestimonial(n) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentTestimonial = (n + testimonials.length) % testimonials.length;
        
        testimonials[currentTestimonial].classList.add('active');
        dots[currentTestimonial].classList.add('active');
    }
    
    function nextTestimonial() {
        showTestimonial(currentTestimonial + 1);
    }
    
    function prevTestimonial() {
        showTestimonial(currentTestimonial - 1);
    }
    
    if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
    if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    // Auto-rotate testimonials
    let testimonialInterval = setInterval(nextTestimonial, 5000);
    
    const slider = document.querySelector('.testimonials-slider');
    if (slider) {
        slider.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(nextTestimonial, 5000);
        });
    }
    
    // Animate chart bars
    const chartBars = document.querySelectorAll('.chart-bar');
    
    function animateChart() {
        chartBars.forEach(bar => {
            const value = bar.getAttribute('data-value');
            bar.style.height = value + '%';
        });
    }
    
    // Trigger chart animation when visible
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateChart();
                chartObserver.unobserve(entry.target);
            }
        });
    });
    
    const chartSection = document.querySelector('.chart');
    if (chartSection) {
        chartObserver.observe(chartSection);
    }
    
    // Investment option cards animation
    const optionCards = document.querySelectorAll('.option-card');
    
    function checkCardsVisibility() {
        const triggerBottom = window.innerHeight * 0.8;
        
        optionCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            
            if (cardTop < triggerBottom) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }
    
    // Initialize cards
    optionCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    checkCardsVisibility();
    window.addEventListener('scroll', checkCardsVisibility);
    
    // Process steps animation
    const processSteps = document.querySelectorAll('.process-step');
    
    function checkStepsVisibility() {
        const triggerBottom = window.innerHeight * 0.8;
        
        processSteps.forEach((step, index) => {
            const stepTop = step.getBoundingClientRect().top;
            
            if (stepTop < triggerBottom) {
                setTimeout(() => {
                    step.style.opacity = '1';
                    step.style.transform = 'translateX(0)';
                }, index * 300);
            }
        });
    }
    
    // Initialize steps
    processSteps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(-30px)';
        step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    checkStepsVisibility();
    window.addEventListener('scroll', checkStepsVisibility);
});

(function() {
    function createLightbox() {
        if (document.getElementById('lightbox')) return;
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-overlay"></div>
            <div class="lightbox-container">
                <button class="lightbox-close" aria-label="Close">&times;</button>
                <div class="lightbox-content">
                    <img id="lightbox-image" src="" alt="Enlarged image">
                    <p id="lightbox-caption"></p>
                </div>
            </div>
        `;
        document.body.appendChild(lightbox);
        lightbox.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);
        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
        });
    }

    function initImageClicks() {
        const imgs = document.querySelectorAll('img:not(.slide-img)');
        imgs.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', (ev) => {
                ev.stopPropagation();
                openLightbox(img);
            });
        });
    }

    function openLightbox(img) {
        const lb = document.getElementById('lightbox');
        if (!lb) return;
        lb.querySelector('#lightbox-image').src = img.src;
        lb.querySelector('#lightbox-caption').textContent = img.alt || '';
        lb.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        const lb = document.getElementById('lightbox');
        if (!lb) return;
        lb.classList.remove('active');
        document.body.style.overflow = '';
    }

    document.addEventListener('DOMContentLoaded', () => {
        createLightbox();
        initImageClicks();
    });
})();