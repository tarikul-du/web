import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const WorkDetailPage: React.FC = () => {
  const { workId } = useParams<{ workId: string }>();
  const { works } = useData();

  const work = works.find(w => w.id === parseInt(workId || ''));

  if (!work) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-slate-900">Work not found</h1>
        <p className="text-slate-600 mt-4">The project you are looking for does not exist.</p>
        <Link to="/works" className="mt-6 inline-block bg-fuchsia-600 text-white font-bold py-2 px-6 rounded-full hover:bg-fuchsia-700 transition-colors">
          Back to My Works
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden animate-fade-in">
       <img src={work.imageUrl} alt={work.title} className={`w-full h-96 ${work.imageStyle === 'contain' ? 'object-contain bg-slate-100' : 'object-cover'}`} />
       <div className="p-8 md:p-12">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="inline-block bg-fuchsia-100 text-fuchsia-800 text-sm font-semibold px-3 py-1 rounded-full">{work.category}</span>
              {work.place && <span className="ml-2 inline-block bg-slate-200 text-slate-700 text-sm font-semibold px-3 py-1 rounded-full">{work.place}</span>}
            </div>
             <Link to="/works" className="text-sm text-fuchsia-600 hover:text-fuchsia-800 font-semibold flex-shrink-0">&larr; Back to Works</Link>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">{work.title}</h1>
          <p className="text-sm text-slate-500 mb-6">Created on: {new Date(work.createdAt).toLocaleDateString()}</p>
          <div className="prose max-w-none text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: work.longDescription }} />
          
          <div className="mt-8 pt-6 border-t border-slate-200">
             <h3 className="text-lg font-semibold text-slate-800 mb-4">Technologies & Skills</h3>
             <div className="flex flex-wrap gap-2">
                {work.tags.map(tag => (
                  <span key={tag} className="bg-slate-200 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-full">{tag}</span>
                ))}
              </div>
          </div>
       </div>
    </div>
  );
};

// Add keyframes to CSS for animations
const style = document.createElement('style');
style.innerHTML = `
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}
.prose h1, .prose h2, .prose h3 { color: #1e293b; }
.prose p { margin-bottom: 1em; }
.prose ul, .prose ol { margin-left: 1.5rem; }
.prose li { margin-bottom: 0.5em; }
`;
document.head.appendChild(style);


export default WorkDetailPage;