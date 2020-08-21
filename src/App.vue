<template>
    <v-app>
        <v-app-bar
                app
                color="primary"
                dark>
            <div class="d-flex align-center">
                <h1>Apothecary Store</h1>
            </div>

            <v-spacer></v-spacer>

            <v-btn to="/"
                   text>
                <span class="mr-2">Price Index</span>
            </v-btn>
            <v-btn to="/store"
                   text>
                <span class="mr-2">Store</span>
            </v-btn>
        </v-app-bar>

        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>


    export default {
        name: 'App',
        components: {},
        data: () => ({

        })
    };
</script>
