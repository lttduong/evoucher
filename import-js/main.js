const Vue = require('vue');
const Hello = require('../components/hello.vue');
const userList = require('../components/users/list.vue');
const userAdd = require('../components/users/add.vue');

function initVue() {
    window.$ = $;
    Vue.component('hello', Hello);
    Vue.component('userList', userList);
    Vue.component('userAdd', userAdd);

    new Vue({
        el: '#app'
    })
}

$(document).ready(function() {
    initVue();
});
