/* ========================================
   BKH - Luxury Jewelry Store Script
   ======================================== */

// ==========================================
// STATE MANAGEMENT
// ==========================================
const state = {
    language: localStorage.getItem('bkh_language') || 'ar',
    cart: JSON.parse(localStorage.getItem('bkh_cart')) || [],
    reviews: JSON.parse(localStorage.getItem('bkh_reviews')) || [],
    currentCategory: 'all',
    currentProduct: null,
    currentQty: 1,
    chatStep: 'main',
    selectedStars: 0
};

// ==========================================
// LANGUAGE DATA
// ==========================================
const langData = {
    ar: {
        nav_home: 'الرئيسية',
        nav_collections: 'المجموعات',
        nav_about: 'عن المتجر',
        nav_howtoorder: 'كيف أطلب؟',
        nav_reviews: 'آراء العملاء',
        nav_comingsoon: 'قريباً',
        nav_contact: 'تواصل معنا',
        hero_tagline: 'اختاري البساطة لتكتمل أناقتك',
        hero_shop: 'تصفحي المجموعات',
        hero_howto: 'كيف أطلب؟',
        badge_1: 'تغليف فاخر',
        badge_2: 'تصاميم راقية',
        badge_3: 'طلب عبر DM بسهولة',
        collections_title: 'المجموعات',
        filter_all: 'الكل',
        filter_rings: 'خواتم',
        filter_sets: 'أطقم',
        filter_bracelets: 'أساور',
        filter_necklaces: 'قلادات',
        filter_earrings: 'أقراط',
        quick_view: 'عرض سريع',
        add_to_cart: 'أضيفي للسلة',
        about_title: 'عن المتجر',
        about_text_1: 'BKH هو متجر مجوهرات فاخرة يقدم أجود تصاميم المجوهرات الذهبية والكريستال.',
        about_text_2: 'نسعى لتقديم لمسة من الفخامة والأناقة لكل سيدة تبحث عن التميز.',
        stat_customers: 'عميلة سعيدة',
        stat_designs: 'تصميم حصري',
        stat_rating: 'تقييم',
        howto_title: 'كيف أطلبي؟',
        step_1_title: 'اختاري المنتج',
        step_1_desc: 'تصفحي مجموعاتنا واختاري ما يعجبك',
        step_2_title: 'أضيفي للسلة',
        step_2_desc: 'أضيفي المنتج للسلة واختاري الكمية',
        step_3_title: 'انسخي الطلب',
        step_3_desc: 'انسخي رسالة الطلب الجاهزة',
        step_4_title: 'أرسلي عبر DM',
        step_4_desc: 'افتحي إنستغرام وأرسلينا الرسالة',
        step_5_title: 'تأكيد الطلب',
        step_5_desc: 'سنؤكد التفاصيل والدفع عند الاستلام',
        payment_coming: 'الدفع الإلكتروني قريباً',
        reviews_title: 'آراء العملاء',
        reviews_disclaimer: 'هذه الآراء من زوّار هذه الصفحة.',
        review_name_placeholder: 'الاسم (اختياري)',
        review_text_placeholder: 'اكتب تجربتك...',
        review_submit: 'إرسال التقييم',
        comingsoon_title: 'قريباً',
        coming_1: 'قريباً: دفع إلكتروني',
        coming_2: 'قريباً: مجموعات جديدة',
        coming_3: 'قريباً: تتبع الطلب',
        comingsoon_btn: 'أخبريني ماذا تريدين',
        contact_title: 'تواصل معنا',
        contact_btn: 'فتح إنستغرام',
        footer_rights: 'جميع الحقوق محفوظة',
        modal_qty: 'الكمية:',
        modal_add: 'أضيفي للسلة',
        cart_title: 'سلتي',
        cart_empty: 'سلتك فارغة',
        cart_total: 'الإجمالي:',
        cart_copy: 'نسخ الطلب',
        cart_ig: 'فتح إنستغرام',
        cart_hint: 'افتحي DM والصقي الرسالة المنسوخة.',
        toast_added: 'تمت الإضافة للسلة ✨',
        toast_copied: 'تم النسخ ✨',
        image_unavailable: 'الصورة غير متوفرة',
        colors_available: 'الألوان متوفرة',
        chatbot_greeting: 'مرحباً ✨ أنا المساعد الذكي لمتجر BKH. اختاري ما تريدين وسأساعدك فوراً:',
        chat_gift: 'أريد اقتراح هدية 🎁',
        chat_set: 'أبحث عن طقم فاخر ✨',
        chat_ring: 'أريد خاتم 👑',
        chat_pricing: 'الأسعار والتوصيل 🚚',
        chat_howto: 'كيف أطلب عبر DM؟ 💌',
        chat_budget: 'ما هو ميزانيتك؟',
        chat_20k: '20,000 دج',
        chat_70k: '70,000 دج',
        chat_170k: '170,000 دج',
        chat_200k: '200,000 دج',
        chat_view: 'عرض',
        chat_add: 'أضف',
        chat_open_cart: 'افتح السلة 🛒',
        chat_browse: 'تصفحي المنتجات',
        chat_open_dm: 'افتح DM 💌',
        chat_set_info: 'لدينا نوعان من الأطقم:',
        chat_eid_promo: 'طقم العيد (170k) - عرض محدود',
        chat_crystal: 'طقم كريستال (200k) - متعدد الألوان',
        chat_ring_info: 'لدينا خاتمان مميزان:',
        chat_ring_20k: 'خاتم ذهبي أنيق - 20,000 دج',
        chat_ring_30k: 'خاتم فاخر بتفاصيل - 30,000 دج',
        chat_which_style: 'أي تصميم تفضلين؟',
        chat_pricing_info: 'الأسعار بالدينار الجزائري (DZD):',
        chat_delivery: 'التوصيل متاح لجميع الولايات',
        chat_order_steps: 'خطوات الطلب سهلة: أضيفي للسلة > نسخ الطلب > فتح DM > لصق الرسالة',
        tell_me: 'أخبريني ماذا تريدين وسأقترح عليك أفضل الخيارات!'
    },
    en: {
        nav_home: 'Home',
        nav_collections: 'Collections',
        nav_about: 'About',
        nav_howtoorder: 'How to Order',
        nav_reviews: 'Reviews',
        nav_comingsoon: 'Coming Soon',
        nav_contact: 'Contact',
        hero_tagline: 'Choose simplicity to complete your elegance',
        hero_shop: 'Shop Collection',
        hero_howto: 'How to Order',
        badge_1: 'Luxury Packaging',
        badge_2: 'Premium Designs',
        badge_3: 'Easy DM Order',
        collections_title: 'Collections',
        filter_all: 'All',
        filter_rings: 'Rings',
        filter_sets: 'Sets',
        filter_bracelets: 'Bracelets',
        filter_necklaces: 'Necklaces',
        filter_earrings: 'Earrings',
        quick_view: 'Quick View',
        add_to_cart: 'Add to Cart',
        about_title: 'About Us',
        about_text_1: 'BKH is a luxury jewelry store offering the finest gold and crystal jewelry designs.',
        about_text_2: 'We strive to bring a touch of elegance and luxury to every woman seeking distinction.',
        stat_customers: 'Happy Clients',
        stat_designs: 'Exclusive Designs',
        stat_rating: 'Rating',
        howto_title: 'How to Order',
        step_1_title: 'Choose Product',
        step_1_desc: 'Browse our collections and pick what you love',
        step_2_title: 'Add to Cart',
        step_2_desc: 'Add product to cart and select quantity',
        step_3_title: 'Copy Order',
        step_3_desc: 'Copy the ready order message',
        step_4_title: 'Send via DM',
        step_4_desc: 'Open Instagram and send us the message',
        step_5_title: 'Confirm Order',
        step_5_desc: 'We confirm details and cash on delivery',
        payment_coming: 'Online payment coming soon',
        reviews_title: 'Customer Reviews',
        reviews_disclaimer: 'These reviews are from visitors of this page.',
        review_name_placeholder: 'Name (optional)',
        review_text_placeholder: 'Share your experience...',
        review_submit: 'Submit Review',
        comingsoon_title: 'Coming Soon',
        coming_1: 'Coming soon: Online payment',
        coming_2: 'Coming soon: New collections',
        coming_3: 'Coming soon: Order tracking',
        comingsoon_btn: 'Tell me what you want',
        contact_title: 'Contact Us',
        contact_btn: 'Open Instagram',
        footer_rights: 'All rights reserved',
        modal_qty: 'Quantity:',
        modal_add: 'Add to Cart',
        cart_title: 'My Cart',
        cart_empty: 'Your cart is empty',
        cart_total: 'Total:',
        cart_copy: 'Copy Order',
        cart_ig: 'Open Instagram',
        cart_hint: 'Open DM and paste the copied message.',
        toast_added: 'Added to cart ✨',
        toast_copied: 'Copied ✨',
        image_unavailable: 'Image unavailable',
        colors_available: 'Colors available',
        chatbot_greeting: 'Hello ✨ I\'m BKH\'s smart concierge. Choose an option and I\'ll help instantly:',
        chat_gift: 'Gift suggestion 🎁',
        chat_set: 'Luxury set ✨',
        chat_ring: 'I want a ring 👑',
        chat_pricing: 'Pricing & delivery 🚚',
        chat_howto: 'How to order via DM 💌',
        chat_budget: 'What\'s your budget?',
        chat_20k: '20,000 DZD',
        chat_70k: '70,000 DZD',
        chat_170k: '170,000 DZD',
        chat_200k: '200,000 DZD',
        chat_view: 'View',
        chat_add: 'Add',
        chat_open_cart: 'Open Cart 🛒',
        chat_browse: 'Browse Products',
        chat_open_dm: 'Open DM 💌',
        chat_set_info: 'We have two types of sets:',
        chat_eid_promo: 'Eid Set (170k) - Limited offer',
        chat_crystal: 'Crystal Set (200k) - Multiple colors',
        chat_ring_info: 'We have two distinctive rings:',
        chat_ring_20k: 'Elegant Gold Ring - 20,000 DZD',
        chat_ring_30k: 'Premium Detail Ring - 30,000 DZD',
        chat_which_style: 'Which style do you prefer?',
        chat_pricing_info: 'Prices in Algerian Dinar (DZD):',
        chat_delivery: 'Delivery available to all states',
        chat_order_steps: 'Easy steps: Add to cart > Copy order > Open DM > Paste message',
        tell_me: 'Tell me what you want and I\'ll suggest the best options!'
    }
};

