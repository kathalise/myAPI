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

// const article = new Article({
//     _id: "5c18f35cde40ab6cc551cd60",
//     title: "Jack Bauer",
//     content:
//         "Jack Bauer once stepped into quicksand. The quicksand couldn't escape and nearly drowned.",
//     __v: 0,
// });

// article.save();

/////// Chaining methods

app.route("/articles")
    .get(function (req, res) {
        Article.find(function (err, foundArticles) {
            if (!err) {
                res.send(foundArticles);
            } else {
                res.send(err);
            }
        });
    })
    .post(function (req, res) {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content,
        });

        newArticle.save(function (err) {
            if (!err) {
                res.send("Article added to DB!");
            } else {
                res.send(err);
            }
        });
    })
    .delete(function (req, res) {
        Article.deleteMany(function (err) {
            if (!err) {
                res.send("Articles have been deleted!");
            } else {
                res.send(err);
            }
        });
    });

////// HTTP Verbs ///////
// app.get("/articles");
// app.post("/articles");
// app.delete("/articles");
/////////////////////////

app.listen(8080, function () {
    console.log("App is listening on port 8080");
});
