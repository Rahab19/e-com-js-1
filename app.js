const products = [
	{ id: 1, name: 'Product 1', price: 10, quantity: 5, image: 'images/pillow1.jpg' },
	{ id: 2, name: 'Product 2', price: 20, quantity: 3, image: 'images/pillow2.jpg'},
	{ id: 3, name: 'Product 3', price: 15, quantity: 8, image: 'images/pillow3.jpg' },
	{ id: 4, name: 'Product 4', price: 25, quantity: 2, image: 'images/pillow6.jpg' },
  ];
  
  
  let cart = [];
  
  // Display products
  const productList = document.getElementById('product-list');
  products.forEach(product => {
	const productDiv = document.createElement('div');
	productDiv.classList.add('product');
	productDiv.innerHTML = `
	  <img src="${product.image}" alt="${product.name}">
	  <h3>${product.name}</h3>
	  <p>Price: $${product.price}</p>
	  <p>Available: ${product.quantity}</p>
	  <button onclick="addToCart(${product.id})">Add to Cart</button>
	`;
	productList.appendChild(productDiv);
  });
  
  // Add to cart
  function addToCart(productId) {
	const product = products.find(p => p.id === productId);
	const cartItem = cart.find(item => item.productId === productId);
  
	if (cartItem) {
	  if (cartItem.quantity + 1 <= product.quantity) {
		cartItem.quantity++;
	  } else {
		alert(`Only ${product.quantity} items available in stock.`);
	  }
	} else {
	  if (product.quantity > 0) {
		cart.push({ productId, quantity: 1 });
	  } else {
		alert('Product is out of stock.');
	  }
	}
  
	displayCart();
  }
  
  // Update cart item quantity
  function updateCartItemQuantity(productId, newQuantity) {
	const cartItem = cart.find(item => item.productId === productId);
	const product = products.find(p => p.id === productId);
  
	if (newQuantity <= product.quantity) {
	  cartItem.quantity = newQuantity;
	} else {
	  alert(`Only ${product.quantity} items available in stock.`);
	}
  
	displayCart();
  }
  
  // Remove from cart
  function removeFromCart(productId) {
	cart = cart.filter(item => item.productId !== productId);
	displayCart();
  }
  
  // Display cart
  function displayCart() {
	const cartDiv = document.getElementById('cart');
	cartDiv.innerHTML = '';
  
	let total = 0;
  
	cart.forEach(item => {
	  const product = products.find(p => p.id === item.productId);
	  const cartItemDiv = document.createElement('div');
	  cartItemDiv.classList.add('cart-item');
	  cartItemDiv.innerHTML = `
		<span>${product.name} (${item.quantity})</span>
		<span>$${product.price * item.quantity}</span>
		<input type="number" value="${item.quantity}" min="1" max="${product.quantity}" onchange="updateCartItemQuantity(${product.id}, this.value)">
		<button onclick="removeFromCart(${product.id})">Remove</button>
	  `;
	  cartDiv.appendChild(cartItemDiv);
  
	  total += product.price * item.quantity;
	});
  
	
  
	
	
      }
     