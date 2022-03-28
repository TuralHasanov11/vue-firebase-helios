import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vue2Editor from "vue2-editor";
import {auth} from "./firebase/firebaseInit"
import db from "./firebase/firebaseInit"
import { doc, getDoc } from "firebase/firestore";


Vue.use(Vue2Editor);

Vue.config.productionTip = false;

let app 

// store.dispatch('auth/authenticate').then(()=>{
//   if(!app){
//     app = new Vue({
//       router,
//       store,
//       render: (h) => h(App),
//     }).$mount("#app")
//   }
// })

auth.onAuthStateChanged(async (user) => {
  store.commit("auth/updateUser", user);
  if (user) {
      const res = await getDoc(doc(db, 'users', user.uid))
      if (res.exists()) {
          store.commit("auth/setProfileInfo", res);
          store.commit("auth/setProfileInitials");
      }
  }

  if(!app){
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app")
  }
});