<template>
	
	<el-container id="DashBoard">
  		<el-aside width="200px" id="leftSide">

  			
  			
  			<el-menu
      		class="el-menu-vertical-demo"
		    background-color="#2a3040"
		    text-color="#fff"
		    :default-active="$route.path"
		    active-text-color="#ffd04b"
		    router>
      			
      			<el-menu-item index="1">		        
			         <i class="el-icon-star-off"></i>
			         <span>大数据</span>
      			</el-menu-item>

      			<el-menu-item index="/DashBoard/Detail/id/newBlog">		        
			         <i class="el-icon-edit"></i>
			         <span>写博客</span>
      			</el-menu-item>


      			<el-submenu index="3">
			        
			        <template slot="title">
			          	<i class="el-icon-menu"></i>
			          	<span>博文管理</span>
			        </template>
			        
			        <el-menu-item-group>
				          <el-menu-item index="/DashBoard/bloglist/list/1">前端</el-menu-item>
				          <el-menu-item index="/DashBoard/bloglist/list/2">后端</el-menu-item>
				          <el-menu-item index="/DashBoard/bloglist/list/3">服务端</el-menu-item>
				          <el-menu-item index="/DashBoard/bloglist/list/4">数据库</el-menu-item>
			        </el-menu-item-group>

      			</el-submenu>

		      <el-menu-item index="/DashBoard/commentlist">
			        <i class="el-icon-message"></i>
			        <span slot="title">评论</span>
		      </el-menu-item>


		      <el-menu-item index="/DashBoard/pictureadmin">
			        <i class="el-icon-picture"></i>
			        <span slot="title">图片管理</span>
		      </el-menu-item>

		      <el-menu-item index="/DashBoard/useradmin">
		        	<i class="el-icon-setting"></i>
		        	<span slot="title">用户设置</span>
		      </el-menu-item>
    		</el-menu>

  		</el-aside>

  		
  		<el-container id="rightSide">
			
    		<el-header id="Header" height="auto">
	    		<div class="search">
		    		<el-input size="medium"   placeholder="请输入内容">
		    			<el-button slot="append" icon="el-icon-search" type="primary"></el-button>
		    		</el-input>
		    	</div>
    		</el-header>

    		<el-main id="Main">
    			
    			<router-view></router-view>
    		</el-main>
			
  		</el-container>
	</el-container>
		
			
		
	

</template>

<script>
	export default{
		
	}

</script>

<style lang="less" scoped>
	#DashBoard{
		background:blue;
		position:absolute;
		top:0;
		left:0;
		width:100%;
		height:100%;

		#leftSide{
			background:#2a3040;
			height:100%;


			

		}

		#rightSide{
			
			#Header{
				background:#eb9e05;

				.search{
					padding:10px 0;
				}
			}

			#Main{
				background:#fff;
			}

		}

	}


	/*取消默认样式*/
	.el-menu{
		border:none;
	}
	
	

	

	
</style>