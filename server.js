require('dotenv').config();
const app = require('./src/app');
const { connectDB } = require('./src/config/db');
const { ensureDatabaseSchema } = require('./src/config/schema');
const db = require('./src/models');

const PORT = process.env.PORT || 5000;

const seedDefaultRoles = async () => {
  const defaultRoles = [
    { name: 'Admin', description: 'System Administrator', type: 'admin' },
    { name: 'Super Admin', description: 'Full System Access', type: 'super_admin' },
    { name: 'Editor', description: 'Content Management Access', type: 'editor' },
  ];

  for (const role of defaultRoles) {
    await db.UserRole.findOrCreate({
      where: { type: role.type },
      defaults: role,
    });
  }
};

const startServer = async () => {
  await connectDB();

  await ensureDatabaseSchema();
  await seedDefaultRoles();

 const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on("error", (err) => {
  console.error("Server Error:", err);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});
};

startServer();