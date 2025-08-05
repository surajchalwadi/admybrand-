'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, BarChart3, Target, Users, Zap, Brain } from 'lucide-react';

interface VideoModalProps {
  onClose: () => void;
}

export default function VideoModal({ onClose }: VideoModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-purple-500 to-blue-500">
            <h2 className="text-xl font-semibold text-white">ADmyBRAND AI Suite Demo</h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Demo Content */}
          <div className="relative w-full aspect-video bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
              <motion.div
                className="absolute top-10 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"
                animate={{
                  x: [0, 50, 0],
                  y: [0, -30, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div
                className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-xl"
                animate={{
                  x: [0, -60, 0],
                  y: [0, 40, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>

            {/* Demo Dashboard */}
            <div className="relative z-10 h-full flex items-center justify-center p-8">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl w-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-8"
                >
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Brain className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">AI-Powered Marketing Dashboard</h3>
                  <p className="text-gray-300">Real-time analytics and campaign optimization</p>
                </motion.div>

                {/* Feature Cards */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: BarChart3, title: "Analytics", color: "from-blue-500 to-cyan-500" },
                    { icon: Target, title: "Targeting", color: "from-purple-500 to-pink-500" },
                    { icon: Users, title: "Audience", color: "from-green-500 to-emerald-500" },
                    { icon: Zap, title: "Automation", color: "from-orange-500 to-red-500" }
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
                    >
                      <div className={`w-10 h-10 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                        <feature.icon className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-white font-medium text-sm">{feature.title}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Stats Row */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="mt-6 grid grid-cols-3 gap-4 text-center"
                >
                  <div>
                    <div className="text-2xl font-bold text-white">98%</div>
                    <div className="text-gray-300 text-sm">Success Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">3.2x</div>
                    <div className="text-gray-300 text-sm">ROI Increase</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">24/7</div>
                    <div className="text-gray-300 text-sm">AI Monitoring</div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Play Button Overlay */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-gray-50">
            <p className="text-gray-600 text-center">
              See how ADmyBRAND AI Suite can transform your marketing strategy with AI-powered insights and automation
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 