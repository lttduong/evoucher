<style>
.red {
    color: #f00;
}
</style>

<template>
    <h1 class="red">{{ msg }}</h1>
</template>

<script>
export default {
    props: ['name'],
    data() {
        return {
            msg: `Hello world!`
        }
    },
    mounted() {
        this.msg = `Hello ${this.name}!`
    }
}
</script>