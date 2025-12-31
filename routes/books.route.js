
const express = require("express")
const mongoose = require("mongoose")
const BookModel = require("../models/books.model")
const { body, validationResult} = require("express-validator")

const router = express.Router()


router.post("/", async(req, res) => {
    try {
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
