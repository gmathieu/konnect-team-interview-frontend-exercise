<template>
  <ul class="service-metrics">
    <template v-if="!metrics">
      <li>Not configured with runtime yet</li>
    </template>
    <template v-else>
      <li class="green">
        <span class="color-grey-600 bold-600">{{ metrics.latency }}ms</span>
        latency
      </li>
      <li class="green">
        <span class="color-grey-600 bold-600"
          >{{ Number(metrics.uptime * 100).toFixed(2) }}%</span
        >
        uptime
      </li>
      <li class="green">
        <span class="color-grey-600 bold-600">{{
          abbreviateInt(metrics.requests)
        }}</span>
        requests<span class="dot mx-2">&#x2022;</span>
        <span class="color-grey-600 bold-600"
          >{{ Number(metrics.errors * 100).toFixed(2) }}%</span
        >
        errors
      </li>
    </template>
  </ul>
</template>

<script lang="ts">
import { Metric } from "types";
import { defineComponent, PropType } from "vue";
import { abbreviateInt } from "../utils/abbreviateInt";
export default defineComponent({
  name: "ServiceMetrics",
  props: {
    metrics: {
      type: Object as PropType<Metric>,
      default: undefined,
    },
  },
  methods: {
    abbreviateInt,
  },
});
</script>

<style scoped lang="scss">
.dot {
  font-size: 8px;
  vertical-align: bottom;
}
ul.service-metrics {
  li {
    padding-left: 16px;
  }

  li::before {
    content: "\2022";
    font-weight: bold;
    display: inline-block;
    font-size: 22px;
    vertical-align: text-bottom;
    width: 16px;
    margin-left: -16px;
  }
  li.green::before {
    color: var(--green-500);
  }
}
</style>
