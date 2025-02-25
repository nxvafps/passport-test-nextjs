const seed = require("./seed.js");
const { pool } = require("../connection.js");

const runSeed = async () => {
  try {
    await seed();
    console.log("Database seeded successfully");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await pool.end();
  }
};

runSeed();
