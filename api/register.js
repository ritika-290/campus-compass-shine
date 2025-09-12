import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields required" });
  }

  await client.connect();
  const db = client.db("campusmirror");
  const users = db.collection("users");

  const existing = await users.findOne({ email });
  if (existing) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);
  await users.insertOne({ name, email, passwordHash: hashed, createdAt: new Date() });

  return res.status(201).json({ message: "User registered successfully" });
}
