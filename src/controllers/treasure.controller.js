const TreasureModel = require('../models/treasure.model');
const HttpException = require('../utils/HttpException.utils');
const dotenv = require('dotenv');
dotenv.config();

class TreasureController {
    getTreasure = async (req, res, next) => {
        const treasure = await TreasureModel.find({ latitude: req.params.latitude, longitude: req.params.longitude });

        if (!treasure) {
            throw new HttpException(404, 'treasure not found');
        }

        res.send(treasure);
    };

    getTreasureWithPrizeValue = async (req, res, next) => {
        const treasure = await TreasureModel.findWithPrizeValue({ latitude: req.params.latitude, longitude: req.params.longitude, amt: req.params.prize_value });

        if (!treasure) {
            throw new HttpException(404, 'treasure not found');
        }

        res.send(treasure);
    };
}

module.exports = new TreasureController;