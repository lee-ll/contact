$(function(){
	$.ajax({
		type:'get',
		url:'/user',
		success:function(data){
         data.forEach(function(v,i){
         	$('<tr data-id='+v.id+'><td><input type="text" value='+v.id+'></td><td><input type="text" value='+v.name+' class="name"></td><td><input type="text" class="phone" value='+v.phone+' ></td> <td class="delete">×</td> </tr>').appendTo("tbody")
         })
		}
	})
	$("#add").on("click",function(){
		$.ajax({
			type:'post',
			url:'/user',
			success:function(data){
				$('<tr data-id='+data.id+'><td><input type="text" value='+data.id+'></td><td><input type="text"  class="name"></td><td><input type="text"  class="phone"></td> <td class="delete">×</td></tr>').appendTo("tbody");
			     } 
              })
		})
	$("tbody").on("click",".delete",function(){
		var tr=$(this).closest("tr");
      $.ajax({
      	type:'delete',
      	url:'/user',
      	data:{id:tr.attr("data-id")},
      	success:function(data){
      		if(data.state==="ok"){
      			tr.remove();
      		}
      	}
      })
	})
	$('tbody').on("keyup","input",function(){
		var data={};
		data.id=$(this).closest("tr").attr("data-id");
		if($(this).hasClass("name")){
			data.name=$.trim($(this).val());
		}else if($(this).hasClass("phone")){
			data.phone=$.trim($(this).val());
		}
		console.log(data)
		$.ajax({
			type:'put',
			url:'/user',
			data:data,
			success:function(){
				console.log(1)
			}
		})
	})
})