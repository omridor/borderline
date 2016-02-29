var express = require('express'),
    app     = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    reportsController = require('./server/controllers/reports-controller');

mongoose.connect('mongodb://localhost:27017/wakeupcall');

app.use(bodyParser());
app.get('/api/reports', reportsController.list);
app.post('/api/reports', reportsController.create);

app.use('/dist', express.static(__dirname + '/dist'));
app.use('/lib', express.static(__dirname + '/bower_components'));

app.get('*', function (req, res) {
    res.sendfile(__dirname + '/dist/views/index.html');   
});


app.listen(3000, function() {
    console.log('listening');
});