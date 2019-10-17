"use strict";

let sqlite3 = require('sqlite3').verbose();
let csv = require( './readerCsv');

/**
 * Database configuration
 */

let db = new sqlite3.Database('./sqlite.db');

let init = function () {

    let promesses = [];

    promesses.push( db.run("CREATE TABLE if not exists installations (" +
        "NumInstallation INTEGER PRIMARY KEY," +
        "NomInstallation TEXT," +
        "CodeINSEE INT," +
        "CodeDepartement INT," +
        "CodePostal INT," +
        "NomDepartement TEXT," +
        "NomCommune TEXT," +
        "Adresse TEXT," +
        "LocX DECIMAL(9,6)," +
        "LocY DECIMAL(9,6)," +
        "DesserteBus BOOLEAN,"+
        "DesserteTrain BOOLEAN,"+
        "DesserteTram BOOLEAN,"+
        "InstalParticuliere  TEXT," +
        "AccessibleHandicapés  BOOLEAN," +
        "NbplaceParking  INT," +
        "NbplaceParkingHandicapés  INT" +
        ")" )
    );


    promesses.push( db.run("CREATE TABLE if not exists equipement (" +
        "Numequipement INTEGER PRIMARY KEY," +
        "Equipement TEXT," +
        "NumInstallation TEXT," +
        "Typeequipement TEXT," +
        "Proprietaire TEXT," +
        "Gestionnaire TEXT," +
        "Eclairage BOOLEAN," +
        "Sallepolyvalente BOOLEAN," +
        "EtabPleinAir BOOLEAN," +
        "EtabSportifCouvert BOOLEAN," +
        "NbplaceTribune INT," +
        "Typedusol TEXT,"+
        "AireEvolLongueur DECIMAL(9,6)," +
        "AireEvolLargeur DECIMAL(9,6)," +
        "NbCouloir INT," +
        "NbVerstiaireStortif INT," +
        "SonoFixe BOOLEAN," +
        "TableauFixe BOOLEAN," +
        "Chronometrage BOOLEAN," +
        "SanitairePublic BOOLEAN," +
        "AcHandMobiAireEvol BOOLEAN," +
        "AcHandMobiTribune BOOLEAN," +
        "AcHandMobiVestiaire BOOLEAN," +
        "AcHandMobiSanitairePublic BOOLEAN," +
        "AcHandMobiSanitaireSportif BOOLEAN," +
        "AccueilClub BOOLEAN," +
        "AccueilSalledeReunion BOOLEAN," +
        "AccueilBuvette BOOLEAN," +
        "AccueilInfirmerie BOOLEAN," +
        "AccueilReception BOOLEAN," +
        "AccueilLocalRangement BOOLEAN," +
        "NbcouloirEscalade INT," +
        "Hauteurescalade INT,"+
        "Surfaceescalade DECIMAL(9,6),"+
        "Nbairesdesaut INT,"+
        "Nbairesauthauteur INT,"+
        "Nbairessautlongueur INT,"+
        "Nbairessautlongueurettriplesaut INT,"+
        "Nbairessautsautoirperche INT,"+
        "Nbaireslancer INT,"+
        "Nbairespoid,INT,"+
        "Nbairesdisque INT,"+
        "Nbairesjavelot INT,"+
        "Nombreairesmarteau INT,"+
        "Nombreaireslancermixtedisquemarteau INT,"+
        "Longueurbassin DECIMAL(9,6),"+
        "Largeurbassin DECIMAL(9,6),"+
        "Profondeurmini DECIMAL(9,6),"+
        "Profondeurmaxi DECIMAL(9,6),"+
        "Nbtotaltremplins INT"+
        ")" )
    );

    promesses.push( db.run("CREATE TABLE if not exists activites (" +
        "Activitecode INTEGER, " +
        "Activitelibelle TEXT," +
        "Numerodelaficheequipement INTEGER," +
        "Niveaudelactivite TEXT," +
        "PRIMARY KEY (Numerodelaficheequipement,Activitecode)"+
        ")" )
    );

    Promise.all(promesses).then(function () {
        csv.getActivityData(db);
        csv.getInstallationData(db);
        csv.getStuffData(db);
    })

};

module.exports = {
    init: init,
    db: db
};

