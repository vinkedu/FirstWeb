/**
 * Created by web-01 on 2018/5/22.
 */
/*函数节流*/
function throttle(fn, dur) {
    var begin = new Date();
    return function () {
        var $this = this, args = arguments;
        var current = new Date();
        args[0].preventDefault();
        if (current - begin >= dur) {
            fn.apply($this, args);
            begin = current;
        }
    }
}
/*把某个数分解成相减等于2的 2个数*/
function c(l) {
    var f;
    for (var i = 0; i < l; i++) {
        if (i == l / 2 - 1) {
            f = i;
            break;
        }
    }
    return f;
}
/*轮播*/
function stepMove({w, obj, btn, i, l,s}) {
    //w:每次移动距离
    //obj:移动对象 --数组
    //btn:左右按钮
    //i:已经移动的距离
    //l:子对象个
    //s:显示的个数
    btn.lf.off("click");
    btn.rt.off("click");
    $.each(obj,function(){
        $(this).css("left", 0);
    });

    btn.rt.on("click", function () {
        if (!obj[0].is(":animated")) {
            i--;
            if (i == -l + (s-1)) {
                i = -l + s;
            }
            $.each(obj,function(){
                $(this).animate({
                    "left": w * i
                });
            });
        }

    });
    btn.lf.on("click", function () {
        if (!obj[0].is(":animated")) {
            i++;
            if (i > 0) {
                i = 0;
            }
            $.each(obj,function(){
                $(this).animate({
                    "left": w * i
                });
            });
        }
    });
}

/*根据毫秒数获取日期完整格式*/
function getDate(m){
    var date={}
    var d=new Date(parseInt(m));
    date.year=d.getFullYear();
    date.month=d.getMonth()+1<10?"0"+(d.getMonth()+1):d.getMonth()+1;
    date.day=d.getDate();
    date.hours=d.getHours();
    date.minutes=d.getMinutes()<10?"0"+(d.getMinutes()):d.getMinutes();
    date.seconds=d.getSeconds()<10?"0"+(d.getSeconds()):d.getSeconds();
    return date;
}

/*获取地址栏中的参数*/
function getParam(href,arr){
    var href=decodeURI(href);
    var params={};
    var i=href.indexOf("?");
    href=href.slice(i+1).split("&");
    for(var k=0;k<arr.length;k++){
        for(var j=0;j<href.length;j++){
            if(href[j].indexOf(arr[k])!=-1){
                i=href[j].indexOf("=");
                params[arr[k]]=href[j].slice(i+1);

            }
        }
    }

    return params;
}

/*监听页面加载完成*/
function  docComplete(fn) {
    var start=new Date().getTime();
    document.onreadystatechange=completeLoading;
    function completeLoading(){
        if(document.readyState=="complete"){
            var end=new Date().getTime();
            if(end-start>1500){
               fn();
            }else{
                setTimeout(function(){
                    fn();
                },1500-(end-start))
            }
        }else if(new Date().getTime()-start>5000){
            fn();
        }
    }
}


