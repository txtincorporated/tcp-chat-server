const net = require('net')
const ChatterBox = require('./ChatterBox');
const letsChat = new ChatterBox();

const server = net.createServer( client => {
  client.setEncoding('utf-8');

  letsChat.add(client);

  client.on('data', message => {
    letsChat.broadcast(client, message);
    letsChat.update(client, message);//add /nick functionality
  });

  client.on('close', () => {
    letsChat.forget(client);
  });
});

const port = 65000;

server.listen(port, err => {
  if(err) console.log('RRRRCCCHHH! That\'s a ', err);
  else console.log('server listening on ', port);
});