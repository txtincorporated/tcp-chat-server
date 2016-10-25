const assert = require('chai').assert;
const ChatterBox = require('../ChatterBox');

//chatroom module works as advertized
describe('ChatterBox module works as expected', () => {
  const testChat = new ChatterBox();

  class ChatterMock {
    write(message) {
      this.received = message;
    }
  }

  const chatter1 = new ChatterMock();
  const chatter2 = new ChatterMock();

  //adds chatters
  it('adds chatters properly', () => {
    //test that no chatters are in array
    assert.equal(testChat.chatterlist.length, 0);
    //add chatter1
    testChat.add(chatter1);
    //test that 1 chatter now in array
    assert.equal(testChat.chatterlist.length, 1);
    assert.equal(testChat.chatterlist[0].name, 'Chatter no.1');
  });
  
  //broadcasts messages to everyone but the sender
  it('does not send chatters their own messages', () => {
    //add chatter2
    testChat.add(chatter2);
    //send mssg from chatter1
    testChat.broadcast(chatter1, 'Felicitations');
    //test that !chatter1.received
    assert.notEqual(chatter1.received, 'Chatter no.1 says -- Felicitations');
  });

  it('does send chatters\' messages to everyone else', () => {
    //test that chatter1.received === chatter1.sent
    assert.equal(chatter2.received, 'Chatter no.1 says -- Felicitations');
  });

  //removes chatters
  it('removes chatters from the array when they disconnect', () => {
    //remove chatter1
    testChat.forget(chatter1);
    //test that chatter1 not in array
    assert.equal(testChat.chatterlist.length, 1);
    assert.notEqual(testChat.chatterlist[0].name, 'Chatter no.1');
  });

  it('correctly notifies remaining chatters who has left', () => {
    //test that chatter2.received === 'chatter no.1 has fled the ChatterBox'
    assert.equal(chatter2.received, 'Chatter no.1 has fled the ChatterBox');
  });
});