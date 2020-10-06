<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        mounted() {
            this.$router.afterEach((to, from) => {
                window.scrollTo(0, 0)
            })
        }
    }
</script>

<style lang="scss">

</style>