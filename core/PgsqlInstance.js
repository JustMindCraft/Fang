import mongo from 'mongodb';



  class PgsqlInstance {
      connect(config){
        const mongoClient = mongo.MongoClient;
        let self = this;
        mongoClient.connect(config.mongodb.url, function(err, db) {
        if (err) throw err;
        console.log("数据库已创建!");
        if(self.collection){
            console.log(self.collection);
            
        }else{
            console.log('此模型没有数据表');
            
        }
            db.close();
            });
      }
      insert(){

      }
  }

  export default PgsqlInstance