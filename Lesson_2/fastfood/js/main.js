class createHamburger {
    constructor (checkedComponents){
        this.size = checkedComponents.size;
        this.filling = checkedComponents.filling;
        this.extra = checkedComponents.extra;
        this._createHamburgerMenu();
    }

    _createHamburgerMenu(){
        const humburgerMenu = {
            size: [
                ["big", 100, 40],
                ["small", 50, 20]
            ],
            filling:[
                ["cheese", 10, 20],
                ["salad", 20, 5],
                ["potato", 15, 10]
            ],
            extra:[
                ["flavoring", 15, 0],
                ["mayo", 20, 5]
            ]
        }
    }

    createMenuElement(){
        let size = document.querySelector("#size");
        let filling = document.querySelector("#filling");
        let extra = document.querySelector("#extra");
        
        // for (let i = 0; i <  ) {}
    }
}