import express from "express";
import BarsCtrl from "./bars.controller.js";

const router = express.Router();

router.route("/").get(RestaurantsCtrl.apiGetRestaurants);

export default router;
