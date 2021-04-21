const mongoose = require("mongoose")
const Category = require("./Category")

const articleSchema = new mongoose.Schema({
    title: { type: String, minlength: 3, maxlength: 120, trim: true, required: true },
    imageUrl: { type: String, minlength: 3, maxlength: 256, required: true },
    thumbnailUrl: { type: String, minlength: 3, maxlength: 256, required: true },
    description: { type: String, minlength: 300, maxlength: 2500, required: true },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        validate: {
            validator: async function(id) {
                const category = await Category.findById(id)
                if (!category) return false
                return true
            }, 
            message: "There is no category with such id!"
        },
        required: true
    },
    viewCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    relatedArticles: [{
        type: mongoose.Types.ObjectId,
        ref: "Article",
        validate: {
            validator: async function(id) {
                const article = await Article.findById(id)
                if(!article) return false
                return true
            },
            message: "There should be 3 available related articles!"
        }
    }]
})



const Article = mongoose.model("Article", articleSchema)

module.exports = Article