var express = require('express'),
    app     = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    reportsController = require('./server/controllers/reports-controller');

mongoose.connect('mongodb://localhost:27017/wakeupcall');

app.use(bodyParser());
app.get(/(\/|\/report|\/home|\/admin)$/, function (req, res) {
    res.sendfile(__dirname + '/client/views/index.html');   
});

app.use('/dist', express.static(__dirname + '/dist'));
app.use('/lib', express.static(__dirname + '/bower_components'));
app.use('/views', express.static(__dirname + '/client/views'));


app.get('/api/reports', reportsController.list);
app.post('/api/reports', reportsController.create);

app.listen(3000, function() {
    console.log('listening');
});