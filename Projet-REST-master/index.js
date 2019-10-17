/* Load modules */
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

/* Database configuration */
const database =                                                                                                                                                                                                                                                                                                                                                                                                                                                        require('./app/config/dbconfig');

/** Init database **/
// si il y a des nouveaux ficher de donnée, supprimer le fichier sqlite.db et decommenter la ligne suivante

//database.init();

/** Init server listening **/
const port = process.argv[2] || 3000;
app.listen(port, function () {
    console.log("Server listening on port : " + port);
});

/** Express configuration **/
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/* Router configuration */
const REST_API_ROOT = '/api';

/** Header configuration */
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();

});

app.use(REST_API_ROOT, require('./app/routes/router'));

