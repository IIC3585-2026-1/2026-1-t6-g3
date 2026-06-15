const CATEGORIES = {
  electronica: {
    name: "Electrónica",
    icon: "📱",
    products: {
      auriculares: { name: "Auriculares Pro", icon: "🎧", price: 89, stock: true },
      teclado: { name: "Teclado Mecánico", icon: "⌨️", price: 120, stock: true },
      raton: { name: "Ratón Ergo", icon: "🖱️", price: 45, stock: false },
    },
  },
  hogar: {
    name: "Hogar",
    icon: "🏠",
    products: {
      lampara: { name: "Lámpara LED", icon: "💡", price: 35, stock: true },
      purificador: { name: "Purificador", icon: "🌬️", price: 199, stock: true },
      robot: { name: "Robot Aspirador", icon: "🤖", price: 320, stock: false },
    },
  },
  deportes: {
    name: "Deportes",
    icon: "⚽",
    products: {
      bici: { name: "Bicicleta Urbana", icon: "🚲", price: 450, stock: true },
      pesas: { name: "Set de Pesas", icon: "🏋️", price: 75, stock: true },
      smartband: { name: "Smart Band", icon: "⌚", price: 59, stock: true },
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

function renderProducts() {
  productScroll.querySelectorAll(".catalog-card").forEach((card) => card.remove());

  getVisibleProducts().forEach(([id, product]) => {
    const card = document.createElement("my-card");
    card.className = "catalog-card";
    card.dataset.product = id;
    if (id === selectedProduct) {
      card.setAttribute("active", "");
    }

    card.innerHTML = `
      <div class="catalog-card-inner">
        <span class="catalog-card-icon">${product.icon}</span>
        <span class="catalog-card-name">${product.name}</span>
        <span class="catalog-card-meta">${product.price} € · ${product.stock ? "En stock" : "Agotado"}</span>
      </div>
    `;

    card.addEventListener("click", () => selectProduct(id));
    productScroll.appendChild(card);
  });

  if (!getProduct(currentCategory, selectedProduct)) {
    const first = getVisibleProducts()[0];
    if (first) {
      selectProduct(first[0]);
    }
  }
}

function selectProduct(productId) {
  selectedProduct = productId;
  productScroll.querySelectorAll(".catalog-card").forEach((card) => {
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
  const product = getProduct(currentCategory, selectedProduct);

  maxPrice = Number(priceSlider.getAttribute("value"));
  inStockOnly = stockSwitch.hasAttribute("checked");
  quantity = Number(quantityField.getAttribute("value")) || 1;

  priceDisplay.innerHTML = `${maxPrice}<span>€ máx.</span>`;

  if (!product) {
    breadcrumbProduct.textContent = "Sin resultados";
    summaryText.innerHTML =
      "No hay productos visibles con los filtros actuales. Ajusta el precio o desactiva <strong>solo en stock</strong>.";
    renderProducts();
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
