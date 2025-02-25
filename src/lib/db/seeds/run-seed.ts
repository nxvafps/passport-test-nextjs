import seed from "./seed";
import connection from "../connection";
import { Pool } from "pg";

const { pool }: { pool: Pool } = connection;

const runSeed = async (): Promise<void> => {
  try {
    await seed();
    console.log("Database seeded successfully");
  } catch (err) {
    console.error(
      "Error seeding database:",
      err instanceof Error ? err.message : err
    );
  } finally {
    await pool.end();
  }
};

void runSeed();
