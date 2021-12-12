const { Model } = require('objection');

// User model
class Hum extends Model {
  id
  createdAt
  hum

  static get tableName() {
    return 'hum';
  }
}

module.exports = Hum
