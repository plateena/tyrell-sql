#!/usr/bin/env node

import fs from 'fs/promises';
import Database from './db.js';
import { dbConfig } from './dbConfig.js';

// Function to read SQL query from a file
const readQueryFromFile = async (filePath) => {
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        // Remove lines that start with "--" (comment lines).
        const lines = fileContent.split('\n').filter(line => !line.trim().startsWith('--'));
        // Join the remaining lines to form the cleaned SQL query.
        const cleanedSQLQuery = lines.join(' ').trim();
        return cleanedSQLQuery;
    } catch (error) {
        throw error;
    }
};

// Function to execute a query
const executeQuery = async (query, val = 'a') => {
    const db = new Database(dbConfig);
    try {
        await db.connect()
        console.log("Querying......")
        // Escape special characters in the regular expression
        const escapedChar = "\\?"
        const matches = query.match(new RegExp(escapedChar, 'g'));
        const ln = matches ? matches.length : 1
        const search = Array(ln).fill(`%${val}%`)
        console.time('Query Time');
        const [rows, fields] = await db.query(query, search);
        console.timeEnd('Query Time');
        if (search.length > 0) {
            console.log('Searching for:', val);
        }
        console.log('Query results count (limit 50):', rows.length);
    } catch (error) {
        console.error('Error executing query:', error);
    } finally {
        process.exit(0)
    }
};


// Retrieve the file path from command-line arguments
const filePathArg = process.argv[2];

const val = process.argv[3];

if (!filePathArg) {
    console.error('Error: Please provide the path to the SQL file as a command-line argument.');
    process.exit(1);
}
// Call the function to read the query from the file and then execute it
readQueryFromFile('/dumps/' + filePathArg)
    .then((query) => executeQuery(query, val))
    .catch((error) => console.error('Error reading or executing query:', error));
