const Vue = require('vue');
const Hello = require('../components/hello.vue');

function initVue() {
    window.$ = $;
    Vue.component('hello', Hello);

    new Vue({
        el: '#app'
    })
}

$(document).ready(function() {
    initVue();
});
