<template>
	<el-container id="DataBoard">
		<div id="c1"></div>
		
	</el-container>


</template>

<script>
	import G2 from '@antv/g2';
	
	export default{
		data(){
			return{
				
			}
		},

		created(){

			

		},

		mounted(){
			

			const data = [
			  { genre: '前端', sold: 275 },
			  { genre: '后端', sold: 115 },
			  { genre: '服务端', sold: 120 },
			  { genre: '随笔', sold: 350 },
			  { genre: '评论', sold: 150 }
			]; // G2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
			// Step 1: 创建 Chart 对象
			const chart = new G2.Chart({
			  container: 'c1', // 指定图表容器 ID

			 width : document.getElementById('DataBoard').clientWidth/1.2, // 指定图表宽度
			  height : 400 // 指定图表高度
			});
			// Step 2: 载入数据源
			chart.source(data);
			// Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
			chart.interval().position('genre*sold').color('genre')
			// Step 4: 渲染图表
			chart.render();

			
		}


	}

</script>


<style lang="less" scoped>
	#c1{
		margin:0 auto;
	}

</style>