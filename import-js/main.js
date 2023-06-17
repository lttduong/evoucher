const Vue = require('vue');
const Hello = require('../components/hello.vue');
const partnerList = require('../components/partner/list.vue');

function initVue() {
    window.$ = $;
    Vue.component('hello', Hello);
    Vue.component('partnerList', partnerList);

    new Vue({
        el: '#app'
    })
}

$(document).ready(function() {
    initVue();
});
