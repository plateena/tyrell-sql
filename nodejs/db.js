import mysql from 'mysql2/promise';

class Database {
    constructor(config) {
        this.pool = mysql.createPool(config);
    }

    async query(sql, values) {
        let connection;
        try {
            connection = await this.pool.getConnection();
            const [rows, fields] = await connection.query(sql, values);
            return [rows, fields];
        } catch (error) {
            throw error;
        } finally {
            if (connection) {
                connection.release(); // Release the connection back to the pool
            }
        }
    }

    async connect() {
        try {
            await this.pool.getConnection();
            console.log('Connected to the database');
        } catch (error) {
            console.error('Error connecting to the database:', error);
            throw error; // Re-throw the error to propagate it
        }
    }

    async disconnect() {
        try {
            await this.pool.end();
            console.log('Disconnected from the database');
        } catch (error) {
            console.error('Error disconnecting from the database:', error);
            throw error;
        }
    }
    async getId(tableName) {
        try {
            const [rows, fields] = await this.query(`SELECT id FROM ${tableName} ORDER BY RAND() LIMIT 1`);
            return rows[0].id;
        } catch (error) {
            console.error(`Error generating data for ${tableName}:`, error);
            throw error;
        }
    }
    async generateTableData(tableName, numRecords, fieldGenerator) {
        const records = await Promise.all(
            Array.from({ length: numRecords }, async () => {
                try {
                    const record = await fieldGenerator();
                    return record;
                } catch (error) {
                    console.error(`Error generating field for ${tableName}:`, error);
                    throw error;
                }
            })
        );

        try {
            const keys = Object.keys(records[0]);
            const values = records.map(record => Object.values(record));
            const placeholders = Array.from({ length: keys.length }, () => '?').join(', ');

            const sql = `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES ?`;

            const uniqueValues = [...new Set(values.map(JSON.stringify))].map(JSON.parse);
            await this.query(sql, [uniqueValues]);
            console.log(`Data successfully inserted into ${tableName}`);
        } catch (error) {
            console.error(`Error inserting data into ${tableName}:`, error);
            throw error;
        }
    }
}

export default Database;
