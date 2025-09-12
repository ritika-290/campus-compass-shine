import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
  await client.connect();
  const db = client.db("campusmirror");
  const stressLogs = db.collection("stress_logs");

  if (req.method === "POST") {
    const { userId, stressLevel } = req.body;
    await stressLogs.insertOne({ userId, stressLevel, createdAt: new Date() });
    return res.status(200).json({ message: "Stress log saved" });
  }

  if (req.method === "GET") {
    const { userId } = req.query;
    const logs = await stressLogs.find({ userId }).toArray();
    return res.status(200).json(logs);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
