'use strict'

const postModel = (sequelize, DataTypes) => {

  const model = sequelize.define('Post', {
    title: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true 
    },
    user_id : {
      type: DataTypes.UUID,
      allowNull: false
    },
    body: { 
      type: DataTypes.TEXT, 
      allowNull: false,
      default: '', 
    },
    date_posted:{
      type: DataTypes.Date,
      allowNull: false,
    },
      
  }) 

  return model
}

module.exports = postModel
