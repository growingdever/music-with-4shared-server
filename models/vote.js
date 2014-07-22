module.exports = function(sequelize, DataTypes) {
  var Vote = sequelize.define('Vote', {
    hash: DataTypes.STRING
  }, {
    updatedAt: 'last_update',
    createdAt: 'date_of_creation',
    classMethods: {
      associate: function(models) {

      }
    }
  })
 
  return Vote
}