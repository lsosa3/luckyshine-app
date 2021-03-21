const { countDecimals, countInts } = require('../../utils/common.utils');


exports.treasureValidation = (req, res, next) => {
    const extractedErrors = []
    let message = '';

    if((countDecimals(req.params.latitude) != 8) || (countInts(req.params.latitude) != 1)) {
        message = 'Latitude must have this 1.12345678 format';
        extractedErrors.push({ "latitude": message })
    }

    if((countDecimals(req.params.longitude) != 8) || (countInts(req.params.longitude) != 3)) {
        message = 'Longitude must have this 123.12345678 format';
        extractedErrors.push({ "longitude": message })
    }
    console.log(Number(req.params.distance))
    if(!Number.isInteger(Number(req.params.distance)) || ((Number(req.params.distance) != 1) && (Number(req.params.distance) != 10))) {
        message = 'Distance must be number 1 or 10';
        extractedErrors.push({ "distance": message })
    }

    if(extractedErrors.length > 0) {
        return res.status(422).json({
            errors: extractedErrors,
        })
    }
    next();
}

exports.treasurePrizeValueValidation = (req, res, next) => {
    const extractedErrors = []
    let message = '';

    if(!Number.isInteger(Number(req.params.prize_value)) || (Number(req.params.prize_value) < 10) || (Number(req.params.prize_value) > 30)) {
        message = 'Prize value must be a integer number between 10 and 30';
        extractedErrors.push({ "prize_value": message })
    }

    if(extractedErrors.length > 0) {
        return res.status(422).json({
            errors: extractedErrors,
        })
    }
    next();
}

  
//module.exports = { treasureValidation, treasurePrizeValueValidation }