import { renderListWithTemplate } from "./utils.mjs";

export default class ProductList {
  constructor(category, dataSource, element) {
    this.category = category;
    this.dataSource = dataSource;
    this.element = element;
  }

  async init() {
    const products = await this.dataSource.getData();
    this.render(products);
  }

  render(products) {
    this.element.innerHTML = products
      .map(
        (p) => `
        <li class="product-card">
          <a href="product_pages/index.html?id=${p.Id}">
            <img src="${p.Image}" alt="${p.NameWithoutBrand}" />
            <h3 class="card__brand">${p.Brand?.Name}</h3>
            <h2 class="card__name">${p.NameWithoutBrand}</h2>
            <p class="product-card__price">$${p.ListPrice}</p>
          </a>
        </li>
      `
      )
      .join("");
  }
}
