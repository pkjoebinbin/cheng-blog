
import Vue from 'vue'
import {Message,MessageBox} from 'element-ui'


const state = {
	
	data:'test',
	bloglist:null,

	tagList:null,

	detail:{
		title:null,
		label:null,
		img:null,
		center:null,
		classify:null,
		id:null,
	},


	test:{
		content:'1111'
	}

	
		
};


const actions = {

	//获取列表数据
	getListData:({commit},params)=>{
		//console.log(params)
		Vue.http.post(
			'/index/Article/ArticleList',
			{class:params},
			{emulateJSON:true}
		).then(function(res){
			
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

		var classify = this.getters.detail.classify;
		
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
		})
	},

	//添加博客
	submitBlog({commit},router){
		
		var classify = this.getters.detail.classify;
		
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
};



const mutations = {

	//添加列表内容
	add(state,data){
		state.bloglist = data;
		console.log(state.bloglist)
		Message({
				message:'列表获取成功',
				type:'success',
				center:true
			})
	},

	//清除列表内容
	cleanBlogList(state){
		state.bloglist =null;
	},

	//清除详情页所有内容
	cleanDetail(state){
		state.detail.title ='';
		state.detail.label ='';
		state.detail.img ='';
		state.detail.center ='';
		state.detail.classify ='';
		state.detail.id ='';

	},


	//获取所有标签
	getTagList(state,data){
		state.tagList = data
	},


	//获取详情内容
	getDetail(state,data){
		console.log(data[1])
		
		
		state.detail.title = data[0].Title;
		state.detail.label = data[0].labelling;
		state.detail.img = data[0].img;
		state.detail.center = data[0].center;
		state.detail.classify = data[0].classify;
		state.detail.id = data[0].id
		data[1].setValue(state.detail.center)
		


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

	}


	


	




	


	

	
};



const getters ={
	
	detail(state){
		
		return state.detail
	},


};



export default{
	state,
	actions,
	mutations,
	getters
}