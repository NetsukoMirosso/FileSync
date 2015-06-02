'use strict';
angular.module('FileSync')
  .controller('CommentCtrl', function ($scope, SocketIOService) {
    this.commentList = ['bonjour', 'hello world'];

    this.comment = '';
    this.date='';
    this.auteur='';

    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database(':memory:');
    db.run("CREATE TABLE commentaire (message TEXT,timestamp TEXT, auteur TEXT)");

    SocketIOService.onComment(function (userid, comment) {
      // on new chat message from another user
      this.comments.push(userid + ': ' + comment);
      $scope.$apply();
    }.bind(this));

    this.sendComment = function (comment) {
      debugger;
      this.commentList.push(comment);
      SocketIOService.broadcastComment(comment);
      db.run("INSERT INTO test VALUES (?,?,?)", [comment,date,auteur]);
    
    }.bind(this);
  });