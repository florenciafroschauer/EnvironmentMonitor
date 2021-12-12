const { Model } = require('objection');

// Alert model
class Alert extends Model {
  id
  type
  title
  msg
  lightId
  createdAt
  state
  light

  static get tableName() {
    return 'alert';
  }

// has one relation

  static get relationMappings() {
    const Light = require('./light'); // no se
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: Light,
        join: {
          from: 'alert.lightId',
          to: 'light.id'
        }
      }
    }
  }
}
module.exports = Alert
