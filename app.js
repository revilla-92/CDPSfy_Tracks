var express = require("express"),  
    app = express(),
    bodyParser  = require("body-parser"),
    http     = require("http"),
    server   = http.createServer(app),
    methodOverride = require("method-override");

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());


var track_controller = require('./controllers/tracks_controller');


/*LANDING PAGE*/
var landingRouter = express.Router();
landingRouter.get('/', function(req, res){
	res.send("Bienvenido a la API de tracks");
});
app.use(landingRouter);


/* RUTAS API */
var router = express.Router();

router.route('/tracks')
	.post(track_controller.addTrack);

router.route('/tracks/:name')
	.get(track_controller.findTrackByName)
	.post(track_controller.deleteTrackByName);

/***OJO, CAMBIAR LA RUTA tracks.cdpsfy.com **/
app.use('/api', router);

app.listen(3030, function() {  
  	console.log("Node server running on http://localhost:3030");
});






