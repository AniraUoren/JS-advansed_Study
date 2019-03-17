Vue.component("cart", {
    data() {
        return {
            cartURL: "/addToBasket.json",
            isShowCart: true,
            cart: [],
            imgCatalog: 'https://placehold.it/200x150',
        }
    },
    template:
        `
        <div>
            <button class="btn-cart" type="button" id="btn-cart" @click="isShowCart = !isShowCart">Корзина</button>
            <div id="cart" class="cart" v-show="!isShowCart">
                <p v-if="!cart.length">Корзина пуста</p>
                <cart-element v-for="element of cart" :key="element.id_product" :element="element" :imgCatalog="imgCatalog" @removeProduct="removeProduct" @decreaseProductQuantity="decreaseProductQuantity" @increaseProductQuantity="increaseProductQuantity"></cart-element>
            </div>
        </div>
        `,
    methods: {
        addProduct(product) {
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result === 1){
                        let find = this.cart.find(el => el.id_product === product.id_product);
                        if(find){
                            find.quantity++;
                        } else {
                            let prod = Object.assign({quantity: 1}, product);
                            this.cart.push(prod)
                        }
                    } else {
                        alert('Error add');
                    }
                });
        },
        removeProduct(product){
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data =>{
                    if (data.result === 1){
                        this.cart.splice(this.cart.indexOf(product), 1);
                    } else {
                        alert("Error delete");
                    }
                });
        },
        decreaseProductQuantity(element){
            if (element.quantity > 1){
                element.quantity--;
            }else {
                this.removeProduct(element);
            }

        },
        increaseProductQuantity(element){
            element.quantity++;
        },
    },
});

Vue.component("cart-element", {
    props: ["element", "imgCatalog"],
    template: `
        <div class="cart_element">
                    <img :src="imgCatalog" :alt="element.product_name">
                    <h3>{{ element.product_name }}</h3>
                    <p class="cart_element_price">{{ element.price }}</p>
                    <div class="cart_element_quantity-block">
                        <button class="btn-minus" @click = "$emit('decreaseProductQuantity', element)">-</button>
                        <p class="cart_element_quantity">{{ element.quantity }}</p>
                        <button class="btn-plus" @click = "$emit('increaseProductQuantity', element)">+</button>
                    </div>
                    <button class="del-btn" @click="$emit('removeProduct', element)">X</button>
        </div>
       `,
});