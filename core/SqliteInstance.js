const  DataBase =  require('better-sqlite3');

const db = new DataBase('fang.db');

const stmt = db.prepare(`
CREATE TABLE COMPANY(
    ID INT PRIMARY KEY     NOT NULL,
    NAME           TEXT    NOT NULL,
    AGE            INT     NOT NULL,
    ADDRESS        CHAR(50),
    SALARY         REAL
 );
`);


console.log(stmt);





