CREATE TABLE jobs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    media_id INT,
    job_category_id INT,
    job_type_id INT,
    description TEXT,
    detail TEXT,
    business_skill TEXT,
    knowledge TEXT,
    location VARCHAR(255),
    activity TEXT,
    academic_degree_doctor BOOLEAN,
    academic_degree_master BOOLEAN,
    academic_degree_professional BOOLEAN,
    academic_degree_bachelor BOOLEAN,
    salary_statistic_group VARCHAR(255),
    salary_range_first_year DECIMAL(10, 2),
    salary_range_average DECIMAL(10, 2),
    salary_range_remarks TEXT,
    restriction TEXT,
    estimated_total_workers INT,
    remarks TEXT,
    url VARCHAR(255),
    seo_description TEXT,
    seo_keywords TEXT,
    sort_order INT,
    publish_status BOOLEAN,
    version INT,
    created_by INT,
    created DATETIME,
    modified DATETIME,
    deleted DATETIME
);

CREATE TABLE job_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    sort_order INT,
    created_by INT,
    created DATETIME,
    modified DATETIME,
    deleted DATETIME
);

CREATE TABLE job_types (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    job_category_id INT,
    sort_order INT,
    created_by INT,
    created DATETIME,
    modified DATETIME,
    deleted DATETIME
);

CREATE TABLE personalities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    created DATETIME,
    modified DATETIME,
    deleted DATETIME
);

CREATE TABLE jobs_personalities (
    job_id INT,
    personality_id INT,
    PRIMARY KEY (job_id, personality_id),
    FOREIGN KEY (job_id) REFERENCES jobs(id),
    FOREIGN KEY (personality_id) REFERENCES personalities(id)
);

CREATE TABLE practical_skills (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    created DATETIME,
    modified DATETIME,
    deleted DATETIME
);

CREATE TABLE jobs_practical_skills (
    job_id INT,
    practical_skill_id INT,
    PRIMARY KEY (job_id, practical_skill_id),
    FOREIGN KEY (job_id) REFERENCES jobs(id),
    FOREIGN KEY (practical_skill_id) REFERENCES practical_skills(id)
);

CREATE TABLE basic_abilities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    created DATETIME,
    modified DATETIME,
    deleted DATETIME
);

CREATE TABLE jobs_basic_abilities (
    job_id INT,
    basic_ability_id INT,
    PRIMARY KEY (job_id, basic_ability_id),
    FOREIGN KEY (job_id) REFERENCES jobs(id),
    FOREIGN KEY (basic_ability_id) REFERENCES basic_abilities(id)
);

CREATE TABLE affiliates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type INT,  -- You may need to adjust the type based on your actual setup
    name VARCHAR(255),
    created DATETIME,
    modified DATETIME,
    deleted DATETIME
);

CREATE TABLE jobs_tools (
    job_id INT,
    affiliate_id INT,
    PRIMARY KEY (job_id, affiliate_id),
    FOREIGN KEY (job_id) REFERENCES jobs(id),
    FOREIGN KEY (affiliate_id) REFERENCES affiliates(id)
);

CREATE TABLE jobs_career_paths (
    job_id INT,
    affiliate_id INT,
    PRIMARY KEY (job_id, affiliate_id),
    FOREIGN KEY (job_id) REFERENCES jobs(id),
    FOREIGN KEY (affiliate_id) REFERENCES affiliates(id)
);

CREATE TABLE jobs_rec_qualifications (
    job_id INT,
    affiliate_id INT,
    PRIMARY KEY (job_id, affiliate_id),
    FOREIGN KEY (job_id) REFERENCES jobs(id),
    FOREIGN KEY (affiliate_id) REFERENCES affiliates(id)
);

CREATE TABLE jobs_req_qualifications (
    job_id INT,
    affiliate_id INT,
    PRIMARY KEY (job_id, affiliate_id),
    FOREIGN KEY (job_id) REFERENCES jobs(id),
    FOREIGN KEY (affiliate_id) REFERENCES affiliates(id)
);
