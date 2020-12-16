module.exports = {
    "up": `CREATE TABLE users ( 
                email VARCHAR(255) NOT NULL, 
                nombre VARCHAR(255), 
                nacionalidad VARCHAR(100), 
                created_at DATETIME, 
                updated_at DATETIME,
                PRIMARY KEY (email))`,
    "down": "DROP TABLE users"
}