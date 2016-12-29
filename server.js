const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

//uses heroku's env PORT variable or if not set (on localhost)
//will set listen to port 3000;
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
hbs.registerPartials(`${__dirname}/views/partials`)

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.path}`;
    console.log(log);
    fs.appendFile('server.log', `${log}\n`, (error) => {
        if(error){
            console.log('Unable to append to server.log');
        }
    })
    next();
});


//handlebars templating engine helpers
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

//req - request
//res - response
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home',
        welcomeMessage: 'Welcome!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs');
});

app.listen(port, () => {
    console.log(`Server is live on port ${port}.`);
});