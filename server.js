var express = require('express'),
    app     = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    reportsController = require('./server/controllers/reports-controller');

process.env.PWD = process.cwd();

var dbURI = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/wakeupcall';
console.log('About to connect to DB: ' + dbURI);
mongoose.connect(dbURI);
console.log('Connected to DB');

app.use(bodyParser());
app.get('/api/reports', reportsController.list);
app.post('/api/reports', reportsController.create);

app.use('/dist', express.static(process.env.PWD + '/dist'));
app.use('/lib', express.static(process.env.PWD + '/bower_components'));

app.get('*', function (req, res) {
    console.log('getting index.html');
    res.sendfile(process.env.PWD + '/dist/views/index.html');   
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('listening on port ' + port);
});