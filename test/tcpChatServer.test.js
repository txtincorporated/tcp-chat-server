const net = require('net');
const assert = require('chai').assert;
const server = require('../tcpChatServer');

//outer describe
describe('tcp chat server setup', () => {
  //set up server
  const port = 65000;

  before(done => {
    server.listen(port, done);
  });
  //inner describe
  describe('basic socket functions', () => {

    let client1 = null;
    let client2 = null;
    before(done => {
      client1 = net.connect({port: port}, err => {
        if (err) done(err);
        else {
          client1.setEncoding('utf-8');
          done();
        }
      });
    });

    before(done => {
      client2 = net.connect({port: port}, err => {
        if (err) done(err);
        else {
          client2.setEncoding('utf-8');
          done();
        }
      });
    });
    //1st user receives message from server
    it('1st user receives messages originating in server', done => {
      let message = 'Chatter no.1 has entered the Chatterbox!\n';
      client1.once('data', data => {
        console.log(`Data event detected on port ${port}.`, data);
        //socket.data = message
        assert.equal(data, message);
        done();
      });
    });
    //2nd user receives message from server
    it('2nd user receives messages originating in server', done => {
      client2.once('data', (data, message) => {
        console.log(`Data event detected on port ${port}.`, data);
        //socket.data = message
        assert.equal(data, 'Chatter no.1 has entered the Chatterbox!\n');
        done();
      });
    });
    //user receives messages from other users
    it('2nd user receives messages originating with other client', done => {
      client2.once('data', (data, message) => {
        console.log(`Data event detected on port ${port}.`, data);
        //socket.data = message
        assert.equal(data, 'Chatter no.1 says -- Hola, amigos.');
        done();
      });
      client1.write('Hola, amigos.');
    });
    //other user disconnects
    it('2nd user receives messages originating in server', done => {
      client2.once('data', data => {
        console.log(`Data event detected on port ${port}.`, data.toString);
        //socket.data = message
        assert.equal(data, 'Chatter no.1 has fled the ChatterBox.\n');
        done();
      });
      client1.end();
    });
    after(done => {
      //undocumented node feature, client.end takes a callback
      client2.end(done);
    });
  });

  after(done => {
    //undocumented node feature, client.end takes a callback
    server.close(done);
  });
  
});

