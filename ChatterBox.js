module.exports = class ChatterBox {
  constructor() {//instructions for creating new ChatterBoxes
    this.earlybird = 1;
    this.chatterlist = [];
  }
  
  //tell requiring functions how to add users
  add(chatter) {
    chatter.name = 'Chatter no.' + (this.earlybird++);//Give the new chatter a name
    this.chatterlist.push(chatter);//Add new chatter to the list 
  }

  //tell requiring functions how to broadcast messages from one chatter to the others
  broadcast(sender, message) {
    //cycle through everyone in the chatterlist and...
    this.chatterlist.forEach((val) => {
      //if they are not the sender...
      if (val !== sender) {
      //send them the chatter's message
        val.write(`${sender.name} says -- ${message}`);
      }
    });
  }

  //tell requiring functions how to forget users when they disconnect
  forget(chatter) {
    //when chatter emits 'close' event, remove from chatterlist
    const who = this.chatterlist.indexOf(chatter);
    if(who !== -1) this.chatterlist.splice(who, 1);
    this.chatterlist.forEach(val => {
      val.write(`${chatter.name} has fled the ChatterBox`);
    });
  }
};