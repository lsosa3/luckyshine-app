const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
class UserModel {
    tableName = 'users';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;
        //console.log(sql)
        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }
}

module.exports = new UserModel;