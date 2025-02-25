const crypto = require("crypto");
const { pool } = require("../connection");

const seed = async () => {
  await pool.query(`
    DROP TABLE IF EXISTS todos CASCADE;
    DROP TABLE IF EXISTS federated_credentials CASCADE;
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS session CASCADE;
    
    CREATE TABLE session (
      sid varchar NOT NULL COLLATE "default",
      sess json NOT NULL,
      expire timestamp(6) NOT NULL,
      CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
    );
    
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE,
      hashed_password BYTEA,
      salt BYTEA,
      name VARCHAR(255),
      email VARCHAR(255) UNIQUE,
      email_verified BOOLEAN
    );
    
    CREATE TABLE federated_credentials (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id),
      provider VARCHAR(255) NOT NULL,
      subject VARCHAR(255) NOT NULL,
      UNIQUE (provider, subject)
    );
  `);

  const salt = crypto.randomBytes(16);
  const hashedPassword = crypto.pbkdf2Sync(
    "letmein123",
    salt,
    310000,
    32,
    "sha256"
  );

  await pool.query(
    `
    INSERT INTO users (username, hashed_password, salt)
    VALUES ($1, $2, $3)
    ON CONFLICT (username) DO NOTHING
  `,
    ["alice", hashedPassword, salt]
  );
};

module.exports = seed;