// ==========================================
// PRODUCTS DATA
// ==========================================
const products = [
    {
        id: 1,
        category: 'rings',
        image: 'https://i.imgur.com/kKytRJK.jpeg',
        nameAr: 'خاتم ذهبي أنيق',
        nameEn: 'Elegant Gold Ring',
        descAr: 'لمسة فخامة يومية بتصميم ناعم.',
        descEn: 'A refined everyday luxury touch.',
        price: 20000
    },
    {
        id: 2,
        category: 'sets',
        image: 'https://i.imgur.com/tCVPEcI.jpeg',
        nameAr: 'طقم العيد الفاخر (برومو)',
        nameEn: 'Eid Luxury Set (Promo)',
        descAr: 'عرض خاص بمناسبة العيد لفترة محدودة.',
        descEn: 'Limited-time Eid promo.',
        price: 170000,
        originalPrice: 200000
    },
    {
        id: 3,
        category: 'rings',
        image: 'https://i.imgur.com/xP3LmQ5.jpeg',
        nameAr: 'خاتم فاخر بتفاصيل راقية',
        nameEn: 'Premium Detail Ring',
        descAr: 'تصميم يلفت الانتباه مع فخامة هادئة.',
        descEn: 'Statement elegance with quiet luxury.',
        price: 30000
    },
    {
        id: 4,
        category: 'sets',
        image: 'https://i.imgur.com/3h0PeaC.jpeg',
        nameAr: 'طقم كريستال فاخر',
        nameEn: 'Luxury Crystal Set',
        descAr: 'متوفر بجميع ألوان الكريستال الحر.',
        descEn: 'Available in multiple crystal colors.',
        price: 200000,
        hasColors: true
    },
    {
        id: 5,
        category: 'bracelets',
        image: 'https://i.imgur.com/3GG8mYX.jpeg',
        nameAr: 'سوار فاخر بتصميم ملكي',
        nameEn: 'Royal Luxury Bracelet',
        descAr: 'سوار يكمّل إطلالتك بفخامة.',
        descEn: 'Elevates your look with royalty.',
        price: 70000
    },
    {
        id: 6,
        category: 'necklaces',
        image: 'https://i.imgur.com/mPjtcQw.jpeg',
        nameAr: 'قلادة توقيع 1',
        nameEn: 'Signature Necklace 1',
        descAr: 'تصميم ناعم يليق بكل مناسبة.',
        descEn: 'Minimal signature elegance.',
        price: 70000
    },
    {
        id: 7,
        category: 'necklaces',
        image: 'https://i.imgur.com/WJqzURm.jpeg',
        nameAr: 'قلادة توقيع 2',
        nameEn: 'Signature Necklace 2',
        descAr: 'تصميم ناعم يليق بكل مناسبة.',
        descEn: 'Minimal signature elegance.',
        price: 70000
    },
    {
        id: 8,
        category: 'necklaces',
        image: 'https://i.imgur.com/l25zGQZ.jpeg',
        nameAr: 'قلادة توقيع 3',
        nameEn: 'Signature Necklace 3',
        descAr: 'تصميم ناعم يليق بكل مناسبة.',
        descEn: 'Minimal signature elegance.',
        price: 70000
    },
    {
        id: 9,
        category: 'necklaces',
        image: 'https://i.imgur.com/9KxkXFX.jpeg',
        nameAr: 'قلادة توقيع 4',
        nameEn: 'Signature Necklace 4',
        descAr: 'تصميم ناعم يليق بكل مناسبة.',
        descEn: 'Minimal signature elegance.',
        price: 70000
    },
    {
        id: 10,
        category: 'necklaces',
        image: 'https://i.imgur.com/SPnvYtJ.jpeg',
        nameAr: 'قلادة توقيع 5',
        nameEn: 'Signature Necklace 5',
        descAr: 'تصميم ناعم يليق بكل مناسبة.',
        descEn: 'Minimal signature elegance.',
        price: 70000
    },
    {
        id: 11,
        category: 'necklaces',
        image: 'https://i.imgur.com/YL7q5z5.jpeg',
        nameAr: 'قلادة توقيع 6',
        nameEn: 'Signature Necklace 6',
        descAr: 'تصميم ناعم يليق بكل مناسبة.',
        descEn: 'Minimal signature elegance.',
        price: 70000
    },
    {
        id: 12,
        category: 'necklaces',
        image: 'https://i.imgur.com/FGI8lcu.jpeg',
        nameAr: 'قلادة توقيع 7',
        nameEn: 'Signature Necklace 7',
        descAr: 'تصميم ناعم يليق بكل مناسبة.',
        descEn: 'Minimal signature elegance.',
        price: 70000
    },
    {
        id: 13,
        category: 'earrings',
        image: 'https://i.imgur.com/oiHsooV.jpeg',
        nameAr: 'أقراط فاخرة للتميز',
        nameEn: 'Signature Luxury Earrings',
        descAr: 'قطعة استثنائية لمحبات الفخامة.',
        descEn: 'Exceptional piece for true luxury lovers.',
        price: 170000
    }
];

