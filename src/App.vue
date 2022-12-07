<template>
  <header>
    <nav class="nav px-5">
      <router-link to="/"><KongLogo /></router-link>
    </nav>
  </header>
  <main class="px-5 py-7">
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import KongLogo from "@/components/KongLogo.vue";

export default defineComponent({
  name: "App",
  components: { KongLogo },
});
</script>

<style lang="scss">
@import "./styles/reset.scss";

body {
  background-color: var(--grey-100);
  font-family: "Inter", Helvetica, Arial, sans-serif;
  color: var(--grey-600);
}

.nav {
  align-items: center;
  background: linear-gradient(
    180deg,
    var(--black-500) 0%,
    var(--blue-600) 100%
  );
  display: flex;
  height: 70px;
}

a {
  color: var(--blue-500);
  text-decoration: none;

  &:hover {
    color: var(--blue-700);
  }
}
</style>
