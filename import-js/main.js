const Vue = require('vue');
const Hello = require('../components/hello.vue');
const partnerList = require('../components/partners/list.vue');
const partnerAdd = require('../components/partners/add.vue');
const userList = require('../components/users/list.vue');
const userAdd = require('../components/users/add.vue');

function initVue() {
    window.$ = $;
    Vue.component('hello', Hello);
    Vue.component('userList', userList);
    Vue.component('userAdd', userAdd);

    Vue.component('partnerList', partnerList);
    Vue.component('partnerAdd', partnerAdd);

    new Vue({
        el: '#app'
    })
}

$(document).ready(function() {
    initVue();
});