// ==========================================
// DOM ELEMENTS
// ==========================================
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    initParticles();
    initNavigation();
    initCart();
    initModal();
    initReviews();
    initChatbot();
    initKeyboard();
    renderProducts();
    renderReviews();
    updateCartBadge();
});

// ==========================================
// LANGUAGE FUNCTIONS
// ==========================================
function initLanguage() {
    const isEn = state.language === 'en';
    document.body.classList.toggle('en', isEn);
    document.documentElement.dir = isEn ? 'ltr' : 'rtl';
    document.documentElement.lang = state.language;
    updateLangUI();
}

function updateLangUI() {
    const keys = Object.keys(langData[state.language]);
    keys.forEach(key => {
        const elements = $$(`[data-lang-key="${key}"]`);
        elements.forEach(el => {
            el.textContent = langData[state.language][key];
        });
    });

    const placeholders = $$('[data-lang-placeholder]');
    placeholders.forEach(el => {
        const key = el.dataset.langPlaceholder;
        el.placeholder = langData[state.language][key];
    });

    updateCartTotal();
}

function toggleLanguage() {
    state.language = state.language === 'ar' ? 'en' : 'ar';
    localStorage.setItem('bkh_language', state.language);
    initLanguage();
    renderProducts();
    renderReviews();
}

