'use client';

import { motion } from 'framer-motion';
import { 
  Brain, 
  BarChart3, 
  Target, 
  Users, 
  Zap, 
  Shield 
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analytics',
    description: 'Advanced machine learning algorithms analyze your marketing data to provide actionable insights and predictions.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: BarChart3,
    title: 'Real-time Performance',
    description: 'Monitor your campaigns in real-time with comprehensive dashboards and detailed performance metrics.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Target,
    title: 'Smart Targeting',
    description: 'Reach your ideal audience with AI-driven targeting that adapts and optimizes based on performance.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Users,
    title: 'Customer Segmentation',
    description: 'Automatically segment your audience and create personalized campaigns that drive engagement.',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Zap,
    title: 'Automated Workflows',
    description: 'Set up intelligent automation workflows that save time and increase your marketing efficiency.',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level security with SOC 2 compliance, ensuring your data is always protected and secure.',
    color: 'from-indigo-500 to-purple-500'
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Powerful Features for{' '}
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Modern Marketing
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to create, manage, and optimize your marketing campaigns with AI-powered intelligence.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 h-full shadow-lg hover:shadow-xl transition-all duration-300">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.6, 0.3, 0.6],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </section>
  );
} 