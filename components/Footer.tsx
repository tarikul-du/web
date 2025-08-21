import React from 'react';
import { GithubIcon, LinkedInIcon, TwitterIcon } from './Icon';
import { useData } from '../context/DataContext';

const Footer: React.FC = () => {
  const { siteSettings } = useData();
  return (
    <footer className="bg-slate-200/70 border-t border-slate-300">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-slate-500">
        <div className="flex justify-center space-x-6 mb-4">
          <a href={siteSettings.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-fuchsia-600 transition-colors">
            <TwitterIcon className="h-6 w-6" />
          </a>
          <a href={siteSettings.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-fuchsia-600 transition-colors">
            <GithubIcon className="h-6 w-6" />
          </a>
          <a href={siteSettings.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-fuchsia-600 transition-colors">
            <LinkedInIcon className="h-6 w-6" />
          </a>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} {siteSettings.copyrightText}</p>
        <p className="text-xs mt-2">Built with React and Tailwind CSS.</p>
      </div>
    </footer>
  );
};

export default Footer;