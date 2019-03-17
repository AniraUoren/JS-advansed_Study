Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            imgCatalog: 'https://placehold.it/200x150',
            filteredProducts: [],
        };
    },
    template: `
        <div class="products">
            <product-item v-for="product of filteredProducts" :key="product.id_product" :product="product" :imgCatalog="imgCatalog"></product-item>
        </div>
    `,
    methods:{
        filterCatalog(searchLine){
            const regexp = new RegExp(searchLine, "i");
            this.filteredProducts = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filteredProducts.push(el);
                }
            });
        this.$parent.getJson(`getProducts.json`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filteredProducts.push(el);
                }
            });
    }
});

Vue.component("product-item", {
   props: ["product", "imgCatalog"],
   template: `
    <div class="product-item">
                <img :src="imgCatalog" alt="Some img">
                    <div class="desc">
                        <h3>{{product.product_name}}</h3>
                        <p>{{product.price}} $</p>
                        <button class="buy-btn" @click="$parent.$parent.$refs.cart.addProduct(product)">Купить</button>
                    </div>
            </div>
   `
});