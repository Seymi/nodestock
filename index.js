// Stock portfolio app, kurs von codemy.com - John Elder

const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const PORT = process.env.PORT || 5000;
const request = require('request');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));


//var ticker = 'fb';


function call_api(finishedAPI, ticker) {
    request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_f5a2525c6070416b84347716515ec15c', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
	    if (res.statusCode === 200) {
	    	//console.log(body);
		    finishedAPI(body);
    	}
    });
};

// set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// set handlebar routes
app.get('/', function (req, res, next) {
    res.render('home');
    console.log('home');
});


app.get('/info', function (req, res) {
	console.log('info');
	call_api(function(doneAPI) {
    	res.render('info', {
    		stock: doneAPI
    	});	
	}, 'fb');
});

app.get('/stock_fb', function (req, res) {
	console.log('Facebook');
	call_api(function(doneAPI) {
    	res.render('stock_fb', {
    		stock: doneAPI
    	});	
	}, 'fb');
});


app.get('/stock_form', function (req, res) {
	console.log('stock_form GET');
	call_api(function(doneAPI) {
    	res.render('stock_form', {
  	  		stock: doneAPI
    	});	
	}, 'fb');
});

app.post('/stock_form', function (req, res) {
	console.log('stock_form POST');
	call_api(function(doneAPI) {
    	res.render('stock_form', {
			stock: doneAPI,
			// posted_stuff: posted_stuff
    	});	
	}, req.body.stock_ticker);
});




// set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server listening on port' + PORT));
