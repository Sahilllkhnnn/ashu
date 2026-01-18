import React from 'react';
import { ICON_MAP } from '../constants';
import { HelpCircle } from 'lucide-react';

interface DynamicIconProps {
  name: string;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ name, size = 24, className, strokeWidth = 2 }) => {
  const IconComponent = ICON_MAP[name] || HelpCircle;
  return <IconComponent size={size} className={className} strokeWidth={strokeWidth} />;
};

export default DynamicIcon;
