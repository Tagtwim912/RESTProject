"use strict";

const controllerCommon = require('./common/controllerCommon');
const ActivitesDao = require('../dao/activiteDao');

/**
 * Classe ActivitesController
 */
class ActivitesController {

    /**
     * Constructeur
     */
    constructor() {
        this.common = new controllerCommon();
        this.activDao = new ActivitesDao();
    }

    /**
     * Donne la liste des activités existante
     * @param res
     */
    getActivites(res){
        this.activDao.listActivites()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }

    /**
     *  Donne la liste des activité selon le code de l'activité
     * @param req
     * @param res
     */
    getActiviteId(req,res){
        this.activDao.getActivitesId(req.params.codeactivity)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }

    /**
     *  Donne la liste des activités d'un equipement
     * @param req
     * @param res
     */
    getactquip(req,res){
        this.activDao.getactquip(req.params.idequip)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }


}

module.exports = ActivitesController;