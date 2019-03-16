Vue.component("filter-com", {
   data(){
       return {
           searchLine: '',

       }
   },
    template: `         
            <form action="#" id="filter_form" class="filter_form" @submit="$parent.$refs.products.filterCatalog(this.searchLine)">
                    <input type="text" id="filter_field" v-model="searchLine" placeholder="Search">
                    <button type="submit">Фильтр</button>
            </form>
    `
});