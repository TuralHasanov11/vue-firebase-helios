<template>
  <div class="form-wrap">
    <form class="login">
      <p class="login-register">
        Don't have an account?
        <router-link class="router-link" :to="{ name: 'Register' }">Register</router-link>
      </p>
      <h2>Login to {{$store.state.appName}}</h2>
      <div class="inputs">
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
      <router-link class="forgot-password" :to="{ name: 'ForgotPassword' }"
        >Forgot your password?</router-link
      >
      <button @click.prevent="login">Sign In</button>
      <button style="background-color: #7289da;" @click.prevent="$router.push({name:'Home'})">Back to Home</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebaseInit";

export default {
  name: "LoginView",

  data() {
    return {
      email: "",
      password: "",
      error: null,
      errorMsg: "",
    };
  },

  methods: {
    login() {
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          this.$router.replace({ name: "Home" });
          this.error = false;
          this.errorMsg = "";
          console.log(auth.currentUser.uid);
        })
        .catch((err) => {
          this.error = true;
          this.errorMsg = err.message;
        });
    },
  },
};
</script>

<style>
.form-wrap {
  overflow: hidden;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  width: 90%;
}

.form-wrap .login-register {
    margin-bottom: 2em;
}

.form-wrap .login-register .router-link {
    color: #7289DA;
}

.form-wrap form {
    padding: 0 0.6em;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
}

.form-wrap form h2 {
    text-align: center;
    font-size: 2em;
    color: #303030;
    margin-bottom: 2.5em;
}

.form-wrap form .inputs {
      width: 100%;
      max-width: 22rem;
}

.form-wrap form .inputs .input {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.5em;
}

.form-wrap form .inputs .input input {
    width: 100%;
    border: none;
    background-color: #f2f7f6;
    padding: 0.25em 0.25em 0.25em 2em;
    height: 3em;
}

.form-wrap form .inputs .input input:focus {
    outline: none;
}

.form-wrap form .inputs .input .icon {
    width: 0.75em;
    position: absolute;
    left: 0.4em;
}

.form-wrap .forgot-password {
    text-decoration: none;
    color: #7289DA;
    cursor: pointer;
    font-size: 0.8em;
    margin: 1em 0 2em;
    border-bottom: 0.1em solid transparent;
    transition: 0.5s ease all;
}

.form-wrap .forgot-password:hover {
    border-color: #303030;
}

.form-wrap .angle {
    display: none;
    position: absolute;
    background-color: #fff;
    transform: rotateZ(3deg);
    width: 4em;
    right: -2em;
    height: 101%;
}
.form-wrap .background {
    display: none;
    flex: 2;
    background-size: cover;
    background-image: url("@/assets/coding.jpg");
    width: 100%;
    height: 100%;
}


@media (min-width: 900px) {
    .form-wrap{
        width: 100%;
    }

    .form-wrap form {
      padding: 0 3em;
    }

    .form-wrap form h2 {
        font-size: 2.5em;
    }

    .form-wrap .angle {
        display: initial;
    }

    .form-wrap .background{
        display: initial;
    }
}
</style>