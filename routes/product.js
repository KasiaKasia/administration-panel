var mongoose = require('mongoose');
var products = require('../models/products');
var config = require('../server/config');
const ObjectID = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
var users = require('../models/user');

exports.saveproduct = function (req, res, next) {

  const userid = req.params.id;
  const productName = req.body.productName;
  const productType = req.body.productType;
  const productDesc = req.body.productDesc;
  const expid = req.body.expid;

  if (!userid || !productName || !productType || !productDesc) {
    return res.status(422).send({
      success: false,
      message: 'Posted data is not correct or incompleted.'
    });
  } else {

    if (expid) {    
      products.findById({
        productName: req.body.productName
      }).exec(function (err, product) {
        if (err) {
          res.status(400).json({
            success: false,
            message: 'Error processing request ' + err
          });
        }
        if (product) {
          product.productName = productName;
          product.productType = productType;
          product.productDesc = productDesc;
        }
        product.save(function (err) {
          if (err) {
            res.status(400).json({
              success: false,
              message: 'Error processing request ' + err
            });
          }
          res.status(201).json({
            success: true,
            message: 'Product updated successfully'
          });
        });
      });
    } else {
      let oProduct = new products({
        userid: userid,
        productName: productName,
        productType: productType,
        productDesc: productDesc
      });

      oProduct.save(function (err) {
        if (err) {
          res.status(400).json({
            success: false,
            message: 'Error processing request ' + err
          });
        }

        res.status(201).json({
          success: true,
          message: 'Product saved successfully'
        });
      });
    }
  }
}


exports.selectUsersProductsCount = function (req, res, next) {

  products.aggregate([{
      $lookup: {
        from: "users",
        localField: "ObjectId(userid)",
        foreignField: "ObjectId(_id)",
        as: "users"
      }
    }, {
      "$group": {
        _id: {
          userid: "$userid"
        },
        name: {
          $last: "$users.username"
        },
        count: {
          $sum: 1
        }
      }
    }, {
      $sort: {
        "_id.userid": 1
      }
    }

  ], function (err, result) {

    if (err) {
      res.status(400).json({
        success: false,
        message: 'Error processing request ' + err
      });
    }
    res.status(201).json({
      success: true,
      data: result
    });
  });
}

exports.selectproducts = function (req, res, next) {

  products.find({
    userid: req.params.id
  }).exec(function (err, product) {
    if (err) {
      res.status(400).json({
        success: false,
        message: 'Error processing request ' + err
      });
    }
    res.status(201).json({
      success: true,
      data: product
    });

  });
}

exports.deleproduct = function (req, res, next) {
  products.remove({
    _id: req.params.id
  }, function (err) {
    if (err) {
      res.status(400).json({
        success: false,
        message: 'Error processing request ' + err
      });
    }
    res.status(201).json({
      success: true,
      message: 'Product removed successfully'
    });
  });
}

exports.updateProduct = function (req, res, next) {
  var updateDoc = req.body;
  products.updateOne({
    _id: new ObjectID(updateDoc._id)
  }, {
    $set: updateDoc
  }, (err, doc) => {

    if (err) {
      console.log(err);
    } else {
      res.status(200).json(updateDoc);
    }
  });
}
