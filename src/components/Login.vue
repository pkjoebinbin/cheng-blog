<template>
	<article id="Login">
		<div id="LoginPart">
			<img src="../assets/dogLogo.svg" alt="" id="logo">
			<el-input class="input" v-model="user" placeholder="用户名"></el-input>
			<el-input class="input" v-model="password" placeholder="密码" type="password"></el-input>

			<div id="ButtonPart">
				<el-button class="button" type="primary" v-on:click="login">登录</el-button>
				<el-button class="button" type="warning" >清空</el-button>
			</div>
		</div>

		
	</article>
</template>

<script>



	

export default{



	data(){
		return{
			user:'',
			password:'',
			
		}
	},



	methods:{
		clear(){
			this.user ='';
			this.password ='';
		},

		login(){

			this.$store.dispatch('login',{user:this.user,password:this.password,router:this.$router})

			
		},


		
	},

	
	

	computed:{

	},


	created(){
		/*this.$http.post('/index/index/index.html').then(function(res){
			console.log(res)
		},function(res){
			console.log(res)
		})*/
	}



	

	
}
	

</script>

<style lang="less" scoped>
	
	#Login{
		background:#2a3040;
		position:absolute;
		top:0;
		left:0;
		width:100%;
		height:100%;

		#logo{
			margin:0 auto 20px;
			display:block;
			
			width:55%;
		}
		
		#LoginPart{
			background:#2a3040;
			position:absolute;
			margin:auto;
			top:0;
			left:0;
			right:0;
			bottom:0;
			width:400px;
			height:235px;

			.input{
				display:block;
				margin:0 auto 22px;
				width:70%;
			}
		}

		#ButtonPart{
			text-align:center;
			//margin-top:20px;
			.button{
				width:32%;
				margin:0 9px;

			}


		}


	}

	









































</style>