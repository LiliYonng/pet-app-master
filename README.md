# pet-app-master

## 项目说明
宠物小程序的后台管理系统
功能
1.文章资讯管理
2.商品管理（商品上架,添加和删除）
3.订单管理，待发出的订单，已发出的订单，取消（待开发）
4.数据统计：商品销量、用户活跃度等可视化展示
5.echarts 组件展示数据，数据更新动态生成图表
本项目基于 vue3.0+es6 开发 使用 element-ui 布局，
本地开发使用 mockjs 拦截 axios 请求，模拟后端接口返回数据。实现前后端分离开发。
后端部署:nodeJs+express  文件目录：backend [项目地址](https://github.com/LiliYonng/pet-raising-app)
### 项目展示

[线上展示链接](http://175.178.232.232:9098)

管理员账号：123 密码 123

普通用户账号： user 密码：user

权限管理：
1. 菜单权限：后台储存，根据登录账号动态添加路由实现菜单权限管理。
2. 按钮权限：自定义指令判断
### 项目运行

```
npm install

npm run serve

npm run build

```
