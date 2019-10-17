/**
 * Express Router configuration
 */
const express = require('express');
const router = express.Router();

/**API routes **/

router.use('/equipement', require('./api/equipementRoutes'));
router.use('/installation', require('./api/installationRoutes'));
router.use('/activite', require('./api/activitesRoutes'));

module.exports = router;