<template>
  <footer>
    <div class="container">
      <div class="row align-items-center mb-5">
        <div class="col-12 col-md-6">
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
        <div class="col-12 col-md-6">
          <ul>
            <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
            <router-link class="link" :to="{ name: 'Posts' }">Blogs</router-link>
            <router-link v-if="user" class="link" :to="{ name: 'PostCreate' }">Create Post</router-link>
            <router-link v-if="!user" class="link" :to="{ name: 'Login' }">Login In / Register</router-link>
          </ul>
        </div>
      </div>
      <div class="right text-center text-white">
        <p>Copyright {{new Date().getFullYear()}} All Rights Reserved</p>
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
  padding: 3em 1.5em;
  background-color: #637acc;
 
}


@media (min-width: 768px) {
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

footer .container .header {
    text-align: center;
    font-size: 1.5em;
    color: #fff;
    margin-bottom: 1em;
    text-decoration: none;
    font-weight: 600;
}
footer .container ul {
    gap: 1em;
    list-style: none;
    display: flex;
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
    width: 1.5em;
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
    font-size: 1em;
    font-weight: 500;
    color: #fff;
    text-decoration: none;
}

</style>