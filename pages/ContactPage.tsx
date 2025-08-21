import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '../components/Icon';
import { useNotification } from '../context/NotificationContext';

const ContactPage: React.FC = () => {
  const { contactInfo, addMessage } = useData();
  const { addNotification } = useNotification();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    address: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMessage({
      name: formData.name,
      email: formData.email,
      institution: formData.institution,
      address: formData.address,
      message: formData.message,
    });
    addNotification('Your message has been sent successfully!', 'success');
    setFormData({ name: '', email: '', institution: '', address: '', message: '' }); // Clear form
  };

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900">Get In Touch</h1>
        <p className="text-lg text-slate-600 mt-2 max-w-2xl mx-auto">I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.</p>
      </div>
      
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Info Panel */}
            <div className="p-8 sm:p-12 bg-fuchsia-600 text-white relative">
                <div className="absolute inset-0 bg-cover opacity-20" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/subtle-prism.png')"}}></div>
                <div className="relative">
                    <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                    <p className="text-fuchsia-200 mb-8">
                        Feel free to reach out via email, phone, or visit my office. I'm looking forward to hearing from you!
                    </p>
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <EnvelopeIcon className="w-6 h-6 text-fuchsia-200" />
                        <a href={`mailto:${contactInfo.email}`} className="hover:text-white">{contactInfo.email}</a>
                      </div>
                      <div className="flex items-center gap-4">
                        <PhoneIcon className="w-6 h-6 text-fuchsia-200" />
                        <span>{contactInfo.phone}</span>
                      </div>
                      <div className="flex items-start gap-4">
                        <MapPinIcon className="w-6 h-6 text-fuchsia-200 flex-shrink-0 mt-1" />
                        <span>{contactInfo.address}</span>
                      </div>
                    </div>
                </div>
            </div>

            {/* Form Panel */}
            <div className="p-8 sm:p-12">
                 <h2 className="text-3xl font-bold text-slate-800 mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                      <input type="text" id="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 bg-slate-100 border border-slate-300 rounded-md focus:ring-fuchsia-600 focus:border-fuchsia-600 text-slate-800" placeholder="Jane Doe" required />
                    </div>
                     <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Your Email</label>
                      <input type="email" id="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 bg-slate-100 border border-slate-300 rounded-md focus:ring-fuchsia-600 focus:border-fuchsia-600 text-slate-800" placeholder="jane@example.com" required />
                    </div>
                     <div>
                      <label htmlFor="institution" className="block text-sm font-medium text-slate-700 mb-2">Institution (Optional)</label>
                      <input type="text" id="institution" value={formData.institution} onChange={handleChange} className="w-full px-4 py-2 bg-slate-100 border border-slate-300 rounded-md focus:ring-fuchsia-600 focus:border-fuchsia-600 text-slate-800" placeholder="GeoTech Inc." />
                    </div>
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-2">Address (Optional)</label>
                      <input type="text" id="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-2 bg-slate-100 border border-slate-300 rounded-md focus:ring-fuchsia-600 focus:border-fuchsia-600 text-slate-800" placeholder="123 Geospatial Lane" />
                    </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                    <textarea id="message" rows={4} value={formData.message} onChange={handleChange} className="w-full px-4 py-2 bg-slate-100 border border-slate-300 rounded-md focus:ring-fuchsia-600 focus:border-fuchsia-600 text-slate-800" placeholder="Your message here..." required></textarea>
                  </div>
                  <div className="text-left">
                    <button type="submit" className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                      Send Message
                    </button>
                  </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;