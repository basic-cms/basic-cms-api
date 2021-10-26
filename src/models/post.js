'use strict'

const postModel = (sequelize, DataTypes) => {

  const model = sequelize.define('Posts', {
    title: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: false 
    },
    user_id : {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    body: { 
      type: DataTypes.TEXT, 
      allowNull: false,
      default: '', 
    },  
  }) 

  return model
}

module.exports = postModel
