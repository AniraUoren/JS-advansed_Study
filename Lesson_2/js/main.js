//константы
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        isShowCart: true,
        isShowFB: false,
        catalogUrl: '/catalogData.json',
        products: [],
        filteredProducts: [],
        imgCatalog: 'https://placehold.it/200x150',
        cart: [],
        searchLine: ''
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product){
            this.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if (data.result === 1){
                    if(this.cart.indexOf(product) < 0){
                        product.quantity = 1;
                        this.cart.push(product);
                    } else {
                        this.cart[this.cart.indexOf(product)].quantity++;
                    }

                    console.log(product.id_product);
                    console.log(this.cart)

                } else {
                    alert("Error. Try later.")
                }
            });
        },
        isCartEmpty(){
            if (this.cart.length <= 0){
                return true;
            } else {
                return false;
            }
        },
        filterCatalog(){
            const regexp = new RegExp(this.searchLine, "i");
            for (let product of this.products) {
               //придумать как добавить класс no-display
            }
            console.log(this.searchLine);
        }
    },
    mounted(){
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                }
            })
    }
});

// //общий класс List
// class List{
//     constructor(container, url, switcher = switchObject){
//         this.container = container;
//         this.url = url;
//         this.switcher = switcher;
//         this.receivedElements = []; //то, что получили с сервера
//         this.allProducts = []; // конечные имеющиеся элементы
//         this.filteredProducts = []; // отфильтрованные элементы
//         this._init();
//     }
//
//     getJSON(url){
//         return fetch(url ? url : `${API + this.url}`)
//             .then(result => result.json())
//             .catch(error => {
//                 console.log(error);
//             })
//     }
//
//     handleData(data){
//         this.receivedElements = [...data];
//         this.render();
//     }
//
//     calcSum(){
//         return this.allProducts.reduce((accum, item) => accum += item.price, 0);
//     }
//
//     render(){
//         for(let product of this.receivedElements){
//             const productObj = new this.switcher[this.constructor.name](product);
//             this.allProducts.push(productObj);
//             document.querySelector(this.container).insertAdjacentHTML("beforeend", productObj.render());
//         }
//     }
//
//     //где поиск? туть^^
//     filter(value){
//         const regexp = new RegExp(value, "i");
//         this.filteredProducts = this.allProducts.filter(product => regexp.test(product.product_name));
//         //debug start
//         console.log(value, regexp);
//         console.log(this.filteredProducts);
//         //debug end
//
//         this.allProducts.forEach(element =>{
//             const block = document.querySelector(`.product-item[id="${element.id_product}"]`);
//
//             console.log(element);
//             console.log(block);
//
//             if (!this.filteredProducts.includes(element)){
//                 block.classList.add("no-display");
//             }else {
//                 block.classList.remove("no-display");
//             }
//         })
//     }
//
//     _init(){
//         return false
//     }
// }
//
// //общий класс Item
// class Item {
//     constructor(product){
//         this.product_name = product.product_name;
//         this.price = +product.price;
//         this.id_product = product.id_product;
//         this.img = "#";
//         this.render();
//     }
//
//     render(){
//         return `<div class="product-item" id="${this.id_product}">
//                 <img src="${this.img}" alt="${this.product_name}">
//                 <h3>${this.product_name}</h3>
//                 <p>${this.price}</p>
//                 <button class="buy-btn"
//                 data-id = "${this.id_product}"
//                 data-name = "${this.product_name}"
//                 data-price = "${this.price}">Купить</button>
//                 </div>`
//     }
// }
//
// //класс элемента Product, наследуемый от Item
// class ProductItem extends Item{}
//
// //класс каталога, наследуемый от List
// class ProductList extends List{
//     constructor(cart, container = ".products", url = "/catalogData.json"){
//         super(container, url);
//         this.cart = cart;
//         this.getJSON()
//             .then(data => {
//                 this.handleData(data);
//             });
//     }
//
//     _init(){
//         document.querySelector(this.container).addEventListener("click", evt => {
//             if(evt.target.classList.contains("buy-btn")){
//                 this.cart.addProduct(evt.target);
//             }
//         });
//
//         document.getElementById("filter_form").addEventListener("submit", evt => {
//             evt.preventDefault();
//             this.filter(document.getElementById("filter_field").value)
//         })
//     }
//
//
// }
//
// //класс элемента Cart, наследуемый от Item
// class CartItem extends Item{
//     constructor(element){
//         super (element);
//         this.quantity = element.quantity;
//     }
//
//     render(){
//         return `<div class="cart_element" data-id="${this.id_product}">
//                 <img src="${this.img}" alt="${this.product_name}">
//                 <h3>${this.product_name}</h3>
//                 <p class="cart_element_price">${this.price}</p>
//                 <div class="cart_element_quantity-block">
//                     <button class="btn-minus">-</button>
//                     <p class="cart_element_quantity">1</p>
//                     <button class="btn-plus">+</button>
//                 </div>
//                 <button class="del-btn">X</button>
//             </div>`
//     }
// }
//
// //класс корзины, наследуемый от List
// class Cart extends List{
//     constructor(container = ".cart", url = "/getBasket.json"){
//         super(container, url);
//         this.getJSON()
//             .then(data => {
//                 this.handleData(data.contents);
//             })
//     }
//
//     addProduct(element){
//         this.getJSON(`${API}/addToBasket.json`)
//             .then(data => {
//                 if (data.result === 1){
//                     let productID = +element.dataset["id"];
//                     let find = this.allProducts.find(product => productID === product.id_product);
//
//                     if (find){
//                         find.quantity++;
//                         this._updateCart(find);
//                     } else{
//                         let product = {
//                             id_product: productID,
//                             price: +element.dataset["price"],
//                             product_name: element.dataset["name"],
//                             quantity: 1
//                         };
//
//                         this.receivedElements = [product];
//                         this.render();
//                     }
//                 } else {
//                     alert("Error. Try later.")
//                 }
//             })
//     }
//
//     removeProduct(element){
//         this.getJSON(`${API}/deleteFromBasket.json`)
//             .then(data => {
//                 if(data.result === 1){
//                     let productId = + element.parentNode.dataset['id'];
//                     let find = this.allProducts.find(product => product.id_product === productId);
//
//                     if(find.quantity > 1){
//                         find.quantity--;
//                         this._updateCart(find);
//                     } else {
//                         this.allProducts.splice(this.allProducts.indexOf(find), 1);
//                         document.querySelector(`.cart_element[data-id="${productId}"]`).remove();
//                     }
//                 } else {
//                     alert('Error');
//                 }
//             })
//     }
//
//     _updateCart(product){
//         let block = document.querySelector(`.cart_element[data-id="${product.id_product}"]`);
//         block.querySelector('.cart_element_quantity').textContent = `${product.quantity}`;
//         block.querySelector('.cart_element_price').textContent = `${product.quantity*product.price}`;
//     }
//
//     _init(){
//         document.querySelector('.btn-cart').addEventListener('click', () => {
//             document.querySelector(this.container).classList.toggle('no-display');
//         });
//         document.querySelector(this.container).addEventListener('click', e => {
//             if(e.target.classList.contains('del-btn')){
//                 this.removeProduct(e.target);
//             }
//         })
//     }
// }
//
// //класс для формы обратной связи
// class Feedback{
//     constructor(container = ".modal_auto"){
//         this.container = container;
//         this._closeFeedback();
//         this._openFeedback();
//         this._formValidation();
//     }
//
//     _openFeedback(){
//         let buttonToOpenFeedback = document.getElementById("btn-feedback");
//         let shadowBlock = document.querySelector(".shadow");
//
//         buttonToOpenFeedback.addEventListener("click", event => {
//             shadowBlock.classList.remove("no-display");
//             document.querySelector(this.container).classList.remove("no-display");
//         })
//     }
//
//     _closeFeedback(){
//         let closeButton = document.querySelector(this.container).querySelector(".close_modal");
//         let shadowBlock = document.querySelector(".shadow");
//
//         document.querySelector(this.container).addEventListener("click", event => {
//             if (event.target === closeButton){
//                 document.querySelector(this.container).classList.add("no-display");
//                 shadowBlock.classList.add("no-display");
//             }
//         })
//     }
//
//     _validationName(string){
//         let regexpName = /(^[a-z'-]+ [a-z'-]+$)|(^[а-яё'-]+ [а-яё'-]+$)/ig;
//
//         return regexpName.test(string);
//     }
//
//     _validationTelephone(string){
//         let regexpTel = /^[0-9-+\(\)]+$/g;
//
//         return regexpTel.test(string);
//     }
//
//     _validationEmail(string){
//         let regexpEmail = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/;
//
//         return regexpEmail.test(string);
//     }
//
//     _formValidation(container = "modal_auto_form"){
//         let formBlock = document.getElementById(container);
//
//         formBlock.addEventListener("submit", evt => {
//             evt.preventDefault();
//
//             if (this._validationName(formBlock.querySelector("input[type='text']").value)){
//                 formBlock.querySelector("input[type='text']").classList.remove("red_border");
//                 formBlock.querySelector("input[type='text']").classList.add("green_border");
//             } else {
//                 formBlock.querySelector("input[type='text']").classList.add("red_border");
//             }
//             if (this._validationTelephone(formBlock.querySelector("input[type='tel']").value)){
//                 formBlock.querySelector("input[type='tel']").classList.remove("red_border");
//                 formBlock.querySelector("input[type='tel']").classList.add("green_border");
//             } else {
//                 formBlock.querySelector("input[type='tel']").classList.add("red_border");
//             }
//             if (this._validationEmail(formBlock.querySelector("input[type='email']").value)){
//                 formBlock.querySelector("input[type='email']").classList.remove("red_border");
//                 formBlock.querySelector("input[type='email']").classList.add("green_border");
//             } else {
//                 formBlock.querySelector("input[type='email']").classList.add("red_border");
//             }
//
//         })
//
//         formBlock.addEventListener("click", evt => {
//             let canselButton = formBlock.querySelector('button [type="reset"]');
//
//             if (evt.target === canselButton)
//                 formBlock.querySelector("input[type='text']").classList.remove("red_border");
//                 formBlock.querySelector("input[type='text']").classList.remove("green_border");
//                 formBlock.querySelector("input[type='tel']").classList.remove("red_border");
//                 formBlock.querySelector("input[type='tel']").classList.remove("green_border");
//                 formBlock.querySelector("input[type='email']").classList.remove("red_border");
//                 formBlock.querySelector("input[type='email']").classList.remove("green_border");
//         })
//     }
// }
//
// const switchObject = {
//     ProductList: ProductItem,
//     Cart: CartItem
// };
//
// let cart = new Cart();
// let products = new ProductList(cart);
// let modal = new Feedback();