<template>
  <div class="LogInComponent">
    <div class="toLogInSection" v-if="!authStore.isLoggedIn">
      <LogoComponent customStyle="height: 80px" />
      <div class="logInMsg">{{ notLoggedMsg }}</div>
      <div class="logInForm">
        <input type="text" v-model="name" placeholder="username" />
        <input type="text" v-model="pwd" placeholder="password" />
        <button @click="logIn(name, pwd)">Log in</button>
      </div>
    </div>
    <div class="loggedSection" v-if="authStore.isLoggedIn">
      <div class="logInMsg">Welcome: {{ authStore.user.user_nicename }}</div>
      <button @click="logOut()">Log out</button>
    </div>
    <div>{{ authStore.message }}</div>
  </div>
</template>

<script lang="ts">
import { useAuthenticationStore } from "@/stores/authentication.store";
import LogoComponent from "@/components/LogoComponent.vue";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginComponent",
  setup() {
    const authStore = useAuthenticationStore();
    const userAuth = storeToRefs(authStore);
    return { authStore, userAuth };
  },
  data() {
    return {
      name: "",
      pwd: "",
    };
  },
  components: {
    LogoComponent,
  },
  props: {
    notLoggedMsg: String,
  },
  methods: {
    logIn(name, pwd) {
      this.authStore.getTokenAction(name, pwd);
    },
    logOut() {
      this.authStore.initState();
    },
  },
});
</script>

<style>
.logInForm {
  display: flex;
  background-color: rgba(12, 143, 224, 0.77);
  flex-direction: column;
  max-width: 500px;
  padding: 1%;
  border-radius: 5px;
  margin-left: auto;
  margin-right: auto;
}
.logInMsg {
  padding: 1%;
}
</style>
