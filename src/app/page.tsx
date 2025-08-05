'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Menu, X } from 'lucide-react';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">ADmyBRAND</span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-purple-500 transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-purple-500 transition-colors">Pricing</a>
              <a href="#testimonials" className="text-gray-600 hover:text-purple-500 transition-colors">Testimonials</a>
              <a href="#faq" className="text-gray-600 hover:text-purple-500 transition-colors">FAQ</a>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
              >
                Get Started
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="px-6 py-4 space-y-4">
                <a href="#features" className="block text-gray-600 hover:text-purple-500 transition-colors">Features</a>
                <a href="#pricing" className="block text-gray-600 hover:text-purple-500 transition-colors">Pricing</a>
                <a href="#testimonials" className="block text-gray-600 hover:text-purple-500 transition-colors">Testimonials</a>
                <a href="#faq" className="block text-gray-600 hover:text-purple-500 transition-colors">FAQ</a>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Hero />
        <Features />
        <Pricing />
        <Testimonials />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
} 