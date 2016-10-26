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
    let message = 'Chatter no.1 has entered the Chatterbox!\n'
    it('receives messages originating in server', done => {
      client1.once('data', data => {
        console.log(`Data event detected on port ${port}.`, data.toString);
        //socket.data = message
        assert.deepEqual(data, message);
        done();
      });
    });
    //2nd user receives message from server
    it('receives messages originating in server', done => {
      client2.once('data', data => {
        console.log(`Data event detected on port ${port}.`, data.toString);
        //socket.data = message
        assert.equal(data, message);
        done();
      });
    });
    //user receives messages from other users
    it('receives messages originating with other client', done => {
      client2.once('data', data => {
        console.log(`Data event detected on port ${port}.`, data.toString);
        //socket.data = message
        assert.equal(data, message);
        done();
      });
      client1.write('Hola, amigos.');
    });
    //other user disconnects
    it('receives messages originating with other client', done => {
      client2.once('data', data => {
        console.log(`Data event detected on port ${port}.`, data.toString);
        //socket.data = message
        assert.equal(data, message);
        done();
      });
      client1.end();
    });
  });

  after(done => {
    //undocumented node feature, client.end takes a callback
    client2.end(done);
    server.close(done);
  });
  
});

