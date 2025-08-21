import React, { useState } from 'react';
import { User } from '../types';

const Modal: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
      <div className="p-6">{children}</div>
    </div>
  </div>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        <input {...props} className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-md text-slate-900 focus:ring-fuchsia-600 focus:border-fuchsia-600" />
    </div>
);

interface UserFormModalProps {
    user: User | null;
    onSave: (user: User) => void;
    onClose: () => void;
    isResettingPassword?: boolean;
}

const UserFormModal: React.FC<UserFormModalProps> = ({ user, onSave, onClose, isResettingPassword = false }) => {
    const [formData, setFormData] = useState<Partial<User>>(user || {
        name: '', email: '', password: '', role: 'Editor', status: 'active'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // For new users or password resets, a password is required
        if ((!user || isResettingPassword) && !formData.password) {
            alert('Password is required.');
            return;
        }
        onSave({ ...(user || {}), ...formData, id: user?.id || 0, lastLogin: user?.lastLogin || 'Never' } as User);
    };
    
    const getTitle = () => {
        if (isResettingPassword) return `Reset Password for ${user?.name}`;
        return user ? 'Edit User' : 'Add New User';
    }

    return (
        <Modal>
            <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-2xl font-bold">{getTitle()}</h3>
                
                {isResettingPassword ? (
                     <Input label="New Password" name="password" type="password" onChange={handleChange} required />
                ) : (
                    <>
                        <Input label="Name" name="name" value={formData.name} onChange={handleChange} required />
                        <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                        <Input label="Password" name="password" type="password" placeholder={user ? "Leave blank to keep unchanged" : ""} onChange={handleChange} required={!user} />
                         <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                            <select name="role" value={formData.role} onChange={handleChange} className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-md">
                                <option value="Admin">Admin</option>
                                <option value="Editor">Editor</option>
                            </select>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                            <select name="status" value={formData.status} onChange={handleChange} className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-md">
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </>
                )}

                <div className="flex justify-end gap-4 pt-4">
                    <button type="button" onClick={onClose} className="bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold py-2 px-4 rounded-md">Cancel</button>
                    <button type="submit" className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-md">
                        {isResettingPassword ? 'Reset Password' : 'Save User'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default UserFormModal;