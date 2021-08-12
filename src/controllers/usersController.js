const User = require('../models/user');

exports.create = function(req, res) {
  // taking a user
  const newuser = new User(req.body);
   
  if(newuser.password != newuser.password2) return res.status(400).json({ message: "Password not match" });
  if(newuser.password.length != 6) return res.status(400).json({ message: "Password must contain 6 or more characters" });
   
  User.findOne({ email: newuser.email },function(err,user) {
    if(user) return res.status(400).json({ auth : false, message: "Email already exit"});

    newuser.save((err,doc) => {
      if(err) {
        console.log(err);
        return res.status(400).json({ success : false, message: "Something went wrong" });
      }
      res.status(200).json({
        succes: true,
        user: {
          username: doc.username,
          email: doc.email
        }
      });
    });
  });
}

exports.login = function(req, res) {
  let token=req.cookies.auth;

  User.findByToken(token,(err,user) => {
    if(err) return res(err);
    if(user) return res.status(409).json({
      error :true,
      message:"You are already logged in"
    });
  
    User.findOne({ email: req.body.email }, function(err, user) {
      if(!user) return res.status(400).json({ isAuth: false, message: 'User does not exist' });

      user.comparepassword(req.body.password,(err, isMatch) => {
        if(!isMatch) return res.status(400).json({ isAuth: false, message: "Password doesn't match" });

        user.generateToken((err,user) => {
          if(err) return res.status(400).json({ isAuth: false, message: "Something went wrong" });

          res.cookie('auth',user.token).json({
            isAuth: true,
            email: user.email
          });
        });    
      });
    });
  });
}

exports.logout = function(req, res) {
  req.user.deleteToken(req.token,(err, user) => {
    if(err) return res.status(400).send(err);
    res.sendStatus(200);
  });
}

exports.findOne = function(req, res) {
  res.json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    name: req.user.username
  });
};