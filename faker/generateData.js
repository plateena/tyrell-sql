import Database from './db.js';
import * as dataGenerator from './dataGenerator.js'
import { dbConfig } from './dbConfig.js';

async function generateFakeData() {
    const db = new Database(dbConfig);
    try {
        await db.connect()

        await db.query('SET foreign_key_checks = 0')

        // Generate fake data for the 'job_categories' table
        await db.generateTableData('job_categories', 1250, dataGenerator.generateJobCategory);

        await db.generateTableData('job_types', 1250, dataGenerator.generateJobType);
        await db.generateTableData('personalities', 1250, dataGenerator.generatePersonality);
        await db.generateTableData('practical_skills', 1250, dataGenerator.generatePracticalSkill);
        await db.generateTableData('basic_abilities', 1250, dataGenerator.generateBasicAbility);
        await db.generateTableData('affiliates', 1350, dataGenerator.generateAffiliate);

        // Generate fake data for the 'jobs' table
        await db.generateTableData('jobs', 2500, dataGenerator.generateJobRecord);
        await db.generateTableData('jobs_personalities', 1050, dataGenerator.generateJobPersonality);
        await db.generateTableData('jobs_practical_skills', 1050, dataGenerator.generateJobPracticalSkill);
        await db.generateTableData('jobs_basic_abilities', 1050, dataGenerator.generateJobBasicAbility);
        await db.generateTableData('jobs_tools', 1050, dataGenerator.generateJobTool);
        await db.generateTableData('jobs_career_paths', 1050, dataGenerator.generateJobCareerPath);
        await db.generateTableData('jobs_rec_qualifications', 1050, dataGenerator.generateJobRecQualification);
        await db.generateTableData('jobs_req_qualifications', 1050, dataGenerator.generateJobReqQualification);


        console.log('Fake data generated successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Error generating fake data:', error);
        process.exit(1);
    }
}

generateFakeData();
