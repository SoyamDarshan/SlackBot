var Botkit = require('botkit');
var token = process.env.SLACK_TOKEN;

var controller = Botkit.slackbot({
  retry: Infinity,
  debug: false
});

if(token){
  console.log('Starting in a single team mode');
  controller.spawn({
    token:token
  }).startRTM(function(err,bot,payload){
    if(err){
      throw new Error(err);
    }

    console.log('Connected to slack RTM');
  });

} else{
  console.log('Starting bot in beep boop mode');
  require('beepboop-botkit').start(controller,{debug:true});
}

controller.on('bot_channel_join',function(bot,message){
  bot.reply(message,"I'm here!");
});

controller.hears(['hi', 'hello', 'bot', 'whats up', 'sup'], function(bot, message) {
    bot.reply(message, 'Hi there!');
}),
controller.hears(['how are you?'],'direct_message,direct_mention', function(bot, message) {
    bot.reply(message, "I'm Fine. What about you?");
    bot.reply(message, "How may I assist you?");
});
