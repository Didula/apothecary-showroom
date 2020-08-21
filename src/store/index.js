import Vue from 'vue'
import Vuex from 'vuex'
import axiosInstance from '../axios-config';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: {
      productList: ''
    },
    isSpinnerShow: false
  },
  mutations: {
    storeProducts(state, products){
      state.products = products
    }
  },
  actions: {
    fetchProducts({commit}){
      axiosInstance.get('/products')
          .then(response => {
            console.log(response);
            // dispatch('storeProducts',response.data)
            commit('storeProducts',response.data);
          })
          .catch(error => {
            console.log(error);
          });
    }
  },
  modules: {
  },
  getters: {
    products(state){
      return state.products
    }
  }
})
