'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight, BookOpen, Video, FileText, TrendingUp } from 'lucide-react';

interface BlogSectionProps {
  className?: string;
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
}

const BlogSection: React.FC<BlogSectionProps> = ({ className = '' }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);

  const categories = [
    { id: 'all', name: 'All Posts', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'ai-marketing', name: 'AI Marketing', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'campaigns', name: 'Campaigns', icon: <Video className="w-4 h-4" /> },
    { id: 'analytics', name: 'Analytics', icon: <FileText className="w-4 h-4" /> },
    { id: 'tips', name: 'Tips & Tricks', icon: <BookOpen className="w-4 h-4" /> }
  ];

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: '10 AI-Powered Marketing Strategies That Actually Work',
      excerpt: 'Discover the most effective AI marketing strategies that leading brands are using to increase their ROI and engagement rates.',
      author: 'Sarah Johnson',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'ai-marketing',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      featured: true
    },
    {
      id: 2,
      title: 'How to Create Compelling Email Campaigns with AI',
      excerpt: 'Learn how to leverage artificial intelligence to create personalized email campaigns that convert.',
      author: 'Michael Chen',
      date: '2024-01-12',
      readTime: '6 min read',
      category: 'campaigns',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop'
    },
    {
      id: 3,
      title: 'Understanding Your Marketing Analytics: A Complete Guide',
      excerpt: 'Master the art of reading and interpreting your marketing analytics to make data-driven decisions.',
      author: 'Emily Rodriguez',
      date: '2024-01-10',
      readTime: '12 min read',
      category: 'analytics',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop'
    },
    {
      id: 4,
      title: '5 Proven Ways to Increase Email Open Rates',
      excerpt: 'Simple yet effective strategies to boost your email open rates and improve campaign performance.',
      author: 'David Kim',
      date: '2024-01-08',
      readTime: '5 min read',
      category: 'tips',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop'
    },
    {
      id: 5,
      title: 'The Future of Marketing: AI and Automation Trends',
      excerpt: 'Explore the latest trends in AI and automation that are shaping the future of digital marketing.',
      author: 'Lisa Wang',
      date: '2024-01-05',
      readTime: '10 min read',
      category: 'ai-marketing',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop'
    },
    {
      id: 6,
      title: 'Building Customer Personas with AI Insights',
      excerpt: 'Learn how to create detailed customer personas using AI-powered analytics and behavioral data.',
      author: 'Alex Thompson',
      date: '2024-01-03',
      readTime: '7 min read',
      category: 'analytics',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop'
    }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = blogPosts.find(post => post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className={`py-20 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Latest Insights & Resources
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay ahead of the curve with our latest articles, tips, and insights on AI-powered marketing.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category.icon}
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Featured Post */}
        {featuredPost && selectedCategory === 'all' && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-full">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-xs font-medium">
                      {categories.find(c => c.id === featuredPost.category)?.name}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(featuredPost.date)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm text-gray-600">{featuredPost.author}</span>
                    </div>
                    <button className="flex items-center space-x-2 text-primary-500 hover:text-primary-600 transition-colors">
                      <span className="text-sm font-medium">Read More</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts
            .filter(post => !post.featured || selectedCategory !== 'all')
            .map((post, index) => (
              <motion.article
                key={post.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onHoverStart={() => setHoveredPost(post.id)}
                onHoverEnd={() => setHoveredPost(null)}
              >
                <div className="relative h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                      {categories.find(c => c.id === post.category)?.name}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                        <User className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs text-gray-600">{post.author}</span>
                    </div>
                    
                    <motion.button
                      className="flex items-center space-x-1 text-primary-500 hover:text-primary-600 transition-colors"
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-xs font-medium">Read</span>
                      <ArrowRight className="w-3 h-3" />
                    </motion.button>
                  </div>
                </div>
              </motion.article>
            ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold mb-4">
            Stay Updated with Our Latest Insights
          </h3>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Get the latest AI marketing tips, industry insights, and exclusive content delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="bg-white text-primary-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection; 