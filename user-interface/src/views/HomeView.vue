<template>
  <div class="home">
    <ComponentsMenu title="Component Development Tool" />
    <LoginComponent :not-logged-msg="notLoggedMsg" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ComponentsMenu from "@/components/ComponentsMenu.vue"; // @ is an alias to /src
import LoginComponent from "@/components/LogInComponent.vue";

export default defineComponent({
  setup() {
    const notLoggedMsg = "Login to see the components menu";
    return { notLoggedMsg };
  },
  name: "HomeView",
  components: {
    ComponentsMenu,
    LoginComponent,
  },
});
</script>
