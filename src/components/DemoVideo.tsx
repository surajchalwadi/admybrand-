'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw } from 'lucide-react';

interface DemoVideoProps {
  className?: string;
}

const DemoVideo: React.FC<DemoVideoProps> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLDivElement>(null);

  const demoSteps = [
    {
      title: 'Dashboard Overview',
      description: 'Get a bird\'s eye view of all your marketing campaigns',
      duration: 3000,
      animation: 'dashboard'
    },
    {
      title: 'AI Analytics',
      description: 'Watch our AI analyze your data in real-time',
      duration: 4000,
      animation: 'analytics'
    },
    {
      title: 'Campaign Creation',
      description: 'Create stunning campaigns with our drag-and-drop editor',
      duration: 3500,
      animation: 'campaign'
    },
    {
      title: 'Performance Tracking',
      description: 'Monitor your campaign performance with detailed insights',
      duration: 3000,
      animation: 'performance'
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % demoSteps.length);
      }, demoSteps[currentStep].duration);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentStep, demoSteps.length]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const getAnimationContent = (animation: string) => {
    switch (animation) {
      case 'dashboard':
        return (
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 h-full">
            <div className="grid grid-cols-3 gap-3 mb-4">
              <motion.div 
                className="bg-white rounded-lg p-3 shadow-sm"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="text-2xl font-bold text-blue-600">247%</div>
                <div className="text-xs text-gray-500">ROI Increase</div>
              </motion.div>
              <motion.div 
                className="bg-white rounded-lg p-3 shadow-sm"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <div className="text-2xl font-bold text-green-600">89%</div>
                <div className="text-xs text-gray-500">Engagement</div>
              </motion.div>
              <motion.div 
                className="bg-white rounded-lg p-3 shadow-sm"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <div className="text-2xl font-bold text-purple-600">156%</div>
                <div className="text-xs text-gray-500">Conversions</div>
              </motion.div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="h-20 bg-gradient-to-r from-blue-200 to-purple-200 rounded flex items-center justify-center">
                <div className="text-blue-600 font-semibold">Live Campaign Data</div>
              </div>
            </div>
          </div>
        );
      
      case 'analytics':
        return (
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-4 h-full">
            <div className="space-y-3">
              <motion.div 
                className="bg-white rounded-lg p-3"
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">AI Analysis</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-green-400 to-blue-400"
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    transition={{ duration: 2 }}
                  />
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-lg p-3"
                animate={{ x: [0, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Pattern Recognition</span>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blue-400 to-purple-400"
                    initial={{ width: 0 }}
                    animate={{ width: '90%' }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        );
      
      case 'campaign':
        return (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 h-full">
            <div className="space-y-3">
              <motion.div 
                className="bg-white rounded-lg p-3 border-2 border-dashed border-purple-200"
                animate={{ borderColor: ['#e9d5ff', '#a855f7', '#e9d5ff'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="text-sm font-medium text-purple-700 mb-2">Campaign Builder</div>
                <div className="grid grid-cols-2 gap-2">
                  <motion.div 
                    className="bg-purple-100 rounded p-2 text-xs"
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    whileDrag={{ scale: 1.1 }}
                  >
                    Email Template
                  </motion.div>
                  <motion.div 
                    className="bg-pink-100 rounded p-2 text-xs"
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    whileDrag={{ scale: 1.1 }}
                  >
                    Audience
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-lg p-3"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <div className="text-sm font-medium text-gray-700 mb-2">Preview</div>
                <div className="h-16 bg-gradient-to-r from-purple-200 to-pink-200 rounded flex items-center justify-center">
                  <span className="text-xs text-purple-700">Campaign Preview</span>
                </div>
              </motion.div>
            </div>
          </div>
        );
      
      case 'performance':
        return (
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4 h-full">
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3">
                <div className="text-sm font-medium text-gray-700 mb-2">Real-time Metrics</div>
                <div className="space-y-2">
                  <motion.div 
                    className="flex justify-between items-center"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <span className="text-xs">Open Rate</span>
                    <span className="text-xs font-medium text-green-600">24.5%</span>
                  </motion.div>
                  <motion.div 
                    className="flex justify-between items-center"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                  >
                    <span className="text-xs">Click Rate</span>
                    <span className="text-xs font-medium text-blue-600">8.2%</span>
                  </motion.div>
                  <motion.div 
                    className="flex justify-between items-center"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
                  >
                    <span className="text-xs">Conversion</span>
                    <span className="text-xs font-medium text-purple-600">3.1%</span>
                  </motion.div>
                </div>
              </div>
              
              <motion.div 
                className="bg-white rounded-lg p-3"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="text-sm font-medium text-gray-700 mb-2">Revenue Impact</div>
                <div className="text-lg font-bold text-green-600">+$12,450</div>
                <div className="text-xs text-gray-500">This month</div>
              </motion.div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <motion.div
      className={`bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Video Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-sm font-medium">ADmyBRAND AI Suite Demo</div>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMute}
              className="p-1 hover:bg-gray-700 rounded"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setShowControls(!showControls)}
              className="p-1 hover:bg-gray-700 rounded"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Video Content */}
      <div className="relative bg-gray-900 aspect-video">
        <div ref={videoRef} className="w-full h-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              className="w-full h-full p-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              {getAnimationContent(demoSteps[currentStep].animation)}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Overlay Controls */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                onClick={togglePlay}
                className="bg-white bg-opacity-90 rounded-full p-4 hover:bg-opacity-100 transition-all duration-200"
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Video Controls */}
      <div className="p-4 bg-gray-50">
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{demoSteps[currentStep].title}</span>
              <span>{currentStep + 1} / {demoSteps.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={togglePlay}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span className="text-sm">{isPlaying ? 'Pause' : 'Play'}</span>
              </button>
              
              <button
                onClick={resetDemo}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="text-sm">Reset</span>
              </button>
            </div>

            {/* Step Indicators */}
            <div className="flex space-x-1">
              {demoSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToStep(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep ? 'bg-primary-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="text-center">
            <p className="text-sm text-gray-600">{demoSteps[currentStep].description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DemoVideo; 