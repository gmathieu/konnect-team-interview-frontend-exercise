import axios from "axios";
import { Service } from "types";

export function useServicesFetcher() {
  return async (payload: { page: number; pageSize: number; query: string }) => {
    const response = await axios.get("/api/services", {
      params: { q: payload.query || undefined },
    });
    const services: Service[] = response.data;
    return {
      data: services.slice(
        Math.max(payload.page - 1, 0) * payload.pageSize,
        payload.page * payload.pageSize
      ),
      total: services.length,
    };
  };
}
