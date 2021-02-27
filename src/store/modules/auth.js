import router from '../../router';
import {APIService} from '../../http/APIService';
const apiService = new APIService();

const state = {
  credentials: {},
  authenticated: false
}

const mutations = {
  setAuthentication(state, auth) {
    state.authenticated = auth
  }
}

const actions = {
  login({dispatch, commit}) {
    apiService.authenticateLogin(state.credentials).then((res)=>{
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('isAuthenticates', JSON.stringify(true));
      localStorage.setItem('log_user', JSON.stringify(state.credentials.username));
      commit('setAuthentication', true)
      dispatch('intakes/getIntakes', null, {root:true})
      dispatch('settings/getSettings', null, {root:true})
      router.push("/");
      //router.go(-1);
      //window.location = "/"    
    }).catch(e => {
      localStorage.removeItem('isAuthenticates');
      localStorage.removeItem('log_user');
      localStorage.removeItem('token');
      // router.go(-1);
      this.showMsg = 'error';
    })
  },
  register({commit}) {
    apiService.register(state.credentials).then((res)=>{
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('isAuthenticates', JSON.stringify(true));
      localStorage.setItem('log_user', JSON.stringify(state.credentials.username));
      commit('setAuthentication', true)
      router.push("/");
      //router.go(-1);
      //window.location = "/"
    })
  },
  logout({commit}) {
    localStorage.removeItem('isAuthenticates');
    localStorage.removeItem('log_user');
    localStorage.removeItem('token');
    commit('setAuthentication', false)
    // router.push('/');
    window.location = "/auth"
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}