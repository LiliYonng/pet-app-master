
export default {
  state: {
    isCollapse: false,
    active:{
      path: '/home',
      name: 'home',
      label: '首页'
    },
    tabList: [
      {
        path: '/home',
        name: 'home',
        label: '首页'
      }
    ]
  },
  mutations: {
    autoMenu(state,val){
      state.isCollapse = val;
    },
    handleMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    selectMenu(state, val) {
      state.active = val;
      sessionStorage.setItem('activeItem',JSON.stringify(val));
      const res = state.tabList.findIndex((item) => item.name === val.name)
      if (res === -1) {
        state.tabList.push(val)
        let list = JSON.stringify(state.tabList);
        sessionStorage.setItem('tabList',list);
      }
    },
    getTap(state){
      let list = sessionStorage.getItem('tabList');
      let activeItem = sessionStorage.getItem('activeItem');
      if(list)
      state.tabList = JSON.parse(list);
      if(activeItem)
        state.active = JSON.parse(activeItem);
    },
    closeTab(state, index) {
      state.tabList.splice(index, 1)
      let list = JSON.stringify(state.tabList);
      sessionStorage.setItem('tabList',list);
    },
    clearTabs(state) {
      state.tabList = [
        {
          path: '/home',
          name: 'home',
          label: '首页'
        }
      ]
      state.active={
        path: '/home',
        name: 'home',
        label: '首页'
      }
      sessionStorage.removeItem('activeItem')
      sessionStorage.removeItem('tabList');
    }
  }
}
