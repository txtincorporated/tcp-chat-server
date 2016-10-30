const net = require('net');
const assert = require('chai').assert;
const expect = require('chai').expect;
const server = require('../lib/tcpChatServer');


describe('tcp chat server setup', () => {

  const port = 65000;

  before(done => {
    server.listen(port, done);
  });

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

    it('1st user receives messages originating in server', done => {
      client1.once('data', data => {
        console.log(`Data event detected on port ${port}.`, data);

        expect(data).match(/^Chatter no.1 has entered/);
        done();
      });
    });

    it('2nd user receives messages originating in server', done => {
      client2.once('data', data => {
        console.log(`Data event detected on port ${port}.`, data);

        expect(data).match(/^Chatter no.2 has entered/);
        done();
      });
    });

    it('2nd user receives messages originating with other client', done => {
      client2.once('data', data => {
        console.log(`Data event detected on port ${port}.`, data);

        assert.equal(data, 'Chatter no.1 says -- Hola, amigos.');
        done();
      });
      client1.write('Hola, amigos.');
    });

    it('2nd user receives messages originating in server', done => {
      client2.once('data', data => {

        console.log(`Data event detected on port ${port}.`, data);

        assert.equal(data, 'Chatter no.1 has fled the ChatterBox.\n');
        done();
      });
      client1.end();
    });
    after(done => {

      client2.end(done);
    });
  });

  after(done => {

    server.close(done);
  });
  
});

