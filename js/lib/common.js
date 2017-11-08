var specialAddress=address.gameAddress
function ajaxData(src, parm, fn) {
	$.ajax({
		//url: specialAddress+src,
		url: src,
		dataType: 'json',
		type: "get",
		data: JSON.stringify(parm),
		contentType: "application/json",
		success: function(data) {
			fn(data)
		},
		error: function(xhr, textStatus, errorThrown) {			
			if(xhr.status == 401) {
				location.href = "login.html"
			}
			if(xhr.status >= 500) {
				console.log('调用接口失败：内部服务器错误');
			}
			console.log("调用接口失败!!!!")
		}
	});
}



function ajaxData2(src,fn) {
	$.ajax({
		//url: specialAddress+src,
		url: src,
		//dataType: 'json',
		type: "get",
		//data: JSON.stringify(parm),
		//contentType:"application/json",
		success: function(data) {
			fn(data)
		},
		error: function(xhr, textStatus, errorThrown) {			
			if(xhr.status == 401) {
				location.href = "login.html"
			}
			if(xhr.status >= 500) {
				console.log('调用接口失败：内部服务器错误');
			}
			console.log("调用接口失败!!!!")
		}
	});
}





function getImg(imgId,width,height){ // 获取图片地址类型
	var imgSrc="";
	var id = imgId;
	var type="",imgType="";
	type = id.substr(id.length-1,1)
	switch (type){  // 判断图片类型
		case 0:
			imgType = "jpg";
			break;
		case "0":
			imgType = "jpg";
			break;
		case 1:
			imgType = "jpeg";
			break;
		case "1":
			imgType = "jpeg";
			break;
		case 2:
			imgType = "png";
			break;
		case "2":
			imgType = "png";
			break;
	}
	imgSrc = address.imgSrc+"/Thumbnail/"+id+"_"+width+"x"+height+"."+imgType;
	return {
		id : id,
		ImageCategory: type,
		imgSrc: imgSrc,
		imgType: imgType
	};
}


//获取cookie函数
function getCookieValue(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i].trim();
		if(c.indexOf(name) == 0) return c.substring(name.length, c.length);
	}
	return "";
}
//获取地址栏参数
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" +
		name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}