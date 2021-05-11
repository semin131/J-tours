const express = require('express')
const fs = require('fs')
const morgan = require('morgan')

const app = express()

// 1) MIDDELWARE
// middleware - mes req, res
app.use(express.json())

app.use(morgan('dev'))

app.use((req, res, next) => {
    console.log("Hello from the middleware")
    next()
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    next()
})

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

// 2) ROUTE HANDLERS
const getAllTours = (req, res) => {
    console.log(req.requestTime)

    res.json({
        status: "success",
        requested: req.requestTime,
        data: { tours }
    })
}

const createTour = (res, req) => {
    console.log(req.params)

    // po e marrim id-n dhe po e konvertojm ne string
    const id = req.params.id * 1
    const tour = tours.find(el => el.id === id)

    if (!tour) {
        return res.json({
            status: "fail",
            message: "Invalid Id"
        })
    }

    res.json({
        status: "success",
        data: {
            tour
        }
    })
}


app.get('/api/v1/tours', (req, res) => {
    res.json({
        status: "success",
        data: { tours }
    })
})



app.get('/api/v1/tours/:id', (res, req) => {
    console.log(req.params)

    // po e marrim id-n dhe po e konvertojm ne string
    const id = req.params.id * 1
    const tour = tours.find(el => el.id === id)

    if (!tour) {
        return res.json({
            status: "fail",
            message: "Invalid Id"
        })
    }

    res.json({
        status: "success",
        data: {
            tour
        }
    })
})

app.post('/api/v1/tours', (req, res) => {
    //  console.log(req.body)

    const newId = tours[tours.length - 1].id + 1
    const newTour = Object.assign({ id: newId }, req.body)

    tours.push(newTour)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.json({
            status: "Succes",
            data: {
                tour: newTour

            }
        })
    })

})

const getAllTours = (req, res) => {
    res.json({
        status: "error",
        message: "this rout is not yet definde"
    })
}

const getUsers = (req, res) => {
    res.json({
        status: "error",
        message: "this rout is not yet definde"
    })
}

const createUsers = (req, res) => {
    res.json({
        status: "error",
        message: "this rout is not yet definde"
    })
}

const updateUsers = (req, res) => {
    res.json({
        status: "error",
        message: "this rout is not yet definde"
    })
}

const deleteUsers = (req, res) => {
    res.json({
        status: "error",
        message: "this rout is not yet definde"
    })
}

app
    .route("/api/v1.tours")
    .get(getAllTours)
    .post(createTour)

app.patch('/.api/v1/tours/:id', (req, res) => {

    const id = req.params.id * 1
    if (id > tours.length) {
        return res.json({
            status: "fail",
            message: "Invalid ID"
        })
    }


    res.json({
        status: "success",
        data: {
            tour: "Updated tour"
        }
    })

})

app.delete('/api/v1/tours/:id', (req, res) => {

    const id = req.params.id * 1
    if (id > tours.length) {
        return res.json({
            status: "fail",
            message: "Invalid ID"
        })
    }

    res.json({
        status: "success",
        data: "null"
    })

})



app.listen(3000, () => {
    console.log("Server is listening")
})