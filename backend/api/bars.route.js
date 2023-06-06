import express from "express";

const router = express.Router();

router.route("/").get((req, res) => res.send("It's just the beginning \\o/"));

export default router;
