let router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Auth0 Webapp sample Nodejs',
    isAuthenticated: req.oidc.isAuthenticated()
  });
});

router.get('/profile', requiresAuth(), (req, res) => {
  const { email, preferred_username, name } = req.oidc.user;

  res.render('profile', {
    userProfile: JSON.stringify(req.oidc.user, null, 4),
    name,
    email,
    username: preferred_username,
    title: `${req?.oidc?.user?.preferred_username}'s profile page`,
  });
});


module.exports = router;
