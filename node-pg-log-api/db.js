const Pool = require('pg').Pool

// enter your POSTGRES database info here
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'log_entry',
    password: 'secret',
    port: 5432,
})


//create log to db
const createLog = (request, response) => {

    const { start_time, end_time, description } = request.body.log;
    try {
        pool.query(
            `INSERT INTO logs
             (start_time, end_time, description)
             VALUES('${start_time}', '${end_time}', '${description}'); `
            , (error, results) => {
                if (error) {
                    throw error
                }
                response.status(200).json(results.rows)
            })
    } catch (e) {
        console.log(e);
    }
}

//get logs from db
const getLogs = (request, response) => {
    try {
        pool.query('SELECT * FROM logs', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
    } catch (e) {
        console.log(e);
    }
}


module.exports = {
    getLogs,
    createLog
}
