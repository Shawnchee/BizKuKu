'use client'

import React, { useEffect, useState } from 'react'
import { Card, Button } from '@/components/ui'
import { Badge } from '@/components/ui/Badge'
import { Loader2, History, RotateCcw, X } from 'lucide-react'
import FundingComparisonTable from '@/components/recommendation/FundingComparisonTable'
import ThinkingProcess from '@/components/recommendation/ThinkingProcess'
import { useLanguage } from '@/contexts/LanguageContext'

type LoanRecommendation = {
  id: number;
  name: string;
  description: string;
  type: string;
  max_amount: number;
  provider: string;
  eligibility: string;
  apply_url: string;
  for_whom: string;
  highlight: string;
};

type RecommendationHistory = {
  id: number;
  funding_purpose: string;
  requested_amount: number;
  additional_context?: string;
  created_at: string;
  recommendations?: LoanRecommendation[];
};

export default function RecommendationPage() {
  const { t } = useLanguage()

  // State
  const [loanPurpose, setLoanPurpose] = useState('')
  const [loanAmount, setLoanAmount] = useState('')
  const [additionalContext, setAdditionalContext] = useState('')
  const [recommendations, setRecommendations] = useState<LoanRecommendation[]>([])
  const [isRecommendationEnabled, setIsRecommendationEnabled] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [recommendationHistory, setRecommendationHistory] = useState<RecommendationHistory[]>([])
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [companyId, setCompanyId] = useState<number>(1)

  const fundingPurposes = [
    { value: 'equipment', label: t('recommendation.purpose.equipment') },
    { value: 'digitalization', label: t('recommendation.purpose.digitalization') },
    { value: 'working_capital', label: t('recommendation.purpose.working_capital') },
    { value: 'expansion', label: t('recommendation.purpose.expansion') },
    { value: 'inventory', label: t('recommendation.purpose.inventory') },
  ]

  const preferenceOptions = [
    { value: 'grant', label: t('recommendation.preference.grant') },
    { value: 'loan', label: t('recommendation.preference.loan') },
    { value: 'low_interest', label: t('recommendation.preference.low_interest') },
    { value: 'fast_approval', label: t('recommendation.preference.fast_approval') },
  ]

  const [fundingPurpose, setFundingPurpose] = useState('')
  const [preferences, setPreferences] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<'funding' | 'subsidy'>('funding')

  // Remove profile status check useEffect

  // Recommendations for each tab
  const grantsAndLoans = [
    {
      id: 10001,
      name: t('recommendation.data.digital_grant.name'),
      description: t('recommendation.data.digital_grant.description'),
      type: t('recommendation.type.grant'),
      max_amount: 5000,
      provider: t('recommendation.provider.mdec_bsn'),
      eligibility: t('recommendation.eligibility.digital_grant'),
      apply_url: 'https://mdec.my/grants',
      for_whom: t('recommendation.for_whom.online_sellers'),
      highlight: t('recommendation.data.digital_grant.highlight')
    },
    {
      id: 10002,
      name: t('recommendation.data.tekun.name'),
      description: t('recommendation.data.tekun.description'),
      type: t('recommendation.type.loan'),
      max_amount: 10000,
      provider: t('recommendation.provider.tekun'),
      eligibility: t('recommendation.eligibility.tekun'),
      apply_url: 'https://www.tekun.gov.my/',
      for_whom: t('recommendation.for_whom.pasar_malam'),
      highlight: t('recommendation.data.tekun.highlight')
    },
    {
      id: 10003,
      name: t('recommendation.data.sme_digitalisation.name'),
      description: t('recommendation.data.sme_digitalisation.description'),
      type: t('recommendation.type.grant'),
      max_amount: 5000,
      provider: t('recommendation.provider.bsn'),
      eligibility: t('recommendation.eligibility.sme_digitalisation'),
      apply_url: 'https://www.bsn.com.my/',
      for_whom: t('recommendation.for_whom.sme_digitalize'),
      highlight: t('recommendation.data.sme_digitalisation.highlight')
    },
    {
      id: 10004,
      name: t('recommendation.data.sme_bank_loan.name'),
      description: t('recommendation.data.sme_bank_loan.description'),
      type: t('recommendation.type.loan'),
      max_amount: 50000,
      provider: t('recommendation.provider.sme_bank'),
      eligibility: t('recommendation.eligibility.sme_bank_loan'),
      apply_url: 'https://www.smebank.com.my/',
      for_whom: t('recommendation.for_whom.micro_businesses'),
      highlight: t('recommendation.data.sme_bank_loan.highlight')
    },
    {
      id: 10005,
      name: t('recommendation.data.tus.name'),
      description: t('recommendation.data.tus.description'),
      type: t('recommendation.type.loan'),
      max_amount: 50000,
      provider: t('recommendation.provider.mara'),
      eligibility: t('recommendation.eligibility.tus'),
      apply_url: 'https://www.mara.gov.my/bantuan-perniagaan/tus/',
      for_whom: t('recommendation.for_whom.young_entrepreneurs'),
      highlight: t('recommendation.data.tus.highlight')
    },
    {
      id: 10006,
      name: t('recommendation.data.beep_sme.name'),
      description: t('recommendation.data.beep_sme.description'),
      type: t('recommendation.type.grant'),
      max_amount: 20000,
      provider: t('recommendation.provider.sme_corp'),
      eligibility: t('recommendation.eligibility.beep_sme'),
      apply_url: 'https://www.smecorp.gov.my/',
      for_whom: t('recommendation.for_whom.bumiputera_sme'),
      highlight: t('recommendation.data.beep_sme.highlight')
    },
    {
      id: 10007,
      name: t('recommendation.data.fund_for_food.name'),
      description: t('recommendation.data.fund_for_food.description'),
      type: t('recommendation.type.loan'),
      max_amount: 5000000,
      provider: t('recommendation.provider.agrobank'),
      eligibility: t('recommendation.eligibility.fund_for_food'),
      apply_url: 'https://www.agrobank.com.my/',
      for_whom: t('recommendation.for_whom.farmers'),
      highlight: t('recommendation.data.fund_for_food.highlight')
    },
    {
      id: 10008,
      name: t('recommendation.data.mbf.name'),
      description: t('recommendation.data.mbf.description'),
      type: t('recommendation.type.loan'),
      max_amount: 50000,
      provider: t('recommendation.provider.agrobank'),
      eligibility: t('recommendation.eligibility.mbf'),
      apply_url: 'https://www.agrobank.com.my/',
      for_whom: t('recommendation.for_whom.smallholder_farmers'),
      highlight: t('recommendation.data.mbf.highlight')
    },
    {
      id: 10009,
      name: t('recommendation.data.beep.name'),
      description: t('recommendation.data.beep.description'),
      type: t('recommendation.type.grant'),
      max_amount: 20000,
      provider: t('recommendation.provider.sme_corp'),
      eligibility: t('recommendation.eligibility.beep_agri'),
      apply_url: 'https://www.smecorp.gov.my/',
      for_whom: t('recommendation.for_whom.bumiputera_agri'),
      highlight: t('recommendation.data.beep.highlight')
    }
  ]

  const subsidiesAndSchemes = [
    {
      id: 20001,
      name: t('recommendation.data.budi_madani.name'),
      description: t('recommendation.data.budi_madani.description'),
      type: t('recommendation.type.subsidy'),
      max_amount: 200,
      provider: t('recommendation.provider.ministry_finance'),
      eligibility: t('recommendation.eligibility.budi_madani'),
      apply_url: 'https://budimadani.gov.my',
      for_whom: t('recommendation.for_whom.smallholder_livestock'),
      highlight: t('recommendation.data.budi_madani.highlight')
    },
    {
      id: 20002,
      name: t('recommendation.data.electricity_rebate.name'),
      description: t('recommendation.data.electricity_rebate.description'),
      type: t('recommendation.type.subsidy'),
      max_amount: 0,
      provider: t('recommendation.provider.tnb'),
      eligibility: t('recommendation.eligibility.electricity_rebate'),
      apply_url: 'https://www.tnb.com.my/',
      for_whom: t('recommendation.for_whom.all_micro_sme'),
      highlight: t('recommendation.data.electricity_rebate.highlight')
    },
    {
      id: 20003,
      name: t('recommendation.data.sst_exemption.name'),
      description: t('recommendation.data.sst_exemption.description'),
      type: t('recommendation.type.tax_relief'),
      max_amount: 0,
      provider: t('recommendation.provider.lhdn'),
      eligibility: t('recommendation.eligibility.sst_exemption'),
      apply_url: 'https://www.hasil.gov.my/',
      for_whom: t('recommendation.for_whom.retailers_fnb'),
      highlight: t('recommendation.data.sst_exemption.highlight')
    },
    {
      id: 20004,
      name: t('recommendation.data.perkeso_subsidy.name'),
      description: t('recommendation.data.perkeso_subsidy.description'),
      type: t('recommendation.type.subsidy'),
      max_amount: 0,
      provider: t('recommendation.provider.perkeso'),
      eligibility: t('recommendation.eligibility.perkeso_subsidy'),
      apply_url: 'https://www.perkeso.gov.my/',
      for_whom: t('recommendation.for_whom.employers'),
      highlight: t('recommendation.data.perkeso_subsidy.highlight')
    },
    {
      id: 20005,
      name: t('recommendation.data.micro_tax_incentive.name'),
      description: t('recommendation.data.micro_tax_incentive.description'),
      type: t('recommendation.type.tax_relief'),
      max_amount: 0,
      provider: t('recommendation.provider.lhdn'),
      eligibility: t('recommendation.eligibility.micro_tax_incentive'),
      apply_url: 'https://www.hasil.gov.my/',
      for_whom: t('recommendation.for_whom.micro_businesses_simple'),
      highlight: t('recommendation.data.micro_tax_incentive.highlight')
    },
    {
      id: 20006,
      name: t('recommendation.data.food_tax_incentive.name'),
      description: t('recommendation.data.food_tax_incentive.description'),
      type: t('recommendation.type.tax_relief'),
      max_amount: 0,
      provider: t('recommendation.provider.lhdn'),
      eligibility: t('recommendation.eligibility.food_tax_incentive'),
      apply_url: 'https://www.hasil.gov.my/',
      for_whom: t('recommendation.for_whom.farmers_agri'),
      highlight: t('recommendation.data.food_tax_incentive.highlight')
    }
  ]

  // Fetch recommendations with simulated thinking process (frontend only, no backend)
  const fetchRecommendations = async () => {
    setIsThinking(true)
    setIsGenerating(true)
    setError(null)
    setRecommendations([])

    // Simulate thinking for 6.5 seconds, then show recommendations
    setTimeout(() => {
      setIsThinking(false)
      setIsGenerating(false)
      // Show grants & loans by default
      setRecommendations(grantsAndLoans)
      setActiveTab('funding')
    }, 5000)
  }

  const handleHistoryOpen = () => {
    setHistoryOpen(true)
    // No fetchRecommendationHistory needed in frontend-only version
  }

  const handleHistoryClose = () => {
    setHistoryOpen(false)
  }

  const restoreRecommendation = (item: RecommendationHistory) => {
    setLoanPurpose(item.funding_purpose)
    setLoanAmount(item.requested_amount.toString())
    setAdditionalContext(item.additional_context || '')
    if (item.recommendations && item.recommendations.length > 0) {
      setRecommendations(item.recommendations)
    } else {
      setTimeout(() => {
        fetchRecommendations()
      }, 2000)
    }
    setHistoryOpen(false)
  }

  const handleCompanyProfileClick = () => {
    window.location.href = '/company-profile'
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <Loader2 className="animate-spin h-8 w-8 text-blue-500 mb-4" />
          <div className="text-lg font-semibold">{t('recommendation.loading')}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('recommendation.title')}</h1>
          <p className="mt-2 text-gray-600 text-lg">
            {t('recommendation.subtitle')}
          </p>
        </div>

        {/* Input Form */}
        <Card className="mb-8 p-8 rounded-2xl shadow-lg border border-gray-200 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Funding Purpose */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t('recommendation.form.purpose.label')}</label>
              <select
                className="w-full h-11 border border-gray-300 rounded-lg px-3 pr-8 text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none transition"
                value={fundingPurpose}
                onChange={e => setFundingPurpose(e.target.value)}
              >
                <option value="">{t('recommendation.form.purpose.placeholder')}</option>
                {fundingPurposes.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            {/* Requested Amount */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t('recommendation.form.amount.label')}</label>
              <input
                className="w-full h-11 border border-gray-300 rounded-lg px-3 text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                type="number"
                value={loanAmount}
                onChange={e => setLoanAmount(e.target.value)}
                placeholder={t('recommendation.form.amount.placeholder')}
                min={0}
              />
            </div>
          </div>
          {/* Preferences */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">{t('recommendation.preferences.label')}</label>
            <div className="flex flex-wrap gap-2">
              {preferenceOptions.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-colors duration-150 ${
                    preferences.includes(opt.value)
                      ? 'bg-blue-600 text-white border-blue-600 shadow'
                      : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-50'
                  }`}
                  onClick={() =>
                    setPreferences(prev =>
                      prev.includes(opt.value)
                        ? prev.filter(v => v !== opt.value)
                        : [...prev, opt.value]
                    )
                  }
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          {/* Additional Requirements */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">{t('recommendation.form.additional.label')}</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={additionalContext}
              onChange={e => setAdditionalContext(e.target.value)}
              placeholder={t('recommendation.form.additional.placeholder')}
              rows={2}
            />
          </div>
          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <Button onClick={fetchRecommendations} disabled={isGenerating} size="lg" className="w-full sm:w-auto">
              {isGenerating ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
              {isGenerating ? t('recommendation.form.button.generating') : t('recommendation.form.button.generate')}
            </Button>
            <Button variant="outline" onClick={handleHistoryOpen} className="w-full sm:w-auto">
              <History className="h-4 w-4 mr-2" />
              {t('recommendation.history.button')}
            </Button>
          </div>
        </Card>

        {/* Success Metrics & Social Proof */}
        {!recommendations.length && !isThinking && (
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-green-700 font-semibold bg-green-50 px-3 py-1 rounded-lg">
                <span className="text-lg">✅</span>
                <span>3,214 {t('recommendation.metrics.businesses_matched')}</span>
              </div>
              <div className="flex items-center gap-2 text-blue-700 font-semibold bg-blue-50 px-3 py-1 rounded-lg">
                <span className="text-lg">📈</span>
                <span>RM12.4 {t('recommendation.metrics.amount_approved')}</span>
              </div>
              <div className="flex items-center gap-2 text-yellow-700 font-semibold bg-yellow-50 px-3 py-1 rounded-lg">
                <span className="text-lg">🎉</span>
                <span>87% {t('recommendation.metrics.found_support')}</span>
              </div>
            </div>
          </div>
        )}

        {/* Thinking State */}
        {isThinking && (
          <ThinkingProcess isVisible={isThinking} />
        )}

        {/* Top 3 Picks Section */}
        {(!isThinking && recommendations.length > 0) && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-blue-900 flex items-center gap-2">
              <span>🏆</span> {t('recommendation.top_picks.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Top 3 hardcoded picks with insights */}
              {[grantsAndLoans[6], grantsAndLoans[8], subsidiesAndSchemes[0]].map((rec, idx) => (
                <div key={rec.id} className="bg-white border-2 border-blue-300 rounded-2xl shadow-lg p-6 flex flex-col h-full relative">
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow">{t('recommendation.badge.top')} {idx + 1}</Badge>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>{rec.type}</Badge>
                    <span className="text-xs text-blue-700 font-semibold">{rec.provider}</span>
                  </div>
                  <div className="font-bold text-lg mb-1 text-blue-900">{rec.name}</div>
                  <div className="text-sm text-gray-600 mb-2">{rec.description}</div>
                  <div className="mb-2">
                    <span className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">{rec.highlight}</span>
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold text-gray-700">{t('recommendation.card.max_amount')} </span>
                    <span className="text-gray-900">RM{rec.max_amount.toLocaleString()}</span>
                  </div>
                  {/* Insights */}
                  <div className="mb-2 mt-2">
                    <ul className="space-y-1 text-sm">
                      {idx === 0 && (
                        <>
                          <li>📈 <span className="font-semibold text-green-700">{t('recommendation.insights.revenue_increase')}</span></li>
                          <li>🚀 <span className="font-semibold text-blue-700">{t('recommendation.insights.fast_track_agri')}</span></li>
                          <li>💰 <span className="font-semibold text-yellow-700">{t('recommendation.insights.high_funding')}</span></li>
                        </>
                      )}
                      {idx === 1 && (
                        <>
                          <li>💡 <span className="font-semibold text-green-700">{t('recommendation.insights.upgrade_assets')}</span></li>
                          <li>⚡ <span className="font-semibold text-blue-700">{t('recommendation.insights.quick_approval')}</span></li>
                          <li>📊 <span className="font-semibold text-yellow-700">{t('recommendation.insights.enhance_brand')}</span></li>
                        </>
                      )}
                      {idx === 2 && (
                        <>
                          <li>💸 <span className="font-semibold text-green-700">{t('recommendation.insights.save_fuel')}</span></li>
                          <li>🌱 <span className="font-semibold text-blue-700">{t('recommendation.insights.lower_costs')}</span></li>
                          <li>🏅 <span className="font-semibold text-yellow-700">{t('recommendation.insights.govt_support')}</span></li>
                        </>
                      )}
                    </ul>
                  </div>
                  {/* Why recommended */}
                  <div className="mb-4 mt-2">
                    <div className="text-xs text-gray-500 font-semibold mb-1">{t('recommendation.why.title')}</div>
                    <div className="text-sm text-gray-700">
                      {idx === 0 && (
                        <>{t('recommendation.why.digitalize_sme')}</>
                      )}
                      {idx === 1 && (
                        <>{t('recommendation.why.micro_funding')}</>
                      )}
                      {idx === 2 && (
                        <>{t('recommendation.why.larger_funding')}</>
                      )}
                    </div>
                  </div>
                  <Button asChild variant="primary" size="sm" className="w-full mt-auto">
                    <a href={rec.apply_url} target="_blank" rel="noopener noreferrer">
                      {t('recommendation.card.apply_now')}
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations with Tabs */}
        {!isThinking && recommendations.length > 0 && (
          <>
            <div className="mb-4 flex items-center gap-2">
              <h2 className="text-xl font-semibold">{t('recommendation.other_funding.title')}</h2>
            </div>
            <div className="mb-2 flex gap-2">
              <button
                className={`px-6 py-2 rounded-t-lg font-semibold transition-colors duration-150 border-b-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shadow-sm
                  ${activeTab === 'funding' ? 'bg-white border-blue-600 text-blue-700 shadow-md z-10' : 'bg-gray-100 border-transparent text-gray-700 hover:bg-blue-50'}`}
                style={{ minWidth: '160px' }}
                onClick={() => { setActiveTab('funding'); setRecommendations(grantsAndLoans) }}
                aria-selected={activeTab === 'funding'}
                tabIndex={0}
              >
                {t('recommendation.tabs.grants_loans')}
              </button>
              <button
                className={`px-6 py-2 rounded-t-lg font-semibold transition-colors duration-150 border-b-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shadow-sm
                  ${activeTab === 'subsidy' ? 'bg-white border-blue-600 text-blue-700 shadow-md z-10' : 'bg-gray-100 border-transparent text-gray-700 hover:bg-blue-50'}`}
                style={{ minWidth: '160px' }}
                onClick={() => { setActiveTab('subsidy'); setRecommendations(subsidiesAndSchemes) }}
                aria-selected={activeTab === 'subsidy'}
                tabIndex={0}
              >
                {t('recommendation.tabs.subsidies_schemes')}
              </button>
            </div>
            <FundingComparisonTable recommendations={recommendations} />
          </>
        )}

        {/* History Modal */}
        {historyOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{t('recommendation.history.title')}</h3>
                <Button variant="ghost" onClick={handleHistoryClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div>
                {isLoadingHistory ? (
                  <div className="flex justify-center py-6">
                    <Loader2 className="animate-spin h-6 w-6 text-blue-500" />
                  </div>
                ) : recommendationHistory.length === 0 ? (
                  <div className="text-gray-500">{t('recommendation.history.no_history')}</div>
                ) : (
                  <ul>
                    {recommendationHistory.map(item => (
                      <li key={item.id} className="mb-2 flex justify-between items-center border-b pb-2">
                        <div>
                          <div className="font-medium">{item.funding_purpose} - RM{item.requested_amount}</div>
                          <div className="text-xs text-gray-500">{formatDate(item.created_at)}</div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          title={t('recommendation.history.restore')}
                          onClick={() => restoreRecommendation(item)}
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}