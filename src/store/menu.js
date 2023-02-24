
export default {
  state: { menuData: [] },
  mutations: {
    setMenu(state, val) {
      let menuAry = val;
      let menu = [];
      //menu数据处理
      menuAry.forEach(child=>{
        if(child.parent_id)
        {
          menuAry.forEach(parent=>{
            if(parent.id ==child.parent_id)
            {
              if(parent.children)
                parent.children.push(child);
              else
                parent.children = [child];
            }
          })
        }
        else
         menu.push(child);
      })
      state.menuData =[...menu];
      if (Object.keys(menu).length) localStorage.setItem('menu', JSON.stringify(menu)) //对象需要转换为json格式才能存入json
    },
    clearMenu(state) {
      state.menuData = []
      localStorage.removeItem('menu')
    },
    getMenu(state, router) {
      const data = localStorage.getItem('menu')
      if (data) {
        state.menuData = JSON.parse(data)
        this.commit('addMenu', router)
      }
    },
    addMenu(state, router) {
      const menu = state.menuData;
      const menuRoute = [];
      menu.forEach((item) => {
        if (item.children) {
          //存在二级菜单
          item.children = item.children.map((item) => {
            item.component = () => import(`../views${item.url}`)
            return item
          }) //返回的是一个带有component属性的对象数组。注意是数组而不是对象
          menuRoute.push(...item.children) //将数组解构取出对象
        } else {
          item.component = () => import(`../views${item.url}`)
          menuRoute.push(item)
        }
      })
      //动态路由添加
      menuRoute.forEach((item) => {
        if(item.name=='user')
          router.addRoute('main',{path:item.path,name:item.name,component:item.component,meta:{ keepAlive:true } });
        else
          router.addRoute('main',{path:item.path,name:item.name,component:item.component});
      })
    }
  }
}
