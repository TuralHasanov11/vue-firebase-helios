import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vue2Editor from "vue2-editor";
import {auth} from "./firebase/firebaseInit"

Vue.use(Vue2Editor);

Vue.config.productionTip = false;

let app 

store.dispatch('auth/authenticate').then(()=>{
  if(!app){
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app")
  }
})