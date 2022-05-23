const router = require('express').Router();
const {response} = require('express');
const {user, User} = require('../../models');
const { route } = require('./dashboardRoute');

// get route ofr signup
router.get('/signup', (req, res) => {
    res.render('signup')
})

// post route for signup
route.post('/signup', async (req, res) => 
{
    try{
        const createUser = await User.create
        ({
            user_name: req.body.user_name,
            email: req.body.email,
            password: req.body.password
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// login get route
router.get('/login', (req, res) => {

    // if a session currently exists then redirect the request to the homepage
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('/login');
});

router.post('/login', async (req, res) => 
{
    // findng the user that matches with the username in the database
    try{
        const user = await User.findOne
        ({where: {email: req.body.email}});

        // if the given username doesnt match one in the database, then give user and error message
        if (!user) {
            res.status(400).json({message: "Please try again, Incorrect username"});
            return;
        }

        //see if the password user has entered matches a password in the db
        const validPass = await user.checkPassword(req.body.password);

        // if the given password doesnt match one in the database, give an error message
        if (!validPass) {
            res.status(400).json({message: "Incorrect password, please try again"});
            return;
        }

        req.session.save(() => 
        {
            req.session.user_id = user.id;
            req.session.logged_in = true;
            res.json ({user: user, message: "You're already logged in"})
        });
    } catch(err) {
        res.status(500).json(err);
        console.log(error);
    }
});

// get route to logout
router.get('/logout', (req, res) => 
{
    if (req.session.logged_in) {
        req.session.destroy(() => //destroy current session
        {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
        res.redirect('/')  //redirect to the home route
});

module.exports = router;