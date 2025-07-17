'use client'

import React, { useEffect, useState } from 'react'
import { Card, Button } from '@/components/ui'
import { Badge } from '@/components/ui/Badge'
import { Loader2, History, RotateCcw, X } from 'lucide-react'
import FundingComparisonTable from '@/components/recommendation/FundingComparisonTable'
import ThinkingProcess from '@/components/recommendation/ThinkingProcess'

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
    { value: 'equipment', label: 'Equipment' },
    { value: 'digitalization', label: 'Digitalization' },
    { value: 'working_capital', label: 'Working Capital' },
    { value: 'expansion', label: 'Business Expansion' },
    { value: 'inventory', label: 'Inventory' },
  ]

  const preferenceOptions = [
    { value: 'grant', label: 'Grant only' },
    { value: 'loan', label: 'Loan only' },
    { value: 'low_interest', label: 'Low-interest' },
    { value: 'fast_approval', label: 'Fast approval' },
  ]

  const [fundingPurpose, setFundingPurpose] = useState('')
  const [preferences, setPreferences] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<'funding' | 'subsidy'>('funding')

  // Remove profile status check useEffect

  // Hardcoded recommendations for each tab
  const grantsAndLoans = [
    {
      id: 10001,
      name: 'Geran Digital PKS (SME Digital Grant)',
      description: 'Get up to RM5,000 to digitalize your business (e.g., POS, e-commerce, accounting).',
      type: 'Grant',
      max_amount: 5000,
      provider: 'MDEC & BSN',
      eligibility: 'Malaysian-owned SME, min 60% local shareholding, in operation >1 year, annual sales <RM50m.',
      apply_url: 'https://mdec.my/grants',
      for_whom: 'Online sellers, kedai runcit, warung, micro businesses',
      highlight: 'Perfect for upgrading to e-commerce or digital POS'
    },
    {
      id: 10002,
      name: 'TEKUN Nasional Micro Financing',
      description: 'Easy micro-loans for small traders and hawkers, up to RM10,000.',
      type: 'Loan',
      max_amount: 10000,
      provider: 'TEKUN Nasional',
      eligibility: 'Malaysian, 18-65 years old, micro business owner, registered with SSM or local council.',
      apply_url: 'https://www.tekun.gov.my/',
      for_whom: 'Pasar malam sellers, food stalls, home-based businesses',
      highlight: 'Fast approval, low documentation'
    },
    {
      id: 10003,
      name: 'DanaNITA (Women Entrepreneur Fund)',
      description: 'Special fund for women entrepreneurs, up to RM20,000 for business expansion.',
      type: 'Grant',
      max_amount: 20000,
      provider: 'MARA',
      eligibility: 'Malaysian women, registered business, at least 6 months operation.',
      apply_url: 'https://www.mara.gov.my/bantuan-perniagaan/dananita/',
      for_whom: 'Women-owned micro and small businesses',
      highlight: 'Empowering women in business'
    }
  ]

  const subsidiesAndSchemes = [
    {
      id: 20001,
      name: 'Fertilizer Subsidy Program (MOA)',
      description: 'Up to 30% discount on fertilizer for eligible farmers.',
      type: 'Subsidy',
      max_amount: 0,
      provider: 'Ministry of Agriculture',
      eligibility: 'Registered farmers in Kelantan, Terengganu',
      apply_url: 'https://www.moa.gov.my/',
      for_whom: 'Paddy, vegetable, and fruit farmers',
      highlight: 'Reduce your input costs!'
    },
    {
      id: 20002,
      name: 'SME Electricity Tariff Rebate',
      description: 'Monthly rebate on electricity bills for micro and small businesses.',
      type: 'Subsidy',
      max_amount: 0,
      provider: 'TNB',
      eligibility: 'Registered micro and small businesses, TNB customers',
      apply_url: 'https://www.tnb.com.my/',
      for_whom: 'All micro and small businesses',
      highlight: 'Lower your monthly utility costs'
    },
    {
      id: 20003,
      name: 'Sales & Service Tax (SST) Exemption',
      description: 'Exemption from SST for selected business categories.',
      type: 'Tax Relief',
      max_amount: 0,
      provider: 'LHDN',
      eligibility: 'Eligible micro and small businesses, see LHDN guidelines',
      apply_url: 'https://www.hasil.gov.my/',
      for_whom: 'Retailers, F&B, service providers',
      highlight: 'Boost your profit margins!'
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
    }, 7000)
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
          <div className="text-lg font-semibold">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Discover tailored financial support!</h1>
          <p className="mt-2 text-gray-600 text-lg">
          We analyze your business profile and suggests relevant grants, loans, subsidies, and incentive schemes — all in one place.
          </p>
        </div>

        {/* Input Form */}
        <Card className="mb-8 p-8 rounded-2xl shadow-lg border border-gray-200 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Funding Purpose */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Funding Purpose</label>
              <select
                className="w-full h-11 border border-gray-300 rounded-lg px-3 pr-8 text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none transition"
                value={fundingPurpose}
                onChange={e => setFundingPurpose(e.target.value)}
              >
                <option value="">Select purpose...</option>
                {fundingPurposes.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            {/* Requested Amount */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Requested Amount (RM)</label>
              <input
                className="w-full h-11 border border-gray-300 rounded-lg px-3 text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                type="number"
                value={loanAmount}
                onChange={e => setLoanAmount(e.target.value)}
                placeholder="e.g. 50000"
                min={0}
              />
            </div>
          </div>
          {/* Preferences */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Preferences</label>
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
            <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Requirements</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={additionalContext}
              onChange={e => setAdditionalContext(e.target.value)}
              placeholder="Describe any special needs, e.g. halal certification, women-only, etc."
              rows={2}
            />
          </div>
          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <Button onClick={fetchRecommendations} disabled={isGenerating} size="lg" className="w-full sm:w-auto">
              {isGenerating ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
              Get Recommendations
            </Button>
            <Button variant="outline" onClick={handleHistoryOpen} className="w-full sm:w-auto">
              <History className="h-4 w-4 mr-2" />
              History
            </Button>
          </div>
        </Card>

        {/* Success Metrics & Social Proof */}
        {!recommendations.length && !isThinking && (
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-green-700 font-semibold bg-green-50 px-3 py-1 rounded-lg">
                <span className="text-lg">✅</span>
                <span>3,214 micro businesses matched</span>
              </div>
              <div className="flex items-center gap-2 text-blue-700 font-semibold bg-blue-50 px-3 py-1 rounded-lg">
                <span className="text-lg">📈</span>
                <span>RM12.4 million approved</span>
              </div>
              <div className="flex items-center gap-2 text-yellow-700 font-semibold bg-yellow-50 px-3 py-1 rounded-lg">
                <span className="text-lg">🎉</span>
                <span>87% found eligible support</span>
              </div>
            </div>
          </div>
        )}

        {/* Thinking State */}
        {isThinking && (
          <ThinkingProcess isVisible={isThinking} />
        )}

        {/* Recommendations with Tabs */}
        {!isThinking && recommendations.length > 0 && (
          <>
            <div className="mb-4 flex items-center gap-2">
              <h2 className="text-xl font-semibold">Results Tailored for Your Business:</h2>
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
                Grants & Loans
              </button>
              <button
                className={`px-6 py-2 rounded-t-lg font-semibold transition-colors duration-150 border-b-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shadow-sm
                  ${activeTab === 'subsidy' ? 'bg-white border-blue-600 text-blue-700 shadow-md z-10' : 'bg-gray-100 border-transparent text-gray-700 hover:bg-blue-50'}`}
                style={{ minWidth: '160px' }}
                onClick={() => { setActiveTab('subsidy'); setRecommendations(subsidiesAndSchemes) }}
                aria-selected={activeTab === 'subsidy'}
                tabIndex={0}
              >
                Subsidies & Schemes
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
                <h3 className="text-lg font-semibold">Recommendation History</h3>
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
                  <div className="text-gray-500">No history found.</div>
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
                          title="Restore these inputs"
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