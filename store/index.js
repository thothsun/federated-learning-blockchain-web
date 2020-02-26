export const state = () => ({
  powerList: []
})
import Vue from 'vue';

export const mutations = {

  add(state, data) {
    state.powerList.push({
      id: data.id,
      power: data.power
    })
  },
  remove(state, data) {
    state.powerList.splice(state.powerList.findIndex((item) => item.id === data.id), 1)
  },
  update(state, data) {
    Vue.set(state.powerList.find((item) => item.id === data.id), 'power', data.power)
  }
}
