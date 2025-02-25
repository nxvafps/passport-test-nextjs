import { Pool, QueryResult } from "pg";

const ENV = process.env.NODE_ENV || "development";

import dotenv from "dotenv";
dotenv.config({
  path: `${__dirname}/../../.env.${ENV}`,
});

if (!process.env.PGDATABASE) {
  throw new Error("PGDATABASE not set");
}

const pool = new Pool();

interface DbConnection {
  pool: Pool;
  query<T extends Record<string, any> = any>(
    text: string,
    params?: any[]
  ): Promise<QueryResult<T>>;
}

const connection: DbConnection = {
  pool,
  async query<T extends Record<string, any> = any>(
    text: string,
    params?: any[]
  ): Promise<QueryResult<T>> {
    return pool.query<T>(text, params);
  },
};

export default connection;
