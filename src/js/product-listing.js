// src/js/product-listing.js
import { renderListWithTemplate, getParam } from "./utils.mjs";

/* =========================
   Fetch local JSON data
   ========================= */
async function getProductData(category) {
  try {
    const response = await fetch(`/public/Public_Json/${category}.json`);
    if (!response.ok) throw new Error(`Failed to load ${category}.json`);
    const data = await response.json();

    // Ensure it's an array
    if (!Array.isArray(data)) {
      console.error("Fetched data is not an array:", data);
      return [];
    }

    return data;
  } catch (err) {
    console.error("Error fetching JSON:", err);
    return [];
  }
}

/* =========================
   Templates
   ========================= */
function productListItemTemplate(product) {
  return `
    <li class="product-card">
      <a href="product_pages/index.html?id=${product.Id}">
        <img 
          src="${product.Image}" 
          alt="${product.NameWithoutBrand ?? product.Name}" 
        />
        <h4>${product.NameWithoutBrand ?? product.Name}</h4>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
  `;
}

/* =========================
   Main function to load products
   ========================= */
async function loadProductList() {
  const category = getParam("category") || "tents"; // default to tents

  const products = await getProductData(category);
  const listElement = document.querySelector("#product-list");
  if (!listElement) return;

  renderListWithTemplate(products, listElement, productListItemTemplate);

  // Update page title
  const title = document.querySelector("h2");
  if (title) {
    title.textContent = `Top Products: ${category.replace("-", " ")}`;
  }
}

/* =========================
   Init
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  loadProductList();
});
