 ;(function(){
//登陆函数
var username;
$("body").on("click","#login",function(){
	var login={
			userName:$(".username").val(),
			password:$(".password").val()
		}
		username=$(".username").val();
		$.ajax({	
	 		url:"http://yiranblade.cn/lbms/login",
	 		type:"POST",	
	 		dataType:"json",  
	 		data:login,
			success: function (data) {
					if (data.code == "200")
					{
						//console.log($(".identity input:checked").val());
						$.ajax({	
					 		url:"http://yiranblade.cn/lbms/login/"+username,
					 		type:"GET",	
					 		dataType:"json",
					 		success:function(data){
					 			if(data.code=="200")
					 			{ 	
					 				//console.log(data);
					 				if((data.data.power=="admin") && ($(".identity input:checked").val()=="管理员")){
					 					self.location="admin.html?id="+data.data.userId;
					 				}
					 				else if((data.data.power=="student") && ($(".identity input:checked").val()=="学生")){
					 					self.location="student.html?id="+data.data.userId;
					 				}
					 				else if((data.data.power=="teacher") && ($(".identity input:checked").val()=="教师")){
					 					self.location="teacher.html?id="+data.data.userId;
					 				}
					 				else
					 					alert("用户信息和身份并不匹配哦");
					 			}
					 			else{
					 				alert("错误发生了");
					 			}
					 		}
				 		});	
					}
					if (data.code == "400")
					{
						alert("信息格式错误");
					}
					if(data.code == "501")
					{
						alert("客观慢点呦-您的请求过于频繁");
					}
					if(data.code == "500")
					{
						alert("用户名或密码输入错误");
					}
					if(data.code == "502")
					{
						alert("用户名或密码输入错误");
					}
				},
			error:function(){
				alert("请求未发送出去");
			}
		});
	});
//获取调转页面后传入的参数
 var url = location.search;
 if (url.indexOf("?") != -1){
 	var begin=url.indexOf("=");
 	username=url.substr(begin+1,8);
 }
//通过实验id获取实验名称
function ajaxgetitemname(itemid){
	var itemname;
	$.ajax({	
	 		url:"http://yiranblade.cn/lbms/item/"+itemid,
	 		type:"GET",	
	 		async:false,
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				//console.log(data.data.itemname);
	 				itemname=data.data.itemname;
	 			}
	 			else{
	 				alert("错误发生了");
	 			}
	 		}
 		});	
	return itemname;
}
//通过教师id获取教师姓名
function ajaxgetteaname(teaid){
	var teaname;
	if(teaid==null)
		return false;
	$.ajax({	
	 		url:"http://yiranblade.cn/lbms/teacher/"+teaid,
	 		type:"GET",	
	 		async:false,
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				//console.log(data.data.itemname);
	 				teaname=data.data.name;
	 			}
	 			else{
	 				alert("错误发生了");
	 			}
	 		}
 		});	
	return teaname;
}

 //学生管理模块
 //学生管理-个人信息组件
 var PersonInformation=React.createClass({
 	getInitialState: function () {
		    return{
		      result:[]
	    };
  	},
  	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data.data;
 		this.state.result=result;
  	},
  	changeclick:function(){
  		//点击跳转至修改密码页面
  		ReactDOM.render(	<Studentpassword/>,  document.getElementById("info_student"));
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		//console.log(result);
 		var i=-1;
 		return(
 			<div id="PersonInformation">
	 			<div className="title">
	     		 个人信息
	    		</div>
			    <div id="information">
			    	<ul className="teacher_infor">
		    			<li><span>学号 :</span><span>{result.username}</span></li>
		    			<li><span>姓名 :</span><span>{result.name}</span></li>
		    			<li><span>性别 :</span><span>{(result.sex)=="0"?"男":"女"}</span></li>
		    			<li><span>专业 :</span><span>{result.specialization}</span></li>
		    			<li><span>年级 :</span><span>{result.grade}</span></li>
		    			<li><span>联系方式 :</span><span>{result.contact}</span></li>
	    			</ul>
	    			<input type="button" name="entering" value="修改密码" className="entering" onClick={this.changeclick}/>
			    </div>	
		    </div>	
 		)
 	}
 });
  //学生管理-修改密码
 var Studentpassword=React.createClass({
 	getInitialState: function () {
		    return{
		      result:[]
	    };
  	},
  	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data;
 		this.state.result=result;
  	},
  	changeclick:function(){
  		var admin={
  			password:$(".write_password").val(),
  			numId:username,
  		}
  		//console.log(admin);
  		$.ajax({	
			url:"http://yiranblade.cn/lbms/cipher/student",
			type:"POST",	
			dataType:"json", 
			data:admin,
			success:function(data){
				if(data.code=="200")
				{
					alert("修改成功 , 信息已保存")
				}
				else{
					alert("修改失败");
				}
			 }
		});
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		//console.log(result);
 		var i=-1;
 		return(
 			<div id="Studentpassword">
	 			<div className="title">
	     		 	修改密码
	    		</div>
			    <div id="information">
			    	<ul className="student_infor">
	    			<li><span>新密码 :</span><input type="text" name="write_in" className="write_password" /></li>
	    			</ul>
	    			<input type="button" name="entering" value="修改" className="entering" onClick={this.changeclick}/>
			    </div>	
		    </div>	
 		)
 	}
 });
//学生管理-查看公告
 var PublicInformation=React.createClass({
 	handleClick:function(e){
 		if(e.target.textContent=="阅读全文")
 		{
 			e.target.parentNode.className="whole";
 		 	e.target.textContent="收起";
 		}
 		else
 		{	
 			e.target.parentNode.className="half";	
 			e.target.textContent="阅读全文";
 		}
 	},
 	getInitialState: function () {
	    return{
	      result:[]
	    };
  	},
  	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data.data.recordList;
 		this.state.result=result;
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		//console.log(result);
 		var i=-1;
 		return(
 			<div id="PublicInformation">
 				<div className="title">
	     		 查看公告
	    		</div>
 				<ul>
 					{
		    			result.map(function(result){
		    				i++;
		    				return(
		    					<li key={i} className="half">
		    						{result.noticecontent}
					    			<span className="deploy" onClick={this.handleClick}>阅读全文</span>
					    		</li>
		    				)
		    			}.bind(this))
	    			}
 				</ul>
 			</div>
 		)
 	}
 });

//学生管理-查看已确认实验
 var OrderTestok=React.createClass({
 	getInitialState: function () {
	    return{
	      result:[]
	    };
  	},
  	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data.data;
 		this.state.result=result;
  	},
  	getgrade:function(batid){
  		//console.log(batid);
  		//点击获取成绩
  		 $.ajax({	
	 		url:"http://yiranblade.cn/lbms/test/"+batid+"&"+username,
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				if(data.data.results!=null)
	 					alert(data.data.results);
	 				else
	 					alert("成绩还未录入,请耐心等待");
	 			}
	 			else{
	 				alert("成绩还未录入,请耐心等待");
	 			}
	 		},
	 		error:function(){
	 			alert("成绩还未录入,请耐心等待");
	 		}
 		});
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		//console.log(result);
 		var i=-1;
 		return(
 			<div id="OrderTestok">
 				<div className="title">
	     		 查看已确认实验
	    		</div>
 				<ul className="student_infor">
 					<li><span>批次编号</span><span className="stu_item">实验名称</span><span>教师姓名</span><span>实验地点</span><span>实验日期</span><span>节次</span><span>成绩</span></li>
	    			{
		    			result.map(function(result){
		    				i++;
		    				return(
		    					<li key={i}>
		    						<span>{result.batid}</span>
		    						<span className="stu_item">{ajaxgetitemname(result.itemid)}</span>
		    						<span>{ajaxgetteaname(result.teaid)}</span>
		    						<span>{result.laboratory}</span>
		    						<span>{result.date}</span>
		    						<span>{result.segmentation}</span>
		    						<span className="getgrade" onClick={(event)=>{event.stopPropagation(),this.getgrade(result.batid);}}>获取成绩</span>
					    		</li>
		    				)
		    			}.bind(this))
	    			}
 				</ul>
 			</div>
 		)
 	}
 });
  //学生管理-确认实验
 var OrderTest=React.createClass({
 	getInitialState: function () {
	    return{
	      result:[]
	    };
  	},
  	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data.data;
 		this.state.result=result;
  	},
  	orderclick:function(batid,okid){
  		//预约实验不能同时预约同一项实验
 		var test={
 			batid:batid,
 			numid:username
 		}
 		var j=0;
 		//console.log(JSON.stringify(test));
 		//获取到该学生已经预约的实验id
 		$.ajax({	
	 		url:"http://yiranblade.cn/lbms/batch/student/"+username,
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				for(var i=0;i<data.data.length;i++)
	 				{
	 					//console.log(data.data[i].itemid);
	 					//判断此时预约的实验id是否存在，若存在则不能继续预约
	 					if(data.data[i].itemid==okid)
	 						j=1;
	 				}
	 				if(j==0)
	 				{
	 					//不存在则发送请求，预约成功
		 				$.ajax({	
					 		url:"http://yiranblade.cn/lbms/batch/student/"+batid+"&"+username,
					 		type:"PUT",	
					 		dataType:"json", 
					 		"contentType":"application/json",  
					 		data:JSON.stringify(test),
					 		success:function(data){
					 			if(data.code=="200")
					 			{
					 				alert("确认成功");
					 			}
					 			else{
					 				alert("确认失败");
					 			}
					 		},
					 		error:function(){
					 			alert("批次编号信息不存在");
					 		}
				 		});
				 	}
				 	else{
				 		alert("你不能同时确认同一项实验哦");
				 	}
	 			}
	 			else{
	 				alert("no");
	 			}
	 		}
 		});		
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		//console.log(result);
 		var i=-1;
 		return(
 			<div id="OrderTest">
 				<div className="title">
	     		 	确认实验
	    		</div>
	    		<h4>这里是全部项目批次:</h4>
	    		<ul className="admin_infor" id="posit">
	    			<li><span>批次编号</span><span className="it_name">实验名称</span><span>教师姓名</span><span>实验地点</span><span>实验日期</span><span>节次</span>
	    				<span className="stu_del">确认</span>
	    			</li>
	    			{
		    			result.map(function(result){
		    				i++;
		    				return(
		    					<li key={i}>
		    						<span>{result.batid}</span>
		    						<span className="item_name">{ajaxgetitemname(result.itemid)}</span>
		    						<span>{ajaxgetteaname(result.teaid)}</span>
		    						<span>{result.laboratory}</span>
		    						<span>{result.date}</span>
		    						<span>{result.segmentation}</span>
					    			<span onClick={ (event)=>{event.stopPropagation(),this.orderclick(result.batid,result.itemid); } } className="stu_delete">预约</span>
					    		</li>
		    				)
		    			}.bind(this))
	    			}
	    		</ul>
 			</div>
 		)
 	}
 });

