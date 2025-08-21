import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import WorkCard from '../components/WorkCard';
import BlogPreviewCard from '../components/BlogPreviewCard';
import { CheckBadgeIcon } from '../components/Icon';
import { useData } from '../context/DataContext';

const AnimatedSection: React.FC<{children: React.ReactNode, className?: string}> = ({ children, className }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    ref.current?.classList.remove('opacity-0', 'translate-y-4');
                    observer.unobserve(ref.current!);
                }
            },
            {
                rootMargin: '0px',
                threshold: 0.1
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <div ref={ref} className={`transition-all duration-700 ease-out opacity-0 translate-y-4 ${className}`}>
            {children}
        </div>
    );
};


const HomePage: React.FC = () => {
  const { profile, works, blogPosts, skills } = useData();

  const featuredWorks = works.slice(0, 4);
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3">
              <p className="text-xl md:text-2xl text-fuchsia-700 font-medium mb-4">{profile.title}</p>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900">
                Hi, I'm {profile.name}
              </h1>
              <p className="max-w-2xl text-slate-700 mb-8 text-lg">{profile.summary}</p>
              <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/contact"
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Get In Touch
                  </Link>
                   <Link 
                    to="/about"
                    className="bg-white hover:bg-slate-100 text-fuchsia-600 font-bold py-3 px-8 rounded-full transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    About Me
                  </Link>
              </div>
          </div>
          <div className="lg:col-span-2 flex justify-center lg:justify-end">
              <div className="relative w-80 h-80">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-full blur-2xl opacity-70"></div>
                  <img src={profile.avatarUrl} alt={profile.name} className="relative w-full h-full object-cover rounded-full shadow-2xl border-8 border-white"/>
              </div>
          </div>
      </section>
      
      {/* What I Do Section */}
      <AnimatedSection>
        <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">What I Do</h2>
            <p className="max-w-3xl mx-auto text-slate-600 mb-12">I specialize in transforming complex geospatial data into clear, actionable insights.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {profile.whatIDo.map(item => (
                <div key={item.id} className="bg-white p-8 rounded-lg shadow-md text-center">
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
                    <p className="text-slate-600">{item.description}</p>
                </div>
            ))}
        </div>
      </AnimatedSection>

      {/* Featured Works Section */}
      <AnimatedSection>
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-8">Featured Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredWorks.map(work => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/works" className="text-fuchsia-600 hover:text-fuchsia-800 font-semibold text-lg">
            View All Works &rarr;
          </Link>
        </div>
      </AnimatedSection>
      
      {/* My Expertise Section */}
      <AnimatedSection>
        <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{profile.expertiseTitle}</h2>
            <p className="max-w-3xl mx-auto text-slate-600 mb-12">{profile.expertiseDescription}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skillArea) => (
            <div key={skillArea.id} className="bg-white p-6 rounded-lg shadow-md group hover:shadow-xl hover:shadow-fuchsia-600/20 transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-xl font-bold text-slate-800 mb-4 transition-colors group-hover:text-fuchsia-600">{skillArea.category}</h3>
              <ul className="space-y-2">
                {skillArea.skills.slice(0, 5).map(skill => (
                  <li key={skill.name} className="flex items-center gap-2 text-slate-600">
                    <CheckBadgeIcon className="w-5 h-5 text-fuchsia-500 transition-colors group-hover:text-fuchsia-600 flex-shrink-0" />
                    <span>{skill.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </AnimatedSection>
      
       {/* From the Blog Section */}
      <AnimatedSection>
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-8">From the Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map(post => (
            <BlogPreviewCard key={post.id} post={post} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/blog" className="text-fuchsia-600 hover:text-fuchsia-800 font-semibold text-lg">
            Read More Posts &rarr;
          </Link>
        </div>
      </AnimatedSection>

      {/* Let's Connect CTA */}
      <AnimatedSection className="bg-fuchsia-600 text-white text-center py-16 px-8 rounded-lg">
        <h2 className="text-4xl font-bold mb-4">Let's Build Something Great</h2>
        <p className="text-fuchsia-200 max-w-2xl mx-auto mb-8">
          Have a project in mind or just want to connect? I'm always open to discussing new ideas and opportunities.
        </p>
        <Link 
          to="/contact"
          className="bg-white hover:bg-slate-200 text-fuchsia-600 font-bold py-3 px-8 rounded-full transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Contact Me
        </Link>
      </AnimatedSection>
    </div>
  );
};

export default HomePage;