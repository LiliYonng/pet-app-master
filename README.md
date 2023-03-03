# pet-app-master

## 项目说明
宠物小程序的后台管理系统  
[线上展示链接](http://175.178.232.232:9098)  http://175.178.232.232:9098  
本项目基于 vue3.0+es6 开发 使用 element-ui 布局，  
本地开发使用 mockjs 拦截 axios 请求，模拟后端接口返回数据。实现前后端分离开发。  
后端部署:nodeJs+express  文件目录：backend [项目地址](https://github.com/LiliYonng/pet-raising-app)  

权限管理： 
- 菜单权限：后台储存，根据登录账号动态添加路由实现菜单权限管理。
- 按钮权限：自定义指令判断  

功能  
1. 文章资讯管理  
2. 商品管理（商品上架,添加和删除） 
3. 订单管理，待发出的订单，已发出的订单，取消（待开发）  
4. 数据统计：商品销量、用户活跃度等可视化展示  
5. echarts 组件展示数据，数据更新动态生成图表  

### 项目展示
![image](https://user-images.githubusercontent.com/73695877/222648992-3e40cc89-2145-4361-986b-0ee1d4e49b99.png)

管理员账号：admin 密码 admin

普通用户账号：normal 密码：normal

### 项目运行

```
npm install

npm run serve

npm run build

```
