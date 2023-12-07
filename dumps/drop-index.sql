SET FOREIGN_KEY_CHECKS=0;
-- Remove indexes for Jobs table
    DROP INDEX idx_jobs_id ON jobs;

-- Remove indexes for JobsPersonalities table
    DROP INDEX idx_jobs_personalities_job_id ON jobs_personalities;
    DROP INDEX idx_jobs_personalities_personality_id ON jobs_personalities;

-- Remove indexes for Personalities table
    DROP INDEX idx_personalities_id ON personalities;

-- Remove indexes for JobsPracticalSkills table
    DROP INDEX idx_jobs_practical_skills_job_id ON jobs_practical_skills;
    DROP INDEX idx_jobs_practical_skills_practical_skill_id ON jobs_practical_skills;
-- Remove indexes for PracticalSkills table
    DROP INDEX idx_practical_skills_id ON practical_skills;

-- Remove indexes for JobsBasicAbilities table
    DROP INDEX idx_jobs_basic_abilities_job_id ON jobs_basic_abilities;
    DROP INDEX idx_jobs_basic_abilities_basic_ability_id ON jobs_basic_abilities;

-- Remove indexes for BasicAbilities table
    DROP INDEX idx_basic_abilities_id ON basic_abilities;

-- Remove indexes for JobsTools table
    DROP INDEX idx_jobs_tools_job_id ON jobs_tools;
    DROP INDEX idx_jobs_tools_affiliate_id ON jobs_tools;

-- Remove indexes for Affiliates table (Tools)
    DROP INDEX idx_affiliates_id ON affiliates;
    DROP INDEX idx_affiliates_type_id ON affiliates;

-- Remove indexes for JobsCareerPaths table
    DROP INDEX idx_jobs_career_paths_job_id ON jobs_career_paths;
    DROP INDEX idx_jobs_career_paths_affiliate_id ON jobs_career_paths;

-- Remove indexes for Affiliates table (CareerPaths)
    DROP INDEX idx_affiliates_career_paths_id ON affiliates;

-- Remove indexes for JobsRecQualifications table
    DROP INDEX idx_jobs_rec_qualifications_job_id ON jobs_rec_qualifications;
    DROP INDEX idx_jobs_rec_qualifications_affiliate_id ON jobs_rec_qualifications;
-- Remove indexes for Affiliates table (RecQualifications)
    DROP INDEX idx_affiliates_rec_qualifications_id ON affiliates;

-- Remove indexes for JobsReqQualifications table
    DROP INDEX idx_jobs_req_qualifications_job_id ON jobs_req_qualifications;
    DROP INDEX idx_jobs_req_qualifications_affiliate_id ON jobs_req_qualifications;

-- Remove indexes for Affiliates table (ReqQualifications)
    DROP INDEX idx_affiliates_req_qualifications_id ON affiliates;

-- Remove indexes for JobCategories table
    DROP INDEX idx_job_categories_id ON job_categories;

-- Remove indexes for JobTypes table
    DROP INDEX idx_job_types_id ON job_types;
    DROP INDEX idx_job_types_job_category_id ON job_types;
