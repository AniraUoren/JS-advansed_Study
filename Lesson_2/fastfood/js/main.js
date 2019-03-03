class createHamburger {
    constructor(checkedComponents) {
        this.size = checkedComponents.size;
        this.filling = checkedComponents.filling;
        this.topping = checkedComponents.topping;
        this.humburgerMenu = [];
        this.createHamburgerMenu();
    }

    createHamburgerMenu() {
        this.humburgerMenu = [
            {description: "big", price: 100, calorie: 40},
            {description: "small", price: 50, calorie: 20},
            {description: "cheese", price: 10, calorie: 20},
            {description: "salad", price: 20, calorie: 5},
            {description: "potato", price: 15, calorie: 10},
            {description: "flavoring", price: 15, calorie: 0},
            {description: "mayo", price: 20, calorie: 5},
            {description: "none", price: 0, calorie: 0}
        ];
    }

    checkPrice(){
        let totalPrice = 0;
        let totalCalorie = 0;

        for (let element of this.humburgerMenu){
            if(element.description === this.size || element.description === this.filling || element.description === this.topping){
                totalPrice += element.price;
                totalCalorie += element.calorie;
            }
        }

        return [totalPrice, totalCalorie];
    }
}

let checkedComponents = {
    size: "small",
    filling: "potato",
    topping: "none"
};

let test = new createHamburger(checkedComponents);
console.log(test);
console.log(test.checkPrice());