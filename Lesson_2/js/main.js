//константы
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

//общий класс List
class List{
    constructor(container, url, switcher = switchObject){
        this.container = container;
        this.url = url;
        this.switcher = switcher;
        this.receivedElements = []; //то, что получили с сервера
        this.allProducts = []; // конечные имеющиеся элементы
        this.filteredProducts = []; // отфильтрованные элементы
        this._init();
    }

    getJSON(url){
        return fetch(url ? url : `${API + this.url}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    handleData(data){
        this.receivedElements = [...data];
        this.render();
    }

    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }

    render(){
        for(let product of this.receivedElements){
            const productObj = new this.switcher[this.constructor.name](product);
            this.allProducts.push(productObj);
            document.querySelector(this.container).insertAdjacentHTML("beforeend", productObj.render());
        }
    }

    //где поиск? туть^^
    filter(value){
        const regexp = new RegExp(value, "i");
        this.filteredProducts = this.allProducts.filter(product => regexp.test(product.product_name));

        this.allProducts.forEach(element =>{
            const block = document.querySelector(`.product-item[id="${element.id_product}"]`);

            if (!this.filteredProducts.includes(element)){
                block.classList.add("no-display");
            }else {
                block.classList.remove("no-display");
            }
        })
    }

    _init(){
        return false
    }
}

//общий класс Item
class Item {
    constructor(product){
        this.product_name = product.product_name;
        this.price = +product.price;
        this.id_product = product.id_product;
        this.img = "#";
        this.render();
    }

    render(){
        return `<div class="product-item" id="${this.id_product}">
                <img src="${this.img}" alt="${this.product_name}">
                <h3>${this.product_name}</h3>
                <p>${this.price}</p>
                <button class="buy-btn"
                data-id = "${this.id_product}"
                data-name = "${this.product_name}"
                data-price = "${this.price}">Купить</button>
                </div>`
    }
}

//класс элемента Product, наследуемый от Item
class ProductItem extends Item{}

//класс каталога, наследуемый от List
class ProductList extends List{
    constructor(cart, container = ".products", url = "/catalogData.json"){
        super(container, url);
        this.cart = cart;
        this.getJSON()
            .then(data => {
                this.handleData(data);
            });
    }

    _init(){
        document.querySelector(this.container).addEventListener("click", evt => {
            if(evt.target.classList.contains("buy-btn")){
                this.cart.addProduct(evt.target);
            }
        });

        document.getElementById("filter_form").addEventListener("submit", evt => {
            evt.preventDefault();
            this.filter(document.getElementById("filter_field").value)
        })
    }


}

//класс элемента Cart, наследуемый от Item
class CartItem extends Item{
    constructor(element){
        super (element);
        this.quantity = element.quantity;
    }

    render(){
        return `<div class="cart_element" data-id="${this.id_product}">
                <img src="${this.img}" alt="${this.product_name}">
                <h3>${this.product_name}</h3>
                <p class="cart_element_price">${this.price}</p>
                <div class="cart_element_quantity-block">
                    <button class="btn-minus">-</button>
                    <p class="cart_element_quantity">1</p>
                    <button class="btn-plus">+</button>
                </div>
                <button class="del-btn">X</button>
            </div>`
    }
}

//класс корзины, наследуемый от List
class Cart extends List{
    constructor(container = ".cart", url = "/getBasket.json"){
        super(container, url);
        this.getJSON()
            .then(data => {
                this.handleData(data.contents);
            })
    }

    addProduct(element){
        this.getJSON(`${API}/addToBasket.json`)
            .then(data => {
                if (data.result === 1){
                    let productID = +element.dataset["id"];
                    let find = this.allProducts.find(product => productID === product.id_product);

                    if (find){
                        find.quantity++;
                        this._updateCart(find);
                    } else{
                        let product = {
                            id_product: productID,
                            price: +element.dataset["price"],
                            product_name: element.dataset["name"],
                            quantity: 1
                        };

                        this.receivedElements = [product];
                        this.render();
                    }
                } else {
                    alert("Error. Try later.")
                }
            })
    }

    removeProduct(element){
        this.getJSON(`${API}/deleteFromBasket.json`)
            .then(data => {
                if(data.result === 1){
                    let productId = + element.parentNode.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === productId);

                    if(find.quantity > 1){
                        find.quantity--;
                        this._updateCart(find);
                    } else {
                        this.allProducts.splice(this.allProducts.indexOf(find), 1);
                        document.querySelector(`.cart_element[data-id="${productId}"]`).remove();
                    }
                } else {
                    alert('Error');
                }
            })
    }

    _updateCart(product){
        let block = document.querySelector(`.cart_element[data-id="${product.id_product}"]`);
        block.querySelector('.cart_element_quantity').textContent = `${product.quantity}`;
        block.querySelector('.cart_element_price').textContent = `${product.quantity*product.price}`;
    }

    _init(){
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('no-display');
        });
        document.querySelector(this.container).addEventListener('click', e => {
            if(e.target.classList.contains('del-btn')){
                this.removeProduct(e.target);
            }
        })
    }
}

const switchObject = {
    ProductList: ProductItem,
    Cart: CartItem
};

let cart = new Cart();
let products = new ProductList(cart);

