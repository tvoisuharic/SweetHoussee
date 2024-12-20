function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const cart = getCart();
    document.getElementById('cart-count').innerText = cart.length;
}

function addToCart(event) {
    const button = event.target;
    const product = {
        id: button.dataset.id,
        name: button.dataset.name,
        price: Number(button.dataset.price),
        image: button.dataset.image, // Добавляем картинку товара
    };

    const cart = getCart();
    cart.push(product);
    saveCart(cart);
    updateCartCount();
}

function displayCart() {
    const cart = getCart();
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    let total = 0;

    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Корзина пуста</p>';
        totalPrice.innerText = '0';
        return;
    }

    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `
            <div style="display: flex; align-items: center;data-name margin-bottom: 10px; gap: 15px;">
                <img src="${item.image}" alt="${item.name}" style="width: 200px; margin: 20px; height: auto;">
                <div>
                    <p>${item.name} - ${item.price} руб.</p>
                </div>
                <button onclick="removeFromCart(${index})" style="margin-left: auto;">Удалить</button>
            </div>
        `;
    });

    totalPrice.innerText = total;
}

function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    displayCart();
    updateCartCount();
}

function checkout() {
    alert('Заказ оформлен!');
    localStorage.removeItem('cart');
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.add-to-cart')) {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
        updateCartCount();
    } else if (document.getElementById('cart-items')) {
        displayCart();
    }
});

// Получаем элементы DOM
const sortSelect = document.getElementById('sort');
const productList = document.getElementById('product-list');
const productCards = Array.from(productList.querySelectorAll('.product'));

function sortProducts(criteria) {
    const sortedCards = productCards.sort((a, b) => {
        if (criteria === 'price') {
            // Сравнение по цене (преобразуем к числу)
            return a.dataset.price - b.dataset.price;
        } else if (criteria === 'name') {
            // Сравнение по названию
            return a.dataset.name.localeCompare(b.dataset.name);
        }
    });

    // Очищаем список товаров и добавляем отсортированные карточки
    productList.innerHTML = '';
    sortedCards.forEach(card => productList.appendChild(card));
}

// Слушатель на изменение сортировки
sortSelect.addEventListener('change', (e) => {
    sortProducts(e.target.value);
});


sortProducts('price');

document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    alert("Форма успешно отправлена!"); 


    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const cardNumber = document.getElementById('cardNumber').value.trim();
    const cardExpiry = document.getElementById('cardExpiry').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

   
    const phoneRegex = /^\+?\d{10,15}$/; 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    const cardNumberRegex = /^\d{16}$/; 
    const cardExpiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/; 
    const cvvRegex = /^\d{3}$/; 

    let errorMessage = "";
    let valid = true;

    // Проверка полей
    if (firstName === "") errorMessage += "Введите ваше имя.\n";
    if (lastName === "") errorMessage += "Введите вашу фамилию.\n";
    if (!phoneRegex.test(phone)) errorMessage += "Введите корректный номер телефона (10-15 цифр).\n";
    if (!emailRegex.test(email)) errorMessage += "Введите корректный email.\n";
    if (!cardNumberRegex.test(cardNumber)) errorMessage += "Номер карты должен содержать 16 цифр.\n";
    if (!cardExpiryRegex.test(cardExpiry)) errorMessage += "Введите дату окончания карты в формате MM/YY.\n";
    if (!cvvRegex.test(cvv)) errorMessage += "CVV должен содержать 3 цифры.\n";

   
    if (errorMessage !== "") {
        alert("Ошибка заполнения формы:\n" + errorMessage);
        valid = false;
    }

    
    else if (valid) {
        alert("Оплачено");
        
    }
    
    });