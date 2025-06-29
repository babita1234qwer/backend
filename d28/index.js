const express=require('express');
const app=express();
const main=require('./aichat');
app.use(express.json());


const chattingHistory={};
// const chattingHistory={};
app.post('/chat',async(req,res)=>{
    const {id,msg}=req.body;
    if(!chattingHistory[id]){
        chattingHistory[id]=[];
    }
    const History=chattingHistory[id];
    const promptmessage=[...History,{role:"user",parts:[{text:msg}]}];
    const answer=await main(promptmessage);
    History.push({role:"user",parts:[{text:msg}]});
    History.push({role:"model",parts:[{text:answer}]});
    res.send(answer);

})

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})