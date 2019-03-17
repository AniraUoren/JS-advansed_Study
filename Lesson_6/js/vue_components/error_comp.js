Vue.component("error",{
    props:["errorShow"],
    template:`
        <div class="error" v-if="errorShow">
                <p><b>Ошибка.</b> Попробуйте позднее.</p>
         </div>
    `,
});