const net = require('net');//get the node module that contains our server mojo
// const ChatterBox = require('./ChatterBox');//get the model for our chat session
// const tcpChatSession = require('./tcpChatSession');
// const letsChat = new ChatterBox();//set up a new chat session based on the model

//reserve a port for listening
const port = 65000;

//set up a new tcp server instance
const server = net.createServer(session(client))
.listen(
  port, err => {
    if(err) console.log('RRRRCCCHHH! That\'s a ', err);
    else console.log('server listening on ', port);
  });

module.exports = server;


