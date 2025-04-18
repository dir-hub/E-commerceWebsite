// JavaScript for Lavender Shop

document.addEventListener('DOMContentLoaded', () => {
    // Make logo clickable to reload page
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', () => {
            window.location.reload();
        });
    }

    // Mobile Menu Toggle with Overlay
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const menuOverlay = document.getElementById('menu-overlay');

    if (menuToggle && mainNav && menuOverlay) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mainNav.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            const headerIcons = document.querySelector('.header-icons');

            // Change icon between hamburger and close
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking overlay
        menuOverlay.addEventListener('click', () => {
            mainNav.classList.remove('active');
            menuOverlay.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });

        // Close menu when clicking a nav link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                menuOverlay.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Shopping Cart
    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const closeCart = document.getElementById('close-cart');
    const clearCart = document.getElementById('clear-cart');
    const checkout = document.getElementById('checkout');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    let cart = [];

    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'flex';
        updateCart();
    });

    closeCart.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    clearCart.addEventListener('click', () => {
        cart = [];
        updateCart();
    });

    checkout.addEventListener('click', () => {
        alert('Proceeding to checkout.');
        cart = [];
        updateCart();
        cartModal.style.display = 'none';
    });

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <p>${item.name} - $${item.price}</p>
                <button class="remove-item">Remove</button>
            `;
            itemElement.querySelector('.remove-item').addEventListener('click', () => {
                cart = cart.filter(cartItem => cartItem !== item);
                updateCart();
            });
            cartItemsContainer.appendChild(itemElement);
            total += item.price;
        });
        cartTotalPrice.textContent = `$${total.toFixed(2)}`;
    }

    // Example of adding items to cart (this should be replaced with actual product data)
    const exampleProduct = { name: 'Lavender Scented Candle', price: 15.99 };
    document.getElementById('product-container').addEventListener('click', () => {
        cart.push(exampleProduct);
        updateCart();
    });

    // Search Input Expansion
    const searchIcon = document.querySelector('.search-icon');
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.classList.add('search-input');
    searchInput.placeholder = 'Search Anything';
    searchIcon.parentNode.insertBefore(searchInput, searchIcon);

    searchIcon.addEventListener('click', () => {
        searchInput.classList.toggle('expanded');
        if (searchInput.classList.contains('expanded')) {
            searchInput.focus();
        }
    });

    document.addEventListener('click', (e) => {
        if (!searchIcon.contains(e.target) && !searchInput.contains(e.target)) {
            searchInput.classList.remove('expanded');
        }
    });

    // User Icon Dropdown
    const userIcon = document.querySelector('.user-icon');
    const userMenu = document.createElement('div');
    userMenu.classList.add('user-menu');
    userMenu.innerHTML = `
        <a href="#">Profile</a>
        <a href="#">Orders</a>
        <a href="#">Log Out</a>
    `;
    userIcon.parentNode.appendChild(userMenu);

    userIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        userMenu.style.display = userMenu.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', () => {
        userMenu.style.display = 'none';
    });
    userMenu.classList.add('custom-style');

    // Theme Toggle with single icon
    const themeToggleBtn = document.getElementById('theme-toggle-btn');

    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Toggle dark theme
            document.body.classList.toggle('dark-theme');

            // Update icon to reflect current theme
            if (document.body.classList.contains('dark-theme')) {
                themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'dark');
            } else {
                themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Newsletter Subscription
    const newsletterForm = document.getElementById('newsletter-form');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    });

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for reaching out to us. We will get back to you soon.');
        contactForm.reset();
    });

    // JavaScript to handle active section highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav ul li a');

    function setActiveSection() {
        let currentSection = '';
        const scrollPosition = window.scrollY + 150; // Add offset to account for header

        sections.forEach(section => {
            if (!section.getAttribute('id')) return; // Skip sections without IDs

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');

            // Handle home link specially
            if (href === '#' && (currentSection === '' || currentSection === 'hero')) {
                link.classList.add('active');
            } 
            // For other links, match with current section
            else if (href === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveSection);

    // Set initial active section when page loads
    window.addEventListener('load', setActiveSection);
    setActiveSection();

    // Hero Carousel - completely rewritten for reliability
    document.addEventListener('DOMContentLoaded', function() {
        const carousel = document.querySelector('.carousel');
        const carouselInner = document.querySelector('.carousel-inner');
        const prevButton = document.querySelector('.carousel-control.prev');
        const nextButton = document.querySelector('.carousel-control.next');
        const indicators = document.querySelectorAll('.indicator');
        const slides = document.querySelectorAll('.carousel-item');

        let currentSlide = 0;
        const slideCount = slides.length;
        let isAnimating = false;

        // Initialize
        function updateCarousel() {
            // Update slides
            carouselInner.style.transform = `translateX(-${currentSlide * 50}%)`;

            // Update indicators
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });

            // Update active class on slides
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentSlide);
            });
        }

        // Go to specific slide
        function goToSlide(index) {
            if (isAnimating) return;

            isAnimating = true;

            // Ensure index is valid
            if (index < 0) {
                index = slideCount - 1;
            } else if (index >= slideCount) {
                index = 0;
            }

            currentSlide = index;
            updateCarousel();

            // Reset animation flag
            setTimeout(() => {
                isAnimating = false;
            }, 500);
        }

        // Event Listeners with console logging for debugging
        function setupNavigation() {
            // Previous slide button
            if (prevButton) {
                prevButton.onclick = function(e) {
                    e.preventDefault();
                    console.log('Previous button clicked');
                    goToSlide(currentSlide - 1);
                };
            }

            // Next slide button
            if (nextButton) {
                nextButton.onclick = function(e) {
                    e.preventDefault();
                    console.log('Next button clicked');
                    goToSlide(currentSlide + 1);
                };
            }

            // Indicator dots
            indicators.forEach((indicator, index) => {
                indicator.onclick = function(e) {
                    e.preventDefault();
                    console.log('Indicator clicked:', index);
                    goToSlide(index);
                };
            });
        }

        // Auto-advance carousel
        let autoAdvance = setInterval(() => {
            if (!isAnimating) {
                goToSlide(currentSlide + 1);
            }
        }, 5000);

        // Pause auto-advance on hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoAdvance);
        });

        carousel.addEventListener('mouseleave', () => {
            autoAdvance = setInterval(() => {
                if (!isAnimating) {
                    goToSlide(currentSlide + 1);
                }
            }, 5000);
        });

        // Initialize carousel
        updateCarousel();
        setupNavigation();
    });
});
// Chatbot Functionality
const chatBubble = document.querySelector('.chat-bubble');
const chatbotOverlay = document.querySelector('#chatbotOverlay');
const closeChatbot = document.querySelector('.close-chatbot');
const chatbotInput = document.querySelector('#chatbotInput');
const chatbotSend = document.querySelector('#chatbotSend');
const chatbotMessages = document.querySelector('#chatbotMessages');

// User info
const myFullName = "NeuraSpark";
const myDescription = "I am a AI model developed by Dhiraj. I am here to help you with any questions you may have related to any product AirPods: Wireless earbuds offering high-quality sound, seamless connectivity, and a compact charging case for on-the-go use,priced at $189.99.MacBook Pro: A powerful laptop featuring a sleek design, high-performance processors, and a stunning Retina display, ideal for professionals and creatives,available for $1,199.99.Sunglasses: Stylish eyewear with UV protection, designed to enhance your look while shielding your eyes from harmful sun rays,priced at $49.99.Fridge: A modern refrigerator with spacious storage, advanced cooling technology, and a sleek stainless-steel finish to complement any kitchen,listed at $799.99..our website has a wide range of products and we are here to help you with any questions you may have.our products are of high quality and highly rated on our website.our website is called Obsonium.our website is a one stop shop for all your needs where customers can find electronics, home decor, accessories and clothing products.";

// Replace with your Gemini API key
const GEMINI_API_KEY = "AIzaSyBVdXCMM0pBOfJTE5kNRQtRDxBX23cEhdA"; // Insert your actual API key

// Show initial message
function showInitialMessage() {
    chatbotMessages.innerHTML = ''; // Clear previous messages
    const initialMessage = document.createElement('div');
    initialMessage.className = 'message ai';
    initialMessage.innerHTML = `<div class="message-text">Hi, I am ${myFullName}, How can I help you?</div>`;
    chatbotMessages.appendChild(initialMessage);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Send Message and handle Gemini API with loading effect
async function sendMessage() {
    const messageText = chatbotInput.value.trim();
    if (!messageText) return;

    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'message user';
    userMessage.innerHTML = `<div class="message-text">${messageText}</div>`;
    chatbotMessages.appendChild(userMessage);

    // Clear input
    chatbotInput.value = '';

    // Add loading message with dots animation
    const loadingMessage = document.createElement('div');
    loadingMessage.className = 'message ai';
    loadingMessage.innerHTML = `
        <div class="message-text">
            <div class="loading-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>`;
    chatbotMessages.appendChild(loadingMessage);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    // Gemini API call
    try {
        const apiKey = "AIzaSyBVdXCMM0pBOfJTE5kNRQtRDxBX23cEhdA"; // Replace with your actual API key
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `User_message:${messageText}. Reply naturally to the usermessage and if required then answer based on: ${myDescription} or just simply give friendly reply .and reply in a way that ${myFullName} is himself talking .reply in short sentences.think like are a AI and help user to know more about any products.keep it fresh and avoid repeating words and give answer what user is asking,avoid giving any irrelevant information.`
                    }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        // Extract response text (adjust based on actual API structure)
        const reply = data.candidates[0].content.parts[0].text || "Hey, it's Dhiraj. Something went wrong. Try again?";

        // Replace loading message with actual response
        loadingMessage.innerHTML = `<div class="message-text">${reply}</div>`;
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    } catch (error) {
        console.error('Error fetching Gemini API:', error);
        // Replace loading message with fallback
        loadingMessage.innerHTML = `<div class="message-text">Yo, I'm Dhiraj. Network’s acting up. Ask me again?</div>`;
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
}
// Open Chatbot
chatBubble.addEventListener('click', () => {
    chatbotOverlay.classList.add('active');
    chatBubble.style.display = 'none';
    setTimeout(showInitialMessage, 300); // Show initial message every time
});

// Close Chatbot
closeChatbot.addEventListener('click', () => {
    chatbotOverlay.classList.remove('active');
    chatBubble.style.display = 'block';
});

// Send on button click
chatbotSend.addEventListener('click', sendMessage);

// Send on Enter key
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Auto-scroll to bottom when new messages are added
chatbotMessages.addEventListener('DOMNodeInserted', () => {
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
});