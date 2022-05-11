<template>
  <div class="LogoComponent">
    <img alt="Project Logo" src="../assets/logo.png" :style="customStyle" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LogoComponent",
  props: {
    customStyle: String,
  },
});
</script>
