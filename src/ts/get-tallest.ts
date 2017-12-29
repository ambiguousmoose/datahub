export function getTallest(ele: any){
    let highest = 0;
    for(let i = 0; i < ele.length; i++){
        (ele[i].hasAttribute('style')?ele[i].removeAttribute('style'):'');// clean style attributes
        let h = ele[i].offsetHeight;
        if(h > highest){
            highest = h;
        }
    }
    return highest;
};