const {Router} = require("express");
const express=require("express")
const router= Router();

var cookieParser = require('cookie-parser')
router.use(cookieParser());

router.use(express.json());
const marketList =[
    {
        item:'milk',
        quantity:2,
    },
    {
        item:'butter',
        quantity:2,
    }
];
router.use((req, res, next) => {
    console.log(req.session.user);

    if (req.session.user) {
        next();
    } else {
        res.status(401).send("Unauthorized");
    }
});

router.get('/',(req,res)=>{
    res.cookie('visited',true,{maxAge:1000000000})
    console.log(req.query,req.cookies);
    res.send(marketList);
})

router.post('/',(req,res)=>{
    console.log(req.body);
    marketList.push(req.body);
    res.send(201);
})

router.get('/:item',(req,res)=>{
    const {item} = req.params;
    
    const groceryItem=marketList.find((g)=> g.item===item);
    console.log(groceryItem);
    res.send(groceryItem)
})

router.get("/cart",(req,res)=>{
    
})



module.exports=router;