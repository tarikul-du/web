import React, { useState, useEffect, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { PencilIcon, TrashIcon, PlusIcon, GlobeIcon, UserCircleIcon, DownloadIcon, UploadIcon } from '../components/Icon';
import { Work, BlogPost, Experience, Education, Certification, Skill, User, Category, LoginActivity, WhatIDoItem, CoreCompetency, Training, Membership, SkillItem, Message, EmailLog, EmailSettings, ProfileData } from '../types';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserFormModal from '../components/UserFormModal';
import ProtectedRoute from '../components/ProtectedRoute';
import { useNotification } from '../context/NotificationContext';
import ConfirmationModal from '../components/ConfirmationModal';
import RichTextEditor from '../components/RichTextEditor';


type AdminTab = 'overview' | 'home' | 'about' | 'works' | 'blog' | 'contact' | 'users' | 'settings' | 'categories' | 'profile' | 'activity' | 'messages' | 'emailLog' | 'emailSettings' | 'data';

const AdminPage: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
    
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const SidebarButton: React.FC<{tab: AdminTab, children: React.ReactNode, notificationCount?: number}> = ({ tab, children, notificationCount }) => {
    const isActive = activeTab === tab;
    return (
        <button 
            onClick={() => setActiveTab(tab)}
            className={`w-full text-left px-4 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center justify-between gap-3 ${
                isActive ? 'bg-fuchsia-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-200'
            }`}
        >
            <span className="flex items-center gap-3">{children}</span>
            {notificationCount && notificationCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{notificationCount}</span>
            )}
        </button>
    );
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'overview': return <ManageOverview setActiveTab={setActiveTab} />;
      case 'home': return <ManageHome />;
      case 'about': return <ManageAbout />;
      case 'works': return <ManageWorks />;
      case 'blog': return <ManageBlog />;
      case 'contact': return <ManageContact />;
      case 'profile': return <ManageProfile />;
      case 'categories': return <ManageCategories />;
      case 'messages': return <ManageMessages />;
      case 'users': return <ProtectedRoute roles={['Admin']}><ManageUsers /></ProtectedRoute>;
      case 'settings': return <ProtectedRoute roles={['Admin']}><ManageSettings /></ProtectedRoute>;
      case 'activity': return <ProtectedRoute roles={['Admin']}><ManageActivity /></ProtectedRoute>;
      case 'emailLog': return <ProtectedRoute roles={['Admin']}><ManageEmailLog /></ProtectedRoute>;
      case 'emailSettings': return <ProtectedRoute roles={['Admin']}><ManageEmailSettings /></ProtectedRoute>;
      case 'data': return <ProtectedRoute roles={['Admin']}><ManageData /></ProtectedRoute>;
      default: return null;
    }
  }

  const { messages } = useData();
  const unreadMessagesCount = useMemo(() => messages.filter(m => !m.isRead).length, [messages]);

  return (
    <div className="flex h-screen bg-slate-100">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col p-4">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-xl mb-8">
                <GlobeIcon className="h-8 w-8 text-fuchsia-600" />
                <span>Admin Panel</span>
            </div>
            <nav className="flex-grow space-y-2">
                <SidebarButton tab="overview">Overview</SidebarButton>
                <SidebarButton tab="profile">My Profile</SidebarButton>
                <hr className="my-2 border-slate-200" />
                <h3 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Content</h3>
                <SidebarButton tab="works">Works</SidebarButton>
                <SidebarButton tab="blog">Blog</SidebarButton>
                <SidebarButton tab="categories">Categories</SidebarButton>
                <SidebarButton tab="messages" notificationCount={unreadMessagesCount}>Messages</SidebarButton>
                <hr className="my-2 border-slate-200" />
                <h3 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Pages</h3>
                <SidebarButton tab="home">Home Page</SidebarButton>
                <SidebarButton tab="about">About Page</SidebarButton>
                <SidebarButton tab="contact">Contact Page</SidebarButton>
                
                <ProtectedRoute roles={['Admin']}>
                    <hr className="my-2 border-slate-200" />
                    <h3 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Administration</h3>
                    <SidebarButton tab="users">User Management</SidebarButton>
                    <SidebarButton tab="activity">Login Activity</SidebarButton>
                    <SidebarButton tab="emailLog">Email Log</SidebarButton>
                    <SidebarButton tab="settings">Site Settings</SidebarButton>
                    <SidebarButton tab="emailSettings">Email Settings</SidebarButton>
                    <SidebarButton tab="data">Data Management</SidebarButton>
                </ProtectedRoute>
            </nav>
            <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2">
                    <UserCircleIcon className="w-8 h-8 text-slate-500" />
                    <div>
                        <p className="text-sm font-medium text-slate-700">{currentUser?.name}</p>
                        <p className="text-xs text-slate-500">{currentUser?.role}</p>
                    </div>
                </div>
                <button onClick={handleLogout} className="w-full mt-4 text-left px-4 py-2.5 rounded-md text-sm font-medium transition-colors text-red-600 hover:bg-red-100">
                    Logout
                </button>
            </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
             {renderContent()}
        </main>
    </div>
  );
};

// Generic Editable Item Component
const EditableItem: React.FC<{ onEdit?: () => void; onDelete: () => void; children: React.ReactNode }> = ({ onEdit, onDelete, children }) => (
    <div className="bg-slate-50 p-3 rounded-md flex justify-between items-center group">
        <div className="text-sm text-slate-700">{children}</div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {onEdit && <button onClick={onEdit} className="text-fuchsia-600 hover:text-fuchsia-800"><PencilIcon className="w-4 h-4" /></button>}
            <button onClick={onDelete} className="text-red-600 hover:text-red-800"><TrashIcon className="w-4 h-4" /></button>
        </div>
    </div>
);

// Generic Modal Component
const Modal: React.FC<{ children: React.ReactNode, onClose: () => void }> = ({ children, onClose }) => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6">{children}</div>
      </div>
    </div>
);

// Generic Input Component
const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        <input {...props} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-900 focus:ring-fuchsia-600 focus:border-fuchsia-600" />
    </div>
);
const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }> = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        <textarea {...props} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-900 focus:ring-fuchsia-600 focus:border-fuchsia-600" />
    </div>
);

// Section Wrapper
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white p-6 border border-slate-200 rounded-lg shadow-md">
    <h3 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-200">{title}</h3>
    {children}
  </div>
);

