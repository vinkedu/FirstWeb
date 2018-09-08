const express=require("express")
var router=express.Router();
const pool=require("../pool.js")

router.get("/details",(req,res)=>{
    var tid=req.query.tid;
    if(!tid||tid==0){
        var sql1=`select pid,tid,title,hpic from product`;
    }else{
        var sql1=`select pid,tid,title,hpic from product where tid=?`;
    }
    var R1;
    pool.query(sql1,[tid],(err,result)=>{
        if (err)throw err;
        R1=result;
    });

    var R2;
    if(!tid){
        var sql2=`select tid,name from type`;
    }else{
        var sql2=`select pid,tid,title,hpic from product where tid=4`;
    }
    pool.query(sql2,[],(err,result)=>{
        if (err)throw err;
        R2=result;
        res.send({product:R1,type:R2});
    });
})
module.exports=router;