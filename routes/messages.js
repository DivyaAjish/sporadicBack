var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

const messageModel = require('../models/messages.model');

/* Create New Plant */
router.post('/add', function(req, res, next) {

  let messageName = req.body.messageName;
  let messageDescription = req.body.messageDescription;
  let userEmail = req.body.userEmail;
 
  let messageObj = new messageModel({
    messageName: messageName,
    userEmail: userEmail,
    messageDescription: messageDescription,
    
  });

  messageObj.save(function(err, messageResponse){

    if(err){
      res.send({status: 500, message: 'Unable to add Plant'});
    }
    else {
      res.send(messageResponse);
    }

  });
});

module.exports = router;
