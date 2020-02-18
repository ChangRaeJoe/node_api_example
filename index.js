

const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
const logger= require('morgan')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(logger('dev'))

app.get('/', (req, res) => {
    res.send('Hello World!'+req.query)
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))