export function setSpy(object): void{
    let result : any = {};
     let keys = Object.keys(object);
     for(let i = 0; i < keys.length; i++){
        if(Array.isArray(object[keys[i]])){
            result[keys[i]] =  jasmine.createSpyObj(keys[i], object[keys[i]]);     
        } else{
            result[keys[i]] =   jasmine.createSpyObj(keys[i], [object[keys[i]]]);     
        }
     }

     return result;
}

// export function setProviders(object: any, allSpy): any{
//     let result : any  = [];
//     for(let i = 0; i < Object.keys(object).length; i++){
//          result.push({provide : Object.keys(object)[i] as Object, useValue : allSpy[i][Object.keys(object)[i]]});
//     }
//     console.log('provide result',  result);
// }