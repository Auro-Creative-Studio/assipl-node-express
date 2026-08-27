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

  const heroBackgroundImage = copyAsset('home/hero-reference.webp', 'home-hero-background.webp');
  const aboutImage = copyAsset('home/about-image.webp', 'home-about-image.webp');
  const servicesImage = copyAsset('home/services-image.webp', 'home-services-image.webp');
  const auditBackgroundImage = copyAsset('services/audit-cta-bg.webp', 'home-audit-background.webp');

  const partnersLogos = [
    { source: 'about-page/embedded-0.webp', file: 'home-partner-alba-urmet.webp', alt: 'ALBA Urmet' },
    { source: 'about-page/embedded-7.webp', file: 'home-partner-bosch.webp', alt: 'Bosch' },
    { source: 'about-page/embedded-6.webp', file: 'home-partner-honeywell.webp', alt: 'Honeywell' },
    { source: 'about-page/embedded-9.webp', file: 'home-partner-prama.webp', alt: 'Prama' },
    { source: 'about-page/embedded-10.png', file: 'home-partner-tyco.png', alt: 'Tyco' },
    { source: 'about-page/embedded-1.png', file: 'home-partner-aditya.png', alt: 'Aditya' },
    { source: 'about-page/embedded-2.jpg', file: 'home-partner-texecom.jpg', alt: 'Texecom' },
    { source: 'about-page/embedded-3.jpg', file: 'home-partner-securico.jpg', alt: 'Securico' },
    { source: 'about-page/embedded-4.jpg', file: 'home-partner-principles.jpg', alt: 'Principles' },
    { source: 'about-page/embedded-5.png', file: 'home-partner-houston.png', alt: 'Houston' },
    { source: 'about-page/embedded-8.webp', file: 'home-partner-hid.webp', alt: 'HID' },
  ].map(({ source, file, alt }) => ({ image: copyAsset(source, file), alt }));

  const testimonials = [
    {
      source: 'home/testimonial-avatar-39.webp',
      file: 'home-testimonial-sbi.webp',
      company: 'SBI',
      quote:
        'The ASSIPL team is highly professional in all dealings. Their cooperation and readiness to provide solutions have been remarkable. Since our association, it has truly been a pleasure working with such a supportive and dedicated team.',
    },
    {
      source: 'home/testimonial-avatar-40.webp',
      file: 'home-testimonial-sattva.webp',
      company: 'SATTVA',
      quote:
        'I am happy to state that the services provided by Automation Security & Systems to our company has been very satisfactory in all respects. Thank you for the support extended to us, over the years.',
    },
    {
      source: 'home/testimonial-avatar-41.webp',
      file: 'home-testimonial-axis-bank.webp',
      company: 'AXIS BANK',
      quote:
        'We have been associated with Anuj for the past 10 years, and working with him and his team has been a pleasure. Their dedication ensures that all systems function flawlessly around the clock.',
    },
    {
      source: 'home/testimonial-avatar-42.webp',
      file: 'home-testimonial-hdfc-bank.webp',
      company: 'HDFC BANK',
      quote:
        'We are truly pleased with the services offered by your company in all respects. We sincerely thank you for the continued support. Since our association in 2022, your consistent commitment and quality service have been greatly valued.',
    },
  ].map(({ source, file, company, quote }) => ({ logo: copyAsset(source, file), company, quote }));

  const clientLogos = [
    { source: 'home/clients/bank-of-india.webp', file: 'home-client-bank-of-india.webp', name: 'Bank of India' },
    { source: 'home/clients/canara-bank.webp', file: 'home-client-canara-bank.webp', name: 'Canara Bank' },
    {
      source: 'home/clients/union-bank-of-india.webp',
      file: 'home-client-union-bank-of-india.webp',
      name: 'Union Bank of India',
    },
    { source: 'home/clients/sbi.webp', file: 'home-client-sbi.webp', name: 'SBI' },
    { source: 'home/clients/shell.webp', file: 'home-client-shell.webp', name: 'Shell Global' },
    { source: 'home/clients/axis-bank.webp', file: 'home-client-axis-bank.webp', name: 'Axis Bank' },
    { source: 'home/clients/vaishnavi.webp', file: 'home-client-vaishnavi.webp', name: 'Vaishnavi' },
    { source: 'home/clients/sattva.webp', file: 'home-client-sattva.webp', name: 'Sattva' },
    { source: 'home/clients/hdfc-bank.webp', file: 'home-client-hdfc-bank.webp', name: 'HDFC Bank' },
  ].map(({ source, file, name }) => ({ logo: copyAsset(source, file), name }));

  const services = [
    {
      title: 'Strategic Design & Management',
      description:
        'Comprehensive site surveys, precise system configuration, and dedicated project management.',
    },
    {
      title: 'SITC Execution',
      description:
        'Flawless Supply, Installation, Testing, and Commissioning executed by factory-trained specialists.',
    },
    {
      title: 'Operational Training',
      description:
        'Hands-on training on system operations to ensure your internal staff is completely fluent with the new infrastructure.',
    },
    {
      title: 'Lifecycle Maintenance',
      description:
        'Reliable post-sales maintenance, warranty tracking, and comprehensive Annual Maintenance Services (AMC) to maximize system uptime.',
    },
  ];

  const locations = [
    { name: 'Punjab', lon: 75.4, lat: 31.1 },
    { name: 'Haryana', lon: 76.15, lat: 29 },
    { name: 'Delhi', lon: 77.2, lat: 28.6 },
    { name: 'Rajasthan', lon: 72.8, lat: 26.9 },
    { name: 'Uttar Pradesh', lon: 80.9, lat: 26.8 },
    { name: 'Madhya Pradesh', lon: 77.4, lat: 23.3 },
    { name: 'Pune', lon: 75.9, lat: 18.5 },
    { name: 'Mumbai', lon: 72.9, lat: 19.1 },
    { name: 'Goa', lon: 74, lat: 15.3 },
    { name: 'Kerala', lon: 76.2, lat: 10.3 },
    { name: 'Tamil Nadu', lon: 79.5, lat: 11.5 },
    { name: 'Andhra Pradesh', lon: 80.6, lat: 16.5 },
    { name: 'Hyderabad', lon: 78.5, lat: 17.4 },
    { name: 'Karnataka', lon: 76.6, lat: 12.97, hq: true },
  ];

  const homeData = {
    hero_background_image: heroBackgroundImage,
    hero_title_line1: 'Automation Systems',
    hero_title_line2: 'and Solutions',
    hero_subtitle:
      'Integrated Security Solutions for BFSI, IT Parks, Industries, and Critical Infrastructure.',
    hero_stats: [
      '15+ Years Experience',
      '3000+ Projects Delivered',
      'ISO 9001:2015 Certified',
      'Pan-India Operations',
    ],
    hero_cta_label: 'Consult an Integration Expert',

    partners_heading: "Powered by the World's Leading Manufacturers",
    partners_logos: partnersLogos,

    about_image: aboutImage,
    about_heading: 'Precision Engineering. Nationwide Support.',
    about_description:
      "Automation Systems and Solutions (India) Pvt. Ltd. (ASSIPL) specializes in low voltage system integration delivering robust electronic security & safety solutions. We excel in complex, multi-site rollouts and critical infrastructure for India's most demanding sectors. Our scalable architecture ensures your infrastructure is protected today and primed for future integrations, including AI Analytics and Smart Building integration.",
    about_cta_label: 'Know More',
    about_cta_href: '/about',

    video_url: 'uploads/home-video.mp4',

    clients_heading: 'Major Clients',
    testimonials,
    client_logos: clientLogos,

    services_heading: 'End-to-End Integration Services',
    services_description:
      'We do not simply supply security hardware; we deliver absolute operational readiness. By managing the complete project lifecycle internally, ASSIPL ensures that complex, multi-site security architectures are deployed seamlessly and maintained perfectly.',
    services_image: servicesImage,
    services,
    services_cta_label: 'Explore Our Services',
    services_cta_href: '/service',

    nationwide_heading: 'Nationwide Scale. Localized Response.',
    nationwide_description:
      'Your enterprise operates on a national scale, and so do we. With our central operations and regional hubs clearly established across India, ASSIPL guarantees rapid field response times, unified engineering standards, and seamless multi-site rollouts nationwide.',
    locations,

    audit_heading: 'Initiate an Infrastructure Audit',
    audit_description:
      'Your enterprise operates on a national scale, and so do we. With our central operations and regional hubs clearly established across India, ASSIPL guarantees rapid field response times, unified engineering standards, and seamless multi-site rollouts nationwide.',
    audit_background_image: auditBackgroundImage,

    status: true,
  };

  const existingHome = await db.Home.findOne({ order: [['id', 'ASC']] });

  if (existingHome) {
    await existingHome.update(homeData);
    console.log(`Home page content updated (id: ${existingHome.id}).`);
  } else {
    const created = await db.Home.create(homeData);
    console.log(`Home page content created (id: ${created.id}).`);
  }

  await sequelize.close();
};

run().catch((err) => {
  console.error('Failed to seed home page:', err);
  process.exit(1);
});
