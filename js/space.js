document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    //close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Property data (each property now has a unique image file)
    const properties = [
        // Shopping Mall
        { id: 1,  type: 'shopping-mall', name: 'Shop Code: 4-G-1',    area: '49.37 sqm',  category: 'Sold',      budget: '1m-1.5m', location: 'Ground Floor',       image: '../images/space/ShoppingMallGroundFloor/GF CODE 4-G-1.png'  },
        { id: 2,  type: 'shopping-mall', name: 'Shop Code: 4-G-2',    area: '91.88 sqm', category: 'Sold',       budget: '2m-2.5m', location: 'Ground Floor',        image: '../images/space/ShoppingMallGroundFloor/GF CODE 4-G-2.png'  },
        { id: 3,  type: 'shopping-mall', name: 'Shop Code: 4-G-3',    area: '91.04 sqm', category: 'sold',       budget: '1.5m-2m',   location: 'Ground Floor',      image: '../images/space/ShoppingMallGroundFloor/GF CODE 4-G-3.png'  },
        { id: 4,  type: 'shopping-mall', name: 'Shop Code: 4-G-4',    area: '109.24 sqm', category: 'sold',      budget: '2.5m-3m',   location: 'Ground Floor',     image: '../images/ShoppingMallGroundFloor/GF CODE 4-G-4.png'  },
        { id: 5,  type: 'shopping-mall', name: 'Shop Code: 4-G-5',    area: '88.20 sqm', category: 'sold',       budget: '1.5m-2m',   location: 'Ground Floor',      image: '../images/space/ShoppingMallGroundFloor/GF CODE 4-G-5.png'  },
        { id: 6,  type: 'shopping-mall', name: 'Shop Code: 4-G-6',    area: '91.04 sqm', category: 'sold',       budget: '1.5m-2m',   location: 'Ground Floor',      image: '../images/space/ShoppingMallGroundFloor/GF CODE 4-G-6.png'  },
        { id: 7,  type: 'shopping-mall', name: 'Shop Code: 4-G-7',    area: '105.80 sqm', category: 'Sold',      budget: '2.5m-3m',   location: 'Ground Floor',     image: '../images/space/ShoppingMallGroundFloor/GF CODE 4-G-7.png'  },
        { id: 8,  type: 'shopping-mall', name: 'Shop Code: 4-G-8',    area: '88.20 sqm', category: 'Available',  budget: '1.5m-2m',   location: 'Ground Floor', image: '../image/space/ShoppingMallGroundFloor/GF CODE 4-G-8.png'  },
        { id: 9,  type: 'shopping-mall', name: 'Shop Code: 4-G-9',    area: '91.04 sqm',  category: 'sold',      budget: '1.5m-2m', location: 'Ground Floor',       image: '../images/space/ShoppingMallGroundFloor/GF CODE 4-G-9.png'  },
        { id: 10, type: 'shopping-mall', name: 'Shop Code: 4-G-10',   area: '105.84 sqm', category: 'sold',      budget: '2.5m-3m',   location: 'Ground Floor',     image: '../images/space/ShoppingMallGroundFloor/GF CODE 4-G-10.png' },
        { id: 11,  type: 'shopping-mall', name: 'Shop Code: 4-G-11',  area: '88.20 sqm', category: 'sold',       budget: '1.5m-2m', location: 'Ground Floor',        image: '../images/space/ShoppingMallGroundFloor/GF CODE 4-G-11.png'  },
        { id: 12,  type: 'shopping-mall', name: 'Shop Code: 4-G-12',  area: '91.03 sqm', category: 'AVAILABLE',  budget: '1.5m-2m',   location: 'Ground Floor', image: '../images/space/ShoppingMallGroundFloor/GF CODE 4-G-12.png'  },
        { id: 13,  type: 'shopping-mall', name: 'Shop Code: 4-G-13',  area: '98.28 sqm', category: 'sold',       budget: '2.5m-3m',   location: 'Ground Floor',      image: '../images/space/ShoppingMallGroundFloor/GF CODE 4-G-13.png'  },
        { id: 14,  type: 'shopping-mall', name: 'Shop Code: 4-G-14',  area: '81.90 sqm', category: 'Available',  budget: '1.5m-2m',   location: 'Ground Floor', image: '../images/space/ShoppingMallGroundFloor/GF CODE 4-G-14.png'  },
        { id: 15,  type: 'shopping-mall', name: 'Shop Code: 4-G-15',  area: '84.62 sqm', category: 'sold',       budget: '2m-2.5m',   location: 'Ground Floor',      image: '../images/space/ShoppingMallGroundFloor/GF CODE 4-G-15.png'  },
        { id: 16,  type: 'shopping-mall', name: 'Shop Code: 4-G-16',  area: '107.73 sqm', category: 'sold',      budget: '2m-2.5m',   location: 'Ground Floor',     image: '../images/space/ShoppingMallGroundFloor/GF CODE 4-G-16.png'  },
        { id: 17,  type: 'shopping-mall', name: 'Shop Code: 4-G-17',  area: '89.78 sqm', category: 'Available',  budget: '800k-1m',   location: 'Ground Floor', image: '../images/space/ShoppingMallGroundFloor/GF CODE 4-G-17.png'  },
        { id: 18,  type: 'shopping-mall', name: 'Shop Code: 4-G-18',  area: '92.66 sqm',  category: 'sold',      budget: '500k-800k', location: 'Ground Floor',     image: '../images/space/ShoppingMallGroundFloor/GF CODE 4-G-18.png'  },
        { id: 19, type: 'shopping-mall', name: 'Shop Code: 4-G-19',   area: '110.25 sqm', category: 'sold',      budget: '1m-1.5m',   location: 'Ground Floor',     image: '../images/space/ShoppingMallGroundFloor/GF CODE 4-G-19.png' },
        { id: 20,  type: 'shopping-mall', name: 'Shop Code: 4-G-20',  area: '83.13 sqm', category: 'AVAILABLE',  budget: '500k-800k', location: 'Ground Floor', image: '../images/space/ShoppingMallGroundFloor/GF CODE 4-G-20.png'  },
        { id: 21,  type: 'shopping-mall', name: 'Shop Code: 4-G-21',  area: '41.37 sqm', category: 'sold',       budget: '800k-1m',   location: 'Ground Floor',      image: '../images/space/ShoppingMallGroundFloor/GF CODE 4-G-21.png'  },
        { id: 22,  type: 'shopping-mall', name: 'Shop Code: 5-G-1',   area: '91.00 sqm', category: 'AVAILABLE',  budget: '1m-1.5m',   location: 'Ground Floor', image: '../images/space/ShoppingMallGroundFloor/GF CODE 5-G-1.png'  },
        { id: 23,  type: 'shopping-mall', name: 'Shop Code: 5-G-2',   area: '87.78 sqm', category: 'sold',       budget: '1.5m-2m',   location: 'Ground Floor',      image: '../images/space/ShoppingMallGroundFloor/GF CODE 5-G-2.png'  },
        { id: 24,  type: 'shopping-mall', name: 'Shop Code: 5-G-3',   area: '87.78 sqm', category: 'sold',       budget: '2m-2.5m',   location: 'Ground Floor',      image: '../images/space/ShoppingMallGroundFloor/GF CODE 5-G-3.png'  },
        { id: 25,  type: 'shopping-mall', name: 'Shop Code: 5-G-4',   area: '87.78 sqm', category: 'Pre-Lease Available',  budget: '2m-2.5m',   location: 'Ground Floor',      image: '../images/space/ShoppingMallGroundFloor/GF CODE 5-G-4.png'  },
        { id: 26,  type: 'shopping-mall', name: 'Shop Code: 5-G-5',   area: '87.78 sqm', category: 'sold',  budget: '800k-1m',   location: 'Ground Floor', image: '../images/space/ShoppingMallGroundFloor/GF CODE 5-G-5.png'  },
        { id: 27,  type: 'shopping-mall', name: 'Shop Code: 5-G-6',   area: '87.78 sqm',  category: 'AVAILABLE',  budget: '500k-800k', location: 'Ground Floor',     image: '../images/space/ShoppingMallGroundFloor/GF CODE 5-G-6.png'  },
        { id: 28, type: 'shopping-mall', name: 'Shop Code: 5-G-7',    area: '87.78 sqm', category: 'AVAILABLE',  budget: '1m-1.5m',   location: 'Ground Floor',      image: '../images/space/ShoppingMallGroundFloor/GF CODE 5-G-7.png' },
        { id: 29,  type: 'shopping-mall', name: 'Shop Code: 5-G-8',   area: '99.27 sqm', category: 'AVAILABLE',  budget: '500k-800k', location: 'Ground Floor', image: '../images/space/ShoppingMallGroundFloor/GF CODE 5-G-8.png'  },
        { id: 30,  type: 'shopping-mall', name: 'Shop Code: 5-G-9',   area: '2232.42 sqm', category: 'Appliance Supermarket',  budget: '800k-1m',   location: 'Ground Floor',      image: '../images/space/ShoppingMallGroundFloor/GF CODE 5-G-9.png'  },
        { id: 31,  type: 'shopping-mall', name: 'Shop Code: 5-G-10',  area: '3878.34 sqm', category: 'Life Supermarket',  budget: '1m-1.5m',   location: 'Ground Floor',      image: '../images/space/ShoppingMallGroundFloor/GF CODE 5-G-10.png'  },
        { id: 32,  type: 'shopping-mall', name: 'Shop Code: 5-G-1',   area: '250 sqm', category: 'sold',  budget: '1.5m-2m',   location: 'Level 2',      image: '../images/properties/shoppingmall/#'  },
        { id: 33,  type: 'shopping-mall', name: 'Premium Store F2',   area: '300 sqm', category: 'sold',  budget: '2m-2.5m',   location: 'Level 2',      image: '../images/properties/shoppingmall/#'  },
        { id: 34,  type: 'shopping-mall', name: 'Anchor Store G1',    area: '350 sqm', category: 'sold',  budget: '2m-2.5m',   location: 'Level 3',      image: '../images/properties/shoppingmall/#'  },
        { id: 35,  type: 'shopping-mall', name: 'Food Court H1',      area: '120 sqm', category: 'sold',  budget: '800k-1m',   location: 'Ground Floor', image: '../images/properties/shoppingmall/#'  },
        { id: 36,  type: 'shopping-mall', name: 'Service Unit I2',    area: '90 sqm',  category: 'sold',  budget: '500k-800k', location: 'Basement',     image: '../images/properties/shoppingmall/#'  },
        { id: 37, type: 'shopping-mall', name: 'Display Area J1',     area: '180 sqm', category: 'sold',  budget: '1m-1.5m',   location: 'Level 1',      image: '../images/properties/shoppingmall/#' },
        { id: 38,  type: 'shopping-mall', name: 'Food Court H1',      area: '120 sqm', category: 'sold',  budget: '800k-1m',   location: 'Ground Floor', image: '../images/properties/shoppingmall/#'  },
        { id: 39,  type: 'shopping-mall', name: 'Service Unit I2',    area: '90 sqm',  category: 'sold',  budget: '500k-800k', location: 'Basement',     image: '../images/properties/shoppingmall/#'  },
        { id: 40, type: 'shopping-mall', name: 'Display Area J1',     area: '180 sqm', category: 'sold',  budget: '1m-1.5m',   location: 'Level 1',      image: '../images/properties/shoppingmall/#' },
        { id: 41,  type: 'shopping-mall', name: 'Retail Kiosk B2',    area: '100 sqm', category: 'sold',  budget: '500k-800k', location: 'Ground Floor', image: '../images/properties/shoppingmall/#'  },
        { id: 42,  type: 'shopping-mall', name: 'Shop Unit C1',       area: '150 sqm', category: 'sold',  budget: '800k-1m',   location: 'Level 1',      image: '../images/properties/shoppingmall/#'  },
        { id: 43,  type: 'shopping-mall', name: 'Shop Unit D2',       area: '200 sqm', category: 'sold',  budget: '1m-1.5m',   location: 'Level 1',      image: '../images/properties/shoppingmall/#'  },
        { id: 44,  type: 'shopping-mall', name: 'Premium Store E1',   area: '250 sqm', category: 'sold',  budget: '1.5m-2m',   location: 'Level 2',      image: '../images/properties/shoppingmall/#'  },
        { id: 45,  type: 'shopping-mall', name: 'Premium Store F2',   area: '300 sqm', category: 'sold',  budget: '2m-2.5m',   location: 'Level 2',      image: '../images/properties/shoppingmall/#'  },
        { id: 46,  type: 'shopping-mall', name: 'Anchor Store G1',    area: '350 sqm', category: 'sold',  budget: '2m-2.5m',   location: 'Level 3',      image: '../images/properties/shoppingmall/#'  },
        { id: 47,  type: 'shopping-mall', name: 'Food Court H1',      area: '120 sqm', category: 'sold',  budget: '800k-1m',   location: 'Ground Floor', image: '../images/properties/shoppingmall/#'  },
        { id: 48,  type: 'shopping-mall', name: 'Service Unit I2',    area: '90 sqm',  category: 'sold',  budget: '500k-800k', location: 'Basement',     image: '../images/properties/shoppingmall/#'  },
        { id: 49, type: 'shopping-mall', name: 'Display Area J1',     area: '180 sqm', category: 'sold',  budget: '1m-1.5m',   location: 'Level 1',      image: '../images/properties/shoppingmall/#' },
        { id: 50,  type: 'shopping-mall', name: 'Retail Kiosk B2',    area: '100 sqm', category: 'sold',  budget: '500k-800k', location: 'Ground Floor', image: '../images/properties/shoppingmall/#'  },
        { id: 51,  type: 'shopping-mall', name: 'Shop Unit C1',       area: '150 sqm', category: 'sold',  budget: '800k-1m',   location: 'Level 1',      image: '../images/properties/shoppingmall/#'  },
        { id: 52,  type: 'shopping-mall', name: 'Shop Unit D2',       area: '200 sqm', category: 'sold',  budget: '1m-1.5m',   location: 'Level 1',      image: '../images/properties/shoppingmall/#'  },
        { id: 53,  type: 'shopping-mall', name: 'Premium Store E1',   area: '250 sqm', category: 'sold',  budget: '1.5m-2m',   location: 'Level 2',      image: '../images/properties/shoppingmall/#'  },
        { id: 54,  type: 'shopping-mall', name: 'Premium Store F2',   area: '300 sqm', category: 'sold',  budget: '2m-2.5m',   location: 'Level 2',      image: '../images/properties/shoppingmall/#'  },
        { id: 55,  type: 'shopping-mall', name: 'Anchor Store G1',    area: '350 sqm', category: 'sold',  budget: '2m-2.5m',   location: 'Level 3',      image: '../images/properties/shoppingmall/#'  },
        { id: 56,  type: 'shopping-mall', name: 'Food Court H1',      area: '120 sqm', category: 'sold',  budget: '800k-1m',   location: 'Ground Floor', image: '../images/properties/shoppingmall/#'  },
        { id: 57,  type: 'shopping-mall', name: 'Service Unit I2',    area: '90 sqm',  category: 'sold',  budget: '500k-800k', location: 'Basement',     image: '../images/properties/shoppingmall/#'  },
        { id: 58, type: 'shopping-mall', name: 'Display Area J1',     area: '180 sqm', category: 'sold',  budget: '1m-1.5m',   location: 'Level 1',      image: '../images/properties/shoppingmall/#' },
        { id: 59,  type: 'shopping-mall', name: 'Retail Kiosk B2',    area: '100 sqm', category: 'sold',  budget: '500k-800k', location: 'Ground Floor', image: '../images/properties/shoppingmall/#'  },
        { id: 60,  type: 'shopping-mall', name: 'Shop Unit C1',       area: '150 sqm', category: 'sold',  budget: '800k-1m',   location: 'Level 1',      image: '../images/properties/shoppingmall/#'  },
        { id: 61,  type: 'shopping-mall', name: 'Shop Unit D2',       area: '200 sqm', category: 'sold',  budget: '1m-1.5m',   location: 'Level 1',      image: '../images/properties/shoppingmall/#'  },
        { id: 62,  type: 'shopping-mall', name: 'Premium Store E1',   area: '250 sqm', category: 'sold',  budget: '1.5m-2m',   location: 'Level 2',      image: '../images/properties/shoppingmall/#'  },
        { id: 63,  type: 'shopping-mall', name: 'Premium Store F2',   area: '300 sqm', category: 'sold',  budget: '2m-2.5m',   location: 'Level 2',      image: '../images/properties/shoppingmall/#'  },
        { id: 64,  type: 'shopping-mall', name: 'Anchor Store G1',    area: '350 sqm', category: 'sold',  budget: '2m-2.5m',   location: 'Level 3',      image: '../images/properties/shoppingmall/#'  },
        { id: 65,  type: 'shopping-mall', name: 'Food Court H1',      area: '120 sqm', category: 'sold',  budget: '800k-1m',   location: 'Ground Floor', image: '../images/properties/shoppingmall/#'  },
        { id: 66,  type: 'shopping-mall', name: 'Service Unit I2',    area: '90 sqm',  category: 'sold',  budget: '500k-800k', location: 'Basement',     image: '../images/properties/shoppingmall/#'  },
        { id: 67, type: 'shopping-mall', name: 'Display Area J1',     area: '180 sqm', category: 'sold',  budget: '1m-1.5m',   location: 'Level 1',      image: '../images/properties/shoppingmall/#' },
        { id: 68,  type: 'shopping-mall', name: 'Food Court H1',      area: '120 sqm', category: 'sold',  budget: '800k-1m',   location: 'Ground Floor', image: '../images/properties/shoppingmall/#'  },
        { id: 69,  type: 'shopping-mall', name: 'Service Unit I2',    area: '90 sqm',  category: 'sold',  budget: '500k-800k', location: 'Basement',     image: '../images/properties/shoppingmall/#'  },
        { id: 70, type: 'shopping-mall', name: 'Display Area J1',     area: '180 sqm', category: 'sold',  budget: '1m-1.5m',   location: 'Level 1',      image: '../images/properties/shoppingmall/#' },
        { id: 71,  type: 'shopping-mall', name: 'Retail Kiosk B2',    area: '100 sqm', category: 'sold',  budget: '500k-800k', location: 'Ground Floor', image: '../images/properties/shoppingmall/#'  },
        { id: 72,  type: 'shopping-mall', name: 'Shop Unit C1',       area: '150 sqm', category: 'sold',  budget: '800k-1m',   location: 'Level 1',      image: '../images/properties/shoppingmall/#'  },
        { id: 73,  type: 'shopping-mall', name: 'Shop Unit D2',       area: '200 sqm', category: 'sold',  budget: '1m-1.5m',   location: 'Level 1',      image: '../images/properties/shoppingmall/#'  },
        { id: 74,  type: 'shopping-mall', name: 'Premium Store E1',    area: '250 sqm', category: 'sold',  budget: '1.5m-2m',   location: 'Level 2',      image: '../images/properties/shoppingmall/#'  },
        { id: 75,  type: 'shopping-mall', name: 'Premium Store F2',    area: '300 sqm', category: 'sold',  budget: '2m-2.5m',   location: 'Level 2',      image: '../images/properties/shoppingmall/#'  },
        { id: 76,  type: 'shopping-mall', name: 'Anchor Store G1',     area: '350 sqm', category: 'sold',  budget: '2m-2.5m',   location: 'Level 3',      image: '../images/properties/shoppingmall/#'  },
        { id: 77,  type: 'shopping-mall', name: 'Food Court H1',       area: '120 sqm', category: 'sold',  budget: '800k-1m',   location: 'Ground Floor', image: '../images/properties/shoppingmall/#'  },
        { id: 78,  type: 'shopping-mall', name: 'Service Unit I2',     area: '90 sqm',  category: 'sold',  budget: '500k-800k', location: 'Basement',     image: '../images/properties/shoppingmall/#'  },
        { id: 79, type: 'shopping-mall', name: 'Display Area J1',     area: '180 sqm', category: 'sold',  budget: '1m-1.5m',   location: 'Level 1',      image: '../images/properties/shoppingmall/#' },
        { id: 80,  type: 'shopping-mall', name: 'Retail Kiosk B2',     area: '100 sqm', category: 'sold',  budget: '500k-800k', location: 'Ground Floor', image: '../images/properties/shoppingmall/#'  },
        { id: 81,  type: 'shopping-mall', name: 'Shop Unit C1',        area: '150 sqm', category: 'sold',  budget: '800k-1m',   location: 'Level 1',      image: '../images/properties/shoppingmall/#'  },
        { id: 82,  type: 'shopping-mall', name: 'Shop Unit D2',        area: '200 sqm', category: 'sold',  budget: '1m-1.5m',   location: 'Level 1',      image: '../images/properties/shoppingmall/#'  },
        { id: 83,  type: 'shopping-mall', name: 'Premium Store E1',    area: '250 sqm', category: 'sold',  budget: '1.5m-2m',   location: 'Level 2',      image: '../images/properties/shoppingmall/#'  },
        { id: 84,  type: 'shopping-mall', name: 'Premium Store F2',    area: '300 sqm', category: 'sold',  budget: '2m-2.5m',   location: 'Level 2',      image: '../images/properties/shoppingmall/#'  },
        { id: 85,  type: 'shopping-mall', name: 'Anchor Store G1',     area: '350 sqm', category: 'sold',  budget: '2m-2.5m',   location: 'Level 3',      image: '../images/properties/shoppingmall/#'  },
        { id: 86,  type: 'shopping-mall', name: 'Food Court H1',       area: '120 sqm', category: 'sold',  budget: '800k-1m',   location: 'Ground Floor', image: '../images/properties/shoppingmall/#'  },
        { id: 87,  type: 'shopping-mall', name: 'Service Unit I2',     area: '90 sqm',  category: 'sold',  budget: '500k-800k', location: 'Basement',     image: '../images/properties/shoppingmall/#'  },
        { id: 88, type: 'shopping-mall', name: 'Display Area J1',     area: '180 sqm', category: 'sold',  budget: '1m-1.5m',   location: 'Level 1',      image: '../images/properties/shoppingmall/#' },
        { id: 89,  type: 'shopping-mall', name: 'Retail Kiosk B2',     area: '100 sqm', category: 'sold',  budget: '500k-800k', location: 'Ground Floor', image: '../images/properties/shoppingmall/#'  },
        { id: 90,  type: 'shopping-mall', name: 'Shop Unit C1',        area: '150 sqm', category: 'sold',  budget: '800k-1m',   location: 'Level 1',      image: '../images/properties/shoppingmall/#'  },
        { id: 91,  type: 'shopping-mall', name: 'Shop Unit D2',        area: '200 sqm', category: 'sold',  budget: '1m-1.5m',   location: 'Level 1',      image: '../images/properties/shoppingmall/#'  },
        { id: 92,  type: 'shopping-mall', name: 'Premium Store E1',    area: '250 sqm', category: 'sold',  budget: '1.5m-2m',   location: 'Level 2',      image: '../images/properties/shoppingmall/#'  },
        { id: 93,  type: 'shopping-mall', name: 'Premium Store F2',    area: '300 sqm', category: 'sold',  budget: '2m-2.5m',   location: 'Level 2',      image: '../images/properties/shoppingmall/#'  },
        { id: 94,  type: 'shopping-mall', name: 'Anchor Store G1',     area: '350 sqm', category: 'sold',  budget: '2m-2.5m',   location: 'Level 3',      image: '../images/properties/shoppingmall/#'  },
        { id: 95,  type: 'shopping-mall', name: 'Food Court H1',       area: '120 sqm', category: 'sold',  budget: '800k-1m',   location: 'Ground Floor', image: '../images/properties/shoppingmall/#'  },
        { id: 96,  type: 'shopping-mall', name: 'Service Unit I2',     area: '90 sqm',  category: 'sold',  budget: '500k-800k', location: 'Basement',     image: '../images/properties/shoppingmall/#'  },
        { id: 97, type: 'shopping-mall', name: 'Display Area J1',     area: '180 sqm', category: 'sold',  budget: '1m-1.5m',   location: 'Level 1',      image: '../images/properties/shoppingmall/#' },
        { id: 98,  type: 'shopping-mall', name: 'Food Court H1',       area: '120 sqm', category: 'sold',  budget: '800k-1m',   location: 'Ground Floor', image: '../images/properties/shoppingmall/#'  },
        { id: 99,  type: 'shopping-mall', name: 'Service Unit I2',     area: '90 sqm',  category: 'sold',  budget: '500k-800k', location: 'Basement',     image: '../images/properties/shoppingmall/#'  },
        { id: 100, type: 'shopping-mall', name: 'Display Area J1',     area: '180 sqm', category: 'sold',  budget: '1m-1.5m',   location: 'Level 1',      image: '../images/properties/shoppingmall/#' },
        { id: 101,  type: 'shopping-mall', name: 'Retail Kiosk B2',     area: '100 sqm', category: 'sold',  budget: '500k-800k', location: 'Ground Floor', image: '../images/properties/shoppingmall/#'  },
        { id: 102,  type: 'shopping-mall', name: 'Shop Unit C1',        area: '150 sqm', category: 'sold',  budget: '800k-1m',   location: 'Level 1',      image: '../images/properties/shoppingmall/#'  },
        { id: 103,  type: 'shopping-mall', name: 'Shop Unit D2',        area: '200 sqm', category: 'sold',  budget: '1m-1.5m',   location: 'Level 1',      image: '../images/properties/shoppingmall/#'  },
        { id: 104,  type: 'shopping-mall', name: 'Premium Store E1',    area: '250 sqm', category: 'sold',  budget: '1.5m-2m',   location: 'Level 2',      image: '../images/properties/shoppingmall/#'  },
        { id: 105,  type: 'shopping-mall', name: 'Premium Store F2',    area: '300 sqm', category: 'sold',  budget: '2m-2.5m',   location: 'Level 2',      image: '../images/properties/shoppingmall/#'  },
        { id: 106,  type: 'shopping-mall', name: 'Anchor Store G1',     area: '350 sqm', category: 'sold',  budget: '2m-2.5m',   location: 'Level 3',      image: '../images/properties/shoppingmall/#'  },
        { id: 107,  type: 'shopping-mall', name: 'Food Court H1',       area: '120 sqm', category: 'sold',  budget: '800k-1m',   location: 'Ground Floor', image: '../images/properties/shoppingmall/#'  },
        { id: 108,  type: 'shopping-mall', name: 'Service Unit I2',     area: '90 sqm',  category: 'sold',  budget: '500k-800k', location: 'Basement',     image: '../images/properties/shoppingmall/#'  },
        { id: 109, type: 'shopping-mall', name: 'Display Area J1',     area: '180 sqm', category: 'sold',  budget: '1m-1.5m',   location: 'Level 1',      image: '../images/properties/shoppingmall/#' },
        { id: 110,  type: 'shopping-mall', name: 'Retail Kiosk B2',     area: '100 sqm', category: 'sold',  budget: '500k-800k', location: 'Ground Floor', image: '../images/properties/shoppingmall/#'  },
        { id: 111,  type: 'shopping-mall', name: 'Shop Unit C1',        area: '150 sqm', category: 'sold',  budget: '800k-1m',   location: 'Level 1',      image: '../images/properties/shoppingmall/#'  },
        { id: 112,  type: 'shopping-mall', name: 'Shop Unit D2',        area: '200 sqm', category: 'sold',  budget: '1m-1.5m',   location: 'Level 1',      image: '../images/properties/shoppingmall/#'  },
        { id: 113,  type: 'shopping-mall', name: 'Premium Store E1',    area: '250 sqm', category: 'sold',  budget: '1.5m-2m',   location: 'Level 2',      image: '../images/properties/shoppingmall/#'  },
        { id: 114,  type: 'shopping-mall', name: 'Premium Store F2',    area: '300 sqm', category: 'sold',  budget: '2m-2.5m',   location: 'Level 2',      image: '../images/properties/shoppingmall/#'  },
        { id: 115,  type: 'shopping-mall', name: 'Anchor Store G1',     area: '350 sqm', category: 'sold',  budget: '2m-2.5m',   location: 'Level 3',      image: '../images/properties/shoppingmall/#'  },
        { id: 116,  type: 'shopping-mall', name: 'Food Court H1',       area: '120 sqm', category: 'sold',  budget: '800k-1m',   location: 'Ground Floor', image: '../images/properties/shoppingmall/#'  },
        { id: 117,  type: 'shopping-mall', name: 'Service Unit I2',     area: '90 sqm',  category: 'sold',  budget: '500k-800k', location: 'Basement',     image: '../images/properties/shoppingmall/#'  },
        { id: 118, type: 'shopping-mall', name: 'Display Area J1',     area: '180 sqm', category: 'sold',  budget: '1m-1.5m',   location: 'Level 1',      image: '../images/properties/shoppingmall/#' },
        { id: 119,  type: 'shopping-mall', name: 'Retail Kiosk B2',     area: '100 sqm', category: 'sold',  budget: '500k-800k', location: 'Ground Floor', image: '../images/properties/shoppingmall/#'  },
        { id: 120,  type: 'shopping-mall', name: 'Shop Unit C1',        area: '150 sqm', category: 'sold',  budget: '800k-1m',   location: 'Level 1',      image: '../images/properties/shoppingmall/#'  },
        { id: 121,  type: 'shopping-mall', name: 'Shop Unit D2',        area: '200 sqm', category: 'sold',  budget: '1m-1.5m',   location: 'Level 1',      image: '../images/properties/shoppingmall/#'  },
        { id: 122,  type: 'shopping-mall', name: 'Premium Store E1',    area: '250 sqm', category: 'sold',  budget: '1.5m-2m',   location: 'Level 2',      image: '../images/properties/shoppingmall/#'  },
        { id: 123,  type: 'shopping-mall', name: 'Premium Store F2',    area: '300 sqm', category: 'sold',  budget: '2m-2.5m',   location: 'Level 2',      image: '../images/properties/shoppingmall/#'  },
        { id: 124,  type: 'shopping-mall', name: 'Anchor Store G1',     area: '350 sqm', category: 'sold',  budget: '2m-2.5m',   location: 'Level 3',      image: '../images/properties/shoppingmall/#'  },
        { id: 125,  type: 'shopping-mall', name: 'Food Court H1',       area: '120 sqm', category: 'sold',  budget: '800k-1m',   location: 'Ground Floor', image: '../images/properties/shoppingmall/#'  },
        { id: 126,  type: 'shopping-mall', name: 'Service Unit I2',     area: '90 sqm',  category: 'sold',  budget: '500k-800k', location: 'Basement',     image: '../images/properties/shoppingmall/#'  },
        { id: 127, type: 'shopping-mall', name: 'Display Area J1',     area: '180 sqm', category: 'sold',  budget: '1m-1.5m',   location: 'Level 1',      image: '../images/properties/shoppingmall/#' },


        // Residential Units
        { id: 11, type: 'residential',  name: 'Studio Apartment A', area: '45 sqm',  price: 550000,  budget: '500k-800k', location: 'Tower A, Level 5',  image: '../images/properties/residentalunit/#' },
        { id: 12, type: 'residential',  name: 'Studio Apartment B', area: '45 sqm',  price: 580000,  budget: '500k-800k', location: 'Tower A, Level 8',  image: '../images/properties/residentalunit/#' },
        { id: 13, type: 'residential',  name: 'One Bedroom C',      area: '65 sqm',  price: 750000,  budget: '500k-800k', location: 'Tower B, Level 3',  image: '../images/properties/residentalunit/#' },
        { id: 14, type: 'residential',  name: 'One Bedroom D',      area: '65 sqm',  price: 820000,  budget: '800k-1m',   location: 'Tower B, Level 7',  image: '../images/properties/residentalunit/#' },
        { id: 15, type: 'residential',  name: 'Two Bedroom E',      area: '95 sqm',  price: 1100000, budget: '1m-1.5m',   location: 'Tower C, Level 4',  image: '../images/properties/residentalunit/#' },
        { id: 16, type: 'residential',  name: 'Two Bedroom F',      area: '95 sqm',  price: 1250000, budget: '1m-1.5m',   location: 'Tower C, Level 10', image: '../images/properties/residentalunit/#' },
        { id: 17, type: 'residential',  name: 'Three Bedroom G',    area: '130 sqm', price: 1700000, budget: '1.5m-2m',   location: 'Tower D, Level 6',  image: '../images/properties/residentalunit/#' },
        { id: 18, type: 'residential',  name: 'Three Bedroom H',    area: '130 sqm', price: 1850000, budget: '1.5m-2m',   location: 'Tower D, Level 12', image: '../images/properties/residentalunit/#' },
        { id: 19, type: 'residential',  name: 'Penthouse I',        area: '180 sqm', price: 2200000, budget: '2m-2.5m',   location: 'Tower E, Level 18', image: '../images/properties/residentalunit/#' },
        { id: 20, type: 'residential',  name: 'Penthouse J',        area: '200 sqm', price: 2450000, budget: '2m-2.5m',   location: 'Tower E, Level 20', image: '../images/properties/residentalunit/#' },

        // Hotel and Offices
        { id: 21, type: 'hotel-office', name: 'Office Suite A',     area: '120 sqm', price: 800000,  budget: '800k-1m',   location: 'Office Tower, Level 2',  image: '../images/properties/hotel&offices/#' },
        { id: 22, type: 'hotel-office', name: 'Office Suite B',     area: '120 sqm', price: 850000,  budget: '800k-1m',   location: 'Office Tower, Level 5',  image: '../images/properties/hotel&offices/#' },
        { id: 23, type: 'hotel-office', name: 'Office Complex C',   area: '200 sqm', price: 1150000, budget: '1m-1.5m',   location: 'Office Tower, Level 8',  image: '../images/properties/hotel&offices/#' },
        { id: 24, type: 'hotel-office', name: 'Office Complex D',   area: '200 sqm', price: 1300000, budget: '1m-1.5m',   location: 'Office Tower, Level 12', image: '../images/properties/hotel&offices/#' },
        { id: 25, type: 'hotel-office', name: 'Hotel Room Type A',  area: '30 sqm',  price: 600000,  budget: '500k-800k', location: 'Hotel Wing, Level 3',    image: '../images/properties/hotel&offices/#' },
        { id: 26, type: 'hotel-office', name: 'Hotel Room Type B',  area: '30 sqm',  price: 650000,  budget: '500k-800k', location: 'Hotel Wing, Level 6',    image: '../images/properties/hotel&offices/#' },
        { id: 27, type: 'hotel-office', name: 'Hotel Suite Deluxe',  area: '50 sqm',  price: 950000,  budget: '800k-1m',   location: 'Hotel Wing, Level 10',   image: '../images/properties/hotel&offices/#' },
        { id: 28, type: 'hotel-office', name: 'Executive Suite',     area: '60 sqm',  price: 1450000, budget: '1m-1.5m',   location: 'Hotel Wing, Level 15',   image: '../images/properties/hotel&offices/#' },
        { id: 29, type: 'hotel-office', name: 'Premium Suite',       area: '80 sqm',  price: 1950000, budget: '1.5m-2m',   location: 'Hotel Wing, Level 18',   image: '../images/properties/hotel&offices/#' },
        { id: 30, type: 'hotel-office', name: 'Penthouse Suite',     area: '120 sqm', price: 2350000, budget: '2m-2.5m',   location: 'Hotel Wing, Level 22',   image: '../images/properties/hotel&offices/#' }
    ];

    const filterBtns = document.querySelectorAll('.filter-btn');
    const budgetBtns = document.querySelectorAll('.budget-btn');
    const propertiesGrid = document.querySelector('.properties-grid');
    const noResults = document.querySelector('.no-results');

    const typeSelect = document.getElementById('typeSelect');
    const budgetSelect = document.getElementById('budgetSelect');
    const customBudgetWrap = document.getElementById('customBudgetWrap');
    const customBudgetInput = document.getElementById('customBudgetInput');
    const filtersNote = document.getElementById('filtersNote');

    // keep previous filter variables
    let currentType = '';
    let currentBudgetKey = '';
    let customBudget = null;

    // enable budget select after choosing type
    typeSelect.addEventListener('change', () => {
        currentType = typeSelect.value;
        budgetSelect.disabled = currentType === '' ;
        // reset budget & custom input
        budgetSelect.value = '';
        customBudgetInput.value = '';
        customBudgetWrap.style.display = 'none';
        currentBudgetKey = '';
        customBudget = null;
        // hide results until both chosen
        document.querySelector('.properties-grid').classList.add('hidden');
        document.querySelector('.no-results').style.display = 'block';
        document.getElementById('noResultsText').textContent = 'Please select a budget to view properties.';
    });

    // budget select change
    budgetSelect.addEventListener('change', () => {
        const val = budgetSelect.value;
        if (!val) {
            currentBudgetKey = '';
            customBudget = null;
            customBudgetWrap.style.display = 'none';
            document.querySelector('.properties-grid').classList.add('hidden');
            document.querySelector('.no-results').style.display = 'block';
            document.getElementById('noResultsText').textContent = 'Please select a budget to view properties.';
            return;
        }

        if (val === 'custom') {
            customBudgetWrap.style.display = 'inline-block';
            customBudgetInput.focus();
            currentBudgetKey = '';
            customBudget = null;
            document.querySelector('.properties-grid').classList.add('hidden');
            document.querySelector('.no-results').style.display = 'block';
            document.getElementById('noResultsText').textContent = 'Enter your budget in the box to view properties (K).';
            return;
        }

        // selected a predefined range
        currentBudgetKey = val;
        customBudget = null;
        filterPropertiesIfReady();
    });

    // custom budget input
    customBudgetInput.addEventListener('input', () => {
        const v = parseInt(customBudgetInput.value, 10);
        customBudget = Number.isFinite(v) ? v : null;
        filterPropertiesIfReady();
    });

    function filterPropertiesIfReady() {
        // require a type selection and a budget selection/custom value
        if (!currentType || (currentBudgetKey === '' && (customBudget === null || customBudget === 0))) {
            document.querySelector('.properties-grid').classList.add('hidden');
            document.querySelector('.no-results').style.display = 'block';
            document.getElementById('noResultsText').textContent = 'Select category and budget to view properties.';
            return;
        }
        filterProperties();
    }

    // updated filterProperties to support custom budget and "don't show if < 500k"
    function filterProperties() {
        // start from type filter
        let filtered = properties.filter(prop => {
            return currentType === 'all' || prop.type === currentType;
        });

        // apply budget filter
        if (currentBudgetKey && currentBudgetKey !== 'all') {
            filtered = filtered.filter(prop => prop.budget === currentBudgetKey);
        } else if (customBudget !== null) {
            // if customBudget is less than 500,000 no properties should show
            if (customBudget < 500000) {
                filtered = [];
            } else {
                filtered = filtered.filter(prop => prop.price <= customBudget);
            }
        }

        const grid = document.querySelector('.properties-grid');
        const noRes = document.querySelector('.no-results');
        const noResText = document.getElementById('noResultsText');

        if (filtered.length === 0) {
            grid.innerHTML = '';
            grid.classList.add('hidden');
            noRes.style.display = 'block';
            noResText.textContent = (customBudget !== null && customBudget < 500000)
                ? 'No properties available for budgets below K500,000.'
                : 'No properties found matching your criteria. Please adjust your filters.';
            return;
        }

        noRes.style.display = 'none';
        grid.classList.remove('hidden');
        grid.innerHTML = filtered.map(prop => `
            <div class="property-card compact" data-property-id="${prop.id}">
                <div class="property-image">
                    <img src="${prop.image}" alt="${prop.name}" onerror="this.src='../images/placeholder.jpg'">
                </div>
                <div class="property-info">
                    <h3>${prop.name}</h3>
                    <p class="property-type">${prop.type.replace('-', ' ').toUpperCase()}</p>
                    <p class="property-price">${prop.category.toLocaleString()}</p>
                    <div class="property-details">
                        <div class="detail">
                            <span class="label">Area:</span>
                            <span class="value">${prop.area}</span>
                        </div>
                        <div class="detail">
                            <span class="label">Location:</span>
                            <span class="value">${prop.location}</span>
                        </div>
                    </div>
                    <div class="property-actions">
                        <a href="contact.html?property=${prop.id}" class="btn-small">Inquire</a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Initial display
    filterProperties();
});

