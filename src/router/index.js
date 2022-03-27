import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Posts from "../views/posts/Index.vue";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import ForgotPassword from "../views/auth/ForgotPassword.vue";
import Profile from "../views/auth/Profile.vue";
import PostCreate from "../views/posts/Create.vue";
import PostPreview from "../views/posts/Preview.vue";
import Post from "../views/posts/Post.vue";
import PostEdit from "../views/posts/Edit.vue";
import firebase from "firebase/app";
import {auth} from "../firebase/firebaseInit"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home",
      requiresAuth: false,
    },
  },
  {
    path: "/posts",
    name: "Posts",
    component: Posts,
    meta: {
      title: "Posts",
      requiresAuth: false,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
      requiresAuth: false,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register",
      requiresAuth: false,
    },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: {
      title: "Forgot Password",
      requiresAuth: false,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      title: "Profile",
      requiresAuth: true,
    },
  },
  {
    path: "/create-post",
    name: "PostCreate",
    component: PostCreate,
    meta: {
      title: "Create Post",
      requiresAuth: true,
    },
  },
  {
    path: "/post-preview",
    name: "PostPreview",
    component: PostPreview,
    meta: {
      title: "Preview Blog Post",
      requiresAuth: true,
    },
  },
  {
    path: "/view-blog/:post",
    name: "Post",
    component: Post,
    meta: {
      title: "View Blog Post",
      requiresAuth: false,
    },
  },
  {
    path: "/edit-blog/:post",
    name: "PostEdit",
    component: PostEdit,
    meta: {
      title: "Edit Blog Post",
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | ${process.env.VUE_APP_TITLE}`;
  next();
});

router.beforeEach(async (to, from, next) => {
  let user = auth.currentUser;
  let admin = null;
  if (user) {
    let token = await user.getIdTokenResult();
    admin = token.claims.admin;
  }
  if (to.matched.some((res) => res.meta.requiresAuth)) {
    if (user) {
      if (to.matched.some((res) => res.meta.requiresAdmin)) {
        if (admin) {
          return next();
        }
        return next({ name: "Home" });
      }
      return next();
    }
    return next({ name: "Home" });
  }
  return next();
});

export default router;
