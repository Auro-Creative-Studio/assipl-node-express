require('dotenv').config();
const { connectDB, sequelize } = require('../src/config/db');
const db = require('../src/models');

const run = async () => {
  await connectDB();
  await sequelize.sync();

  const contactPageData = {
    contact_title: "Let's Connect",
    contact_description: 'Contact us for reliable security solutions, maintenance support, and assistance.',
    address:
      'Automation Systems and Solutions (India) Pvt. Ltd.\nHouse No: 2497, GF, 17th Main,\nHAL 2nd Stage, Indiranagar, Bangalore – 560008.',
    map_link: 'https://www.google.com/maps?cid=12008617173707726367',
    email: 'assipl@automationsystems.co.in',
    phoneno: '080 – 41692300 / 080 – 43751024',
    linkedin_link: 'https://www.linkedin.com/company/automation-systems-solutions-pvt-ltd/',
  };

  const existingContactPage = await db.ContactPage.findOne({ order: [['id', 'ASC']] });

  if (existingContactPage) {
    await existingContactPage.update(contactPageData);
    console.log(`Contact page content updated (id: ${existingContactPage.id}).`);
  } else {
    const created = await db.ContactPage.create(contactPageData);
    console.log(`Contact page content created (id: ${created.id}).`);
  }

  await sequelize.close();
};

run().catch((err) => {
  console.error('Failed to seed contact page:', err);
  process.exit(1);
});
