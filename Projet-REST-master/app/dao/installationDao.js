"use strict";

//const Ville = require('../model/ville');

const daoCommon = require('./commons/daoCommon');
const Installation = require('../model/installation');

/**
 * Installation Data Access Object
 */

class InstallationDao {

    /**
     * Constructeur
     */
    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Donne une liste des départements ou il y a des installations
     * @returns une liste de couple code de departement et leur nom
     */
    listdepartement() {
        let sqlRequest = "SELECT CodeDepartement,NomDepartement FROM installations group by 1,2";
        return this.common.findAll(sqlRequest).then(row => {
             return row;
        });

    };

    /**
     * Donne une liste des villes ou il y a des installations
     * @returns une liste de nom de ville
     */
    listville() {

        let sqlRequest = "SELECT NomCommune FROM installations group by 1 order by 1";

        return this.common.findAll(sqlRequest).then(row => {
            return row;
        });

    };

    /**
     * Donne les instalations presentent dans une ville
     * @param id = nom de la ville
     * @returns un liste d'objet Installation
     */
    getVillesId(id){
        let sqlRequest = "SELECT * FROM installations where NomCommune like $id";
        let sqlParams = {$id: id};
        return this.common.findAll(sqlRequest,sqlParams).then(rows => {
            let instal = [];
            rows.forEach(function (row) {
                instal.push(new Installation(row.NumInstallation,row.NomInstallation ,row.CodeINSEE ,row.CodeDepartement ,row.CodePostal ,row.NomDepartement ,row.NomCommune ,row.Adresse ,row.LocX ,row.LocY ,row.DesserteBus ===1,row.DesserteTrain===1,row.DesserteTram===1,row.InstalParticuliere,row.AccessibleHandicapés===1,row.NbplaceParking,row.NbplaceParkingHandicapés));
            });

            return instal;
        });
    }

    /**
     * Donne les instalations presentent dans un departments
     * @param id = code du departement
     * @returns un liste d'objet Installation
     */
    getDepartementId(id){

        let sqlRequest = "SELECT * FROM installations where CodeDepartement = $id";
        let sqlParams = {$id: id};
        return this.common.findAll(sqlRequest,sqlParams).then(rows => {
            let instal = [];
            rows.forEach(function (row) {
                instal.push(new Installation(row.NumInstallation,row.NomInstallation ,row.CodeINSEE ,row.CodeDepartement ,row.CodePostal ,row.NomDepartement ,row.NomCommune ,row.Adresse ,row.LocX ,row.LocY ,row.DesserteBus ===1,row.DesserteTrain===1,row.DesserteTram===1,row.InstalParticuliere,row.AccessibleHandicapés===1,row.NbplaceParking,row.NbplaceParkingHandicapés));
            });

            return instal;
        });
    }

    /**
     * Donne l'installation associer a son numero
     * @param id = numero de l'installation
     * @returns Un objet Installation
     */
    getinstallation(id){
        let sqlRequest = "SELECT * FROM installations where  NumInstallation = $id";
        let sqlParams = {$id: id};
        return this.common.findOne(sqlRequest,sqlParams).then(row => {


            return(new Installation(row.NumInstallation,row.NomInstallation ,row.CodeINSEE ,row.CodeDepartement ,row.CodePostal ,row.NomDepartement ,row.NomCommune ,row.Adresse ,row.LocX ,row.LocY ,row.DesserteBus ===1,row.DesserteTrain===1,row.DesserteTram===1,row.InstalParticuliere,row.AccessibleHandicapés===1,row.NbplaceParking,row.NbplaceParkingHandicapés));

        });
    }



}

module.exports = InstallationDao;