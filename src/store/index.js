import Vuex from 'vuex';
// import Axios from 'axios';

export const store = new Vuex.Store({
  state: {
    count: 0,
    inputStep: '',
    // inputArray: []
  },
  mutations: {
    increment (state) {
      state.count++
    },
    nextSt (state) {
        state.inputStep
        console.log(state.inputStep)
        }
    },
})