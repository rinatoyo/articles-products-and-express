"use strict";
const express = require("express");
const router = express.Router();
const prodDB = require("./../db/products.js");

router.route("/new").get((req, res) => {
  res.render("products/new");
});

router.route("/:id/edit").get((req, res) => {
  const getProdById = prodDB.getProd(req.params.id);
  res.render("products/edit", getProdById);
});

router
  .route("/:id")
  .get((req, res) => {
    const getProdById = prodDB.getProd(req.params.id);
    res.status(200);
    res.render("products/product", getProdById);
  })
  .put((req, res) => {
    const prodID = parseInt(req.params.id);
    if (isNaN(req.body.name) && req.body.price > 0 && req.body.inventory > 0) {
      const prodName = req.body.name;
      const prodPrice = req.body.price;
      const prodInv = req.body.inventory;
      const editProd = prodDB.edit(prodID, prodName, prodPrice, prodInv);
      res.status(200);
      res.render(`products/product`, editProd);
    } else {
      res.status(500);
      res.render(`products/edit`, {
        name: req.body.name,
        price: req.body.price,
        inventory: req.body.inventory,
        errorMsg: "Error: Something is entered incorrectly!"
      });
    }
  })
  .delete((req, res) => {
    prodDB.deleteItem(req.params.id);
    res.redirect("/products");
  });

router
  .route("/")
  .get((req, res) => {
    const allProducts = prodDB.retrieveAll();
    res.status(200);
    res.render("products/index", allProducts);
  })
  .post((req, res) => {
    let hasAllData = req.body.name && req.body.price && req.body.inventory;
    if (
      hasAllData &&
      isNaN(req.body.name) &&
      !isNaN(req.body.price) &&
      !isNaN(req.body.inventory)
    ) {
      prodDB.create(req.body);
      res.status(200);
      res.redirect("/products");
    } else {
      res.status(500);
      res.render("products/new", {
        errorMsg: "Error: Something is missing or entered incorrectly!"
      });
    }
  });

module.exports = router;
