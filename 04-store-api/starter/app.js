const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");

const productsRouter = require("./routes/products");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const connectDB = require("./db/connect");

const PORT = process.env.PORT || 5000;

app.use(express.json());

//routes

app.get("/", (req, res) => {
  res.send('<h1>Store API</h1> <a href="/api/v1/products">products router</a>');
});

//product routes
app.use("/api/v1/products", productsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    //connectDB
    await connectDB(process.env.MONGO_URI);
    //start app
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.error(error);
  }
};

start();
