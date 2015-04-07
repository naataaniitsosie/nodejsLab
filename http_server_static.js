var fs = require('fs');
var http = require('http');
var url = require('url');
var ROOT_DIR = "files/";
http.createServer(function (req, res) {
	var urlObj = url.parse(req.url, true, false);
	
	if(urlObj.pathname.indexOf("getcity") !=-1) {
        	fs.readFile(ROOT_DIR + 'cities.dat.txt', function(err,data){
			if(err){
				throw err;
			}
			var jsonresult = [];	
			var myRe = new RegExp("^" + urlObj.query["q"]);
			cities = data.toString().split("\n");
			for(var i = 0; i < cities.length; i++) {
				var result = cities[i].search(myRe);
				if(result != -1) {
					jsonresult.push({city:cities[i]});
				}
			}
			res.writeHead(200);
			res.end(JSON.stringify(jsonresult));
			
		});
	}
	else {
		fs.readFile(ROOT_DIR + urlObj.pathname, function (err, data) {
			if(err){
				res.writeHead(404);
				res.end(JSON.stringify(err));
				return;		
			}
			res.writeHead(200);
			res.end(data);
		});
	}
}).listen(80);
