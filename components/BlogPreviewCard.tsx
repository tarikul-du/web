import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';

interface BlogPreviewCardProps {
  post: BlogPost;
}

const BlogPreviewCard: React.FC<BlogPreviewCardProps> = ({ post }) => {
  return (
    <Link to={`/blog/${post.id}`} className="block group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:shadow-fuchsia-600/20 transition-all duration-300 transform hover:-translate-y-1">
      <img src={post.imageUrl} alt={post.title} className="w-full h-40 object-cover" />
      <div className="p-5">
        <p className="text-sm text-slate-500 mb-1">{post.publishDate}</p>
        <h3 className="text-lg font-bold text-slate-800 group-hover:text-fuchsia-600 transition-colors mb-2 leading-tight">{post.title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed">{post.summary.substring(0, 80)}...</p>
      </div>
    </Link>
  );
};

export default BlogPreviewCard;