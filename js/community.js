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
    
    // Amenities cards animation
    const amenityCards = document.querySelectorAll('.amenity-card');
    
    function checkAmenitiesVisibility() {
        const triggerBottom = window.innerHeight * 0.8;
        
        amenityCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            
            if (cardTop < triggerBottom) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }
    
    // Initialize amenities cards
    amenityCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    checkAmenitiesVisibility();
    window.addEventListener('scroll', checkAmenitiesVisibility);
    
    // Impact stats counter animation
    const impactStats = document.querySelectorAll('.impact-stat h3');
    
    function animateImpactStats() {
        impactStats.forEach(stat => {
            const target = parseInt(stat.textContent);
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = stat.textContent.includes('+') ? target + '+' : 
                                     stat.textContent.includes('%') ? target + '%' : target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : 
                                                             stat.textContent.includes('%') ? '%' : '');
                }
            }, 30);
        });
    }
    
    // Trigger stats animation when visible
    const impactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateImpactStats();
                impactObserver.unobserve(entry.target);
            }
        });
    });
    
    const impactSection = document.querySelector('.impact-stats');
    if (impactSection) {
        impactObserver.observe(impactSection);
    }
    
    // Gallery hover effects
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            img.style.transform = 'scale(1.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            img.style.transform = 'scale(1)';
        });
    });
    
    // Sustainability items animation
    const sustainabilityItems = document.querySelectorAll('.sustainability-item');
    
    function checkSustainabilityVisibility() {
        const triggerBottom = window.innerHeight * 0.8;
        
        sustainabilityItems.forEach((item, index) => {
            const itemTop = item.getBoundingClientRect().top;
            
            if (itemTop < triggerBottom) {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, index * 300);
            }
        });
    }
    
    // Initialize sustainability items
    sustainabilityItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    checkSustainabilityVisibility();
    window.addEventListener('scroll', checkSustainabilityVisibility);
    
    // Event cards animation
    const eventCards = document.querySelectorAll('.event-card');
    
    function checkEventsVisibility() {
        const triggerBottom = window.innerHeight * 0.8;
        
        eventCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            
            if (cardTop < triggerBottom) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }
    
    // Initialize event cards
    eventCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    checkEventsVisibility();
    window.addEventListener('scroll', checkEventsVisibility);
    
    // Cultural programs animation
    const programs = document.querySelectorAll('.program');
    
    function checkProgramsVisibility() {
        const triggerBottom = window.innerHeight * 0.8;
        
        programs.forEach((program, index) => {
            const programTop = program.getBoundingClientRect().top;
            
            if (programTop < triggerBottom) {
                setTimeout(() => {
                    program.style.opacity = '1';
                    program.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    }
    
    // Initialize programs
    programs.forEach(program => {
        program.style.opacity = '0';
        program.style.transform = 'translateX(-20px)';
        program.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    checkProgramsVisibility();
    window.addEventListener('scroll', checkProgramsVisibility);
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