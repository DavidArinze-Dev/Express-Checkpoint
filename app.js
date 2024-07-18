const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

//Express App
const app = express();

//Connect to MongoDB
const dbURI =
  "mongodb+srv://david:qwertyu1@cluster0.hnmgjiq.mongodb.net/tutorials?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//Register View Engine
app.set("view engine", "ejs");

//listen for requests
// app.listen(3000);

//Middleware & Static Files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes
app.get(["/", "/index", "/index.html"], (req, res) => {
  res.render("index", { title: "Home"});
  // res.redirect("/blogs");
});

app.get(["/contact", "/contact.html"], (req, res) => {
  res.render("contact", { title: "Contact" });
});

app.get(["/services", "/services.html"], (req, res) => {
  res.render("services", { title: "Services" });
});

// Blog Routes
app.get(["/blogs", "/blogs.html"], (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blogs", { title: "Blog", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

//Create Blog
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create A New Blog" });
});

//Redirects
app.get("/contact-us", (req, res) => {
  res.redirect("/contact");
});

404;
app.use((req, res) => {
  res.status(404).render("404", { title: "404 Not Found" });
});