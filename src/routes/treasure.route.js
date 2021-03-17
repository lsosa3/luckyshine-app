const express = require('express');
const router = express.Router();
const treasureController = require('../controllers/treasure.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const findTreasureSchema = require('../middleware/validators/treasureValidator.middleware');

router.get('/latitude/:latitude/longitude/:longitude/distance/:distance', awaitHandlerFactory(treasureController.getTreasure)); // localhost:3000/api/treasure/latitude/1.12345678/longitude/1.12345678/distance/1
router.get('/latitude/:latitude/longitude/:longitude/distance/:distance/prize_value/:prize_value', awaitHandlerFactory(treasureController.getTreasureWithPrizeValue)); // localhost:3000/api/treasure/latitude/1.12345678/longitude/1.12345678/distance/1/prize_value/10

module.exports = router;