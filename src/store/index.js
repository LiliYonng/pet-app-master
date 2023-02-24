import { createStore } from 'vuex'
import user from './user'
import tab from './tab'
import menu from './menu.js'
import permissions from './permissions'
export default createStore({
  state: {
  },
  getters: {},
  mutations: {
  },
  actions: {},
  modules: {
    user,
    tab,
    menu,
    permissions,
  }
})
