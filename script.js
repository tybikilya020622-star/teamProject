const buttons = document.querySelectorAll('.cat-btn');
const products = document.querySelectorAll('.product-card');
const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');

let currentCategory = 'all';

// Функция фильтрации (по категориям и поиску)
function filterProducts() {
    const searchText = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');
        const productName = product.getAttribute('data-name');

        const matchesCategory = (currentCategory === 'all' || productCategory === currentCategory);
        const matchesSearch = productName.includes(searchText);

        if (matchesCategory && matchesSearch) {
            product.classList.remove('hide');
            visibleCount++;
        } else {
            product.classList.add('hide');
        }
    });

    // Показываем сообщение, если ничего не нашлось
    if (visibleCount === 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
    }
}

// Клик по кнопкам категорий
buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        currentCategory = button.getAttribute('data-category');
        filterProducts();
    });
});

// Живой поиск при вводе текста
searchInput.addEventListener('input', filterProducts);