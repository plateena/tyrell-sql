import Database from './db.js';
import * as dataGenerator from './dataGenerator.js';
import { dbConfig } from './dbConfig.js';

// Get dataCount from command line arguments or set a default value
var dataCount = process.argv[2] ? parseInt(process.argv[2], 10) : 1;

/**
 * Main function to generate fake data and populate database tables.
 */
async function generateFakeData() {
    // Create a new instance of the Database class
    const db = new Database(dbConfig);
    dataCount = dataCount * 1000

    try {
        // Connect to the database
        await db.connect();
        
        // Disable foreign key checks for the duration of data generation
        await db.query('SET foreign_key_checks = 0');

        // Generate fake data for various tables
        await db.generateTableData('job_types', dataCount, dataGenerator.generateJobType);
        await db.generateTableData('personalities', dataCount, dataGenerator.generatePersonality);
        await db.generateTableData('practical_skills', dataCount, dataGenerator.generatePracticalSkill);
        await db.generateTableData('basic_abilities', dataCount, dataGenerator.generateBasicAbility);
        await db.generateTableData('affiliates', dataCount, dataGenerator.generateAffiliate);

        // Generate fake data for the 'jobs' table
        await db.generateTableData('jobs', dataCount, dataGenerator.generateJobRecord);
        await db.generateTableData('jobs_personalities', dataCount, dataGenerator.generateJobPersonality);
        await db.generateTableData('jobs_practical_skills', dataCount, dataGenerator.generateJobPracticalSkill);
        await db.generateTableData('jobs_basic_abilities', dataCount, dataGenerator.generateJobBasicAbility);
        await db.generateTableData('jobs_tools', dataCount, dataGenerator.generateJobTool);
        await db.generateTableData('jobs_career_paths', dataCount, dataGenerator.generateJobCareerPath);
        await db.generateTableData('jobs_rec_qualifications', dataCount, dataGenerator.generateJobRecQualification);
        await db.generateTableData('jobs_req_qualifications', dataCount, dataGenerator.generateJobReqQualification);

        // Log success message
        console.log('Fake data generated successfully.');
        
        // Set exit code for success
        process.exitCode = 0;
    } catch (error) {
        // Log error message
        console.error('Error generating fake data:', error);
        
        // Set exit code for failure
        process.exitCode = 1;
        
        // Propagate the error up the call stack
        throw error;
    } finally {
        // Close the database connection and enable foreign key checks
        await closeDatabase(db);
        
        // Exit the script with the appropriate exit code
        process.exit(process.exitCode);
    }
}

/**
 * Function to generate fake data for a specified table.
 * @param {object} db - The database instance.
 * @param {string} tableName - The name of the table.
 * @param {number} count - The number of fake records to generate.
 * @param {function} dataGeneratorFn - The data generation function for the table.
 */
async function generateTableData(db, tableName, count, dataGeneratorFn) {
    await db.generateTableData(tableName, count, dataGeneratorFn);
}

/**
 * Function to close the database connection and enable foreign key checks.
 * @param {object} db - The database instance.
 */
async function closeDatabase(db) {
    // Enable foreign key checks before closing the database connection
    await db.query('SET foreign_key_checks = 1');
}

// Execute the main data generation function
generateFakeData();
