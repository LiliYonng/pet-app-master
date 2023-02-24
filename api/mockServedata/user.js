import Mock from 'mockjs'
let userData = []
const count = 200
for (let i = 0; i < count; i++) {
  userData.push(
    Mock.mock({
      id: Mock.Random.guid(),
      name: Mock.Random.cname(),
      addr: Mock.mock('@county(true)'),
      'age|18-60': 1,
      birth: Mock.Random.date(),
      sex: Mock.Random.integer(0, 1)
    })
  )
}
//解析get请求中url的附带参数
//post请求参数在config.body中附带
function getParam(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  )
}
//这里的page和limit在url不带参数时为默认值
export default {
  //获取用户数据或搜索
  getUserData: (config) => {
    const { name, page = 1, limit = 20 } = getParam(config.url) //解析url参数并返回，若不带参，则参数为默认值
    const totalList = name
      ? userData.filter((item) => {
          return item.name === name || item.addr === name ? true : false
        }) //url带有name参数，检索返回符合name值的数据
      : userData //不带有name参数，全部返回
    const pageList = totalList.filter((item, index) => {
      return index < limit * page && index >= limit * (page - 1)
      //page是当前页，limit*page是当前所有页能够展示到的index ，只有小于这个index才会展示出来
      //减1是前面已经展示完的index，大于它才能在当前页展示
      //totalpage = length/limit  小数取整
    })
    const totalPage = Math.ceil(totalList.length / limit)
    return {
      total: totalPage,
      userData: pageList,
    }
  },

  //新增用户数据
  addUserData: (config) => {
    const newData = JSON.parse(config.body)
    newData.id = Mock.Random.guid()
    userData.push(newData)
  },
  deleteUserData: (config) => {
    const id = config.body
    const index = userData.findIndex((item) => item.id === id)
    userData.splice(index, 1)
  },
  editUserData: (config) => {
    const form = JSON.parse(config.body)
    form.sex = form.sex === '男' ? 1 : 0
    const index = userData.findIndex((item) => item.id === form.id)
    userData[index] = form
  }
}
