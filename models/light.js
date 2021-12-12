const { Model } = require('objection');

// User model
class Light extends Model {
  id
  createdAt
  light
  alerts

  static get tableName() {
    return 'light';
  }

// has many relations
  static get relationMappings() {
    const Alert = require('./alert');
    return {
      alerts: {
        relation: Model.HasManyRelation,
        modelClass: Alert,
        join: {
          from: 'light.id',
          to: 'alert.lightId'
        }
      }
    };
  }
}

module.exports = Light
