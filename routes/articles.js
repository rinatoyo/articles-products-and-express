"use strict";
const express = require("express");
const router = express.Router();
const articleDB = require("./../db/articles.js");

router.route("/new").get((req, res) => {
  res.render("articles/new");
});

router.route("/:title/edit").get((req, res) => {
  const getArtByTitle = articleDB.getArt(req.params.title);
  res.render("articles/edit", getArtByTitle);
});

router
  .route("/:title")
  .get((req, res) => {
    const getArtByTitle = articleDB.getArt(req.params.title);
    res.status(200);
    res.render("articles/article", getArtByTitle);
  })
  .put((req, res) => {
    const artTitle = req.params.title;
    const artBody = req.body.body;
    const artAuthor = req.body.author;
    const editArt = articleDB.edit(artTitle, artBody, artAuthor);
    res.render("articles/article", editArt);
  })
  .delete((req, res) => {
    articleDB.deleteArt(req.params.title);
    res.redirect("/articles");
  });

router
  .route("/")
  .get((req, res) => {
    const allArticles = articleDB.retrieveAll();
    res.status(200);
    res.render("articles/index", allArticles);
  })
  .post((req, res) => {
    console.log("req body submitted", req.body);
    if (req.body.title && req.body.body && req.body.author) {
      articleDB.create(req.body);
      res.status(200);
      res.redirect("/articles");
    } else {
      res.redirect("articles/new");
    }
  });

module.exports = router;
