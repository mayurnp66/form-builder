const db = require('../util/database');

module.exports = class Form {
    static getFormById(formId) {
        return db.execute(
            `SELECT * FROM form WHERE id = ?`, [formId]
            );
      }
}