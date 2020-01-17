const config=require('./config')
const twit=require('twit')
const T = new twit (config)


T.get('account/verify_credentials', {
    include_entities: false,
    skip_status: true,
    include_email: false
}, onAuthenticated)

function onAuthenticated(err){
    if (err) {
        console.log(err)
    } else {
        const palabrasClave = ['@aylennesi']
        var stream = T.stream('statuses/filter', { track: '@aylennesi'})

        stream.on('tweet', function (tweet) {
            console.log(tweet.text)
        })

        }
}
// function sendTweet(){
//     T.post('statuses/update', { status: '@aylennesi holaaa'})
// }
