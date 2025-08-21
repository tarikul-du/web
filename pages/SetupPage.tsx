import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { GlobeIcon } from '../components/Icon';
import { useNotification } from '../context/NotificationContext';

const SetupPage: React.FC = () => {
    const navigate = useNavigate();
    const { initializeSite } = useData();
    const { loginAsNewUser } = useAuth();
    const { addNotification } = useNotification();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        siteTitle: 'GeoPortfolio',
        copyrightText: 'Your Name. All Rights Reserved.',
        adminName: '',
        adminEmail: '',
        adminPassword: '',
        clearDemoContent: false
    });

    useEffect(() => {
        // If app is already installed, redirect away from setup
        if (localStorage.getItem('geoportfolio_installed') === 'true') {
            navigate('/admin', { replace: true });
        }
    }, [navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const isCheckbox = type === 'checkbox';
        setFormData(prev => ({
            ...prev,
            [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value
        }));
    };
    
    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newAdminUser = initializeSite({
                siteSettings: {
                    title: formData.siteTitle,
                    copyrightText: formData.copyrightText
                },
                adminUser: {
                    name: formData.adminName,
                    email: formData.adminEmail,
                    password: formData.adminPassword
                },
                clearDemoContent: formData.clearDemoContent
            });

            localStorage.setItem('geoportfolio_installed', 'true');
            loginAsNewUser(newAdminUser);
            addNotification('Setup complete! Welcome to your new portfolio.', 'success');
            navigate('/admin');

        } catch (error) {
            const message = error instanceof Error ? error.message : "An unknown error occurred during setup.";
            addNotification(`Setup Failed: ${message}`, 'error');
        }
    };

    const renderStep = () => {
        switch(step) {
            case 1: return <Step1 nextStep={nextStep} />;
            case 2: return <Step2 formData={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />;
            case 3: return <Step3 formData={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />;
            case 4: return <Step4 formData={formData} handleChange={handleChange} prevStep={prevStep} />;
            default: return null;
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-100">
            <div className="w-full max-w-2xl">
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl overflow-hidden">
                    <div className="px-8 py-6">
                        <div className="flex items-center justify-center gap-2 text-slate-800 font-bold text-2xl mb-2">
                            <GlobeIcon className="h-8 w-8 text-fuchsia-600" />
                            <span>GeoPortfolio Pro Setup</span>
                        </div>
                        <p className="text-center text-slate-500 mb-6">Step {step} of 4</p>
                        {renderStep()}
                    </div>
                </form>
            </div>
        </div>
    );
};

const Step1: React.FC<{ nextStep: () => void }> = ({ nextStep }) => (
    <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Welcome!</h2>
        <p className="text-slate-600 mb-8 max-w-md mx-auto">This wizard will guide you through the initial setup of your new portfolio website. It will only take a minute.</p>
        <button type="button" onClick={nextStep} className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 shadow-lg">Let's Get Started</button>
    </div>
);

const Step2: React.FC<{ formData: any, handleChange: any, nextStep: () => void, prevStep: () => void }> = ({ formData, handleChange, nextStep, prevStep }) => (
    <div>
        <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">Site Configuration</h3>
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Site Title</label>
                <input name="siteTitle" value={formData.siteTitle} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Copyright Text</label>
                <input name="copyrightText" value={formData.copyrightText} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md" required />
            </div>
        </div>
        <div className="flex justify-between mt-8">
            <button type="button" onClick={prevStep} className="bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold py-2 px-4 rounded-md">Back</button>
            <button type="button" onClick={nextStep} className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-md">Next</button>
        </div>
    </div>
);

const Step3: React.FC<{ formData: any, handleChange: any, nextStep: () => void, prevStep: () => void }> = ({ formData, handleChange, nextStep, prevStep }) => (
    <div>
        <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">Create Your Admin Account</h3>
        <div className="space-y-4">
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
                <input name="adminName" value={formData.adminName} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md" required />
            </div>
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input name="adminEmail" type="email" value={formData.adminEmail} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md" required />
            </div>
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <input name="adminPassword" type="password" value={formData.adminPassword} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md" required minLength={6} />
                 <p className="text-xs text-slate-500 mt-1">Minimum 6 characters.</p>
            </div>
        </div>
        <div className="flex justify-between mt-8">
            <button type="button" onClick={prevStep} className="bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold py-2 px-4 rounded-md">Back</button>
            <button type="button" onClick={nextStep} className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-md">Next</button>
        </div>
    </div>
);

const Step4: React.FC<{ formData: any, handleChange: any, prevStep: () => void }> = ({ formData, handleChange, prevStep }) => (
    <div>
        <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">Initial Content</h3>
        <p className="text-slate-600 text-center mb-6">Would you like to start with the demo content, or begin with a clean slate?</p>
        <div className="space-y-4 max-w-sm mx-auto">
            <label className={`flex items-center p-4 border rounded-md cursor-pointer ${!formData.clearDemoContent ? 'bg-fuchsia-50 border-fuchsia-500' : 'border-slate-300'}`}>
                <input type="radio" name="contentChoice" className="h-4 w-4 text-fuchsia-600 border-slate-300 focus:ring-fuchsia-500" checked={!formData.clearDemoContent} onChange={() => handleChange({ target: { name: 'clearDemoContent', value: false, type: 'radio' } })} />
                <span className="ml-3 text-sm font-medium text-slate-900">Keep Demo Content (Recommended for first-time use)</span>
            </label>
             <label className={`flex items-center p-4 border rounded-md cursor-pointer ${formData.clearDemoContent ? 'bg-fuchsia-50 border-fuchsia-500' : 'border-slate-300'}`}>
                <input type="radio" name="contentChoice" className="h-4 w-4 text-fuchsia-600 border-slate-300 focus:ring-fuchsia-500" checked={formData.clearDemoContent} onChange={() => handleChange({ target: { name: 'clearDemoContent', value: true, type: 'radio' } })} />
                <span className="ml-3 text-sm font-medium text-slate-900">Start with a Blank Slate</span>
            </label>
        </div>
        <div className="flex justify-between mt-8">
            <button type="button" onClick={prevStep} className="bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold py-2 px-4 rounded-md">Back</button>
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md">Finish Setup</button>
        </div>
    </div>
);

export default SetupPage;