// src/js/ProductData.mjs
function convertToJson(res) {
  if (res.ok) return res.json();
  else throw new Error("Bad Response: " + res.status);
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`; // relative to main.js
  }

  async getData() {
    try {
      const res = await fetch(this.path);
      const data = await convertToJson(res);
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

  async findProductById(id) {
    const products = await this.getData();
    return products.find((p) => p.Id === id);
  }
}
