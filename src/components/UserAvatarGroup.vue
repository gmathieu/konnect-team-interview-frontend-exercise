<template>
  <span class="user-avatar-group d-flex align-items-center">
    <UserAvatar
      v-for="user in truncatedUsers"
      :key="user.avatar"
      v-bind="user"
    />
    <span v-if="overflowCount" class="d-block user-group-overflow type-xs">
      +{{ overflowCount }}
    </span>
  </span>
</template>

<script lang="ts">
import { User } from "types";
import { defineComponent, PropType } from "vue";
import UserAvatar from "@/components/UserAvatar.vue";

const OVERFLOW_AFTER = 2;

export default defineComponent({
  name: "UserAvatarGroup",
  components: { UserAvatar },
  props: {
    users: {
      type: Array as PropType<Pick<User, "avatar" | "name">[]>,
      required: true,
    },
  },
  data(props) {
    const isOverflowing = props.users.length > OVERFLOW_AFTER;
    return {
      truncatedUsers: isOverflowing
        ? props.users.slice(0, OVERFLOW_AFTER)
        : props.users,
      overflowCount: isOverflowing ? props.users.length - OVERFLOW_AFTER : 0,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-avatar-group {
  flex-direction: row-reverse;
  justify-content: flex-end;
  & > * {
    margin-inline-start: -12px;
    border: 2px solid var(--white);
    position: relative;
    &:last-of-type {
      margin-left: 0;
    }
  }
}
.user-group-overflow {
  background: var(--grey-200);
  line-height: 36px;
  border-radius: 9999px;
  height: 36px;
  width: 36px;
  text-align: center;
  color: var(--grey-500);
  font-weight: 600;
}
</style>
