import Vue from "vue";
import Vuex from "vuex";
import posts from './posts'
import auth from './auth'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appName: process.env.VUE_APP_TITLE,
    socialLinks:{
      youtube: process.env.VUE_APP_YOUTUBE,
      linkedin: process.env.VUE_APP_LINKEDIN,
      github: process.env.VUE_APP_GITHUB,
      portfolio: process.env.VUE_APP_PORTFOLIO
    }
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    posts,
    auth
    //   
  },
});
