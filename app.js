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

////// HTTP Verbs ///////
// app.get("/articles");
// app.post("/articles");
// app.delete("/articles");
/////////////////////////

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

app.route("/articles/:title")
    .get(function (req, res) {
        const requestedTitle = req.params.title;
        Article.findOne(
            { title: requestedTitle },
            function (err, foundArticle) {
                if (!err) {
                    res.send(foundArticle);
                } else {
                    res.send(err);
                }
            }
        );
    })
    .put(function (req, res) {
        Article.update(
            { title: req.params.title },
            { title: req.body.title, content: req.body.content },
            { overwrite: true },
            function (err, result) {
                if (!err) {
                    res.send("DB was updated!");
                } else {
                    res.send(err);
                }
            }
        );
    })
    .patch(function (req, res) {
        Article.update(
            { title: req.params.title },
            { $set: req.body },
            function (err) {
                if (!err) {
                    res.send("DB was updated!");
                } else {
                    res.send(err);
                }
            }
        );
    })
    .delete(function (req, res) {
        Article.deleteOne({ title: req.params.title }, function (err) {
            if (!err) {
                res.send("Article has been deleted from DB");
            } else {
                res.send(err);
            }
        });
    });

app.listen(8080, function () {
    console.log("App is listening on port 8080");
});
