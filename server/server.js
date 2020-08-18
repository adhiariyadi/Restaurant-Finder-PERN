require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const morgan = require("morgan");
const app = express();

app.use(cors());
app.use(express.json());

// Get all Restaurants
app.get("/api/v1/restaurant", async (req, res) => {
  try {
    const result = await db.query(
      "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id"
    );
    res.status(200).json({
      status: "success",
      data: result.rows,
    });
  } catch (error) {
    console.log(error);
  }
});

// Get a Restaurant
app.get("/api/v1/restaurant/:id", async (req, res) => {
  try {
    const restaurant = await db.query(
      "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1",
      [req.params.id]
    );
    const reviews = await db.query(
      "select * from reviews where restaurant_id = $1 ORDER BY id DESC LIMIT 3",
      [req.params.id]
    );
    res.status(200).json({
      status: "success",
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Create Restaurant
app.post("/api/v1/restaurant", async (req, res) => {
  try {
    const result = await db.query(
      "INSERT INTO restaurants (name, location, price) values ($1, $2, $3) returning *",
      [req.body.name, req.body.location, req.body.price]
    );
    res.status(201).json({
      status: "success",
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
});

// Update Restaurant
app.put("/api/v1/restaurant/:id", async (req, res) => {
  try {
    const result = await db.query(
      "UPDATE restaurants set name = $1, location = $2, price = $3 where id = $4 returning *",
      [req.body.name, req.body.location, req.body.price, req.params.id]
    );
    res.status(200).json({
      status: "success",
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
});

// Delete Restaurant
app.delete("/api/v1/restaurant/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM restaurants where id = $1", [req.params.id]);
    await db.query("DELETE FROM reviews where restaurant_id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
});

// Add reviews

app.post("/api/v1/restaurant/:id/addReview", async (req, res) => {
  try {
    const result = await db.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );
    res.status(201).json({
      status: "success",
      data: result.rows[0],
    });
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
