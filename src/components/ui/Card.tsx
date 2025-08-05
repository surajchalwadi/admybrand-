import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'elevated';
  hover?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  hover = false,
  onClick,
}) => {
  const baseClasses = 'rounded-2xl transition-all duration-300';
  
  const variants = {
    default: 'bg-white shadow-lg border border-gray-100',
    glass: 'glass-effect shadow-xl',
    elevated: 'bg-white shadow-2xl border border-gray-100',
  };
  
  const hoverClasses = hover ? 'hover:scale-105 hover:shadow-2xl cursor-pointer' : '';
  const classes = `${baseClasses} ${variants[variant]} ${hoverClasses} ${className}`;
  
  return (
    <motion.div
      className={classes}
      onClick={onClick}
      whileHover={hover ? { scale: 1.05, y: -5 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default Card; 