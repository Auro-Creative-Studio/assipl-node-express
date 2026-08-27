const { sequelize } = require('./db');
const db = require('../models');

const ALLOWED_TABLES = [
  'assipl_blogs',
  'assipl_products',
  'assipl_contact',
  'assipl_cookie_consents',
  'assipl_enquiry',
  'assipl_newsletter_subscribers',
  'assipl_password_reset_otps',
  'assipl_seo',
  'assipl_users',
  'assipl_user_roles',
  'assipl_single_service',
  'assipl_single_service_advantages',
  'assipl_single_services_models',
  'assipl_single_service_features',
  'assipl_enquire_form',
  'assipl_contact_form',
  'assipl_career_positions',
  'assipl_career_form',
  'assipl_csr',
  'assipl_csr_intro_images',
  'assipl_csr_slider_images',
  'assipl_home',
  'assipl_process',
  'assipl_contact_page',
  'assipl_about',
  'assipl_about_logos',
  'assipl_about_features',
  'assipl_services',
  'assipl_services_strategic',
  'assipl_services_core_project',
  'assipl_services_maintenance',
];

const dropColumnIfExists = async (queryInterface, tableName, columnName) => {
  try {
    const tableDefinition = await queryInterface.describeTable(tableName);

    if (!tableDefinition[columnName]) return;

    const foreignKeys = await queryInterface.getForeignKeyReferencesForTable(tableName);
    const matchingForeignKeys = foreignKeys.filter(
      (foreignKey) =>
        foreignKey.columnName === columnName ||
        foreignKey.referencedTableName === 'assipl_blog_categories'
    );

    for (const foreignKey of matchingForeignKeys) {
      if (foreignKey.constraintName) {
        await queryInterface.removeConstraint(tableName, foreignKey.constraintName);
      }
    }

    await queryInterface.removeColumn(tableName, columnName);
  } catch (error) {
    if (error?.original?.code === 'ER_NO_SUCH_TABLE') return;
    throw error;
  }
};

const removeBlogCategorySchema = async () => {
  const queryInterface = sequelize.getQueryInterface();

  await dropColumnIfExists(queryInterface, 'assipl_blogs', 'category_id');
};

const LEGACY_BLOG_COLUMNS = [
  'main_image',
  'blog_image_1',
  'blog_image_2',
  'description_1',
  'description_2',
  'description_3',
];

const removeLegacyBlogColumns = async () => {
  const queryInterface = sequelize.getQueryInterface();

  for (const columnName of LEGACY_BLOG_COLUMNS) {
    await dropColumnIfExists(queryInterface, 'assipl_blogs', columnName);
  }
};

const dropDisallowedTables = async () => {
  const [rows] = await sequelize.query(
    `SELECT TABLE_NAME AS tableName FROM INFORMATION_SCHEMA.TABLES
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_TYPE = 'BASE TABLE'`
  );

  const extraTables = rows
    .map((row) => row.tableName)
    .filter((table) => !ALLOWED_TABLES.includes(table));

  if (!extraTables.length) return;

  await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
  for (const table of extraTables) {
    await sequelize.query(`DROP TABLE IF EXISTS \`${table}\``);
    console.log(`Dropped table not in schema: ${table}`);
  }
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
};

const ensureDatabaseSchema = async () => {
  await sequelize.sync({ alter: true });
  await removeBlogCategorySchema();
  await removeLegacyBlogColumns();
  await dropDisallowedTables();
};

module.exports = {
  ensureDatabaseSchema,
  ALLOWED_TABLES,
};
