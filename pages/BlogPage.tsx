import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import BlogGridCard from '../components/BlogGridCard';
import { SearchIcon } from '../components/Icon';

const BlogPage: React.FC = () => {
  const { blogPosts, categories } = useData();
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const blogCategories = useMemo(() => categories.filter(c => c.type === 'blog').map(c => c.name), [categories]);

  const filteredPosts = useMemo(() => {
    let filtered = blogPosts;

    if (activeFilter !== 'All') {
      filtered = filtered.filter(post => post.category === activeFilter);
    }

    if (searchQuery.trim() !== '') {
        const lowercasedQuery = searchQuery.toLowerCase();
        filtered = filtered.filter(post => 
            post.title.toLowerCase().includes(lowercasedQuery) ||
            post.summary.toLowerCase().includes(lowercasedQuery) ||
            post.category.toLowerCase().includes(lowercasedQuery) ||
            post.author.toLowerCase().includes(lowercasedQuery)
        );
    }
    return filtered;
  }, [activeFilter, blogPosts, searchQuery]);


  const getButtonClasses = (category: string) => {
    const baseClasses = 'px-4 py-2 rounded-full font-medium transition-colors duration-200';
    if (activeFilter === category) {
      return `${baseClasses} bg-fuchsia-600 text-white`;
    }
    return `${baseClasses} bg-slate-200 hover:bg-slate-300 text-slate-700`;
  };

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900">Blog</h1>
        <p className="text-lg text-slate-600 mt-2">Thoughts, tutorials, and analysis on geospatial topics.</p>
      </div>
      
      <div className="mb-10 space-y-6">
            <div className="max-w-xl mx-auto">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                        type="search"
                        placeholder="Search for posts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-full leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-fuchsia-500 focus:border-fuchsia-500 sm:text-sm"
                    />
                </div>
            </div>
      
           <div className="flex justify-center flex-wrap gap-2 md:gap-4">
              <button onClick={() => setActiveFilter('All')} className={getButtonClasses('All')}>
                All
              </button>
              {blogCategories.map(category => (
                <button key={category} onClick={() => setActiveFilter(category)} className={getButtonClasses(category)}>
                  {category}
                </button>
              ))}
            </div>
      </div>
      
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <Link to={`/blog/${post.id}`} key={post.id}>
              <BlogGridCard post={post} />
            </Link>
          ))}
        </div>
      ) : (
         <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-slate-800">No Posts Found</h2>
            <p className="text-slate-500 mt-2">Try adjusting your search or filter to find what you're looking for.</p>
        </div>
      )}
    </div>
  );
};

export default BlogPage;