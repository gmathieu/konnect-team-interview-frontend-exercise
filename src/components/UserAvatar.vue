<template>
  <span class="user-avatar d-flex align-items-center">
    <img :src="avatar" :title="name" />
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "UserAvatar",
  props: {
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
});
</script>
<style lang="scss" scoped>
.user-avatar {
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