$(".stuent_infor").click(function(){
 	$.ajax({	
	 		url:"http://yiranblade.cn/lbms/student/"+username,
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				ReactDOM.render(	<PersonInformation data={data}/>,  document.getElementById("info_student"));
	 			}
	 			else{
	 				alert("no");
	 			}
	 		}
 		});
})

$(".stuent_public").click(function(){
	 $.ajax({	
	 		url:"http://yiranblade.cn/lbms/notice/page/1",
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				ReactDOM.render(	<PublicInformation data={data}/>,  document.getElementById("info_student"));
	 			}
	 			else{
	 				alert("no");
	 			}
	 		}
 		});
})
$(".stuent_test").click(function(){
	$.ajax({	
	 		url:"http://yiranblade.cn/lbms/batch/student/"+username,
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				ReactDOM.render(	<OrderTestok data={data}/>,  document.getElementById("info_student"));
	 			}
	 			else{
	 				alert("no");
	 			}
	 		}
 		});
})
$(".stuent_score").click(function(){
	ReactDOM.render(	<PersonScore />,  document.getElementById("info_student"));
})
$(".stuent_order").click(function(){
	$.ajax({	
	 		url:"http://yiranblade.cn/lbms/batch/teacherorder",
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				ReactDOM.render(	<OrderTest data={data}/>,  document.getElementById("info_student"));
	 			}
	 			else{
	 				alert("no");
	 			}
	 		}
 		});
})

//管理员管理模块

//管理员管理-学生管理
 var AdminStudent=React.createClass({
 	getInitialState: function () {
	    return{
	      result:[]
	    };
  	},
  	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data.data.recordList;
 		this.state.result=result;
  	},
  	addclick:function(){
  		//点击添加跳转至添加添加新学生页面
	 	ReactDOM.render(	<AdminAddstudent/>,  document.getElementById("info_admin"));
  	},
  	deleteclick:function(numid){
  		//点击删除跳出窗口询问是否删除
  		//console.log(e.target.textContent);
  		if(confirm("确认删除吗？"))
  		{
  			$.ajax({	
		 		url:"http://yiranblade.cn/lbms/student/"+numid,
		 		type:"DELETE",	
		 		dataType:"json",  
		 		success:function(data){
		 			if(data.code=="200")
		 			{
		 				alert("删除成功");
		 				location.reload(true);
		 			}
		 			else{
		 				alert("删除失败");
		 			}
		 		}
 			});
  		}
  	},
  	reviseclick:function(grade,name,sex,sep,con,numid,username){
  		//点击修改跳转至修改页面
  		ReactDOM.render(	<AdminRestudent grade={grade} name={name} sex={sex} sep={sep} con={con} numid={numid} username={username}/>,  document.getElementById("info_admin"));
  	},
  	componentDidMount:function(){
  	 	window.addEventListener('keydown', this.handleKeyDown);
	},
	handleKeyDown:function(e){
		//搜索
		if(e.keyCode==13 && $(".admin_search input").val()!="")
		{
			var special=$(".admin_search input").val();
			$.ajax({	
	 		url:"http://yiranblade.cn/lbms/student/page/special/"+special+"&1",
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				ReactDOM.render(	<SearchInformation data={data}/>,  this.refs.admin_infor );
	 			}
	 			else{
	 				alert("no");
	 			}
	 		}
 			});
		}
	},
	addfile:function(){		
		var formData = new FormData($("#uploadForm")[0]);
		console.log(formData);
		$.ajax({	
	 		url:"http://yiranblade.cn/lbms/student/multitude",
	 		type:"POST",	
	 		dataType:"json",  
          	processData: false,  
          	"contentType":false,
	 		data:formData,
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				alert("成功添加");
	 			}
	 			else{
	 				alert("添加失败");
	 			}
	 		}
 			});
	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		//console.log(result);
 		var i=-1;
 		return(
 			<div id="AdminStudent">
 				<div className="title">
	     		 	学生管理
	    		</div>
	    		<h4>这里是全部学生: 
	    			<span className="stu_add" onClick={this.addclick}>增加</span> 
	    			<form id="uploadForm">
	    			<input className="addfile" type="file" id="student" name="student" />   			
　　　 				<input className="addfilea" type="button" value="解析并添加" onClick={this.addfile}/>
					</form>					
				</h4>
	    		<ul className="admin_infor" ref="admin_infor">
	    			<li key={i}>
		    			<span>姓名</span>
		    			<span>学号</span>
		    			<span>性别</span>
		    			<span>专业</span>
					    <span>删除</span>
					    <span>修改</span>
					</li>
	    			{
		    			result.map(function(result){
		    				i++;
		    				var numid=result.numid;
		    				return(
		    					<li key={i}>
		    						<span>{result.name}</span>
		    						<span>{result.username}</span>
		    						<span>{(result.sex)=="0"?"男":"女"}</span>
		    						<span>{result.grade}</span>
					    			<span onClick={ (event)=>{event.stopPropagation(),this.deleteclick(result.numid); } } className="stu_delete">删除</span>
					    			<span onClick={ (event)=>{event.stopPropagation(),this.reviseclick(result.grade,result.name,result.sex,result.specialization,result.contact,result.numid,result.username); } } className="stu_revise">修改</span>
					    		</li>
		    				)
		    			}.bind(this))
	    			}
	    		</ul>
 			</div>
 		)
 	}
 });
 //管理员管理-搜索学生
 var SearchInformation=React.createClass({
 	getInitialState: function () {
	    return{
	      result:[]
	    };
  	},
  	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data.data.recordList;
 		this.state.result=result;
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		//console.log(result);
 		var i=-1;
 		return(
	    		<ul className="SearchInformation">
	    			<li key={i}>
		    			<span>姓名</span>
		    			<span>学号</span>
		    			<span>性别</span>
		    			<span>专业</span>
					    <span>删除</span>
					    <span>修改</span>
					</li>
	    			{
		    			result.map(function(result){
		    				i++;
		    				var numid=result.numid;
		    				return(
		    					<li key={i}>
		    						<span>{result.name}</span>
		    						<span>{result.username}</span>
		    						<span>{(result.sex)=="0"?"男":"女"}</span>
		    						<span>{result.specialization}</span>
					    			<span onClick={ (event)=>{event.stopPropagation(),this.deleteclick(result.numid); } } className="stu_delete">删除</span>
					    			<span onClick={ (event)=>{event.stopPropagation(),this.reviseclick(result.grade,result.name,result.sex,result.specialization,result.contact,result.numid,result.username); } } className="stu_revise">修改</span>
					    		</li>
		    				)
		    			}.bind(this))
	    			}
	    		</ul>
 		)
 	}
 });
 //管理员管理-添加新学生
 var AdminAddstudent=React.createClass({
 	addclick:function(){
 		if($(".write_sex").val()=="男")
 			var sex="0";
 		else
 			var sex="1";

 		var student={
 			name:$(".write_name").val(),
	 		sex:sex,
	 		specialization:$(".write_spec").val(),
	 		grade:$(".write_grade").val(),
	 		contact:$(".write_cont").val(),
	 		username:$(".write_username").val(),
 		};
 		//console.log(JSON.stringify(student));
 		$.ajax({	
	 		url:"http://yiranblade.cn/lbms/student",
	 		type:"POST",	
	 		dataType:"json", 
	 		"contentType":"application/json",  
	 		data:JSON.stringify(student),
	 		success:function(data){
	 			if(data.code=="200")
	 			{
	 				//console.log(data);
	 				alert("新增管理员用户名为 "+$(".write_username").val()+"\n默认密码为11111111"+"\n信息已成功保存");
	 			}
	 			else{
	 				alert("保存失败");
	 			}
	 		}
 		});
 	},
 	render:function(){
 		return(
 			<div id="AdminAddstudent">
 				<div className="title">
	     		 	添加新学生
	    		</div>
	    		<ul className="teacher_infor">
	    			<li><span>姓名 :</span><input type="text" name="write_in" className="write_name" /></li>
	    			<li><span>性别 :</span><input type="text" name="write_in" className="write_sex" /></li>
	    			<li><span>学号:</span><input type="text" name="write_in" className="write_username" /></li>
	    			<li><span>专业 :</span><input type="text" name="write_in" className="write_grade" /></li>
	    			<li><span>年级 :</span><input type="text" name="write_in" className="write_spec" /></li>
	    			<li><span>联系方式 :</span><input type="text" name="write_in" className="write_cont" /></li>
	    		</ul>
	    		<input type="button" name="entering" value="添加" className="entering" onClick={this.addclick}/>
 			</div>
 		)
 	}
 });

 //管理员管理-修改学生信息
 var AdminRestudent=React.createClass({
 	reviseclick:function(){
 		if($(".write_sex").val()=="男")
 			var sex="0";
 		else
 			var sex="1";

 		var student={
 			numid:this.props.numid,
 			name:$(".write_name").val(),
	 		sex:sex,
	 		specialization:$(".write_spec").val(),
	 		grade:$(".write_grade").val(),
	 		contact:$(".write_cont").val(),
 		};
 		//console.log(JSON.stringify(student));
 		$.ajax({	
	 		url:"http://yiranblade.cn/lbms/student",
	 		type:"PUT",	
	 		dataType:"json", 
	 		"contentType":"application/json",  
	 		data:JSON.stringify(student),
	 		success:function(data){
	 			if(data.code=="200")
	 			{
	 				alert("信息已更新成功")
	 			}
	 			else{
	 				alert("更新失败");
	 			}
	 		}
 		});
 	},
 	render:function(){
 		return(
 			<div id="AdminRestudent">
 				<div className="title">
	     		 	修改学生信息
	    		</div>
	    		<ul className="teacher_infor">
	    			<li><span>学号 :</span><input type="text" name="write_in" className="write_numid" value={this.props.username} /></li>
	    			<li><span>姓名 :</span><input type="text" name="write_in" className="write_name" defaultValue={this.props.name} /></li>
	    			<li><span>性别 :</span><input type="text" name="write_in" className="write_sex" defaultValue={(this.props.sex)=="0"?"男":"女"} /></li>
	    			<li><span>专业 :</span><input type="text" name="write_in" className="write_grade" defaultValue={this.props.grade} /></li>
	    			<li><span>年级 :</span><input type="text" name="write_in" className="write_spec" defaultValue={this.props.sep} /></li>
	    			<li><span>联系方式 :</span><input type="text" name="write_in" className="write_cont" defaultValue={this.props.con} /></li>
	    		</ul>
	    		<input type="button" name="entering" value="修改" className="entering" onClick={this.reviseclick}/>
 			</div>
 		)
 	}
 });

 //管理员管理-教师管理
 var AdminTeacher=React.createClass({
 	getInitialState: function () {
	    return{
	      result:[]
	    };
  	},
  	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data.data.recordList;
 		this.state.result=result;
  	},
  	addclick:function(){
  		//点击添加跳转至添加添加新教师页面
	 	ReactDOM.render(	<AdminAddteacher/>,  document.getElementById("info_admin"));
  	},
  	deleteclick:function(teaid){
  		//点击删除跳出窗口询问是否删除
  		//console.log(e.target.textContent);
  		if(confirm("确认删除吗？"))
  		{
  			$.ajax({	
		 		url:"http://yiranblade.cn/lbms/teacher/"+teaid,
		 		type:"DELETE",	
		 		dataType:"json",  
		 		success:function(data){
		 			if(data.code=="200")
		 			{
		 				alert("删除成功");
		 				location.reload(true);
		 			}
		 			else{
		 				alert("删除失败");
		 			}
		 		}
 			});
  		}
  	},
  	reviseclick:function(title,name,sex,edu,con,teaid,username){
  		//点击修改跳转至修改页面
  		ReactDOM.render(	<AdminReteacher title={title} name={name} sex={sex} edu={edu} con={con} teaid={teaid} username={username}/>,  document.getElementById("info_admin"));
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		//console.log(result);
 		var i=-1;
 		return(
 			<div id="AdminTeacher">
 				<div className="title">
	     		 	教师管理
	    		</div>
	    		<h4>这里是全部教师: <span className="stu_add" onClick={this.addclick}>增加</span></h4>
	    		<ul className="admin_infor">
	    			<li><span>姓名</span><span>性别</span><span>院系</span><span>工号</span><span>学历</span>
	    				<span>删除</span><span>修改</span>
	    			</li>
	    			{
		    			result.map(function(result){
		    				i++;
		    				return(
		    					<li key={i}>
		    						<span>{result.name}</span>
		    						<span>{(result.sex)=="0"?"男":"女"}</span>
		    						<span>{result.title}</span>
		    						<span>{result.username}</span>
		    						<span>{result.education}</span>
					    			<span onClick={ (event)=>{event.stopPropagation(),this.deleteclick(result.teaid); } } className="stu_delete">删除</span>
					    			<span onClick={ (event)=>{event.stopPropagation(),this.reviseclick(result.title,result.name,result.sex,result.education,result.contact,result.teaid,result.username); } } className="stu_revise">修改</span>
					    		</li>
		    				)
		    			}.bind(this))
	    			}
	    		</ul>
 			</div>
 		)
 	}
 });
