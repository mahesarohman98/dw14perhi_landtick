require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.SERVER_PORT;
const routes = require("./api/v1/routes");
const cors = require("cors");

app.use(express.json());

app.use(cors());

// app.use("/api/v1/users", routes);
app.use("/api/v1", routes);

// error handling
app.use((req, res, next) => {
  const error = new Error("not found");
  error.status = 404;
  next(error);
});

// app.use((error, req, res, next) => {
//   if (err.name === "UnauthorizedError") {
//     res.status(401).json({ message: "You are not authorized." });
//   } else {
//     next(err);
//   }
// });

app.listen(port, () => console.log(`Listening on port ${port}`));
