#建议：特殊要求[苹果手机 utf8mb4]
set names utf8;
drop database if exists dkw;
CREATE DATABASE dkw CHARSET=UTF8;
USE dkw;
#用户表
CREATE TABLE user(
    uid INT PRIMARY KEY AUTO_INCREMENT,
    uname VARCHAR(25),
    upwd VARCHAR(32)
);
                                #md5 密文
INSERT INTO user VALUES(null,'tom',md5(md5('123')));
INSERT INTO user VALUES(null,'jerry',md5(md5('123')));

#类型表
CREATE TABLE type(
    tid INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255)
); 
INSERT INTO type VALUES(null,"APP开发");
INSERT INTO type VALUES(null,"网站建设");
INSERT INTO type VALUES(null,"平面设计");

#产品表
CREATE TABLE product(
    pid INT PRIMARY KEY AUTO_INCREMENT,
    tid INT,
    foreign key (tid) references type(tid),
    title VARCHAR(255),
    hpic VARCHAR(255)
   
);
INSERT INTO product VALUES(null,1,"手机钱包应用","image\/product\/01_pro_hpic.jpg");
INSERT INTO product VALUES(null,1,"股市买卖应用","image\/product\/02_pro_hpic.jpg");
INSERT INTO product VALUES(null,1,"音乐播放器","image\/product\/03_pro_hp	ic.jpg");
INSERT INTO product VALUES(null,1,"桌面主题应用","image\/product\/04_pro_hpic.jpg");
INSERT INTO product VALUES(null,1,"手机商城应用","image\/product\/05_pro_hpic.jpg");
INSERT INTO product VALUES(null,1,"天气预报应用","image\/product\/03_pro_hpic.jpg");
INSERT INTO product VALUES(null,2,"品牌网站建设","image\/product\/02_pro_hpic.jpg");
INSERT INTO product VALUES(null,2,"响应式建站","image\/product\/01_pro_hpic.jpg");
INSERT INTO product VALUES(null,2,"商城购物网站","image\/product\/03_pro_hpic.jpg");
INSERT INTO product VALUES(null,2,"精美网页设计","image\/product\/05_pro_hpic.jpg");
INSERT INTO product VALUES(null,3,"UI扁平化设计","image\/product\/04_pro_hpic.jpg");
INSERT INTO product VALUES(null,3,"名片设计","image\/product\/05_pro_hpic.jpg");
INSERT INTO product VALUES(null,3,"画册设计","image\/product\/01_pro_hpic.jpg");
INSERT INTO product VALUES(null,3,"形象设计","image\/product\/03_pro_hpic.jpg");


#视频表
CREATE TABLE video(
    vid INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    src VARCHAR(255),    
    img VARCHAR(255),
    updateTime VARCHAR(255),
    sources VARCHAR(255),    
    lang VARCHAR(255),
    type VARCHAR(255),    
    spec VARCHAR(255)
);
INSERT  INTO video  VALUES(null,"响应式视频","video\/video1.mp4","image\/video\/video1.jpg","杜凯文","shanghai","中文","mp4视频","");
INSERT  INTO video  VALUES(null,"响应式视频","video\/video2.mp4","image\/video\/video2.jpg","杜凯文","shanghai","英文","mp4视频","");
INSERT  INTO video  VALUES(null,"响应式视频","video\/video1.mp4","image\/video\/video3.jpg","杜凯文","shanghai","法语","mp4视频","");
INSERT  INTO video  VALUES(null,"响应式视频","video\/video2.mp4","image\/video\/video4.jpg","杜凯文","shanghai","西班牙语","mp4视频","");

#案例表
CREATE TABLE projects(
    cid INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    md VARCHAR(255)
);
INSERT  INTO projects  VALUES(null,"多功能应用开发","image\/case\/01_case_md.jpg");
INSERT  INTO projects  VALUES(null,"超级音乐播放器","image\/case\/02_case_md.png");
INSERT  INTO projects  VALUES(null,"人肉搜索","image\/case\/03_case_md.png");
INSERT  INTO projects  VALUES(null,"定时提醒应用","image\/case\/04_case_md.png");
INSERT  INTO projects  VALUES(null,"远程聊天工具","image\/case\/05_case_md.png");
INSERT  INTO projects  VALUES(null,"用户界面设计","image\/case\/06_case_md.png");
INSERT  INTO projects  VALUES(null,"万能日历","image\/case\/07_case_md.png");
INSERT  INTO projects  VALUES(null,"数据监控应用","image\/case\/08_case_md.png");
INSERT  INTO projects  VALUES(null,"画册封面","image\/case\/09_case_md.png");
INSERT  INTO projects  VALUES(null,"时间轴介绍","image\/case\/10_case_md.png");
INSERT  INTO projects  VALUES(null,"网速检测器","image\/case\/11_case_md.png");
INSERT  INTO projects  VALUES(null,"音乐播放器","image\/case\/12_case_md.png");


