/* 
* @Author: Simontaosim
* @Date:   2018-10-25 21:22:28
* @Last Modified time: 2018-10-25 21:22:36
*/

/* config */
/* 设置 */
const Path = require('path');

console.log(require('path').join(__dirname, '../public'));

export default {
	server: {
		host: 'localhost',
		port: 8000,
		routes: {
			files: {
			  relativeTo: require('path').join(__dirname, '../public/')
			}
		}
	},
	
};