const ManageOverview: React.FC<{ setActiveTab: (tab: AdminTab) => void }> = ({ setActiveTab }) => {
    const { works, blogPosts, users } = useData();

    const recentActivity = useMemo(() => {
        const allContent = [
            ...works.map(w => ({ ...w, type: 'Work' })),
            ...blogPosts.map(p => ({ ...p, type: 'Blog Post' }))
        ];
        return allContent.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
    }, [works, blogPosts]);

    const contentByMonth = useMemo(() => {
        const months: Record<string, number> = {};
        [...works, ...blogPosts].forEach(item => {
            const month = new Date(item.createdAt).toLocaleString('default', { month: 'short', year: '2-digit' });
            months[month] = (months[month] || 0) + 1;
        });
        return months;
    }, [works, blogPosts]);

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col justify-center">
                    <p className="text-4xl font-bold text-fuchsia-600">{works.length}</p>
                    <p className="text-slate-500">Total Works</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col justify-center">
                    <p className="text-4xl font-bold text-fuchsia-600">{blogPosts.length}</p>
                    <p className="text-slate-500">Blog Posts</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col justify-center">
                    <p className="text-4xl font-bold text-fuchsia-600">{users.length}</p>
                    <p className="text-slate-500">Total Users</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center">
                    <h3 className="font-bold text-slate-800 mb-2">Quick Actions</h3>
                    <div className="flex gap-2">
                        <button onClick={() => setActiveTab('works')} className="text-sm bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-3 rounded-md">Add Work</button>
                        <button onClick={() => setActiveTab('blog')} className="text-sm bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-3 rounded-md">Add Post</button>
                    </div>
                </div>
            </div>
            <Section title="Website Analytics">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <h4 className="text-lg font-semibold text-slate-700 mb-4">Content Over Time</h4>
                        <div className="flex gap-4 items-end h-40 p-4 bg-slate-50 rounded-md">
                        {Object.entries(contentByMonth).map(([month, count]) => (
                            <div key={month} className="flex-1 flex flex-col items-center gap-2">
                                <div className="w-full bg-fuchsia-500 rounded-t-md" style={{height: `${count * 20}px`}}></div>
                                <span className="text-xs text-slate-500">{month}</span>
                            </div>
                        ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-slate-700 mb-4">Recent Activity</h4>
                        <ul className="space-y-2">
                            {recentActivity.length > 0 ? recentActivity.map(item => (
                                <li key={`${item.type}-${item.id}`} className="text-sm bg-slate-50 p-2 rounded-md">
                                    <span className={`font-bold ${item.type === 'Work' ? 'text-fuchsia-600' : 'text-purple-600'}`}>{item.type}:</span>
                                    <span className="text-slate-700 ml-2">{item.title}</span>
                                </li>
                            )) : <p className="text-sm text-slate-500">No recent activity.</p>}
                        </ul>
                    </div>
                </div>
            </Section>
        </div>
    );
};

const ManageHome = () => {
    const { profile, updateProfile, addWhatIDo, updateWhatIDo, deleteWhatIDo } = useData();
    const { addNotification } = useNotification();
    const [localProfile, setLocalProfile] = useState<ProfileData>(profile);
    const [editingWhatIDo, setEditingWhatIDo] = useState<WhatIDoItem | null>(null);
    const [isConfirming, setConfirming] = useState<{ action: () => void, message: string } | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => setLocalProfile(profile), [profile]);

    const handleSave = () => {
        setIsSaving(true);
        // Simulate async operation
        setTimeout(() => {
            updateProfile(localProfile);
            addNotification('Home page content updated successfully!', 'success');
            setIsSaving(false);
        }, 500);
    };
    
    const confirmDelete = (item: WhatIDoItem) => {
        setConfirming({
            action: () => {
                deleteWhatIDo(item.id);
                addNotification(`'${item.title}' card deleted.`, 'success');
                setConfirming(null);
            },
            message: `Are you sure you want to delete the '${item.title}' card?`
        });
    };
    
    const handleWhatIDoSave = (item: WhatIDoItem) => {
        if (item.id) {
            updateWhatIDo(item);
            addNotification('Card updated!', 'success');
        } else {
            addWhatIDo(item);
            addNotification('Card added!', 'success');
        }
        setEditingWhatIDo(null);
    };

    return (
        <div className="space-y-8">
            {isConfirming && <ConfirmationModal message={isConfirming.message} onConfirm={isConfirming.action} onCancel={() => setConfirming(null)} />}
            {editingWhatIDo && (
                <Modal onClose={() => setEditingWhatIDo(null)}>
                    <WhatIDoEditor item={editingWhatIDo} onSave={handleWhatIDoSave} onCancel={() => setEditingWhatIDo(null)} />
                </Modal>
            )}

            <h1 className="text-3xl font-bold text-slate-900">Manage Home Page</h1>
            <Section title="Hero & Main Info">
                <div className="space-y-4">
                    <Input label="Name" value={localProfile.name} onChange={e => setLocalProfile(p => ({...p, name: e.target.value}))} />
                    <Input label="Title" value={localProfile.title} onChange={e => setLocalProfile(p => ({...p, title: e.target.value}))} />
                    <Textarea label="Summary" value={localProfile.summary} onChange={e => setLocalProfile(p => ({...p, summary: e.target.value}))} rows={3} />
                    <Input label="Avatar Image URL" value={localProfile.avatarUrl} onChange={e => setLocalProfile(p => ({...p, avatarUrl: e.target.value}))} />
                </div>
            </Section>
            
            <Section title="What I Do Section">
                 <div className="space-y-2 mb-4">
                    {profile.whatIDo.map(item => (
                        <EditableItem key={item.id} onEdit={() => setEditingWhatIDo(item)} onDelete={() => confirmDelete(item)}>
                            <b>{item.title}</b>: {item.description}
                        </EditableItem>
                    ))}
                 </div>
                 <button onClick={() => setEditingWhatIDo({} as WhatIDoItem)} className="flex items-center gap-1 text-sm bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-1 px-3 rounded-md">
                    <PlusIcon className="w-4 h-4" /> Add Card
                 </button>
            </Section>

            <Section title="My Expertise Section">
                <div className="space-y-4">
                    <Input label="Section Title" value={localProfile.expertiseTitle} onChange={e => setLocalProfile(p => ({...p, expertiseTitle: e.target.value}))} />
                    <Textarea label="Section Description" value={localProfile.expertiseDescription} onChange={e => setLocalProfile(p => ({...p, expertiseDescription: e.target.value}))} rows={2} />
                </div>
            </Section>
            
            <div className="flex justify-end">
                <button onClick={handleSave} disabled={isSaving} className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-md disabled:bg-fuchsia-400 w-48 text-center">
                    {isSaving ? <span className="loader-sm"></span> : 'Save Home Page Changes'}
                </button>
            </div>
            <style>{`.loader-sm { width: 20px; height: 20px; border: 2px solid #FFF; border-bottom-color: transparent; border-radius: 50%; display: inline-block; box-sizing: border-box; animation: rotation 1s linear infinite; } @keyframes rotation { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
    );
};

const WhatIDoEditor: React.FC<{ item: Partial<WhatIDoItem>, onSave: (item: WhatIDoItem) => void, onCancel: () => void }> = ({ item, onSave, onCancel }) => {
    const [formData, setFormData] = useState(item);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData as WhatIDoItem);
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-bold">{item.id ? 'Edit' : 'Add'} "What I Do" Card</h3>
            <Input label="Title" value={formData.title || ''} onChange={e => setFormData(p => ({ ...p, title: e.target.value }))} required />
            <Textarea label="Description" value={formData.description || ''} onChange={e => setFormData(p => ({ ...p, description: e.target.value }))} rows={3} required />
            <div className="flex justify-end gap-2">
                <button type="button" onClick={onCancel} className="bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold py-2 px-4 rounded-md">Cancel</button>
                <button type="submit" className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-md">Save</button>
            </div>
        </form>
    );
};

const ManageAbout = () => {
    const { profile, skills, updateProfile, ...actions } = useData();
    const { addNotification } = useNotification();
    const [localProfile, setLocalProfile] = useState<ProfileData>(profile);
    const [isConfirming, setConfirming] = useState<{ action: () => void, message: string } | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => setLocalProfile(profile), [profile]);
    
    const handleSaveBio = () => {
        setIsSaving(true);
        setTimeout(() => {
            updateProfile(localProfile);
            addNotification('Bio section updated!', 'success');
            setIsSaving(false);
        }, 500);
    }

    const confirmDelete = (action: () => void, type: string, name: string) => {
        setConfirming({
            action: () => {
                action();
                addNotification(`${type} '${name}' deleted successfully.`, 'success');
                setConfirming(null);
            },
            message: `Are you sure you want to delete the ${type.toLowerCase()} '${name}'?`
        });
    };

    return (
        <div className="space-y-8">
            {isConfirming && <ConfirmationModal message={isConfirming.message} onConfirm={isConfirming.action} onCancel={() => setConfirming(null)} />}
            <h1 className="text-3xl font-bold text-slate-900">Manage About Page</h1>
            <Section title="Bio & Main Info">
                 <div className="space-y-4">
                    <Textarea label="Full Biography" value={localProfile.bio} onChange={e => setLocalProfile(p => ({...p, bio: e.target.value}))} rows={5} />
                    <Input label="Download CV URL" value={localProfile.resumeUrl} onChange={e => setLocalProfile(p => ({...p, resumeUrl: e.target.value}))} />
                 </div>
                 <button onClick={handleSaveBio} disabled={isSaving} className="mt-4 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-md disabled:bg-fuchsia-400 w-44 text-center">
                    {isSaving ? <span className="loader-sm"></span> : 'Save Bio & CV Link'}
                 </button>
            </Section>
            
            <AboutSectionEditor title="Core Competencies" items={profile.coreCompetencies} actions={{ add: actions.addCoreCompetency, update: actions.updateCoreCompetency, delete: actions.deleteCoreCompetency}} FormComponent={CoreCompetencyEditor} confirmDelete={confirmDelete} />
            <AboutSectionEditor title="Work Experience" items={profile.experience} actions={{ add: actions.addExperience, update: actions.updateExperience, delete: actions.deleteExperience}} FormComponent={ExperienceEditor} confirmDelete={confirmDelete} />
            <AboutSectionEditor title="Education" items={profile.education} actions={{ add: actions.addEducation, update: actions.updateEducation, delete: actions.deleteEducation}} FormComponent={EducationEditor} confirmDelete={confirmDelete} />
            <AboutSectionEditor 
              title="My Skills" 
              items={skills} 
              actions={{ add: actions.addSkill, update: actions.updateSkill, delete: actions.deleteSkill}} 
              FormComponent={SkillEditor} 
              confirmDelete={confirmDelete}
              description="Note: Editing these skills updates both the detailed view on the 'About Me' page and the categories shown in the 'My Expertise' section on the Home Page."
            />
            <AboutSectionEditor title="Training" items={profile.training} actions={{ add: actions.addTraining, update: actions.updateTraining, delete: actions.deleteTraining}} FormComponent={TrainingEditor} confirmDelete={confirmDelete} />
            <AboutSectionEditor title="Memberships" items={profile.memberships} actions={{ add: actions.addMembership, update: actions.updateMembership, delete: actions.deleteMembership}} FormComponent={MembershipEditor} confirmDelete={confirmDelete} />
            <AboutSectionEditor title="Certifications" items={profile.certifications} actions={{ add: actions.addCertification, update: actions.updateCertification, delete: actions.deleteCertification}} FormComponent={CertificationEditor} confirmDelete={confirmDelete} />
        </div>
    );
};

const AboutSectionEditor = ({ title, items, actions, FormComponent, confirmDelete, description }: any) => {
    const [editingItem, setEditingItem] = useState(null);
    const { addNotification } = useNotification();
    
    const handleSave = (item: any) => {
        if (item.id) {
            actions.update(item);
            addNotification(`${title} item updated!`, 'success');
        } else {
            actions.add(item);
            addNotification(`${title} item added!`, 'success');
        }
        setEditingItem(null);
    };

    const handleDelete = (item: any) => {
        confirmDelete(() => actions.delete(item.id), title, item.name || item.role || item.degree || item.category);
    };

    const displayItem = (item: any) => {
        switch(title) {
            case 'Core Competencies': return <span>{item.name}</span>;
            case 'Work Experience': return <span><b>{item.role}</b> at {item.company}</span>;
            case 'Education': return <span><b>{item.degree}</b> at {item.institution}</span>;
            case 'My Skills': return <span><b>{item.category}</b> ({item.skills.length} skills)</span>;
            case 'Training': return <span><b>{item.name}</b> at {item.institution}</span>;
            case 'Memberships': return <span><b>{item.name}</b></span>;
            case 'Certifications': return <span><b>{item.name}</b> from {item.issuer}</span>;
            default: return null;
        }
    };

    return (
        <Section title={title}>
            {description && <p className="text-sm text-slate-500 mb-4 bg-fuchsia-50 p-3 rounded-md border border-fuchsia-200">{description}</p>}
            {editingItem && (
                <Modal onClose={() => setEditingItem(null)}>
                    <FormComponent item={editingItem} onSave={handleSave} onCancel={() => setEditingItem(null)} />
                </Modal>
            )}
            <div className="space-y-2 mb-4">
                {items.length > 0 ? items.map((item: any) => (
                    <EditableItem key={item.id} onEdit={() => setEditingItem(item)} onDelete={() => handleDelete(item)}>
                       {displayItem(item)}
                    </EditableItem>
                )) : <p className="text-sm text-slate-500">No items added yet.</p>}
            </div>
            <button onClick={() => setEditingItem({})} className="flex items-center gap-1 text-sm bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-1 px-3 rounded-md">
                <PlusIcon className="w-4 h-4" /> Add New
            </button>
        </Section>
    )
}

// Editor Components for each section
const CoreCompetencyEditor = ({ item, onSave, onCancel }: any) => {
    const [formData, setFormData] = useState(item);
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave(formData); }
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-bold">{item.id ? 'Edit' : 'Add'} Core Competency</h3>
            <Input label="Name" value={formData.name || ''} onChange={e => setFormData((p:any) => ({ ...p, name: e.target.value }))} required />
            <div className="flex justify-end gap-2"><button type="button" onClick={onCancel} className="bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold py-2 px-4 rounded-md">Cancel</button><button type="submit" className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-md">Save</button></div>
        </form>
    );
}

const ExperienceEditor = ({ item, onSave, onCancel }: any) => {
    const [formData, setFormData] = useState(item);
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave(formData); }
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-bold">{item.id ? 'Edit' : 'Add'} Experience</h3>
            <Input label="Role" value={formData.role || ''} onChange={e => setFormData((p:any) => ({ ...p, role: e.target.value }))} required />
            <Input label="Company" value={formData.company || ''} onChange={e => setFormData((p:any) => ({ ...p, company: e.target.value }))} required />
            <Input label="Period" value={formData.period || ''} onChange={e => setFormData((p:any) => ({ ...p, period: e.target.value }))} required />
            <Textarea label="Description" value={formData.description || ''} onChange={e => setFormData((p:any) => ({ ...p, description: e.target.value }))} rows={3} required />
            <div className="flex justify-end gap-2"><button type="button" onClick={onCancel} className="bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold py-2 px-4 rounded-md">Cancel</button><button type="submit" className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-md">Save</button></div>
        </form>
    );
}
const EducationEditor = ({ item, onSave, onCancel }: any) => {
    const [formData, setFormData] = useState(item);
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave(formData); }
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-bold">{item.id ? 'Edit' : 'Add'} Education</h3>
            <Input label="Degree" value={formData.degree || ''} onChange={e => setFormData((p:any) => ({ ...p, degree: e.target.value }))} required />
            <Input label="Institution" value={formData.institution || ''} onChange={e => setFormData((p:any) => ({ ...p, institution: e.target.value }))} required />
            <Input label="Period" value={formData.period || ''} onChange={e => setFormData((p:any) => ({ ...p, period: e.target.value }))} required />
            <div className="flex justify-end gap-2"><button type="button" onClick={onCancel} className="bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold py-2 px-4 rounded-md">Cancel</button><button type="submit" className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-md">Save</button></div>
        </form>
    );
}
const CertificationEditor = ({ item, onSave, onCancel }: any) => {
    const [formData, setFormData] = useState(item);
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave(formData); }
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-bold">{item.id ? 'Edit' : 'Add'} Certification</h3>
            <Input label="Name" value={formData.name || ''} onChange={e => setFormData((p:any) => ({ ...p, name: e.target.value }))} required />
            <Input label="Issuer" value={formData.issuer || ''} onChange={e => setFormData((p:any) => ({ ...p, issuer: e.target.value }))} required />
            <Input label="Date" value={formData.date || ''} onChange={e => setFormData((p:any) => ({ ...p, date: e.target.value }))} required />
            <div className="flex justify-end gap-2"><button type="button" onClick={onCancel} className="bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold py-2 px-4 rounded-md">Cancel</button><button type="submit" className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-md">Save</button></div>
        </form>
    );
}
const TrainingEditor = ({ item, onSave, onCancel }: any) => {
    const [formData, setFormData] = useState(item);
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave(formData); }
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-bold">{item.id ? 'Edit' : 'Add'} Training</h3>
            <Input label="Name" value={formData.name || ''} onChange={e => setFormData((p:any) => ({ ...p, name: e.target.value }))} required />
            <Input label="Institution" value={formData.institution || ''} onChange={e => setFormData((p:any) => ({ ...p, institution: e.target.value }))} required />
            <Input label="Year" value={formData.year || ''} onChange={e => setFormData((p:any) => ({ ...p, year: e.target.value }))} required />
            <div className="flex justify-end gap-2"><button type="button" onClick={onCancel} className="bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold py-2 px-4 rounded-md">Cancel</button><button type="submit" className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-md">Save</button></div>
        </form>
    );
}
const MembershipEditor = ({ item, onSave, onCancel }: any) => {
    const [formData, setFormData] = useState(item);
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave(formData); }
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-bold">{item.id ? 'Edit' : 'Add'} Membership</h3>
            <Input label="Name" value={formData.name || ''} onChange={e => setFormData((p:any) => ({ ...p, name: e.target.value }))} required />
            <Input label="Period" value={formData.period || ''} onChange={e => setFormData((p:any) => ({ ...p, period: e.target.value }))} required />
            <div className="flex justify-end gap-2"><button type="button" onClick={onCancel} className="bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold py-2 px-4 rounded-md">Cancel</button><button type="submit" className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-md">Save</button></div>
        </form>
    );
}

const SkillEditor: React.FC<{ item: Partial<Skill>, onSave: (item: Skill) => void, onCancel: () => void }> = ({ item, onSave, onCancel }) => {
    const [formData, setFormData] = useState<Partial<Skill>>(item.id ? item : { category: '', skills: [{name: '', percentage: 80}]});

    const handleSubSkillChange = (index: number, field: keyof SkillItem, value: string | number) => {
        const newSkills = [...(formData.skills || [])];
        newSkills[index] = { ...newSkills[index], [field]: value };
        setFormData(p => ({ ...p, skills: newSkills }));
    };

    const addSubSkill = () => {
        setFormData(p => ({ ...p, skills: [...(p.skills || []), { name: '', percentage: 80 }] }));
    };

    const removeSubSkill = (index: number) => {
        setFormData(p => ({ ...p, skills: (p.skills || []).filter((_, i) => i !== index) }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData as Skill);
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-bold">{item.id ? 'Edit' : 'Add'} Skill Category</h3>
            <Input label="Category Name" value={formData.category || ''} onChange={e => setFormData(p => ({ ...p, category: e.target.value }))} required />
            <h4 className="font-semibold pt-2">Skills in this category:</h4>
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                {(formData.skills || []).map((skill, index) => (
                    <div key={index} className="flex items-end gap-2 p-2 bg-slate-50 rounded">
                        <Input label="Skill Name" value={skill.name} onChange={e => handleSubSkillChange(index, 'name', e.target.value)} />
                        <Input label="Percentage" type="number" min="0" max="100" value={skill.percentage} onChange={e => handleSubSkillChange(index, 'percentage', parseInt(e.target.value, 10))} />
                        <button type="button" onClick={() => removeSubSkill(index)} className="text-red-600 hover:text-red-800 p-2"><TrashIcon className="w-5 h-5"/></button>
                    </div>
                ))}
            </div>
            <button type="button" onClick={addSubSkill} className="flex items-center gap-1 text-sm bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-1 px-3 rounded-md">
                <PlusIcon className="w-4 h-4" /> Add Skill
            </button>
            <div className="flex justify-end gap-2"><button type="button" onClick={onCancel} className="bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold py-2 px-4 rounded-md">Cancel</button><button type="submit" className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-md">Save</button></div>
        </form>
    );
}

const WorkEditor: React.FC<{ workId: number | null, onBack: () => void }> = ({ workId, onBack }) => {
    const { works, addWork, updateWork, categories } = useData();
    const { addNotification } = useNotification();
    const work = workId ? works.find(w => w.id === workId) : null;
    const [formData, setFormData] = useState<Partial<Work>>(work || { title: '', description: '', longDescription: '', imageUrl: '', category: 'GIS', tags: [], imageStyle: 'cover' });
    const [isSaving, setIsSaving] = useState(false);

    const workCategories = useMemo(() => categories.filter(c => c.type === 'work').map(c => c.name), [categories]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'tags') {
            setFormData(prev => ({ ...prev, [name]: value.split(',').map(tag => tag.trim()) }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleRichTextChange = (html: string) => {
        setFormData(prev => ({ ...prev, longDescription: html }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => {
            if (workId) {
                updateWork(formData as Work);
                addNotification('Work updated successfully!', 'success');
            } else {
                addWork(formData as Omit<Work, 'id' | 'createdAt'>);
                addNotification('Work created successfully!', 'success');
            }
            setIsSaving(false);
            onBack();
        }, 500);
    };

    return (
        <div className="space-y-6">
            <button onClick={onBack} className="text-fuchsia-600 hover:text-fuchsia-800 font-semibold text-sm">&larr; Back to Works List</button>
            <h1 className="text-3xl font-bold text-slate-900">{workId ? 'Edit Work' : 'Add New Work'}</h1>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
                <Input label="Title" name="title" value={formData.title || ''} onChange={handleChange} required />
                <Textarea label="Short Description" name="description" value={formData.description || ''} onChange={handleChange} rows={3} required />
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Long Description</label>
                    <RichTextEditor value={formData.longDescription || ''} onChange={handleRichTextChange} />
                </div>
                <Input label="Image URL" name="imageUrl" value={formData.imageUrl || ''} onChange={handleChange} required />
                <Input label="Place (Optional)" name="place" value={formData.place || ''} onChange={handleChange} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md">
                            {workCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Image Display Style</label>
                        <select name="imageStyle" value={formData.imageStyle} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md">
                            <option value="cover">Cover</option>
                            <option value="contain">Contain</option>
                        </select>
                    </div>
                </div>
                <Input label="Tags (comma separated)" name="tags" value={formData.tags?.join(', ') || ''} onChange={handleChange} />
                <Input label="Project Link (Optional)" name="link" value={formData.link || ''} onChange={handleChange} />
                <div className="flex justify-end">
                    <button type="submit" disabled={isSaving} className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-md disabled:bg-fuchsia-400 w-36 text-center">
                        {isSaving ? <span className="loader-sm"></span> : (workId ? 'Save Changes' : 'Create Work')}
                    </button>
                </div>
            </form>
        </div>
    );
};

const ManageWorks = () => {
    const { works, deleteWork } = useData();
    const [view, setView] = useState<'list' | 'editor'>('list');
    const [editingWorkId, setEditingWorkId] = useState<number | null>(null);
    const { addNotification } = useNotification();
    const [isConfirming, setConfirming] = useState<{ action: () => void, message: string } | null>(null);

    const handleEdit = (work: Work) => { setEditingWorkId(work.id); setView('editor'); };
    const handleAdd = () => { setEditingWorkId(null); setView('editor'); };
    const handleDelete = (work: Work) => {
        setConfirming({
            action: () => {
                deleteWork(work.id);
                addNotification(`Work '${work.title}' deleted successfully.`, 'success');
                setConfirming(null);
            },
            message: `Are you sure you want to delete the work '${work.title}'? This action cannot be undone.`
        });
    };
    const handleBackToList = () => { setView('list'); setEditingWorkId(null); }
    
    if (view === 'editor') {
        return <WorkEditor workId={editingWorkId} onBack={handleBackToList} />
    }

    return (
        <div className="space-y-6">
            {isConfirming && <ConfirmationModal message={isConfirming.message} onConfirm={isConfirming.action} onCancel={() => setConfirming(null)} />}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-slate-900">Manage Works</h1>
                <button onClick={handleAdd} className="flex items-center gap-1 text-sm bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-md">
                    <PlusIcon className="w-4 h-4" /> Add New Work
                </button>
            </div>
            <div className="bg-white rounded-lg shadow-md">
                <table className="w-full text-sm text-left text-slate-500">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Title</th>
                            <th scope="col" className="px-6 py-3">Category</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {works.length > 0 ? works.map(work => (
                            <tr key={work.id} className="bg-white border-b hover:bg-slate-50">
                                <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">{work.title}</th>
                                <td className="px-6 py-4">{work.category}</td>
                                <td className="px-6 py-4 flex gap-4">
                                    <button onClick={() => handleEdit(work)} className="font-medium text-fuchsia-600 hover:underline">Edit</button>
                                    <button onClick={() => handleDelete(work)} className="font-medium text-red-600 hover:underline">Delete</button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan={3} className="text-center py-8 text-slate-500">No works added yet. Click 'Add New Work' to get started.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const BlogEditor: React.FC<{ postId: number | null, onBack: () => void }> = ({ postId, onBack }) => {
    const { blogPosts, addBlogPost, updateBlogPost, categories } = useData();
    const { addNotification } = useNotification();
    const post = postId ? blogPosts.find(p => p.id === postId) : null;
    const [formData, setFormData] = useState<Partial<BlogPost>>(post || { title: '', summary: '', content: '', imageUrl: '', publishDate: new Date().toLocaleDateString('en-CA'), author: 'Jane Doe', category: 'Technical Analysis', imageStyle: 'cover' });
    const [isSaving, setIsSaving] = useState(false);

    const blogCategories = useMemo(() => categories.filter(c => c.type === 'blog').map(c => c.name), [categories]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRichTextChange = (html: string) => {
        setFormData(prev => ({ ...prev, content: html }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => {
            if (postId) {
                updateBlogPost(formData as BlogPost);
                addNotification('Blog post updated successfully!', 'success');
            } else {
                addBlogPost(formData as Omit<BlogPost, 'id' | 'createdAt'>);
                addNotification('Blog post created successfully!', 'success');
            }
            setIsSaving(false);
            onBack();
        }, 500);
    };

    return (
        <div className="space-y-6">
            <button onClick={onBack} className="text-fuchsia-600 hover:text-fuchsia-800 font-semibold text-sm">&larr; Back to Blog Posts List</button>
            <h1 className="text-3xl font-bold text-slate-900">{postId ? 'Edit Blog Post' : 'Add New Blog Post'}</h1>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
                <Input label="Title" name="title" value={formData.title || ''} onChange={handleChange} required />
                <Textarea label="Summary" name="summary" value={formData.summary || ''} onChange={handleChange} rows={3} required />
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Content</label>
                    <RichTextEditor value={formData.content || ''} onChange={handleRichTextChange} />
                </div>
                <Input label="Image URL" name="imageUrl" value={formData.imageUrl || ''} onChange={handleChange} required />
                <Input label="Place (Optional)" name="place" value={formData.place || ''} onChange={handleChange} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Publish Date" name="publishDate" value={formData.publishDate || ''} onChange={handleChange} required />
                    <Input label="Author" name="author" value={formData.author || ''} onChange={handleChange} required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md">
                             {blogCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Image Display Style</label>
                        <select name="imageStyle" value={formData.imageStyle} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md">
                            <option value="cover">Cover</option>
                            <option value="contain">Contain</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button type="submit" disabled={isSaving} className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-md disabled:bg-fuchsia-400 w-36 text-center">
                        {isSaving ? <span className="loader-sm"></span> : (postId ? 'Save Changes' : 'Create Post')}
                    </button>
                </div>
            </form>
        </div>
    );
};

const ManageBlog = () => {
    const { blogPosts, deleteBlogPost } = useData();
    const [view, setView] = useState<'list' | 'editor'>('list');
    const [editingPostId, setEditingPostId] = useState<number | null>(null);
    const { addNotification } = useNotification();
    const [isConfirming, setConfirming] = useState<{ action: () => void, message: string } | null>(null);

    const handleEdit = (post: BlogPost) => { setEditingPostId(post.id); setView('editor'); };
    const handleAdd = () => { setEditingPostId(null); setView('editor'); };
    const handleDelete = (post: BlogPost) => {
        setConfirming({
            action: () => {
                deleteBlogPost(post.id);
                addNotification(`Blog Post '${post.title}' deleted successfully.`, 'success');
                setConfirming(null);
            },
            message: `Are you sure you want to delete the blog post '${post.title}'? This action cannot be undone.`
        });
    };
    const handleBackToList = () => { setView('list'); setEditingPostId(null); }
    
    if (view === 'editor') {
        return <BlogEditor postId={editingPostId} onBack={handleBackToList} />
    }

    return (
        <div className="space-y-6">
            {isConfirming && <ConfirmationModal message={isConfirming.message} onConfirm={isConfirming.action} onCancel={() => setConfirming(null)} />}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-slate-900">Manage Blog Posts</h1>
                <button onClick={handleAdd} className="flex items-center gap-1 text-sm bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-md">
                    <PlusIcon className="w-4 h-4" /> Add New Post
                </button>
            </div>
            <div className="bg-white rounded-lg shadow-md">
                <table className="w-full text-sm text-left text-slate-500">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Title</th>
                            <th scope="col" className="px-6 py-3">Category</th>
                            <th scope="col" className="px-6 py-3">Author</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogPosts.length > 0 ? blogPosts.map(post => (
                            <tr key={post.id} className="bg-white border-b hover:bg-slate-50">
                                <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">{post.title}</th>
                                <td className="px-6 py-4">{post.category}</td>
                                <td className="px-6 py-4">{post.author}</td>
                                <td className="px-6 py-4 flex gap-4">
                                    <button onClick={() => handleEdit(post)} className="font-medium text-fuchsia-600 hover:underline">Edit</button>
                                    <button onClick={() => handleDelete(post)} className="font-medium text-red-600 hover:underline">Delete</button>
                                </td>
                            </tr>
                        )) : (
                           <tr><td colSpan={4} className="text-center py-8 text-slate-500">No blog posts added yet. Click 'Add New Post' to get started.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const ManageContact = () => {
    const { contactInfo, updateContactInfo } = useData();
    const [localInfo, setLocalInfo] = useState(contactInfo);
    const { addNotification } = useNotification();
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            updateContactInfo(localInfo);
            addNotification('Contact info updated!', 'success');
            setIsSaving(false);
        }, 500);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-900">Manage Contact Page</h1>
            <Section title="Contact Information">
                <div className="space-y-4">
                    <Input label="Email" type="email" value={localInfo.email} onChange={e => setLocalInfo(p => ({...p, email: e.target.value}))} />
                    <Input label="Phone" type="tel" value={localInfo.phone} onChange={e => setLocalInfo(p => ({...p, phone: e.target.value}))} />
                    <Input label="Address" value={localInfo.address} onChange={e => setLocalInfo(p => ({...p, address: e.target.value}))} />
                </div>
                 <button onClick={handleSave} disabled={isSaving} className="mt-4 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-md disabled:bg-fuchsia-400 w-36 text-center">
                    {isSaving ? <span className="loader-sm"></span> : 'Save Changes'}
                 </button>
            </Section>
        </div>
    );
};

const ManageProfile: React.FC = () => {
    const { currentUser, updateCurrentUser } = useAuth();
    const { addNotification } = useNotification();
    const [formData, setFormData] = useState({ name: currentUser?.name || '', email: currentUser?.email || '' });
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => {
            if (currentUser) {
                updateCurrentUser({ ...currentUser, ...formData });
                addNotification('Profile updated successfully!', 'success');
            }
            setIsSaving(false);
        }, 500);
    };

    if (!currentUser) return null;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
            <Section title="Update Your Information">
                 <form onSubmit={handleSubmit} className="space-y-4">
                    <Input label="Name" value={formData.name} onChange={e => setFormData(p => ({...p, name: e.target.value}))} required />
                    <Input label="Email" type="email" value={formData.email} onChange={e => setFormData(p => ({...p, email: e.target.value}))} required />
                    <div className="flex justify-start">
                         <button type="submit" disabled={isSaving} className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-md disabled:bg-fuchsia-400 w-36 text-center">
                            {isSaving ? <span className="loader-sm"></span> : 'Update Profile'}
                         </button>
                    </div>
                 </form>
            </Section>
        </div>
    );
};

const ManageCategories: React.FC = () => {
    const { categories, saveCategories } = useData();
    const { addNotification } = useNotification();
    const [localCategories, setLocalCategories] = useState(categories);
    const [isSaving, setIsSaving] = useState(false);

    const handleAdd = (type: 'work' | 'blog') => {
        setLocalCategories(prev => [...prev, {id: Date.now(), name: 'New Category', type}]);
    };
    const handleUpdate = (id: number, name: string) => {
        setLocalCategories(prev => prev.map(c => c.id === id ? {...c, name} : c));
    };
    const handleDelete = (id: number) => {
        setLocalCategories(prev => prev.filter(c => c.id !== id));
    };
    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            saveCategories(localCategories);
            addNotification('Categories saved successfully!', 'success');
            setIsSaving(false);
        }, 500);
    };
    
    const workCats = localCategories.filter(c => c.type === 'work');
    const blogCats = localCategories.filter(c => c.type === 'blog');

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-900">Manage Categories</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Section title="Work Categories">
                    <div className="space-y-2 mb-4">
                        {workCats.map(cat => (
                            <div key={cat.id} className="flex items-center gap-2">
                                <input value={cat.name} onChange={e => handleUpdate(cat.id, e.target.value)} className="flex-grow w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md" />
                                <button onClick={() => handleDelete(cat.id)} className="text-red-600 hover:text-red-800"><TrashIcon className="w-4 h-4" /></button>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => handleAdd('work')} className="flex items-center gap-1 text-sm bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-1 px-3 rounded-md">
                        <PlusIcon className="w-4 h-4" /> Add Work Category
                    </button>
                </Section>
                <Section title="Blog Categories">
                    <div className="space-y-2 mb-4">
                        {blogCats.map(cat => (
                           <div key={cat.id} className="flex items-center gap-2">
                                <input value={cat.name} onChange={e => handleUpdate(cat.id, e.target.value)} className="flex-grow w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md" />
                                <button onClick={() => handleDelete(cat.id)} className="text-red-600 hover:text-red-800"><TrashIcon className="w-4 h-4" /></button>
                            </div>
                        ))}
                    </div>
                     <button onClick={() => handleAdd('blog')} className="flex items-center gap-1 text-sm bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-1 px-3 rounded-md">
                        <PlusIcon className="w-4 h-4" /> Add Blog Category
                    </button>
                </Section>
            </div>
            <div className="flex justify-end">
                <button onClick={handleSave} disabled={isSaving} className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-md disabled:bg-fuchsia-400 w-36 text-center">
                    {isSaving ? <span className="loader-sm"></span> : 'Save Changes'}
                </button>
            </div>
        </div>
    );
};

const ManageMessages: React.FC = () => {
    const { messages, markMessageAsRead, deleteMessage } = useData();
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const { addNotification } = useNotification();
    const [isConfirming, setConfirming] = useState<{ action: () => void, message: string } | null>(null);

    const handleView = (message: Message) => {
        setSelectedMessage(message);
        if (!message.isRead) {
            markMessageAsRead(message.id);
        }
    };
    const handleDelete = (message: Message) => {
         setConfirming({
            action: () => {
                deleteMessage(message.id);
                addNotification(`Message from ${message.name} deleted.`, 'success');
                if (selectedMessage?.id === message.id) setSelectedMessage(null);
                setConfirming(null);
            },
            message: `Are you sure you want to delete the message from ${message.name}?`
        });
    };

    return (
        <div className="space-y-6">
            {isConfirming && <ConfirmationModal message={isConfirming.message} onConfirm={isConfirming.action} onCancel={() => setConfirming(null)} />}
            {selectedMessage && (
                <Modal onClose={() => setSelectedMessage(null)}>
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">Message from {selectedMessage.name}</h3>
                        <p><strong>Email:</strong> {selectedMessage.email}</p>
                        {selectedMessage.institution && <p><strong>Institution:</strong> {selectedMessage.institution}</p>}
                        {selectedMessage.address && <p><strong>Address:</strong> {selectedMessage.address}</p>}
                        <p><strong>Submitted:</strong> {new Date(selectedMessage.submittedAt).toLocaleString()}</p>
                        <div className="p-4 bg-slate-50 rounded-md border">{selectedMessage.message}</div>
                         <div className="flex justify-end">
                            <button onClick={() => setSelectedMessage(null)} className="bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold py-2 px-4 rounded-md">Close</button>
                         </div>
                    </div>
                </Modal>
            )}
            <h1 className="text-3xl font-bold text-slate-900">Manage Messages</h1>
             <div className="bg-white rounded-lg shadow-md">
                <table className="w-full text-sm text-left text-slate-500">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">From</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Submitted</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.length > 0 ? messages.map(msg => (
                            <tr key={msg.id} className={`bg-white border-b hover:bg-slate-50 ${!msg.isRead ? 'font-bold text-slate-800' : ''}`}>
                                <th scope="row" className="px-6 py-4 whitespace-nowrap">{msg.name}</th>
                                <td className="px-6 py-4">{msg.email}</td>
                                <td className="px-6 py-4">{new Date(msg.submittedAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4 flex gap-4">
                                    <button onClick={() => handleView(msg)} className="font-medium text-fuchsia-600 hover:underline">View</button>
                                    <button onClick={() => handleDelete(msg)} className="font-medium text-red-600 hover:underline">Delete</button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan={4} className="text-center py-8 text-slate-500">No messages received yet.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const ManageUsers = () => {
    const { users, addUser, updateUser, deleteUser, toggleUserStatus, updateUserPassword } = useData();
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isConfirming, setConfirming] = useState<{ action: (reason?: string) => void, message: string, reasonRequired?: boolean } | null>(null);
    const { addNotification } = useNotification();

    const handleSave = (user: User) => {
        if (editingUser && isResetting) {
            updateUserPassword(user.id, user.password || '');
            addNotification(`Password for ${user.name} has been reset.`, 'success');
        } else if (editingUser) {
            updateUser(user);
            addNotification(`User ${user.name} updated successfully.`, 'success');
        } else {
            addUser(user);
            addNotification(`User ${user.name} created successfully.`, 'success');
        }
        setShowModal(false);
        setEditingUser(null);
        setIsResetting(false);
    };

    const handleAdd = () => { setEditingUser(null); setShowModal(true); setIsResetting(false); }
    const handleEdit = (user: User) => { setEditingUser(user); setShowModal(true); setIsResetting(false); }
    const handleResetPassword = (user: User) => { setEditingUser(user); setShowModal(true); setIsResetting(true); }
    const handleDelete = (user: User) => {
        setConfirming({
            action: (reason) => {
                deleteUser(user.id, reason || 'No reason provided.');
                setConfirming(null);
            },
            message: `Are you sure you want to delete user ${user.name}? This will send them a notification.`,
            reasonRequired: true
        });
    }

    return (
        <div className="space-y-6">
            {isConfirming && <ConfirmationModal message={isConfirming.message} reasonRequired={isConfirming.reasonRequired} onConfirm={isConfirming.action} onCancel={() => setConfirming(null)} />}
            {showModal && <UserFormModal user={editingUser} onSave={handleSave} onClose={() => { setShowModal(false); setEditingUser(null); setIsResetting(false); }} isResettingPassword={isResetting} />}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-slate-900">User Management</h1>
                <button onClick={handleAdd} className="flex items-center gap-1 text-sm bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-md">
                    <PlusIcon className="w-4 h-4" /> Add New User
                </button>
            </div>
            <div className="bg-white rounded-lg shadow-md">
                <table className="w-full text-sm text-left text-slate-500">
                     <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Role</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Last Login</th>
                            <th scope="col" className="px-6 py-3">Created On</th>
                            <th scope="col" className="px-6 py-3">Last Update</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? users.map(user => (
                            <tr key={user.id} className="bg-white border-b hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium text-slate-900">{user.name}<br/><span className="text-xs text-slate-500">{user.email}</span></td>
                                <td className="px-6 py-4">{user.role}</td>
                                <td className="px-6 py-4">
                                    <span onClick={() => toggleUserStatus(user.id)} className={`cursor-pointer px-2 py-1 text-xs font-semibold rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{user.lastLogin === 'Never' ? 'Never' : new Date(user.lastLogin).toLocaleString()}</td>
                                <td className="px-6 py-4">{new Date(user.createdOn).toLocaleDateString()}</td>
                                <td className="px-6 py-4">{new Date(user.lastUpdate).toLocaleDateString()}</td>
                                <td className="px-6 py-4 space-y-1">
                                    <button onClick={() => handleEdit(user)} className="block w-full text-left text-fuchsia-600 hover:underline">Edit User</button>
                                    <button onClick={() => handleResetPassword(user)} className="block w-full text-left text-fuchsia-600 hover:underline">Reset Pass</button>
                                    <button onClick={() => handleDelete(user)} className="block w-full text-left text-red-600 hover:underline">Delete</button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan={7} className="text-center py-8 text-slate-500">No users found. Click 'Add New User' to get started.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const ManageSettings = () => {
    const { siteSettings, updateSiteSettings } = useData();
    const [localSettings, setLocalSettings] = useState(siteSettings);
    const { addNotification } = useNotification();
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            updateSiteSettings(localSettings);
            addNotification('Site settings updated!', 'success');
            setIsSaving(false);
        }, 500);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-900">Site Settings</h1>
            <Section title="General Settings">
                <div className="space-y-4">
                    <Input label="Site Title" value={localSettings.title} onChange={e => setLocalSettings(p => ({...p, title: e.target.value}))} />
                    <Textarea label="Meta Description" value={localSettings.metaDescription} onChange={e => setLocalSettings(p => ({...p, metaDescription: e.target.value}))} rows={3} />
                    <Input label="Favicon URL" value={localSettings.faviconUrl} onChange={e => setLocalSettings(p => ({...p, faviconUrl: e.target.value}))} />
                    <Input label="Copyright Text" value={localSettings.copyrightText} onChange={e => setLocalSettings(p => ({...p, copyrightText: e.target.value}))} />
                </div>
            </Section>
            <Section title="Social Links">
                 <div className="space-y-4">
                    <Input label="Twitter URL" value={localSettings.socialLinks.twitter} onChange={e => setLocalSettings(p => ({...p, socialLinks: {...p.socialLinks, twitter: e.target.value}}))} />
                    <Input label="GitHub URL" value={localSettings.socialLinks.github} onChange={e => setLocalSettings(p => ({...p, socialLinks: {...p.socialLinks, github: e.target.value}}))} />
                    <Input label="LinkedIn URL" value={localSettings.socialLinks.linkedin} onChange={e => setLocalSettings(p => ({...p, socialLinks: {...p.socialLinks, linkedin: e.target.value}}))} />
                 </div>
            </Section>
            <div className="flex justify-end">
                <button onClick={handleSave} disabled={isSaving} className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-md disabled:bg-fuchsia-400 w-36 text-center">
                    {isSaving ? <span className="loader-sm"></span> : 'Save Settings'}
                </button>
            </div>
        </div>
    );
};

const ManageActivity: React.FC = () => {
    const { loginActivity } = useData();
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-900">Login Activity</h1>
             <div className="bg-white rounded-lg shadow-md">
                <table className="w-full text-sm text-left text-slate-500">
                     <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">User</th>
                            <th scope="col" className="px-6 py-3">Timestamp</th>
                            <th scope="col" className="px-6 py-3">IP Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loginActivity.length > 0 ? loginActivity.map(activity => (
                             <tr key={activity.id} className="bg-white border-b hover:bg-slate-50">
                                <td className="px-6 py-4">{activity.userName}</td>
                                <td className="px-6 py-4">{activity.timestamp}</td>
                                <td className="px-6 py-4">{activity.ipAddress}</td>
                            </tr>
                        )) : (
                            <tr><td colSpan={3} className="text-center py-8 text-slate-500">No login activity recorded yet.</td></tr>
                        )}
                    </tbody>
                </table>
             </div>
        </div>
    );
};

