import Vue from "vue";
import Vuex from "vuex";
import {ProductsModule} from "./Products.js";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState()
  ],
  state: {
    shop: {
      name: "e-store",
    },
    token: null,
    user: null,
    userId: 0,
    admin: false,
    userLoggedIn: false,
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
      if(token) {
        state.userLoggedIn = true
      } else {
        state.userLoggedIn = false
      }
    },
    SET_USER(state, user) {
      state.user = user
      if(user != null){
        state.admin = user.isAdmin
        state.userId = user.id
      } else {
        state.admin = false
        state.userId = 0
      }
    },
  },
  actions: {
    setToken({commit}, token) {
      commit('SET_TOKEN', token)
    },
    setUser({commit}, user) {
      commit('SET_USER', user)
    }
  },
  modules: {
    Products: ProductsModule
  }
});
