require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { connectDB, sequelize } = require('../src/config/db');
const db = require('../src/models');

const REACT_ASSETS = path.join(__dirname, '../../assipl-reactjs/src/assets');
const UPLOADS_DIR = path.join(__dirname, '../uploads');

const copyAsset = (relativeSourcePath, targetFileName) => {
  const sourcePath = path.join(REACT_ASSETS, relativeSourcePath);
  const targetPath = path.join(UPLOADS_DIR, targetFileName);

  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Missing source asset: ${sourcePath}`);
  }

  fs.copyFileSync(sourcePath, targetPath);
  return `uploads/${targetFileName}`;
};

const run = async () => {
  await connectDB();
  await sequelize.sync();

  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }

  const heroBackgroundImage = copyAsset('process-page/process-hero-bg.webp', 'process-hero-background.webp');
  const ctaBackgroundImage = copyAsset('process-page/process-cta-bg.webp', 'process-cta-background.webp');

  const steps = [
    {
      icon: copyAsset('process-page/blueprint-icon.png', 'process-step-blueprint-icon.png'),
      image: copyAsset('process-page/blueprint-photo.webp', 'process-step-blueprint-photo.webp'),
      title: 'Strategic Blueprinting',
      points: [
        {
          label: 'Site & Threat Audits:',
          text: 'We conduct meticulous audits to capture your exact enterprise requirements and facility vulnerabilities.',
        },
        {
          label: 'Custom Blueprints:',
          text: 'Raw spatial dimensions are transformed into highly detailed, scalable security architecture designs.',
        },
        {
          label: 'Transparent Estimation:',
          text: 'You receive a comprehensive Bill of Quantities (BOQ) and clear cost structures, ensuring complete financial clarity before deployment begins.',
        },
      ],
    },
    {
      icon: copyAsset('process-page/sourcing-icon.png', 'process-step-sourcing-icon.png'),
      image: copyAsset('process-page/sourcing-photo.webp', 'process-step-sourcing-photo.webp'),
      title: 'Precision Sourcing',
      points: [
        {
          label: 'OEM Allocation:',
          text: 'Upon project kick-off, we immediately activate our global supply chain network.',
        },
        {
          label: 'Certified Inventory:',
          text: 'We procure and allocate authentic, certified components directly from our strategic technology manufacturing partners, matching your exact site requirements to the letter.',
        },
      ],
    },
    {
      icon: copyAsset('process-page/execution-icon.png', 'process-step-execution-icon.png'),
      image: copyAsset('process-page/execution-photo.webp', 'process-step-execution-photo.webp'),
      title: 'Field Execution',
      points: [
        {
          label: 'Synchronized Dispatch:',
          text: 'Hardware logistics are tightly controlled, ensuring components arrive at your facility exactly when our installation teams are ready to deploy.',
        },
        {
          label: 'On-Site Integration:',
          text: 'Factory-trained specialists execute device mounting, structured cabling, and rigorous terminal calibration with strict adherence to enterprise safety protocols.',
        },
      ],
    },
    {
      icon: copyAsset('process-page/handover-icon.png', 'process-step-handover-icon.png'),
      image: copyAsset('process-page/handover-photo.webp', 'process-step-handover-photo.webp'),
      title: 'Handover & Continuity',
      points: [
        {
          label: 'System Validation:',
          text: 'We deliver exhaustive performance reports, proving the architecture is fully optimized, compliant, and ready for use.',
        },
        {
          label: 'Project Closeout:',
          text: 'We facilitate official project sign-off and the immediate activation of your hardware warranties.',
        },
      ],
    },
  ];

  const processData = {
    hero_background_image: heroBackgroundImage,
    hero_title: 'Process',

    intro_heading: 'Engineered for Absolute Accountability',
    intro_description:
      'Executing multi-site security rollouts requires more than advanced hardware; it demands an unbreakable operational framework. From initial site audit to final handover, our structured deployment journey eliminates bottlenecks, ensures complete transparency, and guarantees your critical infrastructure is delivered on time, every time.',

    steps,

    cta_background_image: ctaBackgroundImage,
    cta_heading: 'Experience Seamless Project Execution',
    cta_description:
      'Connect with our integration experts to discuss how our disciplined deployment process can secure your next enterprise rollout.',
    cta_button_label: 'Consult Our Engineering Team',

    status: true,
  };

  const existingProcess = await db.Process.findOne({ order: [['id', 'ASC']] });

  if (existingProcess) {
    await existingProcess.update(processData);
    console.log(`Process page content updated (id: ${existingProcess.id}).`);
  } else {
    const created = await db.Process.create(processData);
    console.log(`Process page content created (id: ${created.id}).`);
  }

  await sequelize.close();
};

run().catch((err) => {
  console.error('Failed to seed process page:', err);
  process.exit(1);
});