//管理员管理-添加新教师
 var AdminAddteacher=React.createClass({
 	addclick:function(){
 		if($(".write_sex").val()=="男")
 			var sex="0";
 		else
 			var sex="1";

 		var teacher={
 			name:$(".write_name").val(),
	 		sex:sex,
	 		title:$(".write_title").val(),
	 		education:$(".write_edu").val(),
	 		contact:$(".write_cont").val(),
	 		username:$(".write_username").val()
 		};
 		//console.log(JSON.stringify(teacher));
 		$.ajax({	
	 		url:"http://yiranblade.cn/lbms/teacher",
	 		type:"POST",	
	 		dataType:"json", 
	 	 	"contentType":"application/json",  
	 		data:JSON.stringify(teacher),
	 		success:function(data){
	 			if(data.code=="200")
	 			{
	 				alert("新增管理员用户名为 "+$(".write_username").val()+"\n默认密码为11111111"+"\n信息已成功保存");
	 			}
	 			else{
	 				alert("保存失败");
	 			}
	 		}
 		});
 	},
 	render:function(){
 		return(
 			<div id="AdminAddteacher">
 				<div className="title">
	     		 	添加新教师
	    		</div>
	    		<ul className="teacher_infor">
	    			<li><span>姓名 :</span><input type="text" name="write_in" className="write_name" /></li>
	    			<li><span>性别 :</span><input type="text" name="write_in" className="write_sex" /></li>
	    			<li><span>工号 :</span><input type="text" name="write_in" className="write_username" /></li>
	    			<li><span>院系 :</span><input type="text" name="write_in" className="write_title" /></li>
	    			<li><span>学历 :</span><input type="text" name="write_in" className="write_edu" /></li>
	    			<li><span>联系方式 :</span><input type="text" name="write_in" className="write_cont" /></li>
	    		</ul>
	    		<input type="button" name="entering" value="添加" className="entering" onClick={this.addclick}/>
 			</div>
 		)
 	}
 });

//管理员管理-修改教师信息
 var AdminReteacher=React.createClass({
 	reviseclick:function(){
 		if($(".write_sex").val()=="男")
 			var sex="0";
 		else
 			var sex="1";

 		var teacher={
 			teaid:this.props.teaid,
 			name:$(".write_name").val(),
	 		sex:sex,
	 		title:$(".write_title").val(),
	 		education:$(".write_edu").val(),
	 		contact:$(".write_cont").val(),
 		};
 		//console.log(JSON.stringify(teacher));
 		$.ajax({	
	 		url:"http://yiranblade.cn/lbms/teacher",
	 		type:"PUT",	
	 		dataType:"json", 
	 		"contentType":"application/json",  
	 		data:JSON.stringify(teacher),
	 		success:function(data){
	 			if(data.code=="200")
	 			{
	 				alert("信息已更新成功")
	 			}
	 			else{
	 				alert("更新失败");
	 			}
	 		}
 		});
 	},
 	render:function(){
 		return(
 			<div id="AdminReteacher">
 				<div className="title">
	     		 	修改教师信息
	    		</div>
	    		<ul className="teacher_infor">
	    			<li><span>工号 :</span><input type="text" name="write_in" className="write_teaid" value={this.props.username} /></li>
	    			<li><span>姓名 :</span><input type="text" name="write_in" className="write_name" defaultValue={this.props.name} /></li>
	    			<li><span>性别 :</span><input type="text" name="write_in" className="write_sex" defaultValue={(this.props.sex)=="0"?"男":"女"} /></li>
	    			<li><span>院系 :</span><input type="text" name="write_in" className="write_title" defaultValue={this.props.title} /></li>
	    			<li><span>学历 :</span><input type="text" name="write_in" className="write_edu" defaultValue={this.props.edu} /></li>
	    			<li><span>联系方式 :</span><input type="text" name="write_in" className="write_cont" defaultValue={this.props.con} /></li>
	    		</ul>
	    		<input type="button" name="entering" value="修改" className="entering" onClick={this.reviseclick}/>
 			</div>
 		)
 	}
 });

  //管理员管理-管理员管理
 var AdminAdmin=React.createClass({
 	getInitialState: function () {
	    return{
	      result:[]
	    };
  	},
  	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data.data.recordList;
 		this.state.result=result;
  	},
  	addclick:function(){
  		//点击添加跳转至添加添加新管理员页面
	 	ReactDOM.render(	<AdminAddadmin/>,  document.getElementById("info_admin"));
  	},
  	deleteclick:function(admid){
  		//点击删除跳出窗口询问是否删除
  		//console.log(e.target.textContent);
  		if(confirm("确认删除吗？"))
  		{
  			$.ajax({	
		 		url:"http://yiranblade.cn/lbms/administrator/"+admid,
		 		type:"DELETE",	
		 		dataType:"json",  
		 		success:function(data){
		 			if(data.code=="200")
		 			{
		 				alert("删除成功");
		 				location.reload(true);
		 			}
		 			else{
		 				alert("删除失败");
		 			}
		 		}
 			});
  		}
  	},
  	reviseclick:function(name,sex,con,admid,username){
  		//点击修改跳转至修改页面
  		ReactDOM.render(	<AdminReadmin name={name} sex={sex} con={con} admid={admid} username={username}/>,  document.getElementById("info_admin"));
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		//console.log(result);
 		var i=-1;
 		return(
 			<div id="AdminAdmin">
 				<div className="title">
	     		 	管理员
	    		</div>
	    		<h4>这里是全部管理员: <span className="stu_add" onClick={this.addclick}>增加</span></h4>
	    		<ul className="admin_infor">
	    			<li><span>姓名</span><span>性别</span><span>管理工号</span>
	    				<span>删除</span><span>修改</span>
	    			</li>
	    			{
		    			result.map(function(result){
		    				i++;
		    				return(
		    					<li key={i}>
		    						<span>{result.name}</span>
		    						<span>{(result.sex)=="0"?"男":"女"}</span>
		    						<span>{result.username}</span>
					    			<span onClick={ (event)=>{event.stopPropagation(),this.deleteclick(result.admid); } } className="stu_delete">删除</span>
					    			<span onClick={ (event)=>{event.stopPropagation(),this.reviseclick(result.name,result.sex,result.contact,result.admid,result.username); } } className="stu_revise">修改</span>
					    		</li>
		    				)
		    			}.bind(this))
	    			}
	    		</ul>
 			</div>
 		)
 	}
 });
