/* 
* @Author: Simontaosim
* @Date:   2018-10-25 21:22:28
* @Last Modified time: 2018-10-25 21:22:36
*/

/* config */
/* 设置 */
const Path = require('path');

export default {
	server: {
		host: 'localhost',
		port: 8000,
		routes: {
			files: {
				relativeTo: Path.join(__dirname, '../public/assets')
			},
			"cors": true
		}
	},
	db: {
		driver: "mongo",
	},
	mongodb: {
		url: "mongodb://localhost:27017/fang_dev1"
	},
	mysql: {
		host: '139.198.6.232',
		user: 'justmind_dev1',
		database: 'justmind_dev1',
		password: "justmind_dev1"
	},
	pg: {
		host: '127.0.0.1',
		port: 5432,
		user: 'dbuser',
		database: "exampledb",
		password: 'password',
	},
	mainKey: "tbmKEuEgwn2klIDUlvuOILEgCfOARuSK"
	
};
