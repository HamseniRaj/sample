
var RecordModel = require("../models/recordmodel");

var jsonfile = require('jsonfile')
// var multer = require('multer');
// const path = require('path');
// const fileUpload = require('express-fileupload');
var appRouter = function(app) {

    // Add headers
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });


    // to get all business   
    app.post("/api_routes/getUsers", function(req, res) {
		console.log('arun');
      //var id = req.params.uri;
      RecordModel.getUsers(req.body,function(error, result) {
          if(error) {
              return res.status(400).send(error);
          }
		  console.log(result);
          res.send(result);
      });
    });
	
	app.post("/api_routes/getBusiness", function(req, res) {
		console.log('arun');
      //var id = req.params.uri;
      RecordModel.getBusiness(req.body,function(error, result) {
          if(error) {
              return res.status(400).send(error);
          }
		  console.log(result);
          res.send(result);
      });
    });
	
	app.post("/api_routes/getData/", function(req, res) {
		console.log(req.body);
      var id = req.body.value;
	  var type = req.body.type;
      RecordModel.getData(id,type,function(error, result) {
          if(error) {
              return res.status(400).send(error);
          }
          res.send(result);
      });
    });
	app.post("/api_routes/savejson/", function(req, res) {
		console.log(req.body);
		var json = req.body;
		jsonfile.writeFile('about.json', json, function (err) {
		  console.error(err)
		})
		res.send();
    });
	app.post("/api_routes/importjson/", function(req, res) {
		console.log(req.body);
		var json = req.body;
		jsonfile.readFile('about.json', function (err,obj) {
			console.error(obj)
			if(err) {
			  return res.status(400).send(err);
			}
			//res.send(obj);
			RecordModel.importjson(obj,function(error, result) {
			  if(error) {
				  return res.status(400).send(error);
			  }
			  console.log(result);
			  res.send(result);
			});
		})
    });

    

};


 
module.exports = appRouter;

