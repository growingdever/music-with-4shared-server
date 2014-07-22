var db = require('../models');
var async = require('async');

var ERROR_UNKNOWN = 0;
var ERROR_NOT_EXIST_MUSIC = 1;

exports.vote = function(req, res) {
  async.waterfall([
    function(callback) { // add vote to db
      db.Vote
        .create({
          hash: req.body.hash
        })
        .complete(function(err, vote) {
          if(err) {
            callback( err );
          } else {
            callback( null, vote );
          }
        })
    }
    ], function(err, vote) {
      if( err ) {
        res.send({
          'success': 0,
          'code': ERROR_UNKNOWN
        });
      } else {
        // there isn't any error, 
        // checking is there music that is matching with vote's file id
        db.Music.find({
          where: {
            'hash': vote.hash
          }
        }).success(function(music){
          if( !music ) {
            res.send({
              'success': 0,
              'code': ERROR_NOT_EXIST_MUSIC
            });
          } else {
            res.send({
              'success': 1
            });  
          }
        });
      }
    });  
}

exports.list = function(req, res) {
  db.Vote.findAll({
    
  }).success(function(votes) {
    res.render('votes', {
      title: 'Express',
      votes: votes
    })
  });
};

exports.gen = function(req, res) {
  var hashes = ['abc', 'def', 'ghi']

  for (var i = 0; i < 50; i ++ ) {
    db.Vote
      .create({
        hash: hashes[2],
      })
      .complete(function(err, vote) {

      })
  }
  for (var i = 0; i < 30; i ++ ) {
    db.Vote
      .create({
        hash: hashes[1],
      })
      .complete(function(err, vote) {

      })
  }
  for (var i = 0; i < 10; i ++ ) {
    db.Vote
      .create({
        hash: hashes[0],
      })
      .complete(function(err, vote) {

      })
  }

  res.send({'success': 1})
}