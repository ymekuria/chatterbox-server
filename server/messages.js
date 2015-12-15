var Messages = function(){
  this.results = [];
};

Messages.prototype.addMessage = function(username, roomname, message){
  this.results.push({
    createdAt: "2015-12-14T22:45:18.702Z",
    objectId: "345345",
    roomname: roomname,
    message: message,
    updatedAt: "2015-12-14T22:45:18.702Z",
    username: username
  });
};

var mess = new Messages();

module.exports = mess;