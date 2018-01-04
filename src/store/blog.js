
import Vue from 'vue'
import {Message,MessageBox} from 'element-ui'


const state = {
	
	Page:1,
	bloglist:null,

	tagList:null,

	blogTotal:null,
	search:null,
	detail:{
		title:null,
		label:null,
		img:null,
		center:null,
		classify:null,
		id:null,
	},

	detailLength:null,
	nowLength:null,
	

	

	
		
};


const actions = {

	//获取列表数据
	getListData:({commit},params)=>{
		
		Vue.http.post(
			'/index/Article/ArticleList',
			{class:params},
			{emulateJSON:true}
		).then(function(res){
			commit('currentPageResize');
			commit('add',res.data)

		},function(res){
			console.log(res);
			Message({
				message:'网络错误，请重新刷新',
				type:'error',
				center:true,
				duration:0,
				showClose:true

			})

		})
	},


	//搜索
	search({commit},router){

		if(state.search == '' || state.search == null){
			MessageBox.alert('请输入内容','反馈',{
						confirmButtonText: '确定',
					})
			return false;
		}else{
			Vue.http.post(
			'/index/Article/ArticleList',
			{title:state.search},
			{emulateJSON:true}
		).then(function(res){
			router.push({ name: 'bloglist',params: { list:'search' } });
			commit('add',res.data);
			commit('currentPageResize');

		},function(res){
			console.log(res);
			Message({
				message:'网络错误，请重新刷新',
				type:'error',
				center:true,
				duration:0,
				showClose:true

			})

		})
		}
		

	},


	//登录
	login:({commit},params)=>{
		Vue.http.post(
				'/index/Login/Login',
				{kuser:params.user,kpwd:params.password},
				{emulateJSON:true}
			).then(function(res){
				if(res.data === 200){
					sessionStorage.setItem("kongUserName",params.user);
					MessageBox.alert('登录成功','反馈',{
						confirmButtonText: '确定',
						callback:function(){
							
							params.router.push({ name:'DataBoard'});
						}
					})
				}else if(res.data === 201){
					MessageBox.alert('密码或用户名错误','反馈',{
						confirmButtonText: '确定',
					})
					return false;
				}	
			},function(res){
				alert('网络错误，请刷新后重试')
			})
	},


	//分页器获取分页列表
	changePage({commit},params){
		
		

		if(params.list=='search'){
			Vue.http.post(
				'/index/Article/ArticleList',
				{title:state.search,page:params.size},
				{emulateJSON:true}
			).then(function(res){
				commit('add',res.data)
			},function(res){
				
			})
			
		}else{
			Vue.http.post(
				'/index/Article/ArticleList',
				{class:params.list,page:params.size},
				{emulateJSON:true}
			).then(function(res){
				commit('add',res.data)
			},function(res){
				
			})
		}
		


		
	},

	//获取分类列表的总数
	getCount({commit},list){
		Vue.http.post(
			'/index/Article/ArticleCount',
			{class:list},
			{emulateJSON:true}
		).then(function(res){
			commit('blogTotal',res.data);

		},function(res){
			console.log(res)

		})
	},


	//获取所有标签列表
	getTagList:({commit})=>{
		Vue.http.post(
			'/index/Article/gainLabel',
			{emulateJSON:true}
		).then(function(res){
			commit('getTagList',res.data)

		},function(res){
			console.log(res)

		})
	},


	//获取详情列表
	getDetail:({commit},data) =>{
		
		if(data[0]==='newBlog'){
			commit('cleanDetail');
		}else{
			Vue.http.post(
			'/index/Article/adminArticle',
			{id:data[0]},
			{emulateJSON:true}
		).then(function(res){
		
			commit('getDetail',[res.data,data[1]])

		},function(res){
			console.log(res)

		})
		}
		
	},

	//删除操作
	deleteBlog:({commit},scope) =>{
			
		MessageBox.confirm('此操作将永久删除该文件, 是否继续?','提示',{
			confirmButtonText :'确定',
			cancelButtonText : '取消',
			type:'warning'
		}).then(function(){
			
			Vue.http.post(
				'/index/Article/delArticle',
				{id:scope.row.id},
				{emulateJSON:true}
			).then(function(res){
				
				
				if(res.data == 200){
					commit('deleteBlog',scope.$index)
				}else{
					Message({
						message:'网络错误请刷新后重试',
						type:'error',
						center:true
					})
				}
			

		},function(res){
			console.log(res.data)

		})


		}).catch(function(){
			return false;
		})
	},


	//提交修改博客
	xiugaiBlog({commit},router){
		
		commit('nowLength');
		
		var classify = this.getters.detail.classify;
		
		//判断下是否有修改过，没有就不提交
		if(state.nowLength === state.detailLength || this.getters.detail.title===''||  this.getters.detail.img==='' || this.getters.detail.label==='' || this.getters.detail.center ==='' ){
			
			MessageBox.alert('请完整填写内容或做出修改，没修改你保存个屁！','反馈',{
				confirmButtonText:'确定',
			});

			return false;
			
		}else{
			
			Vue.http.post(
			'/index/Article/addArticle',
			{	
				id:this.getters.detail.id,
				title:this.getters.detail.title,
				class:this.getters.detail.classify,
				label:this.getters.detail.label,
				center:this.getters.detail.center,
				img:this.getters.detail.img,
			},
			{emulateJSON:true}
			).then(function(res){
			if(res.data == 200){
				MessageBox.alert('修改成功','反馈',{
					confirmButtonText:'确定',
					callback:function(){
						router.push({ name: 'bloglist',params: { list:classify } })
						  
					}
				})
			}
			
			},function(res){
				console.log(res.data)
			});

		}

		
		
		
	},


	//详情页路由离开时验证
	testBeforeRouteLeave({commit},router){
		if(router.from.params.id =='newBlog'){
			if(this.getters.detail.title !==''||  this.getters.detail.img !=='' || this.getters.detail.label !=='' || this.getters.detail.center !=='' ){
				MessageBox.confirm('内容未保存，是否离开？','提示',{
					confirmButtonText :'确定',
					cancelButtonText : '取消',
					type:'warning'
				}).then(function(){
					router.next();
			
				}).catch(function(){
					return false;
				})
			}else{
				router.next();
			}
		}else{
			commit('nowLength');
			if(this.state.blog.nowLength!==this.state.blog.detailLength){
				MessageBox.confirm('内容未保存，是否离开？','提示',{
					confirmButtonText :'确定',
					cancelButtonText : '取消',
					type:'warning'
				}).then(function(){
					router.next();
			
				}).catch(function(){
					return false;
				})
			}else{
				router.next();

			}

		}
	},

	//添加博客
	submitBlog({dispatch,commit},router){
		
		

		var classify = this.getters.detail.classify;
		


		if(this.getters.detail.title===''||  this.getters.detail.img==='' || this.getters.detail.label==='' || this.getters.detail.center ==='' ){
			
			MessageBox.alert('没写内容你提交个屁啊！','反馈',{
				confirmButtonText:'确定',
			})
			return false;
		}else{
			Vue.http.post(
			'/index/Article/addArticle',
			{	
				title:this.getters.detail.title,
				class:this.getters.detail.classify,
				label:this.getters.detail.label,
				center:this.getters.detail.center,
				img:this.getters.detail.img,
			},
			{emulateJSON:true}
			).then(function(res){
				if(res.data == 200){
					
					MessageBox.alert('添加成功','反馈',{
						confirmButtonText:'确定',
						callback:function(){
							router.push({ name: 'bloglist',params: { list:classify } })
							  
						}
					})
				}
				
			},function(res){
				console.log(res.data)
			})
		}

		
	},

	
};



