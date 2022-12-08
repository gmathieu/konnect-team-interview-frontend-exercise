import axios from "axios";
import { defineStore } from "pinia";
import { Service } from "types";

export interface ServicesState {
  fetched: boolean;
  lookup: Partial<Record<string, Service>>;
  ids: string[];
}

export const useServicesStore = defineStore({
  id: "services",
  state(): ServicesState {
    return {
      lookup: {},
      ids: [],
      fetched: false,
    };
  },
  actions: {
    async deleteById(id: string) {
      this.$patch(() => {
        delete this.lookup[id];
        const index = this.ids.indexOf(id);
        if (index > -1) this.ids.splice(index, 1);
      });
      await axios.delete(`/api/service/${id}`);
    },
    async fetchOnce() {
      if (this.fetched) {
        return this.ids.reduce<Service[]>((output, id) => {
          const service = this.lookup[id];
          if (service) output.push(service);
          return output;
        }, []);
      }
      const services = await fetchServices();
      const lookup: Partial<Record<string, Service>> = {};
      const ids: string[] = [];
      services.forEach((service) => {
        lookup[service.id] = service;
        ids.push(service.id);
      });
      this.$patch({
        fetched: true,
        lookup,
        ids,
      });
      return services;
    },
    async fetcher(payload: { page: number; pageSize: number; query: string }) {
      const services = payload.query
        ? await fetchServices(payload.query)
        : await this.fetchOnce();
      return {
        data: paginate(services, payload.page, payload.pageSize),
        total: services.length,
      };
    },
  },
});

async function fetchServices(query?: string) {
  const response = await axios.get("/api/services", {
    params: { q: query || undefined },
  });
  return response.data as Service[];
}

function paginate<T>(services: T[], page: number, pageSize: number): T[] {
  return services.slice(Math.max(page - 1, 0) * pageSize, page * pageSize);
}