//管理员管理-添加新管理员
 var AdminAddadmin=React.createClass({
 	addclick:function(){
 		if($(".write_sex").val()=="男")
 			var sex="0";
 		else
 			var sex="1";

 		var student={
 			name:$(".write_name").val(),
	 		sex:sex,
	 		contact:$(".write_cont").val(),
 		};
 		//console.log(JSON.stringify(student));
 		$.ajax({	
	 		url:"http://yiranblade.cn/lbms/administrator",
	 		type:"POST",	
	 		dataType:"json", 
	 		"contentType":"application/json",  
	 		data:JSON.stringify(student),
	 		success:function(data){
	 			if(data.code=="200")
	 			{
	 				alert("新增管理员用户名为 "+$(".write_username").val()+"\n默认密码为11111111"+"\n信息已成功保存");
	 			}
	 			else{
	 				alert("保存失败");
	 			}
	 		}
 		});
 	},
 	render:function(){
 		return(
 			<div id="AdminAddadmin">
 				<div className="title">
	     		 	添加新管理员
	    		</div>
	    		<ul className="teacher_infor">
	    			<li><span>姓名 :</span><input type="text" name="write_in" className="write_name" /></li>
	    			<li><span>性别 :</span><input type="text" name="write_in" className="write_sex" /></li>
	    			<li><span>联系方式 :</span><input type="text" name="write_in" className="write_cont" /></li>
	    		</ul>
	    		<input type="button" name="entering" value="添加" className="entering" onClick={this.addclick}/>
 			</div>
 		)
 	}
 });

 //管理员管理-修改管理员信息
 var AdminReadmin=React.createClass({
 	reviseclick:function(){
 		if($(".write_sex").val()=="男")
 			var sex="0";
 		else
 			var sex="1";

 		var student={
 			admid:this.props.admid,
 			name:$(".write_name").val(),
	 		sex:sex,
	 		contact:$(".write_cont").val(),
 		};
 		//console.log(JSON.stringify(student));
 		$.ajax({	
	 		url:"http://yiranblade.cn/lbms/administrator",
	 		type:"PUT",	
	 		dataType:"json", 
	 		"contentType":"application/json",  
	 		data:JSON.stringify(student),
	 		success:function(data){
	 			if(data.code=="200")
	 			{
	 				alert("信息已更新成功")
	 			}
	 			else{
	 				alert("更新失败");
	 			}
	 		}
 		});
 	},
 	render:function(){
 		return(
 			<div id="AdminReadmin">
 				<div className="title">
	     		 	修改管理员信息
	    		</div>
	    		<ul className="teacher_infor">
	    			<li><span>管理公号 :</span><input type="text" name="write_in" className="write_admid" value={this.props.username} /></li>
	    			<li><span>姓名 :</span><input type="text" name="write_in" className="write_name" defaultValue={this.props.name} /></li>
	    			<li><span>性别 :</span><input type="text" name="write_in" className="write_sex" defaultValue={(this.props.sex)=="0"?"男":"女"} /></li>
	    			<li><span>联系方式 :</span><input type="text" name="write_in" className="write_cont" defaultValue={this.props.con} /></li>
	    		</ul>
	    		<input type="button" name="entering" value="修改" className="entering" onClick={this.reviseclick}/>
 			</div>
 		)
 	}
 });
  //管理员管理-项目管理
 var AdminTest=React.createClass({
 	getInitialState: function () {
	    return{
	      result:[]
	    };
  	},
  	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data.data.recordList;
 		this.state.result=result;
  	},
  	addclick:function(){
  		//点击添加跳转至添加添加新项目页面
	 	ReactDOM.render(	<AdminAdditem/>,  document.getElementById("info_admin"));
  	},
  	deleteclick:function(itemid){
  		//点击删除跳出窗口询问是否删除
  		//console.log(e.target.textContent);
  		if(confirm("确认删除吗？"))
  		{
  			$.ajax({	
		 		url:"http://yiranblade.cn/lbms/item/"+itemid,
		 		type:"DELETE",	
		 		dataType:"json",  
		 		success:function(data){
		 			if(data.code=="200")
		 			{
		 				alert("删除成功");
		 				location.reload(true);
		 			}
		 			else{
		 				alert("删除失败");
		 			}
		 		}
 			});
  		}
  	},
  	reviseclick:function(name,itemid,term,cour){
  		//点击修改跳转至修改页面
  		ReactDOM.render(	<AdminReitem name={name} itemid={itemid} cour={cour} term={term}/>,  document.getElementById("info_admin"));
  	},
  	adddisclick:function(itemid){
  		//点击添加跳转至添加添加新项目页面
	 	ReactDOM.render(	<AdminAddTestdis itemid={itemid}/>,  document.getElementById("info_admin"));
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		//console.log(result);
 		var i=-1;
 		return(
 			<div id="AdminTest">
 				<div className="title">
	     		 	项目管理
	    		</div>
	    		<h4>这里是全部项目: <span className="stu_add" onClick={this.addclick}>增加</span></h4>
	    		<ul className="admin_infor">
	    			<li><span>实验名称</span><span>学期</span><span>实验所属课程</span><span>实验编号</span>
	    				<span>删除</span><span>修改</span><span>设置</span>
	    			</li>
	    			{
		    			result.map(function(result){
		    				i++;
		    				return(
		    					<li key={i}>
		    						<span>{result.itemname}</span>
		    						<span>{result.term}</span>
		    						<span>{result.coursename}</span>
		    						<span>{result.itemid}</span>
					    			<span onClick={ (event)=>{event.stopPropagation(),this.deleteclick(result.itemid); } } className="stu_delete">删除</span>
					    			<span onClick={ (event)=>{event.stopPropagation(),this.reviseclick(result.itemname,result.itemid,result.term,result.coursename); } } className="stu_revise">修改</span>
					    			<span onClick={ (event)=>{event.stopPropagation(),this.adddisclick(result.itemid); } } className="stu_adddis">设置批次</span>
					    		</li>
		    				)
		    			}.bind(this))
	    			}
	    		</ul>
 			</div>
 		)
 	}
 });

