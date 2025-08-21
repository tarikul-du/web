import React, { createContext, useContext, useState, useMemo } from 'react';
import { 
    Work, BlogPost, ProfileData, SiteSettings, Skill, ContactInfo, Experience, Education, Certification, User, Category, LoginActivity, WhatIDoItem, CoreCompetency, Training, Membership, SkillItem, Message, EmailLog, EmailSettings
} from '../types';
import { 
    WORKS_DATA, BLOG_DATA, PROFILE_DATA, SITE_SETTINGS_DATA, SKILLS_DATA, CONTACT_INFO_DATA, USERS_DATA, CATEGORIES_DATA, LOGIN_ACTIVITY_DATA, MESSAGES_DATA, EMAIL_LOG_DATA, EMAIL_SETTINGS_DATA
} from '../constants';

interface DataContextType {
  works: Work[];
  blogPosts: BlogPost[];
  profile: ProfileData;
  siteSettings: SiteSettings;
  skills: Skill[];
  contactInfo: ContactInfo;
  users: User[];
  categories: Category[];
  loginActivity: LoginActivity[];
  messages: Message[];
  emailLog: EmailLog[];
  emailSettings: EmailSettings;
  
  // Work mutations
  addWork: (work: Omit<Work, 'id' | 'createdAt'>) => void;
  updateWork: (work: Work) => void;
  deleteWork: (id: number) => void;

