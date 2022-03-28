<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="{ name: 'Home' }">{{$store.state.appName}}</router-link>
      </div>
      <div class="nav-links">
        <ul v-show="!mobile">
          <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
          <router-link class="link" :to="{ name: 'Posts' }">Posts</router-link>
          <router-link v-if="user" class="link" :to="{ name: 'PostCreate' }">Create Post</router-link>
          <router-link v-if="!user" class="link" :to="{ name: 'Login' }">Login/Register</router-link>
        </ul>
        <div v-if="user" :class="{ 'mobile-user-menu': mobile }" @click="toggleProfileMenu" class="profile" ref="profile">
          <span>{{ profile.initials }}</span>
          <div v-show="profileMenu" class="profile-menu">
            <div class="info">
              <p class="initials">{{ profile.initials }}</p>
              <div class="right">
                <p>{{ profile.firstName }} {{ profile.lastName }}</p>
                <p>{{ profile.username }}</p>
                <p>{{ profile.email }}</p>
              </div>
            </div>
            <div class="options">
              <div class="option">
                <router-link class="option" :to="{ name: 'Profile' }">
                  <i class="fa-solid fa-user"></i>
                  <p>Profile</p>
                </router-link>
              </div>
              <div @click="signOut" class="option">
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
                <p>Sign Out</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <span @click="toggleMobileNav" class="menu-icon" v-show="mobile">
      <i class="fa-solid fa-bars"></i>
    </span>
    <transition name="mobile-nav">
      <ul class="mobile-nav" v-show="mobileNav">
        <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
        <router-link class="link" :to="{ name: 'Posts' }">Posts</router-link>
        <router-link v-if="user" class="link" :to="{ name: 'PostCreate' }">Create Post</router-link>
        <router-link v-if="!user" class="link" :to="{ name: 'Login' }">Login/Register</router-link>
      </ul>
    </transition>
  </header>
</template>

<script>
export default {
  name: "NavbarItem",

  data() {
    return {
      profileMenu: null,
      mobile: null,
      mobileNav: null,
      windowWidth: null,
    };
  },
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  methods: {
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
      return;
    },
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
    toggleProfileMenu(e) {
      if (e.target === this.$refs.profile) {
        this.profileMenu = !this.profileMenu;
      }
    },
    signOut() {
      this.$store.dispatch('auth/logout')
      window.location.reload();
    },
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },

    profile(){
      return this.$store.state.auth.profile;
    }
  },
};
</script>

<style scoped>
header {
  background-color: #fff;
  padding: 0 1.5em;
  box-shadow: 0 0.25em 0.375em -0.1em rgba(0, 0, 0, 0.1), 0 0.1em 0.25em -0.1em rgba(0, 0, 0, 0.06);
  z-index: 99;

}

header nav {
    display: flex;
    padding: 1.5em 0;
}

header nav .mobile-user-menu {
    margin-right: 2.5em;
}

header nav .nav-links {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
}

header nav .nav-links ul {
    margin-right: 2em;
}

header nav .nav-links ul .link {
    margin-right: 2em;
}
header nav .nav-links ul .link:last-child {
    margin-right: 0;
}
header nav .nav-links .profile {
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5em;
    height: 2.5em;
    border-radius: 50%;
    color: #fff;
    background-color: #637acc;
}

header nav .nav-links .profile  span {
    pointer-events: none;
}

header nav .nav-links .profile .profile-menu {
    position: absolute;
    top: 3.75em;
    right: 0;
    width: 250px;
    background-color: #637acc;
    box-shadow: 0 0.25em 0.375em -0.1em rgba(0, 0, 0, 0.1), 0 0.1em 0.25em -0.1em rgba(0, 0, 0, 0.06);
}

header nav .nav-links .profile .profile-menu .info {
    display: flex;
    align-items: center;
    padding: 1em;
    border-bottom: 0.1em solid #fff;
}
header nav .nav-links .profile .profile-menu .initials {
    position: initial;
    width: 2.5em;
    height: 2.5em;
    background-color: #fff;
    color: #7289da;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}
header nav .nav-links .profile .profile-menu .right {
        flex: 1;
        margin-left: 1.5em;
}

header nav .nav-links .profile .profile-menu .right p:nth-child(1){
    font-size: 0.8em;
}

header nav .nav-links .profile .profile-menu .right p:nth-child(2), 
header nav .nav-links .profile .profile-menu .right p:nth-child(3) {
    font-size: 0.75em;
}
header nav .nav-links .profile .profile-menu .options {
    padding: 1em;
}

header nav .nav-links .profile .profile-menu .options .option {
    text-decoration: none;
    color: #fff;
    display: flex;
    align-items: center;
    margin-bottom: 0.75em;
}

header nav .nav-links .profile .profile-menu .options .option .icon {
    width: 1.1em;
    height: auto;
}
header nav .nav-links .profile .profile-menu .options .option p {
    font-size: 0.8em;
    margin-left: 0.75em;
}
header nav .nav-links .profile .profile-menu .options .option p:last-child {
    margin-bottom: 0px;
}

header nav .branding {
    display: flex;
    align-items: center;
}

header nav .branding .header {
    font-weight: 600;
    font-size: 1.5em;
    color: #7289DA;
    text-decoration: none;
}

header .menu-icon {
    cursor: pointer;
    position: absolute;
    top: 2em;
    right: 1.5em;
    height: 1.5em;
    width: auto;
}
header .mobile-nav {
    padding: 1.25em;
    width: 70%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    background-color: #303030;
    top: 0;
    left: 0;
  }

header .mobile-nav .link {
    padding: 1em 0;
    color: #fff;
}
header .mobile-nav-enter-active,
header .mobile-nav-leave-active {
    transition: all 1s ease;
}
header .mobile-nav-enter {
    transform: translateX(-250px);
}
header .mobile-nav-enter-to {
    transform: translateX(0);
}
header .mobile-nav-leave-to {
    transform: translateX(-250px);
}
header .link {
    font-weight: 500;
    padding: 0 0.5em;
    transition: 0.3s color ease;
}

header .link:hover {
    color: #7289DA;
}
</style>