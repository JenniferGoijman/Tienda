const drag = (event, productId) => {
    event.dataTransfer.setData("id", productId);
}
const preventDefault = event => event.preventDefault();
const drop = event => {
    const productId = parseInt(event.dataTransfer.getData("id"));
    getProductbyId(productId);
    document.querySelector("#deleteProduct").disabled = false;
    document.querySelector("#modifyProduct").disabled = false;
}

// FORM PRODUCTOS ===>
getProducts();
document.querySelector("#deleteProduct").disabled = true;
document.querySelector("#modifyProduct").disabled = true;

function getProducts() {
    document.querySelector('.divProducts').innerHTML = '';
    axios.get('http://localhost:3000/products')
        .then(res => {
            const products = res.data
            products.forEach(product => {
                injectInHTML(product);
            })
        })
}

function injectInHTML(product) {
    document.querySelector('.divProducts').innerHTML += `
    <div class="card" id=${product.id} draggable ondragstart ="drag(event,${product.id})">
        <img src=${product.image===""?`"img/${product.Category.name.toLowerCase()}.png"`:product.image} class="card-img-top" alt="...">
        <div class="card-body">€${product.price}
        </div>
        <div class="card-body">
            <p class="card-text">${product.name}</p>
        </div>
    </div>`
}

function filterProductsByCategory(categoryId) {
    axios.get(`http://localhost:3000/products/category/${categoryId}`)
        .then(res => {
            const products = res.data
            document.querySelector('.divProducts').innerHTML = '';
            products.forEach(product => {
                injectInHTML(product);
            })
        })
}

function getProductbyId(productId) {
    axios.get(`http://localhost:3000/products/${productId}`)
        .then(res => {
            const product = res.data[0]
            document.querySelector('.productToCRUD').innerHTML = '';
            document.querySelector('.productToCRUD').innerHTML += `
                <img src="img/cerrar.png" alt="" class="btnCloseProduct" onclick="btnCloseProduct()">
                <div class="card" id=${product.id} draggable ondragstart ="drag(event,${product.id})">
                    <img src=${product.image===""?`"img/${product.Category.name.toLowerCase()}.png"`:product.image} 
                        class="card-img-top" alt="...">
                    <div class="card-body">€${product.price}
                    </div>
                    <div class="card-body">
                        <p class="card-text">${product.name}</p>
                    </div>
                </div>`;
            document.querySelector('#nameProduct').value = product.name;
            document.querySelector('#priceProduct').value = product.price;
            document.querySelector('#imageProduct').value = product.image;
            document.querySelector('#categoryProduct').value = product.Category.id;
            document.querySelector('h3').id = product.id;
            document.querySelector("#insertProduct").disabled = true;
        })
}

function insertProduct() {
    const product = {
        name: document.querySelector('#nameProduct').value,
        price: document.querySelector('#priceProduct').value,
        image: document.querySelector('#imageProduct').value,
        CategoryId: document.querySelector('#categoryProduct').value
    }
    axios.post('http://localhost:3000/products/newProduct', product)
        .then(
            res => {
                getProducts();
                clearFormProducts();
            }
        ).catch(
            //err => { console.log(err.response); }
        )
}

function modifyProduct() {
    const product = {
        id: document.querySelector('h3').id,
        name: document.querySelector('#nameProduct').value,
        price: document.querySelector('#priceProduct').value,
        image: document.querySelector('#imageProduct').value,
        CategoryId: document.querySelector('#categoryProduct').value
    }
    axios.put(`http://localhost:3000/products/${product.id}`, product)
        .then(
            res => {
                getProducts();
                btnCloseProduct();
            }
        ).catch(
            //err => { console.log(err.response); }
        )
}

function deleteProduct() {
    productId = document.querySelector('h3').id,
        axios.delete(`http://localhost:3000/products/${productId}`)
        .then(
            res => {
                getProducts();
                btnCloseProduct();
            }
        ).catch(
            //err => { console.log(err.response); }
        )

}

function clearFormProducts() {
    document.querySelector('h3').id = 0;
    document.querySelector('#nameProduct').value = '';
    document.querySelector('#priceProduct').value = '';
    document.querySelector('#imageProduct').value = '';
    document.querySelector('#categoryProduct').selectedIndex = -1;
}

