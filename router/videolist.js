const express=require("express")
var router=express.Router();
const pool=require("../pool.js")

router.get("/details",(req,res)=>{
    var vid=req.query.vid;
    if(!vid){
        var sql=`select vid,title,src,img,updateTime,sources,lang,type,spec from video`;
    }else{
        var sql=`select vid,title,src,img,updateTime,sources,lang,type,spec from video where vid=?`;
    }
    

    pool.query(sql,[vid],(err,result)=>{
        if (err)throw err;
        res.send(result)
    });
})
module.exports=router;