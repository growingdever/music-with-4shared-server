var db = require('../models')
var async = require('async')

var CHART_LIMIT = 100;

exports.list = function(req, res) {
  db.Chart.findAll({
    limit: CHART_LIMIT,
    order: '`count` DESC'
  }).success(function(chart) {
    res.send({
      'data': chart
    });
  })
};

exports.update = function(req, res) {
  db.Chart.destroy({

  }).success(function() {
    db.Vote.findAll({

    }).success(function(votes) {
      // below way must to be better.... not good.
      // I thought key<string> - value(int) structure in c++
      var hashmap = {};
      for (var i = votes.length - 1; i >= 0; i--) {
        var vote = votes[i];
        if( hashmap[vote.hash] == null ) {
          hashmap[vote.hash] = {};
          hashmap[vote.hash].count = 1;
        }
        else
          hashmap[vote.hash].count ++;
      }

      var arr = [];
      for (obj in hashmap) {
        arr.push( [ obj, hashmap[ obj ] ] );
      }
      arr.sort(function(a, b) {
        return a.count - b.count;
      })
      arr.reverse()

      // arr[i] : (i)th element hash
      // arr[i].count : (i)th element count
      async.each(arr, function(elem, callback) {
        db.Music.find({
          where: {hash: elem[0]}
        }).success(function(music) {
          if( !music ) {
            // there isn't music that is matching with file id!!
          } else {
            db.Chart
              .create({
                hash: music.hash,
                name: music.name,
                link: music.link,
                count: elem[1].count
              })
              .complete(function(err, chart) {
                callback(err);
              });  
          }
        });
      }, function(err) {
        if( err ) {
          res.send({ 
            "success": 0, 
            "err": err 
          });
        }
        else {
          res.send({ 
            "success": 1
          });  
        }
      });
    })
  })
}

exports.gen = function(req, res) {
  var hashes = ['abc', 'def', 'ghi']
  var names = ['first', 'second', 'third']
  var links = ['google.com', 'trello.com', 'expressjs.com']
  for (var i = 0; i < hashes.length; i ++) { 
    db.Chart
      .create({
        hash: hashes[i],
        name: names[i],
        link: links[i]
      })
      .complete(function(err, user) {
        if( i == hashes.length )
          res.send({
            "success": 1
          })
      })
  }
}