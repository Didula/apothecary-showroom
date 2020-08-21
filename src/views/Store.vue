<template>
    <v-container>
            <app-product-listing
                    v-for="product in products"
                    :product="product"
                    :key="product.code">
            </app-product-listing>
    </v-container>
</template>

<script>
    import ProductListing from "../components/ProductListing";

    export default {
        name: "Store",
        components:{
            appProductListing: ProductListing
        },
        computed: {
            products(){
                return this.$store.getters.products
            }
        }
    }
</script>

<style scoped>

</style>