const ManageEmailLog: React.FC = () => {
    const { emailLog } = useData();
    const [selectedEmail, setSelectedEmail] = useState<EmailLog | null>(null);

    return (
         <div className="space-y-6">
            {selectedEmail && (
                <Modal onClose={() => setSelectedEmail(null)}>
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">Email Details</h3>
                        <p><strong>To:</strong> {selectedEmail.recipient}</p>
                        <p><strong>Subject:</strong> {selectedEmail.subject}</p>
                        <p><strong>Sent:</strong> {selectedEmail.timestamp}</p>
                        <div className="p-4 bg-slate-50 rounded-md border whitespace-pre-wrap">{selectedEmail.body}</div>
                         <div className="flex justify-end">
                            <button onClick={() => setSelectedEmail(null)} className="bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold py-2 px-4 rounded-md">Close</button>
                         </div>
                    </div>
                </Modal>
            )}
            <h1 className="text-3xl font-bold text-slate-900">Email Log</h1>
             <div className="bg-white rounded-lg shadow-md">
                <table className="w-full text-sm text-left text-slate-500">
                     <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Recipient</th>
                            <th scope="col" className="px-6 py-3">Subject</th>
                            <th scope="col" className="px-6 py-3">Timestamp</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emailLog.length > 0 ? emailLog.map(log => (
                             <tr key={log.id} className="bg-white border-b hover:bg-slate-50">
                                <td className="px-6 py-4">{log.recipient}</td>
                                <td className="px-6 py-4">{log.subject}</td>
                                <td className="px-6 py-4">{log.timestamp}</td>
                                <td className="px-6 py-4">
                                    <button onClick={() => setSelectedEmail(log)} className="font-medium text-fuchsia-600 hover:underline">View</button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan={4} className="text-center py-8 text-slate-500">No emails logged yet.</td></tr>
                        )}
                    </tbody>
                </table>
             </div>
        </div>
    );
};

