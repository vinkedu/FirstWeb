document.documentElement.style.overflow="hidden";//禁止页面滚动
    var $cHeight=$(window).height();
    var $cWidth=$(window).width();
    var pCount=3;
    var moved=0;
    var timr;
    var $page=$('.page');
    var $bannerBox=$(".banner-box");
    var $bannerItem=$(".banner-item");
    $page.css('height',$cHeight);//设置楼层页面的高度

    /*页面滚动效果*/
    var setTime;
    var pmoved=0;//页面移动的单位值
    var pLength=$("#pageBoxs").children().length;
    var fHeight=82;//底部长度
    var $goTop=$("#goTop");
    //页面滚动动画函数
    function pageMove(){
        //要用定时器先清除定时器
        clearInterval(setTime);
        $("#pageBoxs").css('transform','translateY(-'+$cHeight*pmoved+'px)');//滚动页面
        setTime=setTimeout(function(){//进行滚动时延迟800加载当前楼层每个元素的动画
            $(".page").eq(pmoved).children(".i_cot_box").addClass("nowPage");
        },800);
        $(".page").eq(pmoved).siblings().children(".i_cot_box").removeClass("nowPage");//重置其他楼层的动画
        if(pmoved!=0){
            //滚动时固定导航条
            $(".top_header").addClass("fixed");
            $goTop.addClass("show");
        }else{
            $(".top_header").removeClass("fixed");
            $goTop.removeClass("show");
        }
        /*头部导航，栏目之间的切换*/
        $(".top-nav li").eq(pmoved).addClass("active").siblings().removeClass("active");
        
    }
    /*点击导航栏栏目滚动到对应的楼层*/
    $(".top-nav").on("click","li",function(e){
        e.preventDefault();
        pmoved=$(this).index();//获取点击栏目的楼层数
        pageMove();//进行滚动
    })

    /*导航栏*/
    var $openBtn = $(".side-nav-open");
        /*侧边导航栏开关*/
        var $shadow = $("#side-shadow");//遮罩层
        var $secNav=$(".side-nav-bar>.list>li>.nav-sec");//二级导航
        var $navBox=$("#side-nav>div");
        $shadow.css("height",$(window).height());
        $openBtn.click(function () {
            var $this = $(this);
            if ($this.children("div").is(".open")) {//侧边导航栏处于关闭状态时
                document.documentElement.style.overflow="visible";//禁止页面滚动
                $(this).children("div").removeClass("open");
                $(this).parent().parent().removeClass("open");
                $shadow.removeClass("open");
                // $secNav.css("zindex","-1");
                $navBox.css("width","360px");
            } else {//导航栏处于打开状态时
                document.documentElement.style.overflow="hidden";//禁止页面滚动
                $(this).children("div").addClass("open");
                $(this).parent().parent().addClass("open");
                $shadow.addClass("open");
                // $secNav.css("zIndex","0");
                $navBox.css("width","800px");
            }
        });
        var $search=$(".side-nav-bar>.head input");
            var $btn=$(".side-nav-bar>.head i");
            $btn.click(function(){
                var kw=$search.val();
                if(kw==null||kw==""){
                    alert("搜索内容不能为空！");
                    return;
                }
                location.href="search.html?kw="+kw;
            });
            $search.keydown(function(e){
                if(e.keyCode==13){
                    e.preventDefault();
                   $btn.click();
                }
            });

        /*1.第一页轮播图*/
    /*自动轮播*/
    $bannerBox.css('width', $cWidth * pCount);//初始化轮播单位宽度
    $bannerItem.css('width', $cWidth);//初始化轮播图容器宽度

    function bMove() {
        moved++;
        if (moved == 3) {
            moved=0;
        }
        $(".banner-box").animate({
            left: -$cWidth *  moved
        }, function () {
            $bannerItem.eq(moved).addClass("c_banner").siblings().removeClass("c_banner");
        });
        $(".dot").eq(moved).addClass("hover").siblings().removeClass("hover");
    }
    /*监听页面加载完成*/
    docComplete(function(){
        $bannerItem.eq(0).addClass("c_banner");//默认显示第一张轮播图
        timr=setInterval(bMove,6000);
    })

    /*点击切换轮播图*/
    $(".dot-wrap").on("click",".dot",function () {
        $this=$(this);
        $(".banner-box").stop(true).animate({
            left: -$cWidth * $this.index()
        },function () {
            $bannerItem.eq($this.index()).addClass("c_banner").siblings().removeClass("c_banner");
        });
        $this.addClass("hover").siblings().removeClass("hover");
        moved = $this.index();
    })
    //鼠标放在轮播圆点时暂停自动轮播
    $(".dot-wrap").on("mouseenter",function(){
        clearInterval(timr);
    }).on("mouseleave",function(){
        timr=setInterval(bMove,4000);
    })
    /*2.公司介绍楼层 图片拖拽*/
    //图片容器
    var $aboutImgBox=$("#page2>.about-box>.about-right>.img-box>ul");
    //图片显示框的宽度
    var $aboutImgW=390;
    //向左能拖拽的最大距离
    var minLeft=-($aboutImgBox.children().length-1)*$aboutImgW;
    //控制拖拽力度的参数
    var s=650;
    //设置图片容器的宽度
    $aboutImgBox.css('width',$aboutImgBox.children().length*$aboutImgW);
    $aboutImgBox.on("mousedown", function (e) {
        var down = e.pageX;//鼠标按下时的坐标
        var sLeft = parseFloat($aboutImgBox.css('left'));//鼠标按下时图片容器的left值
        var downTime = new Date();//按下鼠标时的时间
        $(window).on("mousemove", function (e) {
            $aboutImgBox.stop(true);//停止未完成的动画，并清空动画列表
            e.preventDefault();
            var move = e.pageX;//鼠标移动时的实时坐标
            var nLeft = parseFloat($aboutImgBox.css('left'));//鼠标移动时图片容器的实时left值
            if (nLeft >= 0 || nLeft <= minLeft) {//如果在两边的尽头拖拽图片容器，把拖拽力度逐渐削弱
                s--;
                $aboutImgBox.css('left', -(down - move) * s / 1000 + sLeft);
            } else {//否则按正常力度拖拽
                $aboutImgBox.css('left', -(down - move) + sLeft);
                s = 650;//重置拖拽力度
            }

        });
        $(window).on("mouseup", function (e) {
            //解除 鼠标移动和鼠标松开事件
            $(window).off("mousemove");
            $(window).off("mouseup");
            sLeft = down - e.pageX;//按下鼠标到松开鼠标时ul拖拽长度；>0表示向左拖拽 <0 表示向右拖拽
            var eLeft = parseFloat($aboutImgBox.css('left'));//鼠标松开时ul的left值
            var upTime = new Date();//松开鼠标时的时间
            if (eLeft >= 0) {//拖拽到最左端时返回到 0
                $aboutImgBox.animate({
                    left: 0
                }, 400, "easeOutQuad");
            } else if (eLeft <= minLeft) {//拖拽到最右端时返回到 向左能拖拽的最大距离
                $aboutImgBox.animate({
                    left: -($aboutImgBox.children().length - 1) * $aboutImgW
                }, 400, "easeOutQuad");
            } else {
                if (upTime - downTime > 400) {//鼠标按住时间大于400毫秒时
                    if (Math.abs(sLeft) % $aboutImgW > $aboutImgW / 2) {//拖拽距离大于 图片显示框一半宽度时
                        $aboutImgBox.animate({//移动方向等同于拖拽方向；移动距离是 图片显示框宽度减去拖拽长度
                            left: sLeft > 0 ? eLeft - ($aboutImgW - sLeft % $aboutImgW) : eLeft + ($aboutImgW - Math.abs(sLeft % $aboutImgW))
                        }, 400, "easeOutQuad");
                    } else {//拖拽距离小于单个列表项的一半宽度时
                        $aboutImgBox.animate({//移动方向相反于拖拽方向；移动距离是拖拽距离
                            left: eLeft + (sLeft % $aboutImgW)
                        }, 400, "easeOutQuad");
                    }
                } else {//鼠标按住时间小于400毫秒时
                    $aboutImgBox.animate({//移动方向等同于拖拽方向；移动距离：向左=>单个列表项宽度减去拖拽长度、向右=>拖拽距离
                        left: sLeft > 0 ? eLeft - ($aboutImgW + eLeft % $aboutImgW) : eLeft + Math.abs(eLeft % $aboutImgW)
                    }, 400, "easeOutQuad");
                }
            }
        });
    });

    /*3.产品楼层 产品加载*/
    loadIndexProducts();//初始化加载
    var $pNav = $("#page3>.product-box>.pro-nav");//产品栏目导航
    $pNav.on("click", "a", function () {//按产品类别切换
        var $this = $(this);
        var tid = $this.data("tid");
        $this.parent().addClass("current").siblings().removeClass("current");
        loadIndexProducts(tid);
    });
    function loadIndexProducts(tid) {
        $.ajax({
            type: "GET",
            url: "http://127.0.0.1:3000/productlist/details",
            data: {tid: tid},
            dataType: "json",
            success: function (data) {
                var {product, type} = data;
                if (!type.length == 0) {//初始化载入产品类别导航条
                    var html = "";
                    var html = `<li class="current" ><a href="javascript:;" data-tid="0">全部</a></li>`;
                    for (var i of type) {
                        var {name, tid} = i;
                        html += `<li><a href="javascript:;" data-tid="${tid}">${name}</a></li>`
                    }
                    $pNav.html(html);
                }
                var html = "";
                var lWidth = 389;//产品宽度
                var $pUl = $("#page3>.product-box>.pro-list>ul");//产品Ul
                $pUl.css("width", lWidth * product.length);//按产品数量 设定产品ul宽度
                for (var p of product) {
                    var {hpic, pid, tid, title} = p;
                    html += `<li>
                        <a href="#">
                            <span><img src="${hpic}" alt="${title}"></span>
                            <span>${title}</span>
                            <span>+</span>
                            <span></span>
                        </a>
                    </li>`
                }
                $pUl.not(".active").html(html);
                /*使用2个UL动态切换产品类别*/
                $pUl.each(function () {
                    if ($(this).is(".active")) {
                        $(this).removeClass("active");
                    }else {
                        $(this).addClass("active");
                    }
                });
                var pLf = $("#page3>.product-box>.lf");
                var pRt = $("#page3>.product-box>.rt");
                stepMove({w: lWidth, obj: [$pUl], btn: {rt: pRt, lf: pLf}, i: 0, l: product.length,s:3});
            },
            error: function () {
                // php语法错；sql与发错；json语法错；404
                alert("网络故障请检查。。。");
            }
        });
    }
    /*4.首页视频楼层*/
    var $ul=$("#page4 > .video-box > .right > .video-list > ul");
    var $video=$("#page4 > .video-box > .left > .video-content > video");
    $(".video-list ul").on('mousewheel',function(e){
        e.stopPropagation();
    });
    function loadVideoes(id){
        $.ajax({
            type:"GET",
            url:"http://127.0.0.1:3000/videolist/details",
            data:{vid:id},
            dataType:"json",
            success:function(data){
                /*首次加载时默认显示第一个视频内容*/
                var {vid,title,src,updateTime,sources,lang,type,spec}=data[0];
                $video.attr("src",src);
                var $title=$("#page4 > .video-box > .middle > h2");
                $title.html(title);
                var $date=$("#page4 > .video-box > .middle > ul > li.date");
                $date.html("发布："+updateTime);
                var $source=$("#page4 > .video-box > .middle > ul > li.source");
                $source.html("来源："+sources);
                var $lang=$("#page4 > .video-box > .middle > ul > li.lang");
                $lang.html("语言："+lang);
                var $type=$("#page4 > .video-box > .middle > ul > li.type");
                $type.html("类型："+type);
                var $spec=$("#page4 > .video-box > .middle > p");
                $spec.html(spec);
                if(id==null){//首次加载时
                    var html="";
                    for(var a of data){
                        var {vid,title,img}=a;
                        html+=`<li data-vid="${vid}"><a href="javascript:;"><span class="fa fa-play"></span>
                        <img src="${img}" alt="${title}">${title}</a></li>`
                    }
                    $ul.html(html);
                    $ul.children().first().addClass("current stop");
                }

            }
        });
    }
    loadVideoes();
    $ul.on("click","li",function(){
        if(!$(this).is(".current")){//点击其他视频时
            var vid=$(this).data("vid");
            $(this).addClass("current").siblings().removeClass("current");
            $(this).find("span").attr("class","fa fa-play");
            var $m=$("#page4 > .video-box > .middle");
            $m.animate({opacity:0,left:"30"},20,function(){loadVideoes(vid);}).animate({//切换视频时切换动画效果
                opacity:1,
                left:0
            })
        }else{//点击当前视频时
            if($(this).find("span").is(".fa-pause")){
                $(this).find("span").attr("class","fa fa-play");
                $video.trigger("pause");
            }else{
                $(this).find("span").attr("class","fa fa-pause");
                $video.trigger("play");
            }
        }
    });


