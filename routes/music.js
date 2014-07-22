var db = require('../models')

exports.add = function(req, res) {
  var data = {
    'hash': req.body.hash,
    'name': req.body.name,
    'link': req.body.link
  };

  db.Music
    .create(data)
    .complete(function(err, music){
      if( err ) {
        res.send({'success': 0});
      } else {
        res.send({
          'success': 1,
          'music': music
        })
      }
    })
}

exports.gen = function(req, res) {
  var hashes = ['abc', 'def', 'ghi']
  var names = ['first', 'second', 'third']
  var links = ['google.com', 'trello.com', 'expressjs.com']
  for (var i = 0; i < hashes.length; i ++) { 
    db.Music
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