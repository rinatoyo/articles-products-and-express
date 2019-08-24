"use strict";
const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const app = express();
const articles = require("./routes/articles");
const products = require("./routes/products");
var methodOverride = require("method-override");
const prodDB = require("./db/products");

const PORT = 8080;

// app.use(express.static("./public")); <-- uncomment this if you want to do css / index.html

/*
 **
 **EDIT CODE BELOW, IT'S JUST COPY+PASTE FROM EXPRESS DEMO
 **
 */
app.use(methodOverride("_method"));

app.use(bodyParser.urlencoded({ extended: false })); //order matters, by this being on top, anything below will read this.
app.engine(".hbs", exphbs({ extname: ".hbs" })); //creates engine
app.set("view engine", ".hbs"); //use engine

app.get("/", (req, res) => {
  const allProducts = prodDB.retrieveAll();
  res.render("frontpage", allProducts);
});

//when you use .use('/products', you don't have to repeat /products in products routes)

app.use("/products", products);

// app.use("/articles", articles);

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
