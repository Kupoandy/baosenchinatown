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
    
    // Phase cards functionality
    const phaseCards = document.querySelectorAll('.phase-card');
    
    phaseCards.forEach(card => {
        const header = card.querySelector('.phase-header');
        
        header.addEventListener('click', () => {
            const isActive = card.classList.contains('active');
            
            // Close all cards
            phaseCards.forEach(c => c.classList.remove('active'));
            
            // Open clicked card if it wasn't active
            if (!isActive) {
                card.classList.add('active');
            }
        });
    });
    
    // Open first phase by default
    if (phaseCards.length > 0) {
        phaseCards[0].classList.add('active');
    }
    
    // Animation for overview section
    const overviewContent = document.querySelector('.overview-content');
    
    function checkOverviewVisibility() {
        const triggerBottom = window.innerHeight * 0.8;
        const overviewTop = overviewContent.getBoundingClientRect().top;
        
        if (overviewTop < triggerBottom) {
            overviewContent.style.opacity = '1';
            overviewContent.style.transform = 'translateY(0)';
        }
    }
    
    // Initialize overview content
    overviewContent.style.opacity = '0';
    overviewContent.style.transform = 'translateY(30px)';
    overviewContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    checkOverviewVisibility();
    window.addEventListener('scroll', checkOverviewVisibility);
    
    // Location section animation
    const locationContent = document.querySelector('.location-content');
    
    function checkLocationVisibility() {
        const triggerBottom = window.innerHeight * 0.8;
        const locationTop = locationContent.getBoundingClientRect().top;
        
        if (locationTop < triggerBottom) {
            locationContent.style.opacity = '1';
            locationContent.style.transform = 'translateY(0)';
        }
    }
    
    // Initialize location content
    locationContent.style.opacity = '0';
    locationContent.style.transform = 'translateY(30px)';
    locationContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    checkLocationVisibility();
    window.addEventListener('scroll', checkLocationVisibility);
    
   /* // Key facts counter animation
    const facts = document.querySelectorAll('.fact h3');
    
    function animateNumbers() {
        facts.forEach(fact => {
            const target = parseInt(fact.textContent);
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    fact.textContent = target + (fact.textContent.includes('M') ? 'M+' : 
                                              fact.textContent.includes('Hectares') ? ' Hectares' : '');
                    clearInterval(timer);
                } else {
                    fact.textContent = Math.floor(current) + (fact.textContent.includes('M') ? 'M+' : 
                                                     fact.textContent.includes('Hectares') ? ' Hectares' : '');

                }
            }, 30);
        });
    }
    
    // Trigger number animation when facts are visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    }); */
    
    const keyFactsSection = document.querySelector('.key-facts');
    if (keyFactsSection) {
        observer.observe(keyFactsSection);
    }
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
