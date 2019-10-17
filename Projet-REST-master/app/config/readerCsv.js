const fs = require('fs');
const csv = require('csv-parser');


/**
 * Classe reader Csv
 */
class readerCsv {

    /**
     * Permet d'insérer les les tuples activités
     * @param db = base de donnée
     */
    static getActivityData(db) {

        let results = [];
        let matrice = [];

        for (let i = 0; i < 8; i++) {
            matrice[i] = [];
        }
         let test = 0;
        fs.createReadStream(__dirname+'/../../data/234400034_004-009_activites-des-fiches-equipements-rpdl.csv')
            .pipe(csv({separator: ';'}))
            .on('data', (data) => results.push(data))
            .on('end', () => {
                results.forEach(function (element) {

                    /************* Insertion Matrice *************/

                    matrice[0].push(parseInt(checkInt(element['Activité code']))); // Activité code
                    matrice[1].push(JSON.stringify(checkString(element['Activité libellé']))); // Activité libellé
                    matrice[2].push(parseInt(checkInt(element['Numéro de la fiche équipement']))); // Numéro de la fiche équipement
                    matrice[3].push(JSON.stringify(checkString(element['Activité libellé']))); // Niveau de l'activité

                });

                /************* Insertion Données dans la BD ************/



                let promesses = [];
                 let test = 0;
                for( let i = 0; i < matrice[0].length; i++ ){

                    promesses.push( db.run( "INSERT INTO activites(Activitecode,Activitelibelle,Numerodelaficheequipement,Niveaudelactivite)" +
                        " values (" +
                        matrice[0][i] + "," +
                        matrice[1][i] + "," +
                        matrice[2][i] + "," +
                        matrice[3][i] + ")"
                        , function (err,rows) {
                                if (err) {
                                    return console.log("insertion"+i+" error ="+err.message);
                                }
                                console.log(i);
                        }));
                        test = i;
                    }
                    Promise.all(promesses).then(function () {
                        console.log('fini'+test);
                    let p = [];
                    p.push(db.prepare("select * from activites ", function (err, rows) {

                       console.log(err+rows);
                    }));
                    p.push(db.run("select * from activites ", function (err, rows) {

                        console.log(rows);
                    }));
                    p.push(db.all("select * from activites ", function (err, rows) {

                        console.log(err+rows);
                    }));
                    Promise.all(p).then(function () {
                        console.log('fini2');
                    });
                });
            });

    };

