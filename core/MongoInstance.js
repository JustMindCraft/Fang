import mongo from 'mongodb';



  class MongoInstance {
      connect(config){
          let self = this;
        const mongoClient = mongo.MongoClient;

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

  export default MongoInstance