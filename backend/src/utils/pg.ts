import { Pool } from "pg";

export const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "socialapp_db",
  password: "waihinsoe",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
