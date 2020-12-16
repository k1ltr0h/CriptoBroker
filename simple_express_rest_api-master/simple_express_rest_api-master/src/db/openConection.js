const util = require('util');
const mysql = require('mysql');

require('dotenv').config();

const sqlConfig = {
    host     : process.env.MYSQL_HOST,
    user     : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE, 
    port     : process.env.MYSQL_EXTERNAL_PORT
}

function openDBConnection() {
  const connection = mysql.createConnection(sqlConfig);
  return {
    query( sql, args ) {
      return util.promisify( connection.query )
        .call( connection, sql, args );
    },
    close() {
      return util.promisify( connection.end ).call( connection );
    }
  };
}

module.exports.openDBConnection = openDBConnection;