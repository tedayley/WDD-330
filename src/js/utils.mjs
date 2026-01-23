// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localStorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to localStorage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  const el = qs(selector);
  if (!el) return;
  el.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  el.addEventListener("click", callback);
}

// render a list of items using a template function
export function renderListWithTemplate(list, container, templateFunc) {
  if (!Array.isArray(list)) {
    console.error("Expected array but got:", list);
    container.innerHTML = "<p>Error loading products.</p>";
    return;
  }
  container.innerHTML = list.map(templateFunc).join("");
}

// get a query parameter from the URL
export function getParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}
