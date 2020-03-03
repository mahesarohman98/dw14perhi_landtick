const express = require("express");
const router = express.Router();

const ticketController = require("../controllers/ticket");
const orderController = require("../controllers/order");

router.get("/tickets", ticketController.findAll);

router.post("/order/:id", orderController.create);

module.exports = router;
