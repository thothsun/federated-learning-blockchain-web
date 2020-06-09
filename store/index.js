export const state = () => ({
  powerList: []
})
import Vue from 'vue';

function compare(property) {
  return function (a, b) {
    return b[property] - a[property];
  }

}

export const getters = {
  candidates: state => {
    let a = state.powerList.slice(0)
    a.sort(compare('power'))
    let winnerId = 0
    //3个及以下时，选算力最大的那个；3个以上时，从算力最大的前3个中随机选择
    if (a.length < 4) {
      winnerId = a[0].id
    } else {
      let items = a.slice(0, 4)
      winnerId = items[Math.floor(Math.random() * items.length)].id
    }
    return winnerId
  }
}

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
