<template>
	<el-main id="blogDetail">
		
		
		
		<img :src="detail.img" id="imgpath">
		
		<el-input :value="detail.img"  placeholder="图片路径" @input="changeImg" class="imgInput"></el-input>
		
		<el-input :value="detail.title" placeholder="标题" @input="changeTitle" class="imgInput"></el-input>
		
		<el-input :value="detail.label" @input="changeLabel" placeholder="标签" class="imgInput"></el-input>
		
		<hgroup id="tagList">
			已有标签：<span v-for="(val) in this.$store.state.blog.tagList" v-on:click="setLabel">{{val.labelling}}</span>
		</hgroup>

		<textarea id="editor" placeholder="Balabala" autofocus></textarea>
		
		<el-radio-group :value="detail.classify" @input="changeClassify" size="small" id="checkbox">
		     <el-radio-button label="1">前端</el-radio-button>
		     <el-radio-button label="2">后端</el-radio-button>
		     <el-radio-button label="3">服务端</el-radio-button>
		     <el-radio-button label="4">数据库</el-radio-button>
    	</el-radio-group>

		<el-button type="primary" size="small" @click="submit" v-show="buttonShow">提交</el-button>
		<el-button style="margin:0;" type="warning" size="small" @click="xiugai" v-show="!buttonShow">修改</el-button>
		
		

		
	</el-main>

</template>


<script>

	import $ from 'jquery'
	import Simditor from 'simditor'
	import '../css/simditor.css'

	/*import {mapGetters,mapMutations} from 'vuex'*/

	
	
	export default{
		data(){
			return{
				editor:null,
				buttonShow:false,
				

			}
		},

		computed:{
			detail(){
				return this.$store.getters.detail
			}
		},

		

		mounted(){



			this.getDetail();





			
			let that = this;

			this.editor.on('valuechanged',function(){
				that.$store.commit('changeCenter',this.getValue())

			})
		},

		methods:{
			getDetail(){

				//判断是写新博客还是修改博客
				if(this.$route.params.id == 'newBlog'){
					this.buttonShow = true;
				}else{
					this.buttonShow = false;
				}

				this.editor = new Simditor({
				  textarea: $('#editor'),
				  toolbar:['title','bold','italic','underline','strikethrough','color','ol','ul','blockquote','code','link','image','hr','alignment'],


				  
				});

				this.$store.dispatch('getDetail',[this.$route.params.id,this.editor])
	          	this.$store.dispatch('getTagList')
			},

			setLabel(e){
				this.$store.commit('changeLabel',e.target.innerHTML)
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
				this.$store.dispatch('submitBlog',this.$router)
				
			},

			xiugai(){
				this.$store.dispatch('xiugaiBlog',this.$router)
			},


			

			

		},

		watch:{
			'$route':'getDetail'
		}

		

		


		



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
			margin-top:25px;
		}

		#tagList{
			//background:red;
			font-size:12px;
			color:#333;
			
			margin:10px 0;


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


		
	}

</style>