//管理员管理-添加新项目
 var AdminAdditem=React.createClass({
 	addclick:function(){
 		var item={
 			itemname:$(".write_name").val(),
	 		term:$(".write_term").val(),
	 		coursename:$(".write_cont").val(),
 		};
 		//console.log(JSON.stringify(student));
 		$.ajax({	
	 		url:"http://yiranblade.cn/lbms/item",
	 		type:"POST",	
	 		dataType:"json", 
	 		"contentType":"application/json",  
	 		data:JSON.stringify(item),
	 		success:function(data){
	 			if(data.code=="200")
	 			{
	 				alert("成功添加,信息已保存")
	 			}
	 			else{
	 				alert("保存失败");
	 			}
	 		}
 		});
 	},
 	render:function(){
 		return(
 			<div id="AdminAdditem">
 				<div className="title">
	     		 	添加新项目
	    		</div>
	    		<ul className="teacher_infor">
	    			<li><span>实验名称 :</span><input type="text" name="write_in" className="write_name" /></li>
	    			<li><span>学期 :</span><input type="text" name="write_in" className="write_term" /></li>
	    			<li><span>实验所属课程 :</span><input type="text" name="write_in" className="write_cont" /></li>
	    		</ul>
	    		<input type="button" name="entering" value="添加" className="entering" onClick={this.addclick}/>
 			</div>
 		)
 	}
 });

 //管理员管理-修改项目信息
 var AdminReitem=React.createClass({
 	reviseclick:function(){
 		var item={
 			itemid:$(".write_admid").val(),
 			itemname:$(".write_name").val(),
	 		term:$(".write_term").val(),
	 		coursename:$(".write_cont").val(),
 		};
 		//console.log(JSON.stringify(student));
 		$.ajax({	
	 		url:"http://yiranblade.cn/lbms/item",
	 		type:"PUT",	
	 		dataType:"json", 
	 		"contentType":"application/json",  
	 		data:JSON.stringify(item),
	 		success:function(data){
	 			if(data.code=="200")
	 			{
	 				alert("信息已更新成功")
	 			}
	 			else{
	 				alert("更新失败");
	 			}
	 		}
 		});
 	},
 	render:function(){
 		return(
 			<div id="AdminReitem">
 				<div className="title">
	     		 	修改项目信息
	    		</div>
	    		<ul className="teacher_infor">
	    			<li><span>实验编号 :</span><input type="text" name="write_in" className="write_admid" value={this.props.itemid} /></li>
	    			<li><span>实验名称 :</span><input type="text" name="write_in" className="write_name" defaultValue={this.props.name} /></li>
	    			<li><span>学期 :</span><input type="text" name="write_in" className="write_term"  defaultValue={this.props.term}/></li>
	    			<li><span>实验所属课程 :</span><input type="text" name="write_in" className="write_cont" defaultValue={this.props.cour} /></li>
	    		</ul>
	    		<input type="button" name="entering" value="修改" className="entering" onClick={this.reviseclick}/>
 			</div>
 		)
 	}
 });

  //管理员管理-项目批次管理
 var AdminTestdis=React.createClass({
 	getInitialState: function () {
	    return{
	      result:[]
	    };
  	},
  	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data.data.recordList;
 		this.state.result=result;
  	},
  	deleteclick:function(batid){
  		//点击删除跳出窗口询问是否删除
  		//console.log(e.target.textContent);
  		if(confirm("确认删除吗？"))
  		{
  			$.ajax({	
		 		url:"http://yiranblade.cn/lbms/batch/"+batid,
		 		type:"DELETE",	
		 		dataType:"json",  
		 		success:function(data){
		 			if(data.code=="200")
		 			{
		 				alert("删除成功");
		 				location.reload(true);
		 			}
		 			else{
		 				alert("删除失败");
		 			}
		 		}
 			});
  		}
  	},
  	reviseclick:function(batid,itemid,teaid,lab,date,seg){
  		//点击修改跳转至修改页面
  		ReactDOM.render(	<AdminReTestdis batid={batid} itemid={itemid} teaid={teaid} lab={lab} date={date} seg={seg}/>,  document.getElementById("info_admin"));
  	},
  	getstuclick:function(batid){
  		//点击获取该实验批次的学生
  		$.ajax({	
	 		url:"http://yiranblade.cn/lbms/student/"+batid+"/1",
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				ReactDOM.render(	<AdminGetstu data={data}/>,  document.getElementById("info_admin"));
	 			}
	 			else{
	 				alert("no");
	 			}
	 		}
 		});
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		//console.log(result.length);
 		var i=-1;
 		var name=result[i+1];
 		return(
 			<div id="AdminTestdis">
 				<div className="title">
	     		 	项目批次管理
	    		</div>
	    		<h4>这里是全部项目批次:</h4>
	    		<ul className="admin_infor">
	    			<li><span className="it_name">实验名称</span><span>批次编号</span><span>教师姓名</span><span>实验地点</span><span>实验日期</span><span>节次</span>
	    				<span className="stu_del">删除</span><span className="stu_re">修改</span><span className="stu_s">学生</span>
	    			</li>
	    			{
		    			result.map(function(result){
		    				// var name=ajaxgetitemname(result.itemid);
		    				// var div=document.getElementById(".admin_infor");
		    				// console.log(div[0]);		    				
		    				// if(ajaxgetitemname(result.itemid)!=name)
			    			// 		return <span className="item_name">{ajaxgetitemname(result.itemid)}</span>
		    				i++;
		    				return(
		    					<li key={i}>
		    						<span className="item_name">{ajaxgetitemname(result.itemid)}</span>
		    						<span>{result.batid}</span>
		    						<span>{ajaxgetteaname(result.teaid)}</span>
		    						<span>{result.laboratory}</span>
		    						<span>{result.date}</span>
		    						<span>{result.segmentation}</span>
					    			<span onClick={ (event)=>{event.stopPropagation(),this.deleteclick(result.batid); } } className="stu_delete">删除</span>
					    			<span onClick={ (event)=>{event.stopPropagation(),this.reviseclick(result.batid,result.itemid,result.teaid,result.laboratory,result.date,result.segmentation); } } className="stu_revise">修改</span>
					    			<span onClick={ (event)=>{event.stopPropagation(),this.getstuclick(result.batid); } } className="stu_stu">查看预约学生</span>					    		
		    					</li>
		    				)		    				
		    			}.bind(this))
	    			}
	    		</ul>
 			</div>
 		)
 	}
 });
  //管理员管理-审批项目批次
 var TestOrder=React.createClass({
 	getInitialState: function () {
	    return{
	      result:[]
	    };
  	},
  	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data.data;
 		this.state.result=result;
  	},
  	agree:function(batid){
  		//点击同意跳出窗口询问是否同意
  		//console.log(e.target.textContent);
  		if(confirm("确认同意吗？"))
  		{
  			$.ajax({	
		 		url:"http://yiranblade.cn/lbms/batch/approve/"+batid,
		 		type:"GET",	
		 		dataType:"json",  
		 		success:function(data){
		 			if(data.code=="200")
		 			{
		 				alert("项目已成功添加");
		 				location.reload(true);
		 			}
		 			else{
		 				alert("已拒绝");
		 			}
		 		}
 			});
  		}
  	},
  	disagree:function(batid){
  		if(confirm("确认拒绝吗？"))
  		{
	  		$.ajax({	
		 		url:"http://yiranblade.cn/lbms/teacher/cancel/"+batid,
		 		type:"GET",	
		 		dataType:"json",
		 		success:function(data){
		 			if(data.code=="200")
		 			{ 	
		 				alert("已拒绝");
		 				location.reload(true);
		 			}
		 			else{
		 				alert("出错了");
		 			}
		 		}
	 		});
 		}
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		//console.log(result);
 		var i=-1;
 		return(
 			<div id="TestOrder">
 				<div className="title">
	     		 	审批项目批次
	    		</div>
	    		<h4>这里是待审批的项目批次:</h4>
	    		<ul className="admin_infor">
	    			<li><span className="it_name">实验名称</span><span>批次编号</span><span>教师姓名</span><span>实验地点</span><span>实验日期</span><span>节次</span>
	    				<span className="stu_del">同意</span><span className="stu_re">拒绝</span>
	    			</li>
	    			{
		    			result.map(function(result){
		    				i++;
		    				return(
		    					<li key={i}>		    						
		    						<span className="item_name">{ajaxgetitemname(result.itemid)}</span>
		    						<span>{result.batid}</span>
		    						<span>{ajaxgetteaname(result.teaid)}</span>
		    						<span>{result.laboratory}</span>
		    						<span>{result.date}</span>
		    						<span>{result.segmentation}</span>
					    			<span onClick={ (event)=>{event.stopPropagation(),this.agree(result.batid); } } className="stu_delete">同意</span>
					    			<span onClick={ (event)=>{event.stopPropagation(),this.disagree(result.batid); } } className="stu_revise">拒绝</span>
					    		</li>
		    				)
		    			}.bind(this))
	    			}
	    		</ul>
 			</div>
 		)
 	}
 });
//管理员管理-获取预约该项目批次的学生
 var AdminGetstu=React.createClass({
 	getInitialState: function () {
	    return{
	      result:[]
	    };
  	},
 	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data.data.recordList;
  		//console.log(result);
 		this.state.result=result;
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		console.log(result);
 		var i=-1;
 		return(
 			<div id="AdminGetstu">
 				<div className="title">
	     		 	预约该项目批次的学生
	    		</div>
	    		<ul className="admin_infor">
	    			<li key={i}><span>姓名</span><span>学号</span><span>性别</span><span>年级</span><span>专业</span></li>
	    			{
		    			result.map(function(result){
		    				i++;
		    				var numid=result.numid;
		    				return(
		    					<li key={i}>
		    						<span>{result.name}</span>
		    						<span>{result.username}</span>
		    						<span>{(result.sex)=="0"?"男":"女"}</span>
		    						<span>{result.specialization}</span>
		    						<span>{result.grade}</span>
					    		</li>
		    				)
		    			}.bind(this))
	    			}
	    		</ul>
 			</div>
 		)
 	}
 });

//管理员管理-添加新项目批次
 var AdminAddTestdis=React.createClass({
 	addclick:function(){
 		var teaid;
 		var testdis={
 			itemid:$(".write_name").val(),
	 		teaid:teaid,
	 		laboratory:$(".write_cont").val(),
	 		date:$(".write_date").val(),
	 		segmentation:$(".write_seg").val(),

 		};
 		//console.log(JSON.stringify(testdis));
 		$.ajax({	
	 		url:"http://yiranblade.cn/lbms/batch",
	 		type:"POST",	
	 		dataType:"json", 
	 		"contentType":"application/json",  
	 		data:JSON.stringify(testdis),
	 		success:function(data){
	 			if(data.code=="200")
	 			{
	 				alert("成功添加,信息已保存")
	 			}
	 			else{
	 				alert("保存失败");
	 			}
	 		},
	 		error:function(){
	 			alert("您输入的教师信息不存在");
	 		}
 		});
 	},
 	render:function(){
 		return(
 			<div id="AdminAddTestdis">
 				<div className="title">
	     		 	添加新项目批次
	    		</div>
	    		<ul className="teacher_infor">
	    			<li><span>实验编号 :</span><input type="text" name="write_in" className="write_name" value={this.props.itemid}/></li>
	    			<li><span>实验地点 :</span><input type="text" name="write_in" className="write_cont" /></li>
	    			<li><span>实验日期 :</span><input type="text" name="write_in" className="write_date" /></li>
	    			<li><span>节次 :</span><input type="text" name="write_in" className="write_seg" /></li>
	    		</ul>
	    		<input type="button" name="entering" value="添加" className="entering" onClick={this.addclick}/>
 			</div>
 		)
 	}
 });

 //管理员管理-修改项目批次信息
 var AdminReTestdis=React.createClass({
 	reviseclick:function(){
 		var batch={
 			batid:$(".write_testid").val(),
 			itemid:$(".write_admid").val(),
 			teaid:$(".write_name").val(),
	 		laboratory:$(".write_term").val(),
	 		date:$(".write_cont").val(),
	 		segmentation:$(".write_seg").val()
 		};
 		//console.log(JSON.stringify(batch));
 		$.ajax({	
	 		url:"http://yiranblade.cn/lbms/batch",
	 		type:"PUT",	
	 		dataType:"json", 
	 		"contentType":"application/json",  
	 		data:JSON.stringify(batch),
	 		success:function(data){
	 			if(data.code=="200")
	 			{
	 				alert("信息已更新成功")
	 			}
	 			else{
	 				alert("更新失败");
	 			}
	 		}
 		});
 	},
 	render:function(){
 		return(
 			<div id="AdminReTestdis">
 				<div className="title">
	     		 	修改实验批次信息
	    		</div>
	    		<ul className="teacher_infor">
	    			<li><span>实验批次编号 :</span><input type="text" name="write_in" className="write_testid" value={this.props.batid} /></li>
	    			<li><span>实验编号 :</span><input type="text" name="write_in" className="write_admid" defaultValue={this.props.itemid} /></li>
	    			<li><span>教师工号 :</span><input type="text" name="write_in" className="write_name" defaultValue={this.props.teaid} /></li>
	    			<li><span>实验地点 :</span><input type="text" name="write_in" className="write_term"  defaultValue={this.props.lab}/></li>
	    			<li><span>实验日期 :</span><input type="text" name="write_in" className="write_cont" defaultValue={this.props.date} /></li>
	    			<li><span>节次 :</span><input type="text" name="write_in" className="write_seg" defaultValue={this.props.seg} /></li>
	    		</ul>
	    		<input type="button" name="entering" value="修改" className="entering" onClick={this.reviseclick}/>
 			</div>
 		)
 	}
 });

   //管理员管理-公告管理
 var AdminPublic=React.createClass({
 	getInitialState: function () {
	    return{
	      result:[]
	    };
  	},
  	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data.data.recordList;
 		this.state.result=result;
  	},
  	addclick:function(){
  		//点击添加跳转至添加添加新项目页面
	 	ReactDOM.render(	<AdminAddnotice/>,  document.getElementById("info_admin"));
  	},
  	deleteclick:function(noticeid){
  		//点击删除跳出窗口询问是否删除
  		//console.log(e.target.textContent);
  		if(confirm("确认删除吗？"))
  		{
  			$.ajax({	
		 		url:"http://yiranblade.cn/lbms/notice/"+noticeid,
		 		type:"DELETE",	
		 		dataType:"json",  
		 		success:function(data){
		 			if(data.code=="200")
		 			{
		 				alert("删除成功");
		 				location.reload(true);
		 			}
		 			else{
		 				alert("删除失败");
		 			}
		 		}
 			});
  		}
  	},
  	reviseclick:function(noticeid,content){
  		//点击修改跳转至修改页面
  		ReactDOM.render(	<AdminRenotice noticeid={noticeid} content={content}/>,  document.getElementById("info_admin"));
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		//console.log(result);
 		var i=-1;
 		return(
 			<div id="AdminPublic">
 				<div className="title">
	     		 	公告栏管理
	    		</div>
	    		<h4>这里是全部公告: <span className="stu_add" onClick={this.addclick}>增加</span></h4>
	    		<ul className="admin_infor">
	    			{
		    			result.map(function(result){
		    				i++;
		    				return(
		    					<li key={i}>
		    						{result.noticecontent}
					    			<div>
					    				<span onClick={ (event)=>{event.stopPropagation(),this.deleteclick(result.noticeid); } } className="stu_delete">删除</span>
					    				<span onClick={ (event)=>{event.stopPropagation(),this.reviseclick(result.noticeid,result.noticecontent); } } className="stu_revise">修改</span>
					    			</div>
					    		</li>
		    				)
		    			}.bind(this))
	    			}
	    		</ul>
 			</div>
 		)
 	}
 });

