<template>
  <div class="home">
    <ComponentsMenu msg="Component Development Tool" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ComponentsMenu from "@/components/ComponentsMenu.vue"; // @ is an alias to /src

export default defineComponent({
  name: "HomeView",
  components: {
    ComponentsMenu,
  },
});
</script>
