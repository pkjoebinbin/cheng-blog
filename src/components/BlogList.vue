<template>
	<el-main id="blogList">
		
    <el-table 
      v-loading="loading"
      :data="$store.state.blog.bloglist"
      style="width: 100%"
      stripe>
      <el-table-column
        prop="begintime"
        label="日期"
        width="210">
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="Title"
        label="标题"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="操作"
        width="220"
        >
        <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="getDetail(scope)"
          >编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="deleteBlog(scope)"
          >删除</el-button>
      </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      @current-change="pageChange"
      :current-page="$store.getters.currentPage"
      :total="$store.getters.blogTotal">
    </el-pagination>

    


  
	</el-main>

  
  
  
</template>



<script>
    export default {
      data() {
        return {
          
          loading:false,
          
        }
      },

      


      methods: {
        
        pageChange(size){
            var list = this.$route.params.list; //路由的参数
            this.$store.dispatch('changePage',{size,list});
            this.$store.commit('currentPageChange',size)
        },

        //ajax获取数据
        getData(){
            
            
            if(this.$route.params.list !== 'search'){
              this.$store.dispatch('getListData',this.$route.params.list); 
            }


            

            

        },

        //编辑按钮
        getDetail(scope){
            
            this.$router.push({ name: 'Detail',params: { id:scope.row.id } })

            this.$store.dispatch('getTagList')
        },


        //删除按钮
        deleteBlog(scope){
          
          this.$store.dispatch('deleteBlog',scope)
        }


    },

   

      

      created(){

          this.getData();
      },



      watch:{
        '$route':'getData'
      }


    }
</script>


<style lang="less" scoped>
    .pagination{
        
        margin-top:20px;
    }
</style>