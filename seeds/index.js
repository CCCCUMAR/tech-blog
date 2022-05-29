 const sequelize = require('../config/connection');
const { User, Post, Comments} = require('../models');

const userData = require('./userSeed.json');
const postData = require('./postSeed.json');
const commentData = require('./commentSeed.json');

const seedDb = async () => {
    try{
      await sequelize.sync({force: true})
      await User.bulkCreate(userData, {
          individualHooks: true,
          returning: true,
      }) 

      await Post.bulkCreate(postData)
      await Comment.bulkCreate(commentData)
    } catch(err) {
        console.log(error);
    }
};

seedDb()