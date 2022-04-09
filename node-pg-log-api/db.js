const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'log_entry',
    password: 'secret',
    port: 5432,
})

const createLog = (request, response) => {

    const { start_time, end_time, description } = request.body.log;
    try {
        pool.query(
            `INSERT INTO logs
             (start_time, end_time, description)
             VALUES('${start_time}', '${end_time}', '${description}');
             
             `
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