const ManageEmailSettings: React.FC = () => {
    const { emailSettings, updateEmailSettings, addEmailLog } = useData();
    const [localSettings, setLocalSettings] = useState(emailSettings);
    const { addNotification } = useNotification();
    const [isSaving, setIsSaving] = useState(false);
    
    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            updateEmailSettings(localSettings);
            addNotification('Email settings saved!', 'success');
            setIsSaving(false);
        }, 500);
    };

    const handleSendTest = () => {
        addEmailLog({
            recipient: 'test@example.com',
            subject: 'Test Email from GeoPortfolio',
            body: `This is a test email sent at ${new Date().toLocaleString()} with the following settings:\n\nFrom: ${localSettings.fromName} <${localSettings.fromEmail}>\nSMTP: ${localSettings.smtpServer}:${localSettings.smtpPort}`
        });
        addNotification('Test email has been logged successfully!', 'success');
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-900">Email Settings</h1>
            <Section title="SMTP Configuration">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="SMTP Server" value={localSettings.smtpServer} onChange={e => setLocalSettings(p => ({...p, smtpServer: e.target.value}))} />
                    <Input label="SMTP Port" type="number" value={localSettings.smtpPort} onChange={e => setLocalSettings(p => ({...p, smtpPort: parseInt(e.target.value, 10)}))} />
                    <Input label="SMTP Username" value={localSettings.smtpUser} onChange={e => setLocalSettings(p => ({...p, smtpUser: e.target.value}))} />
                    <Input label="SMTP Password" type="password" value={localSettings.smtpPass} onChange={e => setLocalSettings(p => ({...p, smtpPass: e.target.value}))} />
                </div>
            </Section>
            <Section title="Sender Information">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="From Name" value={localSettings.fromName} onChange={e => setLocalSettings(p => ({...p, fromName: e.target.value}))} />
                    <Input label="From Email" type="email" value={localSettings.fromEmail} onChange={e => setLocalSettings(p => ({...p, fromEmail: e.target.value}))} />
                 </div>
            </Section>
            <div className="flex justify-end gap-4">
                <button onClick={handleSendTest} className="bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold py-2 px-4 rounded-md">
                    Send Test Email
                </button>
                <button onClick={handleSave} disabled={isSaving} className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-md disabled:bg-fuchsia-400 w-36 text-center">
                    {isSaving ? <span className="loader-sm"></span> : 'Save Settings'}
                </button>
            </div>
        </div>
    );
};

