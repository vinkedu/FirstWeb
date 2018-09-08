const express=require("express")
var router=express.Router();
const pool=require("../pool.js")

router.get("/details",(req,res)=>{
    var sql=`select cid,title,md from projects`;
    pool.query(sql,[],(err,result)=>{
        if (err)throw err;
        res.send(result)
    });
})
module.exports=router;