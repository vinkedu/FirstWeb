const express=require("express");
var app=express();
var productlist=require("./router/productlist");
var videolist=require("./router/videolist");
var projectslist=require("./router/projectslist");
var newslist=require("./router/newslist");
//加载跨域模块
var cors=require('cors');
//配置跨域模块；允许那个地址跨域访问
app.use(cors(
    {
        origin:['http://127.0.0.1:8080',
        'http://localhost:8080'],
        credentials:true
}));
var server=app.listen(3000);
app.use(express.static(__dirname+"/public"));
app.use("/productlist",productlist);
app.use("/videolist",videolist);
app.use("/projectslist",projectslist);
app.use("/newslist",newslist);