const ManageData: React.FC = () => {
    const data = useData();
    const { addNotification } = useNotification();
    const [importFile, setImportFile] = useState<File | null>(null);
    const [isConfirming, setConfirming] = useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleExport = () => {
        const exportedData = {
            works: data.works,
            blogPosts: data.blogPosts,
            profile: data.profile,
            siteSettings: data.siteSettings,
            skills: data.skills,
            contactInfo: data.contactInfo,
            users: data.users.map(({ password, ...user }) => user), // Omit passwords from export
            categories: data.categories,
        };

        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(exportedData, null, 2))}`;
        const link = document.createElement("a");
        link.href = jsonString;
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        link.download = `geoportfolio_backup_${timestamp}.json`;
        link.click();
        addNotification('Data exported successfully!', 'success');
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImportFile(event.target.files[0]);
        }
    };

    const processImport = () => {
        if (!importFile) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target?.result;
                if (typeof text !== 'string') {
                    throw new Error("Failed to read file.");
                }
                const importedData = JSON.parse(text);

                data.importData(importedData);
                addNotification('Data imported successfully! The page will now reload.', 'success');
                setTimeout(() => window.location.reload(), 2000);
            } catch (error) {
                const message = error instanceof Error ? error.message : "An unknown error occurred.";
                addNotification(`Import failed: ${message}`, 'error');
            } finally {
                setImportFile(null);
                if(fileInputRef.current) fileInputRef.current.value = "";
            }
        };
        reader.onerror = () => {
            addNotification('Failed to read the file.', 'error');
        };
        reader.readAsText(importFile);
    };

    const handleImportClick = () => {
        if (importFile) {
            setConfirming(true);
        } else {
            addNotification('Please select a file to import first.', 'info');
        }
    };

    return (
        <div className="space-y-8">
            {isConfirming && (
                <ConfirmationModal
                    message="Are you sure you want to import this data? This will overwrite all existing content and cannot be undone."
                    onConfirm={() => {
                        processImport();
                        setConfirming(false);
                    }}
                    onCancel={() => setConfirming(false)}
                />
            )}
            <h1 className="text-3xl font-bold text-slate-900">Data Management</h1>
            <Section title="Export Data">
                <p className="text-slate-600 mb-4">Download a JSON backup of all your site's content. This includes works, blog posts, profile information, and settings. Runtime data like messages and logs will not be included.</p>
                <button onClick={handleExport} className="flex items-center gap-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-md">
                    <DownloadIcon className="w-5 h-5" /> Export All Data
                </button>
            </Section>
            <Section title="Import Data">
                 <div className="border border-red-300 bg-red-50 p-4 rounded-md">
                    <h4 className="font-bold text-red-800">Warning</h4>
                    <p className="text-sm text-red-700">Importing data is a destructive action. It will replace all current content on your website with the content from the backup file. This cannot be undone.</p>
                </div>
                <div className="mt-4 flex items-center gap-4">
                    <input type="file" accept=".json" onChange={handleFileChange} ref={fileInputRef} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-fuchsia-50 file:text-fuchsia-700 hover:file:bg-fuchsia-100"/>
                    <button onClick={handleImportClick} className="flex-shrink-0 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md">
                       <UploadIcon className="w-5 h-5" /> Import Data
                    </button>
                </div>
            </Section>
        </div>
    );
};


export default AdminPage;
