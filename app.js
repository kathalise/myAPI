const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const articleSchema = {
    title: String,
    content: String,
};

const Article = mongoose.model("Article", articleSchema);

const article = new Article({
    _id: "5c18f35cde40ab6cc551cd60",
    title: "Jack Bauer",
    content:
        "Jack Bauer once stepped into quicksand. The quicksand couldn't escape and nearly drowned.",
    __v: 0,
});

// article.save();

app.listen(8080, function () {
    console.log("App is listening on port 8080");
});
