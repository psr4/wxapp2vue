import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import state from './state'

import createLogger from 'vuex/dist/logger'
const debug = false
Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state,
  plugins: debug ? [createLogger()] : []
})