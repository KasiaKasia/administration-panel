var mongoose = require('mongoose');
var User = require('../models/user');
var Address = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../server/config');


exports.signup = function (req, res, next) {

  // Check for registration errors

  const userName = req.body.userName;
  const password = req.body.password;
  const description = "";
  const email = req.body.email;
  const type = req.body.type;
  const street = "";
  const houseNumber = "";
  const city = "";

  if (!userName || !password) {
    return res.status(422).json({
      success: false,
      message: 'Posted data is not correct or incomplete.'
    });
  }

  User.findOne({
    username: userName
  }, function (err, existingUser) {
    console.log(' 2 registration');
    if (err) {
      res.status(400).json({
        success: false,
        message: 'Error processing request ' + err
      });
    }

    if (existingUser) {
      return res.status(201).json({
        success: false,
        message: 'User name already exists.'
      });
    }

    let uAddress = new Address({
      street: street,
      houseNumber: houseNumber,
      city: city,
    });

    let oUser = new User({
      username: userName,
      password: password,
      description: description,
      email: email,
      type: type,
      address: {
        street: street,
        houseNumber: houseNumber,
        city: city
      }
    });

    oUser.save(function (err, oUser) {
      if (err) {
        res.status(400).json({
          success: false,
          message: 'Error processing request ' + err
        });
      }

      res.status(201).json({
        success: true,
        message: 'User created successfully, please login to access your account.'
      });
      console.log('User created successfully, please login to access your account.');
    });
  });
}


exports.login = (req, res, next) => {

  User.findOne({
    username: req.body.userName
  }, function (err, user) {

    if (err) {
      res.status(400).json({
        success: false,
        message: 'Error processing request ' + err
      });
    }

    if (!user) {
      res.status(201).json({
        success: false,
        message: 'Incorrect login credentials.'
      });
    } else if (user) {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          console.log('3 exports.login ');
          var token = jwt.sign(user.toObject(), config.secret, {
            expiresIn: config.tokenexp
          });

          user.save(function (err) {
            if (err) {
              res.status(400).json({
                success: false,
                message: 'Error processing request ' + err
              });
            }
            res.status(201).json({
              success: true,
              message: {
                'userid': user._id,
                'username': user.username,
                'password': user.password,
                'description': user.description,
                'email': user.email,
                'type': user.type,
                'address': {
                  'street': user.street,
                  'houseNumber': user.houseNumber,
                  'city': user.city
                }
              },
              token: token
            });
          });
        } else {
          res.status(201).json({
            success: false,
            message: 'Incorrect login credentials.'
          });
        }
      });
    }
  });
}

exports.updateUser = function (req, res, next) {

  const userid = req.params.id;
  const userName = req.body.userName;
  const description = req.body.description;
  const email = req.body.email;
  const type = req.body.type;
  const street = req.body.street;
  const houseNumber = req.body.houseNumber;
  const city = req.body.city;

  if (!userName || !email || !userid || !type) {
    return res.status(422).json({
      success: false,
      message: 'Posted data is not correct or incompleted.'
    });
  } else {

    User.findById(userid).exec(function (err, user) {
      if (err) {
        res.status(400).json({
          success: false,
          message: 'Error processing request ' + err
        });
      }

      if (user) {
        user.username = userName;
        user.description = description;
        user.email = email;
        user.type = type;

        user.address.street = street,
          user.address.houseNumber = houseNumber,
          user.address.city = city

      }
      user.save(function (err) {
        if (err) {
          res.status(400).json({
            success: false,
            message: 'Error processing request ' + err
          });
        }
        res.status(201).json({
          success: true,
          message: 'User details updated successfully'
        });
      });
    });
  }
}
exports.getUses = function (req, res, next) {

  User.find().exec(function (err, user) {

    if (err) {
      res.status(400).json({
        success: false,
        message: 'Error processing request ' + err
      });
    }
    res.status(201).json({
      success: true,
      data: user

    });
  });
}


exports.getuserDetails = function (req, res, next) {

  User.find({
    _id: req.params.id
  }).exec(function (err, user) {


    if (err) {
      res.status(400).json({
        success: false,
        message: 'Error processing request ' + err
      });
    }
    res.status(201).json({
      success: true,
      data: user
    });

  });
}

exports.updatePassword = function (req, res, next) {

  const userid = req.params.id; // getting id from an IP address
  const oldpassword = req.body.oldpassword;
  const password = req.body.password;
  const retypepass = req.body.retypepass;



  if (!oldpassword || !password || !userid || retypepass !== password) {
    //    console.log('Posted data is not correct or incompleted.'); 422
    return res.status(422).json({
      success: false,
      message: 'Posted data is not correct or incompleted.'
    });
  } else {
    /*
    findOne - method search the user for given object `id`
    */
    User.findOne({
      _id: userid
    }, function (err, user) {
      // res.status(400) - sets the HTTP status for the response.
      if (err) {
        res.status(400).json({
          success: false,
          message: 'Error processing request ' + err
        });
      }
      if (user) {
        user.comparePassword(oldpassword, function (err, isMatch) {
          if (isMatch && !err) {

            user.password = password;
            // save -save new password
            user.save(function (err) {
              if (err) {
                res.status(400).json({
                  success: false,
                  message: 'Error processing request ' + err
                });
              }

              res.status(201).json({
                success: true,
                message: 'Password updated successfully'
              });
            });
          } else {
            res.status(201).json({
              success: false,
              message: 'Incorrect old password.'
            });
          }
        });
      }
    });
  }
}
