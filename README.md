1.	项目技术桟
	- vue-cli
	- vue
	- axios
	- vue-router
	- element-ui
	- webpack
	- less
2.	安装
项目地址( git clone )
`git clone https://github.com/xxxxxxbuddy/YOY.git`

通过npm安装本地服务第三方依赖模块(需要已安装Node.js)
`npm install`

启动服务: (http://localhost:8080)
`npm run dev`

发布代码
`npm run build`

3.	功能
	-	购票系统
	  -	购新票
	  -	查看已购票
	    -	退票
	-	游园系统
	  -	线路推荐
	  -	项目推荐
	    -	按等待时间
	    -	按距离
	  -	店铺推荐
	  -	购买商品
	  -	队伍管理
	    -	创建队伍
	    -	退出队伍
	    -	邀请组队
	    -	查看地图（显示队友位置）
	  -	我的订单
	    -	取货
	    -	退货
	  -	卡管理
	    -	充值
	    -	退款
	  -	通知
	    -	提交发布通知申请
	    -	我的通知

4. 目录结构

   ```├──.babelrc
   ├──.editorconfig
   ├──.eslintignore
   ├──.eslintrc.js  	 	--代码检查工具配置
   ├──.gitignore     		--git配置
   ├──.postcssrc.js
   ├──index.html     		--项目入口html	
   ├──package.json
   ├──README.md  	   	--项目说明文件
   │  
   ├─build
   │      build.js
   │      check-versions.js
   │      utils.js
   │      vue-loader.conf.js    --vue-loader配置文件
   │      webpack.base.conf.js  --webpack配置文件
   │      webpack.dev.conf.js
   │      webpack.prod.conf.js
   │      
   ├─config
   │      dev.env.js
   │      index.js
   │      prod.env.js
   │      
   ├─src
   │  │  App.vue
   │  │  main.js
   │  │  
   │  ├─assets
   │  ├───css
   │  │      	main.css
   │  │      
   │  ├───images
   │  │      	LOGO.png
   │  │      	……
   │  │      
   │  ├───js
   │  │      	iconfont.js
   │  │      
   │  ├─components
   │  │      header.vue 		--导航栏组件
   │  │      
   │  ├─images
   │  │      login_bg.png
   │  │      
   │  ├─router
   │  │      index.js
   │  │      
   │  └─views
   │      │  DeviceNotSupport.vue		--提示需在移动端打开
   │      │  main.vue		--入口
   │      │  
   │      ├─buy
   │      │  
   │      ├───MyTickets		--已购票
   │      │      	AvailTickets.vue		--登录页
   │      │      	MyTicket.vue			--查看我的票
   │      │  
   │      ├───NewTickets
   │      │      	BuyTicket.vue			--输入购票信息
   │      │      	confirm.vue			--确认页
   │      │      	paymemt.vue			--支付页
   │      │  
   │      ├─visit
   │      │  
   │      ├───Route			--线路推荐
   │      │      	Route.vue			--线路种类
   │      │      	RouteDetail.vue		--线路详情
   │      │  
   │      │  	Facility.vue		--项目推荐
   │      │  
   │      ├───Store			--店铺推荐
   │      │      	Food.vue			--店铺页
   │      │      	Store.vue		--商品页
   │      │      	Order.vue		--订单页
   │      │  
   │      │      Team.vue		--队伍管理
   │      │      MyOrder.vue		--我的订单
   │      │      Card.vue			--卡管理
   │      │      Notice.vue		--通知
   │      │      Map.vue			--地图
   │              
   └─static```
   ```

