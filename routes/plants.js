var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var multer = require('multer');

const plantModel = require('../models/plants.model');

// Multer File upload settings
const DIR = './public/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});

// Multer Mime Type Validation
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

/* GET All plants */
router.get('/list', function(req, res, next) {
  
  plantModel.find(function(err, plantListResponse){

    if(err){
      res.send({status: 500, message: 'Unable to Find Plants'});
    }
    else {
      res.send(plantListResponse);
    }

  });
  
});

/* GET Details of a specific plant */
router.get('/view/:id', function(req, res, next) {

  const plantId = req.params.id;
  
  plantModel.findById(plantId, function(err, plantResponse){

    if(err){
      res.send({status: 500, message: 'Unable to Find the Plants'});
    }
    else {
      res.send(plantResponse);
    }

  });
  
});

/* Create New Plant */
router.post('/add', function(req, res, next) {

  let plantName = req.body.plantName;
  let plantType = req.body.plantType;
  let plantDescription = req.body.plantDescription;
  let plantUses = req.body.plantUses;
  let plantLocation = req.body.plantLocation;
  let plantUrl = req.body.plantUrl;
  let plantImg = req.body.plantImage;

  let plantObj = new plantModel({
    plantName: plantName,
    plantType: plantType,
    plantDescription: plantDescription,
    plantUses: plantUses,
    plantLocation: plantLocation,
    plantUrl: plantUrl
  });

  plantObj.save(function(err, plantResponse){

    if(err){
      res.send({status: 500, message: 'Unable to add Plant'});
    }
    else {
      res.send(plantResponse);
    }

  });
});

router.post('/upload', upload.single('plantUrl'), (req, res, next) => {
  // const url = req.protocol + '://' + req.get('host')

  let plantName = req.body.plantName;
  let plantType = req.body.plantType;
  let plantDescription = req.body.plantDesc;
  let plantUses = req.body.plantUses;
  let plantLocation = req.body.plantLocation;

  let plantObj = new plantModel({
    plantName: plantName,
    plantType: plantType,
    plantDescription: plantDescription,
    plantUses: plantUses,
    plantLocation: plantLocation,
    plantUrl: 'http://localhost:3000/' + req.file.filename
  });

/*
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    avatar: url + '/public/' + req.file.filename
  });
*/
plantObj.save(function(err, plantResponse){

  if(err){
    res.send({status: 500, message: 'Unable to add Plant'});
  }
  else {
    res.send(plantResponse);
  }
});

});

/* Update existing Plant */
router.post('/update', upload.single('plantUrl'), (req, res, next) => {
  
  console.log("Entering the file");
  let plantPath = '';

    if (!req.file) {
      console.log()
      plantPath = req.body.plantUrl;  
    }
  else {
    plantPath = 'http://localhost:3000/' + req.file.filename;
  }

  console.log("Plant value is set");
  console.log(plantPath);
  let plantId = req.body.plantId;
  
  let plantName = req.body.plantName;
  console.log(plantName);
  let plantType = req.body.plantType;
  console.log(plantType);
  let plantDescription = req.body.plantDesc;
  console.log(plantDescription);
  let plantUses = req.body.plantUses;
  console.log(plantUses);
  let plantLocation = req.body.plantLocation;

  console.log("Entering plantobj");
  let plantObj = {
    plantName: plantName,
    plantType: plantType,
    plantDescription: plantDescription,
    plantUses: plantUses,
    plantLocation: plantLocation,
    plantUrl: plantPath
  };
  console.log("Exit plantobj");
  console.log(plantObj);
  plantModel.findByIdAndUpdate(plantId, plantObj, function(err, plantResponse){
    console.log(err);
    if(err){
      res.send({status: 500, message: 'Unable to Update the Plant'});
    }
    else {
      res.send({status: 200, message:'Plant updated successfully', results: plantResponse});
    }

  });
});

/* Delete existing Plant */
router.get('/delete/:id', function(req, res, next) {
  const plantId = req.params.id;

  plantModel.findByIdAndDelete(plantId, function(err, plantResponse){

    if(err){
      res.send({status: 500, message: 'Unable to Delete the Plant'});
    }
    else {
      res.send({status: 200, message:'Plant deleted successfully'});
    }

  });
});

module.exports = router;
