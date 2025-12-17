
const express = require("express")
const mongoose = require("mongoose")
const app = express()
require("dotenv").config()

const port = 3000

app.use(express.json())

const bookSchema = mongoose.Schema({
    bookName: {
        type: String,
        required: true
    },
    countInStock: {
        type: Number,
        required: true
    }
})

BookModel = mongoose.model("Book", bookSchema)


app.post("/book", async(req, res) => {
    try {
    const newBook = await BookModel.create(req.body)
    res.status(201).json(newBook)

    } catch (error) {
        res.status(400).json({message: error.message})
    }
    
}) 

app.get("/book", async(req, res) => {
    try {
    const bookList = await BookModel.find()
    res.status(200).send(bookList)

    } catch (error) {
      res.status(400).send({message: error.message}) 
    }
    
})

app.get("/book/:id", async(req, res) => {
   try {
    const { id } = req.params
    const book = await BookModel.findById(id)
    res.status(200).json(book)

   } catch (error) {
    res.status(400).send({message: error.message})
   }
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})



const connectionString = process.env.CONNECTION_STRING

mongoose.connect(connectionString)
.then(() => console.log("Connection to MongoDb ^_^"))
.catch((error) => console.log(error))