/*5.首页案例楼层*/
function loadProjects(){
    $.ajax({
        type:"GET",
        url:"http://127.0.0.1:3000/projectslist/details",
        dataType:"json",
        success:function(data){
            var $firUl=$("#page5>.prj-box>.top-right>.prj-list");
            var $secUl=$("#page5>.prj-box>.bottom>.prj-list");
            var $lf=$("#page5>.prj-box>.lf");
            var $rt=$("#page5>.prj-box>.rt");

            var $pWidth=295;
            var l=data.length;
            var html1="";
            var html2="";
            $firUl.css("width",$pWidth*c(l));
            $secUl.css("width",$pWidth*(l-c(l)));
            for(var i=0;i<l;i++){
                var {cid,title,md}=data[i];
                if(i<c(l)){
                    html1+=`<li><a href="#">
                    <img src="${md}" alt="${title}"><span class="txt">${title}</span><span
                        class="fa fa-search"></span></a></li>`
                }else{
                    html2+=`<li><a href="#">
                    <img src="${md}" alt="${title}"><span class="txt">${title}</span><span
                        class="fa fa-search"></span></a></li>`
                }
            }
            $firUl.html(html1);
            $secUl.html(html2);
            stepMove({w:$pWidth, obj: [$firUl,$secUl], btn: {rt: $rt, lf: $lf}, i: 0, l: c(l),s:2});
        }
    })
}
loadProjects();


    /*6.首页新闻楼层*/
    var $nNav=$("#page6 > .news-box > .right > ul");
    var $nUl=$("#page6 > .news-box > .right > .news-box > .news-list");
    var $nLeft=$("#page6 > .news-box > .left");
    var $nBox=$("#page6 > .news-box > .right > .news-box");
    $("#page6 > .news-box > .right > .news-box > .news-list").on('mousewheel',function(e){
        e.stopPropagation();
    });
    function loadNews(id){
        $.ajax({
            type:"GET",
            url:"http://127.0.0.1:3000/newslist/details",
            data:{tid:id},
            dataType:"json",
            success:function(data){
                var {product,top,tag,type} = data;
                if (!type.length == 0) {//初始化载入新闻类别导航条
                    var html = "";
                    var html = `<li class="current" ><a href="javascript:;" data-tid="">全部</a></li>`;
                    for (var i of type) {
                        var {name, tid} = i;
                        html += `<li><a href="javascript:;" data-tid="${tid}">${name}</a></li>`
                    }
                    $nNav.html(html);
                }
                var html="";
                for(var o of product){
                    var {nid,tid,title,sm,updateTime}=o;
                    html+=`<li>
                            <img src="${sm}" alt="${title}">
                            <a href="#">${title}</a>
                            <p>${updateTime}</p>
                        </li>`
                }
                $nUl.html(html);
                var html2=`<span>标签:</span>`;
                for(var t of tag){
                    var {tag}=t
                    html2+=`<a href="#">${tag}</a>`;
                }
                var {author,click,content,md,nid,tid,title,updateTime}=top[0];
                console.log(top[0]);
                var html=`<div class="img-bg"><a href="#"><img src="${md}" alt="${title}"></a></div>
                <div class="info-text">
                    <h2><a href="news_detail.html?nid=${nid}&tid=${tid}">${title}</a></h2>
                    <ul>
                        <li><span class="fa fa-clock-o"></span>${updateTime}</li>
                        <li><span class="fa fa-user-plus"></span>${author}</li>
                        <li><span class="fa fa-eye"></span>${click}</li>
                    </ul>
                    <p>${content}</p>
                    <div class="tag">${html2}</div>
                    <button class="more"><a href="news_list.html"><span>READ MORE</span><i>&gt;</i><i>&gt;</i><i>&gt;</i></a></button>
                </div>`;
                $nLeft.html(html);
            }
        })
    }
    loadNews();
    $nNav.on("click", "a", function () {//按产品类别切换
        var $this = $(this);
        var tid = $this.data("tid");
        $this.parent().addClass("current").siblings().removeClass("current");
        $nLeft.animate({opacity:0,left:"30px"},300,function(){loadNews(tid);}).animate({
            opacity:1,
            left:0
        },300);
        $nBox.animate({opacity:0,top:"30px"},300).animate({
            opacity:1,
            top:0
        },300);
    });
/*页面滚动到顶部*/
$goTop.on("click",function(){
    pmoved=0;
    pageMove();
})

     
    