// ==========================================
// PARTICLES
// ==========================================
function initParticles() {
    const container = $('#goldParticles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'gold-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

// ==========================================
// NAVIGATION
// ==========================================
function initNavigation() {
    const toggle = $('#navToggle');
    const menu = $('#navMenu');
    const overlay = $('#menuOverlay');
    const langToggle = $('#langToggle');

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', closeMenu);

    langToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleLanguage();
    });

    // Close menu on nav link click
    $$('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
            setActiveNav(link.getAttribute('href'));
        });
    });

    // Hero CTA buttons
    $$('.hero-cta a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            closeMenu();
            setActiveNav(target);
            scrollToSection(target);
        });
    });

    // Set initial active
    setActiveNav('#home');

    // Update active on scroll
    window.addEventListener('scroll', updateActiveNav);
}

function closeMenu() {
    $('#navMenu').classList.remove('active');
    $('#menuOverlay').classList.remove('active');
}

function setActiveNav(href) {
    $$('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === href);
    });
}

function updateActiveNav() {
    const sections = $$('section[id]');
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
            setActiveNav('#' + id);
        }
    });
}

function scrollToSection(href) {
    const section = $(href);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ==========================================
// PRODUCTS
// ==========================================
function renderProducts() {
    const grid = $('#productsGrid');
    const lang = state.language;
    const category = state.currentCategory;

    grid.innerHTML = '';

    const filtered = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);

    filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.category = product.category;

        const name = lang === 'ar' ? product.nameAr : product.nameEn;
        const price = formatPrice(product.price);
        const categoryLabel = getCategoryLabel(product.category, lang);
        const quickView = lang === 'ar' ? 'عرض سريع' : 'Quick View';
        const addToCart = lang === 'ar' ? 'أضيفي للسلة' : 'Add to Cart';

        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${name}" onerror="this.parentElement.innerHTML='<div class=\\'fallback\\'>${langData[lang].image_unavailable}</div>'">
            </div>
            <div class="product-info">
                <span class="product-category">${categoryLabel}</span>
                <h3 class="product-name">${name}</h3>
                <p class="product-price">${price}</p>
                <div class="product-actions">
                    <button class="btn btn-secondary quick-view-btn" data-id="${product.id}">${quickView}</button>
                    <button class="btn btn-primary add-btn" data-id="${product.id}">${addToCart}</button>
                </div>
            </div>
        `;

        card.querySelector('.product-name').addEventListener('click', () => openProductModal(product.id));
        card.querySelector('.quick-view-btn').addEventListener('click', () => openProductModal(product.id));
        card.querySelector('.add-btn').addEventListener('click', () => addToCart(product.id));

        grid.appendChild(card);
    });
}

function formatPrice(price) {
    if (state.language === 'ar') {
        return price.toLocaleString() + ' دج';
    }
    return 'DZD ' + price.toLocaleString();
}

function getCategoryLabel(category, lang) {
    const labels = {
        rings: lang === 'ar' ? 'خواتم' : 'Rings',
        sets: lang === 'ar' ? 'أطقم' : 'Sets',
        bracelets: lang === 'ar' ? 'أساور' : 'Bracelets',
        necklaces: lang === 'ar' ? 'قلادات' : 'Necklaces',
        earrings: lang === 'ar' ? 'أقراط' : 'Earrings'
    };
    return labels[category] || '';
}

// Category filters
$('#categoryFilters').addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
        $$('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        state.currentCategory = e.target.dataset.category;
        renderProducts();
    }
});

// ==========================================
// PRODUCT MODAL
// ==========================================
function initModal() {
    const modal = $('#productModal');
    const close = $('#modalClose');
    const overlay = modal;

    close.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    // Qty controls
    $('#qtyMinus').addEventListener('click', () => {
        if (state.currentQty > 1) {
            state.currentQty--;
            $('#qtyValue').textContent = state.currentQty;
        }
    });

    $('#qtyPlus').addEventListener('click', () => {
        state.currentQty++;
        $('#qtyValue').textContent = state.currentQty;
    });

    // Add to cart from modal
    $('#modalAddBtn').addEventListener('click', () => {
        if (state.currentProduct) {
            addToCart(state.currentProduct.id, state.currentQty);
            closeModal();
        }
    });
}

function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    state.currentProduct = product;
    state.currentQty = 1;
    $('#qtyValue').textContent = '1';

    const lang = state.language;
    const name = lang === 'ar' ? product.nameAr : product.nameEn;
    const desc = lang === 'ar' ? product.descAr : product.descEn;
    const price = formatPrice(product.price);
    const addBtn = lang === 'ar' ? 'أضيفي للسلة' : 'Add to Cart';

    $('#modalImage').src = product.image;
    $('#modalImage').alt = name;
    $('#modalTitle').textContent = name;
    $('#modalPrice').textContent = price;
    $('#modalDesc').textContent = desc;
    $('#modalAddBtn').textContent = addBtn;

    const colorsEl = $('#modalColors');
    if (product.hasColors) {
        colorsEl.textContent = lang === 'ar' ? 'الألوان متوفرة' : 'Colors available';
        colorsEl.style.display = 'block';
    } else {
        colorsEl.style.display = 'none';
    }

    $('#productModal').classList.add('active');
}

function closeModal() {
    $('#productModal').classList.remove('active');
    state.currentProduct = null;
}

// ==========================================
// CART
// ==========================================
function initCart() {
    const cartBtn = $('#cartBtn');
    const cartDrawer = $('#cartDrawer');
    const cartOverlay = $('#cartOverlay');
    const cartClose = $('#cartClose');
    const copyBtn = $('#copyOrderBtn');
    const igBtn = $('#openIGBtn');

    cartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openCart();
    });

    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    copyBtn.addEventListener('click', copyOrder);
    igBtn.addEventListener('click', openIG);
}

function openCart() {
    $('#cartDrawer').classList.add('active');
    $('#cartOverlay').classList.add('active');
    renderCart();
}

function closeCart() {
    $('#cartDrawer').classList.remove('active');
    $('#cartOverlay').classList.remove('active');
}

function addToCart(productId, qty = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existing = state.cart.find(item => item.id === productId);
    if (existing) {
        existing.qty += qty;
    } else {
        state.cart.push({ id: productId, qty });
    }

    saveCart();
    updateCartBadge();
    showToast(langData[state.language].toast_added);
}

function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.id !== productId);
    saveCart();
    updateCartBadge();
    renderCart();
}

function updateCartQty(productId, change) {
    const item = state.cart.find(i => i.id === productId);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            renderCart();
            updateCartBadge();
        }
    }
}

function saveCart() {
    localStorage.setItem('bkh_cart', JSON.stringify(state.cart));
}

function updateCartBadge() {
    const total = state.cart.reduce((sum, item) => sum + item.qty, 0);
    $('#cartBadge').textContent = total;
}

function renderCart() {
    const container = $('#cartItems');
    const empty = $('#cartEmpty');
    const lang = state.language;

    if (state.cart.length === 0) {
        container.innerHTML = '';
        empty.classList.add('active');
        return;
    }

    empty.classList.remove('active');
    container.innerHTML = '';

    let total = 0;

    state.cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return;

        total += product.price * item.qty;
        const name = lang === 'ar' ? product.nameAr : product.nameEn;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${product.image}" alt="${name}">
            </div>
            <div class="cart-item-details">
                <span class="cart-item-name">${name}</span>
                <span class="cart-item-price">${formatPrice(product.price)}</span>
                <div class="cart-item-qty">
                    <button onclick="updateCartQty(${item.id}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button onclick="updateCartQty(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">&times;</button>
        `;
        container.appendChild(cartItem);
    });

    $('#cartTotal').textContent = formatPrice(total);
}

