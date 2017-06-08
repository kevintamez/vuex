import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default  new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    user:null,
    auth:false,
    token:'',
    expiration:0
  },
  mutations: {
    SET_USER (state,user) {
      state.user=user;
    },
    GET_USER(user){
      state.user=user;
    },
    SET_TOKEN (state,token) {
      state.token=token;
    },
    SET_EXP (state, expiration) {
      state.expiration=expiration;
    },

    DESTROY_TOKEN(state, value){
      state.token=value;
      state.expiration=value;
    },

    SET_AUTH(state, value){
      state.auth=value;
      // console.log(state.auth);
    },
    DELETE_USER(state, value){
      state.user=value;
      // console.log(state.auth);
    }
  },
  getters:{
    GET_TOKEN(state){
      return state.token;
    },
    IS_AUTHENTICATED(state){
      // if (this.GET_TOKEN) {
      //   return true;
      // }else{
      //   return false;
      // }
    },
  }

});
