const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

// 👇 Serve frontend from public folder
app.use(express.static(path.join(__dirname, "public")));

let votes = { A: 0, B: 0 };

// Vote API
app.post("/vote", (req, res) => {
    const { candidate } = req.body;

    if (!votes.hasOwnProperty(candidate)) {
        return res.status(400).json({ message: "Invalid candidate" });
    }

    votes[candidate]++;
    res.json({ message: "Vote counted" });
});

// Results API
app.get("/results", (req, res) => {
    res.json(votes);
});

// 👇 Serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));