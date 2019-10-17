"use strict";

const controllerCommon = require('./common/controllerCommon');
const EquipementDao = require('../dao/equipementDao');

/**
 * Classe EquipementsController
 */
class EquipementsController {

    /**
     * Constructeur
     */
    constructor() {
        this.common = new controllerCommon();
        this.equipDao = new EquipementDao();
    }

    /**
     * Donne la liste des equipements
     * @param res
     */
    getEquipements(res){
        this.equipDao.listEquipements()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }

    /**
     *  Donne l'equipement associer au numero de l'equipement
     * @param req
     * @param res
     */
    getEquipementId(req,res){
        this.equipDao.getEquipementId(req.params.numequip)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }

    /**
     *  Donne la liste des equipements qui sont dans une installation avec le numero de l'installation
     * @param req
     * @param res
     */
    getEquipementparinstal(req,res){
        this.equipDao.getEquipementparinstal(req.params.numinstal)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }
}

module.exports = EquipementsController;