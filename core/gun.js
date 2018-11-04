export const  Gun = require('gun');
require('gun/sea');
const sea = Gun.SEA
export const gun =  Gun('http://localhost:8000/gun');