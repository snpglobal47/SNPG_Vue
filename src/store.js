import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    alert: false,
    eventMessage: ''
  },
  mutations: {
    setAlert(state, value) {
      state.alert = true;
      state.eventMessage = value;
    },
    clearAlert(state) {
      state.alert = false;
      state.eventMessage = '';
    }
  },
  getters:{
    alert: state => {
      return state.alert;
    },
    eventMessage: state => {
      return state.eventMessage;
    }
  }
})
