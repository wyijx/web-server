const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

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

app.listen(3000, () => {
    console.log('Server is live.');
});