//管理员管理-添加新公告
 var AdminAddnotice=React.createClass({
 	addclick:function(){
 		var notice={
 			noticecontent:$(".write_name").val(),
 		};
 		//console.log(JSON.stringify(notice));
 		$.ajax({	
	 		url:"http://yiranblade.cn/lbms/notice",
	 		type:"POST",	
	 		dataType:"json", 
	 		"contentType":"application/json",  
	 		data:JSON.stringify(notice),
	 		success:function(data){
	 			if(data.code=="200")
	 			{
	 				alert("成功添加,信息已保存")
	 			}
	 			else{
	 				alert("保存失败");
	 			}
	 		}
 		});
 	},
 	render:function(){
 		return(
 			<div id="AdminAddnotice">
 				<div className="title">
	     		 	添加新项目
	    		</div>
	    		<ul className="teacher_infor">
	    			<li><span>公告内容 :</span><input type="text" name="write_in" className="write_name" /></li>
	    		</ul>
	    		<input type="button" name="entering" value="添加" className="entering" onClick={this.addclick}/>
 			</div>
 		)
 	}
 });

 //管理员管理-修改公告信息
 var AdminRenotice=React.createClass({
 	reviseclick:function(){
 		var notice={
 			noticeid:this.props.noticeid,
 			noticetile:"通知",
	 		noticecontent:$(".write_con").val()
 		};
 		//console.log(JSON.stringify(notice));
 		$.ajax({	
	 		url:"http://yiranblade.cn/lbms/notice",
	 		type:"PUT",	
	 		dataType:"json", 
	 		"contentType":"application/json",  
	 		data:JSON.stringify(notice),
	 		success:function(data){
	 			if(data.code=="200")
	 			{
	 				alert("信息已更新成功")
	 			}
	 			else{
	 				alert("更新失败");
	 			}
	 		}
 		});
 	},
 	render:function(){
 		return(
 			<div id="AdminRenotice">
 				<div className="title">
	     		 	修改公告信息
	    		</div>
	    		<ul className="teacher_infor">
	    			<li><span>公告内容 :</span><input type="text" name="write_in" className="write_con" defaultValue={this.props.content} /></li>
	    		</ul>
	    		<input type="button" name="entering" value="修改" className="entering" onClick={this.reviseclick}/>
 			</div>
 		)
 	}
 });
 //管理员管理-个人信息组件
 var PersonInfor=React.createClass({
 	getInitialState: function () {
		    return{
		      result:[]
	    };
  	},
  	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data.data;
 		this.state.result=result;
  	},
  	changeclick:function(){
  		//点击跳转至修改密码页面
  		ReactDOM.render(	<Personpassword/>,  document.getElementById("info_admin"));
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		//console.log(result);
 		var i=-1;
 		return(
 			<div id="PersonInfor">
	 			<div className="title">
	     		 个人信息
	    		</div>
			    <div id="information">
			    	<ul className="teacher_infor">
		    			<li><span>管理工号 :</span><span>{result.username}</span></li>
		    			<li><span>姓名 :</span><span>{result.name}</span></li>
		    			<li><span>性别 :</span><span>{(result.sex)=="0"?"男":"女"}</span></li>
		    			<li><span>联系方式 :</span><span>{result.contact}</span></li>
	    			</ul>
	    			<input type="button" name="entering" value="修改密码" className="entering" onClick={this.changeclick}/>
			    </div>	
		    </div>	
 		)
 	}
 });
  //管理员管理-修改密码
 var Personpassword=React.createClass({
 	getInitialState: function () {
		    return{
		      result:[]
	    };
  	},
  	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data;
 		this.state.result=result;
  	},
  	changeclick:function(){
  		var admin={
  			password:$(".write_password").val(),
  			adId:username,
  		}
  		//console.log(admin);
  		$.ajax({	
			url:"http://yiranblade.cn/lbms/cipher/administrator",
			type:"POST",	
			dataType:"json", 
			data:admin,
			success:function(data){
				if(data.code=="200")
				{
					alert("修改成功 , 信息已保存")
				}
				else{
					alert("修改失败");
				}
			 }
		});
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		//console.log(result);
 		var i=-1;
 		return(
 			<div id="Personpassword">
	 			<div className="title">
	     		 	修改密码
	    		</div>
			    <div id="information">
			    	<ul className="student_infor">
	    			<li><span>新密码 :</span><input type="text" name="write_in" className="write_password" /></li>
	    			</ul>
	    			<input type="button" name="entering" value="修改" className="entering" onClick={this.changeclick}/>
			    </div>	
		    </div>	
 		)
 	}
 });

//点击目录获取相应的界面
 $(".admin_stu").click(function(){
 	$.ajax({	
	 		url:"http://yiranblade.cn/lbms/student/page/1",
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				ReactDOM.render(	<AdminStudent data={data}/>,  document.getElementById("info_admin"));
	 			}
	 			else{
	 				alert("no");
	 			}
	 		}
 		});
})
$(".admin_tea").click(function(){
 	$.ajax({	
	 		url:"http://yiranblade.cn/lbms/teacher/page/1",
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				ReactDOM.render(	<AdminTeacher data={data}/>,  document.getElementById("info_admin"));
	 			}
	 			else{
	 				alert("no");
	 			}
	 		}
 		});
})
$(".admin_admin").click(function(){
 	$.ajax({	
	 		url:"http://yiranblade.cn/lbms/administrator/page/1",
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				ReactDOM.render(	<AdminAdmin data={data}/>,  document.getElementById("info_admin"));
	 			}
	 			else{
	 				alert("no");
	 			}
	 		}
 		});
})
$(".admin_test").click(function(){
 	$.ajax({	
	 		url:"http://yiranblade.cn/lbms/item/page/1",
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				ReactDOM.render(	<AdminTest data={data}/>,  document.getElementById("info_admin"));
	 			}
	 			else{
	 				alert("no");
	 			}
	 		}
 		});
})
$(".admin_public").click(function(){
 	$.ajax({	
	 		url:"http://yiranblade.cn/lbms/notice/page/1",
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				ReactDOM.render(	<AdminPublic data={data}/>,  document.getElementById("info_admin"));
	 			}
	 			else{
	 				alert("no");
	 			}
	 		}
 		});
})
$(".admin_testdis").click(function(){
 	$.ajax({	
	 		url:"http://yiranblade.cn/lbms/batch/page/1",
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				ReactDOM.render(	<AdminTestdis data={data}/>,  document.getElementById("info_admin"));
	 			}
	 			else{
	 				alert("no");
	 			}
	 		}
 		});
})
$(".admin_person").click(function(){
 	$.ajax({	
	 		url:"http://yiranblade.cn/lbms/administrator/"+username,
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				ReactDOM.render(	<PersonInfor data={data}/>,  document.getElementById("info_admin"));
	 			}
	 			else{
	 				alert("no");
	 			}
	 		}
 		});
})
$(".admin_testorder").click(function(){
 	$.ajax({	
	 		url:"http://yiranblade.cn/lbms/batch/needapprove",
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				ReactDOM.render(	<TestOrder data={data}/>,  document.getElementById("info_admin"));
	 			}
	 			else{
	 				alert("no");
	 			}
	 		}
 		});
})


 //教师管理-项目管理
 var TeacherTest=React.createClass({
 	getInitialState: function () {
	    return{
	      result:[]
	    };
  	},
  	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data.data.recordList;
 		this.state.result=result;
  	},
  	checkstu:function(batid){
  		//点击获取该实验批次的学生
  		$.ajax({	
	 		url:"http://yiranblade.cn/lbms/student/"+batid+"/1",
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				ReactDOM.render(	<TeaGetstu data={data} batid={batid}/>,  document.getElementById("info_teacher"));
	 			}
	 			else{
	 				alert("no");
	 			}
	 		}
 		});
  	},
  	cancel:function(batid){
		//点击取消预约
		if(confirm("确认取消预约吗？"))
  		{
	  		$.ajax({	
		 		url:"http://yiranblade.cn/lbms/teacher/cancel/"+batid,
		 		type:"GET",	
		 		dataType:"json",
		 		success:function(data){
		 			if(data.code=="200")
		 			{ 	
		 				alert("已成功取消预约");
		 				location.reload(true);
		 			}
		 			else{
		 				alert("no");
		 			}
		 		}
	 		});
 		}
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		//console.log(result);
 		var i=-1;
 		return(
 			<div id="TeacherTest">
 				<div className="title">
	     		 	项目管理
	    		</div>
	    		<h4>这里是您的实验项目:</h4>
	    		<ul className="teacher_infor">
	    			<li><span>批次编号</span><span className="item_name">实验名称</span><span>教师姓名</span><span>实验地点</span><span>实验日期</span><span>节次</span><span>学生</span><span>取消</span></li>
	    			{
		    			result.map(function(result){
		    				i++;
		    				return(
		    					<li key={i}>
		    						<span>{result.batid}</span>
		    						<span className="item_name">{ajaxgetitemname(result.itemid)}</span>
		    						<span className="tea_name">{ajaxgetteaname(result.teaid)}</span>
		    						<span>{result.laboratory}</span>
		    						<span>{result.date}</span>
		    						<span>{result.segmentation}</span>
		    						<span className="checkstu" onClick={(event)=>{event.stopPropagation(),this.checkstu(result.batid);}}>查看预约学生</span>
		    						<span className="checkstu" onClick={(event)=>{event.stopPropagation(),this.cancel(result.batid);}}>取消</span>
					    		</li>
		    				)
		    			}.bind(this))
	    			}
	    		</ul>
 			</div>
 		)
 	}
 });

