export const formatDate = (DateValue)=>{
    let date = new Date(DateValue);
    let y = date.getFullYear();
    let m = date.getMonth()+1;
    let d = date.getDate();
    m=m>9?m:'0'+m;
    d=d>9?d:'0'+d;
    return `${y}-${m}-${d}`
}