const jwt=require('jsonwebtoken');
const user=require('../Models/users');
const redisClient = require('../config/redis');
const windowsize=3600;
const maxreq=10;
const ratelimiter=async(req,res,next)=>{
    try{
         // ⚠️ Use only during testing!
         const key=`IP${req.ip}`;
         const currentTime=Date.now()/1000;
         const window_time=currentTime-windowsize;
         await redisClient.zRemRangeByScore(key,0,window_time);
        const numberofreq= await redisClient.zCard(key);
        if(numberofreq>maxreq){
            throw new Error("Rate limit exceeded");}
            await redisClient.zAdd(key,[{ score:currentTime, value:`${currentTime}:${Math.random()}`}]);
        await redisClient.expire(key,windowsize);
            /*{const ip=req.ip;
    
        const count= await redisClient.incr(ip);
        console.log(count);
      if(count>10){
        throw new Error("rate limit exceeded");
      }
      if(count==1){
        await redisClient.expire(ip,3600);
      }
      next();}*/
    }
    catch(err){
        res.send("Error: "+err.message);
    }   
}
module.exports=ratelimiter;
