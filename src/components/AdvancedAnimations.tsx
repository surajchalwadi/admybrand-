'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Target, Play, Pause, RotateCcw } from 'lucide-react';

interface AdvancedAnimationsProps {
  className?: string;
}

const AdvancedAnimations: React.FC<AdvancedAnimationsProps> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState(0);

  const animations = [
    {
      name: 'Floating Elements',
      description: 'Interactive floating particles with physics simulation',
      component: <FloatingElements />
    },
    {
      name: 'Morphing Shapes',
      description: 'Smooth shape transitions with spring physics',
      component: <MorphingShapes />
    },
    {
      name: 'Particle System',
      description: 'Dynamic particle system with mouse interaction',
      component: <ParticleSystem />
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentAnimation((prev) => (prev + 1) % animations.length);
      }, 4000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, animations.length]);

  return (
    <section className={`py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 relative overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            Advanced Animations
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience cutting-edge animations powered by Framer Motion with physics-based interactions.
          </p>
        </motion.div>

        {/* Animation Controls */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center space-x-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center space-x-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span className="text-sm font-medium">{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
            
            <button
              onClick={() => setCurrentAnimation(0)}
              className="flex items-center space-x-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="text-sm font-medium">Reset</span>
            </button>

            <div className="flex space-x-2">
              {animations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentAnimation(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentAnimation ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Animation Display */}
        <motion.div
          className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">
              {animations[currentAnimation].name}
            </h3>
            <p className="text-gray-300">{animations[currentAnimation].description}</p>
          </div>

          <div className="h-96 relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentAnimation}
                className="w-full h-full flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                {animations[currentAnimation].component}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            {
              icon: <Sparkles className="w-8 h-8" />,
              title: 'Physics-Based',
              description: 'Realistic physics simulation with spring and damping effects'
            },
            {
              icon: <Zap className="w-8 h-8" />,
              title: 'Performance Optimized',
              description: 'Smooth 60fps animations with efficient rendering'
            },
            {
              icon: <Target className="w-8 h-8" />,
              title: 'Interactive',
              description: 'Mouse and touch interactions with responsive feedback'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-primary-400 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Floating Elements Animation
const FloatingElements = () => {
  return (
    <div className="w-full h-full relative">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, 20, -20, 0],
            y: [0, -20, 20, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          whileHover={{ scale: 2, transition: { duration: 0.2 } }}
        />
      ))}
    </div>
  );
};

// Morphing Shapes Animation
const MorphingShapes = () => {
  const [currentShape, setCurrentShape] = useState(0);
  const shapes = ['circle', 'square', 'triangle'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentShape((prev) => (prev + 1) % shapes.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [shapes.length]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        className={`w-32 h-32 bg-gradient-to-r from-cyan-400 to-blue-400 ${
          currentShape === 0 ? 'rounded-full' : currentShape === 1 ? 'rounded-lg' : 'rotate-45'
        }`}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 2 }}
      />
    </div>
  );
};

// Particle System Animation
const ParticleSystem = () => {
  return (
    <div className="w-full h-full relative">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
};

export default AdvancedAnimations; 