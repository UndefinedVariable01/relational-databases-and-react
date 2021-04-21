const express = require("express")
const router = express.Router()
const Article = require("../models/Article")

router.get("/", async(req, res) => {
    const [firstArticleId] = await Article.find().limit(1).select("_id")
    if (!firstArticleId) return res.send("No document was found!")
    res.json(firstArticleId)
})

router.get("/:id", async (req, res) => {
    const article = await Article.findById(req.params.id).select("title imageUrl description relatedArticles")
    if (!article) return res.status(404).send("There is no such article with this id")

    const relatedArticles = []
    for (let relatedArticleId of article.relatedArticles) {
        const relatedArticle = await Article.findById(relatedArticleId).
            select("title thumbnailUrl category viewCount commentCount").
            populate("category", "-_id title")

        relatedArticles.push(relatedArticle)
    }

    article.relatedArticles = relatedArticles
    res.json(article)
})

module.exports = router