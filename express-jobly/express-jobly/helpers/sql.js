const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.

/**
 * Used to update exisiting data in table with partial data
 * @param {*} dataToUpdate {object} data with the partial data
 * @param {*} jsToSql 
 * @returns 
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };