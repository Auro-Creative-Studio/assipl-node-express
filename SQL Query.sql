CREATE TABLE assipl_seo (
    id INT(11) NOT NULL AUTO_INCREMENT,
    page_type VARCHAR(100) NOT NULL UNIQUE,
    meta_title VARCHAR(255) NOT NULL,
    meta_description TEXT NULL,
    meta_keywords TEXT NULL,
    og_title VARCHAR(255) NULL,
    og_description TEXT NULL,
    og_image VARCHAR(255) NULL,
    image_alt_text VARCHAR(255) NULL,
    robots_index ENUM('index', 'noindex') DEFAULT 'index',
    robots_follow ENUM('follow', 'nofollow') DEFAULT 'follow',
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
CREATE TABLE assipl_cookie_consents (
    id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    ip_address VARCHAR(45) NULL,
    consent_type VARCHAR(50) NULL,
    device VARCHAR(100) NULL,
    created_at DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
--  contact table create query
CREATE TABLE assipl_contact (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE assipl_enquiry (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    mobile_number VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    service_needed VARCHAR(255) NOT NULL,
    budget_rs DECIMAL(10, 2) DEFAULT NULL,
    company_brief TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- blog table create query
CREATE TABLE assipl_blogs (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) DEFAULT NULL UNIQUE,
    featured_image VARCHAR(255) DEFAULT NULL,
    main_image VARCHAR(255) DEFAULT NULL,
    blog_image_1 VARCHAR(255) DEFAULT NULL,
    blog_image_2 VARCHAR(255) DEFAULT NULL,
    description_1 LONGTEXT DEFAULT NULL,
    description_2 LONGTEXT DEFAULT NULL,
    description_3 LONGTEXT DEFAULT NULL,
    meta_title VARCHAR(255) DEFAULT NULL,
    meta_description TEXT DEFAULT NULL,
    meta_keywords TEXT DEFAULT NULL,
    og_title VARCHAR(255) DEFAULT NULL,
    og_description TEXT DEFAULT NULL,
    og_image VARCHAR(255) DEFAULT NULL,
    image_alt_text VARCHAR(255) DEFAULT NULL,
    robots_index ENUM('index', 'noindex') DEFAULT 'index',
    robots_follow ENUM('follow', 'nofollow') DEFAULT 'follow',
    published TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
-- user tabele changes
RENAME TABLE users TO assipl_users;
ALTER TABLE assipl_users
ADD COLUMN password VARCHAR(255) NOT NULL
AFTER email;
-- cookie table alter query
ALTER TABLE assipl_cookie_consents
ADD COLUMN session_id VARCHAR(255) NOT NULL
AFTER id,
    ADD COLUMN country VARCHAR(255) NULL
AFTER ip_address,
    ADD COLUMN city VARCHAR(255) NULL
AFTER country,
    ADD COLUMN consent_timestamp DATETIME NULL
AFTER city,
    ADD COLUMN latitude VARCHAR(255) NULL
AFTER consent_type,
    ADD COLUMN longitude VARCHAR(255) NULL
AFTER latitude,
    ADD COLUMN language VARCHAR(255) NULL
AFTER device,
    ADD COLUMN timezone VARCHAR(255) NULL
AFTER language;
-- CREATE USER ROLES TABLE
CREATE TABLE assipl_user_roles (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) DEFAULT NULL,
    type VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
-- INSERT DEFAULT ROLES
INSERT INTO assipl_user_roles (name, description, type)
VALUES ('Admin', 'System Administrator', 'admin'),
    (
        'Super Admin',
        'Full System Access',
        'super_admin'
    ),
    ('Editor', 'Content Management Access', 'editor');
-- ADD ROLE ID COLUMN TO USERS TABLE
ALTER TABLE assipl_users
ADD COLUMN role_id INT(11) DEFAULT NULL
AFTER password;
-- CREATE FOREIGN KEY RELATION
ALTER TABLE assipl_users
ADD CONSTRAINT fk_assipl_users_role FOREIGN KEY (role_id) REFERENCES assipl_user_roles(id) ON DELETE
SET NULL ON UPDATE CASCADE;
-- REMOVE OLD NAME COLUMN
ALTER TABLE assipl_users DROP COLUMN name;
-- ADD FIRST NAME, LAST NAME, PHONE NUMBER
ALTER TABLE assipl_users
ADD COLUMN first_name VARCHAR(255) NULL
AFTER id,
    ADD COLUMN last_name VARCHAR(255) NULL
AFTER first_name,
    ADD COLUMN phone_number VARCHAR(20) NULL
AFTER email;
-- CREATE PASSWORD RESET OTP TABLE
CREATE TABLE assipl_password_reset_otps (
    id INT(11) NOT NULL AUTO_INCREMENT,
    user_id INT(11) NOT NULL,
    otp_hash VARCHAR(255) NOT NULL,
    purpose ENUM('forgot_password', 'profile_password_reset') NOT NULL,
    expires_at DATETIME NOT NULL,
    used_at DATETIME DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_assipl_password_reset_otps_user_purpose (user_id, purpose),
    CONSTRAINT fk_assipl_password_reset_otps_user FOREIGN KEY (user_id) REFERENCES assipl_users(id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- contact form modification 
ALTER TABLE assipl_contact
ADD COLUMN mobile_number VARCHAR(20) NOT NULL;
ALTER TABLE assipl_contact
ADD COLUMN terms_accepted TINYINT NOT NULL DEFAULT 0;
// description field added for blogs
ALTER TABLE assipl_blogs
ADD COLUMN description LONGTEXT NULL
AFTER description_3;

// description field added for blogs
ALTER TABLE assipl_blogs 
ADD COLUMN description LONGTEXT NULL AFTER description_3;


CREATE TABLE assipl_home_pages (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    service_heading VARCHAR(255),
    service_subheading TEXT,
    video_section TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE assipl_home_partners (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    home_page_id BIGINT UNSIGNED NOT NULL,
    logo VARCHAR(500) NOT NULL,
    display_order INT DEFAULT 0,
    FOREIGN KEY (home_page_id) REFERENCES home_pages(id) ON DELETE CASCADE
);

CREATE TABLE assipl_home_services (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    home_page_id BIGINT UNSIGNED NOT NULL,
    service_image VARCHAR(500),
    service_title VARCHAR(255) NOT NULL,
    service_description TEXT,
    display_order INT DEFAULT 0,
    FOREIGN KEY (home_page_id) REFERENCES home_pages(id) ON DELETE CASCADE
);

CREATE TABLE assipl_home_why_us (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    home_page_id BIGINT UNSIGNED NOT NULL,
    whyus_title VARCHAR(255),
    whyus_description TEXT,
    whyus_number VARCHAR(100),
    whyus_button VARCHAR(100),
    whyus_link VARCHAR(500),
    display_order INT DEFAULT 0,
    FOREIGN KEY (home_page_id) REFERENCES home_pages(id) ON DELETE CASCADE
);

CREATE TABLE assipl_home_strategic_media_logos (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    home_page_id BIGINT UNSIGNED NOT NULL,
    logo VARCHAR(500) NOT NULL,
    display_order INT DEFAULT 0,
    FOREIGN KEY (home_page_id) REFERENCES home_pages(id) ON DELETE CASCADE
);

CREATE TABLE assipl_home_growth_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    home_page_id BIGINT UNSIGNED NOT NULL,
    growth_image VARCHAR(500),
    growth_title VARCHAR(255),
    growth_description TEXT,
    display_order INT DEFAULT 0,
    FOREIGN KEY (home_page_id) REFERENCES home_pages(id) ON DELETE CASCADE
);

CREATE TABLE assipl_home_testimonials (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    home_page_id BIGINT UNSIGNED NOT NULL,
    testimonial_image VARCHAR(500),
    person_name VARCHAR(255),
    designation VARCHAR(255),
    content_1 TEXT,
    content_2 TEXT,
    star_rating DECIMAL(2,1) DEFAULT 5.0,
    display_order INT DEFAULT 0,
    FOREIGN KEY (home_page_id) REFERENCES home_pages(id) ON DELETE CASCADE
);
CREATE TABLE assipl_services_categories (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    category_title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    content TEXT NULL,
    image TEXT NULL,
    tagline VARCHAR(255) NULL,
    tagline_description TEXT NULL,
    stats JSON NULL,
    display_order INT NOT NULL DEFAULT 0,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_assipl_services_categories_slug (slug)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
CREATE TABLE assipl_services_sub_categories (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    category_id BIGINT UNSIGNED NOT NULL,
    sub_category_title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    image TEXT NULL,
    content TEXT NULL,
    display_order INT NOT NULL DEFAULT 0,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_assipl_services_sub_categories_slug (slug),
    KEY idx_assipl_services_sub_categories_category_id (category_id),
    CONSTRAINT fk_assipl_sub_categories_category FOREIGN KEY (category_id) REFERENCES assipl_services_categories(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
CREATE TABLE assipl_services (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    category_id BIGINT UNSIGNED NOT NULL,
    sub_category_id BIGINT UNSIGNED NOT NULL,
    title VARCHAR(255) NOT NULL,
    sub_title VARCHAR(255) NULL,
    description TEXT NULL,
    featured_image TEXT NULL,
    image_alt VARCHAR(255) NULL,
    link_text VARCHAR(150) NULL,
    slug VARCHAR(255) NOT NULL,
    whats_included_title VARCHAR(255) NULL,
    our_approach_title VARCHAR(255) NULL,
    our_approach_description TEXT NULL,
    our_approach_quote TEXT NULL,
    what_we_do_title VARCHAR(255) NULL,
    what_we_do_subtitle VARCHAR(255) NULL,
    what_we_do_description TEXT NULL,
    what_we_do_primary_card_title VARCHAR(255) NULL,
    what_we_do_primary_card_description TEXT NULL,
    what_we_do_secondary_card_title VARCHAR(255) NULL,
    what_we_do_secondary_card_description TEXT NULL,
    display_order INT NOT NULL DEFAULT 0,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_assipl_services_slug (slug),
    KEY idx_assipl_services_category_id (category_id),
    KEY idx_assipl_services_sub_category_id (sub_category_id),
    CONSTRAINT fk_assipl_services_category FOREIGN KEY (category_id) REFERENCES assipl_services_categories(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_assipl_services_sub_category FOREIGN KEY (sub_category_id) REFERENCES assipl_services_sub_categories(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
CREATE TABLE assipl_services_benefits (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    service_id BIGINT UNSIGNED NOT NULL,
    title VARCHAR(255) NOT NULL,
    sub_title VARCHAR(255) NULL,
    featured_list JSON NULL,
    display_order INT NOT NULL DEFAULT 0,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_assipl_services_benefits_service_id (service_id),
    CONSTRAINT fk_assipl_services_benefits_service FOREIGN KEY (service_id) REFERENCES assipl_services(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
CREATE TABLE assipl_services_inclusions (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    service_id BIGINT UNSIGNED NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    display_order INT NOT NULL DEFAULT 0,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_assipl_services_inclusions_service_id (service_id),
    CONSTRAINT fk_assipl_services_inclusions_service FOREIGN KEY (service_id) REFERENCES assipl_services(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
CREATE TABLE assipl_services_approach (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    service_id BIGINT UNSIGNED NOT NULL,
    featured_title VARCHAR(255) NOT NULL,
    featured_content TEXT NULL,
    display_order INT NOT NULL DEFAULT 0,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_assipl_services_approach_service_id (service_id),
    CONSTRAINT fk_assipl_services_approach_service FOREIGN KEY (service_id) REFERENCES assipl_services(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
ALTER TABLE assipl_services
ADD COLUMN service_benefits_id BIGINT UNSIGNED NULL
AFTER what_we_do_secondary_card_description,
    ADD COLUMN service_inclusion_id BIGINT UNSIGNED NULL
AFTER service_benefits_id,
    ADD COLUMN service_approach_id BIGINT UNSIGNED NULL
AFTER service_inclusion_id;
ALTER TABLE assipl_services
ADD INDEX idx_assipl_services_benefits_id (service_benefits_id),
    ADD INDEX idx_assipl_services_inclusion_id (service_inclusion_id),
    ADD INDEX idx_assipl_services_approach_id (service_approach_id);
ALTER TABLE assipl_services
ADD CONSTRAINT fk_assipl_services_benefits_id FOREIGN KEY (service_benefits_id) REFERENCES assipl_services_benefits(id) ON DELETE
SET NULL ON UPDATE CASCADE;
ALTER TABLE assipl_services
ADD CONSTRAINT fk_assipl_services_inclusion_id FOREIGN KEY (service_inclusion_id) REFERENCES assipl_services_inclusions(id) ON DELETE
SET NULL ON UPDATE CASCADE;
ALTER TABLE assipl_services
ADD CONSTRAINT fk_assipl_services_approach_id FOREIGN KEY (service_approach_id) REFERENCES assipl_services_approach(id) ON DELETE
SET NULL ON UPDATE CASCADE;
CREATE TABLE assipl_case_study_category (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    image VARCHAR(500) DEFAULT NULL,
    case_study_title VARCHAR(255) NOT NULL,
    description TEXT DEFAULT NULL,
    case_study_badge JSON DEFAULT NULL,
    status TINYINT(1) NOT NULL DEFAULT 1,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
CREATE TABLE assipl_case_study (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    category_id BIGINT UNSIGNED NOT NULL,
    image VARCHAR(500) DEFAULT NULL,
    case_study_heading VARCHAR(255) NOT NULL,
    case_study_content LONGTEXT DEFAULT NULL,
    project_overview_title VARCHAR(255) DEFAULT NULL,
    project_overview_content LONGTEXT DEFAULT NULL,
    project_overview_description LONGTEXT DEFAULT NULL,
    project_overview_image VARCHAR(500) DEFAULT NULL,
    challenge_title VARCHAR(255) DEFAULT NULL,
    challenge_subtitle VARCHAR(255) DEFAULT NULL,
    challenge_description LONGTEXT DEFAULT NULL,
    challenge_list JSON DEFAULT NULL,
    what_build_title VARCHAR(255) DEFAULT NULL,
    what_build_description LONGTEXT DEFAULT NULL,
    impact_title VARCHAR(255) DEFAULT NULL,
    impact_description LONGTEXT DEFAULT NULL,
    impact_tagline VARCHAR(500) DEFAULT NULL,
    strategic_title VARCHAR(255) DEFAULT NULL,
    strategic_description LONGTEXT DEFAULT NULL,
    slug VARCHAR(255) NOT NULL,
    meta_title VARCHAR(255) DEFAULT NULL,
    meta_description TEXT DEFAULT NULL,
    status TINYINT(1) NOT NULL DEFAULT 1,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY assipl_case_study_slug_unique (slug),
    KEY assipl_case_study_category_id_index (category_id),
    CONSTRAINT assipl_case_study_category_fk FOREIGN KEY (category_id) REFERENCES assipl_case_study_category (id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
CREATE TABLE assipl_case_study_items (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    case_study_id BIGINT UNSIGNED NOT NULL,
    title VARCHAR(255) NOT NULL,
    content LONGTEXT DEFAULT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY assipl_case_study_items_case_study_id_index (case_study_id),
    CONSTRAINT assipl_case_study_items_case_study_fk FOREIGN KEY (case_study_id) REFERENCES assipl_case_study (id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
CREATE TABLE assipl_case_study_overview (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    case_study_id BIGINT UNSIGNED NOT NULL,
    icon VARCHAR(255) DEFAULT NULL,
    content LONGTEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY assipl_case_study_overview_case_study_id_index (case_study_id),
    CONSTRAINT assipl_case_study_overview_case_study_fk FOREIGN KEY (case_study_id) REFERENCES assipl_case_study (id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
CREATE TABLE assipl_case_study_strategy (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    case_study_id BIGINT UNSIGNED NOT NULL,
    title VARCHAR(255) NOT NULL,
    content LONGTEXT DEFAULT NULL,
    icon VARCHAR(255) DEFAULT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY assipl_case_study_strategy_case_study_id_index (case_study_id),
    CONSTRAINT assipl_case_study_strategy_case_study_fk FOREIGN KEY (case_study_id) REFERENCES assipl_case_study (id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
CREATE TABLE assipl_case_study_what_we_build (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    case_study_id BIGINT UNSIGNED NOT NULL,
    title VARCHAR(255) NOT NULL,
    description LONGTEXT DEFAULT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY assipl_case_study_build_case_study_id_index (case_study_id),
    CONSTRAINT assipl_case_study_build_case_study_fk FOREIGN KEY (case_study_id) REFERENCES assipl_case_study (id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
CREATE TABLE assipl_case_study_impact (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    case_study_id BIGINT UNSIGNED NOT NULL,
    title VARCHAR(255) NOT NULL,
    content LONGTEXT DEFAULT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY assipl_case_study_impact_case_study_id_index (case_study_id),
    CONSTRAINT assipl_case_study_impact_case_study_fk FOREIGN KEY (case_study_id) REFERENCES assipl_case_study (id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
ALTER TABLE assipl_case_study
ADD COLUMN challenge_image VARCHAR(255) NULL,
    ADD COLUMN what_we_built_image VARCHAR(255) NULL;
CREATE TABLE assipl_ai_capabilities (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    hero_image_bg VARCHAR(255) DEFAULT NULL,
    hero_title VARCHAR(255) NOT NULL,
    hero_description TEXT DEFAULT NULL,
    four_functions_title1 VARCHAR(255) DEFAULT NULL,
    four_functions_title2 VARCHAR(255) DEFAULT NULL,
    four_functions_description TEXT DEFAULT NULL,
    four_principles_title VARCHAR(255) DEFAULT NULL,
    four_principles_description TEXT DEFAULT NULL,
    ai_advantage_title VARCHAR(255) DEFAULT NULL,
    ai_advantage_description TEXT DEFAULT NULL,
    ai_advantage_bg VARCHAR(255) DEFAULT NULL,
    ai_advantage_tagline VARCHAR(255) DEFAULT NULL,
    status TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
CREATE TABLE assipl_ai_capabilities_four_functions (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    ai_capability_id INT UNSIGNED NOT NULL,
    four_functions_icon VARCHAR(255) DEFAULT NULL,
    four_functions_headline VARCHAR(255) NOT NULL,
    four_functions_desc TEXT DEFAULT NULL,
    four_functions_list JSON DEFAULT NULL,
    four_functions_outcome TEXT DEFAULT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    status TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_ai_functions_capability_id (ai_capability_id),
    CONSTRAINT fk_ai_functions_capability FOREIGN KEY (ai_capability_id) REFERENCES assipl_ai_capabilities(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
CREATE TABLE assipl_ai_capabilities_four_principles (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    ai_capability_id INT UNSIGNED NOT NULL,
    four_principles_headline VARCHAR(255) NOT NULL,
    four_principles_desc TEXT DEFAULT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    status TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_ai_principles_capability_id (ai_capability_id),
    CONSTRAINT fk_ai_principles_capability FOREIGN KEY (ai_capability_id) REFERENCES assipl_ai_capabilities(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
CREATE TABLE assipl_ai_capabilities_ai_advantage (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    ai_capability_id INT UNSIGNED NOT NULL,
    ai_advantage_icon VARCHAR(255) DEFAULT NULL,
    ai_advantage_headline VARCHAR(255) NOT NULL,
    ai_advantage_desc TEXT DEFAULT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    status TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_ai_advantage_capability_id (ai_capability_id),
    CONSTRAINT fk_ai_advantage_capability FOREIGN KEY (ai_capability_id) REFERENCES assipl_ai_capabilities(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
CREATE TABLE assipl_about (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    about_title VARCHAR(255) NOT NULL,
    about_description TEXT,
    about_image VARCHAR(500),
    our_story_tagline VARCHAR(255),
    our_story_description LONGTEXT,
    ecosystem_description LONGTEXT,
    people_behind_title VARCHAR(255),
    people_behind_name VARCHAR(255),
    people_behind_image VARCHAR(500),
    people_behind_designation VARCHAR(255),
    people_behind_description LONGTEXT,
    people_behind_tagline_description LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE assipl_about_our_story (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    our_story_year VARCHAR(20) NOT NULL,
    our_story_headline VARCHAR(255) NOT NULL,
    our_story_desc LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE assipl_about_what_standsfor (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    mission_description LONGTEXT,
    vision_description LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE assipl_about_values (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    value VARCHAR(255) NOT NULL,
    description LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE assipl_about_how_we_think (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    how_we_think_headline VARCHAR(255) NOT NULL,
    how_we_think_description LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE assipl_about_people_behind_tags (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    icon VARCHAR(500),
    tags VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE assipl_about_result (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    value VARCHAR(100) NOT NULL,
    label VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE assipl_about_ecosystem (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    ecosystem_item VARCHAR(255) NOT NULL,
    ecosystem_link VARCHAR(500),
    sort_order TINYINT UNSIGNED DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE assipl_process (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    process_title VARCHAR(255) NOT NULL,
    process_subtitle VARCHAR(255),
    process_description LONGTEXT,
    process_image VARCHAR(500),
    growth_description LONGTEXT,
    cta_image VARCHAR(500),
    cta_headline1 VARCHAR(255),
    cta_button VARCHAR(100),
    cta_link VARCHAR(500),
    system_works_description LONGTEXT,
    reporting_desc LONGTEXT,
    reporting_insight_tagline VARCHAR(255),
    reporting_insight_title VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE assipl_process_reporting (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    headline VARCHAR(255) NOT NULL,
    description LONGTEXT,
    sort_order TINYINT UNSIGNED DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE assipl_process_reporting_insights (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    insight VARCHAR(255) NOT NULL,
    sort_order TINYINT UNSIGNED DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE assipl_process_system_works (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    system_works_headline VARCHAR(255) NOT NULL,
    system_works_description1 LONGTEXT,
    system_works_tagline VARCHAR(255),
    system_works_image VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE assipl_process_system_works_list (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    system_work_id INT UNSIGNED NOT NULL,
    system_work_item VARCHAR(255) NOT NULL,
    sort_order TINYINT UNSIGNED DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_process_system_works_list_parent FOREIGN KEY (system_work_id) REFERENCES assipl_process_system_works(id) ON DELETE CASCADE
);
CREATE TABLE assipl_process_growth (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    growth_icon VARCHAR(500),
    growth_headline VARCHAR(255) NOT NULL,
    growth_description LONGTEXT,
    sort_order TINYINT UNSIGNED DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
ALTER TABLE assipl_process_system_works_list
ADD COLUMN system_work_id INT UNSIGNED NOT NULL
AFTER id,
    ADD INDEX idx_process_system_works_list_parent (system_work_id),
    ADD CONSTRAINT fk_process_system_works_list_parent FOREIGN KEY (system_work_id) REFERENCES assipl_process_system_works(id) ON DELETE CASCADE;


CREATE TABLE assipl_testimonials (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    designation VARCHAR(255),
    testimonial_content LONGTEXT NOT NULL,
    rating_star TINYINT UNSIGNED NOT NULL DEFAULT 5,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CHECK (
        rating_star BETWEEN 1 AND 5
    )
);

CREATE TABLE assipl_contact_page (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    contact_title VARCHAR(255) NOT NULL,
    contact_description TEXT,
    company_name VARCHAR(255) DEFAULT NULL,

    address TEXT NOT NULL,
    email VARCHAR(255) NOT NULL,
    phoneno VARCHAR(30) NOT NULL,

    facebook_link VARCHAR(500) DEFAULT NULL,
    linkedin_link VARCHAR(500) DEFAULT NULL,
    instagram_link VARCHAR(500) DEFAULT NULL,
    twitter_link VARCHAR(500) DEFAULT NULL,

    latitude_value DECIMAL(10, 8) DEFAULT NULL,
    longitude_value DECIMAL(11, 8) DEFAULT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE assipl_case_study_challenges (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

-- link case study challenges to their parent case study, matching the other child sections
ALTER TABLE assipl_case_study_challenges
ADD COLUMN case_study_id BIGINT UNSIGNED NOT NULL AFTER id,
ADD COLUMN sort_order INT NOT NULL DEFAULT 0 AFTER description;

ALTER TABLE assipl_case_study_challenges
ADD KEY assipl_case_study_challenges_case_study_id_index (case_study_id),
ADD CONSTRAINT assipl_case_study_challenges_case_study_fk
    FOREIGN KEY (case_study_id)
    REFERENCES assipl_case_study (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE;

-- replaced by the assipl_case_study_challenges relation above
ALTER TABLE assipl_case_study
DROP COLUMN challenge_list;

ALTER TABLE assipl_about_values
ADD COLUMN description LONGTEXT NULL AFTER value;

ALTER TABLE `assipl_home_pages`
ADD COLUMN `hero_video` TEXT NULL AFTER `id`,
ADD COLUMN `title1` VARCHAR(255) NULL AFTER `hero_video`,
ADD COLUMN `title2` VARCHAR(255) NULL AFTER `title1`,
ADD COLUMN `title3` VARCHAR(255) NULL AFTER `title2`,
ADD COLUMN `subtitle` TEXT NULL AFTER `title3`;
CREATE TABLE IF NOT EXISTS assipl_newsletter_subscribers (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE assipl_single_service (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,

    banner_title VARCHAR(255) DEFAULT NULL,
    banner_image VARCHAR(500) DEFAULT NULL,
    breadcrumb_title VARCHAR(255) DEFAULT NULL,

    featured_image VARCHAR(500) DEFAULT NULL,

    overview_title VARCHAR(255) DEFAULT NULL,
    overview_description LONGTEXT DEFAULT NULL,

    service_advantages_title VARCHAR(255) DEFAULT NULL,
    service_advantages_description TEXT DEFAULT NULL,

    service_models_title VARCHAR(255) DEFAULT NULL,
    service_models_description TEXT DEFAULT NULL,

    cta_title VARCHAR(255) DEFAULT NULL,
    cta_description TEXT DEFAULT NULL,
    cta_image VARCHAR(500) DEFAULT NULL,

    status TINYINT(1) NOT NULL DEFAULT 1,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_single_service_slug (slug),
    INDEX idx_single_service_status (status)
);

CREATE TABLE assipl_single_service_advantages (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    service_id INT UNSIGNED NOT NULL,

    title VARCHAR(255) NOT NULL,
    description TEXT DEFAULT NULL,
    sort_order INT NOT NULL DEFAULT 0,

    status TINYINT(1) NOT NULL DEFAULT 1,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_service_advantages_service
        FOREIGN KEY (service_id)
        REFERENCES assipl_single_service(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    INDEX idx_service_advantages_service_id (service_id),
    INDEX idx_service_advantages_sort_order (sort_order)
);

CREATE TABLE assipl_single_services_models (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    service_id INT UNSIGNED NOT NULL,

    title VARCHAR(255) NOT NULL,
    image VARCHAR(500) DEFAULT NULL,
    description LONGTEXT DEFAULT NULL,
    sort_order INT NOT NULL DEFAULT 0,

    status TINYINT(1) NOT NULL DEFAULT 1,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_service_models_service
        FOREIGN KEY (service_id)
        REFERENCES assipl_single_service(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    INDEX idx_service_models_service_id (service_id),
    INDEX idx_service_models_sort_order (sort_order)
);

CREATE TABLE assipl_enquire_form (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) DEFAULT NULL,
    email VARCHAR(255) NOT NULL,
    contact_number VARCHAR(50) NOT NULL,
    message TEXT DEFAULT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE assipl_contact_form (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) DEFAULT NULL,
    message TEXT DEFAULT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE assipl_career_positions (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    position_name VARCHAR(255) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    status TINYINT(1) NOT NULL DEFAULT 1,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE assipl_career_form (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,

    position_id INT UNSIGNED NOT NULL,

    message TEXT DEFAULT NULL,
    upload_resume VARCHAR(500) DEFAULT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_career_form_position
        FOREIGN KEY (position_id)
        REFERENCES assipl_career_positions(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    INDEX idx_career_position_id (position_id)
);

CREATE TABLE assipl_csr (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    banner_image VARCHAR(500) DEFAULT NULL,

    intro_title VARCHAR(255) DEFAULT NULL,
    intro_description LONGTEXT DEFAULT NULL,

    project_title VARCHAR(255) DEFAULT NULL,
    project_description LONGTEXT DEFAULT NULL,

    meta_title VARCHAR(255) DEFAULT NULL,
    meta_description TEXT DEFAULT NULL,

    status TINYINT(1) NOT NULL DEFAULT 1,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE assipl_csr_intro_images (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    csr_id INT UNSIGNED NOT NULL,

    image VARCHAR(500) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    status TINYINT(1) NOT NULL DEFAULT 1,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_csr_intro_images
        FOREIGN KEY (csr_id)
        REFERENCES assipl_csr(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    INDEX idx_csr_intro_images_csr_id (csr_id),
    INDEX idx_csr_intro_images_sort_order (sort_order)
);

CREATE TABLE assipl_csr_slider_images (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    csr_id INT UNSIGNED NOT NULL,

    image VARCHAR(500) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    status TINYINT(1) NOT NULL DEFAULT 1,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_csr_slider_images
        FOREIGN KEY (csr_id)
        REFERENCES assipl_csr(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    INDEX idx_csr_slider_images_csr_id (csr_id),
    INDEX idx_csr_slider_images_sort_order (sort_order)
);

ALTER TABLE assipl_csr
ADD COLUMN meta_keywords TEXT DEFAULT NULL,
ADD COLUMN og_title VARCHAR(255) DEFAULT NULL,
ADD COLUMN og_description TEXT DEFAULT NULL,
ADD COLUMN og_image VARCHAR(255) DEFAULT NULL,
ADD COLUMN image_alt_text VARCHAR(255) DEFAULT NULL,
ADD COLUMN robots_index ENUM('index', 'noindex') NOT NULL DEFAULT 'index',
ADD COLUMN robots_follow ENUM('follow', 'nofollow') NOT NULL DEFAULT 'follow',
ADD COLUMN published TINYINT(1) NOT NULL DEFAULT 1;


ALTER TABLE assipl_products ADD COLUMN menu_title VARCHAR(255) NULL;

ALTER TABLE assipl_products
  ADD COLUMN sort_order INT NOT NULL DEFAULT 0;

ALTER TABLE assipl_single_service
  ADD COLUMN sort_order INT NOT NULL DEFAULT 0;

CREATE TABLE assipl_about (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    -- Banner Section
    banner_image VARCHAR(500) DEFAULT NULL,
    banner_title VARCHAR(255) DEFAULT NULL,
    banner_description TEXT DEFAULT NULL,

    -- About Section
    about_image VARCHAR(500) DEFAULT NULL,
    about_title VARCHAR(255) DEFAULT NULL,
    about_description LONGTEXT DEFAULT NULL,
    download_brochure VARCHAR(500) DEFAULT NULL,

    -- Manufacturer Section
    manufacture_title VARCHAR(255) DEFAULT NULL,

    -- Securing the Future Section
    securing_title VARCHAR(255) DEFAULT NULL,
    securing_description LONGTEXT DEFAULT NULL,
    securing_image VARCHAR(500) DEFAULT NULL,

    -- Future Section
    future_title VARCHAR(255) DEFAULT NULL,
    future_description LONGTEXT DEFAULT NULL,
    future_image VARCHAR(500) DEFAULT NULL,

    -- SEO
    meta_title VARCHAR(255) DEFAULT NULL,
    meta_description TEXT DEFAULT NULL,
    meta_keywords TEXT DEFAULT NULL,

    og_title VARCHAR(255) DEFAULT NULL,
    og_description TEXT DEFAULT NULL,
    og_image VARCHAR(255) DEFAULT NULL,

    image_alt_text VARCHAR(255) DEFAULT NULL,

    robots_index ENUM('index', 'noindex') NOT NULL DEFAULT 'index',
    robots_follow ENUM('follow', 'nofollow') NOT NULL DEFAULT 'follow',

    published TINYINT(1) NOT NULL DEFAULT 1,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE assipl_about_logos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    about_id INT UNSIGNED NOT NULL,

    logo VARCHAR(500) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_about_logos_about
        FOREIGN KEY (about_id)
        REFERENCES assipl_about(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    INDEX idx_about_logos_about_id (about_id),
    INDEX idx_about_logos_sort_order (sort_order)
);

CREATE TABLE assipl_about_features (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    about_id INT UNSIGNED NOT NULL,

    logo VARCHAR(500) DEFAULT NULL,
    description TEXT DEFAULT NULL,
    sort_order INT NOT NULL DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_about_features_about
        FOREIGN KEY (about_id)
        REFERENCES assipl_about(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    INDEX idx_about_features_about_id (about_id),
    INDEX idx_about_features_sort_order (sort_order)
);

ALTER TABLE assipl_single_service
ADD COLUMN meta_title VARCHAR(255) DEFAULT NULL,
ADD COLUMN meta_description TEXT DEFAULT NULL,
ADD COLUMN meta_keywords TEXT DEFAULT NULL,
ADD COLUMN og_title VARCHAR(255) DEFAULT NULL,
ADD COLUMN og_description TEXT DEFAULT NULL,
ADD COLUMN og_image VARCHAR(255) DEFAULT NULL,
ADD COLUMN image_alt_text VARCHAR(255) DEFAULT NULL,
ADD COLUMN robots_index ENUM('index', 'noindex') NOT NULL DEFAULT 'index',
ADD COLUMN robots_follow ENUM('follow', 'nofollow') NOT NULL DEFAULT 'follow',
ADD COLUMN published TINYINT(1) NOT NULL DEFAULT 1;

CREATE TABLE assipl_services (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    -- Banner
    banner_image VARCHAR(500) DEFAULT NULL,

    -- Services Intro
    services_title VARCHAR(255) DEFAULT NULL,
    services_description LONGTEXT DEFAULT NULL,

    -- Strategic Section
    strategic_image VARCHAR(500) DEFAULT NULL,
    strategic_title VARCHAR(255) DEFAULT NULL,

    -- Core Project Section
    core_project_title VARCHAR(255) DEFAULT NULL,
    core_project_description LONGTEXT DEFAULT NULL,

    -- Maintenance Section
    maintenance_title VARCHAR(255) DEFAULT NULL,

    -- CTA / Links
    learn_more_link VARCHAR(500) DEFAULT NULL,
    know_more_link VARCHAR(500) DEFAULT NULL,
    read_more_link VARCHAR(500) DEFAULT NULL,

    -- SEO
    meta_title VARCHAR(255) DEFAULT NULL,
    meta_description TEXT DEFAULT NULL,
    meta_keywords TEXT DEFAULT NULL,

    og_title VARCHAR(255) DEFAULT NULL,
    og_description TEXT DEFAULT NULL,
    og_image VARCHAR(255) DEFAULT NULL,

    image_alt_text VARCHAR(255) DEFAULT NULL,

    robots_index ENUM('index', 'noindex') NOT NULL DEFAULT 'index',
    robots_follow ENUM('follow', 'nofollow') NOT NULL DEFAULT 'follow',

    published TINYINT(1) NOT NULL DEFAULT 1,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE assipl_services_strategic (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    service_page_id INT UNSIGNED NOT NULL,

    icon VARCHAR(500) DEFAULT NULL,
    heading VARCHAR(255) DEFAULT NULL,
    description TEXT DEFAULT NULL,

    sort_order INT NOT NULL DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_services_strategic_page
        FOREIGN KEY (service_page_id)
        REFERENCES assipl_services(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    INDEX idx_services_strategic_page_id (service_page_id),
    INDEX idx_services_strategic_sort_order (sort_order)
);

CREATE TABLE assipl_services_core_project (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    service_page_id INT UNSIGNED NOT NULL,

    icon VARCHAR(500) DEFAULT NULL,
    heading VARCHAR(255) DEFAULT NULL,
    description TEXT DEFAULT NULL,

    sort_order INT NOT NULL DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_services_core_project_page
        FOREIGN KEY (service_page_id)
        REFERENCES assipl_services(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    INDEX idx_services_core_project_page_id (service_page_id),
    INDEX idx_services_core_project_sort_order (sort_order)
);

CREATE TABLE assipl_services_maintenance (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    service_page_id INT UNSIGNED NOT NULL,

    image VARCHAR(500) DEFAULT NULL,
    heading VARCHAR(255) DEFAULT NULL,
    description TEXT DEFAULT NULL,

    sort_order INT NOT NULL DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_services_maintenance_page
        FOREIGN KEY (service_page_id)
        REFERENCES assipl_services(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    INDEX idx_services_maintenance_page_id (service_page_id),
    INDEX idx_services_maintenance_sort_order (sort_order)
);


