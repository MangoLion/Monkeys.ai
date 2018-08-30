
Bot = class Bot{
  constructor(name){
    this.name = name;
    this.Text = name;
    this.isActive = false;
    this.msgLeft = 10;
    this.chat = {};
    this.isRegistered = false;
    this.isAlwaysActive = false;
    this.textData = "";
  }

  importText(textData){
    this.model = new MarkovChain(textData);
  }

  unregister(){
    if (this.isRegistered)
      this.chat.unregisterBot(this);
  }

  sleep(){
    this.isActive = false;
  }

  wake(msg){
    this.isActive = true;
    this.msgLeft = msg;
  }

  approved(){
    if (this.isAlwaysActive){
      this.isActive = true;
      return;
    }

    this.msgLeft--;
    if (this.msgLeft <= 0){
      sleep();
    }
  }

  respond(input, endArgs){
    var match = false;
    var text = "";

    if (input.sender != this){
      var words = input.text.trim().split(" ");
      var importantWord = words[0];
      words.forEach(function(word){
        if (word.length > importantWord.length)
          importantWord = word;
      })
      //FIX FIX // FIXME:
      importantWord = chance.pick(words);

      text = this.model.start(importantWord).end(endArgs).process();
    }else {
      text = input.text;
    }

    if (text == input.text || text.trim().split(" ").length < 4){
      text = this.model.start(SUtility.randomPropertyName(this.model.wordBank)).end(endArgs).process();
    } else{
      match = true;
    }

    var response = {
      sender: this,
      match: match,
      text:text
    }
    return response;
  }

  static createFromLogs(text, delimiter, threshold){
    var bots = {};

  }
}
