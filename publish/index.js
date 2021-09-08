var fallback = require('express-history-api-fallback')
var express = require('express')
var app = express()

app.use('/',express.static(__dirname))
app.use('/js',express.static(__dirname + '/js'))
app.use('/img',express.static(__dirname + '/img'))

app.use(fallback('index.html', { root: __dirname }))
app.listen(8080);
