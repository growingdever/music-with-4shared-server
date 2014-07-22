module.exports = function(sequelize, DataTypes) {
  var Music = sequelize.define('Music', {
    hash: DataTypes.STRING,
    name: DataTypes.STRING,
    link: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        
      }
    }
  })
 
  return Music
}