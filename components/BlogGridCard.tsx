import React from 'react';
import { BlogPost } from '../types';

interface BlogGridCardProps {
  post: BlogPost;
}

const BlogGridCard: React.FC<BlogGridCardProps> = ({ post }) => {
  const imageClasses = `w-full h-48 group-hover:opacity-90 transition-opacity duration-300 ${post.imageStyle === 'contain' ? 'object-contain bg-slate-100' : 'object-cover'}`;

  return (
    <div className="group relative block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:shadow-fuchsia-600/20 transition-all duration-300 transform hover:-translate-y-1">
      <img src={post.imageUrl} alt={post.title} className={imageClasses} />
      <div className="p-5">
         <p className="text-sm text-slate-500 mb-2">{post.publishDate} &bull; {post.author}</p>
        <h3 className="text-lg font-bold text-slate-800 group-hover:text-fuchsia-600 transition-colors mb-2 leading-tight">{post.title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed">{post.summary}</p>
      </div>
    </div>
  );
};

export default BlogGridCard;