


 class AppModel {
     constructor(params){
        console.log(params);
        Object.getOwnPropertyNames(params).forEach(key => {
            this[key] = params[key];
        })
        
     }
   
    

     
}

export default AppModel;