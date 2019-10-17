"use strict";

/**
 *  Classe installation
 */

class Installation {
    constructor(numInstallation,nomInstallation,codeINSEE,codeDepartement,codePostal,nomDepartement,nomCommune,adresse,locX,locY,desserteBus,desserteTrain,desserteTram,instalParticuliere,accessibleHandicapes,nbplaceParking,nbplaceParkingHandicapes) {
        this.numInstallation =  numInstallation;
        this.nomInstallation = nomInstallation;
        this.codeINSEE= codeINSEE;
        this.codeDepartement= codeDepartement;
        this.codePostal= codePostal;
        this.nomDepartement= nomDepartement;
        this.nomCommune= nomCommune;
        this.adresse= adresse;
        this.locX = locX;
        this.locY = locY;
        this.desserteBus = desserteBus;
        this.desserteTrain = desserteTrain;
        this.desserteTram = desserteTram;
        this.instalParticuliere = instalParticuliere;
        this.accessibleHandicapes = accessibleHandicapes;
        this.nbplaceParking = nbplaceParking;
        this.nbplaceParkingHandicapes = nbplaceParkingHandicapes;
    }
}

module.exports = Installation;