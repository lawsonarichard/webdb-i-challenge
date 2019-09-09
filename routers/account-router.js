const express = require("express");
const db = require("../data/dbConfig");

const router = express.Router();

// GET ALL ACCOUNTS
router.get("/", (req, res) => {
  db("accounts")
    .then(accounts => res.json(accounts))
    .catch(error =>
      res.status(500).json({ message: "Could not list accounts" })
    );
});

// GET ACCOUNTS BY ID
router.get("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .then(account => {
      res.status(200).json(account);
    })
    .catch(err =>
      res.status(500).json({ error: `Could not find an account with that ID` })
    );
});

// POST NEW ACCOUNT, REQUIRES DATA
router.post("/", (req, res) => {
  const postData = req.body;
  // validate the data before insert
  db("accounts")
    .insert(postData, "id")
    .then(([id]) => {
      db("accounts")
        .where({ id })
        .first()
        .then(account => {
          res.status(200).json({ message: "New post created!" });
        });
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: `Could not create a new account, try again!` })
    );
});

// UPDATE ACCOUNT WITH ID
router.put("/:id", (req, res) => {
  const updatePost = req.body;
  const { id } = req.params;
  db("accounts")
    .where({ id })
    .update(updatePost)
    .then(account => {
      res
        .status(200)
        .json({ message: `updated Account ${id} with the changes` });
    })
    .catch(err =>
      res.status(500).json({ error: `Could not find an account with that ID` })
    );
});

// DELETE ACCOUNT WITH ID
router.delete("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .del()
    .then(account => {
      res.status(200).json({ message: `deleted Account with ${id}` });
    })
    .catch(err =>
      res.status(500).json({ error: `Could not delete the account` })
    );
});

module.exports = router;
