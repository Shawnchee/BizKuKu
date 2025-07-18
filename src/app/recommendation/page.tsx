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

  // Recommendations for each tab
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
      name: 'SME Digitalisation Matching Grant',
      description: '50% matching grant for digital solutions (e-commerce, POS, payroll, etc.), up to RM5,000.',
      type: 'Grant',
      max_amount: 5000,
      provider: 'BSN',
      eligibility: 'Malaysian SME, in operation >1 year, annual sales <RM50m.',
      apply_url: 'https://www.bsn.com.my/',
      for_whom: 'SMEs looking to digitalize',
      highlight: 'Cut your digital costs in half!'
    },
    {
      id: 10004,
      name: 'SME Bank Micro Enterprise Loan',
      description: 'Flexible micro loans up to RM50,000 for business growth and working capital.',
      type: 'Loan',
      max_amount: 50000,
      provider: 'SME Bank',
      eligibility: 'Malaysian micro enterprise, registered with SSM, in operation >1 year.',
      apply_url: 'https://www.smebank.com.my/',
      for_whom: 'Micro businesses, food stalls, service providers',
      highlight: 'Flexible repayment, business-friendly terms'
    },
    {
      id: 10005,
      name: 'Tabung Usahawan Siswazah (TUS)',
      description: 'Loan scheme for graduates to start or expand businesses, up to RM50,000.',
      type: 'Loan',
      max_amount: 50000,
      provider: 'MARA',
      eligibility: 'Malaysian graduates, aged 18-40, business registered with SSM.',
      apply_url: 'https://www.mara.gov.my/bantuan-perniagaan/tus/',
      for_whom: 'Young entrepreneurs, new graduates',
      highlight: 'Special for university/college graduates'
    },
    {
      id: 10006,
      name: 'Bumiputera Enterprise Enhancement Program (BEEP)',
      description: 'Grant for Bumiputera SMEs to upgrade equipment, branding, and digitalization.',
      type: 'Grant',
      max_amount: 20000,
      provider: 'SME Corp',
      eligibility: 'Bumiputera-owned SME, registered with SSM, in operation >1 year.',
      apply_url: 'https://www.smecorp.gov.my/',
      for_whom: 'Bumiputera micro and small businesses',
      highlight: 'Upgrade your business assets!'
    },
    {
      id: 10007,
      name: 'Fund for Food (3F)',
      description: 'Financing for food production projects (crops, livestock, aquaculture, etc.) to boost Malaysia’s food security.',
      type: 'Loan',
      max_amount: 5000000,
      provider: 'Agrobank',
      eligibility: 'Malaysian farmers, agropreneurs, agri-based companies',
      apply_url: 'https://www.agrobank.com.my/',
      for_whom: 'Farmers, agropreneurs, agri-businesses',
      highlight: 'Long-term financing for food production'
    },
    {
      id: 10008,
      name: 'Micro Biz Financing (MBF)',
      description: 'Micro-financing for small-scale farmers and agropreneurs at a low interest rate (2% per annum).',
      type: 'Loan',
      max_amount: 50000,
      provider: 'Agrobank',
      eligibility: 'Malaysian micro-entrepreneurs in agriculture',
      apply_url: 'https://www.agrobank.com.my/',
      for_whom: 'Smallholder farmers, micro agropreneurs',
      highlight: 'Low interest, easy approval'
    },
    {
      id: 10009,
      name: 'Bumiputera Enterprise Enhancement Program (BEEP)',
      description: 'Grant for Bumiputera agri-entrepreneurs to upgrade equipment, branding, and digitalisation.',
      type: 'Grant',
      max_amount: 20000,
      provider: 'SME Corp',
      eligibility: 'Bumiputera-owned agri-businesses',
      apply_url: 'https://www.smecorp.gov.my/',
      for_whom: 'Bumiputera agri-entrepreneurs',
      highlight: 'Upgrade your agri-business assets'
    }
  ]

  const subsidiesAndSchemes = [
    {
      id: 20001,
      name: 'BUDI MADANI Agri-Komoditi',
      description: 'RM200/month diesel cash subsidy for registered small-scale farmers and commodity growers.',
      type: 'Subsidy',
      max_amount: 200,
      provider: 'Ministry of Finance',
      eligibility: 'Malaysian citizens registered with GeoAgro or commodity boards (MPOB, LGM, etc.), earning RM50k–RM300k annually',
      apply_url: 'https://budimadani.gov.my',
      for_whom: 'Smallholder farmers, livestock breeders, and commodity growers (e.g., palm oil, rubber, cocoa)',
      highlight: 'Lower your farming costs with monthly diesel subsidy!'
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
    },
    {
      id: 20004,
      name: 'PERKESO Wage Subsidy',
      description: 'Wage subsidy for employers to retain local workers during tough times.',
      type: 'Subsidy',
      max_amount: 0,
      provider: 'PERKESO',
      eligibility: 'Registered employer, local employees, subject to PERKESO terms.',
      apply_url: 'https://www.perkeso.gov.my/',
      for_whom: 'Employers with local staff',
      highlight: 'Support for keeping your team!'
    },
    {
      id: 20005,
      name: 'Micro Enterprise Tax Incentive',
      description: 'Reduced tax rate for micro enterprises on the first RM600,000 chargeable income.',
      type: 'Tax Relief',
      max_amount: 0,
      provider: 'LHDN',
      eligibility: 'Micro enterprise, annual sales <RM300,000, <5 employees.',
      apply_url: 'https://www.hasil.gov.my/',
      for_whom: 'Micro businesses',
      highlight: 'Pay less tax, grow more!'
    },
    {
      id: 20006,
      name: 'Tax Incentives for Food Production Projects',
      description: 'Tax exemptions and accelerated capital allowances for approved food production/agriculture projects.',
      type: 'Tax Relief',
      max_amount: 0,
      provider: 'LHDN',
      eligibility: 'Approved agricultural projects',
      apply_url: 'https://www.hasil.gov.my/',
      for_whom: 'Farmers, agri-businesses',
      highlight: 'Tax relief for food/agri projects'
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

        {/* Top 3 Picks Section */}
        {(!isThinking && recommendations.length > 0) && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-blue-900 flex items-center gap-2">
              <span>🏆</span> Top 3 Picks for Your Business
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Top 3 hardcoded picks with insights */}
              {[grantsAndLoans[6], grantsAndLoans[8], subsidiesAndSchemes[0]].map((rec, idx) => (
                <div key={rec.id} className="bg-white border-2 border-blue-300 rounded-2xl shadow-lg p-6 flex flex-col h-full relative">
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow">Top {idx + 1}</Badge>
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
                    <span className="font-semibold text-gray-700">Max Amount: </span>
                    <span className="text-gray-900">RM{rec.max_amount.toLocaleString()}</span>
                  </div>
                  {/* Insights */}
                  <div className="mb-2 mt-2">
                    <ul className="space-y-1 text-sm">
                      {idx === 0 && (
                        <>
                          <li>📈 <span className="font-semibold text-green-700">Potential revenue increase: +12%</span></li>
                          <li>🚀 <span className="font-semibold text-blue-700">Fast-track your agri-business growth</span></li>
                          <li>💰 <span className="font-semibold text-yellow-700">High funding, low barrier for expansion</span></li>
                        </>
                      )}
                      {idx === 1 && (
                        <>
                          <li>💡 <span className="font-semibold text-green-700">Upgrade assets, boost productivity</span></li>
                          <li>⚡ <span className="font-semibold text-blue-700">Quick grant approval for Bumiputera</span></li>
                          <li>📊 <span className="font-semibold text-yellow-700">Enhance brand and digital presence</span></li>
                        </>
                      )}
                      {idx === 2 && (
                        <>
                          <li>💸 <span className="font-semibold text-green-700">Save up to RM2,400/year on fuel</span></li>
                          <li>🌱 <span className="font-semibold text-blue-700">Lower monthly operating costs</span></li>
                          <li>🏅 <span className="font-semibold text-yellow-700">Simple, government-backed support</span></li>
                        </>
                      )}
                    </ul>
                  </div>
                  {/* Why recommended */}
                  <div className="mb-4 mt-2">
                    <div className="text-xs text-gray-500 font-semibold mb-1">Why this is recommended for you:</div>
                    <div className="text-sm text-gray-700">
                      {idx === 0 && (
                        <>Ideal for SMEs looking to digitalize operations and boost online sales. High approval rate for eligible businesses.</>
                      )}
                      {idx === 1 && (
                        <>Perfect for micro businesses needing quick, hassle-free funding to support daily operations or expansion.</>
                      )}
                      {idx === 2 && (
                        <>Great for micro enterprises seeking larger funding with business-friendly repayment options.</>
                      )}
                    </div>
                  </div>
                  <Button asChild variant="primary" size="sm" className="w-full mt-auto">
                    <a href={rec.apply_url} target="_blank" rel="noopener noreferrer">
                      Apply Now
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
              <h2 className="text-xl font-semibold">Other Eligible Funding & Support</h2>
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