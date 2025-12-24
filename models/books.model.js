
const mongoose = require("mongoose")

const bookSchema = mongoose.Schema({
    bookName: {
        type: String,
        required: [true, "Book name is required!"],
        minlength: [5, "Book name must be atleast 5 characters long"],
        maxlength: [100, "Book length cannot exceed 100 characters long"]
    },
    countInStock: {
        type: Number,
        required: [true, "Stock count is required!"],
        min: [1, "Stock count cannot be less that 1"],
        max: [255, "Stock count cannot exceed 255"]
    },
    price: {
        type: Number,
        required: [true, "Stock count is required!"],
        min: [1, "Price cannot be negative"],
        max: [255, "Price cannot exceed 10,000"]
    }
})

bookSchema.virtual("id").get(function (){
    return this._id.toHexString()
})

bookSchema.set("toJSON", {
    virtuals: true
})

module.exports = mongoose.model("Book", bookSchema)