    /**
     * Permet d'insérer les les tuples installations
     * @param db = base de donnée
     */
    static getInstallationData(db) {

        let results = [];
        let matrice = [];
        for (let i = 0; i < 17; i++) {
            matrice[i] = [];
        }

        fs.createReadStream(__dirname+'/../../data/234400034_004-010_fiches-installations-rpdl.csv')
            .pipe(csv({separator: ';'}))
            .on('data', (data) => results.push(data))
            .on('end', () => {

                let coordY = [];
                let coordX = [];

                results.forEach(function (element) {

                    /************* Coordonnées *************/

                    let coordonnees = JSON.stringify(element['localisation']);

                    coordX = coordonnees.replace(/^"(\d{2}\.\d+), -?\d\.\d+"$/, '$1');
                    coordY = coordonnees.replace(/^"\d{2}\.\d+, (-?\d\.\d+)"$/, '$1');

                    /************* Adresse *************/

                    let adresse = element['Numero de la voie'] + ' ';
                    if( element['Numero de la voie'] === '' ){
                        adresse = '';
                    }

                    if( element['Nom de la voie'] === '' ){
                        adresse += '';
                    } else {
                        adresse += element['Nom de la voie'] + ' ';
                    }

                    if( element['Nom du lieu dit'] === '' ){
                        adresse += '';
                    } else {
                        adresse += element['Nom du lieu dit'];
                    }

                    if( adresse === '' ){
                        adresse = 'null';
                    }

                    /************* Insertion Matrice *************/
                    let reg = new RegExp("\\\"", "g");

                    matrice[0].push(parseInt(checkInt(element['Numéro de l\'installation']))); // Numéro de l'installation
                    matrice[1].push(JSON.stringify(checkString(element['Nom usuel de l\'installation'].replace(reg,"")))); // Nom usuel de l'installation
                    matrice[2].push(parseInt(checkInt(element['Code INSEE']))); // Code INSEE
                    matrice[3].push(parseInt(checkInt(element['Code du département']))); // Code du département
                    matrice[4].push(parseInt(checkInt(element['Code postal']))); // Code postal
                    matrice[5].push(JSON.stringify(checkString(element['Département'].replace(reg,"")))); // Département
                    matrice[6].push(JSON.stringify(checkString(element['Nom de la commune'].replace(reg,"")))); // Nom de la commune
                    matrice[7].push(JSON.stringify(checkString(adresse.replace(reg,"")))); // Adresse
                    matrice[8].push(parseFloat(checkFloat(coordX))); // Coordonnées X
                    matrice[9].push(parseFloat(checkFloat(coordY))); // Coordonnées Y
                    matrice[10].push(element['Desserte bus'] === 'Oui'); // Désserte bus
                    matrice[11].push(element['Desserte train'] === 'Oui'); // Désserte train
                    matrice[12].push(element['Desserte Tram'] === 'Oui'); // Désserte tram
                    matrice[13].push(JSON.stringify(checkString(element['Installation particulière']))); // Installation particulière
                    matrice[14].push(element['Accessibilité handicapés à mobilité réduite'] === 'Oui'); // Accessibilité handicapés à mobilité réduite
                    matrice[15].push(parseInt(checkInt(element['Nombre total de place de parking']))); // Nombre total de place de parking
                    matrice[16].push(parseInt(checkInt(element['Nombre total de place de parking handicapés']))); // Nombre total de place de parking handicapés

                });

                /************* Insertion Données dans la BD *************/
                let promesses = [];

                for( let j = 0; j < matrice[0].length; j++ ){
                    console.log(j + " VALUES (" +
                        matrice[0][j] + "," +
                        matrice[1][j] + "," +
                        matrice[2][j] + "," +
                        matrice[3][j] + "," +
                        matrice[4][j] + "," +
                        matrice[5][j] + "," +
                        matrice[6][j] + "," +
                        matrice[7][j] + "," +
                        matrice[8][j] + "," +
                        matrice[9][j] + "," +
                        matrice[10][j] + "," +
                        matrice[11][j] + "," +
                        matrice[12][j] + "," +
                        matrice[13][j] + "," +
                        matrice[14][j] + "," +
                        matrice[15][j] + "," +
                        matrice[16][j] + ")");

                    promesses.push(db.run( "INSERT INTO installations(NumInstallation,NomInstallation,CodeINSEE,CodeDepartement,CodePostal,NomDepartement,NomCommune,Adresse,LocX,LocY,DesserteBus,DesserteTrain,DesserteTram,InstalParticuliere,AccessibleHandicapés,NbplaceParking,NbplaceParkingHandicapés)" +
                        " VALUES (" +
                        matrice[0][j] + "," +
                        matrice[1][j] + "," +
                        matrice[2][j] + "," +
                        matrice[3][j] + "," +
                        matrice[4][j] + "," +
                        matrice[5][j] + "," +
                        matrice[6][j] + "," +
                        matrice[7][j] + "," +
                        matrice[8][j] + "," +
                        matrice[9][j] + "," +
                        matrice[10][j] + "," +
                        matrice[11][j] + "," +
                        matrice[12][j] + "," +
                        matrice[13][j] + "," +
                        matrice[14][j] + "," +
                        matrice[15][j] + "," +
                        matrice[16][j] + ")"
                    ), function (err,rows) {
                        if (err) {
                            console.log("insertion"+j+" error ="+err.message);
                        }
                        console.log(j);
                    });
            }
                Promise.all(promesses).then(function () {
                    console.log('finidzdz');;
                });

            });
    }

