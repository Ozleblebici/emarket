module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('Review', {
      id: {
        type:           DataTypes.INTEGER,
        allowNull:      false,
        primaryKey:     true,
        autoIncrement:  true
      },
      rating:           DataTypes.INTEGER,
      comment:          DataTypes.STRING,
      image1:           DataTypes.STRING,
      image2:           DataTypes.STRING,
      image3:           DataTypes.STRING
    })
    Review.associate = function (models) {
      Review.belongsTo(models.Product)
    }
    return Review
  }