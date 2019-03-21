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
    mounted(){
        this.$parent.getJson(`/api/cart`)
            .then(data =>{
                for(let el of data.contents){
                    this.cart.push(el);
                }
            })
    },
    methods: {
        addProduct(product) {
            let find = this.cart.find(el => el.id_product === product.id_product);
            if(find){
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result === 1){
                            find.quantity++;
                        }
                    })
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if(data.result === 1){
                            this.cart.push(prod);
                        }
                    })
            }
        },
        removeProduct(product){
            // console.log(product)
            let find = this.cart.find(el => el.id_product === product.id_product);
            this.$parent.deleteJson(`/api/cart/${find.id_product}`, product)
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