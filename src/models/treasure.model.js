const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');

class TreasureModel {
    tableName = 'treasures';

    find = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName} ts
        JOIN money_values mn ON (ts.id = mn.treasure_id)
        WHERE ${columnSet} 
        ORDER BY mn.amt DESC`;

        const result = await query(sql, [...values]);

        return result;
    }

    findWithPrizeValue = async (params) => {
        const sql = `SELECT * FROM ${this.tableName} ts
        JOIN money_values mn ON (ts.id = mn.treasure_id)
        WHERE latitude = ? AND longitude = ? AND amt >= ?
        ORDER BY mn.amt DESC`;
        const result = await query(sql, [params.latitude, params.longitude, params.amt]);

        return result;
    }
}

module.exports = new TreasureModel;