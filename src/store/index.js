import Vue from 'vue'
import Vuex from 'vuex'
import intakes from './modules/intakes'
import settings from './modules/settings'
import auth from './modules/auth'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    intakes,
    settings,
    auth
  }
})