function updateCartTotal() {
    if (state.cart.length === 0) {
        $('#cartTotal').textContent = state.language === 'ar' ? '0 دج' : 'DZD 0';
        return;
    }
    
    let total = 0;
    state.cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) total += product.price * item.qty;
    });
    
    $('#cartTotal').textContent = formatPrice(total);
}

function copyOrder() {
    if (state.cart.length === 0) return;

    const lang = state.language;
    let message = '';

    if (lang === 'ar') {
        message = 'مرحباً BKH ✨\nأرغب في طلب المنتجات التالية:\n\n';
    } else {
        message = 'Hello BKH ✨\nI\'d like to order:\n\n';
    }

    let total = 0;
    state.cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            const name = lang === 'ar' ? product.nameAr : product.nameEn;
            const line = lang === 'ar' 
                ? `• ${name} × ${item.qty} — ${product.price.toLocaleString()} دج\n`
                : `• ${name} × ${item.qty} — ${product.price.toLocaleString()} DZD\n`;
            message += line;
            total += product.price * item.qty;
        }
    });

    if (lang === 'ar') {
        message += `\nالإجمالي: ${total.toLocaleString()} دج\n\n`;
        message += 'الاسم:\nالولاية/المدينة:\nرقم الهاتف:\nملاحظة (لون/مقاس إن وجد):';
    } else {
        message += `\nTotal: ${total.toLocaleString()} DZD\n\n`;
        message += 'Name:\nCity:\nPhone:\nNote (size/color):';
    }

    navigator.clipboard.writeText(message).then(() => {
        showToast(langData[lang].toast_copied);
    });
}

