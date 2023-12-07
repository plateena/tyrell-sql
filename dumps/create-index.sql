-- CREATE INDEX idx_jobs_id ON jobs(id);
--
-- -- Index for JobsPersonalities table
-- CREATE INDEX idx_jobs_personalities_job_id ON jobs_personalities(job_id);
-- CREATE INDEX idx_jobs_personalities_personality_id ON jobs_personalities(personality_id);
--
-- -- Index for Personalities table
-- CREATE INDEX idx_personalities_id ON personalities(id);
--
-- -- Index for JobsPracticalSkills table
-- CREATE INDEX idx_jobs_practical_skills_job_id ON jobs_practical_skills(job_id);
-- CREATE INDEX idx_jobs_practical_skills_practical_skill_id ON jobs_practical_skills(practical_skill_id);
--
-- -- Index for PracticalSkills table
-- CREATE INDEX idx_practical_skills_id ON practical_skills(id);
--
-- -- Index for JobsBasicAbilities table
-- CREATE INDEX idx_jobs_basic_abilities_job_id ON jobs_basic_abilities(job_id);
-- CREATE INDEX idx_jobs_basic_abilities_basic_ability_id ON jobs_basic_abilities(basic_ability_id);
--
-- -- Index for BasicAbilities table
-- CREATE INDEX idx_basic_abilities_id ON basic_abilities(id);
--
-- -- Index for JobsTools table
-- CREATE INDEX idx_jobs_tools_job_id ON jobs_tools(job_id);
-- CREATE INDEX idx_jobs_tools_affiliate_id ON jobs_tools(affiliate_id);
--
-- -- Index for Affiliates table (Tools)
-- CREATE INDEX idx_affiliates_id ON affiliates(id);
-- CREATE INDEX idx_affiliates_type_id ON affiliates(type, id);
--
-- -- Index for JobsCareerPaths table
-- CREATE INDEX idx_jobs_career_paths_job_id ON jobs_career_paths(job_id);
-- CREATE INDEX idx_jobs_career_paths_affiliate_id ON jobs_career_paths(affiliate_id);
--
-- -- Index for Affiliates table (CareerPaths)
-- CREATE INDEX idx_affiliates_career_paths_id ON affiliates(type, id);
--
-- -- Index for JobsRecQualifications table
-- CREATE INDEX idx_jobs_rec_qualifications_job_id ON jobs_rec_qualifications(job_id);
-- CREATE INDEX idx_jobs_rec_qualifications_affiliate_id ON jobs_rec_qualifications(affiliate_id);
--
-- -- Index for Affiliates table (RecQualifications)
-- CREATE INDEX idx_affiliates_rec_qualifications_id ON affiliates(type, id);
--
-- -- Index for JobsReqQualifications table
-- CREATE INDEX idx_jobs_req_qualifications_job_id ON jobs_req_qualifications(job_id);
-- CREATE INDEX idx_jobs_req_qualifications_affiliate_id ON jobs_req_qualifications(affiliate_id);
--
-- -- Index for Affiliates table (ReqQualifications)
-- CREATE INDEX idx_affiliates_req_qualifications_id ON affiliates(type, id);
--
-- -- Index for JobCategories table
-- CREATE INDEX idx_job_categories_id ON job_categories(id);
--
-- -- Index for JobTypes table
-- CREATE INDEX idx_job_types_id ON job_types(id);
-- CREATE INDEX idx_job_types_job_category_id ON job_types(job_category_id);

ALTER TABLE `affiliates` ADD INDEX `affiliates_idx_type_deleted_id` (`type`,`deleted`,`id`);
ALTER TABLE `basic_abilities` ADD INDEX `basic_abilities_idx_deleted_id` (`deleted`,`id`);
ALTER TABLE `job_categories` ADD INDEX `job_categories_idx_deleted_id` (`deleted`,`id`);
ALTER TABLE `job_types` ADD INDEX `job_types_idx_deleted_id` (`deleted`,`id`);
ALTER TABLE `jobs` ADD INDEX `jobs_idx_publish_st_deleted_id` (`publish_status`,`deleted`,`id`);
ALTER TABLE `jobs_basic_abilities` ADD INDEX `jobs_abilities_idx_job_id` (`job_id`);
ALTER TABLE `jobs_career_paths` ADD INDEX `jobs_paths_idx_job_id` (`job_id`);
ALTER TABLE `jobs_personalities` ADD INDEX `jobs_personalities_idx_job_id` (`job_id`);
ALTER TABLE `jobs_practical_skills` ADD INDEX `jobs_skills_idx_job_id` (`job_id`);
ALTER TABLE `jobs_rec_qualifications` ADD INDEX `jobs_qualification_idx_job_id` (`job_id`);
ALTER TABLE `jobs_req_qualifications` ADD INDEX `jobs_qualification_idx_job_id` (`job_id`);
ALTER TABLE `jobs_tools` ADD INDEX `jobs_tools_idx_job_id` (`job_id`);
ALTER TABLE `personalities` ADD INDEX `personalities_idx_deleted_id` (`deleted`,`id`);
ALTER TABLE `practical_skills` ADD INDEX `practical_skills_idx_deleted_id` (`deleted`,`id`);
