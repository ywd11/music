import Vue from 'vue'
import Vuex from 'vuex'
// import request from '@/plugins/axios.js'

Vue.use(Vuex)

function getType(data) {
  const t = Object.prototype.toString.call(data)
  return t.slice(8, -1)
}

const state = {
  // token: sessionStorage.getItem(config.tokenKey) || '',
  playerList:{},
  currentSong: {
	  name: "",
	  ar: [],
	  al: {
		  picUrl: ""
	  }
  }
}

const mutations = {
  SET_STORE: (state, data) => {
    const type = Object.prototype.toString.call(data).slice(8, -1)
    switch (type) {
      case 'Array': {
        data.map(item => {
          if (getType(item.value) === 'Object') {
            Object.assign(state[item.key], item.value)
          } else {
            state[item.key] = item.value
          }
        })
        break
      }
      case 'Object': {
        if (getType(data.value) === 'Object') {
          Object.assign(state[data.key], data.value)
        } else {
          state[data.key] = data.value
        }
      }
    }
  }
}

const actions = {
  SetStore({ commit }, data) {
    commit('SET_STORE', data)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
  // modules: {}
})
