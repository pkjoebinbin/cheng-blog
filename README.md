# 给基友写的一套博客前后台
[前台主页地址：www.kc9m.com][1]


[后台地址：kc9m.com/admin/admin.html][2]
  
  


  
**不啰嗦，先看图**

![adminIndex][3]


![dashBoard][4]


![blogList][5]


![detail][6]


![pcIndex][7]


  [1]: http://kc9m.com
  [2]: http://kc9m.com/admin/admin.html
  [3]: https://github.com/pkjoebinbin/cheng-blog/blob/master/imgs/adminLogin.jpg
  [4]: https://github.com/pkjoebinbin/cheng-blog/blob/master/imgs/dashBoard.jpg
  [5]: https://github.com/pkjoebinbin/cheng-blog/blob/master/imgs/blogList.jpg
  [6]: https://github.com/pkjoebinbin/cheng-blog/blob/master/imgs/detail.jpg
  [7]: https://github.com/pkjoebinbin/cheng-blog/blob/master/imgs/pcIndex.png
  
  
  

**前台页面**

> 前台使用传统JQuery+PHP的做法。前端负责写页面模版，后端套模版渲染数据。博客项目来看的话，seo还是蛮重要的，服务端渲染更有优势。这个就好办多了，HTML+CSS咔咔就是一顿干，直接丢给后端基友。搞定！！

<br/>

**后台页面**

> 技术栈：Vue全家桶+elementUI+AntV+PHP+MYSQL

后台依然是基友提供php接口，全页面Ajax请求加载。相对于我自己的博客，虽然这次开发需求差不多，但运用了新的技术和完全前后分离的开发模式，开发过程还是踩了很多坑的。

<br/>


**引入Vuex状态管理**

> 官方解释就是更方便友好的管理组件间共享的数据，如非父子组件间的数据状态共享。

<br/>

**前后端彻底分离开发**

> 之前的项目合作时，每当后台数据接口修改后，都需要把文件发一份给我到本地，貌似看起来是前后分离，但当修改量庞大时，操作也相当繁琐。使用webpack提供的代理模式，可以轻松解决跨域问题。只需配置好代理参数，基友修改好接口上传服务器后，前端直接调用接口即可。


<br/>

**elementUI框架使用**

> 个人感觉，其实并没有自己纯手写来的好看，但胜在效率高，节省不少时间。

<br/>

**数据可视化**

> 引入了阿里巴巴开源的的AntV可视化框架，整体视觉风格还不错看。