function openIG() {
    window.open('https://www.instagram.com/direct/new/', '_blank');
}

// ==========================================
// REVIEWS
// ==========================================
function initReviews() {
    const stars = $$('#starRating .star');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            state.selectedStars = parseInt(star.dataset.value);
            updateStars();
        });

        star.addEventListener('mouseenter', () => {
            const val = parseInt(star.dataset.value);
            stars.forEach((s, i) => {
                s.classList.toggle('active', i < val);
            });
        });
    });

    $('#starRating').addEventListener('mouseleave', updateStars);

    $('#submitReview').addEventListener('click', submitReview);
}

function updateStars() {
    $$('#starRating .star').forEach((star, i) => {
        star.classList.toggle('active', i < state.selectedStars);
    });
}

function submitReview() {
    const name = $('#reviewName').value.trim() || 'مجهول';
    const text = $('#reviewText').value.trim();
    const lang = state.language;

    if (!text || text.length < 5) {
        return;
    }

    if (state.selectedStars === 0) {
        return;
    }

    const review = {
        name,
        text,
        stars: state.selectedStars,
        date: new Date().toISOString()
    };

    state.reviews.unshift(review);
    localStorage.setItem('bkh_reviews', JSON.stringify(state.reviews));

    // Reset form
    $('#reviewName').value = '';
    $('#reviewText').value = '';
    state.selectedStars = 0;
    updateStars();

    renderReviews();
    showToast(lang === 'ar' ? 'شكراً لتقييمك! ✨' : 'Thank you for your review! ✨');
}

