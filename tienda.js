// Esta página reutiliza my-card, my-slider, my-switch y my-horizontal-scroll
// con datos y estilos de tienda online.

const CATEGORIES = {
  electronica: {
    name: "Electrónica",
    icon: "📱",
    products: {
      auriculares: { name: "Auriculares Pro", icon: "🎧", price: 89, stock: true },
      teclado: { name: "Teclado Mecánico", icon: "⌨️", price: 120, stock: true },
      raton: { name: "Ratón Ergo", icon: "🖱️", price: 45, stock: false },
      monitor: { name: "Monitor QHD", icon: "🖥️", price: 299, stock: true },
      webcam: { name: "Webcam 4K", icon: "📹", price: 149, stock: true },
      microfono: { name: "Micrófono USB", icon: "🎙️", price: 99, stock: false },
      tablet: { name: "Tablet 10''", icon: "📲", price: 399, stock: true },
      altavoz: { name: "Altavoz Bluetooth", icon: "🔊", price: 79, stock: true },
    },
  },

  hogar: {
    name: "Hogar",
    icon: "🏠",
    products: {
      lampara: { name: "Lámpara LED", icon: "💡", price: 35, stock: true },
      purificador: { name: "Purificador", icon: "🌬️", price: 199, stock: true },
      robot: { name: "Robot Aspirador", icon: "🤖", price: 320, stock: false },
      cafetera: { name: "Cafetera Espresso", icon: "☕", price: 249, stock: true },
      ventilador: { name: "Ventilador Torre", icon: "🌀", price: 89, stock: true },
      tostadora: { name: "Tostadora Premium", icon: "🍞", price: 69, stock: false },
      aspiradora: { name: "Aspiradora Compacta", icon: "🧹", price: 159, stock: true },
    },
  },

  deportes: {
    name: "Deportes",
    icon: "⚽",
    products: {
      bici: { name: "Bicicleta Urbana", icon: "🚲", price: 450, stock: true },
      pesas: { name: "Set de Pesas", icon: "🏋️", price: 75, stock: true },
      smartband: { name: "Smart Band", icon: "⌚", price: 59, stock: true },
      cinta: { name: "Cinta de Correr", icon: "🏃", price: 499, stock: false },
      balon: { name: "Balón Profesional", icon: "⚽", price: 35, stock: true },
      esterilla: { name: "Esterilla Yoga", icon: "🧘", price: 29, stock: true },
      raqueta: { name: "Raqueta Tenis", icon: "🎾", price: 129, stock: true },
    },
  },

  videojuegos: {
    name: "Videojuegos",
    icon: "🎮",
    products: {
      consola: { name: "Consola Next Gen", icon: "🎮", price: 499, stock: true },
      mando: { name: "Mando Inalámbrico", icon: "🕹️", price: 69, stock: true },
      headset: { name: "Gaming Headset", icon: "🎧", price: 119, stock: false },
      silla: { name: "Silla Gaming", icon: "🪑", price: 279, stock: true },
      tecladoGaming: { name: "Teclado RGB", icon: "⌨️", price: 139, stock: true },
    },
  },

  libros: {
    name: "Libros",
    icon: "📚",
    products: {
      cleanCode: { name: "Clean Code", icon: "📘", price: 39, stock: true },
      ddd: { name: "Domain-Driven Design", icon: "📗", price: 55, stock: true },
      js: { name: "JavaScript Avanzado", icon: "📙", price: 42, stock: false },
      arquitectura: { name: "Arquitectura Software", icon: "📕", price: 48, stock: true },
      patrones: { name: "Patrones de Diseño", icon: "📖", price: 44, stock: true },
    },
  },

  moda: {
    name: "Moda",
    icon: "👕",
    products: {
      camiseta: { name: "Camiseta Premium", icon: "👕", price: 29, stock: true },
      zapatillas: { name: "Zapatillas Urban", icon: "👟", price: 119, stock: true },
      chaqueta: { name: "Chaqueta Casual", icon: "🧥", price: 149, stock: false },
      mochila: { name: "Mochila Travel", icon: "🎒", price: 79, stock: true },
      reloj: { name: "Reloj Deportivo", icon: "⌚", price: 199, stock: true },
    },
  },

  mascotas: {
    name: "Mascotas",
    icon: "🐶",
    products: {
      cama: { name: "Cama Deluxe", icon: "🛏️", price: 89, stock: true },
      collar: { name: "Collar Inteligente", icon: "🦴", price: 59, stock: true },
      transportin: { name: "Transportín", icon: "🐕", price: 129, stock: false },
      comedero: { name: "Comedero Automático", icon: "🍖", price: 149, stock: true },
      juguete: { name: "Juguete Interactivo", icon: "🎾", price: 25, stock: true },
    },
  },

  oficina: {
    name: "Oficina",
    icon: "💼",
    products: {
      escritorio: { name: "Escritorio Ajustable", icon: "🪑", price: 499, stock: true },
      silla: { name: "Silla Ergonómica", icon: "💺", price: 349, stock: true },
      impresora: { name: "Impresora WiFi", icon: "🖨️", price: 199, stock: false },
      docking: { name: "Docking Station", icon: "🔌", price: 179, stock: true },
      monitorOffice: { name: "Monitor 27''", icon: "🖥️", price: 249, stock: true },
    },
  },
};
let currentCategory = "electronica";
let selectedProduct = "auriculares";
let maxPrice = 500;
let inStockOnly = false;
let quantity = 1;

