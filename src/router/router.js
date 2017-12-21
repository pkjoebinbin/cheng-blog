import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import DashBoard from '@/components/DashBoard'
import BlogList from '@/components/BlogList'
import CommentList from '@/components/CommentList'
import PictureAdmin from '@/components/PictureAdmin'
import UserAdmin from '@/components/UserAdmin'
import Detail from '@/components/Detail'


Vue.use(Router)

export default new Router({
  routes: [
    

    

    {
    	path:'/Login',
    	name:'Login',
    	component:Login
    },

    {
    	path:'/DashBoard',
    	name:'DashBoard',
    	component:DashBoard,
    	children:[
    		{
    			path:'/DashBoard/bloglist/list/:list',
    			name:'bloglist',
    			component:BlogList,
    		},

    		{
    			path:'/DashBoard/commentlist',
    			name:'commentlist',
    			component:CommentList,
    		},

    		{
    			path:'/DashBoard/pictureadmin',
    			name:'pcitureadmin',
    			component:PictureAdmin,
    		},

    		{
    			path:'/DashBoard/useradmin',
    			name:'useradmin',
    			component:UserAdmin,
    		},
            {
                path:'/DashBoard/Detail/id/:id',
                name:'Detail',
                component:Detail
            },


    	]

    },

    

    
    {
    	path:'*',redirect:'/Login'
    }

  ]
})