//教师管理-获取预约该项目批次的学生
 var TeaGetstu=React.createClass({
 	getInitialState: function () {
	    return{
	      result:[]
	    };
  	},
 	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data.data.recordList;
  		//console.log(result);
 		this.state.result=result;
  	},
  	enterstu:function(batid,numid,grade){
  		//点击跳转至录入成绩界面
  		ReactDOM.render(	<TeacherStuinfo numid={numid} batid={batid} grade={grade}/>,  document.getElementById("info_teacher"));
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		//console.log(result);
 		var i=-1;
 		return(
 			<div id="TeaGetstu">
 				<div className="title">
	     		 	预约该项目批次的学生
	    		</div>
	    		<ul className="admin_infor">
	    			<li key={i}><span>姓名</span><span>学号</span><span>性别</span><span>年级</span><span>专业</span><span>成绩</span></li>
	    			{
		    			result.map(function(result){
		    				i++;
		    				return(
		    					<li key={i}>
		    						<span>{result.name}</span>
		    						<span>{result.username}</span>
		    						<span>{(result.sex)=="0"?"男":"女"}</span>
		    						<span>{result.specialization}</span>
		    						<span>{result.grade}</span>
		    						<span className="enterstu" onClick={(event)=>{event.stopPropagation(),this.enterstu(this.props.batid,result.numid,result.grade);}}>录入成绩</span>
					    		</li>
		    				)
		    			}.bind(this))
	    			}
	    		</ul>
 			</div>
 		)
 	}
 });
 //教师管理-录入学生成绩
 var TeacherStuinfo=React.createClass({
 	addclick:function(){
 		//发送获取成绩请求获取成绩id
 		$.ajax({	
	 		url:"http://yiranblade.cn/lbms/test/"+$(".write_batid").val()+"&"+$(".write_numid").val(),
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				var testid=data.data.testid;
	 				//console.log(testid);
	 				var Stuinfo={
			 			testid:testid,
			 			batid:$(".write_batid").val(),
			 			numid:$(".write_numid").val(),
			 			grade:$(".write_grade").val(),
			 			results:$(".write_results").val()
			 		};
			 		//console.log(JSON.stringify(Stuinfo));
	 				$.ajax({	
				 		url:"http://yiranblade.cn/lbms/test",
				 		type:"PUT",	
				 		dataType:"json", 
				 		"contentType":"application/json",  
				 		data:JSON.stringify(Stuinfo),
				 		success:function(data){
				 			if(data.code=="200")
				 			{
				 				alert("录入添加 , 信息已保存")
				 			}
				 			else{
				 				alert("录入失败");
				 			}
				 		}
			 		});
	 			}
	 			else{
	 				alert("录入失败,原因可能为 该学生没有预约您的实验 或 您的试验中没有此项");
	 			}
	 		},
	 		error:function(){
	 			alert("信息不存在");
	 		}
 		});				
 	},
 	render:function(){
 		return(
 			<div id="TeacherStuinfo">
 				<div className="title">
	     		 	录入学生成绩信息
	    		</div>
	    		<ul className="teacher_infor">
	    			<li><span>批次编号 :</span><input type="text" name="write_in" className="write_batid" value={this.props.batid} /></li>
	    			<li><span>学号 :</span><input type="text" name="write_in" className="write_numid" value={this.props.numid}/></li>
	    			<li><span>班级 :</span><input type="text" name="write_in" className="write_grade" value={this.props.grade} /></li>
	    			<li><span>分数 :</span><input type="text" name="write_in" className="write_results" /></li>
	    		</ul>
	    		<input type="button" name="entering" value="录入" className="entering" onClick={this.addclick}/>
 			</div>
 		)
 	}
 });
  //教师管理-成绩统计
 var TeacherGrade=React.createClass({
 	getInitialState: function () {
	    return{
	      result:[]
	    };
  	},
 	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data.data.recordList;
  		//console.log(result);
 		this.state.result=result;
  	},
  	getstu:function(batid,value,e){
  	//	console.log(value);
  		console.log(e.target.parentNode.className);
  		let li=e.target.parentNode.firstChild.value;//获取父元素的第一个子元素的input值;
  		console.log(li);
  		$.ajax({
		 		url:"http://yiranblade.cn/lbms/test/suminformation/"+li+"/"+batid,
		 		type:"GET",	
		 		dataType:"json", 
		 		async:false,
		 		success:function(data){
		 			if(data.code=="200")
		 			{
		 				console.log(data);
		 				alert("本班级平均分："+data.data.average+"\n最高分："+data.data.high+"\n最低分："+data.data.low);
		 			}
		 			else{
		 				alert("获取失败，有可能是您的信息输入错误");
		 			}
		 		}
	 		});
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 	//	console.log(result);
 		var i=-1;
 		return(
 			<div id="TeacherGrade">
 				<div className="title">
	     		 	成绩统计
	    		</div>
	    		<ul className="admin_infor">
	    			<li key={i}><span>班级</span><span>实验名称</span><span>获取成绩</span></li>
	    			{
		    			result.map(function(result){
		    				i++;
		    				return(
		    					<li key={i} className={i}>
		    						<input type="text" name="write_in" className="inputclass" />
		    						<span>{ajaxgetitemname(result.itemid)}</span>   						
		    						<span className="getgrade" onClick={(event)=>{event.stopPropagation(),this.getstu(result.batid,$(".inputclass").val(),event);}}>获取成绩信息</span>
					    		</li>
		    				)
		    			}.bind(this))
	    			}
	    		</ul>
 			</div>
 		)
 	}
 });

