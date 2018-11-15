/* 
* @Author: Simontaosim
* @Date:   2018-10-25 21:21:20
* @Last Modified time: 2018-10-25 21:21:23
*/

import Hapi from 'hapi';
import config from '../config';

const serverConfig = config.server;

const server = new Hapi.Server(serverConfig, { cors: true });

export default server;

