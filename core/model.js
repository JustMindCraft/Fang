


 class AppModel {
     constructor(params){
        Object.getOwnPropertyNames(params).forEach(key => {
            this[key] = params[key];
        })
        
     }
   
    

     
}

export default AppModel;