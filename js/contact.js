document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle (fix for contact page)
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const expanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', String(!expanded));
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a nav link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
            });
        });
    }

    // Elements
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const faqCategories = document.querySelectorAll('.faq-category');
    const faqCategoryContents = document.querySelectorAll('.faq-category-content');
    const faqToggles = document.querySelectorAll('.faq-question');

    // --- Form helpers ---
    function createStatusEl() {
        let el = contactForm.querySelector('.form-status');
        if (!el) {
            el = document.createElement('div');
            el.className = 'form-status';
            el.style.marginBottom = '12px';
            contactForm.insertBefore(el, contactForm.firstChild);
        }
        return el;
    }

    function showStatus(type, message) {
        const el = createStatusEl();
        el.textContent = message;
        el.style.color = type === 'error' ? '#ffb4b4' : '#c8ffd9';
        el.style.background = type === 'error' ? 'rgba(255,20,20,0.03)' : 'rgba(0,200,120,0.03)';
        el.style.padding = '8px 10px';
        el.style.borderRadius = '8px';
        el.style.border = type === 'error' ? '1px solid rgba(255,20,20,0.06)' : '1px solid rgba(0,200,120,0.06)';
    }

    function clearStatus() {
        const el = contactForm.querySelector('.form-status');
        if (el) el.remove();
    }

    function validateForm(form) {
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const subject = form.subject.value.trim();
        const message = form.message.value.trim();
        const checkbox = form.querySelector('input[type="checkbox"]');

        if (!name) return 'Please enter your full name.';
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address.';
        if (!subject) return 'Please select a subject.';
        if (!message) return 'Please enter your message.';
        if (checkbox && !checkbox.checked) return 'You must agree to the privacy policy and terms of service.';
        return '';
    }

    // --- Handle form submission (client-side demo) ---
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            clearStatus();

            const err = validateForm(contactForm);
            if (err) {
                showStatus('error', err);
                return;
            }

            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            showStatus('info', 'Sending your message — please wait.');

            // Real submission: POST to your server endpoint (you must implement /api/contact server-side)
            const payload = {
                name: contactForm.name.value.trim(),
                email: contactForm.email.value.trim(),
                phone: contactForm.phone.value.trim(),
                subject: contactForm.subject.value.trim(),
                message: contactForm.message.value.trim(),
                // receiver address included so backend knows where to deliver
                to: 'rkiso@hbwhjt.com'
            };

            fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                showStatus('success', 'Thank you — your message has been sent. We will reply within 24 hours.');
                contactForm.reset();
            })
            .catch(() => {
                // Fallback: open user's email client with prefilled message to rkiso@hbwhjt.com
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                const mailSub = `${payload.subject || 'No subject'}`;
                const mailBody = `Name: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone}\n\n${payload.message}`;
                const mailto = `mailto:rkiso@hbwhjt.com?subject=${encodeURIComponent(mailSub)}&body=${encodeURIComponent(mailBody)}`;
                showStatus('error', 'Could not send via server. Opening your email client to send the message.');
                // Give user a moment to read status, then open mail client
                setTimeout(() => { window.location.href = mailto; }, 800);
            });
        });

        // Remove status when user edits
        Array.from(contactForm.elements).forEach((el) => {
            el.addEventListener('input', () => clearStatus(), { passive: true });
        });
    }

    // --- Phone input: allow digits, +, space, parentheses, hyphen ---
    const phoneInput = document.querySelector('input[type="tel"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            const cleaned = e.target.value.replace(/[^\d+\s()-]/g, '');
            if (cleaned !== e.target.value) e.target.value = cleaned;
        });
    }

    // --- FAQ category switching ---
    faqCategories.forEach((btn) => {
        btn.addEventListener('click', () => {
            // set active class on buttons
            faqCategories.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            // show the related content
            const target = btn.getAttribute('data-category');
            faqCategoryContents.forEach(content => {
                if (content.id === target) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                    // collapse opened items inside non-active categories
                    content.querySelectorAll('.faq-item.open').forEach(it => it.classList.remove('open'));
                }
            });
        });
    });

    // --- FAQ item toggle (question click) ---
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        const toggle = question ? question.querySelector('.faq-toggle') : null;

        function setToggleSymbol(open) {
            if (toggle) toggle.textContent = open ? '−' : '+';
        }

        if (question) {
            question.setAttribute('role', 'button');
            question.setAttribute('tabindex', '0');
            question.addEventListener('click', () => {
                item.classList.toggle('open');
                setToggleSymbol(item.classList.contains('open'));
            });
            question.addEventListener('keydown', (ev) => {
                if (ev.key === 'Enter' || ev.key === ' ') {
                    ev.preventDefault();
                    item.classList.toggle('open');
                    setToggleSymbol(item.classList.contains('open'));
                }
            });
        }
    });

    // Initialize FAQ toggle symbols
    document.querySelectorAll('.faq-item').forEach(item => {
        const toggle = item.querySelector('.faq-toggle');
        if (toggle) toggle.textContent = item.classList.contains('open') ? '−' : '+';
    });
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