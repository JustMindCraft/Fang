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
			}
		}
	},
	db: {
		driver: "mongo",
	},
	mongodb: {
		url: "mongodb://localhost:27017/webtorrentadmin"
	},
	mysql: {
		host: '139.198.6.232',
		user: 'justmind_dev',
		database: 'justmind_dev',
		password: "justmind_dev"
	},
	pg: {
		host: '127.0.0.1',
		port: 5432,
		user: 'dbuser',
		database: "exampledb",
		password: 'password',
	}
	
};
