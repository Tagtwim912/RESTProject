"use strict";

const daoCommon = require('./commons/daoCommon');
const Activite = require('../model/activite');

/**
 * Activites Data Access Object
 */

class ActivitesDao {

    /**
     * Constructeur
     */
    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Donne la liste des activités existante
     * @returns la liste de couple du code de l'activité et son libelle
     */
    listActivites() {

        let sqlRequest = "SELECT Activitecode,Activitelibelle FROM activites group by 1,2";
        return this.common.findAll(sqlRequest).then(row => {

            return row;

        });

    };

    /**
     *  Donne la liste des activité selon le code de l'activité
     * @param id = code de l'activité
     * @returns liste d'objet Activité
     */
    getActivitesId(id){

        let sqlRequest = "SELECT * FROM activites where Activitecode like $id";
        let sqlParams = {$id: id};

        return this.common.findAll(sqlRequest,sqlParams).then(rows => {

            let activ = [];

            rows.forEach(function (row) {
                activ.push(new Activite(row.Activitecode,row.Activitelibelle,row.Numerodelaficheequipement,row.Niveaudelactivite));
            });

            return activ;

        });

    }

    /**
     *  Donne la liste des activités d'un equipement
     * @param id = numero de la fiche d'équipement
     * @returns liste d'objet Activité
     */
    getactquip(id) {

        let sqlRequest = "SELECT * FROM activites where Numerodelaficheequipement = $id";
        let sqlParams = {$id: id};

        return this.common.findAll(sqlRequest, sqlParams).then(rows => {

            let activ = [];

            rows.forEach(function (row) {
                activ.push(new Activite(row.Activitecode, row.Activitelibelle, row.Numerodelaficheequipement, row.Niveaudelactivite));
            });

            return activ;

        });
    }


}

module.exports = ActivitesDao;