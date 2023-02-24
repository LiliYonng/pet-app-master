import Mock from 'mockjs'
import homeApi from './mockServedata/home'
import userApi from './mockServedata/user'
import permissionApi from './mockServedata/permission'
Mock.mock('/api/home/getData', homeApi.getData)
Mock.mock(/\/api\/user\/getData/, userApi.getUserData)
Mock.mock(/user\/add/, userApi.addUserData)
Mock.mock(/user\/delete/, userApi.deleteUserData)
Mock.mock(/user\/edit/, userApi.editUserData)
//Mock.mock(/login\/getPermission/, permissionApi.getPermi)
//正则表达式匹配部分url 字符串则匹配全部url
