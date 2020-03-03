const express = require("express");
const router = express.Router();

const ticketController = require("../controllers/ticket");
const orderController = require("../controllers/order");
const authController = require("../controllers/auth");

const { auth } = require("../middleware/auth");

router.get("/tickets", ticketController.findAll);

router.post("/order/:id", orderController.create);
router.get("/my_tickets", auth, orderController.todayTicket);

router.post("/auth/login", authController.login);

router.post("/auth/register", authController.register);

module.exports = router;
