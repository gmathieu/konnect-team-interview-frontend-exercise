<template>
  <KTable disable-pagination :fetcher="fetcher" :headers="headers">
    <template #version="{ rowValue }">
      <span class="bold-600">{{ rowValue }}</span>
    </template>
    <template #type="{ rowValue }">
      <KBadge appearance="info" shape="rectangular">{{ rowValue }}</KBadge>
    </template>
    <template #user="{ rowValue }: { rowValue: VersionRow['user'] }">
      <span class="d-flex align-items-center bold-600">
        <UserAvatar class="mr-1" v-bind="rowValue"></UserAvatar>
        {{ rowValue?.name ?? "Team member" }}</span
      >
    </template>
  </KTable>
</template>

<script lang="ts">
import { TableHeader } from "@kong/kongponents/dist/types/components/KTable/KTable.vue";
import { Version, ServiceType } from "types";
import { defineComponent, PropType } from "vue";
import UserAvatar from "@/components/UserAvatar.vue";
import { formatDistanceToNow } from "date-fns";

interface VersionRow {
  version: string;
  description: string;
  type: ServiceType;
  user?: { name?: string; avatar?: string };
  updatedAt: string;
}

interface VersionTableHeader extends TableHeader {
  key: keyof VersionRow;
}

export default defineComponent({
  name: "VersionsTable",
  components: { UserAvatar },
  props: {
    type: {
      type: String as PropType<ServiceType>,
      required: true,
    },
    versions: {
      type: Object as PropType<Version[]>,
      required: true,
    },
  },
  data() {
    const headers: VersionTableHeader[] = [
      {
        key: "version",
        label: "Version",
      },
      {
        key: "description",
        label: "Description",
      },
      {
        key: "type",
        label: "Type",
      },
      {
        key: "user",
        label: "Developer",
      },
      {
        key: "updatedAt",
        label: "Updated",
      },
    ];
    return {
      headers,
    };
  },
  methods: {
    fetcher() {
      return Promise.resolve({
        data: (this.$props.versions ?? []).reduce<VersionRow[]>(
          (output, curr) => {
            output.push({
              version: `v${curr.name}`,
              description: curr.description,
              type: this.$props.type,
              user: {
                name: curr.developer?.name,
                avatar: curr.developer?.avatar,
              },
              updatedAt: formatDistanceToNow(new Date(curr.updated_at)),
            });
            return output;
          },
          []
        ),
        total: this.$props.versions?.length ?? 0,
      });
    },
  },
});
</script>
