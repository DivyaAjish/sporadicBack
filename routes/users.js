var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

const userModel = require('../models/users.model');

/* GET User Details */
router.post('/login', function(req, res, next) {
    
    var query = { 'emailAddress': req.body.emailAddress, 'password': req.body.password };
    console.log(query);
    userModel.find(query, function(err, userResponse){

    if(err){
      res.send({status: false, message: 'Unable to Find User'});
    }
    else {
        console.log(userResponse);
        if(userResponse.length > 0){        
        res.send({status: true, emailAddress: userResponse[0].emailAddress, firstName: userResponse[0].firstName, isAdmin: userResponse[0].isAdmin});
        }
        else {
          res.send({status: false, message: 'Unable to Find Userr'});
        }
    }

  });
  
});

/* Create New Plant */
router.post('/register', function(req, res, next) {

    let emailAddress = req.body.emailAddress;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let password = req.body.password;
    let isAdmin = req.body.isAdmin;

  
    let userObj = new userModel({
        emailAddress: emailAddress,
        firstName: firstname,
        lastName: lastname,
        password: password,
        isAdmin: isAdmin
    });
  
    userObj.save(function(err, userResponse){
  
      if(err){
        res.send({status: false, message: 'Unable to add Plant'});
      }
      else {
        console.log(userResponse);
        res.send({status: true, emailAddress: userResponse.emailAddress, firstName: userResponse.firstName, isAdmin: userResponse.isAdmin});
      }
  
    });
  });
module.exports = router;
