module.exports = (app) => {
  const users = require('../controllers/usersController');
  const taxes = require('../controllers/taxController');

  const { auth } = require('../middlewares/auth');
  
  // sigup user
  app.post('/api/register', users.create);

  // login user
  app.post('/api/login', users.login);
  
  // retrive loggen in user
  app.get('/api/user', auth, users.findOne);

  // logout user
  app.get('/api/logout', auth, users.logout);

  // save tax computation
  app.post('/api/tax', auth, taxes.saveTax);

  // get previous tax computation
  app.get('/api/previous-taxes', auth, taxes.getTaxes);

}

