const assert = require('chai').assert;
const ChatterBox = require('../lib/ChatterBox');


describe('ChatterBox module works as expected', () => {
  const testChat = new ChatterBox();

  class ChatterMock {
    write(message) {
      this.received = message;
    }
  }

  const chatter1 = new ChatterMock();
  const chatter2 = new ChatterMock();


  it('adds chatters properly', () => {

    assert.equal(testChat.chatterlist.length, 0);

    testChat.add(chatter1);

    assert.equal(testChat.chatterlist.length, 1);
    assert.equal(testChat.chatterlist[0].name, 'Chatter no.1');
  });
  

  it('does not send chatters their own messages', () => {

    testChat.add(chatter2);

    testChat.broadcast(chatter1, 'Felicitations');

    assert.notEqual(chatter1.received, 'Chatter no.1 says -- Felicitations');
  });

  it('does send chatters\' messages to everyone else', () => {

    assert.equal(chatter2.received, 'Chatter no.1 says -- Felicitations');
  });


  it('removes chatters from the array when they disconnect', () => {

    testChat.forget(chatter1);

    assert.equal(testChat.chatterlist.length, 1);
    assert.notEqual(testChat.chatterlist[0].name, 'Chatter no.1');
  });

  it('correctly notifies remaining chatters who has left', () => {

    assert.equal(chatter2.received, 'Chatter no.1 has fled the ChatterBox.\n');
  });
});