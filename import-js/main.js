const Vue = require('vue');
const Hello = require('../components/hello.vue');
const partnerList = require('../components/partners/list.vue');
const partnerAdd = require('../components/partners/add.vue');
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

    Vue.component('partnerList', partnerList);
    Vue.component('partnerAdd', partnerAdd);

    new Vue({
        el: '#app'
    })
}

$(document).ready(function() {
    initVue();
});
