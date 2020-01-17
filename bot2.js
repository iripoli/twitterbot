/**
 * 
 * ESTE BOT TWEETEA CADA 6 SEGUNDOS UN HELLO WORLD +  UN NUMERO!
 */



const config = require('./config')
const twit = require('twit')
const T = new twit(config)


T.get('account/verify_credentials', {
    include_entities: false,
    skip_status: true,
    include_email: false
}, onAuthenticated)

let number = 0
setInterval(function(){
    onAuthenticated()
},6000
)

function onAuthenticated(err) {
    if (err) {
        console.log(err)
    } else {
       sendTweet()
    }

}

function sendTweet() {
    T.post('statuses/update', { status: 'hello world'+ number })
    number ++;
    console.log(number)
}