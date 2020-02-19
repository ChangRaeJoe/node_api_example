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

app.get('/users', (req, res, next) => {
    req.query.limit = req.query.limit || 10
    const limitNum = parseInt(req.query.limit);
    if(!limitNum) {
        res.statusCode = 400
        return res.send()
    
    }
     
    res.json(users.slice(0, limitNum))
})

app.get('/users/:id', (req, res, next)=>{
    const id = parseInt(req.params.id)

    if (!id) {
        res.statusCode = 400
        return res.send()
    }
    const filtered = users.filter((user)=>{
        if (id === user.id) return true
    })[0]

    if (!filtered) {
        return res.status(404).end()
    }

    res.json(filtered)
})

app.delete('/users/:id', (req, res, next)=>{
    const id = parseInt(req.params.id)

    if (!id) {
        return res.status(400).end()
    }

    const deleted = users.filter(user => {
        return id !== user.id
    })

    if (deleted.length === users.length) {
        return res.status(404).end()
    }

    users = deleted
    res.status(204).end()
})

app.post('/users', (req, res, next) => {
    const name = req.body.name

    if(!name) {
        return res.status(400).end()
    }

    const overlap = users.filter(user => {
        return user.name === name
    })
    if (overlap.length > 0) {
        return res.status(409).end()
    }

    const tmpUser = {
        id: Date.now(),
        name: name
    }

    users.push(tmpUser)
    res.status(201).json(tmpUser)
})

app.put('/users', (req, res, next) => {
    const id = parseInt(req.body.id)
    const name = req.body.name
    if(!id || !name) {
        return res.status(400).end()
    }

    const searched = users.filter(user => {
        return user.id === id
    })

    if(searched.length == 0) {
        return res.status(404).end()
    }
    res.status(200).json({id, name})
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