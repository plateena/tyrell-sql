import { faker } from '@faker-js/faker';
import Database from './db.js'
import { eitherValOrNull } from './helpers.js'

const dbConfig = {
    host: 'mysql',
    user: 'tyrellroot',
    password: 'secret',
    database: 'tyrell_jobs',
};

const db = new Database(dbConfig);
await db.connect()

function getDeleted() {
    // return null;
    return faker.helpers.weightedArrayElement([
        { weight: 9, value: null },
        { weight: 1, value: faker.date.past() }
    ])
}

export async function generateJobCategory() {
    return {
        name: faker.person.jobArea(),
        sort_order: faker.number.int(50),
        created_by: faker.number.int(50),
        created: faker.date.past(),
        modified: faker.date.past(),
        deleted: getDeleted(),
    };
}

export async function generatePersonality() {
    return {
        name: faker.person.bio(),
        created: faker.date.past(),
        modified: faker.date.past(),
        deleted: getDeleted(),
    };
}

export async function generateJobPersonality() {
    const jobId = await db.getId('jobs');
    const personalityId = await db.getId('personalities');
    return {
        job_id: jobId,
        personality_id: faker.number.int(50),
    };
}

export async function generatePracticalSkill() {
    return {
        name: faker.person.bio(),
        created: faker.date.past(),
        modified: faker.date.past(),
        deleted: getDeleted(),
    };
}

export async function generateJobPracticalSkill() {
    const jobId = await db.getId('jobs');
    const practicalSkillId = await db.getId('practical_skills');
    return {
        job_id: jobId,
        practical_skill_id: practicalSkillId,
    };
}

export async function generateBasicAbility() {
    return {
        name: faker.person.zodiacSign(),
        created: faker.date.past(),
        modified: faker.date.past(),
        deleted: getDeleted(),
    };
}

export async function generateJobBasicAbility() {
    const jobId = await db.getId('jobs');
    const basicAbilityId = await db.getId('basic_abilities');
    return {
        job_id: jobId,
        basic_ability_id: basicAbilityId,
    };
}

export async function generateAffiliate() {
    return {
        name: faker.commerce.department(),
        type: faker.helpers.rangeToNumber({ min: 1, max: 3 }),
        created: faker.date.past(),
        modified: faker.date.past(),
        deleted: getDeleted(),
    };
}

export async function generateJobTool() {
    const jobId = await db.getId('jobs');
    const affiliateId = await db.getId('affiliates');
    return {
        job_id: jobId,
        affiliate_id: affiliateId,
    };
}

export async function generateJobCareerPath() {
    const jobId = await db.getId('jobs');
    const affiliateId = await db.getId('affiliates');
    return {
        job_id: jobId,
        affiliate_id: affiliateId,
    };
}

export async function generateJobRecQualification() {
    const jobId = await db.getId('jobs');
    const affiliateId = await db.getId('affiliates');
    return {
        job_id: jobId,
        affiliate_id: affiliateId,
    };
}

export async function generateJobReqQualification() {
    const jobId = await db.getId('jobs');
    const affiliateId = await db.getId('affiliates');
    return {
        job_id: jobId,
        affiliate_id: affiliateId,
    };
}
export async function generateJobType() {
    const jobCategoryId = await db.getId('job_categories');
    return {
        name: faker.person.jobType(),
        job_category_id: jobCategoryId,
        sort_order: faker.number.int(50),
        created_by: faker.number.int(50),
        created: faker.date.past(),
        modified: faker.date.past(),
        deleted: getDeleted(),
    };
}

export async function generateJobRecord() {
    const jobCategoryId = await db.getId('job_categories');
    return {
        name: faker.person.jobTitle(),
        media_id: faker.number.int(50),
        job_category_id: jobCategoryId,
        job_type_id: faker.number.int(50),
        description: faker.lorem.paragraph(),
        detail: faker.lorem.paragraph(),
        business_skill: faker.lorem.sentence(),
        knowledge: faker.lorem.sentence(),
        location: faker.location.city(),
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
        estimated_total_workers: faker.number.int(50),
        remarks: faker.lorem.paragraph(),
        url: faker.internet.url(),
        seo_description: faker.lorem.sentence(),
        seo_keywords: faker.lorem.words(),
        sort_order: faker.number.int(50),
        publish_status: faker.datatype.boolean(),
        version: faker.number.int(50),
        created_by: faker.number.int(50),
        created: faker.date.past(),
        modified: faker.date.past(),
        deleted: getDeleted(),
    };
}
