const express = require('express');
const app = express();
const port = 3001;
const cors = require("cors");
const http = require("http");
const predictRouter = require("./clarifai");
const predictRouterBytes = require("./clarifaiBytes");
const Router = require('./routes/users.routes');
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/smart-brainDB")
  .then(() => console.log("Connected to SmartBrainDB"))
  .catch((err) => console.log(err));
  
const server = http.createServer(app);

app.use(express.urlencoded({limit: '20mb', extended: true}));
app.use(express.json({ limit: '20mb' }));
app.use(cors());

app.use(Router);
app.use("/predict", predictRouter);
app.use("/predict-bytes", predictRouterBytes);

server.listen(port, () => console.log(`Server running on port ${port}`));