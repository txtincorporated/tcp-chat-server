module.exports = class ChatterBox {
  constructor() {
    this.earlybird = 1;
    this.chatterlist = [];
  }
  
  add(chatter) {
    chatter.name = 'Chatter no.' + (this.earlybird++);
    this.chatterlist.push(chatter);
    this.chatterlist.forEach(val => {
      val.write(`${chatter.name} has entered the ChatterBox!\n`);
    });
  }


  broadcast(sender, message) {
    this.chatterlist.forEach(val => {
      if(val !== sender) val.write(`${sender.name} says -- ${message}`);      
    });
  }

  update(sender, message) {
    if(/^\/nick/.test(message)){
      this.chatterlist.forEach(val => val.write(sender.name + ' name change: ' + message.substr(6)));
      this.chatterlist.forEach(val => {
        if(val == sender) {
          let stop = message.length - 8;
          val.name = message.substr(6, stop);
          sender.name = message.substr(6, stop);
        }
      });
    }
  }

  forget(chatter) {

    const who = this.chatterlist.indexOf(chatter);
    if(who !== -1) this.chatterlist.splice(who, 1);
    
    this.chatterlist.forEach(val => {
      val.write(`${chatter.name} has fled the ChatterBox.\n`);
    });
  }
};