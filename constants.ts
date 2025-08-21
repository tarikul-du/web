import { Work, BlogPost, ProfileData, Skill, SiteSettings, ContactInfo, User, Category, LoginActivity, Message, EmailLog, EmailSettings } from './types';

export const CATEGORIES_DATA: Category[] = [
  { id: 1, name: 'GIS', type: 'work' },
  { id: 2, name: 'Remote Sensing', type: 'work' },
  { id: 3, name: 'Research', type: 'work' },
  { id: 4, name: 'Experimental', type: 'work' },
  { id: 5, name: 'Web Development', type: 'work' },
  { id: 6, name: 'Technical Analysis', type: 'blog' },
  { id: 7, name: 'Tutorials', type: 'blog' },
  { id: 8, name: 'Case Studies', type: 'blog' },
];

export const WORKS_DATA: Work[] = [
  {
    id: 1,
    title: 'Land Use Change Analysis in Dhaka City',
    description: 'Analyzing urban expansion and land use changes in Dhaka using satellite imagery.',
    longDescription: '<h2>Project Overview</h2><p>This undergraduate research project examined land use and land cover changes in Dhaka city over the past decade using Landsat satellite imagery. The study employed image classification techniques and change detection analysis to understand urban expansion patterns and their environmental implications.</p>',
    imageUrl: 'https://picsum.photos/seed/dhaka-gis/600/400',
    category: 'GIS',
    tags: ['GIS', 'Urban Planning', 'Land Use Change'],
    link: '#/works',
    imageStyle: 'cover',
    createdAt: '2023-11-10T10:00:00Z',
    place: 'Dhaka, Bangladesh'
  },
  {
    id: 2,
    title: 'Flood Risk Assessment using Remote Sensing',
    description: 'Using Sentinel-2 data to assess flood vulnerability in rural Bangladesh.',
    longDescription: 'A research project focusing on flood risk assessment using remote sensing data. The study utilized Sentinel-2 imagery to identify flood-prone areas and assess vulnerability in rural areas of Bangladesh, contributing to disaster risk reduction planning.',
    imageUrl: 'https://picsum.photos/seed/flood-rs/600/400',
    category: 'Remote Sensing',
    tags: ['Remote Sensing', 'Disaster Management', 'Flood Analysis'],
    link: '#/works',
    imageStyle: 'cover',
    createdAt: '2023-10-15T14:30:00Z',
    place: 'Bangladesh'
  },
  {
    id: 3,
    title: 'Climate Change Impact on Agriculture',
    description: 'Research on climate variability effects on crop production in Bangladesh.',
    longDescription: 'This research project investigated the relationship between climate variability and agricultural productivity in Bangladesh. The study used meteorological data and crop yield statistics to understand how changing climate patterns affect food security in the region.',
    imageUrl: 'https://picsum.photos/seed/climate-research/600/400',
    category: 'Research',
    tags: ['Climate Change', 'Agriculture', 'Food Security'],
    link: '#/works',
    imageStyle: 'cover',
    createdAt: '2023-09-01T09:00:00Z',
    place: 'Bangladesh'
  },
  {
    id: 4,
    title: 'Interactive Web Portfolio',
    description: 'A dynamic portfolio website showcasing GIS and Remote Sensing projects.',
    longDescription: 'An experimental web application built with React, TypeScript, and Tailwind CSS. This project demonstrates a complete frontend-only dynamic website for showcasing geography and environmental research work, powered by React Context for state management.',
    imageUrl: 'https://picsum.photos/seed/portfolio-exp/600/400',
    category: 'Experimental',
    tags: ['React', 'Web Development', 'Portfolio'],
    link: '#/works',
    imageStyle: 'cover',
    createdAt: '2023-11-20T11:00:00Z'
  },
  {
    id: 5,
    title: 'Floodplain Mapping with LiDAR',
    description: 'High-resolution floodplain delineation using LiDAR-derived Digital Elevation Models.',
    longDescription: 'This project involved processing raw LiDAR data to generate a high-resolution Digital Elevation Model (DEM). Hydrological modeling tools were then used on the DEM to accurately map floodplain boundaries for risk assessment and emergency management planning.',
    imageUrl: 'https://picsum.photos/seed/gis2/600/400',
    category: 'GIS',
    tags: ['LiDAR', 'Hydrology', 'Risk Assessment'],
    imageStyle: 'cover',
    createdAt: '2023-08-25T16:00:00Z'
  },
  {
    id: 6,
    title: 'Land Cover Classification',
    description: 'Supervised classification of satellite imagery to create a detailed land cover map.',
    longDescription: 'Using a combination of optical and radar satellite data, a supervised classification workflow was developed to create a high-accuracy land cover map for a large region. The project included signature collection, various classification algorithms (like SVM), and accuracy assessment.',
    imageUrl: 'https://picsum.photos/seed/rs2/600/400',
    category: 'Remote Sensing',
    tags: ['Image Classification', 'Mapping', 'Sentinel'],
    imageStyle: 'cover',
    createdAt: '2023-07-30T18:00:00Z'
  },
];