//教师管理-个人信息
 var TeacherTea=React.createClass({
  	getInitialState: function () {
	    return{
	      result:[]
	    };
  	},
  	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data.data;
 		this.state.result=result;
  	},
  	reviseclick:function(noticeid,content){
  		//点击修改跳转至修改页面
  		ReactDOM.render(	<AdminReteainfo noticeid={noticeid} content={content}/>,  document.getElementById("info_admin"));
  	},
  	changeclick:function(){
  		//点击跳转至修改密码页面
  		ReactDOM.render(	<Teacherpassword/>,  document.getElementById("info_teacher"));
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		//console.log(result);
 		return(
 			<div id="TeacherTea">
 				<div className="title">
	     		 	个人信息
	    		</div>
	    		<ul className="teacher_infor">
	    			<li><span>工号 :</span><span>{result.username}</span></li>
	    			<li><span>姓名 :</span><span>{result.name}</span></li>
	    			<li><span>性别 :</span><span>{(result.sex)=="0"?"男":"女"}</span></li>
	    			<li><span>院系 :</span><span>{result.title}</span></li>
	    			<li><span>学位 :</span><span>{result.education}</span></li>
	    			<li><span>联系方式 :</span><span>{result.contact}</span></li>
	    		</ul>
	    		<input type="button" name="entering" value="修改密码" className="entering" onClick={this.changeclick}/>
 			</div>
 		)
 	}
 });

  //教师管理-修改密码
 var Teacherpassword=React.createClass({
 	getInitialState: function () {
		    return{
		      result:[]
	    };
  	},
  	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data;
 		this.state.result=result;
  	},
  	changeclick:function(){
  		var admin={
  			password:$(".write_password").val(),
  			teaId:username,
  		}
  		//console.log(admin);
  		$.ajax({	
			url:"http://yiranblade.cn/lbms/cipher/teacher",
			type:"POST",	
			dataType:"json", 
			data:admin,
			success:function(data){
				if(data.code=="200")
				{
					alert("修改成功 , 信息已保存")
				}
				else{
					alert("修改失败");
				}
			 }
		});
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		//console.log(result);
 		var i=-1;
 		return(
 			<div id="Teacherpassword">
	 			<div className="title">
	     		 	修改密码
	    		</div>
			    <div id="information">
			    	<ul className="student_infor">
	    			<li><span>新密码 :</span><input type="text" name="write_in" className="write_password" /></li>
	    			</ul>
	    			<input type="button" name="entering" value="修改" className="entering" onClick={this.changeclick}/>
			    </div>	
		    </div>	
 		)
 	}
 });
  //教师管理-所有项目批次管理
 var TeaTestdis=React.createClass({
 	getInitialState: function () {
	    return{
	      result:[]
	    };
  	},
  	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data.data.recordList;
 		this.state.result=result;
 	//	console.log(result);
  	},
  	deleteclick:function(batid){
  		//点击预约跳出窗口询问是否预约
  		//console.log(e.target.textContent);
  		if(confirm("确认预约吗？"))
  		{
  			$.ajax({	
		 		url:"http://yiranblade.cn/lbms/teacher/make/"+username+"/"+batid,
		 		type:"GET",	
		 		dataType:"json",  
		 		success:function(data){
		 			if(data.code=="200")
		 			{
		 				alert("预约成功");
		 				location.reload(true);
		 			}
		 			else{
		 				alert("预约失败");
		 			}
		 		}
 			});
  		}
  	},
  	componentDidMount:function(){
  		var ul=this.refs.admin_infor; //获取dom节点
  		lis=ul.childNodes;
  	//	console.log(lis);
  		for(var i=0;i<lis.length-1;i++)
  		{
  			var tag=0; 			
			for(var j=0;j<lis.length;j++)
  			{
  				if(lis[i+1].firstChild.innerHTML==lis[j].firstChild.innerHTML)
  					tag++;
  			}			
			if(tag==1){lis[i+1].lastChild.style.display="none";}
			if(lis[i].firstChild.innerHTML==lis[i+1].firstChild.innerHTML)
  			{
  				lis[i+1].lastChild.style.display="none";
  				lis[i+1].style.display="none";
  			}
  		}
  	},
  	appear:function(e){
  		var tag=0;
		if(e.target.src.indexOf("appear")!=-1)
		{
			var target=e.target.parentNode; //获取当前点击的li
		 	var ul=this.refs.admin_infor; //获取dom节点
		  	lis=ul.childNodes;
		  	e.target.src="build/img/close.png";

			for(var i=0;i<lis.length-1;i++)
			{
				if(target.firstChild.innerHTML==lis[i].firstChild.innerHTML)
				{
					lis[i+1].style.display="block";
				}
			}
		}
		else{
			var target=e.target.parentNode; //获取当前点击的li
		  	var ul=this.refs.admin_infor; //获取dom节点
		  	lis=ul.childNodes;		  	
		  	e.target.src="build/img/appear.png";

	  		for(var i=0;i<lis.length-1;i++)
	  		{
	  			if(target.firstChild.innerHTML==lis[i].firstChild.innerHTML)
	  			{
	  				lis[i+1].style.display="none";
	  				if(target.firstChild.innerHTML!=lis[i+1].firstChild.innerHTML)
	  				{  					
	  					for(var j=0;j<lis.length;j++)
	  					{
	  						if(lis[i+1].firstChild.innerHTML==lis[j].firstChild.innerHTML)
	  							tag++;
	  					}
	  					if(tag==1){lis[i+1].lastChild.style.display="none";}
	  					lis[i+1].style.display="block";
	  				}
	  			}
	  		}
		}
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		var i=-1;
 		return(
 			<div id="TeaTestdis">
 				<div className="title">
	     		 	所有可修改项目批次
	    		</div>
	    		<h4>这里是全部可修改项目批次:</h4>
	    		<ul className="admin_infor" ref="admin_infor">
	    			<li><span className="it_name">实验名称</span><span>批次编号</span><span>实验地点</span><span>实验日期</span><span>节次</span>
	    				<span className="stu_del">预约</span>
	    			</li>
	    			{
		    			result.map(function(result){
		    				i++;
		    				return(
		    					<li key={i}>
		    						<span className="item_name">{ajaxgetitemname(result.itemid)}</span>
		    						<span>{result.batid}</span>
		    						<span>{result.laboratory}</span>
		    						<span>{result.date}</span>
		    						<span>{result.segmentation}</span>
					    			<span onClick={ (event)=>{event.stopPropagation(),this.deleteclick(result.batid); } } className="stu_delete">预约</span>
					    			<img src="build/img/appear.png" id="tu" onClick={ (event)=>{event.stopPropagation(),this.appear(event); } }/>
					    		</li>
		    				)
		    			}.bind(this))
	    			}
	    		</ul>
 			</div>
 		)
 	}
 });
$(".teacher_tea").click(function(){
 	$.ajax({	
	 		url:"http://yiranblade.cn/lbms/teacher/"+username,
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 
	 				ReactDOM.render(	<TeacherTea data={data}/>,  document.getElementById("info_teacher"));
	 			}
	 			else{
	 				alert("no");
	 			}
	 		}
 		});
})
$(".teacher_grade").click(function(){
 	$.ajax({	
	 		url:"http://yiranblade.cn/lbms/batch/teacher/"+username+"&1",
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				ReactDOM.render(	<TeacherGrade data={data}/>,  document.getElementById("info_teacher"));
	 			}
	 			else{
	 				//console.log(data.data);
	 				alert("no");
	 			}
	 		}
 		});
})
  $(".teacher_stuinfo").click(function(){
	ReactDOM.render(	<TeacherStuinfo/>,  document.getElementById("info_teacher"));
})
$(".teacher_test").click(function(){
 	$.ajax({	
	 		url:"http://yiranblade.cn/lbms/batch/teacher/"+username+"&1",
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				ReactDOM.render(	<TeacherTest data={data}/>,  document.getElementById("info_teacher"));
	 			}
	 			else{
	 				//console.log(data.data);
	 				alert("no");
	 			}
	 		}
 		});
})
$(".teacher_testall").click(function(){
 	$.ajax({	
	 		url:"http://yiranblade.cn/lbms/teacher/ordered",
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				//console.log(data);
	 				ReactDOM.render(	<TeaTestdis data={data}/>,  document.getElementById("info_teacher"));
	 			}
	 			else{
	 				alert("no");
	 			}
	 		}
 		});
})

 var Classinfo=React.createClass({
 	render:function(){
 		return(
 			<div id="Classinfor">
 				<section id="classinfor" style={{marginTop:10+"px"}}>
		        <div className="classinfor_info">
		            <h3><span>代课教师：哈哈</span> <span>容纳人数：30</span></h3>
		            <h4>研究方向：嵌入式单片机</h4>
		            <p>复旦大学应用表面物理国家重点实验室是由我国著名物理学家谢希德先生亲自倡导建立的实验室,于1989年底通过国家计委组织的专家论证,1990年开始筹建,1992年12...复旦大学应用表面物理国家重点实验室是由我国著名物理学家谢希德先生亲自倡导建立的实验室,于1989年底通过国家计委组织的专家论证,1990年开始筹建,1992年12...复旦大学应用表面物理国家重点实验室是由我国著名物理学家谢希德先生亲自倡导建立的实验室,于1989年底通过国家计委组织的专家论证,1990年开始筹建,1992年12...</p>
		        </div>
		        <div className="classinfor_info">
		            <h3><span>代课教师：哈哈</span> <span>容纳人数：30</span></h3>
		            <h4>研究方向：嵌入式单片机</h4>
		            <p>复旦大学应用表面物理国家重点实验室是由我国著名物理学家谢希德先生亲自倡导建立的实验室,于1989年底通过国家计委组织的专家论证,1990年开始筹建,1992年12...复旦大学应用表面物理国家重点实验室是由我国著名物理学家谢希德先生亲自倡导建立的实验室,于1989年底通过国家计委组织的专家论证,1990年开始筹建,1992年12...复旦大学应用表面物理国家重点实验室是由我国著名物理学家谢希德先生亲自倡导建立的实验室,于1989年底通过国家计委组织的专家论证,1990年开始筹建,1992年12...</p>
		        </div>
		        <div className="classinfor_info">
		            <h3><span>代课教师：哈哈</span> <span>容纳人数：30</span></h3>
		            <h4>研究方向：嵌入式单片机</h4>
		            <p>复旦大学应用表面物理国家重点实验室是由我国著名物理学家谢希德先生亲自倡导建立的实验室,于1989年底通过国家计委组织的专家论证,1990年开始筹建,1992年12...复旦大学应用表面物理国家重点实验室是由我国著名物理学家谢希德先生亲自倡导建立的实验室,于1989年底通过国家计委组织的专家论证,1990年开始筹建,1992年12...复旦大学应用表面物理国家重点实验室是由我国著名物理学家谢希德先生亲自倡导建立的实验室,于1989年底通过国家计委组织的专家论证,1990年开始筹建,1992年12...</p>
		        </div>
		        <div className="classinfor_info">
		            <h3><span>代课教师：哈哈</span> <span>容纳人数：30</span></h3>
		            <h4>研究方向：嵌入式单片机</h4>
		            <p>复旦大学应用表面物理国家重点实验室是由我国著名物理学家谢希德先生亲自倡导建立的实验室,于1989年底通过国家计委组织的专家论证,1990年开始筹建,1992年12...复旦大学应用表面物理国家重点实验室是由我国著名物理学家谢希德先生亲自倡导建立的实验室,于1989年底通过国家计委组织的专家论证,1990年开始筹建,1992年12...复旦大学应用表面物理国家重点实验室是由我国著名物理学家谢希德先生亲自倡导建立的实验室,于1989年底通过国家计委组织的专家论证,1990年开始筹建,1992年12...</p>
		        </div>
		    	</section>
		 	</div>
		)
 	}
 });
//实验室信息
$(".teacher_class").click(function(){
	ReactDOM.render(	<Classinfo />,  document.getElementById("info_teacher"));
})
$(".stuent_class").click(function(){
	ReactDOM.render(	<Classinfo />,  document.getElementById("info_student"));
})
})();