const breadcrumb = document.getElementById("breadcrumb");
const breadcrumbCategory = document.getElementById("breadcrumb-category");
const breadcrumbProduct = document.getElementById("breadcrumb-product");
const pageTitle = document.getElementById("page-title");
const productScroll = document.getElementById("product-scroll");
const categoryNav = document.getElementById("category-nav");
const priceSlider = document.getElementById("price-slider");
const stockSwitch = document.getElementById("stock-switch");
const quantityField = document.getElementById("quantity-field");
const summaryText = document.getElementById("summary-text");
const priceDisplay = document.getElementById("price-display");
const visibleCount = document.getElementById("visible-count");
const stockCount = document.getElementById("stock-count");
const cartMode = document.getElementById("cart-mode");
const checkoutStrip = document.getElementById("checkout-strip");

function getProduct(categoryId, productId) {
  return CATEGORIES[categoryId]?.products[productId];
}

function getVisibleProducts() {
  const category = CATEGORIES[currentCategory];
  return Object.entries(category.products).filter(([, product]) => {
    if (inStockOnly && !product.stock) {
      return false;
    }
    return product.price <= maxPrice;
  });
}

function syncControls() {
  maxPrice = Number(priceSlider.getAttribute("value"));
  inStockOnly = stockSwitch.hasAttribute("checked");
  quantity = Number(quantityField.getAttribute("value")) || 1;
}

function renderProducts() {
  syncControls();
  productScroll.querySelectorAll(".product-card, .catalog-card").forEach((card) => card.remove());

  const visibleProducts = getVisibleProducts();
  const selectedIsVisible = visibleProducts.some(([id]) => id === selectedProduct);

  if (!selectedIsVisible) {
    selectedProduct = visibleProducts[0]?.[0] ?? "";
  }

  visibleProducts.forEach(([id, product]) => {
    const card = document.createElement("my-card");
    card.className = "product-card";
    card.dataset.product = id;
    if (id === selectedProduct) {
      card.setAttribute("active", "");
    }

    const stockClass = product.stock ? "available" : "unavailable";
    const stockLabel = product.stock ? "En stock" : "Agotado";

    card.innerHTML = `
      <div class="product-card-inner">
        <span class="product-card-icon">${product.icon}</span>
        <span class="product-card-name">${product.name}</span>
        <span class="product-price">${product.price} €</span>
        <span class="stock-badge ${stockClass}">${stockLabel}</span>
      </div>
    `;

    card.addEventListener("click", () => selectProduct(id));
    productScroll.appendChild(card);
  });
}

function selectProduct(productId) {
  selectedProduct = productId;
  productScroll.querySelectorAll(".product-card, .catalog-card").forEach((card) => {
    if (card.dataset.product === productId) {
      card.setAttribute("active", "");
    } else {
      card.removeAttribute("active");
    }
  });
  updateSummary();
}

function setActiveCategoryButton() {
  categoryNav.querySelectorAll("button").forEach((btn) => {
    if (btn.dataset.category === currentCategory) {
      btn.setAttribute("active", "");
    } else {
      btn.removeAttribute("active");
    }
  });
}

function buildCategoryNav() {
  Object.entries(CATEGORIES).forEach(([id, category]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.category = id;
    button.textContent = `${category.icon} ${category.name}`;
    button.addEventListener("click", () => navigateCategory(id));
    categoryNav.appendChild(button);
  });
  setActiveCategoryButton();
}

function navigateCategory(categoryId) {
  if (!CATEGORIES[categoryId]) {
    return;
  }

  currentCategory = categoryId;
  const category = CATEGORIES[categoryId];
  const firstProduct = Object.keys(category.products)[0];
  selectedProduct = firstProduct;

  pageTitle.textContent = `Catálogo — ${category.name}`;
  breadcrumbCategory.textContent = category.name;

  renderProducts();
  updateSummary();
  breadcrumb.refresh();
  setActiveCategoryButton();
}

function updateSummary() {
  const category = CATEGORIES[currentCategory];
  syncControls();

  const product = getProduct(currentCategory, selectedProduct);
  const visibleProducts = getVisibleProducts();
  const availableProducts = visibleProducts.filter(([, item]) => item.stock);

  priceDisplay.innerHTML = `${maxPrice}<span>€ máx.</span>`;
  visibleCount.textContent = `${visibleProducts.length} productos visibles`;
  stockCount.textContent = `${availableProducts.length} disponibles`;
  cartMode.textContent = inStockOnly ? "Compra express" : "Explorando ofertas";

  if (!product) {
    breadcrumbProduct.textContent = "Sin resultados";
    summaryText.innerHTML =
      "No hay productos visibles con los filtros actuales. Ajusta el precio o desactiva <strong>solo en stock</strong>.";
    checkoutStrip.textContent = "Carrito pausado hasta encontrar una opcion disponible.";
    return;
  }

  breadcrumbProduct.textContent = product.name;
  const total = product.price * quantity;

  summaryText.innerHTML = `
  Categoría: <strong>${category.name}</strong><br>
  Producto: <strong>${product.icon} ${product.name}</strong><br>
  Precio unitario: <strong>${product.price} €</strong><br>
  Cantidad: <strong>${quantity}</strong><br>
  Total estimado: <strong>${total} €</strong><br>
  Disponibilidad: <strong>${product.stock ? "En stock" : "Agotado"}</strong>
  `;

  checkoutStrip.textContent = product.stock
    ? `Listo para comprar ${quantity} unidad(es) de ${product.name}.`
    : `${product.name} queda visible como referencia, pero no se puede despachar ahora.`;
}

priceSlider.addEventListener("input", () => {
  renderProducts();
  updateSummary();
});

stockSwitch.addEventListener("change", () => {
  renderProducts();
  updateSummary();
});

quantityField.addEventListener("input", updateSummary);

breadcrumb.addEventListener("breadcrumb-navigate", (e) => {
  if (e.detail.room) {
    navigateCategory(e.detail.room);
  }
});

buildCategoryNav();
renderProducts();
updateSummary();
