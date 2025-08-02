'use client';

import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, ArrowRight } from 'lucide-react';
import { CreditScoreData } from '@/lib/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface CreditScoreCardProps {
  creditScoreData: CreditScoreData;
  className?: string;
}

const CreditScoreCard = memo<CreditScoreCardProps>(({ creditScoreData, className = '' }) => {
  const { t } = useLanguage();

  const scorePercentage = useMemo(() => {
    const { currentScore, scoreRange } = creditScoreData;
    return ((currentScore - scoreRange.min) / (scoreRange.max - scoreRange.min)) * 100;
  }, [creditScoreData]);

  const scoreColor = useMemo(() => {
    const score = creditScoreData.currentScore;
    if (score >= 750) return '#10b981'; // Green
    if (score >= 650) return '#3b82f6'; // Blue  
    if (score >= 550) return '#f59e0b'; // Yellow
    return '#ef4444'; // Red
  }, [creditScoreData.currentScore]);

  const TrendIcon = useMemo(() => {
    switch (creditScoreData.trend) {
      case 'improving':
        return ArrowUpRight;
      case 'declining':
        return ArrowDownRight;
      default:
        return ArrowRight;
    }
  }, [creditScoreData.trend]);

  const circumference = 2 * Math.PI * 90; // radius = 90
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (scorePercentage / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 ${className}`}
    >
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {t('credit_score.title')}
        </h3>

        {/* Circular Progress */}
        <div className="relative w-48 h-48 mb-4">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 200 200"
          >
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r="90"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-200"
            />
            {/* Progress circle */}
            <motion.circle
              cx="100"
              cy="100"
              r="90"
              stroke={scoreColor}
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeLinecap="round"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
            />
          </svg>

          {/* Score display in center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center"
            >
              <div className="text-3xl font-bold" style={{ color: scoreColor }}>
                {creditScoreData.currentScore}
              </div>
              <div className="text-sm text-gray-500">
                {creditScoreData.scoreRange.min}-{creditScoreData.scoreRange.max}
              </div>
              <div 
                className="text-lg font-semibold mt-1"
                style={{ color: scoreColor }}
              >
                {creditScoreData.grade}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Trend indicator */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex items-center gap-2 text-sm"
        >
          <TrendIcon 
            className={`w-4 h-4 ${
              creditScoreData.trend === 'improving' 
                ? 'text-green-500' 
                : creditScoreData.trend === 'declining'
                ? 'text-red-500'
                : 'text-gray-500'
            }`} 
          />
          <span className="text-gray-600">
            {t(`credit_score.trend.${creditScoreData.trend}`)}
          </span>
          <span 
            className={`font-medium ${
              creditScoreData.monthlyChange > 0 
                ? 'text-green-600' 
                : creditScoreData.monthlyChange < 0
                ? 'text-red-600'
                : 'text-gray-600'
            }`}
          >
            {creditScoreData.monthlyChange > 0 ? '+' : ''}{creditScoreData.monthlyChange}
          </span>
        </motion.div>

        {/* Last updated */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="text-xs text-gray-400 mt-2"
        >
          {t('credit_score.last_updated')}: {new Date(creditScoreData.lastUpdated).toLocaleDateString()}
        </motion.div>
      </div>
    </motion.div>
  );
});

CreditScoreCard.displayName = 'CreditScoreCard';

export default CreditScoreCard;