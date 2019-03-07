const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

//создание элемента каталога
class ProductItem {
    constructor(product){
        this.title = product.product_name;
        this.price = +product.price;
        this.id = product.id_product;
        this.img = product.img;
        this.render();
    }

    render(){
        return `<div class="product-item" id="${this.id}">
                <img src="${this.img}" alt="${this.title}">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
                </div>`
    }
}

//создание списка в каталоге

class productList {
    constructor(container = ".products"){
        this.container = container;
        this.goods = []; //то, что получено с сервера
        this.allproducts = []; //массив элементов типа ProductItem
        this.addedToCart = [];
        this._getProducts()
            .then(data => {
                this.goods = [...data];
                this._render();
            });
    }

    _getProducts(){
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    _render(){
        for(let product of this.goods){
            const productObj = new ProductItem(product);
            this.allproducts.push(productObj);
            document.querySelector(this.container).insertAdjacentHTML("beforeend", productObj.render());
        }
    }

    //почему-то не считается теперь
    // summaryPrice(){
    //     // console.log(this.allproducts);
    //     //
    //     // for (let elem of this.allproducts){
    //     //     console.log(elem);
    //     // }
    //
    //     // return this.allproducts.reduce((accum, item) => accum += item.price, 0);
    //
    //     // console.log(summary);
    //
    //     return this.allproducts;
    // }

    pushButtonBuy(){
        const catalogBlock = document.querySelector(".products");

        catalogBlock.addEventListener("click", (event) => {
            let button = event.target;
            let elementBlockID = +button.parentNode.getAttribute("id");
            let elementsOnPage = this.allproducts;


            for (let elem of elementsOnPage){
                if (elem.id === elementBlockID){
                    if(this.addedToCart.indexOf(elem) === -1){
                        this.addedToCart.push(this.allproducts[elementsOnPage.indexOf(elem)]);
                    } else{
                        
                    }
                }
            }


        })
        console.log(this.addedToCart);
    }

}

//создание элемента корзины

class cartItem{
    constructor(product){
        this.img = product.img;
        this.title = product.title;
        this.id = product.id;
        this.quantity = product.quantity;
        this.price = product.price;
    }

    render(){
        return `<div id="${this.id}">
                    <img src="${this.img}" alt="${this.title}" class="cart_img">
                    <p class="cart_p">${this.title}</p>
                    <p class="cart_p">${this.quantity}</p>
                    <p class="cart_p">${this.price*this.quantity}</p>
                    <button type="button" class="cart_button" id="cart_button_delete"><i class="fa fa-plus cart_button_image" aria-hidden="true"></i></button>
                </div>`
    }
}

//создание списка элементов в корзине и работа с ней

class cart{
    constructor(container = ".cart"){
        this.container = container;
        this.addedToCart = [];
    }

    //добавление объекта в addedToCart[] по кнопке Купить

    //нужно поле типа number для указания количества при добавлении товара (quantity)
    add(product, quantity = 1){
        product.quantity = quantity;
        this.addedToCart.push(cartItem(product));
    }

    //редактирование количества
    /*пока что-то точное написать не могу т.к. не в курсе как будет выглядеть корзина и какие элементы управления будут
    * можно добавить реакцию на кнопки + или - рядом с полем количества или добавить поле для ручного ввода кол-ва*/

    //удаление элемента из корзины
    /*получить с помощью всплытия, индекс элемента в массиве я умею получить только через перебор*/
    delete(productInCart){
        for (let i =0; i <this.addedToCart.length; i++){
            if (productInCart.id === addedToCart[i].id){
                addedToCart.splice(i, 1);
            }
        }
    }

    //создание списка элементов в корзине
    render(){
        for(let product of this.addedToCart){
            const productObj = new cartItem(product);
            document.querySelector(this.container).insertAdjacentHTML("beforeend", productObj.render());
        }
    }

}

let list = new productList();
list._render();

// console.log(list.summaryPrice());

// let obj = list.summaryPrice();

let cartButton = document.getElementById("btn-cart");
let cartDiv = document.getElementById("cart");

cartButton.addEventListener("click", () => {
    cartDiv.classList.toggle("no-display");
});
list.pushButtonBuy();

