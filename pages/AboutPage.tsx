import React from 'react';
import { BriefcaseIcon, AcademicCapIcon, TrophyIcon, CheckBadgeIcon, DownloadIcon } from '../components/Icon';
import { useData } from '../context/DataContext';

const AboutPage: React.FC = () => {
  const { profile, skills } = useData();

  return (
    <div className="space-y-16">
      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
        <div className="lg:col-span-2 flex justify-center">
          <img src={profile.avatarUrl} alt={profile.name} className="w-72 h-72 rounded-full border-8 border-white shadow-2xl"/>
        </div>
        <div className="lg:col-span-3 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">{profile.name}</h1>
          <p className="text-xl text-fuchsia-600 mt-2">{profile.title}</p>
          <p className="text-slate-600 leading-relaxed mt-6 text-base max-w-3xl mx-auto lg:mx-0">
            {profile.bio}
          </p>
           <a 
            href={profile.resumeUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <DownloadIcon className="w-5 h-5" />
            Download CV
          </a>
        </div>
      </div>
      
      <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-8">Core Competencies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {profile.coreCompetencies.map(skill => (
                  <div key={skill.id} className="flex items-center gap-2 p-3 bg-slate-100 rounded-md">
                      <CheckBadgeIcon className="w-5 h-5 text-fuchsia-600 flex-shrink-0" />
                      <span className="text-slate-700 font-medium text-sm">{skill.name}</span>
                  </div>
              ))}
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
        {/* Main Column */}
        <section className="lg:col-span-3">
          <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900 mb-8">
            <BriefcaseIcon className="w-8 h-8 text-fuchsia-600" />
            <span>Work Experience</span>
          </h2>
          <div className="relative border-l-2 border-fuchsia-200 pl-8 space-y-12 mb-16">
            {profile.experience.map((exp) => (
              <div key={exp.id} className="relative">
                 <div className="absolute -left-[42px] top-1 h-4 w-4 rounded-full bg-fuchsia-600 border-4 border-slate-100"></div>
                <p className="text-sm text-slate-500 mb-1">{exp.period}</p>
                <h3 className="text-xl font-semibold text-slate-800">{exp.role}</h3>
                <p className="text-md text-fuchsia-700 font-medium mb-2">{exp.company}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
          
          <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900 mb-8">
            <AcademicCapIcon className="w-8 h-8 text-fuchsia-600" />
            <span>Education</span>
          </h2>
          <div className="space-y-4 mb-16">
            {profile.education.map((edu) => (
              <div key={edu.id} className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-slate-800">{edu.degree}</h3>
                  <p className="text-slate-600">{edu.institution}</p>
                  <p className="text-sm text-slate-500 mt-1">{edu.period}</p>
              </div>
            ))}
          </div>

          <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900 mb-8">
            <TrophyIcon className="w-8 h-8 text-fuchsia-600" />
            <span>Training</span>
          </h2>
          <div className="space-y-4 mb-16">
            {profile.training.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-slate-800">{item.name}</h3>
                  <p className="text-slate-600">{item.institution} - {item.year}</p>
              </div>
            ))}
          </div>

          <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900 mb-8">
            <TrophyIcon className="w-8 h-8 text-fuchsia-600" />
            <span>Professional Memberships</span>
          </h2>
           <div className="space-y-4 mb-16">
            {profile.memberships.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-slate-800">{item.name}</h3>
                <p className="text-slate-600">{item.period}</p>
              </div>
            ))}
          </div>
          
          <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900 mb-8">
            <TrophyIcon className="w-8 h-8 text-fuchsia-600" />
            <span>Certifications</span>
          </h2>
           <div className="space-y-4">
            {profile.certifications.map((cert) => (
              <div key={cert.id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-slate-800">{cert.name}</h3>
                <p className="text-slate-600">{cert.issuer} - {cert.date}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sidebar Column */}
        <section className="lg:col-span-2">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            My Skills
          </h2>
          <div className="space-y-8">
            {skills.map((skillArea) => (
              <div key={skillArea.id}>
                <h3 className="text-xl font-semibold text-slate-700 mb-4">{skillArea.category}</h3>
                <div className="space-y-5">
                  {skillArea.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-base font-medium text-slate-700">{skill.name}</span>
                        <span className="text-sm font-medium text-slate-500">{skill.percentage}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2.5">
                        <div className="bg-gradient-to-r from-purple-500 to-fuchsia-500 h-2.5 rounded-full" style={{width: `${skill.percentage}%`}}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;