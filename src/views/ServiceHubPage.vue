<template>
  <PageLayout title="Service Hub">
    <template #description>
      Organize services, manage and track versioning and API service
      documentation. <a href="#">Learn more</a>
    </template>
    <template #actions>
      <KInput
        v-model="searchQuery"
        class="mb-5"
        placeholder="Search"
        type="search"
      >
      </KInput>
    </template>
    <div class="service-catalog">
      <KCatalog :fetcher="fetchServices" :search-input="searchQuery"
        ><template #body="{ data }: { data: Service[] }">
          <ServiceCard v-for="item in data" :key="item.id" :item="item">
          </ServiceCard> </template
      ></KCatalog>
    </div>
  </PageLayout>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Service } from "types";
import { defineComponent, ref } from "vue";
import ServiceCard from "@/components/ServiceCard.vue";
import PageLayout from "@/components/PageLayout.vue";
import { useServicesStore } from "../stores/servicesStore";

export default defineComponent({
  name: "ServiceHubPage",
  components: { ServiceCard, PageLayout },
  setup() {
    return {
      fetchServices: useServicesStore().fetcher,
      searchQuery: ref(""),
    };
  },
});
</script>

<style lang="scss">
@import "../styles/mixins.scss";

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
