export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  asset_url?: string;
  createdAt: Date;
  updatedAt: Date;
}
