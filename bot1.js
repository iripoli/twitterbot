const config=require('./config')
const twit=require('twit')
const T = new twit (config)


T.get('account/verify_credentials', {
    include_entities: false,
    skip_status: true,
    include_email: false
}, onAuthenticated)


setInterval(function(){
    onAuthenticated()
},60000
)

function onAuthenticated(err){
   if (err) {
       console.log(err)
   } else {
       const palabrasClave = ['']
       T.get('followers/ids', { screen_name: 'aylennesi'}, function(err, data, response) {
           console.log(data)
         })

       }

   }




