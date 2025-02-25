import connection from "../connection";
const { pool } = connection;
import crypto from "crypto";

export async function verifyUser(username: string, password: string) {
  try {
    const result = await pool.query(
      "SELECT id, username, hashed_password, salt FROM users WHERE username = $1",
      [username]
    );

    const user = result.rows[0];
    if (!user) return false;

    const hashedInputPassword = crypto.pbkdf2Sync(
      password,
      user.salt,
      310000,
      32,
      "sha256"
    );

    const match =
      Buffer.compare(hashedInputPassword, user.hashed_password) === 0;

    if (!match) return false;

    return {
      id: user.id,
      username: user.username,
    };
  } catch (error) {
    console.error("Error verifying user:", error);
    throw error;
  }
}

export async function findUserById(id: number) {
  try {
    const result = await pool.query(
      "SELECT id, username FROM users WHERE id = $1",
      [id]
    );

    const user = result.rows[0];
    if (!user) return false;

    return {
      id: user.id,
      username: user.username,
    };
  } catch (error) {
    console.error("Error finding user by id:", error);
    throw error;
  }
}

export async function createUser(
  username: string,
  password: string,
  name: string,
  email: string
) {
  try {
    const salt = crypto.randomBytes(16);
    const hashedPassword = crypto.pbkdf2Sync(
      password,
      salt,
      310000,
      32,
      "sha256"
    );

    const result = await pool.query(
      "INSERT INTO users (username, hashed_password, salt, name, email) VALUES ($1, $2, $3, $4, $5) RETURNING id, username",
      [username, hashedPassword, salt, name, email]
    );

    return {
      id: result.rows[0].id,
      username: result.rows[0].username,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
