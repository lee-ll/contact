$(function(){
	var shuzu=[];//用于搜索时减少数组中内容
	var table=[];//每一个dd距离文档顶部的位置
	var letters=[];//存放字母的集合

   //将数组转化为对象
	function format(arr){
		var obj={};
		arr.forEach(function(v,i){
			var key=v.pinyin.charAt(0).toUpperCase();
			if(obj[key]){
				obj[key].push(v);
			}else{
				obj[key]=[];
				obj[key].push(v);
			}
		})
		return obj;
	}

	//对页面进行渲染
	function render(data){
		$("dl, .context").empty();
		 var o=format(data);
         letters=Object.keys(o).sort();
         $(".show").text(letters[0])
         letters.forEach(function(v,i){
         	$('<div>').text(v).appendTo(".context");
         	$('<dt>').text(v).appendTo("dl");
         	o[v].forEach(function(v,i){
         		$('<dd><a href="tel:'+v.phone+'">'+v.name+'</dd>').appendTo('dl');
         	})
         })
         $(".context").css("margin-top",-$(".context").height()/2);
         $(".context div:eq(0)").css("color","purple");
         table=[];
         $("dt").each(function(i,v){
           table.push($(this).offset().top-$(".show").height()-$(".search").height())
         })
	}

	//搜索联系人
	function sousuo(val){
		var tep=[];
		$.each(shuzu,function(i,v){
			if(v.name.indexOf(val)!=-1||v.phone.indexOf(val)!=-1||v.pinyin.indexOf(val)!=-1){
				tep.push(v);
			}
		})
		render(tep)
	}
	//滚动屏幕show内容相应改变
	function scroll(){
		var top=$(window).scrollTop();
		var index;
		table.forEach(function(v,i){
			if(top>table[i]){
				index=i;
			}
		})
		$(".show").text(letters[index]);
		$(".context div").css("color","white").eq(index).css("color","purple")
	}

	$.ajax({
		url:'/user',
		type:'get',
		success:function(ra){
          shuzu=ra;
          render(shuzu);
		}
	})

	$("input").on("input",function(){
		sousuo($.trim($(this).val()));	
	})

	$(window).on("scroll",function(){
		scroll();	
	})

	$(".context").on("touchend","div",function(){
		 var index=$(this).index();
		 $(window).scrollTop(table[index]+$(".show").height());
		$(".show").text(letters[index])
	})


	// 	$(".context").on("touchstart","div",function(e){
	// 	var index=$(this).index();
	// 	var x=e.originalEvent.changedTouches[0].clientY;
	// 	$(window).scrollTop(table[index]-$(".show").height()-$(".search").height())
	// 	$(document).on("touchmove",function(e){
	// 		var y=e.originalEvent.changedTouches[0].clientY;
	// 		var cj=y-$(this).index()
	// 		var c=Math.abs(y-x);
	// 		var h=$(".context div").height();
	// 		var  i=0;
	// 		var index1;						//差值index1
	// 		while(c>i*h){
	// 			i++;
	// 			index1=i;
	// 		}
	// 		if((y-x)>0){
	// 			$(window).scrollTop(table[index+index1]-$(".show").height()-$(".search").height())
	// 		}else{
	// 			$(window).scrollTop(table[index-index1]-$(".show").height()-$(".search").height())
	// 		}	
	// 		return false;
	// 	})
	// 	return false;
	// })
	// $(".context").on("touchend","div",function(){
	// 	$(document).off("touchmove")
	// 	return false;
	// })

})