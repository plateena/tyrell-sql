import { generateJobRecord } from './jogGenerator.js'
import { generateJobCategory } from './jobCategoriesGenerator.js';
import Database from './db.js';
import { dbConfig } from './dbConfig.js';

async function generateFakeData() {
    const db = new Database(dbConfig);
    try {
        await db.connect()

        // Generate fake data for the 'job_categories' table
        await db.generateTableData('job_categories', 20, generateJobCategory);

        // Generate fake data for the 'jobs' table
        await db.generateTableData('jobs', 20, generateJobRecord);

        console.log('Fake data generated successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Error generating fake data:', error);
        process.exit(1);
    }
}

generateFakeData();
