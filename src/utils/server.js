const express = require('express');
const app = express();
const port = 3001;
const bcrypt = require('bcryptjs');
const cors = require("cors");

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

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

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});