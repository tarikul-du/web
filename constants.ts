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
    title: 'Urban Heat Island Analysis',
    description: 'Leveraging Landsat 8 data to map UHI effects in major metropolitan areas.',
    longDescription: '<h2>Project Overview</h2><p>This project utilized thermal bands from Landsat 8 satellite imagery to conduct a comprehensive analysis of the Urban Heat Island (UHI) effect across several major cities. The study involved data preprocessing, land surface temperature calculation, and spatial analysis to identify hotspots and correlate them with urban land use patterns.</p>',
    imageUrl: 'https://picsum.photos/seed/gis1/600/400',
    category: 'GIS',
    tags: ['GIS', 'Thermal Analysis', 'Urban Planning'],
    link: '#/works',
    imageStyle: 'cover',
    createdAt: '2023-11-10T10:00:00Z',
    place: 'Global Cities'
  },
  {
    id: 2,
    title: 'Deforestation Monitoring in the Amazon',
    description: 'Using Sentinel-2 imagery and time-series analysis to track forest loss.',
    longDescription: 'A multi-year study using Sentinel-2 satellite data to monitor and quantify deforestation rates in the Amazon rainforest. Change detection algorithms were applied to time-series imagery to create an automated monitoring system, providing near real-time alerts on deforestation activities.',
    imageUrl: 'https://picsum.photos/seed/rs1/600/400',
    category: 'Remote Sensing',
    tags: ['Remote Sensing', 'Environment', 'Change Detection'],
    link: '#/works',
    imageStyle: 'cover',
    createdAt: '2023-10-15T14:30:00Z'
  },
  {
    id: 3,
    title: 'Crop Yield Prediction Model',
    description: 'A research paper on using machine learning with satellite data to forecast crop yields.',
    longDescription: 'This research focused on developing a machine learning model to predict corn yield based on multispectral satellite imagery and weather data. Various vegetation indices (e.g., NDVI) were extracted and used as features for a Random Forest regression model, achieving high accuracy in yield prediction.',
    imageUrl: 'https://picsum.photos/seed/research1/600/400',
    category: 'Research',
    tags: ['Machine Learning', 'Agriculture', 'Data Science'],
    link: '#/works',
    imageStyle: 'cover',
    createdAt: '2023-09-01T09:00:00Z',
    place: 'Midwest, USA'
  },
  {
    id: 4,
    title: 'Portfolio Management System',
    description: 'An experimental web app with a dynamic front-end and a feature-rich admin panel.',
    longDescription: 'An interactive web application built with React, TypeScript, and Tailwind CSS. This project demonstrates a complete frontend-only dynamic website, powered by React Context for state management. It includes a secure, role-based admin panel for managing all site content.',
    imageUrl: 'https://picsum.photos/seed/exp1/600/400',
    category: 'Experimental',
    tags: ['React', 'Web App', 'TypeScript'],
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
    title: 'The Future of GIS: Integrating AI and Big Data',
    summary: 'Exploring how artificial intelligence and big data are revolutionizing the field of geospatial analysis, from automated feature extraction to predictive modeling.',
    content: '<h2>The Next Evolution</h2><p>The integration of Artificial Intelligence (AI) and Big Data is setting the stage for the next evolution in Geographic Information Systems (GIS). Traditionally, GIS has been a powerful tool for visualizing and analyzing spatial data, but the sheer volume and velocity of modern data streams—from satellite constellations to IoT sensors—require more advanced techniques.</p><p>This is where AI, particularly machine learning, comes in. By leveraging algorithms that can learn from data, we can automate complex tasks like land cover classification from high-resolution imagery with unprecedented accuracy. Furthermore, predictive models can now forecast urban growth, model climate change impacts, and optimize logistics with a level of detail that was previously unimaginable. As we move forward, the synergy between GIS, AI, and Big Data will not only enhance our understanding of the world but also provide the tools to build a more sustainable and efficient future.</p>',
    imageUrl: 'https://picsum.photos/seed/blog1/800/450',
    publishDate: 'October 26, 2023',
    author: 'Jane Doe',
    category: 'Technical Analysis',
    imageStyle: 'cover',
    createdAt: '2023-10-26T12:00:00Z'
  },
  {
    id: 2,
    title: 'A Deep Dive into NDVI',
    summary: 'A beginner-friendly guide to understanding the Normalized Difference Vegetation Index (NDVI), its calculation, and its vast applications in agriculture and environmental science.',
    content: 'The Normalized Difference Vegetation Index (NDVI) is one of the most widely used indices in remote sensing for a reason: it provides a simple yet powerful measure of vegetation health and density. Calculated from the red and near-infrared (NIR) bands of satellite imagery, the formula is (NIR - Red) / (NIR + Red). Healthy vegetation reflects more NIR light and absorbs more red light, resulting in high NDVI values. Conversely, unhealthy or sparse vegetation yields lower values. This simple metric has profound applications, from precision agriculture where farmers can monitor crop health and apply fertilizers more efficiently, to large-scale environmental monitoring for tracking deforestation, drought, and the impacts of climate change. Understanding NDVI is a fundamental step for anyone looking to harness the power of satellite data for environmental and agricultural analysis.',
    imageUrl: 'https://picsum.photos/seed/blog2/800/450',
    publishDate: 'September 15, 2023',
    author: 'Jane Doe',
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
  name: 'Jane Doe',
  title: 'GIS & Remote Sensing Specialist | Researcher',
  summary: 'A passionate geospatial professional with over 8 years of experience in leveraging GIS and remote sensing technologies to solve complex environmental and urban challenges.',
  bio: 'A passionate geospatial professional with over 8 years of experience in leveraging GIS and remote sensing technologies to solve complex environmental and urban challenges. My work focuses on the intersection of data science, machine learning, and satellite imagery analysis to derive actionable insights. I am dedicated to pushing the boundaries of what is possible in the world of geospatial intelligence.',
  avatarUrl: 'https://picsum.photos/seed/avatar/400/400',
  expertiseTitle: 'My Expertise',
  expertiseDescription: 'I possess a wide range of skills across the full spectrum of geospatial technology, from data acquisition and processing to advanced analysis and visualization.',
  whatIDo: [
    { id: 1, title: 'Spatial Analysis & Modeling', description: 'Uncovering deep patterns and trends in geographic data to support data-driven decision-making and strategic planning.' },
    { id: 2, title: 'Advanced Remote Sensing', description: 'Expertly analyzing satellite and aerial imagery for large-scale environmental monitoring and precise land-use classification.' },
    { id: 3, title: 'Geospatial Web Development', description: 'Building custom, interactive maps and data-rich dashboards that bring complex spatial information to life on the web.' }
  ],
  coreCompetencies: [
      { id: 1, name: 'ArcGIS Pro' },
      { id: 2, name: 'QGIS' },
      { id: 3, name: 'Python (ArcPy, GDAL)' },
      { id: 4, name: 'Multispectral Analysis' },
      { id: 5, name: 'Machine Learning' },
      { id: 6, name: 'PostGIS' },
      { id: 7, name: 'Google Earth Engine' },
      { id: 8, name: 'LiDAR Processing' },
  ],
  education: [
    { id: 1, degree: 'Ph.D. in Geospatial Science', institution: 'University of GeoTech', period: '2014 - 2018' },
    { id: 2, degree: 'M.S. in Geographic Information Science', institution: 'State University of Cartography', period: '2012 - 2014' },
    { id: 3, degree: 'B.S. in Environmental Science', institution: 'Global College', period: '2008 - 2012' }
  ],
  experience: [
    { id: 1, role: 'Senior Geospatial Data Scientist', company: 'GeoInnovate Inc.', period: '2020 - Present', description: 'Leading research and development of ML models for satellite image analysis. Developed automated workflows for environmental monitoring projects, significantly improving efficiency.' },
    { id: 2, role: 'GIS Analyst', company: 'EnviroConsult Group', period: '2018 - 2020', description: 'Performed spatial analysis, data management, and map production for various environmental impact assessment projects. Specialized in habitat suitability modeling and hydrological analysis.' }
  ],
  certifications: [
    { id: 1, name: 'Certified GIS Professional (GISP)', issuer: 'GIS Certification Institute', date: '2019' },
    { id: 2, name: 'Google Certified Professional - Data Engineer', issuer: 'Google Cloud', date: '2021' }
  ],
  training: [
      { id: 1, name: 'Advanced Python for Geospatial Data Science', institution: 'DataCamp', year: '2022' },
      { id: 2, name: 'Deep Learning for Remote Sensing', institution: 'Coursera', year: '2021' }
  ],
  memberships: [
      { id: 1, name: 'American Society for Photogrammetry and Remote Sensing (ASPRS)', period: '2018 - Present' },
      { id: 2, name: 'Urban and Regional Information Systems Association (URISA)', period: '2019 - Present' }
  ],
  resumeUrl: '#'
};

