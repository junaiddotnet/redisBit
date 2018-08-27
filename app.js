const express  = require('express');
const redis  = require('redis');

// create the redis cleint
const redisClient  = redis.createClient({return_buffers:true});
const app = express();

function storeDailyVisit (date,userId)
{
    let key  = 'visit:'+date;
    redisClient.setbit(key,userId,1,function(err,result){
        if (!err)
        {
            console.log('user '+ userId,' visit is recorded ..');
        }
    });
}
function countVisits (date)
{
    let key  = 'visit:'+date;
    redisClient.bitcount(key,function(err,reply){
        console.log('Total visit for the Given date is .'+reply);
    });
}
function showUserIdFromVisits (date)
{

}
// display the redis bit resultts  ..

storeDailyVisit('2018-08-26',1);
storeDailyVisit('2018-08-26',2);
storeDailyVisit('2018-08-26',3);
storeDailyVisit('2018-08-26',5);

storeDailyVisit('2018-08-25',11);
storeDailyVisit('2018-08-25',12);
storeDailyVisit('2018-08-25',3);
storeDailyVisit('2018-08-25',115);
storeDailyVisit('2018-08-25',215);
storeDailyVisit('2018-08-25',315);


countVisits('2018-08-26');
countVisits('2018-08-25');

countVisits('2018-08-24');



app.listen(3000,function(){
    console.log('server sart ...');
});