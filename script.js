document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.cat-btn');
    const products = document.querySelectorAll('.product-card');
    const searchInput = document.getElementById('searchInput');
    const noResults = document.getElementById('noResults');

    let currentCategory = 'all';

    // Функція фільтрації (по категоріях і пошуку)
    function filterProducts() {
        if (!searchInput) return;
        const searchText = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;

        products.forEach(product => {
            const productCategory = product.getAttribute('data-category');
            const productName = product.getAttribute('data-name');

            const matchesCategory = (currentCategory === 'all' || productCategory === currentCategory);
            const matchesSearch = productName ? productName.toLowerCase().includes(searchText) : true;

            if (matchesCategory && matchesSearch) {
                product.classList.remove('hide');
                visibleCount++;
            } else {
                product.classList.add('hide');
            }
        });

        if (noResults) {
            noResults.style.display = (visibleCount === 0) ? 'block' : 'none';
        }
    }

    // Клік по кнопках категорій
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            currentCategory = button.getAttribute('data-category');
            filterProducts();
        });
    });

    // Живий пошук при вводі тексту
    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }

    // ==========================================
    // ЛОГІКА ВІКНА ОПЛАТИ ДЛЯ ВСІХ ІГОР
    // ==========================================
    const paymentModal = document.getElementById('paymentModal');
    const closePaymentModal = document.getElementById('closePaymentModal');
    const paymentForm = document.getElementById('paymentForm');
    const successAnimation = document.getElementById('successAnimation');
    const checkoutGameTitle = document.getElementById('checkoutGameTitle');
    const checkoutGamePrice = document.getElementById('checkoutGamePrice');

    // Клік по кнопці "Купити" на будь-якій картці гри
    products.forEach(card => {
        const buyBtn = card.querySelector('.game-button');
        if (buyBtn) {
            buyBtn.addEventListener('click', () => {
                const name = card.getAttribute('data-name');
                const price = card.getAttribute('data-price') || card.querySelector('span')?.textContent || '₴ 0';

                // Записуємо назву та ціну у вікно оплати
                if (checkoutGameTitle) checkoutGameTitle.textContent = name;
                if (checkoutGamePrice) checkoutGamePrice.textContent = price;

                // Скидаємо стан форми та показуємо її
                if (paymentForm) {
                    paymentForm.reset();
                    paymentForm.style.display = 'flex';
                }
                if (successAnimation) {
                    successAnimation.hidden = true;
                }

                // Відкриваємо вікно
                if (paymentModal) {
                    paymentModal.hidden = false;
                }
            });
        }
    });

    // Закриття вікна хрестиком
    if (closePaymentModal && paymentModal) {
        closePaymentModal.addEventListener('click', () => {
            paymentModal.hidden = true;
        });
    }

    // Закриття вікна при кліку поза його межами
    window.addEventListener('click', (e) => {
        if (paymentModal && e.target === paymentModal) {
            paymentModal.hidden = true;
        }
    });

    // Обробка підтвердження платежу
    if (paymentForm && successAnimation) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Ховаємо поля введення і показуємо анімацію успіху
            paymentForm.style.display = 'none';
            successAnimation.hidden = false;

            // Через 3 секунди автоматично закриваємо вікно
            setTimeout(() => {
                if (paymentModal) {
                    paymentModal.hidden = true;
                }
            }, 3000);
        });
    }
});