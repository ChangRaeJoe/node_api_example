

const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.get('/', (req, res) => {
    console.log(req.headers);
    res.send('Hello World!'+req.query)
})

app.post('/', (req, res) => {
    res.send(req.body)
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))