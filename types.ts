export interface Category {
  id: number;
  name: string;
  type: 'work' | 'blog';
}

export interface Work {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  category: string;
  tags: string[];
  link?: string;
  imageStyle?: 'cover' | 'contain';
  createdAt: string;
  place?: string;
}

export interface BlogPost {
  id: number;
  title:string;
  summary: string;
  content: string;
  imageUrl: string;
  publishDate: string;
  author: string;
  category: string;
  imageStyle?: 'cover' | 'contain';
  createdAt: string;
  place?: string;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
}

export interface SkillItem {
  name: string;
  percentage: number;
}
export interface Skill {
  id: number;
  category: string;
  skills: SkillItem[];
}

export interface WhatIDoItem {
  id: number;
  title: string;
  description: string;
}

export interface CoreCompetency {
    id: number;
    name: string;
}

export interface Training {
    id: number;
    name: string;
    institution: string;
    year: string;
}

export interface Membership {
    id: number;
    name: string;
    period: string;
}

export interface SocialLinks {
  twitter: string;
  github: string;
  linkedin: string;
}

export interface SiteSettings {
  title: string;
  socialLinks: SocialLinks;
  copyrightText: string;
  faviconUrl: string;
  metaDescription: string;
}

export interface ProfileData {
  name: string;
  title: string;
  summary: string;
  bio: string;
  avatarUrl: string;
  expertiseTitle: string;
  expertiseDescription: string;
  whatIDo: WhatIDoItem[];
  coreCompetencies: CoreCompetency[];
  education: Education[];
  experience: Experience[];
  certifications: Certification[];
  training: Training[];
  memberships: Membership[];
  resumeUrl: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: 'Admin' | 'Editor';
  lastLogin: string;
  status: 'active' | 'inactive';
  createdOn: string;
  lastUpdate: string;
}

export interface LoginActivity {
  id: number;
  userName: string;
  timestamp: string;
  ipAddress: string;
}

export interface Message {
  id: number;
  name: string;
  email: string;
  institution?: string;
  address?: string;
  message: string;
  submittedAt: string;
  isRead: boolean;
}

export interface EmailSettings {
  smtpServer: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
  fromName: string;
  fromEmail: string;
}

export interface EmailLog {
  id: number;
  timestamp: string;
  recipient: string;
  subject: string;
  body: string;
}