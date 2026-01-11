
const express = require("express")
const i18next = require("i18next")
const backend = require("i18next-fs-backend")
const middleware = require("i18next-http-middleware")
const mongoose = require("mongoose")
const app = express()
require("dotenv").config()
const bookRouter = require("./routes/books.route")

const port = 3000

app.use(express.json())
app.use("/book", bookRouter)


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})



const connectionString = process.env.CONNECTION_STRING

mongoose.connect(connectionString)
.then(() => console.log("Connection to MongoDb ^_^"))
.catch((error) => console.log(error))

