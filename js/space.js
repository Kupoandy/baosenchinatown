document.addEventListener('DOMContentLoaded', function() {
    // ========== MOBILE MENU FUNCTIONALITY ==========
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

    // ========== PROPERTY DATA EXTRACTION FROM HTML ==========
    function getPropertiesFromHTML() {
        const propertyElements = document.querySelectorAll('[data-property]');
        const properties = [];
        
        propertyElements.forEach((el, index) => {
            const property = {
                id: index + 1,
                type: el.getAttribute('data-type'),
                name: el.getAttribute('data-name'),
                area: el.getAttribute('data-area'),
                category: el.getAttribute('data-category'),
                budget: el.getAttribute('data-budget'),
                location: el.getAttribute('data-location'),
                image: el.getAttribute('data-image'),
                price: extractPrice(el.getAttribute('data-category'))
            };
            properties.push(property);
        });
        
        return properties;
    }
    
    // Helper function to extract price from category string
    function extractPrice(category) {
        if (!category) return 0;
        
        // For shopping mall properties that have "Sold", "Available", etc.
        const lowerCategory = category.toLowerCase();
        if (lowerCategory.includes('sold') || 
            lowerCategory.includes('available') ||
            lowerCategory.includes('pre-lease') ||
            lowerCategory.includes('appliance') ||
            lowerCategory.includes('life') ||
            lowerCategory.includes('supermarket')) {
            return 0;
        }
        
        // For properties with actual price values like "K550,000"
        const priceString = category.replace(/[^0-9.]/g, '');
        
        if (!priceString) return 0;
        
        const price = parseFloat(priceString);
        return price < 1000 ? price * 1000 : price;
    }

    const properties = getPropertiesFromHTML();
    
    // ========== DOM ELEMENTS ==========
    const typeSelect = document.getElementById('typeSelect');
    const budgetSelect = document.getElementById('budgetSelect');
    const customBudgetWrap = document.getElementById('customBudgetWrap');
    const customBudgetInput = document.getElementById('customBudgetInput');
    const filtersNote = document.getElementById('filtersNote');
    const propertiesGrid = document.querySelector('.properties-grid');
    const noResults = document.querySelector('.no-results');
    const noResultsText = document.getElementById('noResultsText');

    // Lightbox elements
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    // ========== GLOBAL STATE ==========
    let currentType = '';
    let currentBudgetKey = '';
    let customBudget = null;
    let currentFilteredProperties = [];
    let currentImageIndex = 0;
    let isLightboxOpen = false;

    // ========== LIGHTBOX FUNCTIONS ==========
    function openLightbox(imageSrc, caption, propertyIndex) {
        if (isLightboxOpen) return; // Prevent multiple lightboxes
        
        // Check if image source is valid
        if (!imageSrc || imageSrc.includes('#') || imageSrc.trim() === '') {
            console.log('Invalid image source, skipping lightbox');
            return;
        }
        
        lightboxImage.src = imageSrc;
        lightboxImage.alt = caption;
        lightboxCaption.textContent = caption;
        currentImageIndex = propertyIndex;
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
        isLightboxOpen = true;
        
        updateLightboxNavButtons();
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
        lightboxImage.src = '';
        lightboxCaption.textContent = '';
        isLightboxOpen = false;
    }

    function showNextImage() {
        if (currentFilteredProperties.length <= 1) return;
        currentImageIndex = (currentImageIndex + 1) % currentFilteredProperties.length;
        const prop = currentFilteredProperties[currentImageIndex];
        openLightbox(prop.image, prop.name, currentImageIndex);
    }

    function showPrevImage() {
        if (currentFilteredProperties.length <= 1) return;
        currentImageIndex = (currentImageIndex - 1 + currentFilteredProperties.length) % currentFilteredProperties.length;
        const prop = currentFilteredProperties[currentImageIndex];
        openLightbox(prop.image, prop.name, currentImageIndex);
    }

    function updateLightboxNavButtons() {
        if (currentFilteredProperties.length <= 1) {
            lightboxPrev.style.display = 'none';
            lightboxNext.style.display = 'none';
        } else {
            lightboxPrev.style.display = 'flex';
            lightboxNext.style.display = 'flex';
        }
    }

    // ========== LIGHTBOX EVENT LISTENERS ==========
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', showNextImage);
    lightboxPrev.addEventListener('click', showPrevImage);

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard controls for lightbox
    document.addEventListener('keydown', (e) => {
        if (!isLightboxOpen) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
        }
    });

    // ========== PREVENT LIGHTBOX FOR HEADER, FOOTER & SOCIAL IMAGES ==========
    function preventLightboxOnNonPropertyImages() {
        // Prevent lightbox on header images
        const headerImages = document.querySelectorAll('header img');
        headerImages.forEach(img => {
            img.style.cursor = 'default';
            img.parentElement.style.cursor = 'default';
            img.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                return false;
            });
        });

        // Prevent lightbox on footer images
        const footerImages = document.querySelectorAll('footer img');
        footerImages.forEach(img => {
            img.style.cursor = 'default';
            img.parentElement.style.cursor = 'default';
            img.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                return false;
            });
        });

        // Prevent lightbox on social link images
        const socialImages = document.querySelectorAll('.social-link img');
        socialImages.forEach(img => {
            img.style.cursor = 'default';
            img.parentElement.style.cursor = 'default';
            img.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                return false;
            });
        });

        // Prevent lightbox on logo images
        const logoImages = document.querySelectorAll('.logo img');
        logoImages.forEach(img => {
            img.style.cursor = 'default';
            img.parentElement.style.cursor = 'default';
            img.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                return false;
            });
        });
    }

    // ========== FILTER FUNCTIONS ==========
    // Enable budget select after choosing type
    typeSelect.addEventListener('change', function() {
        currentType = this.value;
        budgetSelect.disabled = currentType === '';
        
        // Reset budget & custom input
        budgetSelect.value = '';
        customBudgetInput.value = '';
        customBudgetWrap.style.display = 'none';
        currentBudgetKey = '';
        customBudget = null;
        
        // Hide results until both chosen
        hidePropertiesGrid();
        noResults.style.display = 'block';
        noResultsText.textContent = 'Please select a budget to view properties.';
    });

    // Budget select change
    budgetSelect.addEventListener('change', function() {
        const val = this.value;
        
        if (!val) {
            resetFilters();
            return;
        }

        if (val === 'custom') {
            customBudgetWrap.style.display = 'flex';
            customBudgetInput.focus();
            currentBudgetKey = '';
            customBudget = null;
            hidePropertiesGrid();
            noResults.style.display = 'block';
            noResultsText.textContent = 'Enter your budget in the box to view properties (K).';
            return;
        }

        // Selected a predefined range
        currentBudgetKey = val;
        customBudget = null;
        filterPropertiesIfReady();
    });

    // Custom budget input
    customBudgetInput.addEventListener('input', function() {
        const v = parseInt(this.value, 10);
        customBudget = Number.isFinite(v) ? v : null;
        filterPropertiesIfReady();
    });

    function resetFilters() {
        currentBudgetKey = '';
        customBudget = null;
        customBudgetWrap.style.display = 'none';
        hidePropertiesGrid();
        noResults.style.display = 'block';
        noResultsText.textContent = 'Please select a budget to view properties.';
    }

    function hidePropertiesGrid() {
        propertiesGrid.classList.add('hidden');
        propertiesGrid.innerHTML = '';
    }

    function filterPropertiesIfReady() {
        // Require a type selection and a budget selection/custom value
        if (!currentType || (currentBudgetKey === '' && (customBudget === null || customBudget === 0))) {
            hidePropertiesGrid();
            noResults.style.display = 'block';
            noResultsText.textContent = 'Select category and budget to view properties.';
            return;
        }
        filterProperties();
    }

    function filterProperties() {
        // Start from type filter
        let filtered = properties.filter(prop => {
            return currentType === 'all' || prop.type === currentType;
        });

        // Apply budget filter
        if (currentBudgetKey && currentBudgetKey !== 'all') {
            filtered = filtered.filter(prop => prop.budget === currentBudgetKey);
        } else if (customBudget !== null) {
            // If customBudget is less than 500,000 no properties should show
            if (customBudget < 500000) {
                filtered = [];
            } else {
                filtered = filtered.filter(prop => {
                    if (prop.price === 0) {
                        // For shopping mall properties without price, check if budget range matches
                        const range = prop.budget.split('-');
                        if (range.length === 2) {
                            const min = getBudgetMin(range[0]);
                            const max = getBudgetMax(range[1]);
                            return customBudget >= min && customBudget <= max;
                        }
                        return false;
                    }
                    return prop.price <= customBudget;
                });
            }
        }

        currentFilteredProperties = filtered; // Store for lightbox navigation
        displayFilteredProperties(filtered);
    }

    function getBudgetMin(budgetStr) {
        // Convert "500k" to 500000, "1m" to 1000000, etc.
        if (budgetStr.includes('k')) {
            return parseInt(budgetStr.replace('k', '')) * 1000;
        } else if (budgetStr.includes('m')) {
            return parseInt(budgetStr.replace('m', '')) * 1000000;
        }
        return 0;
    }

    function getBudgetMax(budgetStr) {
        return getBudgetMin(budgetStr);
    }

    function displayFilteredProperties(filtered) {
        if (filtered.length === 0) {
            hidePropertiesGrid();
            noResults.style.display = 'block';
            noResultsText.textContent = (customBudget !== null && customBudget < 500000)
                ? 'No properties available for budgets below K500,000.'
                : 'No properties found matching your criteria. Please adjust your filters.';
            return;
        }

        noResults.style.display = 'none';
        propertiesGrid.classList.remove('hidden');
        
        // Create property cards
        propertiesGrid.innerHTML = filtered.map((prop, index) => `
            <div class="property-card compact" data-property-id="${prop.id}">
                <div class="property-image" data-image-index="${index}">
                    <img src="${prop.image}" alt="${prop.name}" loading="lazy" onerror="this.src='../images/placeholder.jpg'; this.onerror=null;">
                </div>
                <div class="property-info">
                    <h3>${prop.name}</h3>
                    <p class="property-type">${formatPropertyType(prop.type)}</p>
                    <p class="property-price">${prop.category}</p>
                    <div class="property-details">
                        <div class="detail">
                            <span class="label">Area:</span>
                            <span class="value">${prop.area}</span>
                        </div>
                        <div class="detail">
                            <span class="label">Location:</span>
                            <span class="value">${prop.location}</span>
                        </div>
                        <div class="detail">
                            <span class="label">Budget Range:</span>
                            <span class="value">${formatBudgetRange(prop.budget)}</span>
                        </div>
                    </div>
                    <div class="property-actions">
                        <a href="contact.html?property=${encodeURIComponent(prop.name)}&type=${encodeURIComponent(prop.type)}" class="btn-small">Inquire</a>
                    </div>
                </div>
            </div>
        `).join('');

        // Add click event to property images for lightbox
        const propertyImages = propertiesGrid.querySelectorAll('.property-image');
        propertyImages.forEach((imgContainer, index) => {
            imgContainer.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const prop = filtered[index];
                // Check if image is valid (not placeholder or empty)
                if (prop.image && !prop.image.includes('#') && prop.image.trim() !== '') {
                    openLightbox(prop.image, prop.name, index);
                }
            });
            
            // Add zoom indicator on hover
            const img = imgContainer.querySelector('img');
            imgContainer.addEventListener('mouseenter', () => {
                img.style.transform = 'scale(1.05)';
            });
            imgContainer.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1)';
            });
        });
    }

    function formatPropertyType(type) {
        const types = {
            'shopping-mall': 'SHOPPING MALL',
            'residential': 'RESIDENTIAL UNIT',
            'hotel-office': 'HOTEL & OFFICE'
        };
        return types[type] || type.toUpperCase().replace('-', ' ');
    }

    function formatBudgetRange(budgetKey) {
        const ranges = {
            '500k-800k': 'K500,000 - K800,000',
            '800k-1m': 'K800,000 - K1,000,000',
            '1m-1.5m': 'K1,000,000 - K1,500,000',
            '1.5m-2m': 'K1,500,000 - K2,000,000',
            '2m-2.5m': 'K2,000,000 - K2,500,000',
            '2.5m-3m': 'K2,500,000 - K3,000,000'
        };
        return ranges[budgetKey] || budgetKey;
    }

    // ========== INITIALIZE ==========
    function initializePage() {
        // Initialize with no properties shown
        hidePropertiesGrid();
        noResults.style.display = 'block';
        noResultsText.textContent = 'Select a property type and budget to view available properties.';
        
        // Hide lightbox navigation buttons initially
        lightboxPrev.style.display = 'none';
        lightboxNext.style.display = 'none';
        
        // Prevent lightbox on header, footer, and social images
        preventLightboxOnNonPropertyImages();
        
        // Log number of properties loaded for debugging
        console.log(`Loaded ${properties.length} properties from HTML`);
    }

    // Start the application
    initializePage();
});