const express = require("express");
const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.json({
    message: "Hello"
  });
});

server.get("/accounts", async (req, res, next) => {
  try {
    const accounts = await db("accounts");
    res.json(accounts);
  } catch (err) {
    console.log("get", err);
    next(next);
  }
});

server.post("/accounts", async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget
    };
    const [id] = await db("accounts").insert(payload);
    const newAccount = await db("accounts")
      .where("id", id)
      .first();
    res.json(newAccount);
  } catch (err) {
    console.log("get", err);
    next(next);
  }
});

server.put("/accounts/:id", async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget
    };
    await db("accounts")
      .where("id", req.params.id)
      .update(payload);

    let newAccount = await db("accounts")
      .where("id", req.params.id)
      .first();

    res.json(newAccount);
  } catch (err) {
    console.log("get", err);
    next(next);
  }
});

server.delete("/accounts/:id", async (req, res, next) => {
  try {
    await db("accounts")
      .where("id", req.params.id)
      .del();
    res.status(204).end();
  } catch (err) {
    console.log("get", err);
    next(next);
  }
});
module.exports = server;
