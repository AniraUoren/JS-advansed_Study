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
            <div class="product-item" v-for="product of products" :key="product.id_product">
                    <img :src="imgCatalog" alt="Some img">
                    <div class="desc">
                        <h3>{{product.product_name}}</h3>
                        <p>{{product.price}} $</p>
                        <button class="buy-btn" @click="$parent.$refs.cart.addProduct(product)">Купить</button>
                    </div>
            </div>
        </div>
    `,
    methods:{
        filterCatalog(searchLine){
            console.log($parent.$refs.products.filterCatalog);
            const regexp = new RegExp(searchLine, "i");
            console.log(searchLine);
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
            })
    }
});