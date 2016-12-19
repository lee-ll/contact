var express=require('express');
var mysql=require('mysql');
var bodyParser=require('body-parser');
var pinyin=require('pinyin');
var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.listen(18080,function(){
	console.log("监听成功");
});
var cn=mysql.createConnection({
	host:'sqld.duapp.com',
	port:4050,
	user:'6a436154d1d2440d98af79a15e6d9a39',
	password:'be0581f8a9614505a6d3184c6a2fabe5',
	database:'HmXZesfelYlfoXyhzoGs'
});
cn.connect();
app.get('/admin',function(req,res){
  res.sendFile(__dirname+'/site/index.html');
})
app.get('/',function(req,res){
	res.sendFile(__dirname+'/site/main.html');
})
app.get('/user',function(req,res){
	var sql='select * from user';
	cn.query(sql,function(err,row){
		res.json(row);
	})
}).post('/user',function(req,res){
	var sql='insert into user set?';
	cn.query(sql,{name:''},function(err,row){
		res.json({id:row.insertId});
	})
}).delete('/user',function(req,res){
	var sql='delete from user where id=?';
	cn.query(sql,[req.body.id],function(err,row){
		if(!err){
			res.json({state:'ok'});
		}
		
	})
}).put('/user',function(req,res){
	if(req.body.name){
		var name=req.body.name;
		var o=pinyin(name,{style:pinyin.STYLE_NORMAL}).join(" ");
		var sql='update user set name=?,pinyin=? where id=?';
		cn.query(sql,[name,o,req.body.id],function(err,row){
			if(!err){
				res.json("更新成功");
			}
		})
	}else if(req.body.phone){
		var sql='update user set phone=? where id=?';
		cn.query(sql,[req.body.phone,req.body.id],function(err,row){
			if(!err){
				res.json("更新成功");
			}
		})
	}
	
})
app.use(express.static(__dirname+'/site/public'));