<template>
  <div class="form-wrap">
    <form @submit.prevent="register" class="register">
      <p class="login-register">
        Already have an account?
        <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
      </p>
      <h2>Create Your {{$store.state.appName}} Account</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="First Name" v-model="firstName" />
          <i class="fa-solid fa-user icon"></i>
        </div>
        <div class="input">
          <input type="text" placeholder="Last Name" v-model="lastName" />
          <i class="fa-solid fa-user icon"></i>
        </div>
        <div class="input">
          <input type="text" placeholder="Username" v-model="username" />
          <i class="fa-solid fa-user icon"></i>
        </div>
        <div class="input">
          <input type="text" placeholder="Email" v-model="email" />
          <i class="fa-solid fa-envelope icon"></i>
        </div>
        <div class="input">
          <input type="password" placeholder="Password" v-model="password" />
          <i class="fa-solid fa-key icon"></i>
        </div>
        <div v-show="error" class="error">{{ this.errorMsg }}</div>
      </div>
      <button>Sign Up</button>
      <button style="background-color: #7289da;" @click.prevent="$router.push({name:'Home'})">Back to Home</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebaseInit";
import db from "@/firebase/firebaseInit";
import { doc, setDoc } from "firebase/firestore";

export default {
  name: "RegisterView",
  
  data() {
    return {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      error: null,
      errorMsg: "",
    };
  },
  methods: {
    async register() {
      if (this.email !== "" && this.password !== "" && this.firstName !== "" && this.lastName !== "" && this.username !== ""){
        this.error = false;
        this.errorMsg = "";

        createUserWithEmailAndPassword(auth, this.email, this.password)
          .then(async (res) => {
            const user = res.user;
            await setDoc(doc(db, 'users', user.uid), {
              firstName: this.firstName,
              lastName: this.lastName,
              username: this.username,
              email: this.email,
            });

            this.$router.replace({ name: "Login" });
          })
          .catch((error) => {
            this.error = true;
            this.errorMsg = error.message;
          });

        return
      }
      this.error = true;
      this.errorMsg = "Please fill out all the fields!";
      return
    },
  },
};
</script>

<style scoped>
.register h2 {
    max-width: 22em;
}
</style>