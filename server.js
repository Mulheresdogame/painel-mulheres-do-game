const express = require("express");
const cors = require("cors");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.static("."));

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.get("/painel", (req, res) => {
  res.sendFile(path.join(__dirname, "painel.html"));
});

app.get("/api/candidaturas", async (req, res) => {
  const { data, error } = await supabase.from("candidaturas").select("*").order("id", { ascending: false });
  if (error) return res.status(500).json({ error });
  res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
