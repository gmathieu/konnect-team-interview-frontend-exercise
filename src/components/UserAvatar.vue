<template>
  <span class="user-avatar align-items-center">
    <KIcon v-if="hasError" class="d-block" icon="teamMember" size="36" />
    <img v-else :src="avatar" :title="name" @error="setHasError" />
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "UserAvatar",
  props: {
    name: {
      type: String,
      default: "Team member",
    },
    avatar: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return { hasError: !this.$props.avatar };
  },
  methods: {
    setHasError() {
      this.hasError = true;
    },
  },
});
</script>
<style lang="scss" scoped>
.user-avatar {
  display: inline-flex;
  border-radius: 9999px;
  height: 36px;
  width: 36px;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 9999px;
    max-width: 100%;
    display: block;
  }
}
</style>