function btnCloseProduct() {
    document.querySelector('.productToCRUD').innerHTML = `
        <h4>Arrastre hasta aquí el producto que quiera modificar o eliminar</h4>`;
    document.querySelector("#insertProduct").disabled = false;
    document.querySelector("#deleteProduct").disabled = true;
    document.querySelector("#modifyProduct").disabled = true;
    clearFormProducts();
}

getCategories();

function getCategories() {
    axios.get('http://localhost:3000/categories')
        .then(res => {
            const categories = res.data
            document.querySelector('.categories').innerHTML = '';
            document.querySelector('#categoryProduct').innerHTML = '';
            document.querySelector('#categoryProductformCategory').innerHTML = '';
            document.querySelector('.categories').innerHTML += `
                <li class="list-group-item" id=0  onclick="getProducts()">Todos</li>`;
            categories.forEach(category => {
                document.querySelector('.categories').innerHTML += `
                <li class="list-group-item" id=${category.id} onclick="filterProductsByCategory(${category.id})">${category.name}</li>`;
                document.querySelector('#categoryProduct').innerHTML += `<option value=${category.id}>${category.name}</option>`;
                document.querySelector('#categoryProductformCategory').innerHTML += `<option value=${category.id}>${category.name}</option>`;

            })
        })
        document.querySelector("#insertCategory").disabled = false;
        document.querySelector("#deleteCategory").disabled = true;
        document.querySelector("#modifyCategory").disabled = true;
        document.querySelector('#nameCategory').value = '';
}
// <=== FORM PRODUCTOS
// FORM CATEGORIAS ===>
function insertCategory() {
    const category = {
        "name": document.querySelector('#nameCategory').value
    }
    axios.post('http://localhost:3000/categories', category)
        .then(
            res => {
                getCategories();
            }
        ).catch(
            //err => { console.log(err.response); }
        )
}

function modifyCategory() {
    categoryId = document.querySelector('#categoryProductformCategory').options[document.querySelector('#categoryProductformCategory').selectedIndex].value;
    const category = {
        "name": document.querySelector('#nameCategory').value
    }
    axios.put(`http://localhost:3000/categories/${categoryId}`, category)
        .then(
            res => {
                getCategories();
            }
        ).catch(
            //err => { console.log(err.response); }
        )
}

function deleteCategory() {
    categoryId = document.querySelector('#categoryProductformCategory').options[document.querySelector('#categoryProductformCategory').selectedIndex].value;
    axios.delete(`http://localhost:3000/categories/${categoryId}`)
        .then(
            res => {
                getCategories();
            }
        ).catch(
            //err => { console.log(err.response); }
        )

}

function changeFormCategory() {
    document.querySelector('#nameCategory').value = document.querySelector('#categoryProductformCategory').options[document.querySelector('#categoryProductformCategory').selectedIndex].innerText;
    document.querySelector("#insertCategory").disabled = true;
    document.querySelector("#deleteCategory").disabled = false;
    document.querySelector("#modifyCategory").disabled = false;
}
// <=== FORM CATEGORIAS
// FORM ORDER ===>
getOrders();

function getOrders() {
    axios.get('http://localhost:3000/orders')
        .then(res => {
            const orders = res.data
            document.querySelector('ul.list-group.pedidos').innerHTML = '';
            orders.forEach(order => {
                let products = ''
                order.Products.forEach(prod => {
                    products += prod.name + ` (${prod.OrderProduct.units}) / `
                })
                document.querySelector('ul.list-group.pedidos').innerHTML += `
                <li class="list-group-item" id=${order.id} onclick=getOrderbyId(${order.id})>${(order.deliveryDate).slice(0,10)} - ${order.status} - ${products}</li>`
            })
        })
    document.querySelector("#insertOrder").disabled = false;
    document.querySelector("#deleteOrder").disabled = true;
    document.querySelector("#modifyOrder").disabled = true;
    document.querySelector("#statusOrder").disabled = true;
}

function getProductsByQuery(event) {
    const busqueda = event.target.value;
    axios.get(`http://localhost:3000/products/byQuery/${busqueda}`)
        .then(res => {
            const products = res.data;
            if (products.length > 0) {
                document.querySelector('.divListProducts').innerHTML = '';
                products.forEach(product => {
                    document.querySelector('.divListProducts').innerHTML += `
                    <a href="#" id=${product.id} class="listProducts" alt="..." onclick="addProduct(${product.id},'${product.name}')">${product.name}</a>`;
                })
            } else {
                document.querySelector('.divListProducts').innerHTML = '';
            }
        })
        .catch(error => console.error(error));
}

