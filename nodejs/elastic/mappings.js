export const jobMappings = {
    properties: {
        "Jobs__id": { "type": "integer" },
        "Jobs__name": { "type": "text" },
        "Jobs__media_id": { "type": "integer" },
        "Jobs__job_category_id": { "type": "integer" },
        "Jobs__job_type_id": { "type": "integer" },
        "Jobs__description": { "type": "text" },
        "Jobs__detail": { "type": "text" },
        "Jobs__business_skill": { "type": "text" },
        "Jobs__knowledge": { "type": "text" },
        "Jobs__location": { "type": "text" },
        "Jobs__activity": { "type": "text" },
        "Jobs__academic_degree_doctor": { "type": "integer" },
        "Jobs__academic_degree_master": { "type": "integer" },
        "Jobs__academic_degree_professional": { "type": "integer" },
        "Jobs__academic_degree_bachelor": { "type": "integer" },
        "Jobs__salary_statistic_group": { "type": "text" },
        "Jobs__salary_range_first_year": { "type": "float" },
        "Jobs__salary_range_average": { "type": "float" },
        "Jobs__salary_range_remarks": { "type": "text" },
        "Jobs__restriction": { "type": "text" },
        "Jobs__estimated_total_workers": { "type": "integer" },
        "Jobs__remarks": { "type": "text" },
        "Jobs__url": { "type": "keyword" },
        "Jobs__seo_description": { "type": "text" },
        "Jobs__seo_keywords": { "type": "text" },
        "Jobs__sort_order": { "type": "integer" },
        "Jobs__publish_status": { "type": "integer" },
        "Jobs__version": { "type": "integer" },
        "Jobs__created_by": { "type": "integer" },
        "Jobs__created": { "type": "date" },
        "Jobs__modified": { "type": "date" },
        "Jobs__deleted": { "type": "date" },
    },
};

export const categoryMappings = {
    properties: {
        "JobCategories__id": { "type": "integer" },
        "JobCategories__name": { "type": "text" },
        "JobCategories__sort_order": { "type": "integer" },
        "JobCategories__created_by": { "type": "integer" },
        "JobCategories__created": { "type": "date" },
        "JobCategories__modified": { "type": "date" },
        "JobCategories__deleted": { "type": "date" },
    },
};

export const typeMappings = {
    properties: {
        "JobTypes__id": { "type": "integer" },
        "JobTypes__name": { "type": "text" },
        "JobTypes__job_category_id": { "type": "integer" },
        "JobTypes__sort_order": { "type": "integer" },
        "JobTypes__created_by": { "type": "integer" },
        "JobTypes__created": { "type": "date" },
        "JobTypes__modified": { "type": "date" },
        "JobTypes__deleted": { "type": "date" }
    },
};

export const additionalMappings = {
    properties: {
        "Personalities__name": { "type": "text" },
        "PracticalSkills__name": { "type": "text" },
        "BasicAbilities__name": { "type": "text" },
        "Tools__name": { "type": "text" },
        "CareerPaths__name": { "type": "text" },
        "RecQualifications__name": { "type": "text" },
        "ReqQualifications__name": { "type": "text" },
        // ... other additional properties
    },
};

export const fieldNamesArray = [
    "Jobs__name",
    "JobTypes__name",
    "JobCategories__name",
    "JobTypes__name",
    "Jobs__name",
    "Jobs__description",
    "Jobs__detail",
    "Jobs__business_skill",
    "Jobs__knowledge",
    "Jobs__location",
    "Jobs__activity",
    "Jobs__salary_statistic_group",
    "Jobs__salary_range_remarks",
    "Jobs__restriction",
    "Jobs__remarks",
    "Personalities__name",
    "PracticalSkills__name",
    "BasicAbilities__name",
    "Tools__name",
    "CareerPaths__name",
    "RecQualifications__name",
    "ReqQualifications__name",
];
