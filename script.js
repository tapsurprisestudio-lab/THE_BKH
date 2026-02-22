// ============================================
// BKH LUXURY JEWELRY - JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // GLOBAL STATE
    // ============================================
    let currentLang = 'en';
    let cart = JSON.parse(localStorage.getItem('bkhCart')) || [];
    let reviews = JSON.parse(localStorage.getItem('bkhReviews')) || [];
    let selectedRating = 0;
    let chatbotState = 'initial';

    // ============================================
    // PRODUCT DATA FOR CHATBOT
    // ============================================
    const products = {
        rings: [
            { name: { en: 'Elegant Gold Ring', ar: 'خاتم ذهبي أنيق' }, price: '20,000 DZD' },
            { name: { en: 'Premium Diamond Ring', ar: 'خاتم ألماس فاخر' }, price: '30,000 DZD' }
        ],
        sets: [
            { name: { en: 'Royal Luxury Set', ar: 'مجموعة فاخرة ملكية' }, price: '170,000 DZD' },
            { name: { en: 'Crystal Collection Set', ar: 'مجموعة كريستال' }, price: '200,000 DZD' }
        ],
        budget: {
            '20k': { en: 'Rings', ar: 'خواتم', range: '20,000 - 30,000 DZD' },
            '70k': { en: 'Bracelets & Necklaces', ar: 'أساور وقلائد', range: '70,000 DZD' },
            '170k': { en: 'Luxury Earrings & Sets', ar: 'أقراط ومجموعات فاخرة', range: '170,000 - 200,000 DZD' },
            '200k': { en: 'Premium Sets', ar: 'مجموعات فاخرة', range: '200,000 DZD' }
        }
    };

    // ============================================
    // PARTICLE ANIMATION
    // ============================================
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function initParticles() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = [];
        
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(200, 162, 75, ${p.opacity})`;
            ctx.fill();
        });
        
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    window.addEventListener('resize', function() {
        initParticles();
    });

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ============================================
    // LANGUAGE TOGGLE
    // ============================================
    const langBtn = document.getElementById('langBtn');
    
    function updateLanguage(lang) {
        currentLang = lang;
        document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
        langBtn.textContent = lang === 'ar' ? 'AR' : 'EN';
        
        // Update all elements with data-en and data-ar
        document.querySelectorAll('[data-en][data-ar]').forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });
        
        // Update document title
        document.title = lang === 'ar' ? 'BKH - مجوهرات فاخرة' : 'BKH - Luxury Jewelry';
        
        // Save language preference
        localStorage.setItem('bkhLang', lang);
    }

    langBtn.addEventListener('click', function() {
        updateLanguage(currentLang === 'en' ? 'ar' : 'en');
    });

    // Load saved language
    const savedLang = localStorage.getItem('bkhLang');
    if (savedLang) {
        updateLanguage(savedLang);
    }

    // ============================================
    // SMOOTH SCROLL
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================
    // PRODUCT CATEGORY FILTER
    // ============================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const productCards = document.querySelectorAll('.product-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active tab
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            productCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ============================================
    // CART SYSTEM
    // ============================================
    const cartBtn = document.getElementById('cartBtn');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartClose = document.getElementById('cartClose');
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');

    function openCart() {
        cartDrawer.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeCart() {
        cartDrawer.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    cartBtn.addEventListener('click', openCart);
    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    function updateCartCount() {
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = count;
    }

    function updateCartTotal() {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total.toLocaleString() + ' DZD';
    }

    function renderCart() {
        if (cart.length === 0) {
            cartItems.innerHTML = `<p class="cart-empty" data-en="Your cart is empty" data-ar="سلتك فارغة">${currentLang === 'ar' ? 'سلتك فارغة' : 'Your cart is empty'}</p>`;
        } else {
            cartItems.innerHTML = cart.map((item, index) => `
                <div class="cart-item">
                    <div class="cart-item-details">
                        <h4 class="cart-item-name">${item.name}</h4>
                        <p class="cart-item-price">${item.price.toLocaleString()} DZD</p>
                        <div class="cart-item-quantity">
                            <button class="qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
                            <span class="qty-value">${item.quantity}</span>
                            <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                            <button class="remove-item" onclick="removeFromCart(${index})" data-en="Remove" data-ar="حذف">${currentLang === 'ar' ? 'حذف' : 'Remove'}</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
        
        updateCartCount();
        updateCartTotal();
        localStorage.setItem('bkhCart', JSON.stringify(cart));
    }

    // Global functions for cart operations
    window.updateQuantity = function(index, change) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        renderCart();
    };

    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        renderCart();
    };

    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const name = this.dataset.name;
            const price = parseInt(this.dataset.price);
            
            // Check if item already exists
            const existingItem = cart.find(item => item.name === name);
            
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name, price, quantity: 1 });
            }
            
            renderCart();
            openCart();
            
            // Show feedback
            this.textContent = currentLang === 'ar' ? '✓ تمت الإضافة' : '✓ Added';
            setTimeout(() => {
                this.textContent = this.getAttribute(`data-${currentLang === 'ar' ? 'ar' : 'en'}`);
            }, 1500);
        });
    });

    // Generate Order ID
    function generateOrderId() {
        return 'BKH-' + Date.now().toString(36).toUpperCase();
    }

    // Checkout
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) return;
        
        const orderId = generateOrderId();
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        let message = currentLang === 'ar' 
            ? `🛍️ طلبية BKH - مجوهرات فاخرة\n\n` 
            : `🛍️ BKH Order - Luxury Jewelry\n\n`;
        
        message += currentLang === 'ar' ? '📦 المنتجات:\n' : '📦 Products:\n';
        
        cart.forEach(item => {
            message += `• ${item.name} x${item.quantity} = ${(item.price * item.quantity).toLocaleString()} DZD\n`;
        });
        
        message += `\n💰 ${currentLang === 'ar' ? 'الإجمالي' : 'Total'}: ${total.toLocaleString()} DZD\n`;
        message += `🔖 ${currentLang === 'ar' ? 'رقم الطلب' : 'Order ID'}: ${orderId}\n\n`;
        message += currentLang === 'ar' 
            ? 'شكراً لطلبك من BKH! 🙏' 
            : 'Thank you for your order from BKH! 🙏';
        
        // Store message for copying
        window.currentOrderMessage = message;
        window.currentOrderId = orderId;
        
        // Show options
        const continueBtn = document.createElement('button');
        continueBtn.className = 'checkout-btn';
        continueBtn.style.marginTop = '10px';
        continueBtn.innerHTML = `
            <a href="https://www.instagram.com/the_bkh10" target="_blank" style="color: inherit; text-decoration: none; display: block;">
                ${currentLang === 'ar' ? '📱 تواصل عبر إنستغرام' : '📱 Continue to Instagram'}
            </a>
        `;
        
        const copyBtn = document.createElement('button');
        copyBtn.className = 'checkout-btn';
        copyBtn.style.marginTop = '10px';
        copyBtn.textContent = currentLang === 'ar' ? '📋 نسخ الرسالة' : '📋 Copy Order';
        
        cartItems.innerHTML = `
            <div class="cart-item" style="display: block; border: none;">
                <h4 style="color: var(--gold); margin-bottom: 15px;">${currentLang === 'ar' ? '✅ تم إنشاء الطلب!' : '✅ Order Created!'}</h4>
                <p style="font-size: 12px; color: var(--gray); margin-bottom: 10px;">${currentLang === 'ar' ? 'رقم الطلب' : 'Order ID'}: <span style="color: var(--white);">${orderId}</span></p>
                <pre style="font-size: 11px; color: var(--soft-gold); white-space: pre-wrap; background: var(--black-lighter); padding: 15px; border-radius: 8px; margin-bottom: 15px; max-height: 200px; overflow-y: auto;">${message}</pre>
            </div>
        `;
        
        const btnContainer = document.createElement('div');
        btnContainer.appendChild(copyBtn);
        btnContainer.appendChild(continueBtn);
        cartItems.appendChild(btnContainer);
        
        copyBtn.addEventListener('click', async function() {
            try {
                await navigator.clipboard.writeText(message);
                copyBtn.textContent = currentLang === 'ar' ? '✅ تم النسخ!' : '✅ Copied!';
                setTimeout(() => {
                    copyBtn.textContent = currentLang === 'ar' ? '📋 نسخ الرسالة' : '📋 Copy Order';
                }, 2000);
            } catch (err) {
                // Fallback for older browsers
                const textarea = document.createElement('textarea');
                textarea.value = message;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                copyBtn.textContent = currentLang === 'ar' ? '✅ تم النسخ!' : '✅ Copied!';
                setTimeout(() => {
                    copyBtn.textContent = currentLang === 'ar' ? '📋 نسخ الرسالة' : '📋 Copy Order';
                }, 2000);
            }
        });
    });

    // Initialize cart
    renderCart();

    // ============================================
    // CHATBOT
    // ============================================
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbot = document.getElementById('chatbot');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotOptions = document.getElementById('chatbotOptions');

    function toggleChatbot() {
        chatbot.classList.toggle('active');
    }

    chatbotToggle.addEventListener('click', toggleChatbot);
    chatbotClose.addEventListener('click', toggleChatbot);

    function addMessage(text, isUser = false) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chatbot-message ${isUser ? 'user' : 'bot'}`;
        
        // Check if text has data attributes
        if (typeof text === 'object' && text.en && text.ar) {
            msgDiv.innerHTML = `<p>${currentLang === 'ar' ? text.ar : text.en}</p>`;
        } else {
            msgDiv.innerHTML = `<p>${text}</p>`;
        }
        
        chatbotMessages.appendChild(msgDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function showInitialOptions() {
        chatbotState = 'initial';
        chatbotOptions.innerHTML = `
            <button class="chatbot-option" data-action="rings" data-en="View Rings" data-ar="عرض الخواتم">${currentLang === 'ar' ? 'عرض الخواتم' : 'View Rings'}</button>
            <button class="chatbot-option" data-action="sets" data-en="View Sets" data-ar="عرض المجموعات">${currentLang === 'ar' ? 'عرض المجموعات' : 'View Sets'}</button>
            <button class="chatbot-option" data-action="choose" data-en="Help me choose" data-ar="ساعدني في الاختيار">${currentLang === 'ar' ? 'ساعدني في الاختيار' : 'Help me choose'}</button>
            <button class="chatbot-option" data-action="why" data-en="Why choose BKH?" data-ar="لماذا تختار BKH؟">${currentLang === 'ar' ? 'لماذا تختار BKH؟' : 'Why choose BKH?'}</button>
            <button class="chatbot-option" data-action="order" data-en="How to order" data-ar="كيف اطلب">${currentLang === 'ar' ? 'كيف اطلب' : 'How to order'}</button>
        `;
        attachChatbotListeners();
    }

    function showBudgetOptions() {
        chatbotState = 'budget';
        chatbotOptions.innerHTML = `
            <div class="chatbot-budget-options">
                <button class="budget-option" data-budget="20k">20,000 DZD - ${currentLang === 'ar' ? 'خواتم' : 'Rings'}</button>
                <button class="budget-option" data-budget="70k">70,000 DZD - ${currentLang === 'ar' ? 'أساور وقلائد' : 'Bracelets & Necklaces'}</button>
                <button class="budget-option" data-budget="170k">170,000 DZD - ${currentLang === 'ar' ? 'أقراط فاخرة' : 'Luxury Earrings'}</button>
                <button class="budget-option" data-budget="200k">200,000 DZD - ${currentLang === 'ar' ? 'مجموعات فاخرة' : 'Premium Sets'}</button>
                <button class="chatbot-back" data-action="back">← ${currentLang === 'ar' ? 'رجوع' : 'Back'}</button>
            </div>
        `;
        attachBudgetListeners();
    }

    function attachChatbotListeners() {
        document.querySelectorAll('.chatbot-option').forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.dataset.action;
                handleChatbotAction(action);
            });
        });
    }

    function attachBudgetListeners() {
        document.querySelectorAll('.budget-option').forEach(btn => {
            btn.addEventListener('click', function() {
                const budget = this.dataset.budget;
                const budgetData = products.budget[budget];
                
                const response = {
                    en: `Based on your budget of ${budget}, we recommend:\n\n✨ ${budgetData.en}\n\n💰 Price Range: ${budgetData.range}\n\nWould you like to view these products?`,
                    ar: `بناءً على ميزانيتك البالغة ${budget}، نوصي بـ:\n\n✨ ${budgetData.ar}\n\n💰 نطاق السعر: ${budgetData.range}\n\nهل تريد عرض هذه المنتجات؟`
                };
                
                addMessage(response);
                setTimeout(() => showInitialOptions(), 500);
            });
        });
        
        document.querySelector('.chatbot-back').addEventListener('click', function() {
            addMessage({ en: 'How may I assist you?', ar: 'كيف يمكنني مساعدتك؟' });
            showInitialOptions();
        });
    }

    function handleChatbotAction(action) {
        const productNames = {
            rings: products.rings.map(p => `• ${currentLang === 'ar' ? p.name.ar : p.name.en} - ${p.price}`).join('\n'),
            sets: products.sets.map(p => `• ${currentLang === 'ar' ? p.name.ar : p.name.en} - ${p.price}`).join('\n')
        };

        const responses = {
            rings: {
                en: `💍 Our Rings Collection:\n\n${productNames.rings}\n\nWould you like to add any to your cart?`,
                ar: `💍 مجموعة الخواتم:\n\n${productNames.rings}\n\nهل تريد إضافة أي منها إلى سلتك؟`
            },
            sets: {
                en: `✨ Our Sets Collection:\n\n${productNames.sets}\n\nWould you like to add any to your cart?`,
                ar: `✨ مجموعة المجموعات:\n\n${productNames.sets}\n\nهل تريد إضافة أي منها إلى سلتك؟`
            },
            choose: {
                en: `💰 What is your budget range?`,
                ar: `💰 ما هو نطاق ميزانيتك؟`
            },
            why: {
                en: `🌟 Why Choose BKH?\n\n• Premium craftsmanship\n• Luxury packaging\n• Timeless elegance\n• Exclusive designs\n\nWe create pieces that last forever.`,
                ar: `🌟 لماذا تختار BKH؟\n\n• صناعة متميزة\n• تغليف فاخر\n• أناقة خالدة\n• تصميمات حصرية\n\nنصنع قطعاً تدوم للأبد.`
            },
            order: {
                en: `📝 How to Order:\n\n1️⃣ Browse our collection\n2️⃣ Add items to cart\n3️⃣ Click checkout\n4️⃣ Copy the order message\n5️⃣ Send via Instagram\n\nIt's that simple!`,
                ar: `📝 كيف تطلب:\n\n1️⃣ تصفح مجموعتنا\n2️⃣ أضف المنتجات للسلة\n3️⃣ انقر على إتمام الشراء\n4️⃣ انسخ رسالة الطلب\n5️⃣ أرسل عبر إنستغرام\n\nهل هذا واضح!`
            }
        };

        const response = responses[action];
        if (response) {
            addMessage(response);
        }

        if (action === 'choose') {
            setTimeout(() => showBudgetOptions(), 500);
        }
    }

    // Initialize chatbot options
    attachChatbotListeners();

    // ============================================
    // REVIEWS
    // ============================================
    const reviewForm = document.getElementById('reviewForm');
    const reviewsGrid = document.getElementById('reviewsGrid');
    const stars = document.querySelectorAll('.star');

    // Star rating
    stars.forEach(star => {
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.dataset.value);
            stars.forEach(s => {
                s.classList.toggle('active', parseInt(s.dataset.value) <= selectedRating);
            });
        });
    });

    // Load saved reviews
    function loadReviews() {
        // Preloaded reviews
        const preloadedReviews = [
            {
                name: 'Sarah M.',
                rating: 5,
                text: { en: 'Absolutely stunning jewelry! The quality is exceptional and the design is breathtaking.', ar: 'مجوهرات مذهلة! الجودة استثنائية والتصميم يأسر الأنظار.' }
            },
            {
                name: 'Amira K.',
                rating: 5,
                text: { en: 'BKH never disappoints. Every piece is a masterpiece. Highly recommended!', ar: 'BKH لا تخذلك أبداً. كل قطعة تحفة فنية. بشدة أنصح!' }
            },
            {
                name: 'Layla H.',
                rating: 5,
                text: { en: 'The packaging was luxurious and the jewelry exceeded my expectations. Will buy again!', ar: 'التغليف كان فاخراً وتجاوزت المجوهرات توقعاتي. سأشتري مرة أخرى!' }
            }
        ];

        const allReviews = [...preloadedReviews, ...reviews];
        
        reviewsGrid.innerHTML = allReviews.map(review => `
            <div class="review-card">
                <div class="review-stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
                <p class="review-text">${typeof review.text === 'object' ? (currentLang === 'ar' ? review.text.ar : review.text.en) : review.text}</p>
                <p class="review-author">${review.name}</p>
            </div>
        `).join('');
    }

    // Submit review
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('reviewName').value;
        const comment = document.getElementById('reviewComment').value;
        
        if (selectedRating === 0) {
            alert(currentLang === 'ar' ? 'الرجاء اختيار تقييم' : 'Please select a rating');
            return;
        }
        
        const newReview = {
            name,
            rating: selectedRating,
            text: comment
        };
        
        reviews.push(newReview);
        localStorage.setItem('bkhReviews', JSON.stringify(reviews));
        
        // Reset form
        reviewForm.reset();
        stars.forEach(s => s.classList.remove('active'));
        selectedRating = 0;
        
        // Reload reviews
        loadReviews();
    });

    // Initialize reviews
    loadReviews();

    // ============================================
    // MOBILE MENU (Optional Enhancement)
    // ============================================
    let isMenuOpen = false;
    
    // Add mobile menu toggle if needed
    function addMobileMenu() {
        if (window.innerWidth <= 768) {
            const navContainer = document.querySelector('.nav-container');
            
            // Create mobile menu button
            const menuBtn = document.createElement('button');
            menuBtn.className = 'mobile-menu-btn';
            menuBtn.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            `;
            menuBtn.style.cssText = `
                background: transparent;
                border: none;
                color: var(--soft-gold);
                cursor: pointer;
                display: block;
            `;
            
            const navLinks = document.querySelector('.nav-links');
            
            // Check if menu btn already exists
            if (!document.querySelector('.mobile-menu-btn')) {
                navContainer.insertBefore(menuBtn, navLinks);
                
                menuBtn.addEventListener('click', function() {
                    isMenuOpen = !isMenuOpen;
                    navLinks.style.display = isMenuOpen ? 'flex' : 'none';
                    navLinks.style.flexDirection = currentLang === 'ar' ? 'row-reverse' : 'row';
                    navLinks.style.position = 'absolute';
                    navLinks.style.top = '70px';
                    navLinks.style.left = '0';
                    navLinks.style.right = '0';
                    navLinks.style.background = 'rgba(0,0,0,0.95)';
                    navLinks.style.padding = '20px';
                    navLinks.style.flexDirection = 'column';
                    navLinks.style.gap = '20px';
                    navLinks.style.textAlign = currentLang === 'ar' ? 'right' : 'left';
                });
            }
        }
    }

    // Initialize on load and resize
    addMobileMenu();
    window.addEventListener('resize', addMobileMenu);

    // ============================================
    // IMAGE ERROR HANDLING
    // ============================================
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect fill="%230d0d0d" width="300" height="300"/><text fill="%23c8a24b" font-family="sans-serif" font-size="16" x="50%" y="50%" text-anchor="middle" dy=".3em">BKH</text></svg>';
        });
    });

    console.log('BKH Luxury Jewelry - Loaded Successfully');
});
