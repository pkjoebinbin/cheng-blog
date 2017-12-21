<template>
  <div id="app">
      <router-view></router-view>
     
  </div>

  
</template>

<script>


export default {
  data(){
    return{
        url:this,
    }
  },



  created:function(){
      
      
    
    /*this.$http.post(
        'Article/Article'
    ).then(function(res){
      console.log(res)
    },function(res){
      console.log(res)
    })*/

  },


  

}
</script>

<style >
*{margin:0;padding:0;}

#app{
  
  
}
</style>
