'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How does ADmyBRAND AI Suite work?',
    answer: 'ADmyBRAND AI Suite uses advanced machine learning algorithms to analyze your marketing data, identify patterns, and provide actionable insights. It automates campaign creation, optimizes targeting, and continuously learns from your results to improve performance over time.'
  },
  {
    question: 'What makes this different from other marketing tools?',
    answer: 'Unlike traditional marketing tools, ADmyBRAND AI Suite provides true AI-powered insights and automation. It doesn\'t just collect data—it analyzes it in real-time, predicts trends, and automatically optimizes your campaigns for maximum ROI. Our AI continuously learns and adapts to your specific business needs.'
  },
  {
    question: 'How long does it take to see results?',
    answer: 'Most customers see measurable improvements within the first 30 days. Our AI begins learning from your data immediately and starts providing optimization recommendations within the first week. For best results, we recommend running campaigns for at least 3 months to allow the AI to fully understand your audience and optimize accordingly.'
  },
  {
    question: 'Is my data secure with ADmyBRAND AI Suite?',
    answer: 'Absolutely. We take data security seriously and are SOC 2 compliant. All data is encrypted in transit and at rest, and we never share your information with third parties. Our platform uses enterprise-grade security measures to protect your sensitive marketing data and customer information.'
  },
  {
    question: 'Can I integrate with my existing marketing tools?',
    answer: 'Yes! ADmyBRAND AI Suite integrates with all major marketing platforms including Google Ads, Facebook Ads, LinkedIn Ads, Mailchimp, HubSpot, and more. Our API also allows for custom integrations with your existing tools and workflows.'
  },
  {
    question: 'What kind of support do you provide?',
    answer: 'We offer comprehensive support including 24/7 email support, live chat during business hours, and dedicated account managers for Pro and Enterprise plans. We also provide onboarding sessions, training materials, and regular check-ins to ensure you\'re getting the most from our platform.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about ADmyBRAND AI Suite. Can't find the answer you're looking for? Contact our support team.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <motion.button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                whileHover={{ backgroundColor: 'rgba(249, 250, 251, 0.8)' }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6 text-gray-500" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6">
                      <div className="border-t border-gray-200 pt-6">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-6">
            Still have questions? We're here to help!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
          >
            Contact Support
          </motion.button>
        </motion.div>

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