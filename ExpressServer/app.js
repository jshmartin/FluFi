const express = require("express");
const admin = require("firebase-admin");
const router = express.Router();

const my_databaseURL = "https://<your-firebase-project-id>.firebaseio.com";

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: my_databaseURL,
});

// Create a new user in Firebase Authentication
router.post("/users", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    res.status(201).json({
      message: "User created successfully",
      data: userRecord.toJSON(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get a user from Firebase Authentication
router.get("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const userRecord = await admin.auth().getUser(userId);

    res.status(200).json({
      message: "User retrieved successfully",
      data: userRecord.toJSON(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
