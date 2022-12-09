import { User } from "./User";

export interface Version {
  id: string;
  name: string;
  description: string;
  developer: User | undefined;
  updated_at: Date;
}
