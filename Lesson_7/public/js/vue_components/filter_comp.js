Vue.component("filter-com", {
   data(){
       return {
           searchLine: '',

       }
   },
    template: `         
            <form action="#" id="filter_form" class="filter_form" @submit.prevent="$parent.$refs.products.filterCatalog(searchLine)">
                    <input type="text" id="filter_field" v-model="searchLine" placeholder="Search">
                    <button type="submit">Фильтр</button>
            </form>
    `
});