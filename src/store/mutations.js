import * as types from './mutation-types'

export default {
  [types.SET_TABBAT_STATUS]: (state, status) => {
    tabbar.tabbar = status
  }
}