const mutations = {

	//添加列表内容
	add(state,data){
		
		state.bloglist = data.list;
		state.blogTotal = data.count.length;
		
		
	},

	//目前的博文所有字段长度
	nowLength(state){
		state.nowLength = this.getters.detail.title.length
					  	   + this.getters.detail.img.length
					       + this.getters.detail.label.length
					       + this.getters.detail.center.length;
	},

	//清除列表内容
	cleanBlogList(state){
		state.bloglist =null;
		console.log(state.bloglist)
	},

	//清除详情页所有内容
	cleanDetail(state){
		state.detail.title ='';
		state.detail.label ='';
		state.detail.img ='';
		state.detail.center ='';
		state.detail.classify =1;
		state.detail.id ='';
		state.detailLength = 0;
		

	},

	//修改blog总数
	blogTotal(state,data){
		state.blogTotal = data;
	},


	//获取所有标签
	getTagList(state,data){
		state.tagList = data
	},


	//获取详情内容
	getDetail(state,data){
		
		state.detail.title = data[0].Title;
		state.detail.label = data[0].labelling;
		state.detail.img = data[0].img;
		state.detail.center = data[0].center;
		state.detail.classify = data[0].classify;
		state.detail.id = data[0].id

		//setValue是把数据填充到富文本里，是富文本提供的函数
		data[1].setValue(state.detail.center)


		//获取标题，标签，图片，内容的长度
		var countLength = state.detail.title.length
						+ state.detail.label.length
						+ state.detail.img.length
						+ state.detail.center.length;
						
		state.detailLength = countLength
		
		



		Message({
				message:'详情博客获取成功',
				type:'success',
				center:true
			})
	},

	//修改img时改变state状态
	changeImg(state,message){

		state.detail.img = message

	},

	//修改title时改变state状态
	changeTitle(state,message){
		

		state.detail.title = message

		

	},

	//修改时改变state状态
	changeLabel(state,message){
		state.detail.label = message

	},

	//改变classify
	changeClassify(state,message){
		state.detail.classify = message;

	},


	changeCenter(state,message){
		state.detail.center = message;

	},


	//删除列表内的某条数据
	deleteBlog(state,index){
		state.bloglist.splice(index,1);
		Message({
				message:'删除成功',
				center:true
			})

	},


	//获取搜索输入内容
	searchChange(state,data){
		state.search = data;

	},

	//分页复位
	currentPageResize(state){
		state.Page = 1;
		
	},

	//分页改变，更改状态值
	currentPageChange(state,data){
		state.Page = data;
	}


	


	


	




	


	

	
};



const getters ={
	
	detail(state){
		
		return state.detail
	},

	blogTotal(state){
		return state.blogTotal;
	},

	currentPage(state){

		return state.Page;
	},

	search(state){
		return state.search;
	}


};



export default{
	state,
	actions,
	mutations,
	getters
}