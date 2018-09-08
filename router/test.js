const express=require("express")
var router=express.Router();
const pool=require("../pool.js")

router.get("/details",(req,res)=>{
    var tid=req.query.tid;
    if(!tid){
        var sql1=`select tid,tid,title,updateTime,sm from news`;
    }else{
        var sql1=`select tid,tid,title,updateTime,sm from news where tid=?`;
    }
    var S1;
    pool.query(sql1,[tid],(err,result)=>{
        if (err)throw err;
        S1=result;
    });

    var S2;
    var sql2=`select cid,title,md from projects`;
    pool.query(sql2,[],(err,result)=>{
        if (err)throw err;
        var S2=result;
        res.send({r1:S1,r2:S2});
    });
})
module.exports=router;