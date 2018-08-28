//var api = "http://yanjing.zhengdazikaowang.net/apps/";
//var iapi = "http://yanjing.zhengdazikaowang.net/";
//var base_url="http://yanjing.zhengdazikaowang.net/apps/";
//var img_url="http://yanjing.zhengdazikaowang.net/";
var log = console.log.bind(console);
var S = JSON.stringify.bind(JSON);
var P = JSON.parse.bind(JSON);
function check_login() {
	var userId = plus.storage.getItem("userId");
	
	if(!userId) {
		//plus.webview.currentWebview().opener().close('none')
		mui.openWindow({
			url: "/public/login.html",
			id: "/public/login.html",
			waiting: {
				autoShow: false, //自动显示等待框，默认为true
			}
		})
		return false;
	}
	return true;
}
function check_bind() {
	var bind = plus.storage.getItem("bind");
	if(!bind || bind == 0) {
		//plus.webview.currentWebview().opener().close('none')
		mui.openWindow({
			url: "/users/bind_phone.html",
			id: "/users/bind_phone.html",
			waiting: {
				autoShow: false, //自动显示等待框，默认为true
			}
		})
		return false;
	}
	return true;
}
mui.plusReady(function() {
	//全局点击事件
	$(".newact").on("tap", function() {
		var url = $(this).attr("url");
		if(!url) {
			return;
		}
		var web = plus.webview.getWebviewById(url)
		if(web) {
			plus.webview.show(web, "fade-in", 300);
			return
		}
		mui.openWindow({
			url: url,
			id: url,
			waiting: {
				autoShow: false, //自动显示等待框，默认为true
			}
		})
	})

	//全局点击事件
	$(".newactlogin").on("tap", function() {
		if(!check_login()) {
			return;
		}
		/*if(!check_bind()) {
			return;
		}*/ 
		var url = $(this).attr("url");
		if(!url) {
			return;
		}
		var web = plus.webview.getWebviewById(url)
		if(web) {
			plus.webview.show(web, "fade-in", 300);
			return
		}
		mui.openWindow({
			url: url,
			id: url,
			waiting: {
				autoShow: false, //自动显示等待框，默认为true
			}
		})
	})

	document.addEventListener("netchange", wainshow, false);
})

function wainshow() {
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
		plus.nativeUI.closeWaiting();
		mui.toast("网络异常，请检查网络设置！");
		mui.openWindow({
			url: '/pages/nointnet.html',
			id: '/pages/nointnet.html',
			waiting: {
				autoShow: false, //自动显示等待框，默认为true
			}
		})

	} else {

	}
}

//UI增强
(function($, window) {
    //显示加载框
    $.showLoading = function(message,type) {
        if ($.os.plus && type !== 'div') {
            $.plusReady(function() {
                plus.nativeUI.showWaiting(message);
            });
        } else {
            var html = '';
            html += '<i class="mui-spinner mui-spinner-white"></i>';
            html += '<p class="text">' + (message || "数据加载中") + '</p>';

            //遮罩层
            var mask=document.getElementsByClassName("mui-show-loading-mask");
            if(mask.length==0){
                mask = document.createElement('div');
                mask.classList.add("mui-show-loading-mask");
                document.body.appendChild(mask);
                mask.addEventListener("touchmove", function(e){e.stopPropagation();e.preventDefault();});
            }else{
                mask[0].classList.remove("mui-show-loading-mask-hidden");
            }
            //加载框
            var toast=document.getElementsByClassName("mui-show-loading");
            if(toast.length==0){
                toast = document.createElement('div');
                toast.classList.add("mui-show-loading");
                toast.classList.add('loading-visible');
                document.body.appendChild(toast);
                toast.innerHTML = html;
                toast.addEventListener("touchmove", function(e){e.stopPropagation();e.preventDefault();});
            }else{
                toast[0].innerHTML = html;
                toast[0].classList.add("loading-visible");
            }
        }   
    };

    //隐藏加载框
      $.hideLoading = function(callback) {
        if ($.os.plus) {
            $.plusReady(function() {
                plus.nativeUI.closeWaiting();
            });
        } 
        var mask=document.getElementsByClassName("mui-show-loading-mask");
        var toast=document.getElementsByClassName("mui-show-loading");
        if(mask.length>0){
            mask[0].classList.add("mui-show-loading-mask-hidden");
        }
        if(toast.length>0){
            toast[0].classList.remove("loading-visible");
            callback && callback();
        }
      }
})(mui, window);
//数组去重

Array.prototype.unique3 = function() {
	var res = [];
	var json = {};
	for(var i = 0; i < this.length; i++) {
		if(!json[this[i]]) {
			res.push(this[i]);
			json[this[i]] = 1;
		}
	}
	return res;
}
