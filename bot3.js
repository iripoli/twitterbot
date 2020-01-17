const config=require('./config')
const twit=require('twit')
const T = new twit (config)


T.get('account/verify_credentials', {
    include_entities: false,
    skip_status: true,
    include_email: false
}, onAuthenticated)

const palabrasClave = ['macri gato', 'cristina chorra', 'sergio massa', 'unidas podemos', 'macrisis']
const respuestas = ['Y a mi que me importa lo que vos pensas', 'pero deja de llorar por favor', 'Vos por que sos igual de ladron']

function onAuthenticated(err) {
    var stream = T.stream('statuses/filter', {track:palabrasClave, tweet_mode:'extended'})
    
    stream.on('tweet', function (tweet) {
        if (!tweet.retweeted_status && isTweetExactMatch(tweet.text)){
            sendReply(tweet)
        }
        console.log(tweet.text)
    })
}

function isTweetExactMatch(text){
    text = text.toLowerCase()
    return palabrasClave.some(term => text.includes(term))
}

function sendReply(tweet){
    var screenName = tweet.user.screen_name
    var response = '@' + screenName + ' ' + respuestas[Math.floor(Math.random() * respuestas.length)]

    T.post('statuses/update', {
        // To reply we need the id of tweet we're replying to.
        in_reply_to_status_id:tweet.id_str,
        // Status is the content of the tweet, we set it to the response string we made above.
        status:response
        // After we tweet we use a callback function to check if our tweet has been succesful.
    })
}