function renderReviews() {
    const container = $('#reviewsList');
    const lang = state.language;

    if (state.reviews.length === 0) {
        container.innerHTML = `<p style="text-align:center;color:var(--text-muted)">${lang === 'ar' ? 'لا توجد تقييمات بعد' : 'No reviews yet'}</p>`;
        return;
    }

    container.innerHTML = '';

    state.reviews.forEach(review => {
        const date = new Date(review.date).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US');
        const stars = '★'.repeat(review.stars) + '☆'.repeat(5 - review.stars);

        const item = document.createElement('div');
        item.className = 'review-item';
        item.innerHTML = `
            <div class="review-header">
                <span class="review-name">${review.name}</span>
                <span class="review-stars">${stars}</span>
            </div>
            <p class="review-text">${review.text}</p>
            <span class="review-date">${date}</span>
        `;
        container.appendChild(item);
    });
}

// ==========================================
// CHATBOT
// ==========================================
function initChatbot() {
    const toggle = $('#chatbotToggle');
    const panel = $('#chatbotPanel');
    const close = $('#chatbotClose');
    const tellMeBtn = $('#tellMeBtn');

    toggle.addEventListener('click', () => {
        panel.classList.toggle('active');
        if (panel.classList.contains('active')) {
            if ($('#chatbotOptions').children.length === 0) {
                showChatbotGreeting();
            }
        }
    });

    close.addEventListener('click', () => panel.classList.remove('active'));

    tellMeBtn.addEventListener('click', () => {
        panel.classList.add('active');
        openChatbotFlow('tellme');
    });

    // Click outside to close
    document.addEventListener('click', (e) => {
        if (!panel.contains(e.target) && e.target !== toggle) {
            panel.classList.remove('active');
        }
    });
}

function showChatbotGreeting() {
    const lang = state.language;
    const messages = $('#chatbotMessages');
    const options = $('#chatbotOptions');

    messages.innerHTML = `<div class="chatbot-msg">${langData[lang].chatbot_greeting}</div>`;

    const buttons = [
        { key: 'chat_gift', action: () => openChatbotFlow('gift') },
        { key: 'chat_set', action: () => openChatbotFlow('set') },
        { key: 'chat_ring', action: () => openChatbotFlow('ring') },
        { key: 'chat_pricing', action: () => openChatbotFlow('pricing') },
        { key: 'chat_howto', action: () => openChatbotFlow('howto') }
    ];

    options.innerHTML = buttons.map(btn => 
        `<button class="chatbot-btn" data-action="${btn.key}">${langData[lang][btn.key]}</button>`
    ).join('');

    options.querySelectorAll('.chatbot-btn').forEach((el, i) => {
        el.addEventListener('click', buttons[i].action);
    });
}

function openChatbotFlow(flow) {
    const lang = state.language;
    const messages = $('#chatbotMessages');
    const options = $('#chatbotOptions');

    state.chatStep = flow;
    options.innerHTML = '';

    if (flow === 'gift') {
        messages.innerHTML += `<div class="chatbot-msg">${langData[lang].chat_budget}</div>`;
        
        const budgets = [
            { key: 'chat_20k', price: 20000 },
            { key: 'chat_70k', price: 70000 },
            { key: 'chat_170k', price: 170000 },
            { key: 'chat_200k', price: 200000 }
        ];

        options.innerHTML = budgets.map(btn => 
            `<button class="chatbot-btn" data-action="gift-${btn.price}">${langData[lang][btn.key]}</button>`
        ).join('');

        options.querySelectorAll('.chatbot-btn').forEach(el => {
            el.addEventListener('click', () => {
                const price = parseInt(el.dataset.action.split('-')[1]);
                suggestGift(price);
            });
        });
    } else if (flow === 'set') {
        messages.innerHTML += `<div class="chatbot-msg">${langData[lang].chat_set_info}</div><div class="chatbot-msg">${langData[lang].chat_eid_promo}</div><div class="chatbot-msg">${langData[lang].chat_crystal}</div>`;
        addEndOptions();
    } else if (flow === 'ring') {
        messages.innerHTML += `<div class="chatbot-msg">${langData[lang].chat_ring_info}</div><div class="chatbot-msg">${langData[lang].chat_ring_20k}</div><div class="chatbot-msg">${langData[lang].chat_ring_30k}</div><div class="chatbot-msg">${langData[lang].chat_which_style}</div>`;
        
        options.innerHTML = `
            <button class="chatbot-btn" data-action="add-1">${langData[lang].chat_add}</button>
            <button class="chatbot-btn" data-action="add-3">${langData[lang].chat_add}</button>
        `;
        
        options.querySelector('[data-action="add-1"]').addEventListener('click', () => addToCart(1));
        options.querySelector('[data-action="add-3"]').addEventListener('click', () => addToCart(3));
        
        addEndOptions(options);
    } else if (flow === 'pricing') {
        messages.innerHTML += `<div class="chatbot-msg">${langData[lang].chat_pricing_info}</div>
            <div class="chatbot-msg">• Rings: 20,000 - 30,000 DZD</div>
            <div class="chatbot-msg">• Bracelets: 70,000 DZD</div>
            <div class="chatbot-msg">• Necklaces: 70,000 DZD</div>
            <div class="chatbot-msg">• Sets: 170,000 - 200,000 DZD</div>
            <div class="chatbot-msg">• Earrings: 170,000 DZD</div>
            <div class="chatbot-msg">${langData[lang].chat_delivery}</div>`;
        addEndOptions();
    } else if (flow === 'howto') {
        messages.innerHTML += `<div class="chatbot-msg">${langData[lang].chat_order_steps}</div>`;
        addEndOptions();
    } else if (flow === 'tellme') {
        messages.innerHTML = `<div class="chatbot-msg">${langData[lang].tell_me}</div>`;
        
        const buttons = [
            { key: 'chat_gift', action: () => openChatbotFlow('gift') },
            { key: 'chat_set', action: () => openChatbotFlow('set') },
            { key: 'chat_ring', action: () => openChatbotFlow('ring') }
        ];

        options.innerHTML = buttons.map(btn => 
            `<button class="chatbot-btn" data-action="${btn.key}">${langData[lang][btn.key]}</button>`
        ).join('');

        options.querySelectorAll('.chatbot-btn').forEach((el, i) => {
            el.addEventListener('click', buttons[i].action);
        });
    }
}

