var path = require('path');
var express = require('express');
var app = express();
var staticPath = path.join(__dirname, '/dist');

app.use(express.static(staticPath));
app.set('port', (process.env.PORT || 5000));


//For avoidong Heroku $PORT error
app.get('/dist', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});
