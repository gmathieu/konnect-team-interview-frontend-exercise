<template>
  <PageLayout
    :breadcrumbs="breadcrumbs"
    :title="service?.name ? service.name : 'Unknown Service'"
  >
    <KSkeleton v-if="isLoading" />
    <KCard v-if="service" :title="`Versions (${service.versions.length})`"
      ><template #body
        ><VersionsTable
          :type="service.type"
          :versions="service.versions"
        ></VersionsTable></template
    ></KCard>
    <template #actions>
      <KDropdownMenu
        button-appearance="creation"
        label="Service actions"
        show-caret
        ><template #items>
          <KDropdownItem is-dangerous @click="confirmDelete = true">
            Delete service...
          </KDropdownItem>
        </template></KDropdownMenu
      >
      <KPrompt
        :is-visible="confirmDelete"
        message="Are you sure you want to delete this service?"
        @canceled="confirmDelete = false"
        @proceed="deleteService"
      />
    </template>
  </PageLayout>
</template>

<script lang="ts">
import { useServicesStore } from "@/stores/servicesStore";
import { defineComponent, onMounted, computed } from "vue";
import PageLayout from "@/components/PageLayout.vue";
import VersionsTable from "@/components/VersionsTable.vue";
import { BreadcrumbItem } from "@kong/kongponents/dist/types/components/KBreadcrumbs/KBreadcrumbs.vue";

export default defineComponent({
  name: "ServiceItemPage",
  components: { PageLayout, VersionsTable },
  props: {
    serviceId: { type: String, required: true },
  },
  setup(props) {
    const store = useServicesStore();

    onMounted(store.fetchOnce);

    return {
      store,
      service: computed(() => store.lookup[props.serviceId]),
      isLoading: computed(() => !store.fetched),
    };
  },
  data() {
    const breadcrumbs: BreadcrumbItem[] = [
      {
        key: "home",
        to: { path: "/" },
        title: "Services",
        text: "Services",
        icon: "serviceHub",
      },
    ];
    return {
      breadcrumbs,
      confirmDelete: false,
    };
  },
  methods: {
    deleteService() {
      this.$router.replace("/");
      this.store.deleteById(this.$props.serviceId);
      this.$toaster.open({
        appearance: "success",
        timeoutMilliseconds: 3000,
        message: "Your service was deleted successfully.",
      });
    },
  },
});
</script>
