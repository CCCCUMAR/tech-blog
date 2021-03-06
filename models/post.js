const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            // each post title can only be between 1-50 char
            validate: {
                len: [1, 50],
            },
        },
        contents: {
            type: DataTypes.TEXT,
            allowNull: false,
            // each post content can only be bewtween 1-250 char
            validate: {
                len: [1, 250],
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            },
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',  
    },
);

module.exports = Post;