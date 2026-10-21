import express from "express";
import cors from "cors";

const app = express();
app.use(express.json({ limit: "1mb" }));
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "").split(",").map(s => s.trim()).filter(Boolean);
app.use(cors({ origin(origin, cb) {
  if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
  return cb(new Error("Origin not allowed"));
}}));
app.get("/health", (_req, res) => res.json({ ok: true, service: "MAK AI Assistant API" }));
app.post("/api/assistant", async (req, res) => {
  try {
    const { role = "business", task } = req.body || {};
    if (typeof task !== "string" || task.trim().length < 3) return res.status(400).json({ error: "Provide a task of at least 3 characters." });
    if (task.length > 12000) return res.status(413).json({ error: "Task is too long." });
    if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_MODEL) return res.status(503).json({ error: "Set OPENAI_API_KEY and OPENAI_MODEL in backend environment variables." });
    const roles = {
      business: "You are a practical AI business planner for Mithilesh Addhyan Kendram (MAK), an AI tech agency and e-learning platform in Bengaluru. Give concise, actionable plans.",
      marketing: "You are MAK's marketing assistant. Draft specific, honest marketing content and never invent customer results.",
      sales: "You are MAK's sales assistant. Create professional outreach and lead qualification drafts; do not claim messages were sent.",
      support: "You are MAK's customer support assistant. Write helpful, respectful responses and do not promise unapproved refunds or commitments.",
      product: "You are MAK's product and engineering assistant. Produce clear requirements, implementation steps, and test checklists.",
      analytics: "You are MAK's analytics assistant. Distinguish provided facts from assumptions and never fabricate metrics."
    };
    const response = await fetch(process.env.OPENAI_BASE_URL || "https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": "Bearer " + process.env.OPENAI_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ model: process.env.OPENAI_MODEL, messages: [
        { role: "system", content: roles[role] || roles.business },
        { role: "user", content: task.trim() }
      ], temperature: 0.6 })
    });
    const data = await response.json();
    if (!response.ok) return res.status(502).json({ error: data.error?.message || "AI provider request failed." });
    return res.json({ answer: data.choices?.[0]?.message?.content || "No answer returned." });
  } catch (err) {
    return res.status(500).json({ error: "Server error while generating response." });
  }
});
const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log("MAK AI Assistant API listening on " + port));