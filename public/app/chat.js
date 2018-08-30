Chat = class Chat{
  constructor(name, options){
    if (!options)
      options = {};

    this.name = name;
    this.Text = name;
    this.bots = [];

    this.activeLimit = options.activeLimit || 7;
    this.frequency = options.frequency || -1;
    this.thread = -1;
    this.ui = {};

    this.content = [];
  }

  registerBot(bot){
    bot.isRegistered = true;
    this.bots.push(bot);
    UI.updateChat();
  }

  unregisterBot(bot){
    SUtility.remove_item(this.bots, bot);
    UI.updateChat();
  }

  start(){
    if (this.frequency < 0)
      return;

    var self = this;
    this.thread = setInterval(function(){
      //do stuff with self
      self.wakeBots();
      var lastMsg = self.content[self.content.length-1];
      if (!lastMsg)
        lastMsg = {
          sender: {
            name: "no one"
          },
          text: ""
        };
      self.generate(lastMsg);

    }, this.frequency*1000)
  }

  wakeBots(){
    var activeBots = this.activeBots;
    var sleepingBots = this.sleepingBots;
    if (activeBots.length > this.activeLimit)
      return;

    var count = this.activeLimit - activeBots.length
    for (var i = 0; i < count && sleepingBots.length > 0; i ++){
      var toWake = chance.pick(sleepingBots);
      toWake.wake();
    }
  }

  stop(){
    window.clearInterval(this.thread);
  }

  getText(){
    var text = "";
    this.content.forEach(function(sentence){
      text += '<font color="blue">' + sentence.sender.name + ": "  + '</font>'+ sentence.text + '<br>';//sentence.sender.name + ": " + sentence.text + "<br>";
    })
    return text;
  }

  addBot(bot){
    this.bots.push(bot);
  }

  generate(input){
    var answer;
    var responses = [];
    var activeBots = this.activeBots;
    for (var i = 0; i < activeBots.length; i ++){
      var bot = chance.pick(activeBots); //ineficient :(
      var response = bot.respond(input, ".");
      if (response.match){
        answer = response;
        break;
      }else {
        responses.push(response);
      }
    }

    if (!answer)
      answer = chance.pick(responses);
    console.log(responses);
    this.content.push(answer);
    UI.postIfActive(this, '<font color="blue">' + answer.sender.name + ": "  + '</font>'+ answer.text );
    answer.sender.approved();
  }

  get activeBots(){
    var activeBots = [];
    this.bots.forEach(function(bot){
      if (bot.isActive || bot.isAlwaysActive)
        activeBots.push(bot);
    })

    return activeBots;
  }

  get sleepingBots(){
    var sleepingBots = [];
    this.bots.forEach(function(bot){
      if (!bot.isActive)
        sleepingBots.push(bot);
    })

    return sleepingBots;
  }
}