export const SKILLS_DATA: Skill[] = [
    {
        id: 1,
        category: 'GIS Software & Platforms',
        skills: [
            { name: 'ArcGIS Pro', percentage: 95 },
            { name: 'QGIS', percentage: 90 },
            { name: 'ArcGIS Online', percentage: 85 },
            { name: 'PostGIS', percentage: 80 },
            { name: 'Google Earth Engine', percentage: 75 },
        ]
    },
    {
        id: 2,
        category: 'Remote Sensing & Image Analysis',
        skills: [
            { name: 'ENVI', percentage: 90 },
            { name: 'Erdas Imagine', percentage: 85 },
            { name: 'SNAP', percentage: 80 },
            { name: 'Multispectral Analysis', percentage: 95 },
            { name: 'LiDAR Processing', percentage: 88 },
        ]
    },
    {
        id: 3,
        category: 'Programming & Data Science',
        skills: [
            { name: 'Python (ArcPy, GDAL)', percentage: 95 },
            { name: 'R', percentage: 75 },
            { name: 'SQL', percentage: 85 },
            { name: 'Jupyter Notebooks', percentage: 90 },
            { name: 'Machine Learning', percentage: 80 },
        ]
    },
    {
        id: 4,
        category: 'Web & Database Management',
        skills: [
            { name: 'GeoServer', percentage: 70 },
            { name: 'PostgreSQL', percentage: 80 },
            { name: 'HTML/CSS', percentage: 90 },
            { name: 'JavaScript', percentage: 85 },
            { name: 'React', percentage: 80 },
        ]
    }
];

