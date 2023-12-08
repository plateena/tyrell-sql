SELECT
    Jobs.id AS Job_id,
    Jobs.name AS Job_name,
    Jobs.media_id AS Job_media_id,
    Jobs.job_category_id AS Job_job_category_id,
    Jobs.job_type_id AS Job_job_type_id,
    Jobs.description AS Job_description,
    Jobs.detail AS Job_detail,
    Jobs.business_skill AS Job_business_skill,
    Jobs.knowledge AS Job_knowledge,
    Jobs.location AS Job_location,
    Jobs.activity AS Job_activity,
    Jobs.academic_degree_doctor AS Job_academic_degree_doctor,
    Jobs.academic_degree_master AS Job_academic_degree_master,
    Jobs.academic_degree_professional AS Job_academic_degree_professional,
    Jobs.academic_degree_bachelor AS Job_academic_degree_bachelor,
    Jobs.salary_statistic_group AS Job_salary_statistic_group,
    Jobs.salary_range_first_year AS Job_salary_range_first_year,
    Jobs.salary_range_average AS Job_salary_range_average,
    Jobs.salary_range_remarks AS Job_salary_range_remarks,
    Jobs.restriction AS Job_restriction,
    Jobs.estimated_total_workers AS Job_estimated_total_workers,
    Jobs.remarks AS Job_remarks,
    Jobs.url AS Job_url,
    Jobs.seo_description AS Job_seo_description,
    Jobs.seo_keywords AS Job_seo_keywords,
    Jobs.sort_order AS Job_sort_order,
    Jobs.publish_status AS Job_publish_status,
    Jobs.version AS Job_version,
    Jobs.created_by AS Job_created_by,
    Jobs.created AS Job_created,
    Jobs.modified AS Job_modified,
    Jobs.deleted AS Job_deleted,

    JobCategories.id AS JobCategories_id,
    JobCategories.name AS JobCategories_name,
    JobCategories.sort_order AS JobCategories_sort_order,
    JobCategories.created_by AS JobCategories_created_by,
    JobCategories.created AS JobCategories_created,
    JobCategories.modified AS JobCategories_modified,
    JobCategories.deleted AS JobCategories_deleted,

    JobTypes.id AS JobTypes_id,
    JobTypes.name AS JobTypes_name,
    JobTypes.job_category_id AS JobTypes_job_category_id,
    JobTypes.sort_order AS JobTypes_sort_order,
    JobTypes.created_by AS JobTypes_created_by,
    JobTypes.created AS JobTypes_created,
    JobTypes.modified AS JobTypes_modified,
    JobTypes.deleted AS JobTypes_deleted

FROM jobs Jobs

-- Joining Jobs to JobsPersonalities and Personalities
LEFT JOIN jobs_personalities JobsPersonalities ON Jobs.id = JobsPersonalities.job_id
LEFT JOIN personalities Personalities ON Personalities.id = JobsPersonalities.personality_id AND Personalities.deleted IS NULL

-- Joining Jobs to JobsPracticalSkills and PracticalSkills
LEFT JOIN jobs_practical_skills JobsPracticalSkills ON Jobs.id = JobsPracticalSkills.job_id
LEFT JOIN practical_skills PracticalSkills ON PracticalSkills.id = JobsPracticalSkills.practical_skill_id AND PracticalSkills.deleted IS NULL

-- Joining Jobs to JobsBasicAbilities and BasicAbilities
LEFT JOIN jobs_basic_abilities JobsBasicAbilities ON Jobs.id = JobsBasicAbilities.job_id
LEFT JOIN basic_abilities BasicAbilities ON BasicAbilities.id = JobsBasicAbilities.basic_ability_id AND BasicAbilities.deleted IS NULL

-- Joining Jobs to JobsTools and Tools (Affiliates)
LEFT JOIN jobs_tools JobsTools ON Jobs.id = JobsTools.job_id

-- Joining Jobs to JobsCareerPaths and CareerPaths (Affiliates)
LEFT JOIN jobs_career_paths JobsCareerPaths ON Jobs.id = JobsCareerPaths.job_id

-- Joining Jobs to JobsRecQualifications and RecQualifications (Affiliates)
LEFT JOIN jobs_rec_qualifications JobsRecQualifications ON Jobs.id = JobsRecQualifications.job_id

-- Joining Jobs to JobsReqQualifications and ReqQualifications (Affiliates)
LEFT JOIN jobs_req_qualifications JobsReqQualifications ON Jobs.id = JobsReqQualifications.job_id

-- join with affiliates with all Job_tools, job_career_paths, job_rec_qualifications and job_req_qualifications
LEFT JOIN affiliates ON  (
        ( affiliates.id = JobsTools.affiliate_id  AND affiliates.type = 1 )
        OR ( affiliates.id = JobCareerPaths.affiliate_id AND affiliates.type = 3 )
        OR ( affiliates.id = JobsRecQualifications.affiliate_id  AND affiliates.type = 2 )
        OR ( affiliates.id = JobsReqQualifications.affiliate_id AND affiliates.type = 2 )
    ) AND affiliates.deleted IS NULL

-- Joining Jobs to JobCategories
INNER JOIN job_categories JobCategories ON JobCategories.id = Jobs.job_category_id AND JobCategories.deleted IS NULL

-- Joining Jobs to JobTypes
INNER JOIN job_types JobTypes ON JobTypes.id = Jobs.job_type_id AND JobTypes.deleted IS NULL

WHERE
    (
        JobCategories.name LIKE '%ba%'
        OR JobTypes.name LIKE '%ba%'
        OR Jobs.name LIKE '%ba%'
        OR Jobs.description LIKE '%ba%'
        OR Jobs.detail LIKE '%ba%'
        OR Jobs.business_skill LIKE '%ba%'
        OR Jobs.knowledge LIKE '%ba%'
        OR Jobs.location LIKE '%ba%'
        OR Jobs.activity LIKE '%ba%'
        OR Jobs.salary_statistic_group LIKE '%ba%'
        OR Jobs.salary_range_remarks LIKE '%ba%'
        OR Jobs.restriction LIKE '%ba%'
        OR Jobs.remarks LIKE '%ba%'
        OR Personalities.name LIKE '%ba%'
        OR PracticalSkills.name LIKE '%ba%'
        OR BasicAbilities.name LIKE '%ba%'
        OR affiliates.name LIKE '%ba%'
    )
    AND Jobs.publish_status = 1
    AND Jobs.deleted IS NULL

GROUP BY Jobs.id

ORDER BY Jobs.sort_order DESC, Jobs.id DESC
LIMIT 50 OFFSET 0;
