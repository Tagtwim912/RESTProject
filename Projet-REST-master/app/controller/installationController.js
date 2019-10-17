"use strict";

const controllerCommon = require('./common/controllerCommon');
const InstallationDao = require('../dao/installationDao');

/**
 * Classe InstallationController
 */
class InstallationController {

    /**
     * Constructeur
     */
    constructor() {
        this.common = new controllerCommon();
        this.instalDao = new InstallationDao();
    }

    /**
     * Donne une liste des départements ou il y a des installations
     * @param req
     * @param res
     */
    getinstallation(req,res){
        this.instalDao.getinstallation(req.params.id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }

    /**
     * Donne une liste des villes ou il y a des installations
     * @param res
     */
    getDepartement(res){
        this.instalDao.listdepartement()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Donne les instalations presentent dans une ville
     * @param res
     */
    getVilles(res){
        this.instalDao.listville()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }

    /**
     * Donne les instalations presentent dans un departments
     * @param req
     * @param res
     */
    getVillesId(req,res){
        this.instalDao.getVillesId(req.params.nomville)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }

    /**
     * Donne l'installation associer a son numero
     * @param req
     * @param res
     */
    getDepartementId(req,res) {
        this.instalDao.getDepartementId(req.params.codedep)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }
}

module.exports = InstallationController;