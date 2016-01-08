var express        = require('express');
var app            = express();

var environment = process.env.NODE_ENV || 'development';
var serverPort = process.env.PORT || 3002;
var servingDirectory = './dist';

// Enable reverse proxy support in Express. This causes the
// the "X-Forwarded-Proto" header field to be trusted so its
// value can be used to determine the protocol. See
// http://expressjs.com/api#app-settings for more details.
app.enable('trust proxy');


// Force clients to use HTTPS if non-development environment
if (environment !== 'development') {
    app.use(function requireHTTPS(req, res, next) {
        if (req.secure) {
            // request was via https, so do no special handling
            next();
        } else {
            // request was via http, so redirect to https
            res.redirect('https://' + req.headers.host + req.url);
        }
    });
}

// Static file serving point
app.use(express.static(servingDirectory));

console.log('### SmartSite Frontend Server started!');
console.log('Serving static resources from', servingDirectory, 'on port', serverPort);
app.listen(serverPort);
