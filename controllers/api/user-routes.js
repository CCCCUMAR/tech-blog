const router = require('express').Router();
const {response} = require('express');
const {user, User} = require('../../models');
const { route } = require('./dashboardRoute');



// post route for signup
router.post('/signup', async (req, res) => 
{
    try{
        const createUser = await User.create
        ({
            user_name: req.body.user_name,
            email: req.body.email,
            password: req.body.password
        });
        req.session.save(() => {
            req.session.user_id = createUser.id;
            console.log(req.session.user_id);
            req.session.logged_in = true;
            res.json(createUser);
          });
    } catch (err) {
        res.status(500).json(err);
    }
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
router.post('/logout', (req, res) => 
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