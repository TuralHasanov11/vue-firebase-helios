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
  padding: 0 25px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;

}

header nav {
    display: flex;
    padding: 25px 0;
}

header nav .mobile-user-menu {
    margin-right: 40px;
}

header nav .nav-links {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
}

header nav .nav-links ul {
    margin-right: 32px;
}

header nav .nav-links ul .link {
    margin-right: 32px;
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
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: #fff;
    background-color: #303030;
}

header nav .nav-links .profile  span {
    pointer-events: none;
}

header nav .nav-links .profile .profile-menu {
    position: absolute;
    top: 60px;
    right: 0;
    width: 250px;
    background-color: #303030;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

header nav .nav-links .profile .profile-menu .info {
    display: flex;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #fff;
}
header nav .nav-links .profile .profile-menu .initials {
    position: initial;
    width: 40px;
    height: 40px;
    background-color: #fff;
    color: #303030;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}
header nav .nav-links .profile .profile-menu .right {
        flex: 1;
        margin-left: 24px;
}

header nav .nav-links .profile .profile-menu .right p:nth-child(1){
    font-size: 14px;
}

header nav .nav-links .profile .profile-menu .right p:nth-child(2), 
header nav .nav-links .profile .profile-menu .right p:nth-child(3) {
    font-size: 12px;
}
header nav .nav-links .profile .profile-menu .options {
    padding: 15px;
}

header nav .nav-links .profile .profile-menu .options .option {
    text-decoration: none;
    color: #fff;
    display: flex;
    align-items: center;
    margin-bottom: 12px;
}

header nav .nav-links .profile .profile-menu .options .option .icon {
    width: 18px;
    height: auto;
}
header nav .nav-links .profile .profile-menu .options .option p {
    font-size: 14px;
    margin-left: 12px;
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
    font-size: 24px;
    color: #000;
    text-decoration: none;
}

header .menu-icon {
    cursor: pointer;
    position: absolute;
    top: 32px;
    right: 25px;
    height: 25px;
    width: auto;
}
header .mobile-nav {
    padding: 20px;
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
    padding: 15px 0;
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
    padding: 0 8px;
    transition: 0.3s color ease;
}

header .link:hover {
    color: #1eb8b8;
}
</style>