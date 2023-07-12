import express from "express";
import RestaurantsController from "./restaurants.controller.js";

const router = express.Router();

// router.route("/").get((req, res) => res.send("It's just the beginning \\o/"));
router.route("/").get(RestaurantsController.apiGetRestaurants);

export default router;

//https://youtu.be/mrHNSanmqQ4?t=2768
