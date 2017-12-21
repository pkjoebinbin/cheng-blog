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
        width="180">
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="Title"
        label="标题">
      </el-table-column>
      <el-table-column
        label="操作">
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
     

        //ajax获取数据
        getData(){
            
            this.$store.dispatch('getListData',this.$route.params.list);
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