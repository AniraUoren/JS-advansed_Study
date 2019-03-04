class createHamburger {
    constructor(checkedComponents) {
        this.size = checkedComponents.size;
        this.filling = checkedComponents.filling;
        this.topping = checkedComponents.topping;
        this.humburgerMenu = [];
        this._createHamburgerMenu();
        this._renderBlock();
        this._startEvent();
    }

    _createHamburgerMenu() {
        this.humburgerMenu = [
            {id: "size", description: "big", price: 100, calorie: 40},
            {id: "size", description: "small", price: 50, calorie: 20},
            {id: "filling", description: "cheese", price: 10, calorie: 20},
            {id: "filling", description: "salad", price: 20, calorie: 5},
            {id: "filling", description: "potato", price: 15, calorie: 10},
            {id: "topping", description: "flavoring", price: 15, calorie: 0},
            {id: "topping", description: "mayo", price: 20, calorie: 5},
            {id: "topping", description: "none", price: 0, calorie: 0}
        ];
    }

    _renderBlock(){
        let blockSize = document.querySelector("#size");
        let blockFilling = document.querySelector("#filling");
        let blockTopping = document.querySelector("#topping");

        let element = "";

        for (let element of this.humburgerMenu){
            if (element.id === "size") {
                element = `
                    <div>
                        <p id="description">${element.description}</p>
                        <p>${element.price} рублей</p>
                        <p>${element.calorie} калорий</p>
                        <button id="${element.description}">Выбрать</button>
                    </div>
                `;

                blockSize.insertAdjacentHTML("beforeend", element);

            } else if (element.id === "filling") {
                element = `
                    <div>
                        <p class="no-display">${element.id}</p>
                        <p id="description">${element.description}</p>
                        <p>${element.price} рублей</p>
                        <p>${element.calorie} калорий</p>
                        <button id="${element.description}">Выбрать</button>
                    </div>
                `;

                blockFilling.insertAdjacentHTML("beforeend", element);

            } else if(element.id === "topping" && element.description !== "none"){
                element = `
                    <div>
                        <p class="no-display">${element.id}</p>
                        <p id="description">${element.description}</p>
                        <p>${element.price} рублей</p>
                        <p>${element.calorie} калорий</p>
                        <button id="${element.description}">Выбрать</button>
                    </div>
                `;

                blockTopping.insertAdjacentHTML("beforeend", element);

            }
        }
    }

    _startEvent(){

        let event = document.querySelector("main");

        event.addEventListener("click", function (event) {
            let evt;
            console.log(event.target);
            evt = event.target;
            console.log(evt.parentNode);

            // this.createCheckedComponents(evt);

        });
    }

    // createCheckedComponents(checkedElement){
    //     for (let element of this.humburgerMenu){
    //
    //     }
    //
    // }

    checkPrice(){
        let totalPrice = 0;

        for (let element of this.humburgerMenu){
            if(element.description === this.size || element.description === this.filling || element.description === this.topping){
                totalPrice += element.price;
            }
        }

        return totalPrice;
    }

    checkCalorie(){
        let totalCalorie = 0;

        for (let element of this.humburgerMenu){
            if(element.description === this.size || element.description === this.filling || element.description === this.topping){
                totalCalorie += element.calorie;
            }
        }

        return totalCalorie;
    }


}

let checkedComponents = {
    size: "small",
    filling: "potato",
    topping: "none"
};

let start = new createHamburger(checkedComponents);
console.log(start);
console.log(start.checkPrice());
console.log(start.checkCalorie());
