const db = require('../util/database');

module.exports = class User {
    constructor(firstName, lastName, email, password) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
    }

    register() {
      return db.execute(
        'INSERT INTO user (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
        [this.firstName, this.lastName, this.email, this.password]
      );
    }
  
    static findUserByEmailId(email) {
      return db.execute('SELECT * FROM user WHERE user.email = ?', [email]);
    }
  };