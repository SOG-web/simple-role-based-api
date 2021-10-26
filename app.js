const cors = require("cors");
const express = require("express");
const { connect } = require("mongoose");
const { success, error } = require("consola");
const userRoute = require("./routes/users");

// Bring in the app constants
const { DB, PORT } = require("./config");

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.send("hello");
});

connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    success({ message: `Connected to the database \n${DB}`, badge: true });
  })
  .catch((error) => {
    error({
      message: `Could not connect to the database \n${error}`,
      badge: true,
    });
  });

// Start the server
app.listen(PORT, () => {
  success({
    message: `Server is running on port ${PORT}`,
    badge: true,
  });
});
