const router = require('express').Router();

const {Post,Comment, User} = require('../models');

// (NTS) create function to view all posts, each individual post, and to add a comment on each single post

// viewing all posts

router.get('/', async (req, res) => 
    {
        try{
            const postData = await Post.findAll()
            const posts = postData.map((post) => post.get({plain: true}));
            res.render('home', {posts, logged_in: req.session.logged_in, user_id: req.session.user_id});
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    );

    // viewing each post separately (using id)

    router.get('./:id', async (req, res) =>
    {
        try{
            const post = await Post.findByPk(req.params.id, {
                include: [{
                    model: Comment,
                    include : [{model: User,}]
                }]
            });
            const singlePost = post.get({plain: true });
            console.log(singlePost)
            res.render ('singlePost', {singlePost, logged_in: req.sessin.logged_in, user_id: req.session.user_id});
        } catch (err) {
            res.status(400).json(err);
        }
    }
    );

    // adding comments to a individual post

    router.post('/:id', async (req, res) =>
    {
        try{
            const message = await Comment.create
            ({
                ...req.body,
                post_id: req.params.id,
                user_id: req.session.user_id
            });
            res.json({message})
        } catch (err) {
            res.status(500).json(err);
        }
    }
    )

    module.exports = router;

