const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const UserInfo = require("./model/UserDetails");
require("./db/conn"); //We required the connection file i.e conn.js

const static_path = path.join(__dirname, "../public");
app.use(express.static(static_path));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//setting hbs files
app.set("view engine", "hbs");

//setting up views folder path//
const views_path = path.join(__dirname, "/templates/views");
//console.log(views_path);
app.set("views", views_path);

//setting up partials folder path//
const partials_path = path.join(__dirname, "/templates/partials");
//console.log(partials_path);
hbs.registerPartials(partials_path);

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  // console.log("its running");
  res.render("index");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.post("/register", async (req, res) => {
  try {
    const { username, email, phone_no, password } = req.body;
    console.log(username);

    const UserDetails = new UserInfo({
      username: req.body.username,
      email: req.body.email,
      phone_no: req.body.phone_no,
      password: req.body.password,
    });
    const registerinfo = await UserDetails.save();

    res.status(200).render("login");
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const loginemail = req.body.email;
    const loginpassword = req.body.password;
    const userdetail = await UserInfo.findOne({ email: loginemail });

    if (userdetail == null) {
      res.send("login unauthenticated");
    } else {
      if (userdetail.password == loginpassword) {
        res.render("about", {
          id: userdetail.id,
          name: userdetail.username,
          email: userdetail.email,
          phone: userdetail.phone_no,
          password: userdetail.password,
        });
      } else {
        res.send("login unauthenticated");
        console.log("login unauthenticated");
      }
    }
  } catch (error) {
    console.log(error);
  }
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.listen(PORT, (req, res) => {
  console.log("server is running");
});
