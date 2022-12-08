<template>
  <KCard
    :body="item.description"
    class="service-card fill-height responsive"
    :title="item.name"
  >
    <template #statusHat>
      <span v-if="item.published" class="d-flex align-items-center"
        ><KIcon class="mr-1" color="green" icon="check" size="20" /> Published
        to portal</span
      >
      <span v-else-if="!item.configured" class="d-flex align-items-center"
        ><KIcon class="mr-1" color="var(--yellow-400)" icon="spinner" /> In
        progress</span
      >
      <span v-else class="d-flex align-items-center"
        ><KIcon class="mr-1" icon="disabled" size="20" /> Unpublished</span
      >
    </template>
    <template #title>{{ item.name }}</template>
    <template #actions>
      <KButton
        appearance="secondary"
        aria-disabled
        size="small"
        tabindex="-1"
        >{{
          `${item.versions.length} ${
            item.versions.length === 1 ? "version" : "versions"
          }`
        }}</KButton
      >
    </template>
    <template #body
      ><p>{{ item.description }}</p>
      <ServiceMetric class="mt-4" :metrics="item.metrics"
    /></template>
    <template v-if="developers.length" #notifications>
      <UserAvatarGroup :users="developers" />
    </template>
  </KCard>
</template>

<script lang="ts">
import { Service, User } from "types";
import { defineComponent, PropType } from "vue";
import UserAvatarGroup from "@/components/UserAvatarGroup.vue";
import ServiceMetric from "@/components/ServiceMetrics.vue";

export default defineComponent({
  name: "ServiceCard",
  components: { UserAvatarGroup, ServiceMetric },
  props: {
    item: {
      type: Object as PropType<Service>,
      required: true,
    },
  },
  computed: {
    developers() {
      return this.$props.item.versions.reduce<User[]>((output, curr) => {
        if (curr.developer) output.push(curr.developer);
        return output;
      }, []);
    },
  },
});
</script>

<style lang="scss">
@import "../styles/mixins.scss";

.service-card {
  &.responsive {
    .k-card-header {
      flex-direction: column;
      justify-content: space-between;
      gap: 12px;

      @include respond-to("small") {
        flex-direction: row;
      }

      .k-card-actions {
        margin-left: 0;
      }
    }

    .k-card-content {
      flex-direction: column;
      gap: 8px;

      @include respond-to("small") {
        flex-direction: row;
      }
    }
    .k-card-notifications {
      margin-left: 0 !important;
      gap: 12px;

      @include respond-to("small") {
        flex-direction: row;
      }
    }
  }

  &.fill-height {
    display: flex;
    flex-direction: column;

    .k-card-header {
      flex-grow: 0;
    }
    .k-card-content {
      flex-grow: 1;
    }
    .k-card-body {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
}
</style>