export const BLOG_DATA: BlogPost[] = [
  {
    id: 1,
    title: 'Getting Started with GIS as a Geography Student',
    summary: 'A beginner\'s guide to Geographic Information Systems for geography and environmental science students.',
    content: '<h2>Introduction to GIS</h2><p>As a Geography & Environment student at the University of Dhaka, I\'ve discovered that Geographic Information Systems (GIS) is one of the most powerful tools we can learn. GIS allows us to visualize, analyze, and interpret spatial data in ways that traditional maps simply cannot.</p><p>Starting with software like QGIS (which is free!) and ArcGIS, I\'ve learned to create maps, perform spatial analysis, and understand patterns in environmental data. For fellow students in Bangladesh, I particularly recommend exploring datasets related to our local environmental challenges - from flooding in our delta region to urban expansion in Dhaka.</p><p>The key is to start with simple projects and gradually build complexity. Don\'t be intimidated by the technology; focus on the geographical questions you want to answer.</p>',
    imageUrl: 'https://picsum.photos/seed/gis-student/800/450',
    publishDate: 'December 15, 2023',
    author: 'M. M. Tarikul Islam Parag',
    category: 'Tutorials',
    imageStyle: 'cover',
    createdAt: '2023-12-15T12:00:00Z'
  },
  {
    id: 2,
    title: 'Understanding Remote Sensing for Environmental Studies',
    summary: 'How satellite imagery helps us study environmental changes in Bangladesh.',
    content: '<h2>Remote Sensing in Environmental Research</h2><p>Remote sensing has become an essential tool for environmental monitoring, especially in a country like Bangladesh where environmental challenges are diverse and dynamic. From my studies in the Department of Geography & Environment, I\'ve learned how satellite imagery can reveal patterns invisible to the naked eye.</p><p>For instance, using Landsat and Sentinel satellite data, we can monitor seasonal flooding, track mangrove health in the Sundarbans, and assess urban heat islands in Dhaka. The ability to analyze changes over time - what we call temporal analysis - is particularly valuable for understanding climate change impacts.</p><p>As students, we have access to free satellite data through platforms like Google Earth Engine and USGS Earth Explorer. This democratization of remote sensing data means we can contribute to important environmental research even as undergraduates.</p>',
    imageUrl: 'https://picsum.photos/seed/remote-sensing/800/450',
    publishDate: 'November 20, 2023',
    author: 'M. M. Tarikul Islam Parag',
    category: 'Case Studies',
    imageStyle: 'cover',
    createdAt: '2023-09-15T12:00:00Z',
    place: 'Global'
  },
  {
    id: 3,
    title: 'Getting Started with QGIS for Spatial Analysis',
    summary: 'A practical tutorial covering the basics of QGIS, a powerful open-source GIS software. Learn how to load data, perform basic spatial queries, and create your first map.',
    content: 'For those new to the world of Geographic Information Systems, the cost of proprietary software can be a significant barrier. Enter QGIS: a free and open-source GIS application that offers a robust suite of tools for spatial analysis and cartography. This tutorial will guide you through the first steps. We will cover the user interface, how to add different types of data (like shapefiles and raster images), and how to perform fundamental tasks such as attribute queries and spatial selections. By the end, you will learn how to create and export a professional-looking map, complete with a legend, scale bar, and title. QGIS empowers students, researchers, and professionals alike to perform powerful geospatial analysis without the financial overhead.',
    imageUrl: 'https://picsum.photos/seed/blog3/800/450',
    publishDate: 'August 01, 2023',
    author: 'Jane Doe',
    category: 'Tutorials',
    imageStyle: 'cover',
    createdAt: '2023-08-01T12:00:00Z'
  },
  {
    id: 4,
    title: 'The Power of LiDAR in Modern Cartography',
    summary: 'From forestry to urban planning, LiDAR technology is changing how we see the world. This post explores its applications and impact on creating highly accurate 3D maps.',
    content: 'LiDAR (Light Detection and Ranging) has revolutionized how we capture the three-dimensional structure of the Earth\'s surface. By emitting laser pulses and measuring their return times, LiDAR systems can generate incredibly detailed point clouds that form the basis for high-resolution Digital Elevation Models (DEMs). In forestry, this allows for precise measurements of canopy height and forest biomass. In urban planning, LiDAR data is used to create detailed 3D city models for solar potential analysis and shadow studies. Its applications also extend to archaeology, where it can reveal ancient ruins hidden beneath dense vegetation, and to hydrology for accurate floodplain mapping. As LiDAR technology becomes more accessible, its role in modern cartography and spatial analysis will only continue to grow.',
    imageUrl: 'https://picsum.photos/seed/blog4/800/450',
    publishDate: 'November 05, 2023',
    author: 'Jane Doe',
    category: 'Case Studies',
    imageStyle: 'cover',
    createdAt: '2023-11-05T12:00:00Z'
  }
];

