<template>
  <div class="form-wrap">
    <form class="login">
      <p class="login-register">
        Don't have an account?
        <router-link class="router-link" :to="{ name: 'Register' }">Register</router-link>
      </p>
      <h2>Login to FireBlogs</h2>
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
      email: "test2@test.com",
      password: "password",
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
    margin-bottom: 32px;
}

.form-wrap .login-register .router-link {
    color: #000;
}

.form-wrap form {
    padding: 0 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
}

.form-wrap form h2 {
    text-align: center;
    font-size: 32px;
    color: #303030;
    margin-bottom: 40px;
}

.form-wrap form .inputs {
      width: 100%;
      max-width: 350px;

}

.form-wrap form .inputs .input {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 8px;
}

.form-wrap form .inputs .input input {
    width: 100%;
    border: none;
    background-color: #f2f7f6;
    padding: 4px 4px 4px 30px;
    height: 50px;
}

.form-wrap form .inputs .input input:focus {
    outline: none;
}

.form-wrap form .inputs .input .icon {
    width: 12px;
    position: absolute;
    left: 6px;
}

.form-wrap .forgot-password {
    text-decoration: none;
    color: #000;
    cursor: pointer;
    font-size: 14px;
    margin: 16px 0 32px;
    border-bottom: 1px solid transparent;
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
    width: 60px;
    right: -30px;
    height: 101%;
}
.form-wrap .background {
    display: none;
    flex: 2;
    background-size: cover;
    background-image: url("@/assets/background.png");
    width: 100%;
    height: 100%;
}


@media (min-width: 900px) {
    .form-wrap{
        width: 100%;
    }

    .form-wrap form {
      padding: 0 50px;
    }

    .form-wrap form h2 {
        font-size: 40px;
    }

    .form-wrap .angle {
        display: initial;
    }

    .form-wrap .background{
        display: initial;
    }
}
</style>