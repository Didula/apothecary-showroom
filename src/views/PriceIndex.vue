<template>
    <v-main>
        <template v-if="productTables.length > 0">
            <v-container>
                <v-simple-table fixed-header height="80vh">
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-left">Number of units</th>
                            <th class="text-left">Penguin ears</th>
                            <th class="text-left">Horse shoes</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="tableRow in combinedTable" :key="tableRow.numberOfUnits">
                            <td>{{ tableRow.numberOfUnits }}</td>
                            <td>{{ tableRow.PEN_EARS_price | toCurrency}}</td>
                            <td>{{ tableRow.HORSE_SHOE_price | toCurrency}}</td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-container>
        </template>
    </v-main>

</template>

<script>
    import axiosInstance from "../axios-config";

    export default {
        name: "PriceIndex",
        data: () => {
            return {
                products: [],
                productTables: []
            }
        },
        methods: {
            fetchProducts() {
                axiosInstance.get('/products')
                    .then(response => {
                        console.log('fetched products');
                        this.products = (response.data);
                        this.$store.commit('storeProducts', this.products);
                    })
                    .then(() => {
                        this.fetchProductTables();
                    })
            },
            fetchProductTable(productCode, tableSize) {
                axiosInstance.get('/products/' + productCode + '/table', {
                    params: {
                        units: tableSize
                    }
                }).then(response => {
                    console.log('fetched table for ' + productCode)
                    this.productTables.push(response.data);
                })
            },
            fetchProductTables() {
                this.products.forEach(product => {
                    this.fetchProductTable(product.code, 50)
                });
            }
        },
        computed: {
            combinedTable: function () {
                let combinedTable = [];
                let maximumRows = 0;
                this.productTables.forEach(table => {
                    if(table.tableRowList.length > maximumRows){
                        maximumRows = table.tableRowList.length;
                    }
                })
                for(let i=1; i <= maximumRows; i++){
                    combinedTable.push({
                        numberOfUnits: i
                    });
                }
                this.productTables.forEach(table => {
                    let priceFieldKey = table.code + '_' + 'price';
                    table.tableRowList.forEach(row => {
                        combinedTable = combinedTable.map(combinedRow =>
                            combinedRow.numberOfUnits === row.numberOfUnits
                            ? {...combinedRow, [priceFieldKey]: row.price}
                            : combinedRow
                        );
                    })
                })
                return combinedTable;
            }
        },
        beforeMount() {
            this.fetchProducts()
        }
    }
</script>

<style scoped>

</style>