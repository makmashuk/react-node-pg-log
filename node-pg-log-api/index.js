const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./db')


const app = express()
const port = 3001


app.use(cors())
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

// route for REST API
app.get('/logs', db.getLogs)
app.post('/create-log', db.createLog)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})


