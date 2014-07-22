module.exports = function(sequelize, DataTypes) {
  var Chart = sequelize.define('Chart', {
    hash: DataTypes.STRING,
    name: DataTypes.STRING,
    link: DataTypes.STRING,
    count: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        
      }
    }
  })
 
  return Chart
}