import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center';
  lightText?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, alignment = 'center', lightText = true }) => {
  return (
    <div className={`mb-16 ${alignment === 'center' ? 'text-center' : 'text-left'} animate-fade-in-up`}>
      <h2 className={`text-4xl md:text-5xl font-serif font-bold mb-4 relative inline-block ${lightText ? 'text-white' : 'text-gray-900'}`}>
        {title}
        <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent rounded-full opacity-80"></span>
      </h2>
      {subtitle && (
        <p className={`mt-6 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto ${lightText ? 'text-gray-300' : 'text-gray-600'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
