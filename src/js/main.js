// src/js/main.js
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { renderListWithTemplate } from "./utils.mjs";

/* =========================
   PAGE DETECTION
   ========================= */
function isProductDetailPage() {
  return document.querySelector("#product-detail");
}

function isProductListPage() {
  return document.querySelector("#product-list");
}

/* =========================
   PRODUCT DETAIL PAGE
   ========================= */
async function loadProductDetail() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id"); // get ?id= from URL

  if (!productId) return;

  const dataSource = new ProductData("tents");
  const product = await dataSource.findProductById(productId);

  const productDetailElement = document.querySelector("#product-detail");

  if (!product) {
    productDetailElement.innerHTML = "<p>Product not found.</p>";
    return;
  }

  productDetailElement.innerHTML = productDetailTemplate(product);

  // Add event listener for Add to Cart button
  const addToCartBtn = document.querySelector("#addToCart");
  addToCartBtn?.addEventListener("click", () => {
    // Here you can implement your cart logic
    console.log(`Added product ${product.id} to cart`);
  });
}

/* =========================
   PRODUCT LIST PAGE
   ========================= */
async function loadProductList() {
  const dataSource = new ProductData("tents");
  const products = await dataSource.getData();

  const listElement = document.querySelector("#product-list");

  if (!listElement) return;

  // Use utility function to render list items
  renderListWithTemplate(products, listElement, productListItemTemplate);
}

/* =========================
   TEMPLATES
   ========================= */
function productDetailTemplate(product) {
  return `
    <h3>${product.Brand?.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img class="divider" src="${product.Image}" alt="${product.NameWithoutBrand}" />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__description">${product.DescriptionHtmlSimple}</p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>
  `;
}

function productListItemTemplate(product) {
  return `
    <li class="product-card">
      <a href="product_pages/index.html?id=${product.Id}">
        <img src="${product.Image}" alt="${product.NameWithoutBrand}" />
        <h4>${product.NameWithoutBrand}</h4>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
  `;
}


/* =========================
   INIT
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  if (isProductDetailPage()) {
    loadProductDetail();
  }

  if (isProductListPage()) {
    loadProductList();
  }
});
