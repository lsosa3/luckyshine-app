exports.multipleColumnSet = (object) => {
    if (typeof object !== 'object') {
        throw new Error('Invalid input');
    }

    const keys = Object.keys(object);
    const values = Object.values(object);

    columnSet = keys.map(key => `${key} = ?`).join(' AND ');

    return {
        columnSet,
        values
    }
}

exports.countDecimals = (value) => {
    if(Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0; 
}

exports.countInts = (value) => {
    if(Math.floor(value) === value) return 0;
    return value.toString().split(".")[0].length || 0; 
}