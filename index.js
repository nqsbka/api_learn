var express = require('express'); 
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var userRoute = require('./routes/user.route')
var authRoute = require('./routes/auth.route')

var	authMiddleware = require('./middlewares/auth.middleware');

var port = 3000;

var app = express();

app.set('view engine', 'pug');
app.set('/users/create', './views');

app.use(bodyParser.json());//for parsing application/json
app.use(bodyParser.urlencoded({extended: true }));
app.use(cookieParser());

app.use(express.static('public'));

app.get('/', function(req, res){
	res.render('index', {
		name: 'Ahihi'
	});	
});

app.use('/users', authMiddleware.requireAuth, userRoute); 
app.use('/auth', authRoute)


app.listen(port, function(){
	console.log('Server listening on port' + port)
});
// //process.exit(1);
// process.kill(process.pid, 'SIGTERM');
