const express=require('express');
const app=express();
app.use(express.json());
const foodmenu=[
    {id:1,name:"food1",price:100},
    {id:2,name:"food2",price:200},
    {id:3,name:"food3",price:300}
];
const addtocart=[];
app.post("/user/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const fooditems=foodmenu.find((f)=>f.id===id);
    if(fooditems){
        addtocart.push(fooditems);
        res.status(200).send("added to cart");
    }
    else{
        res.status(404).send("food item not found");
    }

})
app.delete("/user/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const index=addtocart.findIndex((f)=>f.id===id);
    if(index>=0){
        addtocart.splice(index,1);
        res.status(200).send("deleted from cart");
    }
    else{
        res.status(404).send("food item not found");
    }
});
app.get("/user",(req,res)=>{
    if(addtocart.length===0){
        res.status(404).send("cart is empty");
    }
    res.send(addtocart);
})
app.get("/dummy",(req,res)=>{ 
    try{
    //JSON.parse("invalid json");
    throw new Error("BROKEN");
    res.send("success");
    }
    catch(e){
        res.status(400).send("error occured"+e);
    }
})
app.listen(3000,()=>{
    console.log("listening on port 3000");
})
