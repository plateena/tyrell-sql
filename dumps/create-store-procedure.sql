DELIMITER //

CREATE PROCEDURE SearchJobs(IN search_term VARCHAR(255))
BEGIN
    -- Enable foreign key checks
    SET FOREIGN_KEY_CHECKS=0;

    -- Construct the pattern with the search term
    SET @search_pattern = CONCAT('%', search_term, '%');

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

    LEFT JOIN jobs_personalities JobsPersonalities ON Jobs.id = JobsPersonalities.job_id
    LEFT JOIN personalities Personalities ON Personalities.id = JobsPersonalities.personality_id AND Personalities.deleted IS NULL

    LEFT JOIN jobs_practical_skills JobsPracticalSkills ON Jobs.id = JobsPracticalSkills.job_id
    LEFT JOIN practical_skills PracticalSkills ON PracticalSkills.id = JobsPracticalSkills.practical_skill_id AND PracticalSkills.deleted IS NULL

    LEFT JOIN jobs_basic_abilities JobsBasicAbilities ON Jobs.id = JobsBasicAbilities.job_id
    LEFT JOIN basic_abilities BasicAbilities ON BasicAbilities.id = JobsBasicAbilities.basic_ability_id AND BasicAbilities.deleted IS NULL

    LEFT JOIN jobs_tools JobsTools ON Jobs.id = JobsTools.job_id
    LEFT JOIN affiliates Tools ON Tools.type = 1 AND Tools.id = JobsTools.affiliate_id AND Tools.deleted IS NULL

    LEFT JOIN jobs_career_paths JobsCareerPaths ON Jobs.id = JobsCareerPaths.job_id
    LEFT JOIN affiliates CareerPaths ON CareerPaths.type = 3 AND CareerPaths.id = JobsCareerPaths.affiliate_id AND CareerPaths.deleted IS NULL

    LEFT JOIN jobs_rec_qualifications JobsRecQualifications ON Jobs.id = JobsRecQualifications.job_id
    LEFT JOIN affiliates RecQualifications ON RecQualifications.type = 2 AND RecQualifications.id = JobsRecQualifications.affiliate_id AND RecQualifications.deleted IS NULL

    LEFT JOIN jobs_req_qualifications JobsReqQualifications ON Jobs.id = JobsReqQualifications.job_id
    LEFT JOIN affiliates ReqQualifications ON ReqQualifications.type = 2 AND ReqQualifications.id = JobsReqQualifications.affiliate_id AND ReqQualifications.deleted IS NULL

    INNER JOIN job_categories JobCategories ON JobCategories.id = Jobs.job_category_id AND JobCategories.deleted IS NULL
    INNER JOIN job_types JobTypes ON JobTypes.id = Jobs.job_type_id AND JobTypes.deleted IS NULL

    WHERE
        (
            JobCategories.name LIKE @search_pattern
            OR JobTypes.name LIKE @search_pattern
            OR Jobs.name LIKE @search_pattern
            OR Jobs.description LIKE @search_pattern
            OR Jobs.detail LIKE @search_pattern
            OR Jobs.business_skill LIKE @search_pattern
            OR Jobs.knowledge LIKE @search_pattern
            OR Jobs.location LIKE @search_pattern
            OR Jobs.activity LIKE @search_pattern
            OR Jobs.salary_statistic_group LIKE @search_pattern
            OR Jobs.salary_range_remarks LIKE @search_pattern
            OR Jobs.restriction LIKE @search_pattern
            OR Jobs.remarks LIKE @search_pattern
            OR Personalities.name LIKE @search_pattern
            OR PracticalSkills.name LIKE @search_pattern
            OR BasicAbilities.name LIKE @search_pattern
            OR Tools.name LIKE @search_pattern
            OR CareerPaths.name LIKE @search_pattern
            OR RecQualifications.name LIKE @search_pattern
            OR ReqQualifications.name LIKE @search_pattern
        )
        AND Jobs.publish_status = 1
        AND Jobs.deleted IS NULL

    GROUP BY Jobs.id

    ORDER BY Jobs.sort_order DESC, Jobs.id DESC;

    -- Enable foreign key checks
    SET FOREIGN_KEY_CHECKS=1;
END //

DELIMITER ;
