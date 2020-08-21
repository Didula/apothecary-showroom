<template>
    <v-card class="ma-lg-6 pa-lg-4">
            <v-list-item-content>
                <v-list-item-title class="headline mb-1">{{product.name}}</v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar
                    tile
                    size="80"
                    color="grey"
            ></v-list-item-avatar>
            <v-card-actions>
                <v-col
                        cols="12"
                        md="4">
                    <v-text-field
                            v-model="amount"
                            type="number"
                            min="0"
                            placeholder="Enter amount"
                            v-on:blur="inquirePrice"
                            >
                    </v-text-field>
                </v-col>

                <span></span><h2>{{price | toCurrency}}</h2>
            </v-card-actions>
    </v-card>
</template>

<script>
    import axiosInstance from "../axios-config";
    export default {
        name: "ProductListing",
        data: () => {
          return {
              amount: 0,
              price: 0
          }
        },
        props: ['product'],
        methods: {
            inquirePrice(){
                if(this.amount > 0){
                    axiosInstance.get('/products/' + this.product.code + '/price', {
                        params: {
                            units: this.amount
                        }
                    })
                        .then(response => {
                            this.price = response.data.price;
                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
            }
        }
    }
</script>

<style scoped>

</style>