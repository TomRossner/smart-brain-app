const express = require('express');
const app = express();
const port = 3001;
// const path = require("path");
const bcrypt = require('bcryptjs');
const cors = require("cors");
const http = require("http");
const predictRouter = require("./clarifai");
const predictRouterBytes = require("./clarifaiBytes");

app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(express.json({ limit: '50mb' }));
app.use(cors());
// app.use(express.static(path.join(__dirname, "public")));

const server = http.createServer(app)

const database = {
  users: [
    {
      id: "123",
      name: "John",
      email: "john@gmail.com",
      password: "cookies",
      entries: 0,
      joinedAt: new Date()
    },
    {
      id: "124",
      name: "Sally",
      email: "sally@gmail.com",
      password: "bananas",
      entries: 0,
      joinedAt: new Date()
    }
  ]
}

app.use("/predict", predictRouter);
app.use("/predict-bytes", predictRouterBytes);

app.get('/', (req, res) => {
  res.send(database.users);
});

app.post('/sign-in', (req, res) => {
    database.users.forEach((user) => {
      if (user.email === req.body.email && user.password === req.body.password) res.json(user);
    });
});

app.post("/register", (req, res) => {
  const {email, name, password} = req.body;
    bcrypt.hash(password, 10, function (err, hash){
      console.log("Hash", hash);
    })
  database.users.push({
    id: "126",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joinedAt: new Date()
  });
  res.json(`${database.users[database.users.length - 1].name} has been successfully registered`);
});

app.get("/profile/:id", (req, res) => {
  const {id} = req.params;
  database.users.forEach(user => {
    if (user.id === id) {
      console.log(user);
      return res.json(user);
    }
    else return res.status(400).json("User not found");
  })
});

app.put("/image", (req, res) => {
  const {id} = req.body;
  database.users.forEach(user => {
    if (user.id === id) {
      user.entries++;
      return res.json(user.entries);
    }
    else return ("User not found");
  })
})

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});