export const SITE_SETTINGS_DATA: SiteSettings = {
    title: 'GeoPortfolio',
    socialLinks: {
        twitter: 'https://twitter.com',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com'
    },
    copyrightText: 'Jane Doe. All Rights Reserved.',
    faviconUrl: 'https://www.google.com/s2/favicons?sz=64&domain=react.dev',
    metaDescription: 'A modern, dynamic-style personal portfolio website template for GIS & Remote Sensing professionals.'
};

export const CONTACT_INFO_DATA: ContactInfo = {
    email: 'jane.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Geospatial Lane, Mapville, ST 12345'
};

const now = new Date().toISOString();

export const USERS_DATA: User[] = [
    { 
        id: 1, 
        name: 'Jane Doe', 
        email: 'admin@example.com', 
        password: 'admin', 
        role: 'Admin', 
        lastLogin: 'Never', 
        status: 'active',
        createdOn: new Date('2023-01-15T10:00:00Z').toISOString(),
        lastUpdate: new Date('2023-11-10T12:00:00Z').toISOString()
    },
    { 
        id: 2, 
        name: 'John Smith', 
        email: 'editor@example.com', 
        password: 'editor', 
        role: 'Editor', 
        lastLogin: 'Never', 
        status: 'active',
        createdOn: new Date('2023-02-20T11:30:00Z').toISOString(),
        lastUpdate: new Date('2023-10-05T09:45:00Z').toISOString()
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
  fromName: 'GeoPortfolio Pro',
  fromEmail: 'noreply@geoportfolio.com'
};