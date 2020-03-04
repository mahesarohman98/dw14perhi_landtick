const express = require("express");
const router = express.Router();

const ticketController = require("../controllers/ticket");
const orderController = require("../controllers/order");
const authController = require("../controllers/auth");

const { auth } = require("../middleware/auth");

router.get("/tickets", ticketController.findAll);
router.post("/ticket", auth, ticketController.create);
router.get("/findtickets", ticketController.findTickets);

router.post("/order", auth, orderController.create);
router.get("/order/:id", auth, orderController.find);
router.put("/order/:id", auth, orderController.edit);
router.get("/my_tickets", auth, orderController.todayOrder);
router.get("/orders", auth, orderController.findAll);

router.post("/auth/login", authController.login);
router.get("/auth", auth, authController.check);

router.post("/auth/register", authController.register);

module.exports = router;
