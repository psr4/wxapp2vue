import * as types from './mutation-types'

export default {
  [types.SET_WEAPP_TABBAR](state,status){
    state.tabbar = status
  }
}