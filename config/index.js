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
	mongodb: {
		url: "mongodb://localhost:27017/fang_dev1"
	},
	mainKey: "tbmKEuEgwn2klIDUlvuOILEgCfOARuSK"
	
};
