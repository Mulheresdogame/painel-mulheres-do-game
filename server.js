
const express = require("express");
const basicAuth = require("express-basic-auth");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.use(basicAuth({
  users: { "Mendel1122": "1@Mendel" },
  challenge: true
}));

app.use(express.static("public"));

app.get("/api/candidaturas", async (req, res) => {
  const { data, error } = await supabase.from("candidaturas").select("*").order("id", { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.listen(PORT, () => console.log("Painel rodando na porta " + PORT));
