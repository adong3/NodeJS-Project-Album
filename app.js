var express = require("express");
var router = require("./controllers/router");
var formidable = require("formidable");
var app = express();
app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(express.static("./uploads"));
app.get("/", router.anotherShowIndex);
app.get("/1.html", function(req, res) {
  res.send("hello there2");
});
app.get("/up", router.uploadPage);
app.post("/up", router.doPost);
app.get("/:name", router.anotherGetSelected);
// app.get("/up", router.showIndex);

app.use(function(req, res) {
  res.render("err", { baseurl: __dirname + "/public" });
});
app.listen("3000");
