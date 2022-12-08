<template>
  <main class="px-5 py-7">
    <div class="page-header">
      <div class="flex-grow-1">
        <h1 class="style-heading-1 mb-4">{{ title }}</h1>
        <div v-if="hasActions()" class="style-body-lg-bold mb-5">
          <slot name="description"></slot>
        </div>
      </div>
      <div v-if="hasActions()" class="page-header-actions mb-5">
        <slot name="actions"></slot>
      </div>
    </div>
    <slot />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageLayout",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    hasActions() {
      return !!this.$slots.actions;
    },
    hasDescription() {
      return !!this.$slots.description;
    },
  },
});
</script>

<style lang="scss">
@import "../styles/mixins.scss";

.page-header {
  display: flex;
  flex-direction: column;

  @include respond-to("small") {
    flex-direction: row;
  }
}
</style>
