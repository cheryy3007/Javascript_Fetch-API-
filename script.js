// Элементы DOM
const productContainer = document.getElementById("productContainer");
const cartItems = document.getElementById("cartItems");
const totalPriceElement = document.getElementById("totalPrice");

let cart = []; // Корзина

fetch('https://fakestoreapi.com/products?limit=10')
    .then(res => res.json())
    .then(data => {
        displayProducts(data);
    });

// Функция для отображения продуктов
function displayProducts(products) {
    productContainer.innerHTML = ""; // Очищаем контейнер
    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.description.slice(0,50)}...</p>
            <p class="price">Цена: $${product.price}</p>
            <button onclick="addToCart(${product.id}, \`${product.title}\`, ${product.price})">Купить</button>
        `;
        productContainer.appendChild(card);
    });
}

// Функция для добавления в корзину
function addToCart(id, title, price) {
    cart.push({ id, title, price });

    alert(`"${title}" добавлен в корзину!`);

    updateCart();
}

// Функция для обновления корзины
function updateCart() {
    cartItems.innerHTML = ""; // Очищаем корзину
    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price;
        const listItem = document.createElement("li");
        listItem.textContent = `${item.title} - $${item.price}`;
        cartItems.appendChild(listItem);
    });

    totalPriceElement.textContent = `Общая сумма: $${totalPrice.toFixed(2)}`;
}

