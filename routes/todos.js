const express = require("express");
const router = express.Router();
const pool = require("../db");


// GET all todos
router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM todos ORDER BY id");
  res.json(result.rows);
});


// GET single todo
router.get("/:id", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM todos WHERE id=$1",
    [req.params.id]
  );

  res.json(result.rows[0]);
});


// CREATE todo
router.post("/", async (req, res) => {
  const { title } = req.body;

  const result = await pool.query(
    "INSERT INTO todos(title) VALUES($1) RETURNING *",
    [title]
  );

  res.json(result.rows[0]);
});


// UPDATE todo
router.put("/:id", async (req, res) => {
  const { title, completed } = req.body;

  const result = await pool.query(
    "UPDATE todos SET title=$1, completed=$2 WHERE id=$3 RETURNING *",
    [title, completed, req.params.id]
  );

  res.json(result.rows[0]);
});


// DELETE todo
router.delete("/:id", async (req, res) => {
  await pool.query(
    "DELETE FROM todos WHERE id=$1",
    [req.params.id]
  );

  res.json({ message: "Todo deleted" });
});

module.exports = router;