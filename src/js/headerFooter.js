// Get category from URL query string or fallback to "tents"
function getCategoryFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("category") || "tents";
}

async function loadHeaderFooter() {
  try {
    const category = getCategoryFromURL();

    // Load the JSON dynamically based on category
    const response = await fetch(`/Public_Json/${category}.json`);
    if (!response.ok) throw new Error("Product data load failed");

    const products = await response.json();

    // Pick a random product if it's an array, otherwise just use the object
    const product = Array.isArray(products)
      ? products[Math.floor(Math.random() * products.length)]
      : products;

    renderHeader(product, category);
    renderFooter(product, category);
  } catch (err) {
    console.error("Header/Footer error:", err);
  }
}

function renderHeader(product, category) {
  const header = document.querySelector("header");

  const siteName = product?.Brand?.Name || "Sleep Outside";
  const logo = product?.Brand?.LogoSrc || "";
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  header.innerHTML = `
    <div class="header-inner">
      <div class="brand">
        ${logo ? `<img src="${logo}" alt="${siteName} logo">` : ""}
        <div>
          <h1>${siteName}</h1>
          <p class="tagline">Outfit your next adventure</p>
        </div>
      </div>

      <nav>
        <ul>
          <li><a href="../index.html">Home</a></li>
          <li><a href="../product_pages/tents.html">Tents</a></li>
          <li><a href="../product_pages/backpacks.html">Backpacks</a></li>
          <li><a href="../product_pages/hammocks.html">Hammocks</a></li>
          <li><a href="../product_pages/sleepingbags.html">Sleeping Bags</a></li>
          <li class="cart-link">
            <a href="../cart/index.html">Cart</a>
          </li>
        </ul>
      </nav>

      <p class="current-category">Browsing: ${categoryName}</p>
    </div>
  `;
}

function renderFooter(product, category) {
  const footer = document.querySelector("footer");

  if (!product) {
    footer.innerHTML = `<p>© ${new Date().getFullYear()} Sleep Outside</p>`;
    return;
  }

  const productName = product?.NameWithoutBrand || "Featured Outdoor Gear";
  const brand = product?.Brand?.Name || "Sleep Outside";
  const price = product?.FinalPrice ? `$${product.FinalPrice.toFixed(2)}` : "";

  footer.innerHTML = `
    <div class="footer-content">
      <div class="footer-product">
        <strong>Featured Item</strong>
        <p>${productName}</p>
        <p class="price">${brand} ${price}</p>
      </div>

      <div class="footer-meta">
        <p>© ${new Date().getFullYear()} Sleep Outside</p>
        <p id="datetime"></p>
      </div>
    </div>
  `;

  updateDateTime();
  setInterval(updateDateTime, 1000);
}

// Date and Time
function updateDateTime() {
  const dt = document.getElementById("datetime");
  if (dt) dt.textContent = new Date().toLocaleString();
}

// Initialize header/footer
loadHeaderFooter();
