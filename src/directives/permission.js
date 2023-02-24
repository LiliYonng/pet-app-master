import store from "@/store";
export const btnPermission = 
{
  mounted(el, binding) {
    let permi = store.state.permissions.btnPermission;
    let val = binding.value;
    if(!permi[val])//如果权限不存在，删除按钮
    el.parentNode.removeChild(el);
  },
}
  

    