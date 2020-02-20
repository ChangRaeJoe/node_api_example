const express = require('express')
const app = express()

var bodyParser = require('body-parser')
const logger= require('morgan')
const userRouter = require('./api/user')

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/users', userRouter)


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