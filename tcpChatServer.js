const net = require('net');//get the node module that contains our server mojo
const ChatterBox = require('./ChatterBox');//get the model for our chat session
const letsChat = new ChatterBox();//set up a new chat session based on the model

//set up a new tcp server instance
const server = net.createServer( client => {
  //set client's data encoding to human-readable characters
  client.setEncoding('utf-8');

  //add client
  letsChat.add(client);//use ChatterBox.add method to register client in session

  //listen for clients' 'data' events
  client.on('data', message => {
    letsChat.broadcast(client, message);//use ChatterBox.broadcast method to broadcast each client's messages to the others
  });

//listen for clients' 'close' events and un-register them accordingly
  client.on('close', () => {
    letsChat.forget(client);//use ChatterBox.forget method remove clients emitting 'close' event
  });
});

//reserve a port for listening
const port = 65000;

//start the server
server.listen(port, err => {
  if(err) console.log('RRRRCCCHHH! That\'s a ', err);
  else console.log('server listening on ', port);
});


