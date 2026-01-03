
const express = require("express")
const mongoose = require("mongoose")
const BookModel = require("../models/books.model")
const { body, validationResult} = require("express-validator")

const router = express.Router()


router.post("/", 
    [
      body("bookName")
      .notEmpty().withMessage("Book name is required.")
      .isLength({min:5, max:100}).withMessage("Book name must be between 5 to 100 characters."),

      body("price")
      .notEmpty().withMessage("price is required.")
      .isFloat({min:1, max:1000}).withMessage("price must be between 1 and 1000"),
      
      body("countInStock")
      .notEmpty().withMessage("Price is required.")
      .isInt({min:1, max:255}).withMessage("Stock count must be between 1 and 255"),

      body("image")
      .notEmpty().withMessage("Image URL is required")
      .isURL().withMessage("Image must be a valid URL")

    ]
    ,async(req, res) => {
    try {
    const errors = validationResult(req)  
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const newBook = await BookModel.create(req.body)
    res.status(201).json(newBook)

    } catch (error) {
        res.status(400).json({message: error.message})
    }
    
}) 

router.get("/", async(req, res) => {
    try {
    const bookList = await BookModel.find()
    res.status(200).send(bookList)

    } catch (error) {
      res.status(400).send({message: error.message}) 
    }
    
})

router.get("/:id", async(req, res) => {
   try {
    const { id } = req.params
    const book = await BookModel.findById(id)

    if(!book){
            res.status(404).json({message: "Book Not Found!"})
        }

    res.status(200).json(book)

   } catch (error) {
    res.status(400).send({message: error.message})
   }
})

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const deletedBook = await BookModel.findByIdAndDelete(id)

        if(!deletedBook){
            res.status(404).json({message: "Book Not Found!"})
        }

        res.status(200).json("Book Deleted Successfully!")

    } catch (error) {
         res.status(400).send({message: error.message})
    }
})


router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const updatedBook = await BookModel.findByIdAndUpdate(id, req.body, {new: true})

        if(!updatedBook){
            res.status(404).json({message: "Book Not Found!"})
        }

        res.status(200).json({message: "Book Updated Successfully!", updatedBook})

    } catch (error) {
         res.status(400).send({message: error.message})
    }
})


module.exports = router
