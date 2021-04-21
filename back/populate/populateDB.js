require("dotenv").config()
const environment = process.env.NODE_ENV
const dbAddress = process.env.DB_ADDRESS

require("../config/db")(dbAddress, environment)

const Article = require("../models/Article")
const Category = require("../models/Category")
const mockData = require("./mockData")

async function populate() {
    const categories = []
    for (let article of mockData) categories.push({ title: article.category })
    
    await Category.insertMany(categories)
    
    const categoryObjs = await Category.find().select("_id title")
    for (let article of mockData) {
        const categoryId = categoryObjs.find((c) => c.title === article.category)
        article.category = categoryId
    }

    await Article.insertMany(mockData)

    const articles = await Article.find()
    for (let article of articles) {
        const otherArticles = [...articles]
        otherArticles.splice(otherArticles.findIndex((a) => a._id === article._id), 1)
        await Article.findByIdAndUpdate(article._id, { relatedArticles: [...otherArticles.map((a) => a._id)] })
    }
}

populate().then(() => {
    console.log("Done!")
    process.exit(0)
})