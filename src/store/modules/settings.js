import router from '../../router';
import {APIService} from '../../http/APIService';
const apiService = new APIService();

const state = {
    settings: [],
}

const mutations = {
    setSettings(state, settings) {
        state.settings = settings
    },
}

const actions = {
    getSettings({commit}) {
      apiService.getSetting().then(response => {
          commit('setSettings', response.data)
        if (localStorage.getItem("isAuthenticates")
          && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
          this.validUserName = JSON.parse(localStorage.getItem("log_user"));
        }
      }).catch(error => {
        if (error.response.status === 401) {
          localStorage.removeItem('isAuthenticates');
          localStorage.removeItem('log_user');
          localStorage.removeItem('token');
        }
      });
    },
    updateSettings({commit}, payload) {
      apiService.updateSettings(payload).then(response => {
        if (response.status === 200) {
          commit('setSettings', payload)
          router.push('/');
        }else{
            this.showMsg = "error";
        }
      }).catch(error => {
        if (error.response.status === 401) {
          router.push("/auth");
        }else if (error.response.status === 400) {
          this.showMsg = "error";
        }
      });
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}