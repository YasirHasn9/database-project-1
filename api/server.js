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
    const accounts = await db.select("*").from("accounts");
    res.json(accounts);
  } catch (err) {
    console.log("get", err);
    next(next);
  }
});
module.exports = server;
