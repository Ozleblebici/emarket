module.exports = {
    port: process.env.PORT || 8084,
    db: {
        database: process.env.DB_NAME || "mydb",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASS || "12345678",
        dialect: process.env.DIALECT || "mysql",
        host: process.env.HOST || "mydb.c7qn3fw71rw4.eu-west-2.rds.amazonaws.com",
        storage: "./sql_database.sql"
    },
    authentication: {
        jwtSecret : process.env.JWT_SECRET || 'secret'
    }
}
