// Grab form and order summary elements
const form = document.getElementById('checkoutForm');
const subtotalEl = document.getElementById('subtotal');
const taxEl = document.getElementById('tax');
const shippingEl = document.getElementById('shipping');
const totalEl = document.getElementById('total');

// Calculate order total dynamically
function updateTotal() {
    const subtotal = parseFloat(subtotalEl.textContent);
    const tax = parseFloat(taxEl.textContent);
    const shipping = parseFloat(shippingEl.textContent);
    totalEl.textContent = (subtotal + tax + shipping).toFixed(2);
}

// Initial calculation
updateTotal();

// Form validation
form.addEventListener('submit', function(event) {
    if (!form.checkValidity()) {
        alert('Please fill out all required fields correctly.');
        event.preventDefault(); // Prevent submission if validation fails
    } else {
        alert('Order submitted successfully!');
        // Here you would normally send data to server
    }
});
