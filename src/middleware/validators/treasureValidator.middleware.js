const { body } = require('express-validator');

exports.findTreasureSchema = [
    body('latitude')
        .exists()
        .isDecimal({decimal_digits: 8})
        .withMessage('Latitude is required')
        .isLength({ min: 10 })
        .withMessage('Must be at least 10 digits long'),
    body('longitude')
        .exists()
        .isDecimal({decimal_digits: 8})
        .withMessage('Longitude is required')
        .isLength({ min: 10 })
        .withMessage('Must be at least 10 digits long'),
    body('distance')
        .exists()
        .withMessage('Distance is required')
        .isInt({ min: 1, max: 10 })
        .withMessage('Must be only int between 1 and 10 not decimal'),
    body('prize_value')
        .optional()
        .isInt({ min: 10, max: 30 })
        .withMessage('Must be a number between 0 and 30 not decimal')
];