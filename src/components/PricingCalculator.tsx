'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, BarChart3, Zap, Check } from 'lucide-react';

interface PricingCalculatorProps {
  className?: string;
}

interface UsageMetrics {
  contacts: number;
  emailsPerMonth: number;
  campaignsPerMonth: number;
  analyticsDepth: 'basic' | 'advanced' | 'enterprise';
  automationLevel: 'none' | 'basic' | 'advanced';
}

const PricingCalculator: React.FC<PricingCalculatorProps> = ({ className = '' }) => {
  const [usageMetrics, setUsageMetrics] = useState<UsageMetrics>({
    contacts: 1000,
    emailsPerMonth: 5000,
    campaignsPerMonth: 5,
    analyticsDepth: 'basic',
    automationLevel: 'basic'
  });

  const [calculatedPrice, setCalculatedPrice] = useState(29);
  const [recommendedPlan, setRecommendedPlan] = useState('Starter');

  const calculatePrice = (metrics: UsageMetrics) => {
    let basePrice = 0;
    
    // Base pricing based on contacts
    if (metrics.contacts <= 1000) {
      basePrice = 29;
    } else if (metrics.contacts <= 10000) {
      basePrice = 99;
    } else {
      basePrice = 299;
    }

    // Add costs for additional features
    let additionalCosts = 0;

    // Analytics depth multiplier
    const analyticsMultipliers = {
      basic: 1,
      advanced: 1.3,
      enterprise: 1.8
    };
    additionalCosts += basePrice * (analyticsMultipliers[metrics.analyticsDepth] - 1);

    // Automation level multiplier
    const automationMultipliers = {
      none: 0.8,
      basic: 1,
      advanced: 1.4
    };
    additionalCosts += basePrice * (automationMultipliers[metrics.automationLevel] - 1);

    // Email volume costs
    if (metrics.emailsPerMonth > 10000) {
      additionalCosts += (metrics.emailsPerMonth - 10000) * 0.001;
    }

    // Campaign costs
    if (metrics.campaignsPerMonth > 10) {
      additionalCosts += (metrics.campaignsPerMonth - 10) * 5;
    }

    return Math.round(basePrice + additionalCosts);
  };

  const getRecommendedPlan = (price: number) => {
    if (price <= 50) return 'Starter';
    if (price <= 150) return 'Professional';
    return 'Enterprise';
  };

  useEffect(() => {
    const newPrice = calculatePrice(usageMetrics);
    setCalculatedPrice(newPrice);
    setRecommendedPlan(getRecommendedPlan(newPrice));
  }, [usageMetrics]);

  const handleSliderChange = (metric: keyof UsageMetrics, value: number | string) => {
    setUsageMetrics(prev => ({
      ...prev,
      [metric]: value
    }));
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getPlanFeatures = (plan: string) => {
    const features = {
      Starter: ['Up to 1,000 contacts', 'Basic analytics', 'Email campaigns', '24/7 support'],
      Professional: ['Up to 10,000 contacts', 'Advanced analytics', 'AI-powered insights', 'Automated campaigns', 'Priority support'],
      Enterprise: ['Unlimited contacts', 'Custom AI models', 'Advanced automation', 'Dedicated account manager', 'API access']
    };
    return features[plan as keyof typeof features] || [];
  };

  return (
    <motion.div
      className={`bg-white rounded-2xl p-8 shadow-xl border border-gray-100 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Interactive Pricing Calculator</h3>
        <p className="text-gray-600">Customize your plan based on your needs</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Calculator Controls */}
        <div className="space-y-6">
          {/* Contacts */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Number of Contacts
              </label>
              <span className="text-sm text-gray-500">{formatNumber(usageMetrics.contacts)}</span>
            </div>
            <input
              type="range"
              min="100"
              max="50000"
              step="100"
              value={usageMetrics.contacts}
              onChange={(e) => handleSliderChange('contacts', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>100</span>
              <span>50K</span>
            </div>
          </div>

          {/* Emails per month */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Emails per Month
              </label>
              <span className="text-sm text-gray-500">{formatNumber(usageMetrics.emailsPerMonth)}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={usageMetrics.emailsPerMonth}
              onChange={(e) => handleSliderChange('emailsPerMonth', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1K</span>
              <span>100K</span>
            </div>
          </div>

          {/* Campaigns per month */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <BarChart3 className="w-4 h-4 mr-2" />
                Campaigns per Month
              </label>
              <span className="text-sm text-gray-500">{usageMetrics.campaignsPerMonth}</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              step="1"
              value={usageMetrics.campaignsPerMonth}
              onChange={(e) => handleSliderChange('campaignsPerMonth', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1</span>
              <span>50</span>
            </div>
          </div>

          {/* Analytics Depth */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Analytics Depth</label>
            <select
              value={usageMetrics.analyticsDepth}
              onChange={(e) => handleSliderChange('analyticsDepth', e.target.value as any)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="basic">Basic Analytics</option>
              <option value="advanced">Advanced Analytics</option>
              <option value="enterprise">Enterprise Analytics</option>
            </select>
          </div>

          {/* Automation Level */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Automation Level</label>
            <select
              value={usageMetrics.automationLevel}
              onChange={(e) => handleSliderChange('automationLevel', e.target.value as any)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="none">No Automation</option>
              <option value="basic">Basic Automation</option>
              <option value="advanced">Advanced Automation</option>
            </select>
          </div>
        </div>

        {/* Price Display */}
        <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6">
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              ${calculatedPrice}
              <span className="text-lg text-gray-500">/month</span>
            </div>
            <div className="text-sm text-gray-600">Recommended Plan: {recommendedPlan}</div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 mb-3">Plan Features:</h4>
            {getPlanFeatures(recommendedPlan).map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-700">{feature}</span>
              </motion.div>
            ))}
          </div>

          <motion.button
            className="w-full mt-6 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25 hover:scale-105"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started with {recommendedPlan}
          </motion.button>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </motion.div>
  );
};

export default PricingCalculator; 