<template>
  <div class="profile">
    <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
    <div class="container">
      <h2>Account Settings</h2>
      <div class="profile-info">
        <div class="initials">{{ profile.initials }}</div>
        <div class="input">
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" v-model="firstName" />
        </div>
        <div class="input">
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" v-model="lastName" />
        </div>
        <div class="input">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" />
        </div>
        <div class="input">
          <label for="email">Email:</label>
          <input disabled type="text" id="email" v-model="email" />
        </div>
        <button @click="updateProfile">Save Changes</button>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "@/components/Modal";
export default {
  name: "ProfileView",
  components: {
    Modal,
  },
  data() {
    return {
      modalMessage: "Changes were saved!",
      modalActive: null,
    };
  },
  methods: {
    
    updateProfile() {
      this.$store.dispatch("auth/updateUserSettings");
      this.modalActive = !this.modalActive;
    },

    closeModal() {
      this.modalActive = !this.modalActive;
    },
  },
  computed: {

    profile(){
      return this.$store.state.auth.profile
    },

    firstName: {
      get() {
        return this.$store.state.auth.profile.firstName;
      },
      set(payload) {
        this.$store.commit("auth/changeFirstName", payload);
      },
    },

    lastName: {
      get() {
        return this.$store.state.auth.profile.lastName;
      },
      set(payload) {
        this.$store.commit("auth/changeLastName", payload);
      },
    },

    username: {
      get() {
        return this.$store.state.auth.profile.username;
      },
      set(payload) {
        this.$store.commit("auth/changeUsername", payload);
      },
    },

    email() {
      return this.$store.state.auth.profile.email;
    },
  },
};
</script>

<style scoped>

.profile .container h2{
    text-align: center;
    margin-bottom: 1em;
    font-weight: 300;
    font-size: 2em;
}
.profile .container .profile-info {
    border-radius: 0.5em;
    box-shadow: 0 0.25em 0.4em -0.1em rgba(0, 0, 0, 0.1), 0 2px 0.25em -0.1em rgba(0, 0, 0, 0.06);
    padding: 2em;
    background-color: #f1f1f1;
    display: flex;
    flex-direction: column;
    max-width: 37.5em;
    margin: 2em auto;
}

.profile .container .profile-info .initials {
    position: initial;
    width: 3em;
    height: 3em;
    font-size: 1.5em;
    background-color: #7289da;
    color: #fff;
    display: flex;
    align-self: center;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}

.profile .container .profile-info .input {
    margin: 1em 0;
}

.profile .container .profile-info .input label {
    font-size: 1.25em;
    display: block;
    padding-bottom: 0.4em;
}
.profile .container .profile-info .input input {
    width: 100%;
    border: none;
    background-color: #f2f7f6;
    padding: 0.5em;
    height: 3em;
}

.profile .container .profile-info .input input:focus {
    outline: none;
}

.profile .container .profile-info button {
    align-self: center;
}

</style>