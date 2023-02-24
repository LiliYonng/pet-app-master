
export default {
  state: {
    isCollapse: true,
    active: null,
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
      state.active = val
      const res = state.tabList.findIndex((item) => item.name === val.name)
      if (res === -1) {
        state.tabList.push(val)
        let list = JSON.stringify(state.tabList);
        sessionStorage.setItem('tabList',list);
      }
    },
    getTap(state){
      let list = sessionStorage.getItem('tabList');
      if(list)
      state.tabList = JSON.parse(list);
    },
    closeTab(state, index) {
      state.tabList.splice(index, 1)
      let list = JSON.stringify(state.tabList);
      sessionStorage.setItem('tabList',list);
    }
  }
}
