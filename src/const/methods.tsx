function isEmpthyText(txt : string|undefined) : boolean {
    if(txt == undefined) return true;

    let formatedtxt : string = txt.replaceAll(/\s/g,'');

    return formatedtxt === '';
}

const Methods = {
    isEmpthyText,
}


export default Methods;
