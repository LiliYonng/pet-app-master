export default {
    state: {
        btnPermission:{},
    },
  
    mutations: {
        setBtnPermission(state,val){
            state.btnPermission = val;
            localStorage.setItem('btnPermission',JSON.stringify(val));
        },
        getBtnPermission(state){
            let btnPermission = localStorage.getItem('btnPermission');
            state.btnPermission = JSON.parse(btnPermission);
        }

    }

}