function suggestGift(budget) {
    const lang = state.language;
    const messages = $('#chatbotMessages');
    const options = $('#chatbotOptions');

    let suggestion = null;
    if (budget <= 20000) {
        suggestion = products.find(p => p.id === 1);
    } else if (budget <= 70000) {
        suggestion = products.find(p => p.id === 5);
    } else if (budget <= 170000) {
        suggestion = products.find(p => p.id === 2);
    } else {
        suggestion = products.find(p => p.id === 4);
    }

    if (suggestion) {
        const name = lang === 'ar' ? suggestion.nameAr : suggestion.nameEn;
        messages.innerHTML += `<div class="chatbot-msg">${lang === 'ar' ? 'اقتراحي:' : 'My suggestion:'} ${name} - ${formatPrice(suggestion.price)}</div>`;
        
        options.innerHTML = `
            <button class="chatbot-btn" data-action="view-${suggestion.id}">${langData[lang].chat_view}</button>
            <button class="chatbot-btn" data-action="add-${suggestion.id}">${langData[lang].chat_add}</button>
        `;

        options.querySelector('[data-action^="view-"]').addEventListener('click', () => openProductModal(suggestion.id));
        options.querySelector('[data-action^="add-"]').addEventListener('click', () => addToCart(suggestion.id));
    }
    
    addEndOptions(options);
}

function addEndOptions(container = null) {
    const options = container || $('#chatbotOptions');
    const lang = state.language;
    const currentHtml = options.innerHTML;

    options.innerHTML = currentHtml + `
        <button class="chatbot-btn" data-action="cart">${langData[lang].chat_open_cart}</button>
        <button class="chatbot-btn" data-action="browse">${langData[lang].chat_browse}</button>
        <button class="chatbot-btn" data-action="dm">${langData[lang].chat_open_dm}</button>
    `;

    options.querySelector('[data-action="cart"]').addEventListener('click', openCart);
    options.querySelector('[data-action="browse"]').addEventListener('click', () => {
        $('#chatbotPanel').classList.remove('active');
        scrollToSection('#collections');
    });
    options.querySelector('[data-action="dm"]').addEventListener('click', openIG);
}

// ==========================================
// KEYBOARD HANDLING
// ==========================================
function initKeyboard() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Priority: modal > cart > menu
            if ($('#productModal').classList.contains('active')) {
                closeModal();
            } else if ($('#cartDrawer').classList.contains('active')) {
                closeCart();
            } else if ($('#navMenu').classList.contains('active')) {
                closeMenu();
            } else if ($('#chatbotPanel').classList.contains('active')) {
                $('#chatbotPanel').classList.remove('active');
            }
        }
    });
}

// ==========================================
// TOAST
// ==========================================
function showToast(message) {
    const toast = $('#toast');
    const msg = $('#toastMessage');
    msg.textContent = message;
    toast.classList.add('active');

    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

// Make functions globally available
window.updateCartQty = updateCartQty;
window.removeFromCart = removeFromCart;
