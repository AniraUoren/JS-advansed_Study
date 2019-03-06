//создание элемента каталога
class ProductItem {
    constructor(product){
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
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
        this.productsList = []; //то, что получено с сервера
        this.allproducts = []; //массив элементов типа ProductItem
        this._fetchProducts();
    }

    _fetchProducts(){
        this.productsList = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
            {id: 5, title: 'Chair', price: 150},
        ];
    }

    render(){
        for(let product of this.productsList){
            const productObj = new ProductItem(product);
            this.allproducts.push(productObj);
            document.querySelector(this.container).insertAdjacentHTML("beforeend", productObj.render());
        }
    }

    summaryPrice(){
        let summary = 0;

        for (let product of this.productsList){
            summary += product.price;
        }

        console.log(summary);
    }

}

//создание элемента корзины

class cartItem{
    constructor(product){
        this.img = product.img;
        this.title = product.title;
        this.id = products.id;
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
    add(product, quantity){
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
list.render();

list.summaryPrice();

// //tests
//
// const products = [
//     {id: 1, title: 'Notebook', price: 2000},
//     {id: 2, title: 'Mouse', price: 20},
//     {id: 3, title: 'Keyboard', price: 200},
//     {id: 4, title: 'Gamepad', price: 50},
//
// ];
//
// let cartElements = [];
// for(let prod of products){
//     let cartObj = new cartItem(prod);
//     cartObj.render();
//     cartElements.push(cartObj);
// }
//
// console.log(cartElements);
// //tests-end