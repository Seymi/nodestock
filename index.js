const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const PORT = process.env.PORT || 5000;

// set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// set handlebar routes
app.get('/', function (req, res, next) {
    res.render('home');
});

const otherstuff = 'this is other stuff';

app.get('/info', function (req, res, next) {
    res.render('info', {
    	stuff: otherstuff
    });
});


// set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server listening on port' + PORT));
