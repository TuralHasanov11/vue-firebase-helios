<template>
  <footer>
    <div class="container">
      <div class="left">
        <div class="col-1">
          <router-link class="header" :to="{ name: 'Home' }">{{$store.state.appName}}</router-link>
          <ul>
            <li>
              <a target="_blank" class="link" :href="socialLinks.youtube"><i class="fa-brands fa-youtube"></i></a>
            </li>
            <li>
              <a target="_blank" class="link" :href="socialLinks.github"><i class="fa-brands fa-github-square"></i></a>
            </li>
            <li>
              <a target="_blank" class="link" :href="socialLinks.linkedin"><i class="fa-brands fa-linkedin"></i></a>
            </li>
            <li>
              <a target="_blank" class="link" :href="socialLinks.portfolio"><i class="fa-solid fa-file-pen"></i></a>
            </li>
          </ul>
        </div>
        <div class="col-2">
          <ul>
            <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
            <router-link class="link" :to="{ name: 'Posts' }">Blogs</router-link>
            <router-link v-if="user" class="link" :to="{ name: 'PostCreate' }">Create Post</router-link>
            <router-link v-if="!user" class="link" :to="{ name: 'Login' }">Login In / Register</router-link>
          </ul>
        </div>
      </div>
      <div class="right">
        <p>Copyright 2021 All Rights Reserved</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterItem",
  computed: {
    user() {
      return this.$store.state.user;
    },
    admin() {
      return this.$store.state.profileAdmin;
    },
    socialLinks(){
      return this.$store.state.socialLinks
    },
  },
};
</script>

<style scoped>
footer {
  margin-top: auto;
  padding: 100px 25px;
  background-color: #303030;
 
}

footer .container {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

footer .container div {
    display: flex;
    flex: 1;
}

@media (min-width: 768px) {
    footer .container{
        flex-direction: row;
        gap: 0px;
    }

    footer .container .left {
        flex-direction: row;
        align-items: initial;
        gap: 0;
    }

    footer .container .header {
          text-align: initial;
    }

    footer .container .col-1,
    footer .container .col-2 {
        gap: 0;
    }

    footer .container .col-1 h2 {
        text-align: initial;
    }

    footer .container .col-2 ul{
        flex-direction: column;
    }

    footer .container .right {
        align-items: flex-end;
        gap: 0;
    }
}

footer .container .left {
    gap: 32px;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
}
footer .container .header {
    text-align: center;
    font-size: 24px;
    color: #fff;
    margin-bottom: 16px;
    text-decoration: none;
    font-weight: 600;
}
footer .container ul {
    gap: 16px;
    list-style: none;
    display: flex;
}
footer .container .col-1,
footer .container .col-2 {
    gap: 32px;
    display: flex;
    flex: 1;
}
footer .container .col-1 {
    flex-direction: column; 
}

footer .container .col-1 h2 {
    text-align: center;
}
footer .container .col-1 ul {
    margin-top: auto;
}

footer .container .col-1 ul li {
    display: flex;
    align-items: center;
}
footer .container .col-1 ul .svg-icon {
    width: 24px;
    height: auto;
    color: #fff;
}
footer .container .col-2 ul {
    height: 100%;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
}
footer .container .link {
    font-size: 16px;
    font-weight: 500;
    color: #fff;
    text-decoration: none;
}
footer .container .right {
    gap: 32px;
    color: #fff;
    align-items: center;
    flex-direction: column; 
}
footer .container p {
    margin-top: auto;
}
</style>