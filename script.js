
const products = [
  { title: "Zari Anarkali", price: 999, category: "Traditional", image: "images/1.webp" },
  { title: "Floral Nightsuit", price: 1399, category: "Fusion", image: "images/2.webp" },
  { title: "Ruffle Dress", price: 1799, category: "Western", image: "images/3.jpg" },
  { title: "Bridal Lehenga", price: 1499, category: "Traditional", image: "images/4.webp" },
  { title: "Pink Kurta Set", price: 1899, category: "Fusion", image: "images/5.webp" },
  { title: "Peach Frock", price: 1099, category: "Western", image: "images/6.jpg" },
  { title: "Banarasi Saree", price: 899, category: "Traditional", image: "images/7.webp" },
  { title: "Fusion Jumpsuit", price: 1299, category: "Fusion", image: "images/8.webp" },
  { title: "Yellow Kurti", price: 1199, category: "Western", image: "images/9.jpg" },
];

const grid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const priceSort = document.getElementById("priceSort");
const cartModal = document.getElementById("cartModal");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderProducts(data) {
  grid.innerHTML = "";
  data.forEach(product => {
    const card = document.createElement("div");
    card.className = "product";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>₹${product.price}</p>
      <button onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
    `;
    grid.appendChild(card);
  });
}

function filterProducts() {
  let search = searchInput.value.toLowerCase();
  let category = categoryFilter.value;
  let sorted = priceSort.value;

  let filtered = products.filter(p =>
    (category === "All" || p.category === category) &&
    p.title.toLowerCase().includes(search)
  );

  if (sorted === "low-high") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sorted === "high-low") {
    filtered.sort((a, b) => b.price - a.price);
  }

  renderProducts(filtered);
}

function addToCart(product) {
  const index = cart.findIndex(item => item.title === product.title);
  if (index > -1) {
    cart[index].qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, i) => {
    total += item.price * item.qty;
    cartItems.innerHTML += `
      <li>
        ${item.title} x${item.qty} - ₹${item.price * item.qty}
        <button onclick="removeItem(${i})">✕</button>
      </li>
    `;
  });

  const count = cart.reduce((acc, item) => acc + item.qty, 0);
  cartCount.textContent = count;
  cartTotal.textContent = total ? `Total: ₹${total}` : "Cart is empty";

  localStorage.setItem("cart", JSON.stringify(cart));
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

document.getElementById("cartBtn").addEventListener("click", () => {
  cartModal.style.display = "flex";
});

function closeCart() {
  cartModal.style.display = "none";
}

// ✅ Checkout redirect
document.getElementById("checkoutBtn").addEventListener("click", () => {
  window.location.href = "checkout.html";
});

// Filters
searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);
priceSort.addEventListener("change", filterProducts);

// Initial render
renderProducts(products);
updateCart();

