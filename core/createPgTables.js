const  Inflector = require('inflected');
import config from '../config'

export default async function createPgTables(model){
    const { Client } = require('pg')
            const client = new Client(config.pg)
            try {
                await client.connect()

                const res = await client.query('SELECT $1::text as message', ['数据库测试链接成功!'])
                console.log(res.rows[0].message) // Hello world!
                //为每个模型创建数据表
                console.log('正在创建', model.collection, '数据表');

                let fields = model.setFeilds();

                let fieldsString = `id integer NOT NULL，　`;

                let middleCollectionQuery =  '';
                
                //完成基础的模型建设工作
                Object.getOwnPropertyNames(fields).forEach(key => {
                    
                   if(key !== "hasMany" && key !=="belongsTo"){
                        fieldsString += `${key} ${fields[key]},`
                   } else{
                        if(key === "belongsTo"){
                            model[key] = fields[key];
                                
                            if(!Array.isArray(fields[key])){
                                    let modelrRef = fields[key].name.toLowerCase()+'Id';
                                    fieldsString += `${modelrRef} integer NOT NULL, `;
                            }else{
                                    fields[key].forEach(modelBelong => {
                                        console.log(modelBelong);
                                        
                                        let modelrRef = modelBelong.name.toLowerCase()+'Id';
                                        fieldsString += `${modelrRef} integer NOT NULL, `;
                                    })
                            }
                        }

                   }
                   
                });

                //针对多对多建立中间表

                //使用pg的nosql性质建设hasMany的查询

                console.log({fieldsString});
                
                
                let collectionCreateString = 
                `CREATE TABLE　IF NOT EXISTS ${model.collection}　(id integer NOT NULL, createdAt DATE); PRIMAEY KEY (id)`;
                console.log(collectionCreateString);
                



                await client.end();
                
            } catch (error) {
                console.log("存在错误", error);
                
            }
}