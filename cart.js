let cart = [];
let totalAmount = 0;

async function fetchProducts() {
    try {
        let response = await fetch("https://fakestoreapi.com/products");
        let products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function displayProducts(products) {
    const cartList = document.getElementById('cart-items');
    cartList.innerHTML = '';
    products.slice(0, 6).forEach(product => {
        cartList.innerHTML += `
            <div class="cart-item">
                <img src="${product.image}" alt="${product.title}">
                <div>
                    <h6>${product.title}</h6>
                    <p id="price-${product.id}">$${product.price.toFixed(2)}</p>
                </div>
                <div class="quantity-controls">
                    <button onclick="updateQuantity('${product.id}', -1)">-</button>
                    <span id="qty-${product.id}">1</span>
                    <button onclick="updateQuantity('${product.id}', 1)">+</button>
                </div>
            </div>`;
        cart.push({ id: product.id, name: product.title, price: product.price, quantity: 1 });
        totalAmount += product.price;
    });
    updateCart();
}

function updateQuantity(id, change) {
    const item = cart.find(i => i.id == id);
    if (item) {
        item.quantity += change;
        if (item.quantity < 1) item.quantity = 1;
        document.getElementById(`qty-${id}`).textContent = item.quantity;
        document.getElementById(`price-${id}`).textContent = `$${(item.price * item.quantity).toFixed(2)}`;
        updateCart();
    }
}

function updateCart() {
    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('total-amount').textContent = total.toFixed(2);
    document.getElementById('cart-count').textContent = cart.length;
    document.getElementById('final-total').textContent = (total + 30).toFixed(2);
}

fetchProducts();