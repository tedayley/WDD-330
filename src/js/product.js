import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // Get existing cart or create empty array
  let cart = getLocalStorage("so-cart") || [];

  // Check if product already exists in cart
  const existingItem = cart.find((item) => item.Id === product.Id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  // Save updated cart
  setLocalStorage("so-cart", cart);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
