import faker from 'faker';

export function generateJobCategory() {
    return {
        name: faker.name.jobType(),
        sort_order: faker.datatype.number(),
        created_by: faker.datatype.number(),
        created: faker.date.past(),
        modified: faker.date.past(),
        deleted: faker.date.future(),
    };
}
