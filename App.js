const express = require("express");
const morgan = require("morgan");
const store = require("./playstore.js");


const app = express();
app.use(morgan("dev"));


app.get("/app", (req, res) => {
  const genres = req.query.genres;
  const sort = req.query.sort;
  let results = store;

  if (genres !== undefined){
    if(
      genres.toLowerCase() !== "action" &&
      genres.toLowerCase() !== "puzzle" &&
      genres.toLowerCase() !== "strategy" &&
      genres.toLowerCase() !== "casual" &&
      genres.toLowerCase() !== "arcade" &&
      genres.toLowerCase() !== "card"
    ) {
      return res.status(400).send("can only filter Action,Puzzle,Strategy,Casual,Arcade, or Card")
    }

    results = store.filter(app => {
      return app.Genres.includes(
        genres.charAt(0).toUpperCase() + genres.slice(1)
      );
    });
  }

  if (sort !== undefined) {
    if (sort.toLowerCase() !== "rating" && sort.toLowerCase() !== "app") {
      return res.status(400).send("Can only sort by rating or app");
    } else if (sort.toLowerCase() === "rating") {
      results.sort(function(a, b) {
        return b.Rating - a.Rating;
      });
    } else if (sort.toLowerCase() === "app") {
      results.sort(function(a, b) {
        if (a.App < b.App) {
          return -1;
        }
        if (a.App > b.App) {
          return 1;
        }
        return 0;
      });
    }
  }

  res.json(results);
});

module.exports = app;
