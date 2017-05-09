;(function () {
	//登陆函数
	var username;
	$("body").on("click", "#login", function () {
		var login = {
			userName: $(".username").val(),
			password: $(".password").val()
		};
		username = $(".username").val();
		$.ajax({
			url: "http://yiranblade.cn/lbms/login",
			type: "POST",
			dataType: "json",
			data: login,
			success: function (data) {
				if (data.code == "200") {
					//console.log($(".identity input:checked").val());
					$.ajax({
						url: "http://yiranblade.cn/lbms/login/" + username,
						type: "GET",
						dataType: "json",
						success: function (data) {
							if (data.code == "200") {
								//console.log(data);
								if (data.data.power == "admin" && $(".identity input:checked").val() == "管理员") {
									self.location = "admin.html?id=" + data.data.userId;
								} else if (data.data.power == "student" && $(".identity input:checked").val() == "学生") {
									self.location = "student.html?id=" + data.data.userId;
								} else if (data.data.power == "teacher" && $(".identity input:checked").val() == "教师") {
									self.location = "teacher.html?id=" + data.data.userId;
								} else alert("用户信息和身份并不匹配哦");
							} else {
								alert("错误发生了");
							}
						}
					});
				}
				if (data.code == "400") {
					alert("信息格式错误");
				}
				if (data.code == "501") {
					alert("客观慢点呦-您的请求过于频繁");
				}
				if (data.code == "500") {
					alert("用户名或密码输入错误");
				}
				if (data.code == "502") {
					alert("用户名或密码输入错误");
				}
			},
			error: function () {
				alert("请求未发送出去");
			}
		});
	});
	//获取调转页面后传入的参数
	var url = location.search;
	if (url.indexOf("?") != -1) {
		var begin = url.indexOf("=");
		username = url.substr(begin + 1, 8);
	}
	//通过实验id获取实验名称
	function ajaxgetitemname(itemid) {
		var itemname;
		$.ajax({
			url: "http://yiranblade.cn/lbms/item/" + itemid,
			type: "GET",
			async: false,
			dataType: "json",
			success: function (data) {
				if (data.code == "200") {
					//console.log(data.data.itemname);
					itemname = data.data.itemname;
				} else {
					alert("错误发生了");
				}
			}
		});
		return itemname;
	}
	//通过教师id获取教师姓名
	function ajaxgetteaname(teaid) {
		var teaname;
		if (teaid == null) return false;
		$.ajax({
			url: "http://yiranblade.cn/lbms/teacher/" + teaid,
			type: "GET",
			async: false,
			dataType: "json",
			success: function (data) {
				if (data.code == "200") {
					//console.log(data.data.itemname);
					teaname = data.data.name;
				} else {
					alert("错误发生了");
				}
			}
		});
		return teaname;
	}

	//学生管理模块
	//学生管理-个人信息组件
	var PersonInformation = React.createClass({
		displayName: "PersonInformation",

		getInitialState: function () {
			return {
				result: []
			};
		},
		ajaxchange: function (data) {
			//ajax转化 将data中部分信息提取出来渲染到页面中
			var result = data.data;
			this.state.result = result;
		},
		changeclick: function () {
			//点击跳转至修改密码页面
			ReactDOM.render(React.createElement(Studentpassword, null), document.getElementById("info_student"));
		},
		render: function () {
			this.ajaxchange(this.props.data);
			var result = this.state.result;
			//console.log(result);
			var i = -1;
			return React.createElement(
				"div",
				{ id: "PersonInformation" },
				React.createElement(
					"div",
					{ className: "title" },
					"\u4E2A\u4EBA\u4FE1\u606F"
				),
				React.createElement(
					"div",
					{ id: "information" },
					React.createElement(
						"ul",
						{ className: "teacher_infor" },
						React.createElement(
							"li",
							null,
							React.createElement(
								"span",
								null,
								"\u5B66\u53F7 :"
							),
							React.createElement(
								"span",
								null,
								result.username
							)
						),
						React.createElement(
							"li",
							null,
							React.createElement(
								"span",
								null,
								"\u59D3\u540D :"
							),
							React.createElement(
								"span",
								null,
								result.name
							)
						),
						React.createElement(
							"li",
							null,
							React.createElement(
								"span",
								null,
								"\u6027\u522B :"
							),
							React.createElement(
								"span",
								null,
								result.sex == "0" ? "男" : "女"
							)
						),
						React.createElement(
							"li",
							null,
							React.createElement(
								"span",
								null,
								"\u4E13\u4E1A :"
							),
							React.createElement(
								"span",
								null,
								result.specialization
							)
						),
						React.createElement(
							"li",
							null,
							React.createElement(
								"span",
								null,
								"\u5E74\u7EA7 :"
							),
							React.createElement(
								"span",
								null,
								result.grade
							)
						),
						React.createElement(
							"li",
							null,
							React.createElement(
								"span",
								null,
								"\u8054\u7CFB\u65B9\u5F0F :"
							),
							React.createElement(
								"span",
								null,
								result.contact
							)
						)
					),
					React.createElement("input", { type: "button", name: "entering", value: "\u4FEE\u6539\u5BC6\u7801", className: "entering", onClick: this.changeclick })
				)
			);
		}
	});
	//学生管理-修改密码
	var Studentpassword = React.createClass({
		displayName: "Studentpassword",

		getInitialState: function () {
			return {
				result: []
			};
		},
		ajaxchange: function (data) {
			//ajax转化 将data中部分信息提取出来渲染到页面中
			var result = data;
			this.state.result = result;
		},
		changeclick: function () {
			var admin = {
				password: $(".write_password").val(),
				numId: username
			};
			//console.log(admin);
			$.ajax({
				url: "http://yiranblade.cn/lbms/cipher/student",
				type: "POST",
				dataType: "json",
				data: admin,
				success: function (data) {
					if (data.code == "200") {
						alert("修改成功 , 信息已保存");
					} else {
						alert("修改失败");
					}
				}
			});
		},
		render: function () {
			this.ajaxchange(this.props.data);
			var result = this.state.result;
			//console.log(result);
			var i = -1;
			return React.createElement(
				"div",
				{ id: "Studentpassword" },
				React.createElement(
					"div",
					{ className: "title" },
					"\u4FEE\u6539\u5BC6\u7801"
				),
				React.createElement(
					"div",
					{ id: "information" },
					React.createElement(
						"ul",
						{ className: "student_infor" },
						React.createElement(
							"li",
							null,
							React.createElement(
								"span",
								null,
								"\u65B0\u5BC6\u7801 :"
							),
							React.createElement("input", { type: "text", name: "write_in", className: "write_password" })
						)
					),
					React.createElement("input", { type: "button", name: "entering", value: "\u4FEE\u6539", className: "entering", onClick: this.changeclick })
				)
			);
		}
	});
	//学生管理-查看公告
	var PublicInformation = React.createClass({
		displayName: "PublicInformation",

		handleClick: function (e) {
			if (e.target.textContent == "阅读全文") {
				e.target.parentNode.className = "whole";
				e.target.textContent = "收起";
			} else {
				e.target.parentNode.className = "half";
				e.target.textContent = "阅读全文";
			}
		},
		getInitialState: function () {
			return {
				result: []
			};
		},
		ajaxchange: function (data) {
			//ajax转化 将data中部分信息提取出来渲染到页面中
			var result = data.data.recordList;
			this.state.result = result;
		},
		render: function () {
			this.ajaxchange(this.props.data);
			var result = this.state.result;
			//console.log(result);
			var i = -1;
			return React.createElement(
				"div",
				{ id: "PublicInformation" },
				React.createElement(
					"div",
					{ className: "title" },
					"\u67E5\u770B\u516C\u544A"
				),
				React.createElement(
					"ul",
					null,
					result.map(function (result) {
						i++;
						return React.createElement(
							"li",
							{ key: i, className: "half" },
							result.noticecontent,
							React.createElement(
								"span",
								{ className: "deploy", onClick: this.handleClick },
								"\u9605\u8BFB\u5168\u6587"
							)
						);
					}.bind(this))
				)
			);
		}
	});

	//学生管理-查看已确认实验
	var OrderTestok = React.createClass({
		displayName: "OrderTestok",

		getInitialState: function () {
			return {
				result: []
			};
		},
		ajaxchange: function (data) {
			//ajax转化 将data中部分信息提取出来渲染到页面中
			var result = data.data;
			this.state.result = result;
		},
		getgrade: function (batid) {
			//console.log(batid);
			//点击获取成绩
			$.ajax({
				url: "http://yiranblade.cn/lbms/test/" + batid + "&" + username,
				type: "GET",
				dataType: "json",
				success: function (data) {
					if (data.code == "200") {
						if (data.data.results != null) alert(data.data.results);else alert("成绩还未录入,请耐心等待");
					} else {
						alert("成绩还未录入,请耐心等待");
					}
				},
				error: function () {
					alert("成绩还未录入,请耐心等待");
				}
			});
		},
		render: function () {
			this.ajaxchange(this.props.data);
			var result = this.state.result;
			//console.log(result);
			var i = -1;
			return React.createElement(
				"div",
				{ id: "OrderTestok" },
				React.createElement(
					"div",
					{ className: "title" },
					"\u67E5\u770B\u5DF2\u786E\u8BA4\u5B9E\u9A8C"
				),
				React.createElement(
					"ul",
					{ className: "student_infor" },
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u6279\u6B21\u7F16\u53F7"
						),
						React.createElement(
							"span",
							{ className: "stu_item" },
							"\u5B9E\u9A8C\u540D\u79F0"
						),
						React.createElement(
							"span",
							null,
							"\u6559\u5E08\u59D3\u540D"
						),
						React.createElement(
							"span",
							null,
							"\u5B9E\u9A8C\u5730\u70B9"
						),
						React.createElement(
							"span",
							null,
							"\u5B9E\u9A8C\u65E5\u671F"
						),
						React.createElement(
							"span",
							null,
							"\u8282\u6B21"
						),
						React.createElement(
							"span",
							null,
							"\u6210\u7EE9"
						)
					),
					result.map(function (result) {
						i++;
						return React.createElement(
							"li",
							{ key: i },
							React.createElement(
								"span",
								null,
								result.batid
							),
							React.createElement(
								"span",
								{ className: "stu_item" },
								ajaxgetitemname(result.itemid)
							),
							React.createElement(
								"span",
								null,
								ajaxgetteaname(result.teaid)
							),
							React.createElement(
								"span",
								null,
								result.laboratory
							),
							React.createElement(
								"span",
								null,
								result.date
							),
							React.createElement(
								"span",
								null,
								result.segmentation
							),
							React.createElement(
								"span",
								{ className: "getgrade", onClick: event => {
										event.stopPropagation(), this.getgrade(result.batid);
									} },
								"\u83B7\u53D6\u6210\u7EE9"
							)
						);
					}.bind(this))
				)
			);
		}
	});
	//学生管理-确认实验
	var OrderTest = React.createClass({
		displayName: "OrderTest",

		getInitialState: function () {
			return {
				result: []
			};
		},
		ajaxchange: function (data) {
			//ajax转化 将data中部分信息提取出来渲染到页面中
			var result = data.data;
			this.state.result = result;
		},
		orderclick: function (batid, okid) {
			//预约实验不能同时预约同一项实验
			var test = {
				batid: batid,
				numid: username
			};
			var j = 0;
			//console.log(JSON.stringify(test));
			//获取到该学生已经预约的实验id
			$.ajax({
				url: "http://yiranblade.cn/lbms/batch/student/" + username,
				type: "GET",
				dataType: "json",
				success: function (data) {
					if (data.code == "200") {
						for (var i = 0; i < data.data.length; i++) {
							//console.log(data.data[i].itemid);
							//判断此时预约的实验id是否存在，若存在则不能继续预约
							if (data.data[i].itemid == okid) j = 1;
						}
						if (j == 0) {
							//不存在则发送请求，预约成功
							$.ajax({
								url: "http://yiranblade.cn/lbms/batch/student/" + batid + "&" + username,
								type: "PUT",
								dataType: "json",
								"contentType": "application/json",
								data: JSON.stringify(test),
								success: function (data) {
									if (data.code == "200") {
										alert("确认成功");
									} else {
										alert("确认失败");
									}
								},
								error: function () {
									alert("批次编号信息不存在");
								}
							});
						} else {
							alert("你不能同时确认同一项实验哦");
						}
					} else {
						alert("no");
					}
				}
			});
		},
		render: function () {
			this.ajaxchange(this.props.data);
			var result = this.state.result;
			//console.log(result);
			var i = -1;
			return React.createElement(
				"div",
				{ id: "OrderTest" },
				React.createElement(
					"div",
					{ className: "title" },
					"\u786E\u8BA4\u5B9E\u9A8C"
				),
				React.createElement(
					"h4",
					null,
					"\u8FD9\u91CC\u662F\u5168\u90E8\u9879\u76EE\u6279\u6B21:"
				),
				React.createElement(
					"ul",
					{ className: "admin_infor", id: "posit" },
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u6279\u6B21\u7F16\u53F7"
						),
						React.createElement(
							"span",
							{ className: "it_name" },
							"\u5B9E\u9A8C\u540D\u79F0"
						),
						React.createElement(
							"span",
							null,
							"\u6559\u5E08\u59D3\u540D"
						),
						React.createElement(
							"span",
							null,
							"\u5B9E\u9A8C\u5730\u70B9"
						),
						React.createElement(
							"span",
							null,
							"\u5B9E\u9A8C\u65E5\u671F"
						),
						React.createElement(
							"span",
							null,
							"\u8282\u6B21"
						),
						React.createElement(
							"span",
							{ className: "stu_del" },
							"\u786E\u8BA4"
						)
					),
					result.map(function (result) {
						i++;
						return React.createElement(
							"li",
							{ key: i },
							React.createElement(
								"span",
								null,
								result.batid
							),
							React.createElement(
								"span",
								{ className: "item_name" },
								ajaxgetitemname(result.itemid)
							),
							React.createElement(
								"span",
								null,
								ajaxgetteaname(result.teaid)
							),
							React.createElement(
								"span",
								null,
								result.laboratory
							),
							React.createElement(
								"span",
								null,
								result.date
							),
							React.createElement(
								"span",
								null,
								result.segmentation
							),
							React.createElement(
								"span",
								{ onClick: event => {
										event.stopPropagation(), this.orderclick(result.batid, result.itemid);
									}, className: "stu_delete" },
								"\u9884\u7EA6"
							)
						);
					}.bind(this))
				)
			);
		}
	});

	$(".stuent_infor").click(function () {
		$.ajax({
			url: "http://yiranblade.cn/lbms/student/" + username,
			type: "GET",
			dataType: "json",
			success: function (data) {
				if (data.code == "200") {
					ReactDOM.render(React.createElement(PersonInformation, { data: data }), document.getElementById("info_student"));
				} else {
					alert("no");
				}
			}
		});
	});

	$(".stuent_public").click(function () {
		$.ajax({
			url: "http://yiranblade.cn/lbms/notice/page/1",
			type: "GET",
			dataType: "json",
			success: function (data) {
				if (data.code == "200") {
					ReactDOM.render(React.createElement(PublicInformation, { data: data }), document.getElementById("info_student"));
				} else {
					alert("no");
				}
			}
		});
	});
	$(".stuent_test").click(function () {
		$.ajax({
			url: "http://yiranblade.cn/lbms/batch/student/" + username,
			type: "GET",
			dataType: "json",
			success: function (data) {
				if (data.code == "200") {
					ReactDOM.render(React.createElement(OrderTestok, { data: data }), document.getElementById("info_student"));
				} else {
					alert("no");
				}
			}
		});
	});
	$(".stuent_score").click(function () {
		ReactDOM.render(React.createElement(PersonScore, null), document.getElementById("info_student"));
	});
	$(".stuent_order").click(function () {
		$.ajax({
			url: "http://yiranblade.cn/lbms/batch/teacherorder",
			type: "GET",
			dataType: "json",
			success: function (data) {
				if (data.code == "200") {
					ReactDOM.render(React.createElement(OrderTest, { data: data }), document.getElementById("info_student"));
				} else {
					alert("no");
				}
			}
		});
	});

	//管理员管理模块

	//管理员管理-学生管理
	var AdminStudent = React.createClass({
		displayName: "AdminStudent",

		getInitialState: function () {
			return {
				result: []
			};
		},
		ajaxchange: function (data) {
			//ajax转化 将data中部分信息提取出来渲染到页面中
			var result = data.data.recordList;
			this.state.result = result;
		},
		addclick: function () {
			//点击添加跳转至添加添加新学生页面
			ReactDOM.render(React.createElement(AdminAddstudent, null), document.getElementById("info_admin"));
		},
		deleteclick: function (numid) {
			//点击删除跳出窗口询问是否删除
			//console.log(e.target.textContent);
			if (confirm("确认删除吗？")) {
				$.ajax({
					url: "http://yiranblade.cn/lbms/student/" + numid,
					type: "DELETE",
					dataType: "json",
					success: function (data) {
						if (data.code == "200") {
							alert("删除成功");
							location.reload(true);
						} else {
							alert("删除失败");
						}
					}
				});
			}
		},
		reviseclick: function (grade, name, sex, sep, con, numid, username) {
			//点击修改跳转至修改页面
			ReactDOM.render(React.createElement(AdminRestudent, { grade: grade, name: name, sex: sex, sep: sep, con: con, numid: numid, username: username }), document.getElementById("info_admin"));
		},
		componentDidMount: function () {
			window.addEventListener('keydown', this.handleKeyDown);
		},
		handleKeyDown: function (e) {
			//搜索
			if (e.keyCode == 13 && $(".admin_search input").val() != "") {
				var special = $(".admin_search input").val();
				$.ajax({
					url: "http://yiranblade.cn/lbms/student/page/special/" + special + "&1",
					type: "GET",
					dataType: "json",
					success: function (data) {
						if (data.code == "200") {
							ReactDOM.render(React.createElement(SearchInformation, { data: data }), this.refs.admin_infor);
						} else {
							alert("no");
						}
					}
				});
			}
		},
		addfile: function () {
			var formData = new FormData($("#uploadForm")[0]);
			console.log(formData);
			$.ajax({
				url: "http://yiranblade.cn/lbms/student/multitude",
				type: "POST",
				dataType: "json",
				processData: false,
				"contentType": false,
				data: formData,
				success: function (data) {
					if (data.code == "200") {
						alert("成功添加");
					} else {
						alert("添加失败");
					}
				}
			});
		},
		render: function () {
			this.ajaxchange(this.props.data);
			var result = this.state.result;
			//console.log(result);
			var i = -1;
			return React.createElement(
				"div",
				{ id: "AdminStudent" },
				React.createElement(
					"div",
					{ className: "title" },
					"\u5B66\u751F\u7BA1\u7406"
				),
				React.createElement(
					"h4",
					null,
					"\u8FD9\u91CC\u662F\u5168\u90E8\u5B66\u751F:",
					React.createElement(
						"span",
						{ className: "stu_add", onClick: this.addclick },
						"\u589E\u52A0"
					),
					React.createElement(
						"form",
						{ id: "uploadForm" },
						React.createElement("input", { className: "addfile", type: "file", id: "student", name: "student" }),
						"\u3000\u3000\u3000     ",
						React.createElement("input", { className: "addfilea", type: "button", value: "\u89E3\u6790\u5E76\u6DFB\u52A0", onClick: this.addfile })
					)
				),
				React.createElement(
					"ul",
					{ className: "admin_infor", ref: "admin_infor" },
					React.createElement(
						"li",
						{ key: i },
						React.createElement(
							"span",
							null,
							"\u59D3\u540D"
						),
						React.createElement(
							"span",
							null,
							"\u5B66\u53F7"
						),
						React.createElement(
							"span",
							null,
							"\u6027\u522B"
						),
						React.createElement(
							"span",
							null,
							"\u4E13\u4E1A"
						),
						React.createElement(
							"span",
							null,
							"\u5220\u9664"
						),
						React.createElement(
							"span",
							null,
							"\u4FEE\u6539"
						)
					),
					result.map(function (result) {
						i++;
						var numid = result.numid;
						return React.createElement(
							"li",
							{ key: i },
							React.createElement(
								"span",
								null,
								result.name
							),
							React.createElement(
								"span",
								null,
								result.username
							),
							React.createElement(
								"span",
								null,
								result.sex == "0" ? "男" : "女"
							),
							React.createElement(
								"span",
								null,
								result.grade
							),
							React.createElement(
								"span",
								{ onClick: event => {
										event.stopPropagation(), this.deleteclick(result.numid);
									}, className: "stu_delete" },
								"\u5220\u9664"
							),
							React.createElement(
								"span",
								{ onClick: event => {
										event.stopPropagation(), this.reviseclick(result.grade, result.name, result.sex, result.specialization, result.contact, result.numid, result.username);
									}, className: "stu_revise" },
								"\u4FEE\u6539"
							)
						);
					}.bind(this))
				)
			);
		}
	});
	//管理员管理-搜索学生
	var SearchInformation = React.createClass({
		displayName: "SearchInformation",

		getInitialState: function () {
			return {
				result: []
			};
		},
		ajaxchange: function (data) {
			//ajax转化 将data中部分信息提取出来渲染到页面中
			var result = data.data.recordList;
			this.state.result = result;
		},
		render: function () {
			this.ajaxchange(this.props.data);
			var result = this.state.result;
			//console.log(result);
			var i = -1;
			return React.createElement(
				"ul",
				{ className: "SearchInformation" },
				React.createElement(
					"li",
					{ key: i },
					React.createElement(
						"span",
						null,
						"\u59D3\u540D"
					),
					React.createElement(
						"span",
						null,
						"\u5B66\u53F7"
					),
					React.createElement(
						"span",
						null,
						"\u6027\u522B"
					),
					React.createElement(
						"span",
						null,
						"\u4E13\u4E1A"
					),
					React.createElement(
						"span",
						null,
						"\u5220\u9664"
					),
					React.createElement(
						"span",
						null,
						"\u4FEE\u6539"
					)
				),
				result.map(function (result) {
					i++;
					var numid = result.numid;
					return React.createElement(
						"li",
						{ key: i },
						React.createElement(
							"span",
							null,
							result.name
						),
						React.createElement(
							"span",
							null,
							result.username
						),
						React.createElement(
							"span",
							null,
							result.sex == "0" ? "男" : "女"
						),
						React.createElement(
							"span",
							null,
							result.specialization
						),
						React.createElement(
							"span",
							{ onClick: event => {
									event.stopPropagation(), this.deleteclick(result.numid);
								}, className: "stu_delete" },
							"\u5220\u9664"
						),
						React.createElement(
							"span",
							{ onClick: event => {
									event.stopPropagation(), this.reviseclick(result.grade, result.name, result.sex, result.specialization, result.contact, result.numid, result.username);
								}, className: "stu_revise" },
							"\u4FEE\u6539"
						)
					);
				}.bind(this))
			);
		}
	});
	//管理员管理-添加新学生
	var AdminAddstudent = React.createClass({
		displayName: "AdminAddstudent",

		addclick: function () {
			if ($(".write_sex").val() == "男") var sex = "0";else var sex = "1";

			var student = {
				name: $(".write_name").val(),
				sex: sex,
				specialization: $(".write_spec").val(),
				grade: $(".write_grade").val(),
				contact: $(".write_cont").val(),
				username: $(".write_username").val()
			};
			//console.log(JSON.stringify(student));
			$.ajax({
				url: "http://yiranblade.cn/lbms/student",
				type: "POST",
				dataType: "json",
				"contentType": "application/json",
				data: JSON.stringify(student),
				success: function (data) {
					if (data.code == "200") {
						//console.log(data);
						alert("新增管理员用户名为 " + $(".write_username").val() + "\n默认密码为11111111" + "\n信息已成功保存");
					} else {
						alert("保存失败");
					}
				}
			});
		},
		render: function () {
			return React.createElement(
				"div",
				{ id: "AdminAddstudent" },
				React.createElement(
					"div",
					{ className: "title" },
					"\u6DFB\u52A0\u65B0\u5B66\u751F"
				),
				React.createElement(
					"ul",
					{ className: "teacher_infor" },
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u59D3\u540D :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_name" })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u6027\u522B :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_sex" })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u5B66\u53F7:"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_username" })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u4E13\u4E1A :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_grade" })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u5E74\u7EA7 :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_spec" })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u8054\u7CFB\u65B9\u5F0F :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_cont" })
					)
				),
				React.createElement("input", { type: "button", name: "entering", value: "\u6DFB\u52A0", className: "entering", onClick: this.addclick })
			);
		}
	});

	//管理员管理-修改学生信息
	var AdminRestudent = React.createClass({
		displayName: "AdminRestudent",

		reviseclick: function () {
			if ($(".write_sex").val() == "男") var sex = "0";else var sex = "1";

			var student = {
				numid: this.props.numid,
				name: $(".write_name").val(),
				sex: sex,
				specialization: $(".write_spec").val(),
				grade: $(".write_grade").val(),
				contact: $(".write_cont").val()
			};
			//console.log(JSON.stringify(student));
			$.ajax({
				url: "http://yiranblade.cn/lbms/student",
				type: "PUT",
				dataType: "json",
				"contentType": "application/json",
				data: JSON.stringify(student),
				success: function (data) {
					if (data.code == "200") {
						alert("信息已更新成功");
					} else {
						alert("更新失败");
					}
				}
			});
		},
		render: function () {
			return React.createElement(
				"div",
				{ id: "AdminRestudent" },
				React.createElement(
					"div",
					{ className: "title" },
					"\u4FEE\u6539\u5B66\u751F\u4FE1\u606F"
				),
				React.createElement(
					"ul",
					{ className: "teacher_infor" },
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u5B66\u53F7 :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_numid", value: this.props.username })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u59D3\u540D :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_name", defaultValue: this.props.name })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u6027\u522B :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_sex", defaultValue: this.props.sex == "0" ? "男" : "女" })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u4E13\u4E1A :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_grade", defaultValue: this.props.grade })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u5E74\u7EA7 :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_spec", defaultValue: this.props.sep })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u8054\u7CFB\u65B9\u5F0F :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_cont", defaultValue: this.props.con })
					)
				),
				React.createElement("input", { type: "button", name: "entering", value: "\u4FEE\u6539", className: "entering", onClick: this.reviseclick })
			);
		}
	});

	//管理员管理-教师管理
	var AdminTeacher = React.createClass({
		displayName: "AdminTeacher",

		getInitialState: function () {
			return {
				result: []
			};
		},
		ajaxchange: function (data) {
			//ajax转化 将data中部分信息提取出来渲染到页面中
			var result = data.data.recordList;
			this.state.result = result;
		},
		addclick: function () {
			//点击添加跳转至添加添加新教师页面
			ReactDOM.render(React.createElement(AdminAddteacher, null), document.getElementById("info_admin"));
		},
		deleteclick: function (teaid) {
			//点击删除跳出窗口询问是否删除
			//console.log(e.target.textContent);
			if (confirm("确认删除吗？")) {
				$.ajax({
					url: "http://yiranblade.cn/lbms/teacher/" + teaid,
					type: "DELETE",
					dataType: "json",
					success: function (data) {
						if (data.code == "200") {
							alert("删除成功");
							location.reload(true);
						} else {
							alert("删除失败");
						}
					}
				});
			}
		},
		reviseclick: function (title, name, sex, edu, con, teaid, username) {
			//点击修改跳转至修改页面
			ReactDOM.render(React.createElement(AdminReteacher, { title: title, name: name, sex: sex, edu: edu, con: con, teaid: teaid, username: username }), document.getElementById("info_admin"));
		},
		render: function () {
			this.ajaxchange(this.props.data);
			var result = this.state.result;
			//console.log(result);
			var i = -1;
			return React.createElement(
				"div",
				{ id: "AdminTeacher" },
				React.createElement(
					"div",
					{ className: "title" },
					"\u6559\u5E08\u7BA1\u7406"
				),
				React.createElement(
					"h4",
					null,
					"\u8FD9\u91CC\u662F\u5168\u90E8\u6559\u5E08: ",
					React.createElement(
						"span",
						{ className: "stu_add", onClick: this.addclick },
						"\u589E\u52A0"
					)
				),
				React.createElement(
					"ul",
					{ className: "admin_infor" },
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u59D3\u540D"
						),
						React.createElement(
							"span",
							null,
							"\u6027\u522B"
						),
						React.createElement(
							"span",
							null,
							"\u9662\u7CFB"
						),
						React.createElement(
							"span",
							null,
							"\u5DE5\u53F7"
						),
						React.createElement(
							"span",
							null,
							"\u5B66\u5386"
						),
						React.createElement(
							"span",
							null,
							"\u5220\u9664"
						),
						React.createElement(
							"span",
							null,
							"\u4FEE\u6539"
						)
					),
					result.map(function (result) {
						i++;
						return React.createElement(
							"li",
							{ key: i },
							React.createElement(
								"span",
								null,
								result.name
							),
							React.createElement(
								"span",
								null,
								result.sex == "0" ? "男" : "女"
							),
							React.createElement(
								"span",
								null,
								result.title
							),
							React.createElement(
								"span",
								null,
								result.username
							),
							React.createElement(
								"span",
								null,
								result.education
							),
							React.createElement(
								"span",
								{ onClick: event => {
										event.stopPropagation(), this.deleteclick(result.teaid);
									}, className: "stu_delete" },
								"\u5220\u9664"
							),
							React.createElement(
								"span",
								{ onClick: event => {
										event.stopPropagation(), this.reviseclick(result.title, result.name, result.sex, result.education, result.contact, result.teaid, result.username);
									}, className: "stu_revise" },
								"\u4FEE\u6539"
							)
						);
					}.bind(this))
				)
			);
		}
	});
	//管理员管理-添加新教师
	var AdminAddteacher = React.createClass({
		displayName: "AdminAddteacher",

		addclick: function () {
			if ($(".write_sex").val() == "男") var sex = "0";else var sex = "1";

			var teacher = {
				name: $(".write_name").val(),
				sex: sex,
				title: $(".write_title").val(),
				education: $(".write_edu").val(),
				contact: $(".write_cont").val(),
				username: $(".write_username").val()
			};
			//console.log(JSON.stringify(teacher));
			$.ajax({
				url: "http://yiranblade.cn/lbms/teacher",
				type: "POST",
				dataType: "json",
				"contentType": "application/json",
				data: JSON.stringify(teacher),
				success: function (data) {
					if (data.code == "200") {
						alert("新增管理员用户名为 " + $(".write_username").val() + "\n默认密码为11111111" + "\n信息已成功保存");
					} else {
						alert("保存失败");
					}
				}
			});
		},
		render: function () {
			return React.createElement(
				"div",
				{ id: "AdminAddteacher" },
				React.createElement(
					"div",
					{ className: "title" },
					"\u6DFB\u52A0\u65B0\u6559\u5E08"
				),
				React.createElement(
					"ul",
					{ className: "teacher_infor" },
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u59D3\u540D :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_name" })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u6027\u522B :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_sex" })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u5DE5\u53F7 :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_username" })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u9662\u7CFB :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_title" })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u5B66\u5386 :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_edu" })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u8054\u7CFB\u65B9\u5F0F :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_cont" })
					)
				),
				React.createElement("input", { type: "button", name: "entering", value: "\u6DFB\u52A0", className: "entering", onClick: this.addclick })
			);
		}
	});

	//管理员管理-修改教师信息
	var AdminReteacher = React.createClass({
		displayName: "AdminReteacher",

		reviseclick: function () {
			if ($(".write_sex").val() == "男") var sex = "0";else var sex = "1";

			var teacher = {
				teaid: this.props.teaid,
				name: $(".write_name").val(),
				sex: sex,
				title: $(".write_title").val(),
				education: $(".write_edu").val(),
				contact: $(".write_cont").val()
			};
			//console.log(JSON.stringify(teacher));
			$.ajax({
				url: "http://yiranblade.cn/lbms/teacher",
				type: "PUT",
				dataType: "json",
				"contentType": "application/json",
				data: JSON.stringify(teacher),
				success: function (data) {
					if (data.code == "200") {
						alert("信息已更新成功");
					} else {
						alert("更新失败");
					}
				}
			});
		},
		render: function () {
			return React.createElement(
				"div",
				{ id: "AdminReteacher" },
				React.createElement(
					"div",
					{ className: "title" },
					"\u4FEE\u6539\u6559\u5E08\u4FE1\u606F"
				),
				React.createElement(
					"ul",
					{ className: "teacher_infor" },
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u5DE5\u53F7 :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_teaid", value: this.props.username })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u59D3\u540D :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_name", defaultValue: this.props.name })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u6027\u522B :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_sex", defaultValue: this.props.sex == "0" ? "男" : "女" })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u9662\u7CFB :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_title", defaultValue: this.props.title })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u5B66\u5386 :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_edu", defaultValue: this.props.edu })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u8054\u7CFB\u65B9\u5F0F :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_cont", defaultValue: this.props.con })
					)
				),
				React.createElement("input", { type: "button", name: "entering", value: "\u4FEE\u6539", className: "entering", onClick: this.reviseclick })
			);
		}
	});

	//管理员管理-管理员管理
	var AdminAdmin = React.createClass({
		displayName: "AdminAdmin",

		getInitialState: function () {
			return {
				result: []
			};
		},
		ajaxchange: function (data) {
			//ajax转化 将data中部分信息提取出来渲染到页面中
			var result = data.data.recordList;
			this.state.result = result;
		},
		addclick: function () {
			//点击添加跳转至添加添加新管理员页面
			ReactDOM.render(React.createElement(AdminAddadmin, null), document.getElementById("info_admin"));
		},
		deleteclick: function (admid) {
			//点击删除跳出窗口询问是否删除
			//console.log(e.target.textContent);
			if (confirm("确认删除吗？")) {
				$.ajax({
					url: "http://yiranblade.cn/lbms/administrator/" + admid,
					type: "DELETE",
					dataType: "json",
					success: function (data) {
						if (data.code == "200") {
							alert("删除成功");
							location.reload(true);
						} else {
							alert("删除失败");
						}
					}
				});
			}
		},
		reviseclick: function (name, sex, con, admid, username) {
			//点击修改跳转至修改页面
			ReactDOM.render(React.createElement(AdminReadmin, { name: name, sex: sex, con: con, admid: admid, username: username }), document.getElementById("info_admin"));
		},
		render: function () {
			this.ajaxchange(this.props.data);
			var result = this.state.result;
			//console.log(result);
			var i = -1;
			return React.createElement(
				"div",
				{ id: "AdminAdmin" },
				React.createElement(
					"div",
					{ className: "title" },
					"\u7BA1\u7406\u5458"
				),
				React.createElement(
					"h4",
					null,
					"\u8FD9\u91CC\u662F\u5168\u90E8\u7BA1\u7406\u5458: ",
					React.createElement(
						"span",
						{ className: "stu_add", onClick: this.addclick },
						"\u589E\u52A0"
					)
				),
				React.createElement(
					"ul",
					{ className: "admin_infor" },
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u59D3\u540D"
						),
						React.createElement(
							"span",
							null,
							"\u6027\u522B"
						),
						React.createElement(
							"span",
							null,
							"\u7BA1\u7406\u5DE5\u53F7"
						),
						React.createElement(
							"span",
							null,
							"\u5220\u9664"
						),
						React.createElement(
							"span",
							null,
							"\u4FEE\u6539"
						)
					),
					result.map(function (result) {
						i++;
						return React.createElement(
							"li",
							{ key: i },
							React.createElement(
								"span",
								null,
								result.name
							),
							React.createElement(
								"span",
								null,
								result.sex == "0" ? "男" : "女"
							),
							React.createElement(
								"span",
								null,
								result.username
							),
							React.createElement(
								"span",
								{ onClick: event => {
										event.stopPropagation(), this.deleteclick(result.admid);
									}, className: "stu_delete" },
								"\u5220\u9664"
							),
							React.createElement(
								"span",
								{ onClick: event => {
										event.stopPropagation(), this.reviseclick(result.name, result.sex, result.contact, result.admid, result.username);
									}, className: "stu_revise" },
								"\u4FEE\u6539"
							)
						);
					}.bind(this))
				)
			);
		}
	});
	//管理员管理-添加新管理员
	var AdminAddadmin = React.createClass({
		displayName: "AdminAddadmin",

		addclick: function () {
			if ($(".write_sex").val() == "男") var sex = "0";else var sex = "1";

			var student = {
				name: $(".write_name").val(),
				sex: sex,
				contact: $(".write_cont").val()
			};
			//console.log(JSON.stringify(student));
			$.ajax({
				url: "http://yiranblade.cn/lbms/administrator",
				type: "POST",
				dataType: "json",
				"contentType": "application/json",
				data: JSON.stringify(student),
				success: function (data) {
					if (data.code == "200") {
						alert("新增管理员用户名为 " + $(".write_username").val() + "\n默认密码为11111111" + "\n信息已成功保存");
					} else {
						alert("保存失败");
					}
				}
			});
		},
		render: function () {
			return React.createElement(
				"div",
				{ id: "AdminAddadmin" },
				React.createElement(
					"div",
					{ className: "title" },
					"\u6DFB\u52A0\u65B0\u7BA1\u7406\u5458"
				),
				React.createElement(
					"ul",
					{ className: "teacher_infor" },
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u59D3\u540D :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_name" })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u6027\u522B :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_sex" })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u8054\u7CFB\u65B9\u5F0F :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_cont" })
					)
				),
				React.createElement("input", { type: "button", name: "entering", value: "\u6DFB\u52A0", className: "entering", onClick: this.addclick })
			);
		}
	});

	//管理员管理-修改管理员信息
	var AdminReadmin = React.createClass({
		displayName: "AdminReadmin",

		reviseclick: function () {
			if ($(".write_sex").val() == "男") var sex = "0";else var sex = "1";

			var student = {
				admid: this.props.admid,
				name: $(".write_name").val(),
				sex: sex,
				contact: $(".write_cont").val()
			};
			//console.log(JSON.stringify(student));
			$.ajax({
				url: "http://yiranblade.cn/lbms/administrator",
				type: "PUT",
				dataType: "json",
				"contentType": "application/json",
				data: JSON.stringify(student),
				success: function (data) {
					if (data.code == "200") {
						alert("信息已更新成功");
					} else {
						alert("更新失败");
					}
				}
			});
		},
		render: function () {
			return React.createElement(
				"div",
				{ id: "AdminReadmin" },
				React.createElement(
					"div",
					{ className: "title" },
					"\u4FEE\u6539\u7BA1\u7406\u5458\u4FE1\u606F"
				),
				React.createElement(
					"ul",
					{ className: "teacher_infor" },
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u7BA1\u7406\u516C\u53F7 :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_admid", value: this.props.username })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u59D3\u540D :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_name", defaultValue: this.props.name })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u6027\u522B :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_sex", defaultValue: this.props.sex == "0" ? "男" : "女" })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u8054\u7CFB\u65B9\u5F0F :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_cont", defaultValue: this.props.con })
					)
				),
				React.createElement("input", { type: "button", name: "entering", value: "\u4FEE\u6539", className: "entering", onClick: this.reviseclick })
			);
		}
	});
	//管理员管理-项目管理
	var AdminTest = React.createClass({
		displayName: "AdminTest",

		getInitialState: function () {
			return {
				result: []
			};
		},
		ajaxchange: function (data) {
			//ajax转化 将data中部分信息提取出来渲染到页面中
			var result = data.data.recordList;
			this.state.result = result;
		},
		addclick: function () {
			//点击添加跳转至添加添加新项目页面
			ReactDOM.render(React.createElement(AdminAdditem, null), document.getElementById("info_admin"));
		},
		deleteclick: function (itemid) {
			//点击删除跳出窗口询问是否删除
			//console.log(e.target.textContent);
			if (confirm("确认删除吗？")) {
				$.ajax({
					url: "http://yiranblade.cn/lbms/item/" + itemid,
					type: "DELETE",
					dataType: "json",
					success: function (data) {
						if (data.code == "200") {
							alert("删除成功");
							location.reload(true);
						} else {
							alert("删除失败");
						}
					}
				});
			}
		},
		reviseclick: function (name, itemid, term, cour) {
			//点击修改跳转至修改页面
			ReactDOM.render(React.createElement(AdminReitem, { name: name, itemid: itemid, cour: cour, term: term }), document.getElementById("info_admin"));
		},
		adddisclick: function (itemid) {
			//点击添加跳转至添加添加新项目页面
			ReactDOM.render(React.createElement(AdminAddTestdis, { itemid: itemid }), document.getElementById("info_admin"));
		},
		render: function () {
			this.ajaxchange(this.props.data);
			var result = this.state.result;
			//console.log(result);
			var i = -1;
			return React.createElement(
				"div",
				{ id: "AdminTest" },
				React.createElement(
					"div",
					{ className: "title" },
					"\u9879\u76EE\u7BA1\u7406"
				),
				React.createElement(
					"h4",
					null,
					"\u8FD9\u91CC\u662F\u5168\u90E8\u9879\u76EE: ",
					React.createElement(
						"span",
						{ className: "stu_add", onClick: this.addclick },
						"\u589E\u52A0"
					)
				),
				React.createElement(
					"ul",
					{ className: "admin_infor" },
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u5B9E\u9A8C\u540D\u79F0"
						),
						React.createElement(
							"span",
							null,
							"\u5B66\u671F"
						),
						React.createElement(
							"span",
							null,
							"\u5B9E\u9A8C\u6240\u5C5E\u8BFE\u7A0B"
						),
						React.createElement(
							"span",
							null,
							"\u5B9E\u9A8C\u7F16\u53F7"
						),
						React.createElement(
							"span",
							null,
							"\u5220\u9664"
						),
						React.createElement(
							"span",
							null,
							"\u4FEE\u6539"
						),
						React.createElement(
							"span",
							null,
							"\u8BBE\u7F6E"
						)
					),
					result.map(function (result) {
						i++;
						return React.createElement(
							"li",
							{ key: i },
							React.createElement(
								"span",
								null,
								result.itemname
							),
							React.createElement(
								"span",
								null,
								result.term
							),
							React.createElement(
								"span",
								null,
								result.coursename
							),
							React.createElement(
								"span",
								null,
								result.itemid
							),
							React.createElement(
								"span",
								{ onClick: event => {
										event.stopPropagation(), this.deleteclick(result.itemid);
									}, className: "stu_delete" },
								"\u5220\u9664"
							),
							React.createElement(
								"span",
								{ onClick: event => {
										event.stopPropagation(), this.reviseclick(result.itemname, result.itemid, result.term, result.coursename);
									}, className: "stu_revise" },
								"\u4FEE\u6539"
							),
							React.createElement(
								"span",
								{ onClick: event => {
										event.stopPropagation(), this.adddisclick(result.itemid);
									}, className: "stu_adddis" },
								"\u8BBE\u7F6E\u6279\u6B21"
							)
						);
					}.bind(this))
				)
			);
		}
	});

	//管理员管理-添加新项目
	var AdminAdditem = React.createClass({
		displayName: "AdminAdditem",

		addclick: function () {
			var item = {
				itemname: $(".write_name").val(),
				term: $(".write_term").val(),
				coursename: $(".write_cont").val()
			};
			//console.log(JSON.stringify(student));
			$.ajax({
				url: "http://yiranblade.cn/lbms/item",
				type: "POST",
				dataType: "json",
				"contentType": "application/json",
				data: JSON.stringify(item),
				success: function (data) {
					if (data.code == "200") {
						alert("成功添加,信息已保存");
					} else {
						alert("保存失败");
					}
				}
			});
		},
		render: function () {
			return React.createElement(
				"div",
				{ id: "AdminAdditem" },
				React.createElement(
					"div",
					{ className: "title" },
					"\u6DFB\u52A0\u65B0\u9879\u76EE"
				),
				React.createElement(
					"ul",
					{ className: "teacher_infor" },
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u5B9E\u9A8C\u540D\u79F0 :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_name" })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u5B66\u671F :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_term" })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u5B9E\u9A8C\u6240\u5C5E\u8BFE\u7A0B :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_cont" })
					)
				),
				React.createElement("input", { type: "button", name: "entering", value: "\u6DFB\u52A0", className: "entering", onClick: this.addclick })
			);
		}
	});

	//管理员管理-修改项目信息
	var AdminReitem = React.createClass({
		displayName: "AdminReitem",

		reviseclick: function () {
			var item = {
				itemid: $(".write_admid").val(),
				itemname: $(".write_name").val(),
				term: $(".write_term").val(),
				coursename: $(".write_cont").val()
			};
			//console.log(JSON.stringify(student));
			$.ajax({
				url: "http://yiranblade.cn/lbms/item",
				type: "PUT",
				dataType: "json",
				"contentType": "application/json",
				data: JSON.stringify(item),
				success: function (data) {
					if (data.code == "200") {
						alert("信息已更新成功");
					} else {
						alert("更新失败");
					}
				}
			});
		},
		render: function () {
			return React.createElement(
				"div",
				{ id: "AdminReitem" },
				React.createElement(
					"div",
					{ className: "title" },
					"\u4FEE\u6539\u9879\u76EE\u4FE1\u606F"
				),
				React.createElement(
					"ul",
					{ className: "teacher_infor" },
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u5B9E\u9A8C\u7F16\u53F7 :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_admid", value: this.props.itemid })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u5B9E\u9A8C\u540D\u79F0 :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_name", defaultValue: this.props.name })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u5B66\u671F :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_term", defaultValue: this.props.term })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u5B9E\u9A8C\u6240\u5C5E\u8BFE\u7A0B :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_cont", defaultValue: this.props.cour })
					)
				),
				React.createElement("input", { type: "button", name: "entering", value: "\u4FEE\u6539", className: "entering", onClick: this.reviseclick })
			);
		}
	});

	//管理员管理-项目批次管理
	var AdminTestdis = React.createClass({
		displayName: "AdminTestdis",

		getInitialState: function () {
			return {
				result: []
			};
		},
		ajaxchange: function (data) {
			//ajax转化 将data中部分信息提取出来渲染到页面中
			var result = data.data.recordList;
			this.state.result = result;
		},
		deleteclick: function (batid) {
			//点击删除跳出窗口询问是否删除
			//console.log(e.target.textContent);
			if (confirm("确认删除吗？")) {
				$.ajax({
					url: "http://yiranblade.cn/lbms/batch/" + batid,
					type: "DELETE",
					dataType: "json",
					success: function (data) {
						if (data.code == "200") {
							alert("删除成功");
							location.reload(true);
						} else {
							alert("删除失败");
						}
					}
				});
			}
		},
		reviseclick: function (batid, itemid, teaid, lab, date, seg) {
			//点击修改跳转至修改页面
			ReactDOM.render(React.createElement(AdminReTestdis, { batid: batid, itemid: itemid, teaid: teaid, lab: lab, date: date, seg: seg }), document.getElementById("info_admin"));
		},
		getstuclick: function (batid) {
			//点击获取该实验批次的学生
			$.ajax({
				url: "http://yiranblade.cn/lbms/student/" + batid + "/1",
				type: "GET",
				dataType: "json",
				success: function (data) {
					if (data.code == "200") {
						ReactDOM.render(React.createElement(AdminGetstu, { data: data }), document.getElementById("info_admin"));
					} else {
						alert("no");
					}
				}
			});
		},
		render: function () {
			this.ajaxchange(this.props.data);
			var result = this.state.result;
			//console.log(result.length);
			var i = -1;
			var name = result[i + 1];
			return React.createElement(
				"div",
				{ id: "AdminTestdis" },
				React.createElement(
					"div",
					{ className: "title" },
					"\u9879\u76EE\u6279\u6B21\u7BA1\u7406"
				),
				React.createElement(
					"h4",
					null,
					"\u8FD9\u91CC\u662F\u5168\u90E8\u9879\u76EE\u6279\u6B21:"
				),
				React.createElement(
					"ul",
					{ className: "admin_infor" },
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							{ className: "it_name" },
							"\u5B9E\u9A8C\u540D\u79F0"
						),
						React.createElement(
							"span",
							null,
							"\u6279\u6B21\u7F16\u53F7"
						),
						React.createElement(
							"span",
							null,
							"\u6559\u5E08\u59D3\u540D"
						),
						React.createElement(
							"span",
							null,
							"\u5B9E\u9A8C\u5730\u70B9"
						),
						React.createElement(
							"span",
							null,
							"\u5B9E\u9A8C\u65E5\u671F"
						),
						React.createElement(
							"span",
							null,
							"\u8282\u6B21"
						),
						React.createElement(
							"span",
							{ className: "stu_del" },
							"\u5220\u9664"
						),
						React.createElement(
							"span",
							{ className: "stu_re" },
							"\u4FEE\u6539"
						),
						React.createElement(
							"span",
							{ className: "stu_s" },
							"\u5B66\u751F"
						)
					),
					result.map(function (result) {
						// var name=ajaxgetitemname(result.itemid);
						// var div=document.getElementById(".admin_infor");
						// console.log(div[0]);		    				
						// if(ajaxgetitemname(result.itemid)!=name)
						// 		return <span className="item_name">{ajaxgetitemname(result.itemid)}</span>
						i++;
						return React.createElement(
							"li",
							{ key: i },
							React.createElement(
								"span",
								{ className: "item_name" },
								ajaxgetitemname(result.itemid)
							),
							React.createElement(
								"span",
								null,
								result.batid
							),
							React.createElement(
								"span",
								null,
								ajaxgetteaname(result.teaid)
							),
							React.createElement(
								"span",
								null,
								result.laboratory
							),
							React.createElement(
								"span",
								null,
								result.date
							),
							React.createElement(
								"span",
								null,
								result.segmentation
							),
							React.createElement(
								"span",
								{ onClick: event => {
										event.stopPropagation(), this.deleteclick(result.batid);
									}, className: "stu_delete" },
								"\u5220\u9664"
							),
							React.createElement(
								"span",
								{ onClick: event => {
										event.stopPropagation(), this.reviseclick(result.batid, result.itemid, result.teaid, result.laboratory, result.date, result.segmentation);
									}, className: "stu_revise" },
								"\u4FEE\u6539"
							),
							React.createElement(
								"span",
								{ onClick: event => {
										event.stopPropagation(), this.getstuclick(result.batid);
									}, className: "stu_stu" },
								"\u67E5\u770B\u9884\u7EA6\u5B66\u751F"
							)
						);
					}.bind(this))
				)
			);
		}
	});
	//管理员管理-审批项目批次
	var TestOrder = React.createClass({
		displayName: "TestOrder",

		getInitialState: function () {
			return {
				result: []
			};
		},
		ajaxchange: function (data) {
			//ajax转化 将data中部分信息提取出来渲染到页面中
			var result = data.data;
			this.state.result = result;
		},
		agree: function (batid) {
			//点击同意跳出窗口询问是否同意
			//console.log(e.target.textContent);
			if (confirm("确认同意吗？")) {
				$.ajax({
					url: "http://yiranblade.cn/lbms/batch/approve/" + batid,
					type: "GET",
					dataType: "json",
					success: function (data) {
						if (data.code == "200") {
							alert("项目已成功添加");
							location.reload(true);
						} else {
							alert("已拒绝");
						}
					}
				});
			}
		},
		disagree: function (batid) {
			if (confirm("确认拒绝吗？")) {
				$.ajax({
					url: "http://yiranblade.cn/lbms/teacher/cancel/" + batid,
					type: "GET",
					dataType: "json",
					success: function (data) {
						if (data.code == "200") {
							alert("已拒绝");
							location.reload(true);
						} else {
							alert("出错了");
						}
					}
				});
			}
		},
		render: function () {
			this.ajaxchange(this.props.data);
			var result = this.state.result;
			//console.log(result);
			var i = -1;
			return React.createElement(
				"div",
				{ id: "TestOrder" },
				React.createElement(
					"div",
					{ className: "title" },
					"\u5BA1\u6279\u9879\u76EE\u6279\u6B21"
				),
				React.createElement(
					"h4",
					null,
					"\u8FD9\u91CC\u662F\u5F85\u5BA1\u6279\u7684\u9879\u76EE\u6279\u6B21:"
				),
				React.createElement(
					"ul",
					{ className: "admin_infor" },
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							{ className: "it_name" },
							"\u5B9E\u9A8C\u540D\u79F0"
						),
						React.createElement(
							"span",
							null,
							"\u6279\u6B21\u7F16\u53F7"
						),
						React.createElement(
							"span",
							null,
							"\u6559\u5E08\u59D3\u540D"
						),
						React.createElement(
							"span",
							null,
							"\u5B9E\u9A8C\u5730\u70B9"
						),
						React.createElement(
							"span",
							null,
							"\u5B9E\u9A8C\u65E5\u671F"
						),
						React.createElement(
							"span",
							null,
							"\u8282\u6B21"
						),
						React.createElement(
							"span",
							{ className: "stu_del" },
							"\u540C\u610F"
						),
						React.createElement(
							"span",
							{ className: "stu_re" },
							"\u62D2\u7EDD"
						)
					),
					result.map(function (result) {
						i++;
						return React.createElement(
							"li",
							{ key: i },
							React.createElement(
								"span",
								{ className: "item_name" },
								ajaxgetitemname(result.itemid)
							),
							React.createElement(
								"span",
								null,
								result.batid
							),
							React.createElement(
								"span",
								null,
								ajaxgetteaname(result.teaid)
							),
							React.createElement(
								"span",
								null,
								result.laboratory
							),
							React.createElement(
								"span",
								null,
								result.date
							),
							React.createElement(
								"span",
								null,
								result.segmentation
							),
							React.createElement(
								"span",
								{ onClick: event => {
										event.stopPropagation(), this.agree(result.batid);
									}, className: "stu_delete" },
								"\u540C\u610F"
							),
							React.createElement(
								"span",
								{ onClick: event => {
										event.stopPropagation(), this.disagree(result.batid);
									}, className: "stu_revise" },
								"\u62D2\u7EDD"
							)
						);
					}.bind(this))
				)
			);
		}
	});
	//管理员管理-获取预约该项目批次的学生
	var AdminGetstu = React.createClass({
		displayName: "AdminGetstu",

		getInitialState: function () {
			return {
				result: []
			};
		},
		ajaxchange: function (data) {
			//ajax转化 将data中部分信息提取出来渲染到页面中
			var result = data.data.recordList;
			//console.log(result);
			this.state.result = result;
		},
		render: function () {
			this.ajaxchange(this.props.data);
			var result = this.state.result;
			console.log(result);
			var i = -1;
			return React.createElement(
				"div",
				{ id: "AdminGetstu" },
				React.createElement(
					"div",
					{ className: "title" },
					"\u9884\u7EA6\u8BE5\u9879\u76EE\u6279\u6B21\u7684\u5B66\u751F"
				),
				React.createElement(
					"ul",
					{ className: "admin_infor" },
					React.createElement(
						"li",
						{ key: i },
						React.createElement(
							"span",
							null,
							"\u59D3\u540D"
						),
						React.createElement(
							"span",
							null,
							"\u5B66\u53F7"
						),
						React.createElement(
							"span",
							null,
							"\u6027\u522B"
						),
						React.createElement(
							"span",
							null,
							"\u5E74\u7EA7"
						),
						React.createElement(
							"span",
							null,
							"\u4E13\u4E1A"
						)
					),
					result.map(function (result) {
						i++;
						var numid = result.numid;
						return React.createElement(
							"li",
							{ key: i },
							React.createElement(
								"span",
								null,
								result.name
							),
							React.createElement(
								"span",
								null,
								result.username
							),
							React.createElement(
								"span",
								null,
								result.sex == "0" ? "男" : "女"
							),
							React.createElement(
								"span",
								null,
								result.specialization
							),
							React.createElement(
								"span",
								null,
								result.grade
							)
						);
					}.bind(this))
				)
			);
		}
	});

	//管理员管理-添加新项目批次
	var AdminAddTestdis = React.createClass({
		displayName: "AdminAddTestdis",

		addclick: function () {
			var teaid;
			var testdis = {
				itemid: $(".write_name").val(),
				teaid: teaid,
				laboratory: $(".write_cont").val(),
				date: $(".write_date").val(),
				segmentation: $(".write_seg").val()

			};
			//console.log(JSON.stringify(testdis));
			$.ajax({
				url: "http://yiranblade.cn/lbms/batch",
				type: "POST",
				dataType: "json",
				"contentType": "application/json",
				data: JSON.stringify(testdis),
				success: function (data) {
					if (data.code == "200") {
						alert("成功添加,信息已保存");
					} else {
						alert("保存失败");
					}
				},
				error: function () {
					alert("您输入的教师信息不存在");
				}
			});
		},
		render: function () {
			return React.createElement(
				"div",
				{ id: "AdminAddTestdis" },
				React.createElement(
					"div",
					{ className: "title" },
					"\u6DFB\u52A0\u65B0\u9879\u76EE\u6279\u6B21"
				),
				React.createElement(
					"ul",
					{ className: "teacher_infor" },
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u5B9E\u9A8C\u7F16\u53F7 :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_name", value: this.props.itemid })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u5B9E\u9A8C\u5730\u70B9 :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_cont" })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u5B9E\u9A8C\u65E5\u671F :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_date" })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u8282\u6B21 :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_seg" })
					)
				),
				React.createElement("input", { type: "button", name: "entering", value: "\u6DFB\u52A0", className: "entering", onClick: this.addclick })
			);
		}
	});

	//管理员管理-修改项目批次信息
	var AdminReTestdis = React.createClass({
		displayName: "AdminReTestdis",

		reviseclick: function () {
			var batch = {
				batid: $(".write_testid").val(),
				itemid: $(".write_admid").val(),
				teaid: $(".write_name").val(),
				laboratory: $(".write_term").val(),
				date: $(".write_cont").val(),
				segmentation: $(".write_seg").val()
			};
			//console.log(JSON.stringify(batch));
			$.ajax({
				url: "http://yiranblade.cn/lbms/batch",
				type: "PUT",
				dataType: "json",
				"contentType": "application/json",
				data: JSON.stringify(batch),
				success: function (data) {
					if (data.code == "200") {
						alert("信息已更新成功");
					} else {
						alert("更新失败");
					}
				}
			});
		},
		render: function () {
			return React.createElement(
				"div",
				{ id: "AdminReTestdis" },
				React.createElement(
					"div",
					{ className: "title" },
					"\u4FEE\u6539\u5B9E\u9A8C\u6279\u6B21\u4FE1\u606F"
				),
				React.createElement(
					"ul",
					{ className: "teacher_infor" },
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u5B9E\u9A8C\u6279\u6B21\u7F16\u53F7 :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_testid", value: this.props.batid })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u5B9E\u9A8C\u7F16\u53F7 :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_admid", defaultValue: this.props.itemid })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u6559\u5E08\u5DE5\u53F7 :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_name", defaultValue: this.props.teaid })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u5B9E\u9A8C\u5730\u70B9 :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_term", defaultValue: this.props.lab })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u5B9E\u9A8C\u65E5\u671F :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_cont", defaultValue: this.props.date })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u8282\u6B21 :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_seg", defaultValue: this.props.seg })
					)
				),
				React.createElement("input", { type: "button", name: "entering", value: "\u4FEE\u6539", className: "entering", onClick: this.reviseclick })
			);
		}
	});

	//管理员管理-公告管理
	var AdminPublic = React.createClass({
		displayName: "AdminPublic",

		getInitialState: function () {
			return {
				result: []
			};
		},
		ajaxchange: function (data) {
			//ajax转化 将data中部分信息提取出来渲染到页面中
			var result = data.data.recordList;
			this.state.result = result;
		},
		addclick: function () {
			//点击添加跳转至添加添加新项目页面
			ReactDOM.render(React.createElement(AdminAddnotice, null), document.getElementById("info_admin"));
		},
		deleteclick: function (noticeid) {
			//点击删除跳出窗口询问是否删除
			//console.log(e.target.textContent);
			if (confirm("确认删除吗？")) {
				$.ajax({
					url: "http://yiranblade.cn/lbms/notice/" + noticeid,
					type: "DELETE",
					dataType: "json",
					success: function (data) {
						if (data.code == "200") {
							alert("删除成功");
							location.reload(true);
						} else {
							alert("删除失败");
						}
					}
				});
			}
		},
		reviseclick: function (noticeid, content) {
			//点击修改跳转至修改页面
			ReactDOM.render(React.createElement(AdminRenotice, { noticeid: noticeid, content: content }), document.getElementById("info_admin"));
		},
		render: function () {
			this.ajaxchange(this.props.data);
			var result = this.state.result;
			//console.log(result);
			var i = -1;
			return React.createElement(
				"div",
				{ id: "AdminPublic" },
				React.createElement(
					"div",
					{ className: "title" },
					"\u516C\u544A\u680F\u7BA1\u7406"
				),
				React.createElement(
					"h4",
					null,
					"\u8FD9\u91CC\u662F\u5168\u90E8\u516C\u544A: ",
					React.createElement(
						"span",
						{ className: "stu_add", onClick: this.addclick },
						"\u589E\u52A0"
					)
				),
				React.createElement(
					"ul",
					{ className: "admin_infor" },
					result.map(function (result) {
						i++;
						return React.createElement(
							"li",
							{ key: i },
							result.noticecontent,
							React.createElement(
								"div",
								null,
								React.createElement(
									"span",
									{ onClick: event => {
											event.stopPropagation(), this.deleteclick(result.noticeid);
										}, className: "stu_delete" },
									"\u5220\u9664"
								),
								React.createElement(
									"span",
									{ onClick: event => {
											event.stopPropagation(), this.reviseclick(result.noticeid, result.noticecontent);
										}, className: "stu_revise" },
									"\u4FEE\u6539"
								)
							)
						);
					}.bind(this))
				)
			);
		}
	});

	//管理员管理-添加新公告
	var AdminAddnotice = React.createClass({
		displayName: "AdminAddnotice",

		addclick: function () {
			var notice = {
				noticecontent: $(".write_name").val()
			};
			//console.log(JSON.stringify(notice));
			$.ajax({
				url: "http://yiranblade.cn/lbms/notice",
				type: "POST",
				dataType: "json",
				"contentType": "application/json",
				data: JSON.stringify(notice),
				success: function (data) {
					if (data.code == "200") {
						alert("成功添加,信息已保存");
					} else {
						alert("保存失败");
					}
				}
			});
		},
		render: function () {
			return React.createElement(
				"div",
				{ id: "AdminAddnotice" },
				React.createElement(
					"div",
					{ className: "title" },
					"\u6DFB\u52A0\u65B0\u9879\u76EE"
				),
				React.createElement(
					"ul",
					{ className: "teacher_infor" },
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u516C\u544A\u5185\u5BB9 :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_name" })
					)
				),
				React.createElement("input", { type: "button", name: "entering", value: "\u6DFB\u52A0", className: "entering", onClick: this.addclick })
			);
		}
	});

	//管理员管理-修改公告信息
	var AdminRenotice = React.createClass({
		displayName: "AdminRenotice",

		reviseclick: function () {
			var notice = {
				noticeid: this.props.noticeid,
				noticetile: "通知",
				noticecontent: $(".write_con").val()
			};
			//console.log(JSON.stringify(notice));
			$.ajax({
				url: "http://yiranblade.cn/lbms/notice",
				type: "PUT",
				dataType: "json",
				"contentType": "application/json",
				data: JSON.stringify(notice),
				success: function (data) {
					if (data.code == "200") {
						alert("信息已更新成功");
					} else {
						alert("更新失败");
					}
				}
			});
		},
		render: function () {
			return React.createElement(
				"div",
				{ id: "AdminRenotice" },
				React.createElement(
					"div",
					{ className: "title" },
					"\u4FEE\u6539\u516C\u544A\u4FE1\u606F"
				),
				React.createElement(
					"ul",
					{ className: "teacher_infor" },
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u516C\u544A\u5185\u5BB9 :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_con", defaultValue: this.props.content })
					)
				),
				React.createElement("input", { type: "button", name: "entering", value: "\u4FEE\u6539", className: "entering", onClick: this.reviseclick })
			);
		}
	});
	//管理员管理-个人信息组件
	var PersonInfor = React.createClass({
		displayName: "PersonInfor",

		getInitialState: function () {
			return {
				result: []
			};
		},
		ajaxchange: function (data) {
			//ajax转化 将data中部分信息提取出来渲染到页面中
			var result = data.data;
			this.state.result = result;
		},
		changeclick: function () {
			//点击跳转至修改密码页面
			ReactDOM.render(React.createElement(Personpassword, null), document.getElementById("info_admin"));
		},
		render: function () {
			this.ajaxchange(this.props.data);
			var result = this.state.result;
			//console.log(result);
			var i = -1;
			return React.createElement(
				"div",
				{ id: "PersonInfor" },
				React.createElement(
					"div",
					{ className: "title" },
					"\u4E2A\u4EBA\u4FE1\u606F"
				),
				React.createElement(
					"div",
					{ id: "information" },
					React.createElement(
						"ul",
						{ className: "teacher_infor" },
						React.createElement(
							"li",
							null,
							React.createElement(
								"span",
								null,
								"\u7BA1\u7406\u5DE5\u53F7 :"
							),
							React.createElement(
								"span",
								null,
								result.username
							)
						),
						React.createElement(
							"li",
							null,
							React.createElement(
								"span",
								null,
								"\u59D3\u540D :"
							),
							React.createElement(
								"span",
								null,
								result.name
							)
						),
						React.createElement(
							"li",
							null,
							React.createElement(
								"span",
								null,
								"\u6027\u522B :"
							),
							React.createElement(
								"span",
								null,
								result.sex == "0" ? "男" : "女"
							)
						),
						React.createElement(
							"li",
							null,
							React.createElement(
								"span",
								null,
								"\u8054\u7CFB\u65B9\u5F0F :"
							),
							React.createElement(
								"span",
								null,
								result.contact
							)
						)
					),
					React.createElement("input", { type: "button", name: "entering", value: "\u4FEE\u6539\u5BC6\u7801", className: "entering", onClick: this.changeclick })
				)
			);
		}
	});
	//管理员管理-修改密码
	var Personpassword = React.createClass({
		displayName: "Personpassword",

		getInitialState: function () {
			return {
				result: []
			};
		},
		ajaxchange: function (data) {
			//ajax转化 将data中部分信息提取出来渲染到页面中
			var result = data;
			this.state.result = result;
		},
		changeclick: function () {
			var admin = {
				password: $(".write_password").val(),
				adId: username
			};
			//console.log(admin);
			$.ajax({
				url: "http://yiranblade.cn/lbms/cipher/administrator",
				type: "POST",
				dataType: "json",
				data: admin,
				success: function (data) {
					if (data.code == "200") {
						alert("修改成功 , 信息已保存");
					} else {
						alert("修改失败");
					}
				}
			});
		},
		render: function () {
			this.ajaxchange(this.props.data);
			var result = this.state.result;
			//console.log(result);
			var i = -1;
			return React.createElement(
				"div",
				{ id: "Personpassword" },
				React.createElement(
					"div",
					{ className: "title" },
					"\u4FEE\u6539\u5BC6\u7801"
				),
				React.createElement(
					"div",
					{ id: "information" },
					React.createElement(
						"ul",
						{ className: "student_infor" },
						React.createElement(
							"li",
							null,
							React.createElement(
								"span",
								null,
								"\u65B0\u5BC6\u7801 :"
							),
							React.createElement("input", { type: "text", name: "write_in", className: "write_password" })
						)
					),
					React.createElement("input", { type: "button", name: "entering", value: "\u4FEE\u6539", className: "entering", onClick: this.changeclick })
				)
			);
		}
	});

	//点击目录获取相应的界面
	$(".admin_stu").click(function () {
		$.ajax({
			url: "http://yiranblade.cn/lbms/student/page/1",
			type: "GET",
			dataType: "json",
			success: function (data) {
				if (data.code == "200") {
					ReactDOM.render(React.createElement(AdminStudent, { data: data }), document.getElementById("info_admin"));
				} else {
					alert("no");
				}
			}
		});
	});
	$(".admin_tea").click(function () {
		$.ajax({
			url: "http://yiranblade.cn/lbms/teacher/page/1",
			type: "GET",
			dataType: "json",
			success: function (data) {
				if (data.code == "200") {
					ReactDOM.render(React.createElement(AdminTeacher, { data: data }), document.getElementById("info_admin"));
				} else {
					alert("no");
				}
			}
		});
	});
	$(".admin_admin").click(function () {
		$.ajax({
			url: "http://yiranblade.cn/lbms/administrator/page/1",
			type: "GET",
			dataType: "json",
			success: function (data) {
				if (data.code == "200") {
					ReactDOM.render(React.createElement(AdminAdmin, { data: data }), document.getElementById("info_admin"));
				} else {
					alert("no");
				}
			}
		});
	});
	$(".admin_test").click(function () {
		$.ajax({
			url: "http://yiranblade.cn/lbms/item/page/1",
			type: "GET",
			dataType: "json",
			success: function (data) {
				if (data.code == "200") {
					ReactDOM.render(React.createElement(AdminTest, { data: data }), document.getElementById("info_admin"));
				} else {
					alert("no");
				}
			}
		});
	});
	$(".admin_public").click(function () {
		$.ajax({
			url: "http://yiranblade.cn/lbms/notice/page/1",
			type: "GET",
			dataType: "json",
			success: function (data) {
				if (data.code == "200") {
					ReactDOM.render(React.createElement(AdminPublic, { data: data }), document.getElementById("info_admin"));
				} else {
					alert("no");
				}
			}
		});
	});
	$(".admin_testdis").click(function () {
		$.ajax({
			url: "http://yiranblade.cn/lbms/batch/page/1",
			type: "GET",
			dataType: "json",
			success: function (data) {
				if (data.code == "200") {
					ReactDOM.render(React.createElement(AdminTestdis, { data: data }), document.getElementById("info_admin"));
				} else {
					alert("no");
				}
			}
		});
	});
	$(".admin_person").click(function () {
		$.ajax({
			url: "http://yiranblade.cn/lbms/administrator/" + username,
			type: "GET",
			dataType: "json",
			success: function (data) {
				if (data.code == "200") {
					ReactDOM.render(React.createElement(PersonInfor, { data: data }), document.getElementById("info_admin"));
				} else {
					alert("no");
				}
			}
		});
	});
	$(".admin_testorder").click(function () {
		$.ajax({
			url: "http://yiranblade.cn/lbms/batch/needapprove",
			type: "GET",
			dataType: "json",
			success: function (data) {
				if (data.code == "200") {
					ReactDOM.render(React.createElement(TestOrder, { data: data }), document.getElementById("info_admin"));
				} else {
					alert("no");
				}
			}
		});
	});

	//教师管理-项目管理
	var TeacherTest = React.createClass({
		displayName: "TeacherTest",

		getInitialState: function () {
			return {
				result: []
			};
		},
		ajaxchange: function (data) {
			//ajax转化 将data中部分信息提取出来渲染到页面中
			var result = data.data.recordList;
			this.state.result = result;
		},
		checkstu: function (batid) {
			//点击获取该实验批次的学生
			$.ajax({
				url: "http://yiranblade.cn/lbms/student/" + batid + "/1",
				type: "GET",
				dataType: "json",
				success: function (data) {
					if (data.code == "200") {
						ReactDOM.render(React.createElement(TeaGetstu, { data: data, batid: batid }), document.getElementById("info_teacher"));
					} else {
						alert("no");
					}
				}
			});
		},
		cancel: function (batid) {
			//点击取消预约
			if (confirm("确认取消预约吗？")) {
				$.ajax({
					url: "http://yiranblade.cn/lbms/teacher/cancel/" + batid,
					type: "GET",
					dataType: "json",
					success: function (data) {
						if (data.code == "200") {
							alert("已成功取消预约");
							location.reload(true);
						} else {
							alert("no");
						}
					}
				});
			}
		},
		render: function () {
			this.ajaxchange(this.props.data);
			var result = this.state.result;
			//console.log(result);
			var i = -1;
			return React.createElement(
				"div",
				{ id: "TeacherTest" },
				React.createElement(
					"div",
					{ className: "title" },
					"\u9879\u76EE\u7BA1\u7406"
				),
				React.createElement(
					"h4",
					null,
					"\u8FD9\u91CC\u662F\u60A8\u7684\u5B9E\u9A8C\u9879\u76EE:"
				),
				React.createElement(
					"ul",
					{ className: "teacher_infor" },
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u6279\u6B21\u7F16\u53F7"
						),
						React.createElement(
							"span",
							{ className: "item_name" },
							"\u5B9E\u9A8C\u540D\u79F0"
						),
						React.createElement(
							"span",
							null,
							"\u6559\u5E08\u59D3\u540D"
						),
						React.createElement(
							"span",
							null,
							"\u5B9E\u9A8C\u5730\u70B9"
						),
						React.createElement(
							"span",
							null,
							"\u5B9E\u9A8C\u65E5\u671F"
						),
						React.createElement(
							"span",
							null,
							"\u8282\u6B21"
						),
						React.createElement(
							"span",
							null,
							"\u5B66\u751F"
						),
						React.createElement(
							"span",
							null,
							"\u53D6\u6D88"
						)
					),
					result.map(function (result) {
						i++;
						return React.createElement(
							"li",
							{ key: i },
							React.createElement(
								"span",
								null,
								result.batid
							),
							React.createElement(
								"span",
								{ className: "item_name" },
								ajaxgetitemname(result.itemid)
							),
							React.createElement(
								"span",
								{ className: "tea_name" },
								ajaxgetteaname(result.teaid)
							),
							React.createElement(
								"span",
								null,
								result.laboratory
							),
							React.createElement(
								"span",
								null,
								result.date
							),
							React.createElement(
								"span",
								null,
								result.segmentation
							),
							React.createElement(
								"span",
								{ className: "checkstu", onClick: event => {
										event.stopPropagation(), this.checkstu(result.batid);
									} },
								"\u67E5\u770B\u9884\u7EA6\u5B66\u751F"
							),
							React.createElement(
								"span",
								{ className: "checkstu", onClick: event => {
										event.stopPropagation(), this.cancel(result.batid);
									} },
								"\u53D6\u6D88"
							)
						);
					}.bind(this))
				)
			);
		}
	});

	//教师管理-获取预约该项目批次的学生
	var TeaGetstu = React.createClass({
		displayName: "TeaGetstu",

		getInitialState: function () {
			return {
				result: []
			};
		},
		ajaxchange: function (data) {
			//ajax转化 将data中部分信息提取出来渲染到页面中
			var result = data.data.recordList;
			//console.log(result);
			this.state.result = result;
		},
		enterstu: function (batid, numid, grade) {
			//点击跳转至录入成绩界面
			ReactDOM.render(React.createElement(TeacherStuinfo, { numid: numid, batid: batid, grade: grade }), document.getElementById("info_teacher"));
		},
		render: function () {
			this.ajaxchange(this.props.data);
			var result = this.state.result;
			//console.log(result);
			var i = -1;
			return React.createElement(
				"div",
				{ id: "TeaGetstu" },
				React.createElement(
					"div",
					{ className: "title" },
					"\u9884\u7EA6\u8BE5\u9879\u76EE\u6279\u6B21\u7684\u5B66\u751F"
				),
				React.createElement(
					"ul",
					{ className: "admin_infor" },
					React.createElement(
						"li",
						{ key: i },
						React.createElement(
							"span",
							null,
							"\u59D3\u540D"
						),
						React.createElement(
							"span",
							null,
							"\u5B66\u53F7"
						),
						React.createElement(
							"span",
							null,
							"\u6027\u522B"
						),
						React.createElement(
							"span",
							null,
							"\u5E74\u7EA7"
						),
						React.createElement(
							"span",
							null,
							"\u4E13\u4E1A"
						),
						React.createElement(
							"span",
							null,
							"\u6210\u7EE9"
						)
					),
					result.map(function (result) {
						i++;
						return React.createElement(
							"li",
							{ key: i },
							React.createElement(
								"span",
								null,
								result.name
							),
							React.createElement(
								"span",
								null,
								result.username
							),
							React.createElement(
								"span",
								null,
								result.sex == "0" ? "男" : "女"
							),
							React.createElement(
								"span",
								null,
								result.specialization
							),
							React.createElement(
								"span",
								null,
								result.grade
							),
							React.createElement(
								"span",
								{ className: "enterstu", onClick: event => {
										event.stopPropagation(), this.enterstu(this.props.batid, result.numid, result.grade);
									} },
								"\u5F55\u5165\u6210\u7EE9"
							)
						);
					}.bind(this))
				)
			);
		}
	});
	//教师管理-录入学生成绩
	var TeacherStuinfo = React.createClass({
		displayName: "TeacherStuinfo",

		addclick: function () {
			//发送获取成绩请求获取成绩id
			$.ajax({
				url: "http://yiranblade.cn/lbms/test/" + $(".write_batid").val() + "&" + $(".write_numid").val(),
				type: "GET",
				dataType: "json",
				success: function (data) {
					if (data.code == "200") {
						var testid = data.data.testid;
						//console.log(testid);
						var Stuinfo = {
							testid: testid,
							batid: $(".write_batid").val(),
							numid: $(".write_numid").val(),
							grade: $(".write_grade").val(),
							results: $(".write_results").val()
						};
						//console.log(JSON.stringify(Stuinfo));
						$.ajax({
							url: "http://yiranblade.cn/lbms/test",
							type: "PUT",
							dataType: "json",
							"contentType": "application/json",
							data: JSON.stringify(Stuinfo),
							success: function (data) {
								if (data.code == "200") {
									alert("录入添加 , 信息已保存");
								} else {
									alert("录入失败");
								}
							}
						});
					} else {
						alert("录入失败,原因可能为 该学生没有预约您的实验 或 您的试验中没有此项");
					}
				},
				error: function () {
					alert("信息不存在");
				}
			});
		},
		render: function () {
			return React.createElement(
				"div",
				{ id: "TeacherStuinfo" },
				React.createElement(
					"div",
					{ className: "title" },
					"\u5F55\u5165\u5B66\u751F\u6210\u7EE9\u4FE1\u606F"
				),
				React.createElement(
					"ul",
					{ className: "teacher_infor" },
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u6279\u6B21\u7F16\u53F7 :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_batid", value: this.props.batid })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u5B66\u53F7 :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_numid", value: this.props.numid })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u73ED\u7EA7 :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_grade", value: this.props.grade })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u5206\u6570 :"
						),
						React.createElement("input", { type: "text", name: "write_in", className: "write_results" })
					)
				),
				React.createElement("input", { type: "button", name: "entering", value: "\u5F55\u5165", className: "entering", onClick: this.addclick })
			);
		}
	});
	//教师管理-成绩统计
	var TeacherGrade = React.createClass({
		displayName: "TeacherGrade",

		getInitialState: function () {
			return {
				result: []
			};
		},
		ajaxchange: function (data) {
			//ajax转化 将data中部分信息提取出来渲染到页面中
			var result = data.data.recordList;
			//console.log(result);
			this.state.result = result;
		},
		getstu: function (batid, value, e) {
			//	console.log(value);
			console.log(e.target.parentNode.className);
			let li = e.target.parentNode.firstChild.value; //获取父元素的第一个子元素的input值;
			console.log(li);
			$.ajax({
				url: "http://yiranblade.cn/lbms/test/suminformation/" + li + "/" + batid,
				type: "GET",
				dataType: "json",
				async: false,
				success: function (data) {
					if (data.code == "200") {
						console.log(data);
						alert("本班级平均分：" + data.data.average + "\n最高分：" + data.data.high + "\n最低分：" + data.data.low);
					} else {
						alert("获取失败，有可能是您的信息输入错误");
					}
				}
			});
		},
		render: function () {
			this.ajaxchange(this.props.data);
			var result = this.state.result;
			//	console.log(result);
			var i = -1;
			return React.createElement(
				"div",
				{ id: "TeacherGrade" },
				React.createElement(
					"div",
					{ className: "title" },
					"\u6210\u7EE9\u7EDF\u8BA1"
				),
				React.createElement(
					"ul",
					{ className: "admin_infor" },
					React.createElement(
						"li",
						{ key: i },
						React.createElement(
							"span",
							null,
							"\u73ED\u7EA7"
						),
						React.createElement(
							"span",
							null,
							"\u5B9E\u9A8C\u540D\u79F0"
						),
						React.createElement(
							"span",
							null,
							"\u83B7\u53D6\u6210\u7EE9"
						)
					),
					result.map(function (result) {
						i++;
						return React.createElement(
							"li",
							{ key: i, className: i },
							React.createElement("input", { type: "text", name: "write_in", className: "inputclass" }),
							React.createElement(
								"span",
								null,
								ajaxgetitemname(result.itemid)
							),
							React.createElement(
								"span",
								{ className: "getgrade", onClick: event => {
										event.stopPropagation(), this.getstu(result.batid, $(".inputclass").val(), event);
									} },
								"\u83B7\u53D6\u6210\u7EE9\u4FE1\u606F"
							)
						);
					}.bind(this))
				)
			);
		}
	});

	//教师管理-个人信息
	var TeacherTea = React.createClass({
		displayName: "TeacherTea",

		getInitialState: function () {
			return {
				result: []
			};
		},
		ajaxchange: function (data) {
			//ajax转化 将data中部分信息提取出来渲染到页面中
			var result = data.data;
			this.state.result = result;
		},
		reviseclick: function (noticeid, content) {
			//点击修改跳转至修改页面
			ReactDOM.render(React.createElement(AdminReteainfo, { noticeid: noticeid, content: content }), document.getElementById("info_admin"));
		},
		changeclick: function () {
			//点击跳转至修改密码页面
			ReactDOM.render(React.createElement(Teacherpassword, null), document.getElementById("info_teacher"));
		},
		render: function () {
			this.ajaxchange(this.props.data);
			var result = this.state.result;
			//console.log(result);
			return React.createElement(
				"div",
				{ id: "TeacherTea" },
				React.createElement(
					"div",
					{ className: "title" },
					"\u4E2A\u4EBA\u4FE1\u606F"
				),
				React.createElement(
					"ul",
					{ className: "teacher_infor" },
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u5DE5\u53F7 :"
						),
						React.createElement(
							"span",
							null,
							result.username
						)
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u59D3\u540D :"
						),
						React.createElement(
							"span",
							null,
							result.name
						)
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u6027\u522B :"
						),
						React.createElement(
							"span",
							null,
							result.sex == "0" ? "男" : "女"
						)
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u9662\u7CFB :"
						),
						React.createElement(
							"span",
							null,
							result.title
						)
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u5B66\u4F4D :"
						),
						React.createElement(
							"span",
							null,
							result.education
						)
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							null,
							"\u8054\u7CFB\u65B9\u5F0F :"
						),
						React.createElement(
							"span",
							null,
							result.contact
						)
					)
				),
				React.createElement("input", { type: "button", name: "entering", value: "\u4FEE\u6539\u5BC6\u7801", className: "entering", onClick: this.changeclick })
			);
		}
	});

	//教师管理-修改密码
	var Teacherpassword = React.createClass({
		displayName: "Teacherpassword",

		getInitialState: function () {
			return {
				result: []
			};
		},
		ajaxchange: function (data) {
			//ajax转化 将data中部分信息提取出来渲染到页面中
			var result = data;
			this.state.result = result;
		},
		changeclick: function () {
			var admin = {
				password: $(".write_password").val(),
				teaId: username
			};
			//console.log(admin);
			$.ajax({
				url: "http://yiranblade.cn/lbms/cipher/teacher",
				type: "POST",
				dataType: "json",
				data: admin,
				success: function (data) {
					if (data.code == "200") {
						alert("修改成功 , 信息已保存");
					} else {
						alert("修改失败");
					}
				}
			});
		},
		render: function () {
			this.ajaxchange(this.props.data);
			var result = this.state.result;
			//console.log(result);
			var i = -1;
			return React.createElement(
				"div",
				{ id: "Teacherpassword" },
				React.createElement(
					"div",
					{ className: "title" },
					"\u4FEE\u6539\u5BC6\u7801"
				),
				React.createElement(
					"div",
					{ id: "information" },
					React.createElement(
						"ul",
						{ className: "student_infor" },
						React.createElement(
							"li",
							null,
							React.createElement(
								"span",
								null,
								"\u65B0\u5BC6\u7801 :"
							),
							React.createElement("input", { type: "text", name: "write_in", className: "write_password" })
						)
					),
					React.createElement("input", { type: "button", name: "entering", value: "\u4FEE\u6539", className: "entering", onClick: this.changeclick })
				)
			);
		}
	});
	//教师管理-所有项目批次管理
	var TeaTestdis = React.createClass({
		displayName: "TeaTestdis",

		getInitialState: function () {
			return {
				result: []
			};
		},
		ajaxchange: function (data) {
			//ajax转化 将data中部分信息提取出来渲染到页面中
			var result = data.data.recordList;
			this.state.result = result;
			//	console.log(result);
		},
		deleteclick: function (batid) {
			//点击预约跳出窗口询问是否预约
			//console.log(e.target.textContent);
			if (confirm("确认预约吗？")) {
				$.ajax({
					url: "http://yiranblade.cn/lbms/teacher/make/" + username + "/" + batid,
					type: "GET",
					dataType: "json",
					success: function (data) {
						if (data.code == "200") {
							alert("预约成功");
							location.reload(true);
						} else {
							alert("预约失败");
						}
					}
				});
			}
		},
		componentDidMount: function () {
			var ul = this.refs.admin_infor; //获取dom节点
			lis = ul.childNodes;
			//	console.log(lis);
			for (var i = 0; i < lis.length - 1; i++) {
				var tag = 0;
				for (var j = 0; j < lis.length; j++) {
					if (lis[i + 1].firstChild.innerHTML == lis[j].firstChild.innerHTML) tag++;
				}
				if (tag == 1) {
					lis[i + 1].lastChild.style.display = "none";
				}
				if (lis[i].firstChild.innerHTML == lis[i + 1].firstChild.innerHTML) {
					lis[i + 1].lastChild.style.display = "none";
					lis[i + 1].style.display = "none";
				}
			}
		},
		appear: function (e) {
			var tag = 0;
			if (e.target.src.indexOf("appear") != -1) {
				var target = e.target.parentNode; //获取当前点击的li
				var ul = this.refs.admin_infor; //获取dom节点
				lis = ul.childNodes;
				e.target.src = "build/img/close.png";

				for (var i = 0; i < lis.length - 1; i++) {
					if (target.firstChild.innerHTML == lis[i].firstChild.innerHTML) {
						lis[i + 1].style.display = "block";
					}
				}
			} else {
				var target = e.target.parentNode; //获取当前点击的li
				var ul = this.refs.admin_infor; //获取dom节点
				lis = ul.childNodes;
				e.target.src = "build/img/appear.png";

				for (var i = 0; i < lis.length - 1; i++) {
					if (target.firstChild.innerHTML == lis[i].firstChild.innerHTML) {
						lis[i + 1].style.display = "none";
						if (target.firstChild.innerHTML != lis[i + 1].firstChild.innerHTML) {
							for (var j = 0; j < lis.length; j++) {
								if (lis[i + 1].firstChild.innerHTML == lis[j].firstChild.innerHTML) tag++;
							}
							if (tag == 1) {
								lis[i + 1].lastChild.style.display = "none";
							}
							lis[i + 1].style.display = "block";
						}
					}
				}
			}
		},
		render: function () {
			this.ajaxchange(this.props.data);
			var result = this.state.result;
			var i = -1;
			return React.createElement(
				"div",
				{ id: "TeaTestdis" },
				React.createElement(
					"div",
					{ className: "title" },
					"\u6240\u6709\u53EF\u4FEE\u6539\u9879\u76EE\u6279\u6B21"
				),
				React.createElement(
					"h4",
					null,
					"\u8FD9\u91CC\u662F\u5168\u90E8\u53EF\u4FEE\u6539\u9879\u76EE\u6279\u6B21:"
				),
				React.createElement(
					"ul",
					{ className: "admin_infor", ref: "admin_infor" },
					React.createElement(
						"li",
						null,
						React.createElement(
							"span",
							{ className: "it_name" },
							"\u5B9E\u9A8C\u540D\u79F0"
						),
						React.createElement(
							"span",
							null,
							"\u6279\u6B21\u7F16\u53F7"
						),
						React.createElement(
							"span",
							null,
							"\u5B9E\u9A8C\u5730\u70B9"
						),
						React.createElement(
							"span",
							null,
							"\u5B9E\u9A8C\u65E5\u671F"
						),
						React.createElement(
							"span",
							null,
							"\u8282\u6B21"
						),
						React.createElement(
							"span",
							{ className: "stu_del" },
							"\u9884\u7EA6"
						)
					),
					result.map(function (result) {
						i++;
						return React.createElement(
							"li",
							{ key: i },
							React.createElement(
								"span",
								{ className: "item_name" },
								ajaxgetitemname(result.itemid)
							),
							React.createElement(
								"span",
								null,
								result.batid
							),
							React.createElement(
								"span",
								null,
								result.laboratory
							),
							React.createElement(
								"span",
								null,
								result.date
							),
							React.createElement(
								"span",
								null,
								result.segmentation
							),
							React.createElement(
								"span",
								{ onClick: event => {
										event.stopPropagation(), this.deleteclick(result.batid);
									}, className: "stu_delete" },
								"\u9884\u7EA6"
							),
							React.createElement("img", { src: "build/img/appear.png", id: "tu", onClick: event => {
									event.stopPropagation(), this.appear(event);
								} })
						);
					}.bind(this))
				)
			);
		}
	});
	$(".teacher_tea").click(function () {
		$.ajax({
			url: "http://yiranblade.cn/lbms/teacher/" + username,
			type: "GET",
			dataType: "json",
			success: function (data) {
				if (data.code == "200") {
					ReactDOM.render(React.createElement(TeacherTea, { data: data }), document.getElementById("info_teacher"));
				} else {
					alert("no");
				}
			}
		});
	});
	$(".teacher_grade").click(function () {
		$.ajax({
			url: "http://yiranblade.cn/lbms/batch/teacher/" + username + "&1",
			type: "GET",
			dataType: "json",
			success: function (data) {
				if (data.code == "200") {
					ReactDOM.render(React.createElement(TeacherGrade, { data: data }), document.getElementById("info_teacher"));
				} else {
					//console.log(data.data);
					alert("no");
				}
			}
		});
	});
	$(".teacher_stuinfo").click(function () {
		ReactDOM.render(React.createElement(TeacherStuinfo, null), document.getElementById("info_teacher"));
	});
	$(".teacher_test").click(function () {
		$.ajax({
			url: "http://yiranblade.cn/lbms/batch/teacher/" + username + "&1",
			type: "GET",
			dataType: "json",
			success: function (data) {
				if (data.code == "200") {
					ReactDOM.render(React.createElement(TeacherTest, { data: data }), document.getElementById("info_teacher"));
				} else {
					//console.log(data.data);
					alert("no");
				}
			}
		});
	});
	$(".teacher_testall").click(function () {
		$.ajax({
			url: "http://yiranblade.cn/lbms/teacher/ordered",
			type: "GET",
			dataType: "json",
			success: function (data) {
				if (data.code == "200") {
					//console.log(data);
					ReactDOM.render(React.createElement(TeaTestdis, { data: data }), document.getElementById("info_teacher"));
				} else {
					alert("no");
				}
			}
		});
	});

	var Classinfo = React.createClass({
		displayName: "Classinfo",

		render: function () {
			return React.createElement(
				"div",
				{ id: "Classinfor" },
				React.createElement(
					"section",
					{ id: "classinfor", style: { marginTop: 10 + "px" } },
					React.createElement(
						"div",
						{ className: "classinfor_info" },
						React.createElement(
							"h3",
							null,
							React.createElement(
								"span",
								null,
								"\u4EE3\u8BFE\u6559\u5E08\uFF1A\u54C8\u54C8"
							),
							" ",
							React.createElement(
								"span",
								null,
								"\u5BB9\u7EB3\u4EBA\u6570\uFF1A30"
							)
						),
						React.createElement(
							"h4",
							null,
							"\u7814\u7A76\u65B9\u5411\uFF1A\u5D4C\u5165\u5F0F\u5355\u7247\u673A"
						),
						React.createElement(
							"p",
							null,
							"\u590D\u65E6\u5927\u5B66\u5E94\u7528\u8868\u9762\u7269\u7406\u56FD\u5BB6\u91CD\u70B9\u5B9E\u9A8C\u5BA4\u662F\u7531\u6211\u56FD\u8457\u540D\u7269\u7406\u5B66\u5BB6\u8C22\u5E0C\u5FB7\u5148\u751F\u4EB2\u81EA\u5021\u5BFC\u5EFA\u7ACB\u7684\u5B9E\u9A8C\u5BA4,\u4E8E1989\u5E74\u5E95\u901A\u8FC7\u56FD\u5BB6\u8BA1\u59D4\u7EC4\u7EC7\u7684\u4E13\u5BB6\u8BBA\u8BC1,1990\u5E74\u5F00\u59CB\u7B79\u5EFA,1992\u5E7412...\u590D\u65E6\u5927\u5B66\u5E94\u7528\u8868\u9762\u7269\u7406\u56FD\u5BB6\u91CD\u70B9\u5B9E\u9A8C\u5BA4\u662F\u7531\u6211\u56FD\u8457\u540D\u7269\u7406\u5B66\u5BB6\u8C22\u5E0C\u5FB7\u5148\u751F\u4EB2\u81EA\u5021\u5BFC\u5EFA\u7ACB\u7684\u5B9E\u9A8C\u5BA4,\u4E8E1989\u5E74\u5E95\u901A\u8FC7\u56FD\u5BB6\u8BA1\u59D4\u7EC4\u7EC7\u7684\u4E13\u5BB6\u8BBA\u8BC1,1990\u5E74\u5F00\u59CB\u7B79\u5EFA,1992\u5E7412...\u590D\u65E6\u5927\u5B66\u5E94\u7528\u8868\u9762\u7269\u7406\u56FD\u5BB6\u91CD\u70B9\u5B9E\u9A8C\u5BA4\u662F\u7531\u6211\u56FD\u8457\u540D\u7269\u7406\u5B66\u5BB6\u8C22\u5E0C\u5FB7\u5148\u751F\u4EB2\u81EA\u5021\u5BFC\u5EFA\u7ACB\u7684\u5B9E\u9A8C\u5BA4,\u4E8E1989\u5E74\u5E95\u901A\u8FC7\u56FD\u5BB6\u8BA1\u59D4\u7EC4\u7EC7\u7684\u4E13\u5BB6\u8BBA\u8BC1,1990\u5E74\u5F00\u59CB\u7B79\u5EFA,1992\u5E7412..."
						)
					),
					React.createElement(
						"div",
						{ className: "classinfor_info" },
						React.createElement(
							"h3",
							null,
							React.createElement(
								"span",
								null,
								"\u4EE3\u8BFE\u6559\u5E08\uFF1A\u54C8\u54C8"
							),
							" ",
							React.createElement(
								"span",
								null,
								"\u5BB9\u7EB3\u4EBA\u6570\uFF1A30"
							)
						),
						React.createElement(
							"h4",
							null,
							"\u7814\u7A76\u65B9\u5411\uFF1A\u5D4C\u5165\u5F0F\u5355\u7247\u673A"
						),
						React.createElement(
							"p",
							null,
							"\u590D\u65E6\u5927\u5B66\u5E94\u7528\u8868\u9762\u7269\u7406\u56FD\u5BB6\u91CD\u70B9\u5B9E\u9A8C\u5BA4\u662F\u7531\u6211\u56FD\u8457\u540D\u7269\u7406\u5B66\u5BB6\u8C22\u5E0C\u5FB7\u5148\u751F\u4EB2\u81EA\u5021\u5BFC\u5EFA\u7ACB\u7684\u5B9E\u9A8C\u5BA4,\u4E8E1989\u5E74\u5E95\u901A\u8FC7\u56FD\u5BB6\u8BA1\u59D4\u7EC4\u7EC7\u7684\u4E13\u5BB6\u8BBA\u8BC1,1990\u5E74\u5F00\u59CB\u7B79\u5EFA,1992\u5E7412...\u590D\u65E6\u5927\u5B66\u5E94\u7528\u8868\u9762\u7269\u7406\u56FD\u5BB6\u91CD\u70B9\u5B9E\u9A8C\u5BA4\u662F\u7531\u6211\u56FD\u8457\u540D\u7269\u7406\u5B66\u5BB6\u8C22\u5E0C\u5FB7\u5148\u751F\u4EB2\u81EA\u5021\u5BFC\u5EFA\u7ACB\u7684\u5B9E\u9A8C\u5BA4,\u4E8E1989\u5E74\u5E95\u901A\u8FC7\u56FD\u5BB6\u8BA1\u59D4\u7EC4\u7EC7\u7684\u4E13\u5BB6\u8BBA\u8BC1,1990\u5E74\u5F00\u59CB\u7B79\u5EFA,1992\u5E7412...\u590D\u65E6\u5927\u5B66\u5E94\u7528\u8868\u9762\u7269\u7406\u56FD\u5BB6\u91CD\u70B9\u5B9E\u9A8C\u5BA4\u662F\u7531\u6211\u56FD\u8457\u540D\u7269\u7406\u5B66\u5BB6\u8C22\u5E0C\u5FB7\u5148\u751F\u4EB2\u81EA\u5021\u5BFC\u5EFA\u7ACB\u7684\u5B9E\u9A8C\u5BA4,\u4E8E1989\u5E74\u5E95\u901A\u8FC7\u56FD\u5BB6\u8BA1\u59D4\u7EC4\u7EC7\u7684\u4E13\u5BB6\u8BBA\u8BC1,1990\u5E74\u5F00\u59CB\u7B79\u5EFA,1992\u5E7412..."
						)
					),
					React.createElement(
						"div",
						{ className: "classinfor_info" },
						React.createElement(
							"h3",
							null,
							React.createElement(
								"span",
								null,
								"\u4EE3\u8BFE\u6559\u5E08\uFF1A\u54C8\u54C8"
							),
							" ",
							React.createElement(
								"span",
								null,
								"\u5BB9\u7EB3\u4EBA\u6570\uFF1A30"
							)
						),
						React.createElement(
							"h4",
							null,
							"\u7814\u7A76\u65B9\u5411\uFF1A\u5D4C\u5165\u5F0F\u5355\u7247\u673A"
						),
						React.createElement(
							"p",
							null,
							"\u590D\u65E6\u5927\u5B66\u5E94\u7528\u8868\u9762\u7269\u7406\u56FD\u5BB6\u91CD\u70B9\u5B9E\u9A8C\u5BA4\u662F\u7531\u6211\u56FD\u8457\u540D\u7269\u7406\u5B66\u5BB6\u8C22\u5E0C\u5FB7\u5148\u751F\u4EB2\u81EA\u5021\u5BFC\u5EFA\u7ACB\u7684\u5B9E\u9A8C\u5BA4,\u4E8E1989\u5E74\u5E95\u901A\u8FC7\u56FD\u5BB6\u8BA1\u59D4\u7EC4\u7EC7\u7684\u4E13\u5BB6\u8BBA\u8BC1,1990\u5E74\u5F00\u59CB\u7B79\u5EFA,1992\u5E7412...\u590D\u65E6\u5927\u5B66\u5E94\u7528\u8868\u9762\u7269\u7406\u56FD\u5BB6\u91CD\u70B9\u5B9E\u9A8C\u5BA4\u662F\u7531\u6211\u56FD\u8457\u540D\u7269\u7406\u5B66\u5BB6\u8C22\u5E0C\u5FB7\u5148\u751F\u4EB2\u81EA\u5021\u5BFC\u5EFA\u7ACB\u7684\u5B9E\u9A8C\u5BA4,\u4E8E1989\u5E74\u5E95\u901A\u8FC7\u56FD\u5BB6\u8BA1\u59D4\u7EC4\u7EC7\u7684\u4E13\u5BB6\u8BBA\u8BC1,1990\u5E74\u5F00\u59CB\u7B79\u5EFA,1992\u5E7412...\u590D\u65E6\u5927\u5B66\u5E94\u7528\u8868\u9762\u7269\u7406\u56FD\u5BB6\u91CD\u70B9\u5B9E\u9A8C\u5BA4\u662F\u7531\u6211\u56FD\u8457\u540D\u7269\u7406\u5B66\u5BB6\u8C22\u5E0C\u5FB7\u5148\u751F\u4EB2\u81EA\u5021\u5BFC\u5EFA\u7ACB\u7684\u5B9E\u9A8C\u5BA4,\u4E8E1989\u5E74\u5E95\u901A\u8FC7\u56FD\u5BB6\u8BA1\u59D4\u7EC4\u7EC7\u7684\u4E13\u5BB6\u8BBA\u8BC1,1990\u5E74\u5F00\u59CB\u7B79\u5EFA,1992\u5E7412..."
						)
					),
					React.createElement(
						"div",
						{ className: "classinfor_info" },
						React.createElement(
							"h3",
							null,
							React.createElement(
								"span",
								null,
								"\u4EE3\u8BFE\u6559\u5E08\uFF1A\u54C8\u54C8"
							),
							" ",
							React.createElement(
								"span",
								null,
								"\u5BB9\u7EB3\u4EBA\u6570\uFF1A30"
							)
						),
						React.createElement(
							"h4",
							null,
							"\u7814\u7A76\u65B9\u5411\uFF1A\u5D4C\u5165\u5F0F\u5355\u7247\u673A"
						),
						React.createElement(
							"p",
							null,
							"\u590D\u65E6\u5927\u5B66\u5E94\u7528\u8868\u9762\u7269\u7406\u56FD\u5BB6\u91CD\u70B9\u5B9E\u9A8C\u5BA4\u662F\u7531\u6211\u56FD\u8457\u540D\u7269\u7406\u5B66\u5BB6\u8C22\u5E0C\u5FB7\u5148\u751F\u4EB2\u81EA\u5021\u5BFC\u5EFA\u7ACB\u7684\u5B9E\u9A8C\u5BA4,\u4E8E1989\u5E74\u5E95\u901A\u8FC7\u56FD\u5BB6\u8BA1\u59D4\u7EC4\u7EC7\u7684\u4E13\u5BB6\u8BBA\u8BC1,1990\u5E74\u5F00\u59CB\u7B79\u5EFA,1992\u5E7412...\u590D\u65E6\u5927\u5B66\u5E94\u7528\u8868\u9762\u7269\u7406\u56FD\u5BB6\u91CD\u70B9\u5B9E\u9A8C\u5BA4\u662F\u7531\u6211\u56FD\u8457\u540D\u7269\u7406\u5B66\u5BB6\u8C22\u5E0C\u5FB7\u5148\u751F\u4EB2\u81EA\u5021\u5BFC\u5EFA\u7ACB\u7684\u5B9E\u9A8C\u5BA4,\u4E8E1989\u5E74\u5E95\u901A\u8FC7\u56FD\u5BB6\u8BA1\u59D4\u7EC4\u7EC7\u7684\u4E13\u5BB6\u8BBA\u8BC1,1990\u5E74\u5F00\u59CB\u7B79\u5EFA,1992\u5E7412...\u590D\u65E6\u5927\u5B66\u5E94\u7528\u8868\u9762\u7269\u7406\u56FD\u5BB6\u91CD\u70B9\u5B9E\u9A8C\u5BA4\u662F\u7531\u6211\u56FD\u8457\u540D\u7269\u7406\u5B66\u5BB6\u8C22\u5E0C\u5FB7\u5148\u751F\u4EB2\u81EA\u5021\u5BFC\u5EFA\u7ACB\u7684\u5B9E\u9A8C\u5BA4,\u4E8E1989\u5E74\u5E95\u901A\u8FC7\u56FD\u5BB6\u8BA1\u59D4\u7EC4\u7EC7\u7684\u4E13\u5BB6\u8BBA\u8BC1,1990\u5E74\u5F00\u59CB\u7B79\u5EFA,1992\u5E7412..."
						)
					)
				)
			);
		}
	});
	//实验室信息
	$(".teacher_class").click(function () {
		ReactDOM.render(React.createElement(Classinfo, null), document.getElementById("info_teacher"));
	});
	$(".stuent_class").click(function () {
		ReactDOM.render(React.createElement(Classinfo, null), document.getElementById("info_student"));
	});
})();