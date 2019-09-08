'use strict';

const csp = require('helmet-csp');
var bodyParser = require('body-parser');

var http = require("http"),
    pathUtils = require("path"),
    express = require("express"),
    app = express(),
    PORT = process.env.PORT || 8080,
    appDir = pathUtils.resolve(__dirname, "public");

app.use(bodyParser.json({
    type: ['json', 'application/csp-report']
}))

// Set HTTP-Header
app.use(function (req, res, next) {
    res.set('X-Frame-Options', 'DENY');
    res.set('Referrer-Policy', 'no-referrer');
    res.set('Cross-Origin-Resource-Policy', 'same-origin');
    res.set('Set-Cookie', 'SID=xyz; Path=/myapp; Secure; HttpOnly; SameSite=Strict')
    next();
});

// app.use(csp({
//     directives: {
//         reportUri: `/reports`,
//         frameAncestors: ["'none'"],
//         imgSrc: [`'self'`, `http://icons.iconarchive.com/icons/graphicloads/100-flat/256/home-icon.png`],
//         scriptSrc: ["'self'"],
//         styleSrc: ["'self'", "'unsafe-inline'", `https://fonts.googleapis.com`]
//     }
// }));


app.use(express.static(appDir));

app.get("*", function (req, res) {
    res.sendFile(pathUtils.resolve(appDir, "index.html"));
});

app.post('/reports', (req, res) => {
    if (req.body) {
        console.log('CSP Violation: ', req.body)
    } else {
        console.log('CSP Violation: No data received!')
    }

    res.status(204).end()
})

http.createServer(app).listen(PORT, function () {
    console.log("Express server listening on port " + PORT);
    console.log("http://localhost:" + PORT);
});