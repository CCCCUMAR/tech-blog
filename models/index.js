// importing models
const User = require('./user')
const Post = require('./post')
const Comment = require('./comment')

//defining associations bewtween models
 User.hasMany(Post,{
     foreignkKey: 'user_id',
 });

 Post.hasMany(Comment, {
     foreignkKey: 'post_id',
 });

 Post.belongsTo(User, {
     foreignkKey: 'user_id'
 });

 Comment.belongsTo(User, {
     foreignkKey: 'user_id'
 });

 module.exports = {User, Post, Comment};