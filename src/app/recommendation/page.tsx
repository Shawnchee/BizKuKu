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

  // Remove profile status check useEffect

  // Fetch recommendations with simulated thinking process (frontend only, no backend)
  const fetchRecommendations = async () => {
    setIsThinking(true)
    setIsGenerating(true)
    setError(null)
    setRecommendations([])

    // Simulate thinking for 3 seconds, then show recommendations
    setTimeout(() => {
      const hardcodedGrants = [
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
      setIsThinking(false)
      setIsGenerating(false)
      setRecommendations(hardcodedGrants)
    }, 6500)
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
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Discover tailored financial support!</h1>
          <p className="mt-2 text-gray-600 text-lg">
          Our AI analyzes your business profile and suggests relevant grants, loans, subsidies, and incentive schemes — all in one place.
          </p>
        </div>

        {/* Input Form */}
        <Card className="mb-8 p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Funding Purpose</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={loanPurpose}
                onChange={e => setLoanPurpose(e.target.value)}
                placeholder="e.g. Working Capital"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Requested Amount (RM)</label>
              <input
                className="w-full border rounded px-3 py-2"
                type="number"
                value={loanAmount}
                onChange={e => setLoanAmount(e.target.value)}
                placeholder="e.g. 50000"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Requirements</label>
            <textarea
              className="w-full border rounded px-3 py-2"
              value={additionalContext}
              onChange={e => setAdditionalContext(e.target.value)}
              placeholder="Describe your business needs..."
            />
          </div>
          <div className="mt-6 flex items-center space-x-3">
            <Button onClick={fetchRecommendations} disabled={isGenerating} size="lg">
              {isGenerating ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
              Get Recommendations
            </Button>
            <Button variant="outline" onClick={handleHistoryOpen}>
              <History className="h-4 w-4 mr-2" />
              History
            </Button>
          </div>
        </Card>

        {/* Thinking State */}
        {isThinking && (
          <ThinkingProcess isVisible={isThinking} />
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && !isThinking && (
          <FundingComparisonTable recommendations={recommendations} />
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