    /**
     * Permet d'insérer les les tuples équipements
     * @param db = base de donnée
     */
    static getStuffData(db) {
        let results = [];
        let matrice = [];
        for (let i = 0; i < 60; i++) {
            matrice[i] = [];
        }

        fs.createReadStream(__dirname+'/../../data/234400034_004-011_fiches-equipements-rpdl.csv')
            .pipe(csv({separator: ';'}))
            .on('data', (data) => results.push(data))
            .on('end', () => {

                let reg = new RegExp("\\\"", "g");

                results.forEach(function (element) {

                    /************* Insertion Matrice *************/

                    matrice[0].push(parseInt(checkInt(element['Numéro de la fiche équipement']))); // Numéro de la fiche équipement
                    matrice[1].push(JSON.stringify(checkString(element['Equipement'].replace(reg,"")))); // Équipement
                    matrice[2].push(JSON.stringify(checkString(element['Numéro de l\'installation'].replace(reg,"")))); // Numéro de l'installation
                    matrice[3].push(JSON.stringify(checkString(element['Type d\'équipement'].replace(reg,"")))); // Type d'équipement
                    matrice[4].push(JSON.stringify(checkString(element['Propriétaire principal'].replace(reg,"")))); // Propriétaire principal
                    matrice[5].push(JSON.stringify(checkString(element['Gestionnaire principal'].replace(reg,"")))); // Gestionnaire principal
                    matrice[6].push(element['Présence d\'un éclairage'] === 'Oui'); // Présence d'un éclairage
                    matrice[7].push(element['Salle polyvalente'] === 'Oui'); // Salle polyvalente
                    matrice[8].push(element['Etablissement de plein air'] === 'Oui'); // Etablissement de plein air
                    matrice[9].push(element['Etablissement sportif couvert'] === 'Oui'); // Etablissement sportif couvert
                    matrice[10].push(parseInt(checkInt(element['Nombre de place en tribune']))); // Nombre de place en tribune
                    matrice[11].push(JSON.stringify(checkString(element['Libellé de la nature du sol'].replace(reg,"")))); // Libellé de la nature du sol
                    matrice[12].push(parseFloat(checkFloat(element['Aire d\'évolution Longueur']))); // Aire d'évolution Longueur
                    matrice[13].push(parseFloat(checkFloat(element['Aire d\'évolution Largeur']))); // Aire d'évolution Largeur
                    matrice[14].push(parseInt(checkInt(element['Nombre de couloir / piste / poste / etc.']))); // Nombre de couloir / piste / poste / etc.
                    matrice[15].push(parseInt(checkInt(element['Nombre de vestiaire sportif']))); // Nombre de vestiaire sportif
                    matrice[16].push(element['Sono fixe'] === 'Oui'); // Sono fixe
                    matrice[17].push(element['Tableau fixe'] === 'Oui'); // Tableau fixe
                    matrice[18].push(element['Chronométrage'] === 'Oui'); // Chronométrage
                    matrice[19].push(element['Nombre de sanitaire public'] === 'Oui'); // Nombre de sanitaire public
                    matrice[20].push(element['Accès handicapé mobilité Aire d\'évolution'] === 'Oui'); // Accès handicapé mobilité Aire d'évolution
                    matrice[21].push(element['Accès handicapé mobilité Tribune'] === 'Oui'); // Accès handicapé mobilité Tribune
                    matrice[22].push(element['Accès handicapé mobilité Vestiaire'] === 'Oui'); // Accès handicapé mobilité Vestiaire
                    matrice[23].push(element['Accès handicapé mobilité sanitaire sportif'] === 'Oui'); // Accès handicapé mobilité sanitaire sportif
                    matrice[24].push(element['Accès handicapé mobilité sanitaire public'] === 'Oui'); // Accès handicapé mobilité sanitaire public
                    matrice[25].push(element['Accueil club'] === 'Oui'); // Accueil club
                    matrice[26].push(element['Accueil salle de réunion'] === 'Oui'); // Accueil salle de réunion
                    matrice[27].push(element['Accueil buvette'] === 'Oui'); // Accueil buvette
                    matrice[28].push(element['Accueil infirmerie'] === 'Oui'); // Accueil infirmerie
                    matrice[29].push(element['Accueil réception'] === 'Oui'); // Accueil réception
                    matrice[30].push(element['Accueil local rangement'] === 'Oui'); // Accueil local rangement
                    matrice[31].push(parseInt(checkInt(element['Nombre de couloirs pour les structures artificielles d\'escalade']))); // Nombre de couloirs pour les structures artificielles d'escalade
                    matrice[32].push(parseInt(checkInt(element['Hauteur pour les structures artificielles d\'escalade']))); // Hauteur pour les structures artificielles d'escalade
                    matrice[33].push(parseFloat(checkFloat(element['Surface pour les structures artificielles d\'escalade']))); // Surface pour les structures artificielles d'escalade
                    matrice[34].push(parseInt(checkInt(element['Nombre d\'aires de saut']))); // Nombre d'aires de saut
                    matrice[35].push(parseInt(checkInt(element['Nombre d\'aires de saut en hauteur']))); // Nombre d'aires de saut en hauteur
                    matrice[36].push(parseInt(checkInt(element['Nombre d\'aires de saut en longueur']))); // Nombre d'aires de saut en longueur
                    matrice[37].push(parseInt(checkInt(element['Nombre d\'aires de saut en longueur et triple saut']))); // Nombre d'aires de saut en longueur et triple saut
                    matrice[38].push(parseInt(checkInt(element['Nombre d\'aires de saut en sautoir perche']))); // Nombre d'aires de saut en sautoir perche
                    matrice[39].push(parseInt(checkInt(element['Nombre d\'aires de lancer']))); // Nombre d'aires de lancer
                    matrice[40].push(parseInt(checkInt(element['Nombre d\'aires de poids']))); // Nombre d'aires de poids
                    matrice[41].push(parseInt(checkInt(element['Nombre d\'aires de disque']))); // Nombre d'aires de disques
                    matrice[42].push(parseInt(checkInt(element['Nombre d\'aires de javelot']))); // Nombre d'aires de javelot
                    matrice[43].push(parseInt(checkInt(element['Nombre d\'aires de marteau']))); // Nombre d'aires de marteau
                    matrice[44].push(parseInt(checkInt(element['Nombre d\'aires de lancer mixte disque/marteau']))); // Aire de Lancer du Disque et du Marteau
                    matrice[45].push(parseFloat(checkFloat(element['Longueur du bassin']))); // Longueur du bassin
                    matrice[46].push(parseFloat(checkFloat(element['Largeur du bassin']))); // Longueur du bassin
                    matrice[47].push(parseFloat(checkFloat(element['Profondeur mini']))); // Profondeur mini
                    matrice[48].push(parseFloat(checkFloat(element['Profondeur maxi']))); // Profondeur maxi
                    matrice[49].push(parseInt(checkInt(element['Nombre total de tremplins']))); // Nombre total de tremplins

                });

                /************* Insertion Données dans la BD *************/
                let promesses = [];

                for( let i = 0; i < matrice[0].length; i++ ){

                    promesses.push(db.run( "INSERT INTO equipement (Numequipement,Equipement,NumInstallation,Typeequipement,Proprietaire,Gestionnaire,Eclairage,Sallepolyvalente,EtabPleinAir,EtabSportifCouvert,NbplaceTribune,Typedusol,AireEvolLongueur,AireEvolLargeur,NbCouloir,NbVerstiaireStortif,SonoFixe,TableauFixe,Chronometrage,SanitairePublic,AcHandMobiAireEvol,AcHandMobiTribune,AcHandMobiVestiaire,AcHandMobiSanitairePublic,AcHandMobiSanitaireSportif,AccueilClub,AccueilSalledeReunion,AccueilBuvette,AccueilInfirmerie,AccueilReception,AccueilLocalRangement,NbcouloirEscalade,Hauteurescalade,Surfaceescalade,Nbairesdesaut,Nbairesauthauteur,Nbairessautlongueur,Nbairessautlongueurettriplesaut,Nbairessautsautoirperche,Nbaireslancer,Nbairespoid,Nbairesdisque,Nbairesjavelot,Nombreairesmarteau,Nombreaireslancermixtedisquemarteau,Longueurbassin,Largeurbassin,Profondeurmini,Profondeurmaxi,Nbtotaltremplins)" +
                        " VALUES (" +
                        matrice[0][i] + "," +
                        matrice[1][i] + "," +
                        matrice[2][i] + "," +
                        matrice[3][i] + "," +
                        matrice[4][i] + "," +
                        matrice[5][i] + "," +
                        matrice[6][i] + "," +
                        matrice[7][i] + "," +
                        matrice[8][i] + "," +
                        matrice[9][i] + "," +
                        matrice[10][i] + "," +
                        matrice[11][i] + "," +
                        matrice[12][i] + "," +
                        matrice[13][i] + "," +
                        matrice[14][i] + "," +
                        matrice[15][i] + "," +
                        matrice[16][i] + "," +
                        matrice[17][i] + "," +
                        matrice[18][i] + "," +
                        matrice[19][i] + "," +
                        matrice[20][i] + "," +
                        matrice[21][i] + "," +
                        matrice[22][i] + "," +
                        matrice[23][i] + "," +
                        matrice[24][i] + "," +
                        matrice[25][i] + "," +
                        matrice[26][i] + "," +
                        matrice[27][i] + "," +
                        matrice[28][i] + "," +
                        matrice[29][i] + "," +
                        matrice[30][i] + "," +
                        matrice[31][i] + "," +
                        matrice[32][i] + "," +
                        matrice[33][i] + "," +
                        matrice[34][i] + "," +
                        matrice[35][i] + "," +
                        matrice[36][i] + "," +
                        matrice[37][i] + "," +
                        matrice[38][i] + "," +
                        matrice[39][i] + "," +
                        matrice[40][i] + "," +
                        matrice[41][i] + "," +
                        matrice[42][i] + "," +
                        matrice[43][i] + "," +
                        matrice[44][i] + "," +
                        matrice[45][i] + "," +
                        matrice[46][i] + "," +
                        matrice[47][i] + "," +
                        matrice[48][i] + "," +
                        matrice[49][i] + ")"
                    ), function (err,rows) {
                        if (err) {
                            console.log("insertion"+j+" error ="+err.message);
                        }
                        console.log(j);
                    });
                }
                Promise.all(promesses).then(function () {
                    console.log('finidzdz');
                });

            });

    }

}

function checkString( s ) {
    let result = s;
    if( result === '' ){
        result = 'null';
    }

    return result;
}

function checkInt( i ) {
    let result = i;
    if( result == '' ){
        result = 0;
    }

    return result;
}

function checkFloat( f ) {
    let result = f;
    if( result == '' ){
        result = 0.00;
    }

    return result;
}

module.exports = readerCsv;