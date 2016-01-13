var fs = require('fs');



//GET - Retorna una cancion por su nombre
exports.findTrackByName = function(req, res){
	var findURL = req.params.name;

	//recogemos el fichero con ese nombre dentro del NAS
    //PRODUCCION: var urlNAS = "../mnt/nas/";
	var urlNAS = "./mnt/nas/";
	var newURL = urlNAS+findURL;

	//mando la cancion que se encuentra en esa ruta:
	res.sendFile(findURL,{root: './mnt/nas'});
};


//POST - Inserta una nueva cancion en la DB
exports.addTrack = function(req, res){
    //PRODUCCION: var urlNAS = "../mnt/nas/";
	var urlNAS = "./mnt/nas/";

	if (req.method == 'POST') {
		var fileName = '';
		var mp3File = '';
    	var mp3_file;
    	var tempName = '';

        var body = '';
        var contador = 0;
        req.on('data', function (data) {
            body += data;
            //el primer dato que se envia es el nombre del fichero y un trozo de cancion
            //el resto de datos que llegan, es solo cancion.
            if (contador == 0){
            	var stringData = data.toString();

            	//EJ: prueba.mp3 -------XXXXXXX
            	stringData = stringData.substr(stringData.indexOf('filename')+13);
                
            	//cortamos despues del . y 3 caracteres
            	stringData = stringData.substr(0,stringData.indexOf('.')+4);
                
            	//guardamos el nombre de fichero finalmente.
            	filename = stringData;
            	//guardamos el nombre del fichero a guardar.
            	//EJ: /mnt/nas/1251241213_Prueba.mp3
            	//metemos un numero random, para asegurar que no hay ninguno igual
            	var random = Math.floor((Math.random() * 100) + 1);

                //para prevenir posibles errores de que no encuentre el nombre.
                console.log("FILENAME: "+filename);
                if (fileName == ""){
                    filename = ".mp3";
                }

            	tempName = new Date().getTime()+random+'_'+filename;
            	mp3File = urlNAS + tempName;

            	//init el writeStream
            	mp3_file = fs.createWriteStream(mp3File);
            	//escribimos el trozo de cancion que llega en este primer data.
            	mp3_file.write(data);
            	contador++;
            }else{
            	mp3_file.write(data);
            }
        });
        req.on('end', function () {
        	console.log("TERMINADO");

            mp3_file.end();
            res.writeHead(200, {'Content-Type': 'text/html'});
            //devolvemos el nombre de la cancion guardada:
        	res.end(tempName);
        });

    }
};


//DELETE - Borramos una cancion por su nombre
exports.deleteTrackByName = function(req,res){
    //PRODUCCION: var urlNAS = "../mnt/nas/";
	var urlNAS = "./mnt/nas/";
	var findURL = req.params.name;
	var newURL = urlNAS+findURL;

	//borramos el fichero en esa ruta
	var fs = require('fs');
	fs.unlinkSync(newURL);
	res.status(200);
	console.log("DELETED:"+findURL);
};