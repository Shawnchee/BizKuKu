'use client';

import { memo, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  ChevronRight,
  Eye,
  BarChart3,
  Target,
  Clock,
  Shield,
  Zap,
  Info,
  Download,
  FileText
} from 'lucide-react';
import { CreditScoreData, BusinessHealthReport, CreditScoreFactor } from '@/lib/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface EnhancedCreditReportProps {
  creditScoreData: CreditScoreData;
  businessHealth: BusinessHealthReport;
  className?: string;
}

const EnhancedCreditReport = memo<EnhancedCreditReportProps>(({
  creditScoreData,
  businessHealth,
  className = ''
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'factors' | 'actions'>('overview');
  const [selectedFactor, setSelectedFactor] = useState<string | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);

  // Translation mapping functions for business health data
  const getStrengthTranslation = (strength: string): string => {
    const strengthMap: { [key: string]: string } = {
      'Excellent payment history with no late payments': 'business_health.strength.payment_history',
      'Long-established credit history (8+ years)': 'business_health.strength.credit_history',
      'Diverse credit mix across multiple account types': 'business_health.strength.credit_mix',
      'Strong relationship with financial institutions': 'business_health.strength.financial_relationship'
    };
    return strengthMap[strength] ? t(strengthMap[strength]) : strength;
  };

  const getActionTranslation = (action: string): string => {
    const actionMap: { [key: string]: string } = {
      'Reduce total debt balances to improve amounts owed ratio': 'business_health.action.reduce_debt_balances',
      'Limit new credit applications to avoid negative impact': 'business_health.action.limit_credit_applications',
      'Maintain timely payments across all credit accounts': 'business_health.action.maintain_timely_payments',
      'Keep older credit accounts open to preserve credit history length': 'business_health.action.keep_old_accounts',
      'Diversify credit mix responsibly without overextending': 'business_health.action.diversify_responsibly'
    };
    return actionMap[action] ? t(actionMap[action]) : action;
  };

  // Structured recommendations based on credit score and business health
  const recommendations = useMemo(() => {
    const score = creditScoreData.currentScore;
    const urgent = [];
    const important = [];
    const longTerm = [];

    // Urgent actions (score < 600)
    if (score < 600) {
      urgent.push({
        id: 'payment_history',
        titleKey: 'recommendations.payment_history.title',
        descriptionKey: 'recommendations.payment_history.description',
        impact: 'High',
        timeframeKey: 'recommendations.timeframe.30_90_days',
        icon: Clock,
        priority: 'urgent'
      });
      urgent.push({
        id: 'reduce_utilization',
        titleKey: 'recommendations.reduce_utilization.title',
        descriptionKey: 'recommendations.reduce_utilization.description',
        impact: 'High',
        timeframeKey: 'recommendations.timeframe.30_60_days',
        icon: Target,
        priority: 'urgent'
      });
    }

    // Important actions (score 600-750)
    if (score >= 600 && score < 750) {
      important.push({
        id: 'diversify_credit',
        titleKey: 'recommendations.diversify_credit.title',
        descriptionKey: 'recommendations.diversify_credit.description',
        impact: 'Medium',
        timeframeKey: 'recommendations.timeframe.6_12_months',
        icon: BarChart3,
        priority: 'important'
      });
      important.push({
        id: 'monitor_reports',
        titleKey: 'recommendations.monitor_reports.title',
        descriptionKey: 'recommendations.monitor_reports.description',
        impact: 'Medium',
        timeframeKey: 'recommendations.timeframe.ongoing',
        icon: Eye,
        priority: 'important'
      });
    }

    // Long-term actions (all scores)
    longTerm.push({
      id: 'build_history',
      titleKey: 'recommendations.build_history.title',
      descriptionKey: 'recommendations.build_history.description',
      impact: 'Medium',
      timeframeKey: 'recommendations.timeframe.12_plus_months',
      icon: Shield,
      priority: 'long-term'
    });
    longTerm.push({
      id: 'business_growth',
      titleKey: 'recommendations.business_growth.title',
      descriptionKey: 'recommendations.business_growth.description',
      impact: 'High',
      timeframeKey: 'recommendations.timeframe.6_18_months',
      icon: TrendingUp,
      priority: 'long-term'
    });

    return { urgent, important, longTerm };
  }, [creditScoreData.currentScore]);

  // Enhanced scoring logic
  const scoringMetrics = useMemo(() => {
    const score = creditScoreData.currentScore;
    const range = creditScoreData.scoreRange;
    const percentage = ((score - range.min) / (range.max - range.min)) * 100;
    
    let tier: 'excellent' | 'good' | 'fair' | 'poor';
    let color: string;
    let bgColor: string;
    let textColor: string;
    
    if (score >= 750) {
      tier = 'excellent';
      color = '#059669'; // emerald-600
      bgColor = '#d1fae5'; // emerald-100
      textColor = '#065f46'; // emerald-800
    } else if (score >= 650) {
      tier = 'good';
      color = '#2563eb'; // blue-600
      bgColor = '#dbeafe'; // blue-100
      textColor = '#1e40af'; // blue-800
    } else if (score >= 550) {
      tier = 'fair';
      color = '#d97706'; // amber-600
      bgColor = '#fef3c7'; // amber-100
      textColor = '#92400e'; // amber-800
    } else {
      tier = 'poor';
      color = '#dc2626'; // red-600
      bgColor = '#fee2e2'; // red-100
      textColor = '#991b1b'; // red-800
    }

    return { percentage, tier, color, bgColor, textColor };
  }, [creditScoreData]);

  const TrendIcon = useMemo(() => {
    switch (creditScoreData.trend) {
      case 'improving': return ArrowUpRight;
      case 'declining': return ArrowDownRight;
      default: return ArrowRight;
    }
  }, [creditScoreData.trend]);

  const getFactorIcon = (factor: CreditScoreFactor) => {
    switch (factor.id) {
      case 'payment_history': return <Shield className="w-5 h-5" />;
      case 'amounts_owed': return <BarChart3 className="w-5 h-5" />;
      case 'length_of_credit_history': return <Clock className="w-5 h-5" />;
      case 'credit_mix': return <Target className="w-5 h-5" />;
      case 'new_credit': return <Zap className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  const getStatusIcon = (status: 'healthy' | 'warning' | 'critical') => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'critical': return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getTrendIcon = (trend: 'improving' | 'stable' | 'declining') => {
    switch (trend) {
      case 'improving': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'declining': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleDownloadReport = () => {
    try {
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = '/business_health_report.pdf';
      link.download = 'Business_Health_Report.pdf';
      
      // Trigger the download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Open the PDF in a new tab after a short delay
      setTimeout(() => {
        window.open('/business_health_report.pdf', '_blank');
      }, 100);
    } catch (error) {
      console.error('Error downloading report:', error);
      // Fallback: just open the PDF in a new tab
      window.open('/business_health_report.pdf', '_blank');
    }
  };

  // Calculate circumference for circular progress
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (scoringMetrics.percentage / 100) * circumference;

  const tabVariants = {
    inactive: { opacity: 0.6, scale: 0.95 },
    active: { opacity: 1, scale: 1 }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Recommendation Modal Component
  const RecommendationModal = () => (
    <AnimatePresence>
      {showRecommendations && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowRecommendations(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">📊 {t('recommendations.modal.title')}</h3>
                  <p className="text-blue-100">{t('recommendations.modal.subtitle')}</p>
                </div>
                <button
                  onClick={() => setShowRecommendations(false)}
                  className="text-white hover:text-blue-200 transition-colors p-2 rounded-full hover:bg-white hover:bg-opacity-20"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 max-h-[70vh] overflow-y-auto">
              {/* Current Score Overview */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">{t('recommendations.current_score')}</h4>
                    <div className="flex items-center gap-4">
                      <span className="text-3xl font-bold text-blue-600">{creditScoreData.currentScore}</span>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${scoringMetrics.bgColor}`}>
                        {scoringMetrics.tier.charAt(0).toUpperCase() + scoringMetrics.tier.slice(1)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">{t('recommendations.potential_increase')}</p>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      <span className="text-xl font-bold text-green-600">+50-120</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendation Categories */}
              <div className="space-y-8">
                {/* Urgent Actions */}
                {recommendations.urgent.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <h4 className="text-xl font-bold text-red-700">🚨 {t('recommendations.urgent_actions')}</h4>
                      <span className="text-sm text-red-600 bg-red-100 px-2 py-1 rounded-full">{t('recommendations.high_impact')}</span>
                    </div>
                    <div className="grid gap-4">
                      {recommendations.urgent.map((rec, index) => {
                        const IconComponent = rec.icon;
                        return (
                          <motion.div
                            key={rec.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-red-50 border border-red-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                          >
                            <div className="flex items-start gap-4">
                              <div className="bg-red-500 text-white p-3 rounded-lg">
                                <IconComponent className="w-6 h-6" />
                              </div>
                              <div className="flex-1">
                                <h5 className="text-lg font-semibold text-gray-800 mb-2">{t(rec.titleKey)}</h5>
                                <p className="text-gray-600 mb-3">{t(rec.descriptionKey)}</p>
                                <div className="flex items-center gap-4 text-sm">
                                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">
                                    {t('recommendations.impact_label')}: {t(`recommendations.impact.${rec.impact.toLowerCase()}`)}
                                  </span>
                                  <span className="text-gray-500 flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {t(rec.timeframeKey)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Important Actions */}
                {recommendations.important.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <h4 className="text-xl font-bold text-orange-700">⚡ {t('recommendations.important_actions')}</h4>
                      <span className="text-sm text-orange-600 bg-orange-100 px-2 py-1 rounded-full">{t('recommendations.medium_impact')}</span>
                    </div>
                    <div className="grid gap-4">
                      {recommendations.important.map((rec, index) => {
                        const IconComponent = rec.icon;
                        return (
                          <motion.div
                            key={rec.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                            className="bg-orange-50 border border-orange-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                          >
                            <div className="flex items-start gap-4">
                              <div className="bg-orange-500 text-white p-3 rounded-lg">
                                <IconComponent className="w-6 h-6" />
                              </div>
                              <div className="flex-1">
                                <h5 className="text-lg font-semibold text-gray-800 mb-2">{t(rec.titleKey)}</h5>
                                <p className="text-gray-600 mb-3">{t(rec.descriptionKey)}</p>
                                <div className="flex items-center gap-4 text-sm">
                                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">
                                    {t('recommendations.impact_label')}: {t(`recommendations.impact.${rec.impact.toLowerCase()}`)}
                                  </span>
                                  <span className="text-gray-500 flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {t(rec.timeframeKey)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Long-term Actions */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <h4 className="text-xl font-bold text-green-700">🎯 {t('recommendations.longterm_growth')}</h4>
                    <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">{t('recommendations.sustainable_growth')}</span>
                  </div>
                  <div className="grid gap-4">
                    {recommendations.longTerm.map((rec, index) => {
                      const IconComponent = rec.icon;
                      return (
                        <motion.div
                          key={rec.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.6 }}
                          className="bg-green-50 border border-green-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex items-start gap-4">
                            <div className="bg-green-500 text-white p-3 rounded-lg">
                              <IconComponent className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <h5 className="text-lg font-semibold text-gray-800 mb-2">{t(rec.titleKey)}</h5>
                              <p className="text-gray-600 mb-3">{t(rec.descriptionKey)}</p>
                              <div className="flex items-center gap-4 text-sm">
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                                  {t('recommendations.impact_label')}: {t(`recommendations.impact.${rec.impact.toLowerCase()}`)}
                                </span>
                                <span className="text-gray-500 flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {t(rec.timeframeKey)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action Summary */}
              <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  {t('recommendations.quick_checklist')}
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{t('recommendations.checklist.review_payments')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{t('recommendations.checklist.auto_payments')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{t('recommendations.checklist.check_utilization')}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{t('recommendations.checklist.review_reports')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{t('recommendations.checklist.monitor_cashflow')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{t('recommendations.checklist.debt_strategy')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  💡 {t('recommendations.improvement_potential')}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowRecommendations(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    {t('recommendations.close')}
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    {t('recommendations.save_plan')}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {t('credit_score.title')} & {t('business_health.title')}
            </h2>
            <p className="text-gray-600">
              {t('credit_score.view_details')}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className={`px-4 py-2 rounded-full text-sm font-semibold ${scoringMetrics.bgColor}`}
              style={{ color: scoringMetrics.textColor }}
            >
              {t(`business_health.level.${scoringMetrics.tier}`)}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-8 py-4 border-b border-gray-100">
        <div className="flex space-x-1">
          {[
            { id: 'overview', labelKey: 'tabs.overview', icon: Eye },
            { id: 'factors', labelKey: 'tabs.factors', icon: BarChart3 },
            { id: 'actions', labelKey: 'tabs.actions', icon: Target }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              variants={tabVariants}
              animate={activeTab === tab.id ? 'active' : 'inactive'}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${activeTab === tab.id 
                  ? 'bg-blue-100 text-blue-700 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }
              `}
            >
              <tab.icon className="w-4 h-4" />
              {t(tab.labelKey)}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Credit Score Circle and Health Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Credit Score Visualization */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-64 h-64 mb-6">
                    <svg
                      className="w-full h-full transform -rotate-90"
                      viewBox="0 0 256 256"
                    >
                      {/* Background circle */}
                      <circle
                        cx="128"
                        cy="128"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="transparent"
                        className="text-gray-200"
                      />
                      {/* Progress circle */}
                      <motion.circle
                        cx="128"
                        cy="128"
                        r={radius}
                        stroke={scoringMetrics.color}
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray={strokeDasharray}
                        strokeLinecap="round"
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 2, ease: 'easeOut' }}
                      />
                      {/* Gradient overlay */}
                      <defs>
                        <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={scoringMetrics.color} />
                          <stop offset="100%" stopColor={scoringMetrics.color} stopOpacity="0.7" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Score display in center */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="text-center"
                      >
                        <div 
                          className="text-5xl font-bold mb-1"
                          style={{ color: scoringMetrics.color }}
                        >
                          {creditScoreData.currentScore}
                        </div>
                        <div className="text-sm text-gray-500 mb-2">
                          {creditScoreData.scoreRange.min}-{creditScoreData.scoreRange.max}
                        </div>
                        <div 
                          className="text-xl font-semibold"
                          style={{ color: scoringMetrics.color }}
                        >
                          {creditScoreData.grade}
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Trend Indicator */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3"
                  >
                    <TrendIcon 
                      className={`w-5 h-5 ${
                        creditScoreData.trend === 'improving' 
                          ? 'text-green-500' 
                          : creditScoreData.trend === 'declining'
                          ? 'text-red-500'
                          : 'text-gray-500'
                      }`} 
                    />
                    <span className="text-sm text-gray-600">
                      {t(`credit_score.trend.${creditScoreData.trend}`)}
                    </span>
                    <span 
                      className={`text-sm font-semibold ${
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
                </div>

                {/* Business Health Summary */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('business_health.title')}
                    </h3>
                    
                    {/* Health Score Bar */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">
                          {t('business_health.health_score')}
                        </span>
                        <span className="text-lg font-bold text-gray-900">
                          {businessHealth.healthScore}/100
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <motion.div
                          className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
                          initial={{ width: 0 }}
                          animate={{ width: `${businessHealth.healthScore}%` }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm font-medium text-green-800">
                          {t('business_health.key_strengths')}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-green-700">
                        {businessHealth.keyStrengths.length}
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-5 h-5 text-blue-500" />
                        <span className="text-sm font-medium text-blue-800">
                          {t('business_health.recommended_actions')}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-blue-700">
                        {businessHealth.recommendedActions.length}
                      </div>
                    </div>
                  </div>

                  {/* Key Insights */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-amber-800 mb-1">{t('credit_report.key_insight')}</h4>
                        <p className="text-sm text-amber-700">
                          {t('credit_report.payment_history_excellent')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Last Updated */}
              <div className="text-center">
                <p className="text-xs text-gray-400">
                  {t('credit_score.last_updated')}: {new Date(creditScoreData.lastUpdated).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === 'factors' && (
            <motion.div
              key="factors"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t('credit_score.factors_affecting')}
              </h3>

              <div className="grid gap-4">
                {creditScoreData.factors.map((factor, index) => (
                  <motion.div
                    key={factor.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`
                      p-5 border-2 rounded-xl cursor-pointer transition-all duration-200
                      ${selectedFactor === factor.id 
                        ? 'border-blue-300 bg-blue-50 shadow-lg' 
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }
                    `}
                    onClick={() => setSelectedFactor(selectedFactor === factor.id ? null : factor.id)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          factor.status === 'healthy' ? 'bg-green-100' :
                          factor.status === 'warning' ? 'bg-yellow-100' : 'bg-red-100'
                        }`}>
                          {getFactorIcon(factor)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {t(`credit_score.factors.${factor.id}`) || factor.name}
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>{t('credit_score.weight')}: {factor.weight}%</span>
                            <span>•</span>
                            <span className={`font-medium ${
                              factor.impact === 'high' ? 'text-red-600' :
                              factor.impact === 'medium' ? 'text-amber-600' : 'text-green-600'
                            }`}>
                              {t(`credit_score.impact_text.${factor.impact}`)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getTrendIcon(factor.trend)}
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">
                            {factor.score}/100
                          </div>
                          {getStatusIcon(factor.status)}
                        </div>
                        <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                          selectedFactor === factor.id ? 'rotate-90' : ''
                        }`} />
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <motion.div
                        className={`h-2 rounded-full ${
                          factor.status === 'healthy'
                            ? 'bg-green-500'
                            : factor.status === 'warning'
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${factor.score}%` }}
                        transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                      />
                    </div>

                    {/* Expandable Content */}
                    <AnimatePresence>
                      {selectedFactor === factor.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 pt-4 border-t border-gray-200"
                        >
                          <p className="text-sm text-gray-700 mb-3">
                            {factor.recommendation}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-gray-500">STATUS:</span>
                            <span className={`text-xs font-semibold ${
                              factor.status === 'healthy' ? 'text-green-600' :
                              factor.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {t(`credit_score.status.${factor.status}`).toUpperCase()}
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'actions' && (
            <motion.div
              key="actions"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t('business_health.recommended_actions')}
              </h3>

              <div className="grid gap-4">
                {businessHealth.recommendedActions.map((action, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start gap-4 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 font-medium mb-2">{getActionTranslation(action)}</p>
                      <div className="flex items-center gap-2 text-sm text-blue-600">
                        <Target className="w-4 h-4" />
                        <span>Priority: High</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Key Strengths */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  {t('business_health.key_strengths')}
                </h4>
                <div className="grid gap-3">
                  {businessHealth.keyStrengths.map((strength, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-green-800 font-medium">{getStrengthTranslation(strength)}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer with CTA */}
      <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-600">
              {t('credit_score.footer_description')}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownloadReport}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {t('credit_score.download_report')}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowRecommendations(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              {t('credit_score.recommendations')}
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Recommendation Modal */}
      <RecommendationModal />
    </div>
  );
});

EnhancedCreditReport.displayName = 'EnhancedCreditReport';

export default EnhancedCreditReport;