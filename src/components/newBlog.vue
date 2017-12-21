<template>
	<el-main id="blogDetail">
		
		
		
		<img :src="detail.img" id="imgpath">
		
		<el-input :value="detail.img"  placeholder="图片路径" @input="changeImg" class="imgInput"></el-input>
		
		<el-input :value="detail.title" placeholder="标题" @input="changeTitle" class="imgInput"></el-input>
		
		<el-input :value="detail.label" @input="changeLabel" placeholder="标签" class="imgInput"></el-input>
		
		<hgroup id="tagList">
			<span v-for="(val) in this.$store.state.blog.tagList" v-on:click="setLabel">{{val.labelling}}</span>
		</hgroup>

		<textarea id="editor" placeholder="Balabala" autofocus></textarea>
		
		<el-radio-group :value="detail.classify" @input="changeClassify" size="small" id="checkbox">
		     <el-radio-button label="1">前端</el-radio-button>
		     <el-radio-button label="2">后端</el-radio-button>
		     <el-radio-button label="3">服务端</el-radio-button>
		     <el-radio-button label="4">数据库</el-radio-button>
    	</el-radio-group>

		<el-button type="primary" size="small" @click="submit">提交</el-button>
		<el-button type="warning" size="small" @click="xiugai">修改</el-button>
		
		

		
	</el-main>

</template>


<script>

	import $ from 'jquery'
	import Simditor from 'simditor'
	import '../css/simditor.css'

	import {mapGetters,mapMutations} from 'vuex'

	
	
	export default{
		data(){
			return{
				editor:null,
				

			}
		},

		computed:{
			detail(){
				return this.$store.getters.detail
			}
		},

		mounted(){

			let that = this;

			this.editor = new Simditor({
			  textarea: $('#editor'),
			  toolbar:['title','bold','italic','underline','strikethrough','fontScale','color','ol','ul','blockquote','code','link','image','hr','alignment'],
			  
			});

			

			this.$store.dispatch('getDetail',[this.$route.params.id,this.editor])
          	this.$store.dispatch('getTagList')





			
			

			this.editor.on('valuechanged',function(){
				that.$store.commit('changeCenter',this.getValue())

			})
		},

		methods:{
			/*getDetail(){
				//console.log(this.$route.params.id)
				this.$http.post(
					'/index/Article/adminArticle',
					{id:this.$route.params.id},
					{emulateJSON:true}
				).then(function(res){

					this.title = res.data.Title;
					this.id = res.data.id;
					this.img = res.data.img;
					this.center = res.data.center;
					this.label = res.data.labelling;
					this.classify = res.data.classify;
					this.editor.setValue(this.center)

				},function(res){
					console.log(res)

				})
			},*/

			setLabel(e){
				this.$store.commit('changeLabel',e.target.innerHTML)
			},


			xiugai(){
				console.log(this.$store.state.blog.detail)
			},

			changeImg(e){
				this.$store.commit('changeImg',e)
			},

			changeTitle(e){
				this.$store.commit('changeTitle',e)
			},

			changeClassify(e){
				this.$store.commit('changeClassify',e)
				
			},

			changeLabel(e){
				this.$store.commit('changeLabel',e)
			},


			submit(){

				this.$http.post(
					'/index/Article/addArticle',
					{	

						title:this.detail.title,
						class:this.detail.classify,
						label:this.detail.label,
						center:this.detail.center,
						img:this.detail.img,
					},
					{emulateJSON:true}
				).then(function(res){
					console.log(res.data)
				},function(res){
					console.log(res.data)
				})
			}

			

		},

		

		


		



	}

</script>



<style lang="less" scoped>
	#blogDetail{
		

		#imgpath{
			width:50%;
			display:block;
		}

		.imgInput{
			display:block;
			margin:25px 0;
		}

		#tagList{
			//background:red;
			font-size:14px;
			color:#333;


			span{
				background:#eee;
				padding:4px 10px;
				margin:4px 6px;
				border-radius: 4px;
				cursor: pointer;
				display:inline-block;
			}
		}

		#checkbox{
			display:block;
			margin:10px 0;
			
		}



		#editor{

		}
	}

</style>