export const PROFILE_DATA: ProfileData = {
  name: 'M. M. Tarikul Islam Parag',
  title: 'Geography & Environment Student | GIS & Remote Sensing Enthusiast',
  summary: 'A passionate geography student specializing in GIS and Remote Sensing technologies, dedicated to environmental analysis and sustainable development research.',
  bio: 'I am M. M. Tarikul Islam Parag, a dedicated student in the Department of Geography & Environment at the University of Dhaka. My academic journey focuses on the fascinating intersection of geography, environmental science, and cutting-edge geospatial technologies. I am passionate about using GIS and Remote Sensing to understand and address environmental challenges, particularly in the context of Bangladesh and South Asia.',
  avatarUrl: 'https://picsum.photos/seed/tarikul/400/400',
  expertiseTitle: 'My Areas of Interest',
  expertiseDescription: 'As a Geography & Environment student, I am developing expertise across multiple domains of geospatial science and environmental analysis.',
  whatIDo: [
    { id: 1, title: 'Geographic Information Systems (GIS)', description: 'Learning spatial analysis and modeling techniques to understand environmental patterns and support decision-making processes.' },
    { id: 2, title: 'Remote Sensing Analysis', description: 'Studying satellite and aerial imagery interpretation for environmental monitoring and land-use change detection.' },
    { id: 3, title: 'Environmental Research', description: 'Conducting research on environmental challenges, climate change impacts, and sustainable development in Bangladesh.' }
  ],
  coreCompetencies: [
      { id: 1, name: 'ArcGIS' },
      { id: 2, name: 'QGIS' },
      { id: 3, name: 'Remote Sensing' },
      { id: 4, name: 'Environmental Analysis' },
      { id: 5, name: 'Cartography' },
      { id: 6, name: 'Spatial Statistics' },
      { id: 7, name: 'Python Programming' },
      { id: 8, name: 'Research Methods' },
  ],
  education: [
    { id: 1, degree: 'B.S. in Geography & Environment (Ongoing)', institution: 'University of Dhaka', period: '2020 - Present' },
    { id: 2, degree: 'Higher Secondary Certificate (HSC)', institution: 'Local College', period: '2018 - 2020' },
    { id: 3, degree: 'Secondary School Certificate (SSC)', institution: 'Local School', period: '2016 - 2018' }
  ],
  experience: [
    { id: 1, role: 'Research Assistant', company: 'Department of Geography & Environment, University of Dhaka', period: '2023 - Present', description: 'Assisting in research projects related to environmental monitoring and GIS analysis. Contributing to field data collection and spatial database management.' },
    { id: 2, role: 'GIS Intern', company: 'Local Environmental NGO', period: '2022 - 2023', description: 'Worked on community-based environmental mapping projects. Gained hands-on experience with GPS data collection and basic spatial analysis.' }
  ],
  certifications: [
    { id: 1, name: 'Introduction to GIS', issuer: 'Coursera - University of Toronto', date: '2022' },
    { id: 2, name: 'Remote Sensing Fundamentals', issuer: 'edX - University of Maryland', date: '2023' }
  ],
  training: [
      { id: 1, name: 'ArcGIS Desktop Basic Training', institution: 'ESRI Bangladesh', year: '2022' },
      { id: 2, name: 'Python for Geospatial Analysis', institution: 'Online Course Platform', year: '2023' }
  ],
  memberships: [
      { id: 1, name: 'Bangladesh Geographical Society', period: '2022 - Present' },
      { id: 2, name: 'University of Dhaka Geography Student Association', period: '2020 - Present' }
  ],
  resumeUrl: '#'
};

