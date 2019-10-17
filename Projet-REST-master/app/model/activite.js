"use strict";

/**
 * Classe activité
 */

class Activite {

    constructor(activitecode,activitelibelle,numerodelaficheequipement,niveaudelactivite) {
        this.activitecode = activitecode;
        this.activitelibelle = activitelibelle;
        this.numerodelaficheequipement = numerodelaficheequipement;
        this.niveaudelactivite = niveaudelactivite;
    }

}

module.exports = Activite;