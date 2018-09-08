const mysql=require('mysql');
var pool=mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'dkw',
    port:3306,
    connectionLimit:10
});
//console.log(pool); //测试是否写错
module.exports=pool;