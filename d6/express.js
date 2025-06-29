const express=require('express');
const app=express(); 
const bookstore=[{
    id:1,name:"book1",author:"author1",price:100
},
{id:2,name:"book2",author:"author2",price:200
},
{id:3,name:"book3",author:"author3",price:300
}]
app.get('/bookstore',(req,res)=>{
res.send(bookstore);
})

app.use(express.json());
//app.use((req,res)=>{
   // res.send({"name":"rohit"});
//})
//app.get('/home',(req,res)=>{
  //  res.send("home page");
//});
//app.post("/home",(req,res)=>{
    //console.log(req.body);
   // res.send("post method");
//})
app.patch("/bookstore",(req,res)=>{
    console.log(req.body);
   const book= bookstore.find((b)=>b.id===req.body.id);
   book.author=req.body.author;
    res.send("patch updated")
})
app.delete("/bookstore/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const index=bookstore.findIndex((b)=>b.id===id);
    bookstore.splice(index,1);
    res.send("successfully deleted");
})
app.use("/",(req,res,next)=>{
  //res.send("default page1");
    console.log("middleware1");
    next();
},(req,res)=>{
    res.send("default page2");
})
app.listen(4700,(req,res)=>{
    console.log("listeningon port 3000");
 })
