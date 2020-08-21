<template>
    <form>
        <v-card class="ma-lg-6 pa-lg-4">
            <v-list-item-content>
                <v-list-item-title class="headline mb-1">{{product.name}}</v-list-item-title>
                <v-list-item-subtitle>Carton price : {{product.cartonPrice | toCurrency}}</v-list-item-subtitle>
                <p>Buy {{product.discountThreshold}} or more cartons to apply {{(product.cartonSaleDiscount)*100}}%
                    discount</p>
            </v-list-item-content>

            <v-list-item-avatar
                    tile
                    size="80"
                    color="grey">
                <img :src="getImageSource(product.code)"
                     :alt="product.name">
            </v-list-item-avatar>
            <v-card-actions>
                <v-col
                        cols="12"
                        md="4">
                    <v-text-field
                            v-model="amount"
                            type="number"
                            :error-messages="amountErrors"
                            placeholder="Enter amount"
                            v-on:change="inquirePrice"
                            @input="$v.amount.$touch()"
                            @blur="$v.amount.$touch()"
                    >
                    </v-text-field>
                </v-col>

                <span></span>
                <h2>{{price | toCurrency}}</h2>
            </v-card-actions>
        </v-card>
    </form>
</template>

<script>
    import {validationMixin} from 'vuelidate';
    import {minValue, required} from 'vuelidate/lib/validators'
    import axiosInstance from "../axios-config";

    export default {
        name: "ProductListing",
        validations: {
            amount: {required, minValue: minValue(1)}
        },
        mixins: [validationMixin],
        data: () => ({
            amount: 0,
            price: 0,
            amountRules: [
                v => !!v || 'Amount is required',
                v => (v && v > 0) || 'Amount must be a positive number',
            ]
        }),
        props: ['product'],
        methods: {
            getImageSource(fileName) {
                return require('../assets/' + fileName + '.jpg');
            },
            inquirePrice() {
                if (this.amount && this.amount > 0) {
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
                } else {
                    this.price = 0;
                }
            }
        },
        computed: {
            amountErrors() {
                const errors = []
                if (!this.$v.amount.$dirty) return errors
                !this.$v.amount.minValue && errors.push('Amount must be positive')
                !this.$v.amount.required && errors.push('Amount is required.')
                return errors
            }
        }
    }
</script>

<style scoped>

</style>