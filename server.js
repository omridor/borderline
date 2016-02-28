var express = require('express'),
    app     = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    reportsController = require('./server/controllers/reports-controller');

mongoose.connect('mongodb://localhost:27017/wakeupcall');

app.use(bodyParser());
app.get('/', function (req,res) {
    res.sendfile(__dirname + '/client/views/index.html');   
});

app.use('/js', express.static(__dirname + '/client/js'));
app.use('/lib', express.static(__dirname + '/bower_components'));

app.get('/api/reports', reportsController.list);
app.post('/api/reports', reportsController.create);

app.listen(3000, function() {
    console.log('listening');
});