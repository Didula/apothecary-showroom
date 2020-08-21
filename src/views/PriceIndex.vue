<template>
    <v-main>
        <h1 v-if="productList">Price table goes here</h1>
    </v-main>

</template>

<script>
    export default {
        name: "PriceIndex",

        computed: {
            productList(){
                return !this.$store.getters.products ? false : !this.$store.getters.products.productList;
            }
        }
    }
</script>

<style scoped>

</style>