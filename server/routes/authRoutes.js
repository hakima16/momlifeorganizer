const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  console.log("Received:", req.body); // ⭐ DEBUG — shows what backend receives

  if (username === "web215user" && password === "LetMeIn!") {
    return res.json({ success: true });
  }

  res.status(401).json({ success: false, message: "Invalid credentials" });
});

module.exports = router;




