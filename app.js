const express = require('express')
const fs = 

const app = express()


app.get('/', (req, res) => {
    res.json({
        message: "Hello from the server side",
        app: "Jtours"
    })
})

app.post('/', (req, res) => {
    res.send("You can post on this URL")
})

const tours = JSON.parse(fs.readFileSync('${__dirname}/dev-data/data/tours-simple.js'))

app.listen(3000, () => {
    console.log("Server is listening")
})