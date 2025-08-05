'use client';

import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    price: '$29',
    period: '/month',
    description: 'Perfect for small businesses getting started with AI marketing.',
    features: [
      'AI-powered campaign creation',
      'Basic analytics dashboard',
      'Email support',
      'Up to 5 campaigns',
      'Standard templates',
      'Mobile app access'
    ],
    popular: false,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Pro',
    price: '$99',
    period: '/month',
    description: 'Advanced features for growing businesses and marketing teams.',
    features: [
      'Everything in Basic',
      'Advanced AI analytics',
      'Priority support',
      'Unlimited campaigns',
      'Custom templates',
      'Team collaboration',
      'A/B testing tools',
      'API access'
    ],
    popular: true,
    color: 'from-purple-500 to-pink-500'
  },
  {
    name: 'Enterprise',
    price: '$299',
    period: '/month',
    description: 'Full-featured solution for large organizations and agencies.',
    features: [
      'Everything in Pro',
      'Custom AI models',
      'Dedicated account manager',
      'White-label solutions',
      'Advanced security',
      'Custom integrations',
      'Training & onboarding',
      'SLA guarantees'
    ],
    popular: false,
    color: 'from-indigo-500 to-purple-500'
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-white to-gray-50">
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
            Simple,{' '}
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Transparent
            </span>{' '}
            Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your business. All plans include a 14-day free trial.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`relative ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                >
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                </motion.div>
              )}

              <div className={`bg-white/80 backdrop-blur-sm border-2 rounded-2xl p-8 h-full shadow-lg hover:shadow-xl transition-all duration-300 ${
                plan.popular 
                  ? 'border-purple-500 shadow-purple-500/25' 
                  : 'border-gray-200'
              }`}>
                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 + featureIndex * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 bg-gradient-to-r ${plan.color} hover:shadow-lg`}
                >
                  {plan.popular ? 'Start Free Trial' : 'Get Started'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-40 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
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
            className="absolute bottom-40 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
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