var countdown=60;
var  code;
 function createCode() {
        var codeInput = document.getElementsByClassName("code")[0];
        var codeArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        var length = 6;
        code = "";
        for(var i=0;i<6;i++) 
		{ 
		code+=Math.floor(Math.random()*10); 
		} 
        console.log(code);
        if (code) {
            //codeInput.value = code;
            window.sessionStorage.setItem("code", code);
        }
    }

createCode()




function getCode(){
	var Tel = $(".telNum").val();
	var Code = $(".code").val();
	var regPhone=/^1[34578]\d{9}$/;
	if(Tel == ""){
		alert("请输入手机号");
		return false;
	}
	if(!regPhone.test(Tel)){
		alert("请输入正确的手机号码");
		$('.telNum').focus();
		return false
	}
	else{
		ajaxData2("http://carapi.m0571.com/WebJson.aspx?book=Sendsms&code="+code+"&tel="+Tel+"",getNumSuccess)				
		function setTime(){
			
			if(countdown == 0){ 
				$(".getCode").removeAttr("disabled"); 
				$(".getCode").val("获取验证码"); 
				countdown = 60;
				
				return;
			}else{
				$(".getCode").attr("disabled","disabled"); 
				$(".getCode").val("重新发送(" + countdown + "s)"); 
				countdown--; 
			} 
			
			setTimeout(function(){
				setTime()
			},1000)
		}
								
		function getNumSuccess(data){
			
			var newData=JSON.parse(data)
			if(newData[0].msg == "success"){
				setTime()
			}else{
				if(data.FailureReason == 0){
					$(".error").html("代理不存在")
				}
				if(data.FailureReason == 1){
					$(".error").html("代理被禁用")
				}
			}
		}
	}
}

function loginUp(){
	var str=location.search
	var yqm=str.substring(5,str.length)
	if(validateRes()){
	   var Tel = $(".telNum").val();
	   var pwd = $(".pwd").val();
//	   var userManage = {
//		"Mobile": Tel,	
//		"Password": Code
//	}
//	objects = $.extend({},userManage);
	ajaxData2("http://carapi.m0571.com/WebJson.aspx?book=User_Register1&username="+Tel+"&pwd="+pwd+"&tel="+Tel+"&yqm="+yqm+"",getWinSuccess)
	function getWinSuccess(data){
		var newData=JSON.parse(data)
        if(newData[0].msg=="error1"){
        	alert("该用户已注册")
        }else{
        	pageBar.NoRegister=false;
        	pageBar.register=true;
        }
	}
  }
}

function validateRes(){
	var telNum=$('.telNum').val();
	var inputCode=$('.code').val();
	var pwd=$('.pwd').val();
	var rePwd=$('.rePwd').val();
	var regPhone=/^1[34578]\d{9}$/;
	var regPwd=/^[a-zA-Z0-9]{6,}$/;
	var code=window.sessionStorage.getItem("code");
	if(telNum==""){
		alert("请输入手机号码");
		$('.telNum').focus();
		return false
	}
	if(!regPhone.test(telNum)){
		alert("请输入正确的手机号码");
		$('.telNum').focus();
		return false
	}
	if(inputCode==""){
		alert("请输入验证码");
		$('.code').focus();
		return false
	}
	if(inputCode!=code){
		alert("验证码错误");
		$('.code').focus();
		return false
	}
	if(pwd==""){
		alert("请输入密码");
		$('.pwd').focus();
		return false
	}
	if(!regPwd.test(pwd)){
		alert("密码为字母数字6位或6位以上");
		$('.pwd').focus();
		return false
	}
	
	if(regPwd==""){
		alert("请再次输入密码");
		$('.regPwd').focus();
		return false
	}
	if(rePwd!=pwd){
		alert("两次密码不一致");
		$('.regPwd').focus();
		return false
	}
	return true
	
}
	
//
function closeErr(){
	$(".error").html("")
}

 function setCookieValue(cname,cvalue,exdays){
		
	// 设置了cookie的路径为根目录/
    document.cookie = cname + "=" + cvalue + ";  path=/";
}
 
 var pageBar = new Vue({
           	el: '.page-bar',
           	data: {
           		cars: [],
           		register:false,
           		NoRegister:true
           	},
           
           	methods: {
           		goto: function() {
           				ajaxData2("http://carapi.m0571.com/WebJson.aspx?book=SelectNewCar_List",getRankSuccess)
                        var that=this;
           				function getRankSuccess(data) {
           					var newData=JSON.parse(data)
           					console.log(newData[0].date)
           					that.cars = newData[0].date;
           				}
           		},
           	},
           	ready: function() {
           		this.goto()
             }

    })
 function downLoad(){
 	var u = navigator.userAgent, 
	isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
	isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
	urls = {
		'android':'http://fusion.qq.com/cgi-bin/qzapps/unified_jump?appid=52478397',
		'ios':'https://itunes.apple.com/app/id1245472540',
		'other':'http://www1.pcauto.com.cn/app/20141120/pcautoapp/index.html'
	};
	//三元运算
	// window.location.href = isAndroid? urls.android : isiOS? urls.ios : urls.other;
	//简化
	if(isAndroid){
		window.location.href=urls.android;
	}else if(isiOS){
		window.location.href=urls.ios;
	}else{
		window.location.href=urls.other;
	}
 }