function addProduct(productId, productName) {
    document.querySelector('.boxOrders').innerHTML += `
    <div class="prod" id=${productId}>
        <p>${productName}</p>
        <input type="number" min="0" value="0"></input>
        <img src="img/delete.png" alt="" class="btnDeleteProduct" onclick="btnDeleteProduct(${productId})">
    </div>`;
    document.querySelector('#searchProducts').value = '';
    document.querySelector('.divListProducts').innerHTML = '';
}

function getOrderbyId(orderId) {
    axios.get(`http://localhost:3000/orders/${orderId}`)
        .then(res => {
            const order = res.data[0];
            document.querySelector('.formOrder h3').id = orderId;
            document.querySelector('.boxOrders').innerHTML = '';
            for (let j = 0; j < document.querySelector('#statusOrder').options.length; j++) {
                if (document.querySelector('#statusOrder').options[j].value==order.status) {
                    document.querySelector('#statusOrder').selectedIndex = j;
                    break;
                }
            }
            for (let i = 0; i < order.Products.length; i++) {
                document.querySelector('.boxOrders').innerHTML += `
                    <div class="prod" id=${order.Products[i].id}>
                        <p>${order.Products[i].name}</p>
                        <input type="number" min="0" value="${order.Products[i].OrderProduct.units}"></input>
                        <img src="img/delete.png" alt="" class="btnDeleteProduct" onclick="btnDeleteProduct(${order.Products[i].id})">
                    </div>`;
            }
        })
    document.querySelector("#insertOrder").disabled = true;
    document.querySelector("#deleteOrder").disabled = false;
    document.querySelector("#modifyOrder").disabled = false;
    document.querySelector("#statusOrder").disabled = false;
}

function insertOrder() {
    const amountProduct = document.querySelector('div.boxOrders').children.length;
    const arrProducts = []

    for (let i = 0; i < amountProduct; i++) {
        const prod = document.querySelector('div.boxOrders').children[i];
        const product = [
            prod.id, prod.firstElementChild.nextElementSibling.value
        ];
        arrProducts.push(product);
    }
    var today = new Date();
    const order = {
        "deliveryDate": today.toLocaleDateString().split('/').reverse().join('-') + ' ' + today.toLocaleTimeString(),
        "status": "pending",
        "products": arrProducts
    }
    axios.post('http://localhost:3000/orders/', order)
        .then(
            res => {
                getOrders()
            }
        ).catch(
            //err => { console.log(err.response); }
        )
    document.querySelector('div.boxOrders').innerHTML = '';
    document.querySelector('.formOrder h3').id = '';
    document.querySelector('#statusOrder').selectedIndex = 0;
}

function modifyOrder() {
    orderId = document.querySelector('.formOrder h3').id;
    const amountProduct = document.querySelector('div.boxOrders').children.length;
    const arrProducts = [];

    for (let i = 0; i < amountProduct; i++) {
        const prod = document.querySelector('div.boxOrders').children[i];
        const product = [
            prod.id, prod.firstElementChild.nextElementSibling.value
        ]
        arrProducts.push(product)
    }
    const order = {
        "status": document.querySelector('#statusOrder').options[document.querySelector('#statusOrder').selectedIndex].value,
        "products": arrProducts
    }
    axios.put(`http://localhost:3000/orders/${orderId}`, order)
        .then(
            res => {
                getOrders()
            }

        ).catch(
            //err => { console.log(err.response); }
        )
    document.querySelector('div.boxOrders').innerHTML = '';
    document.querySelector('.formOrder h3').id = '';
    document.querySelector('#statusOrder').selectedIndex = 0;
}

function deleteOrder() {
    orderId = document.querySelector('.formOrder h3').id;
    axios.delete(`http://localhost:3000/orders/${orderId}`)
        .then(
            //res => { console.log(res.data.message); }
        ).catch(
            //err => { console.log(err.response); }
        )
    document.querySelector('div.boxOrders').innerHTML = '';
    document.querySelector('.formOrder h3').id = '';
    document.querySelector('#statusOrder').selectedIndex = 0;
}

function btnDeleteProduct(productId) {
    const amountProduct = document.querySelector('div.boxOrders').children.length;
    for (let i = 0; i < amountProduct; i++) {
        const product = document.querySelector('div.boxOrders').children[i];
        if (product.id == productId) {
            product.remove();
            break;
        }
    }
}