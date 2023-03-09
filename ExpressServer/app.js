const express = require("express");
const admin = require("firebase-admin");
const { db } = require("./firebase");
const app = express();
const port = 1231;

app.use(express.json());

app.post("/add", async (req, res) => {
  console.log(req.body);
  const user = {
    name: req.body.name,
    age: req.body.age,
  };
  const docRef = db.collection("users").doc("profile-info");
  const res2 = await docRef.set({
    user
  });
  res.status(200).send(res2);
});

const halo_characters = {
  "Master Chief": "John-117",
  Arbiter: "Thel Vadam",
  Cortana: "Artificial Intelligence",
};

app.get("/", async (req, res) => {
  res.send("Server is Up and Running!");
});

app.get("/halo", async (req, res) => {
  res.send(halo_characters);
});

app.get("/halo/:character", async (req, res) => {
  const character = req.params.character;
  const characterInfo = halo_characters[character];
  res.send(characterInfo);
});

app.post("/halo", async (req, res) => {
  const character = req.body.character;
  const characterInfo = req.body.characterInfo;
  halo_characters[character] = characterInfo;
  res.send(halo_characters);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
