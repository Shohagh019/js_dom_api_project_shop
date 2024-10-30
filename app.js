let allProducts = [];
let cart = [];
let id_container = [];
// Load product data from API
const loadData = () => {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
            console.log(data); 
            allProducts = data;
            displayPlayers(allProducts.slice(0, 12));
        })
        .catch(error => console.error('Error loading products:', error));
};

const displayPlayers=(products)=>{
    const card_container = document.getElementById('card-container');
    card_container.innerHTML = '';
    products.forEach(product =>{
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-img" />
            <h5 class="product-title">${product.title.slice(0,10)}</h5>
            <h3 class="product-rating">Rating: ${product.rating.rate}</h3> <!-- Truncated -->
            <p class="product-price">Price: $${product.price}</p>
            <button onclick="addToGroup('${product.title.slice(0,10)}',${product.id}, this)">Add to Group</button>
             <button onclick="showDetails(${product.id})" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#productModal">Details</button>
        `;
        card_container.appendChild(div);
    });

};

const addToGroup = (title, id, button) => {
    if (id_container.includes(id)) {
        button.disabled = true;
        button.textContent = 'Already Added';
        alert(`${title} is already in the group!`);
        return;
    }

    if (cart.length >= 11) {
        alert('You can only add up to 11 players to the group.');
        return;
    }

    cart.push(title);
    id_container.push(id);
    
    const total_members = document.getElementById("members");
    total_members.innerText = cart.length;

    const cart_container = document.getElementById("team-container");
    cart_container.innerHTML = '';

    const ul = document.createElement('ul');
    cart.forEach(player => {
        const li = document.createElement('li');
        li.textContent = player;
        ul.appendChild(li);
    });
    cart_container.appendChild(ul);
};

// Search products based on input
const searchProducts = () => {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    console.log('Search input:', searchInput); // Debug: Check input value

    const filteredProducts = allProducts.filter(product =>
        product.title.toLowerCase().includes(searchInput)
    );

    console.log('Filtered Products:', filteredProducts); // Debug: Check filtered results
    displayPlayers(filteredProducts);
    searchInput.innerText="";
};

const showDetails = (id) => {
    const product = allProducts.find(p => p.id === id);
    if (product) {
        document.getElementById('productModalLabel').innerText = product.title;
        document.getElementById('modal-image').src = product.image;
        document.getElementById('modal-description').innerText = product.description;
        document.getElementById('modal-price').innerText = `Price: $${product.price}`;
        document.getElementById('modal-rating').innerText = `Rating: ${product.rating.rate}`;
    }
};
loadData();