  // Blog mutations
  addBlogPost: (post: Omit<BlogPost, 'id' | 'createdAt'>) => void;
  updateBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: number) => void;

  // Profile mutations
  updateProfile: (profile: ProfileData) => void;
  addExperience: (exp: Omit<Experience, 'id'>) => void;
  updateExperience: (exp: Experience) => void;
  deleteExperience: (id: number) => void;
  addEducation: (edu: Omit<Education, 'id'>) => void;
  updateEducation: (edu: Education) => void;
  deleteEducation: (id: number) => void;
  addCertification: (cert: Omit<Certification, 'id'>) => void;
  updateCertification: (cert: Certification) => void;
  deleteCertification: (id: number) => void;
  addWhatIDo: (item: Omit<WhatIDoItem, 'id'>) => void;
  updateWhatIDo: (item: WhatIDoItem) => void;
  deleteWhatIDo: (id: number) => void;
  addCoreCompetency: (item: Omit<CoreCompetency, 'id'>) => void;
  updateCoreCompetency: (item: CoreCompetency) => void;
  deleteCoreCompetency: (id: number) => void;
  addTraining: (item: Omit<Training, 'id'>) => void;
  updateTraining: (item: Training) => void;
  deleteTraining: (id: number) => void;
  addMembership: (item: Omit<Membership, 'id'>) => void;
  updateMembership: (item: Membership) => void;
  deleteMembership: (id: number) => void;

  // Skills mutations
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (skill: Skill) => void;
  deleteSkill: (id: number) => void;
  
  // Contact Info mutations
  updateContactInfo: (info: ContactInfo) => void;
  
  // Site Settings mutations
  updateSiteSettings: (settings: SiteSettings) => void;

  // User mutations
  addUser: (user: Omit<User, 'id' | 'lastLogin' | 'createdOn' | 'lastUpdate'>) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: number, reason: string) => void;
  toggleUserStatus: (id: number) => void;
  updateUserPassword: (id: number, newPass: string) => void;
  updateCurrentUserProfile: (user: User) => void;
  updateUserLastLogin: (id: number) => void;
  
  // Category mutations
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: number) => void;
  saveCategories: (categories: Category[]) => void;
  
  // Activity Log
  addLoginActivity: (userName: string) => void;

  // Messages
  addMessage: (message: Omit<Message, 'id' | 'submittedAt' | 'isRead'>) => void;
  markMessageAsRead: (id: number) => void;
  deleteMessage: (id: number) => void;
  
  // Email Log
  addEmailLog: (log: Omit<EmailLog, 'id' | 'timestamp'>) => void;

  // Email Settings
  updateEmailSettings: (settings: EmailSettings) => void;

  // Data Management
  importData: (data: any) => void;

  // Installation
  initializeSite: (config: {
    siteSettings: Partial<SiteSettings>;
    adminUser: Omit<User, 'id' | 'role' | 'lastLogin' | 'status' | 'createdOn' | 'lastUpdate'>;
    clearDemoContent: boolean;
  }) => User;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [works, setWorks] = useState<Work[]>(WORKS_DATA);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(BLOG_DATA);
  const [profile, setProfile] = useState<ProfileData>(PROFILE_DATA);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(SITE_SETTINGS_DATA);
  const [skills, setSkills] = useState<Skill[]>(SKILLS_DATA);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(CONTACT_INFO_DATA);
  const [users, setUsers] = useState<User[]>(USERS_DATA);
  const [categories, setCategories] = useState<Category[]>(CATEGORIES_DATA);
  const [loginActivity, setLoginActivity] = useState<LoginActivity[]>(LOGIN_ACTIVITY_DATA);
  const [messages, setMessages] = useState<Message[]>(MESSAGES_DATA);
  const [emailLog, setEmailLog] = useState<EmailLog[]>(EMAIL_LOG_DATA);
  const [emailSettings, setEmailSettings] = useState<EmailSettings>(EMAIL_SETTINGS_DATA);
  
  const getNextId = (arr: {id: number}[]) => Math.max(0, ...arr.map(item => item.id)) + 1;

  // Work mutations
  const addWork = (work: Omit<Work, 'id' | 'createdAt'>) => setWorks(prev => [...prev, { ...work, id: getNextId(prev), createdAt: new Date().toISOString() }]);
  const updateWork = (updatedWork: Work) => setWorks(prev => prev.map(w => w.id === updatedWork.id ? updatedWork : w));
  const deleteWork = (id: number) => setWorks(prev => prev.filter(w => w.id !== id));

  // Blog mutations
  const addBlogPost = (post: Omit<BlogPost, 'id' | 'createdAt'>) => setBlogPosts(prev => [...prev, { ...post, id: getNextId(prev), createdAt: new Date().toISOString() }]);
  const updateBlogPost = (updatedPost: BlogPost) => setBlogPosts(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p));
  const deleteBlogPost = (id: number) => setBlogPosts(prev => prev.filter(p => p.id !== id));

  // Profile mutations
  const updateProfile = (newProfile: ProfileData) => setProfile(newProfile);
  const addExperience = (exp: Omit<Experience, 'id'>) => setProfile(p => ({...p, experience: [...p.experience, {...exp, id: getNextId(p.experience)}]}));
  const updateExperience = (updatedExp: Experience) => setProfile(p => ({...p, experience: p.experience.map(e => e.id === updatedExp.id ? updatedExp : e)}));
  const deleteExperience = (id: number) => setProfile(p => ({...p, experience: p.experience.filter(e => e.id !== id)}));
  const addEducation = (edu: Omit<Education, 'id'>) => setProfile(p => ({...p, education: [...p.education, {...edu, id: getNextId(p.education)}]}));
  const updateEducation = (updatedEdu: Education) => setProfile(p => ({...p, education: p.education.map(e => e.id === updatedEdu.id ? updatedEdu : e)}));
  const deleteEducation = (id: number) => setProfile(p => ({...p, education: p.education.filter(e => e.id !== id)}));
  const addCertification = (cert: Omit<Certification, 'id'>) => setProfile(p => ({...p, certifications: [...p.certifications, {...cert, id: getNextId(p.certifications)}]}));
  const updateCertification = (updatedCert: Certification) => setProfile(p => ({...p, certifications: p.certifications.map(c => c.id === updatedCert.id ? updatedCert : c)}));
  const deleteCertification = (id: number) => setProfile(p => ({...p, certifications: p.certifications.filter(c => c.id !== id)}));
  
  const addWhatIDo = (item: Omit<WhatIDoItem, 'id'>) => setProfile(p => ({...p, whatIDo: [...p.whatIDo, {...item, id: getNextId(p.whatIDo)}]}));
  const updateWhatIDo = (updatedItem: WhatIDoItem) => setProfile(p => ({...p, whatIDo: p.whatIDo.map(i => i.id === updatedItem.id ? updatedItem : i)}));
  const deleteWhatIDo = (id: number) => setProfile(p => ({...p, whatIDo: p.whatIDo.filter(i => i.id !== id)}));

  const addCoreCompetency = (item: Omit<CoreCompetency, 'id'>) => setProfile(p => ({...p, coreCompetencies: [...p.coreCompetencies, {...item, id: getNextId(p.coreCompetencies)}]}));
  const updateCoreCompetency = (updatedItem: CoreCompetency) => setProfile(p => ({...p, coreCompetencies: p.coreCompetencies.map(i => i.id === updatedItem.id ? updatedItem : i)}));
  const deleteCoreCompetency = (id: number) => setProfile(p => ({...p, coreCompetencies: p.coreCompetencies.filter(i => i.id !== id)}));

  const addTraining = (item: Omit<Training, 'id'>) => setProfile(p => ({...p, training: [...p.training, {...item, id: getNextId(p.training)}]}));
  const updateTraining = (updatedItem: Training) => setProfile(p => ({...p, training: p.training.map(i => i.id === updatedItem.id ? updatedItem : i)}));
  const deleteTraining = (id: number) => setProfile(p => ({...p, training: p.training.filter(i => i.id !== id)}));

  const addMembership = (item: Omit<Membership, 'id'>) => setProfile(p => ({...p, memberships: [...p.memberships, {...item, id: getNextId(p.memberships)}]}));
  const updateMembership = (updatedItem: Membership) => setProfile(p => ({...p, memberships: p.memberships.map(i => i.id === updatedItem.id ? updatedItem : i)}));
  const deleteMembership = (id: number) => setProfile(p => ({...p, memberships: p.memberships.filter(i => i.id !== id)}));

  // Skills mutations
  const addSkill = (skill: Omit<Skill, 'id'>) => setSkills(prev => [...prev, {...skill, id: getNextId(prev)}]);
  const updateSkill = (updatedSkill: Skill) => setSkills(prev => prev.map(s => s.id === updatedSkill.id ? updatedSkill : s));
  const deleteSkill = (id: number) => setSkills(prev => prev.filter(s => s.id !== id));
  
  // Contact Info mutations
  const updateContactInfo = (info: ContactInfo) => setContactInfo(info);
  
  // Site Settings mutations
  const updateSiteSettings = (settings: SiteSettings) => setSiteSettings(settings);

  // Email Settings mutations
  const updateEmailSettings = (settings: EmailSettings) => setEmailSettings(settings);

  // Email Log
  const addEmailLog = (log: Omit<EmailLog, 'id' | 'timestamp'>) => {
    const newLog: EmailLog = {
      ...log,
      id: getNextId(emailLog),
      timestamp: new Date().toLocaleString()
    };
    setEmailLog(prev => [newLog, ...prev]);
  };

  // User mutations
  const addUser = (user: Omit<User, 'id' | 'lastLogin' | 'createdOn' | 'lastUpdate'>) => {
    const now = new Date().toISOString();
    const newUser = { ...user, id: getNextId(users), lastLogin: 'Never', createdOn: now, lastUpdate: now };
    setUsers(prev => [...prev, newUser]);
    addEmailLog({
        recipient: user.email,
        subject: 'Welcome to GeoPortfolio!',
        body: `Hi ${user.name},\n\nAn account has been created for you. You can now log in with your credentials.`
    });
    return newUser;
  };
  const updateUser = (updatedUser: User) => setUsers(prev => prev.map(u => u.id === updatedUser.id ? {...updatedUser, password: u.password, lastUpdate: new Date().toISOString()} : u));
  const deleteUser = (id: number, reason: string) => {
    const user = users.find(u => u.id === id);
    if (user) {
        setUsers(prev => prev.filter(u => u.id !== id));
        addEmailLog({
            recipient: user.email,
            subject: 'Your Account Has Been Deleted',
            body: `Hi ${user.name},\n\nYour account has been deleted by an administrator.\n\nReason: ${reason}`
        });
    }
  };
  const toggleUserStatus = (id: number) => {
      const user = users.find(u => u.id === id);
      if (user) {
          const newStatus = user.status === 'active' ? 'inactive' : 'active';
          setUsers(prev => prev.map(u => u.id === id ? {...u, status: newStatus, lastUpdate: new Date().toISOString()} : u));
          addEmailLog({
              recipient: user.email,
              subject: `Your Account Has Been ${newStatus === 'active' ? 'Enabled' : 'Disabled'}`,
              body: `Hi ${user.name},\n\nYour account status has been updated to: ${newStatus.toUpperCase()}.`
          });
      }
  };
  const updateUserPassword = (id: number, newPass: string) => setUsers(prev => prev.map(u => u.id === id ? {...u, password: newPass, lastUpdate: new Date().toISOString()} : u));
  const updateCurrentUserProfile = (user: User) => setUsers(prev => prev.map(u => u.id === user.id ? {...user, lastUpdate: new Date().toISOString()} : u));
  const updateUserLastLogin = (id: number) => setUsers(prev => prev.map(u => u.id === id ? { ...u, lastLogin: new Date().toISOString() } : u));

  // Category mutations
  const addCategory = (category: Omit<Category, 'id'>) => setCategories(prev => [...prev, {...category, id: getNextId(prev)}]);
  const updateCategory = (updatedCategory: Category) => setCategories(prev => prev.map(c => c.id === updatedCategory.id ? updatedCategory : c));
  const deleteCategory = (id: number) => setCategories(prev => prev.filter(c => c.id !== id));
  const saveCategories = (newCategories: Category[]) => setCategories(newCategories);

  // Activity Log
  const addLoginActivity = (userName: string) => {
    const newActivity: LoginActivity = {
      id: getNextId(loginActivity),
      userName,
      timestamp: new Date().toLocaleString(),
      ipAddress: `192.168.1.${Math.floor(Math.random() * 254) + 1}` // Mock IP
    };
    setLoginActivity(prev => [...prev, newActivity]);
  };
  
  // Message mutations
  const addMessage = (message: Omit<Message, 'id' | 'submittedAt' | 'isRead'>) => {
      const newMessage: Message = {
          ...message,
          id: getNextId(messages),
          submittedAt: new Date().toISOString(),
          isRead: false
      };
      setMessages(prev => [newMessage, ...prev]);
  };
  const markMessageAsRead = (id: number) => {
      setMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m));
  };
  const deleteMessage = (id: number) => {
      setMessages(prev => prev.filter(m => m.id !== id));
  };

  // Data Management
  const importData = (data: any) => {
    const requiredKeys = ['works', 'blogPosts', 'profile', 'siteSettings', 'skills', 'contactInfo', 'users', 'categories'];
    const hasAllKeys = requiredKeys.every(key => key in data);

    if (!hasAllKeys) {
        throw new Error("Invalid data file. Some required data is missing.");
    }
    
    setWorks(data.works);
    setBlogPosts(data.blogPosts);
    setProfile(data.profile);
    setSiteSettings(data.siteSettings);
    setSkills(data.skills);
    setContactInfo(data.contactInfo);
    setUsers(data.users);
    setCategories(data.categories);
  };

  // Installation
  const initializeSite = (config: {
    siteSettings: Partial<SiteSettings>;
    adminUser: Omit<User, 'id' | 'role' | 'lastLogin' | 'status' | 'createdOn' | 'lastUpdate'>;
    clearDemoContent: boolean;
  }) => {
    // 1. Update site settings
    setSiteSettings(prev => ({...prev, ...config.siteSettings }));

    // 2. Clear demo content if requested
    if (config.clearDemoContent) {
        setWorks([]);
        setBlogPosts([]);
        setSkills([]);
        setProfile(prev => ({
            ...prev,
            whatIDo: [],
            coreCompetencies: [],
            education: [],
            experience: [],
            certifications: [],
            training: [],
            memberships: []
        }));
    }

    // 3. Create the first admin user
    const now = new Date().toISOString();
    const newAdmin: User = {
        id: 1,
        ...config.adminUser,
        role: 'Admin',
        status: 'active',
        lastLogin: 'Never',
        createdOn: now,
        lastUpdate: now
    };
    setUsers([newAdmin]);
    return newAdmin;
  };

  const value = useMemo(() => ({
    works, blogPosts, profile, siteSettings, skills, contactInfo, users, categories, loginActivity, messages, emailLog, emailSettings,
    addWork, updateWork, deleteWork,
    addBlogPost, updateBlogPost, deleteBlogPost,
    updateProfile,
    addExperience, updateExperience, deleteExperience,
    addEducation, updateEducation, deleteEducation,
    addCertification, updateCertification, deleteCertification,
    addWhatIDo, updateWhatIDo, deleteWhatIDo,
    addCoreCompetency, updateCoreCompetency, deleteCoreCompetency,
    addTraining, updateTraining, deleteTraining,
    addMembership, updateMembership, deleteMembership,
    addSkill, updateSkill, deleteSkill,
    updateContactInfo,
    updateSiteSettings,
    addUser, updateUser, deleteUser, toggleUserStatus, updateUserPassword, updateCurrentUserProfile, updateUserLastLogin,
    addCategory, updateCategory, deleteCategory, saveCategories,
    addLoginActivity,
    addMessage, markMessageAsRead, deleteMessage,
    addEmailLog,
    updateEmailSettings,
    importData,
    initializeSite,
  }), [works, blogPosts, profile, siteSettings, skills, contactInfo, users, categories, loginActivity, messages, emailLog, emailSettings]);

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};