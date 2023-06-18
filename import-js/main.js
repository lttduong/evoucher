const Vue = require('vue');
const Hello = require('../components/hello.vue');
const userList = require('../components/users/list.vue');
const userAdd = require('../components/users/add.vue');
const signIn = require('../components/signin.vue');
const signUp = require('../components/signup.vue');


function initVue() {
    window.$ = $;
    Vue.component('hello', Hello);
    Vue.component('userList', userList);
    Vue.component('userAdd', userAdd);
    Vue.component('signIn', signIn);
    Vue.component('signUp', signUp);

    new Vue({
        el: '#app'
    })
}

$(document).ready(function() {
    initVue();
});