#新闻表
CREATE TABLE news(
    nid INT PRIMARY KEY AUTO_INCREMENT,
    tid INT,
    title VARCHAR(255),    
    updateTime VARCHAR(255),    
    sm VARCHAR(255)
);
INSERT INTO news VALUES(null,1,"是时候改变你对微服务的认知了","杜凯文","image\/news\/01_news_sm.jpg");
INSERT INTO news VALUES(null,1,"如何成为一个优秀的工程师","杜凯文","image\/news\/02_news_sm.jpg");
INSERT INTO news VALUES(null,1,"15个必备VSCode插件","杜凯文","image\/news\/03_news_sm.jpg");
INSERT INTO news VALUES(null,1,"支付宝的优秀服务器","杜凯文","image\/news\/04_news_sm.jpg");
INSERT INTO news VALUES(null,1,"最新的ECMAScript8","杜凯文","image\/news\/05_news_sm.jpg");
INSERT INTO news VALUES(null,1,"是时候改变你对微服务的认知了","杜凯文","image\/news\/07_news_sm.jpg");
INSERT INTO news VALUES(null,1,"如何成为一个优秀的工程师","杜凯文","image\/news\/07_news_sm.jpg");
INSERT INTO news VALUES(null,1,"15个必备VSCode插件","杜凯文","image\/news\/08_news_sm.jpg");
INSERT INTO news VALUES(null,1,"支付宝的优秀服务器","杜凯文","image\/news\/09_news_sm.jpg");
INSERT INTO news VALUES(null,1,"最新的ECMAScript8","杜凯文","image\/news\/10_news_sm.jpg");
INSERT INTO news VALUES(null,2,"是时候改变你对微服务的认知了","杜凯文","image\/news\/13_news_sm.jpg");
INSERT INTO news VALUES(null,2,"如何成为一个优秀的工程师","杜凯文","image\/news\/12_news_sm.jpg");
INSERT INTO news VALUES(null,2,"15个必备VSCode插件","杜凯文","image\/news\/13_news_sm.jpg");
INSERT INTO news VALUES(null,2,"支付宝的优秀服务器","杜凯文","image\/news\/14_news_sm.jpg");
INSERT INTO news VALUES(null,2,"最新的ECMAScript8","杜凯文","image\/news\/15_news_sm.jpg");
INSERT INTO news VALUES(null,3,"是时候改变你对微服务的认知了","杜凯文","image\/news\/14_news_sm.jpg");
INSERT INTO news VALUES(null,3,"如何成为一个优秀的工程师","杜凯文","image\/news\/12_news_sm.jpg");
INSERT INTO news VALUES(null,3,"15个必备VSCode插件","杜凯文","image\/news\/13_news_sm.jpg");
INSERT INTO news VALUES(null,3,"支付宝的优秀服务器","杜凯文","image\/news\/14_news_sm.jpg");
INSERT INTO news VALUES(null,3,"最新的ECMAScript8","杜凯文","image\/news\/15_news_sm.jpg");

#顶部表
CREATE TABLE top(
    tid INT PRIMARY KEY AUTO_INCREMENT,
    nid INT,
    title VARCHAR(255),
    author VARCHAR(255), 
    updateTime VARCHAR(255),
    click INT,    
    isTop INT,
    content VARCHAR(255), 
    md VARCHAR(255)
);
INSERT  INTO top  VALUES(null,2,"如何成为一名优秀的工程师","dkw","杜凯文",20,1,"","image\/news\/02_news_md.jpg");
INSERT  INTO top  VALUES(null,11,"是时候改变你对微服务的认识了","dkw","杜凯文",20,1,"","image\/news\/11_news_md.jpg");
INSERT  INTO top  VALUES(null,16,"15个必备VScode插件","dkw","杜凯文",20,1,"","image\/news\/11_news_md.jpg");

#标签表
CREATE TABLE tag(
    tid INT PRIMARY KEY AUTO_INCREMENT,
    nid INT,
    tag VARCHAR(255)
);
INSERT  INTO tag  VALUES(null,2,"坚持不懈的态度");
INSERT  INTO tag  VALUES(null,2,"良好的心态");
INSERT  INTO tag  VALUES(null,2,"终生学习");
INSERT  INTO tag  VALUES(null,11,"异步机制");
INSERT  INTO tag  VALUES(null,11,"微服务");
INSERT  INTO tag  VALUES(null,11,"请求和响应");
INSERT  INTO tag  VALUES(null,16,"mysql");
INSERT  INTO tag  VALUES(null,16,"vetur");
INSERT  INTO tag  VALUES(null,16,"open in window");




