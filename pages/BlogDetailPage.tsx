import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { UserCircleIcon } from '../components/Icon';

const BlogDetailPage: React.FC = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const { blogPosts } = useData();

  const post = blogPosts.find(p => p.id === parseInt(blogId || ''));

  if (!post) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-slate-900">Post not found</h1>
        <p className="text-slate-600 mt-4">The blog post you are looking for does not exist.</p>
        <Link to="/blog" className="mt-6 inline-block bg-fuchsia-600 text-white font-bold py-2 px-6 rounded-full hover:bg-fuchsia-700 transition-colors">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden animate-fade-in">
      <img src={post.imageUrl} alt={post.title} className={`w-full h-96 ${post.imageStyle === 'contain' ? 'object-contain bg-slate-100' : 'object-cover'}`} />
      <div className="p-8 md:p-12">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="inline-block bg-fuchsia-100 text-fuchsia-800 text-sm font-semibold px-3 py-1 rounded-full">{post.category}</span>
            {post.place && <span className="ml-2 inline-block bg-slate-200 text-slate-700 text-sm font-semibold px-3 py-1 rounded-full">{post.place}</span>}
          </div>
           <Link to="/blog" className="text-sm text-fuchsia-600 hover:text-fuchsia-800 font-semibold flex-shrink-0">&larr; Back to Blog</Link>
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-slate-500 mb-8">
            <div className="flex items-center gap-2">
                <UserCircleIcon className="w-5 h-5"/>
                <span>{post.author}</span>
            </div>
            <span>&bull;</span>
            <span>{post.publishDate}</span>
        </div>
        <div className="prose max-w-none text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </article>
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
.prose h1, .prose h2, .prose h3 { color: #1e293b; margin-bottom: 0.5em; margin-top: 1em;}
.prose p { margin-bottom: 1.25em; }
.prose ul, .prose ol { margin-left: 1.5rem; margin-bottom: 1.25em; }
.prose li { margin-bottom: 0.5em; }
`;
document.head.appendChild(style);

export default BlogDetailPage;