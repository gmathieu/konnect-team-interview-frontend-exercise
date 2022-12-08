<template>
  <div class="page-header">
    <div class="flex-grow-1">
      <h1 class="style-heading-1 mb-4">Service Hub</h1>
      <p class="style-body-lg-bold mb-5">
        Organize services, manage and track versioning and API service
        documentation. <a href="#">Learn more</a>
      </p>
    </div>
    <div class="page-header-options">
      <KInput
        v-model="searchQuery"
        class="mb-5"
        placeholder="Search"
        type="search"
      >
      </KInput>
    </div>
  </div>
  <div class="service-catalog">
    <KCatalog :fetcher="fetchServices" :search-input="searchQuery"
      ><template #body="{ data }: { data: Service[] }">
        <ServiceCard v-for="item in data" :key="item.id" :item="item">
        </ServiceCard> </template
    ></KCatalog>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Service } from "types";
import { defineComponent, ref } from "vue";
import { useServicesFetcher } from "../composables/useServicesFetcher";
import ServiceCard from "@/components/ServiceCard.vue";

export default defineComponent({
  name: "ServiceCatalog",
  components: { ServiceCard },
  setup() {
    return {
      fetchServices: useServicesFetcher(),
      searchQuery: ref(""),
    };
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

.service-catalog {
  .k-catalog-page {
    grid-gap: var(--spacing-xl);
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)) !important;

    @include respond-to("small") {
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)) !important;
    }

    .card-pagination-bar {
      text-align: center;
      flex-direction: column;
      gap: 12px;

      @include respond-to("small") {
        text-align: left;
        flex-direction: row;
      }
    }
  }
}
</style>
