require('dotenv').config();
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { connectDB, sequelize } = require('../src/config/db');
const db = require('../src/models');

const generatePassword = () => crypto.randomBytes(9).toString('base64url');

const run = async () => {
  const email = process.argv[2] || 'auroanimate5@gmail.com';
  const plainPassword = process.argv[3] || generatePassword();

  await connectDB();
  await sequelize.sync();

  const [superAdminRole] = await db.UserRole.findOrCreate({
    where: { type: 'super_admin' },
    defaults: {
      name: 'Super Admin',
      description: 'Full System Access',
      type: 'super_admin',
    },
  });

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const [user, created] = await db.User.findOrCreate({
    where: { email },
    defaults: {
      first_name: 'Super',
      last_name: 'Admin',
      email,
      password: hashedPassword,
      role_id: superAdminRole.id,
    },
  });

  if (!created) {
    await user.update({ password: hashedPassword, role_id: superAdminRole.id });
  }

  console.log(`Superadmin ${created ? 'created' : 'updated'}: ${email}`);
  console.log(`Password: ${plainPassword}`);

  await sequelize.close();
};

run().catch((err) => {
  console.error('Failed to seed superadmin:', err);
  process.exit(1);
});
