const User = require('../models/user-model')
const  jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



exports.signup =async (req, res) => {

  const user =await new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    role : req.body.role
  });


  await user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ message: "User was registered successfully!" });

  });
};

exports.signin = async (req, res) => {
  
  const user = await User.findOne({email : req.body.email})

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

  const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

  const token = jwt.sign({ id: user.id }, 'top_secret', {
        expiresIn: 86400, // 24 hours 
      });

      

      req.session.token = token;

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: token,
        fullname: user.fullname,
        gender: user.gender,
        phoneno: user.phoneno
      });
    
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};
