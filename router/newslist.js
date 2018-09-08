const express=require("express")
var router=express.Router();
const pool=require("../pool.js")

router.get("/details",(req,res)=>{
    var tid=req.query.tid;
    if(!tid){
        var sql1=`select nid,tid,title,updateTime,sm from news`;
    }else{
        var sql1=`select nid,tid,title,updateTime,sm from news where tid=?`;
    }
    var R1;
    pool.query(sql1,[tid],(err,result)=>{
        if (err)throw err;
        R1=result;
    });

    if(!tid){
        var sql2=`select nid,tid,title,author,updateTime,click,content,md from top where tid=1`;
    }else{
        var sql2=`select nid,tid,title,author,updateTime,click,content,md from top where tid=?`;
    }
    var R2;
    pool.query(sql2,[tid],(err,result)=>{
        if (err)throw err;
        R2=result;  
    });

    if(!tid){
        var sql3=`select nid,tag from tag where nid=2`;
    }else if(tid==1){
        var sql3=`select nid,tag from tag where nid=55`;
    }
    else if(tid==2){
        var sql3=`select nid,tag from tag where nid=11`;
    }else if(tid==3){
        var sql3=`select nid,tag from tag where nid=16`;
    }
    var R3;
    pool.query(sql3,[tid],(err,result)=>{
        if (err)throw err;
        R3=result;
        
    });

    var R4;
    if(!tid){
        var sql4=`select tid,name from type`;
    }else{
        var sql4=`select pid,tid,title,hpic from product where tid=4`;
    }
    pool.query(sql4,[],(err,result)=>{
        if (err)throw err;
        R4=result;
        res.send({product:R1,top:R2,tag:R3,type:R4});
    });
})
module.exports=router;