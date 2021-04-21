const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    title: { type: String, minlength: 3, maxlength: 64, trim: true, required: true }
})

const Category = mongoose.model("Category", categorySchema)

module.exports = Category