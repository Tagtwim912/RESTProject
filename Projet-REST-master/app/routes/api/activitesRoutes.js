const express = require('express');
const router = express.Router();

const ActivitesController = require('../../controller/activiteController');
const activitesController = new ActivitesController();

/**
 * Activité Routes
 */

router.get('', function (req, res) {
    activitesController.getActivites(res);
});

router.get('/equipement/:idequip', function (req, res) {
    activitesController.getactquip(req,res);
});

router.get('/id/:codeactivity', function (req, res) {
    activitesController.getActiviteId(req,res);
});

module.exports = router;