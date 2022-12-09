import { Metric } from "./Metric";
import { Version } from "./Version";

export type ServiceType = "REST" | "HTTP";

export interface Service {
  id: string;
  name: string;
  type: ServiceType;
  published: boolean;
  description: string;
  configured: boolean;
  versions: Version[];
  metrics: Metric | undefined;
}
