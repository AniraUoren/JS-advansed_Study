Vue.component("feedback",{
    data() {
        return {
            isShowFB: false,
        }
    },
    template:`
        <div>
            <button class="btn-login" type="button" id="btn-feedback" @click="isShowFB = !isShowFB">Обратиться</button>
            <div id="modal_auto" class="modal_auto" v-show="isShowFB">
                <h3>Обратная связь</h3>
                <button type="button" class="close_modal" @click="isShowFB = !isShowFB">Закрыть</button>
                <form action="#" id="modal_auto_form">
                    <input type="text" placeholder="Введите ФИО" id="modal_auto_form_name">
                    <input type="tel" placeholder="Введите номер телефона">
                    <input type="email" name="modal_auto_form" placeholder="Введите EMAIL">
                    <textarea name="modal_auto_form" cols="30" rows="10" placeholder="Введите комментарий (не обязательно)"></textarea>
                    <div class="modal_auto_flex">
                        <button type="reset">Очистить</button>
                        <button type="submit">Готово</button>
                    </div>
                </form>
            </div>
        </div>
    `,
});