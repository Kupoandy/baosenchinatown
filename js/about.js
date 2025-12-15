// About Page JavaScript

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
    
    // Timeline Animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function checkTimelineVisibility() {
        const triggerBottom = window.innerHeight * 0.8;
        
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            
            if (itemTop < triggerBottom) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize timeline items
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Initial check
    checkTimelineVisibility();
    
    // Check on scroll
    window.addEventListener('scroll', checkTimelineVisibility);
    
    // Team member hover effects
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });
    });
    
    // Mission points animation
    const missionPoints = document.querySelectorAll('.mission-point');
    
    function checkMissionPoints() {
        const triggerBottom = window.innerHeight * 0.8;
        
        missionPoints.forEach((point, index) => {
            const pointTop = point.getBoundingClientRect().top;
            
            if (pointTop < triggerBottom) {
                setTimeout(() => {
                    point.style.opacity = '1';
                    point.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    }
    
    // Initialize mission points
    missionPoints.forEach(point => {
        point.style.opacity = '0';
        point.style.transform = 'translateX(-20px)';
        point.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Initial check
    checkMissionPoints();
    
    // Check on scroll
    window.addEventListener('scroll', checkMissionPoints);
    
    // Image grid hover effects
    const imageItems = document.querySelectorAll('.image-item');
    
    imageItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            img.style.transform = 'scale(1.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            img.style.transform = 'scale(1)';
        });
    });
});

// ===== single-image lightbox (same behavior as main.js, single image only) =====
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