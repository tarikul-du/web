import React from 'react';
import { Link } from 'react-router-dom';
import { Work } from '../types';

interface WorkCardProps {
  work: Work;
}

const WorkCard: React.FC<WorkCardProps> = ({ work }) => {
  const imageClasses = `w-full h-64 group-hover:opacity-75 transition-opacity duration-300 ${work.imageStyle === 'contain' ? 'object-contain bg-slate-100' : 'object-cover'}`;
  
  return (
    <Link to={`/works/${work.id}`} className="text-left group relative block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:shadow-fuchsia-600/20 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-fuchsia-600 focus:ring-offset-2 focus:ring-offset-slate-100">
      <img src={work.imageUrl} alt={work.title} className={imageClasses} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      <div className="p-4 absolute bottom-0 left-0 right-0">
        <span className="inline-block bg-fuchsia-600 text-white text-xs font-semibold px-2 py-1 rounded-full mb-2">{work.category}</span>
        <h3 className="text-lg font-bold text-white mb-1">{work.title}</h3>
        <p className="text-slate-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-0 group-hover:h-auto">{work.description}</p>
      </div>
    </Link>
  );
};

export default WorkCard;