import faker from 'faker';
import Database from './db.js'

const dbConfig = {
    host: 'mysql',
    user: 'tyrellroot',
    password: 'secret',
    database: 'tyrell_jobs',
};

export async function generateJobRecord() {
    const db = new Database(dbConfig);
    await db.connect()
    const jobCategoryId = await db.getId('job_categories');
    return {
        name: faker.name.jobTitle(),
        media_id: faker.datatype.number(),
        job_category_id: jobCategoryId,
        job_type_id: faker.datatype.number(),
        description: faker.lorem.paragraph(),
        detail: faker.lorem.paragraph(),
        business_skill: faker.lorem.sentence(),
        knowledge: faker.lorem.sentence(),
        location: faker.address.city(),
        activity: faker.lorem.sentence(),
        academic_degree_doctor: faker.datatype.boolean(),
        academic_degree_master: faker.datatype.boolean(),
        academic_degree_professional: faker.datatype.boolean(),
        academic_degree_bachelor: faker.datatype.boolean(),
        salary_statistic_group: faker.lorem.word(),
        salary_range_first_year: faker.finance.amount(),
        salary_range_average: faker.finance.amount(),
        salary_range_remarks: faker.lorem.sentence(),
        restriction: faker.lorem.sentence(),
        estimated_total_workers: faker.datatype.number(),
        remarks: faker.lorem.paragraph(),
        url: faker.internet.url(),
        seo_description: faker.lorem.sentence(),
        seo_keywords: faker.lorem.words(),
        sort_order: faker.datatype.number(),
        publish_status: faker.datatype.boolean(),
        version: faker.datatype.number(),
        created_by: faker.datatype.number(),
        created: faker.date.past(),
        modified: faker.date.past(),
        deleted: faker.date.future(),
    };
}
