const express = require('express')
const app = express()

var bodyParser = require('body-parser')
const logger= require('morgan')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(logger('dev'))

let users = [
    {
        id: 1,
        name: "Alpha"
    },
    {
        id: 2,
        name: "Beta"
    }
]
app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/', (req, res) => {
    res.send(req.body)
})

app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
});
app.use((err, req, res, next)=>{
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
    res.render('error', { error: err });
})

module.exports = app;