const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();
let db = new sqlite3.Database("test.db");

const dummy_data = [
  137,
  80,
  78,
  71,
  13,
  10,
  26,
  10,
  0,
  0,
  0,
  13,
  73,
  72,
  68,
  82,
  0,
  0,
  0,
  8,
  0,
  0,
  0,
  8,
  8,
  6,
  0,
  0,
  0,
  196,
  15,
  190,
  139,
  0,
  0,
  0,
  59,
  73,
  68,
  65,
  84,
  24,
  149,
  157,
  141,
  193,
  14,
  0,
  32,
  8,
  66,
  161,
  255,
  255,
  103,
  90,
  152,
  205,
  131,
  171,
  45,
  46,
  79,
  133,
  33,
  36,
  9,
  48,
  90,
  226,
  102,
  154,
  175,
  6,
  238,
  5,
  36,
  215,
  96,
  166,
  156,
  41,
  191,
  254,
  26,
  28,
  56,
  151,
  162,
  12,
  143,
  104,
  234,
  77,
  73,
  152,
  23,
  74,
  109,
  170,
  125,
  62,
  72,
  165,
  0,
  0,
  0,
  0,
  73,
  69,
  78,
  68,
  174,
  66,
  96,
  130
];

app.get("/", function(req, res) {
  res.send("Hello World");
});

app.get("/abcd", function(req, res) {
  res.contentType("image/png");
  let buffer = new Buffer(dummy_data.length);
  for (var i = 0; i < buffer.length; i++) {
    buffer[i] = dummy_data[i];
  }

  res.end(buffer, "binary");
});

app.get("/image/:image_id", (req, res) => {
  let img = req.params["image_id"];
  db.serialize(() => {
    db.get(
      "SELECT * FROM BlueprintImages WHERE image_id=?;",
      [img],
      (err, row) => {
        if (err || row == null || Object.keys(row).length === 0)
          res.end("Image " + img + " not found!");
        else {
          res.contentType(row["content_type"]);
          res.end(row["image_blob"], "binary");
        }
      }
    );
  });
});

app.listen(3000);

console.log("End of transmission. Don't panic!");