export const SKILLS_DATA: Skill[] = [
    {
        id: 1,
        category: 'GIS Software & Platforms',
        skills: [
            { name: 'ArcGIS', percentage: 75 },
            { name: 'QGIS', percentage: 85 },
            { name: 'Google Earth Engine', percentage: 60 },
            { name: 'ArcGIS Online', percentage: 65 },
            { name: 'PostGIS', percentage: 50 },
        ]
    },
    {
        id: 2,
        category: 'Remote Sensing & Image Analysis',
        skills: [
            { name: 'ERDAS IMAGINE', percentage: 70 },
            { name: 'ENVI', percentage: 65 },
            { name: 'Google Earth Pro', percentage: 90 },
            { name: 'Image Classification', percentage: 75 },
            { name: 'Change Detection', percentage: 70 },
        ]
    },
    {
        id: 3,
        category: 'Programming & Data Science',
        skills: [
            { name: 'Python (Basic)', percentage: 60 },
            { name: 'R (Statistical Analysis)', percentage: 55 },
            { name: 'SQL (Basic)', percentage: 50 },
            { name: 'Excel & Data Analysis', percentage: 85 },
            { name: 'Statistical Methods', percentage: 70 },
        ]
    },
    {
        id: 4,
        category: 'Research & Academic Skills',
        skills: [
            { name: 'Research Methodology', percentage: 80 },
            { name: 'Academic Writing', percentage: 85 },
            { name: 'Field Data Collection', percentage: 75 },
            { name: 'Literature Review', percentage: 90 },
            { name: 'Presentation Skills', percentage: 80 },
        ]
    }
];

export const SITE_SETTINGS_DATA: SiteSettings = {
    title: 'Tarikul Islam Parag - Geography & Environment Portfolio',
    socialLinks: {
        twitter: 'https://twitter.com',
        github: 'https://github.com/tarikul-du',
        linkedin: 'https://linkedin.com'
    },
    copyrightText: 'M. M. Tarikul Islam Parag. All Rights Reserved.',
    faviconUrl: 'https://www.google.com/s2/favicons?sz=64&domain=react.dev',
    metaDescription: 'Portfolio website of M. M. Tarikul Islam Parag, Geography & Environment student specializing in GIS and Remote Sensing at University of Dhaka.'
};

export const CONTACT_INFO_DATA: ContactInfo = {
    email: 'tarikul.parag@example.com',
    phone: '+880 1234-567890',
    address: 'Dept. of Geography & Environment, Faculty of Earth and Environmental Sciences, University of Dhaka, Dhaka-1000, Bangladesh'
};

const now = new Date().toISOString();

export const USERS_DATA: User[] = [
    { 
        id: 1, 
        name: 'M. M. Tarikul Islam Parag', 
        email: 'admin@tarikulparag.com', 
        password: 'admin123', 
        role: 'Admin', 
        lastLogin: 'Never', 
        status: 'active',
        createdOn: new Date('2024-01-15T10:00:00Z').toISOString(),
        lastUpdate: new Date('2024-01-15T10:00:00Z').toISOString()
    },
    { 
        id: 2, 
        name: 'Content Editor', 
        email: 'editor@tarikulparag.com', 
        password: 'editor123', 
        role: 'Editor', 
        lastLogin: 'Never', 
        status: 'active',
        createdOn: new Date('2024-01-20T11:30:00Z').toISOString(),
        lastUpdate: new Date('2024-01-20T11:30:00Z').toISOString()
    },
];

export const LOGIN_ACTIVITY_DATA: LoginActivity[] = [];

export const MESSAGES_DATA: Message[] = [];

export const EMAIL_LOG_DATA: EmailLog[] = [];

export const EMAIL_SETTINGS_DATA: EmailSettings = {
  smtpServer: 'smtp.example.com',
  smtpPort: 587,
  smtpUser: 'user@example.com',
  smtpPass: '',
  fromName: 'Tarikul Islam Parag',
  fromEmail: 'noreply@tarikulparag.com'
};