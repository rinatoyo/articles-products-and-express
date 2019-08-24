"use strict";
const express = require("express");
const router = express.Router();
const prodDB = require("./../db/products.js");

router.route("/new").get((req, res) => {
  res.render("new");
});

router.route("/:id/edit").get((req, res) => {
  const getProdById = prodDB.getProd(req.params.id);
  res.render("edit", getProdById);
});

router
  .route("/:id")
  .get((req, res) => {
    const getProdById = prodDB.getProd(req.params.id);
    res.render("product", getProdById);
  })
  .put((req, res) => {
    const prodID = parseInt(req.params.id);
    const prodName = req.body.name;
    const prodPrice = req.body.price;
    const prodInv = req.body.inventory;
    const editProd = prodDB.edit(prodID, prodName, prodPrice, prodInv);
    res.render("product", editProd);
  })
  .delete((req, res) => {
    console.log("delete req body", req.params.id);
    prodDB.deleteItem(req.params.id);
    res.redirect("/products");
  });

router
  .route("/")
  .get((req, res) => {
    const allProducts = prodDB.retrieveAll();
    res.render("index", allProducts);
  })
  .post((req, res) => {
    prodDB.create(req.body);
    res.redirect("/products");
  });

// // function usersTag(req, res, next) {
// //   console.log("tagged");
// //   next();
// // }

// // //middleware applied to every route in this folder
// // router.use(usersTag);

// //localhost:8080/users
// router.get("/", (req, res) => {
//   //   res.send(users);
//   res.render("users", { users: users });
// });

// //localhost:8080/users
// router.post("/", (req, res) => {
//   console.log(req.body);
//   users.push(req.body.name);
//   res.send(users);
// });

// //localhost:8080/users/:id
// router.delete("/:id", (req, res) => {
//   console.log(req.params.id);
//   users = users.filter(current => {
//     return current !== req.params.id;
//   });
//   res.send(users);
// });

module.exports = router;
