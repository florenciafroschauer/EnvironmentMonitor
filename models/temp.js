const { Model } = require('objection');

// User model
class Temp extends Model {
  id
  createdAt
  temp

  static get tableName() {
    return 'temp';
  }
}

module.exports = Temp
