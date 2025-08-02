'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import EnhancedCreditReport from '@/components/ui/EnhancedCreditReport';
import { CreditScoreData, BusinessHealthReport as BusinessHealthReportType } from '@/lib/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface CreditScoreSectionProps {
  creditScoreData: CreditScoreData;
  businessHealth: BusinessHealthReportType;
  className?: string;
}

const CreditScoreSection = memo<CreditScoreSectionProps>(({
  creditScoreData,
  businessHealth,
  className = ''
}) => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50, 
      scale: 0.9 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`${className}`}
    >
      <motion.div variants={itemVariants}>
        <EnhancedCreditReport 
          creditScoreData={creditScoreData}
          businessHealth={businessHealth}
        />
      </motion.div>
    </motion.section>
  );
});

CreditScoreSection.displayName = 'CreditScoreSection';

export default CreditScoreSection;