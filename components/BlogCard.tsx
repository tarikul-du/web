import React from 'react';
import { BlogPost } from '../types';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:shadow-indigo-600/20 transition-shadow duration-300 flex flex-col md:flex-row">
      <img src={post.imageUrl} alt={post.title} className="w-full md:w-1/3 h-48 md:h-auto object-cover" />
      <div className="p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">{post.title}</h3>
          <p className="text-slate-600 mb-4">{post.summary}</p>
        </div>
        <div className="text-sm text-slate-500">
          <span>{post.publishDate}</span> &bull; <span>By {post.author}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;