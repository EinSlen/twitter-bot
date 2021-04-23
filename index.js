var twit = require('twit');
var config = require('./utils/config');
const { phrase } = require('./utils/phrase');
var T = new twit(config)
var stream = T.stream('user')

stream.on('follow', followed)

//console.log(phrase)

function followed(eventMsg) {
    var name = eventMsg.source.name
    var screenName = eventMsg.source.screen_name
    tweetIt('@' + screenName + ' Ehhhhh mercé pour le follow ' + name)
    console.log('Followed ! ' + name)
}

function tweetIt(text) {
    var tweet = {
        status: text
    }
    T.post('statuses/update', tweet, tweeted);
    function tweeted(err, data, response) {
        if(err) {
            console.log('Error: ' + err)
        } else {
            console.log('Tweeted !')
        }
    }
}

function startStreaming() {
    var i = Math.floor(Math.random() * phrase.length)
    T.stream('statuses/filter', { track: 'brulux' }, function(stream) {
        console.log('Listening des tweets...');
        stream.on('data', function(tweet) {
            if (tweet.text.match('brulux')) {
                T.updateStatus('@' + tweet.user.screen_name + ` \n${phrase[i]}` ,
                    {in_reply_to_status_id: tweet.id_str}, callback);
            }
        });
    });
}

startStreaming();