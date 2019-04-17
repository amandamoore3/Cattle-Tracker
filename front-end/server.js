var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
app = express();


app.use("/", serveStatic(path.join(__dirname, '/static/')))

app.get('/dist/build.js', function(req, res) {
  res.sendFile(__dirname + '/dist/build.js')
})
app.get('/node_modules/bootstrap/dist/css/bootstrap.min.css', function(req, res) {
  res.sendFile(__dirname + '/node_modules/bootstrap/dist/css/bootstrap.min.css')
})

app.get('/node_modules/firebaseui/dist/firebaseui.css', function(req, res) {
  res.sendFile(__dirname + '/node_modules/firebaseui/dist/firebaseui.css')
})

app.get('/node_modules/font-awesome/css/font-awesome.css', function(req, res) {
  res.sendFile(__dirname + '/node_modules/font-awesome/css/font-awesome.css')
})

app.get('/static/IMG_6768.jpg', function(req, res) {
  res.sendFile(__dirname + '/static/IMG_6768.jpg')
})

app.get('/node_modules/bootstrap/dist/js/bootstrap.min.js', function(req, res) {
  res.sendFile(__dirname + '/node_modules/bootstrap/dist/js/bootstrap.min.js')
})

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/dist/')
})
var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started ' + port);