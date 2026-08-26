const { sequelize } = require('./db');
const db = require('../models');

const ALLOWED_TABLES = [
  'assipl_blogs',
  'assipl_blogvideo_hub',
  'assipl_blog_categories',
  'assipl_contact',
  'assipl_cookie_consents',
  'assipl_enquiry',
  'assipl_newsletter_subscribers',
  'assipl_password_reset_otps',
  'assipl_seo',
  'assipl_users',
  'assipl_user_roles',
];

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
  await sequelize.sync();
  await dropDisallowedTables();
};

module.exports = {
  ensureDatabaseSchema,
  ALLOWED_TABLES,
};
