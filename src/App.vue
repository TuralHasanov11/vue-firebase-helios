<template>
  <div class="app-wrapper">
    <div class="app">
      <Navbar v-if="!navigation" />
      <main v-if="!navigation" class="py-4">
        <router-view />
      </main>
       <main v-else>
        <router-view />
      </main>
      <Footer v-if="!navigation" />
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "app",
  components: { 
    Navbar, 
    Footer 
  },  

  data() {
    return {
      navigation: null,
    };
  },
  
  created() {
      this.checkRoute();
      this.$store.dispatch("posts/getPosts");
  },

  methods: {
    checkRoute() {
      if (this.$route.name === "Login" || this.$route.name === "Register" || this.$route.name === "ForgotPassword") {
        this.navigation = true;
        return;
      }
      this.navigation = false;
    },
  },
  watch: {
    $route() {
      this.checkRoute();
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: #7289DA
}
.link-light {
  color: #fff;
}
.arrow {
  margin-left: 0.5em;
  width: 0.75em;
}
.arrow path {
    fill: #7289DA
  }
.arrow-light path {
  fill: #fff;
}
button,
.router-button {
  transition: 500ms ease all;
  cursor: pointer;
  margin-top: 1.5em;
  padding: 0.75em 1.5em;
  background-color: #303030;
  color: #fff;
  border-radius: 1.25em;
  border: none;
  text-transform: uppercase;
}

.router-button:focus {
    outline: none;
  }
.router-button:hover {
    background-color: rgba(48, 48, 48, 0.7);
  } 
.button-ghost {
  color: #7289DA;
  padding: 0;
  border-radius: 0;
  margin-top: 3em;
  font-size: 0.9em;
  font-weight: 500;
  background-color: transparent;
}

.button-ghost i{
  margin-left: 0.5em;
}

@media (min-width: 692px) {
  .button-ghost{
    margin-top: 0;
    margin-left: auto;
  }
  
}

.button-light {
  background-color: transparent;
  border: 0.1em solid #fff;
  color: #fff;
}
.button-inactive {
  pointer-events: none !important;
  cursor: none !important;
  background-color: rgba(128, 128, 128, 0.5) !important;
}
.error {
  text-align: center;
  font-size: 0.75em;
  color: tomato;
}
.blog-card-wrap {
  position: relative;
  padding: 5em 1em;
  background-color: #f1f1f1;
}


@media (min-width: 576px) {
  .blog-card-wrap{
    padding: 6em 1em;
  }

}

</style>
