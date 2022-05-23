const auth = (req, res, next) => {
    // If the user isnt logged in, then it redirects them to the login page

    if (!req.session.logged_in) {
      res.redirect('/login');
    // and if they are already logged in then go to the next instance
    } else {
      next();
    }
  };
  
  module.exports = auth;