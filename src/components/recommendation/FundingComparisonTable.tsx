'use client'

import React from 'react'
import { Card, Button } from '@/components/ui'
import { Badge } from '@/components/ui/Badge'
import { ExternalLink } from 'lucide-react'

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
}

interface FundingComparisonTableProps {
  recommendations: LoanRecommendation[];
}

const FundingComparisonTable: React.FC<FundingComparisonTableProps> = ({ recommendations }) => {
  const displayRecommendations = recommendations.slice(0, 3);

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayRecommendations.map((rec) => (
          <Card key={rec.id} className="p-6 flex flex-col h-full border-2 border-blue-100 hover:border-blue-400 transition">
            <div className="flex items-center justify-between mb-2">
              <Badge>{rec.type}</Badge>
              <span className="text-xs text-blue-700 font-semibold">{rec.provider}</span>
            </div>
            <div className="font-bold text-lg mb-1">{rec.name}</div>
            <div className="text-sm text-gray-600 mb-2">{rec.description}</div>
            <div className="mb-2">
              <span className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">{rec.highlight}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-gray-700">Max Amount: </span>
              <span className="text-gray-900">RM{rec.max_amount.toLocaleString()}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-gray-700">For: </span>
              <span className="text-gray-900">{rec.for_whom}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-gray-700">Eligibility: </span>
              <span className="text-gray-900">{rec.eligibility}</span>
            </div>
            <div className="mt-auto flex items-center gap-2">
              <Button asChild variant="primary" size="sm" className="w-full">
                <a href={rec.apply_url} target="_blank" rel="noopener noreferrer">
                  Apply Now <ExternalLink className="inline-block ml-1 h-4 w-4" />
                </a>
              </Button>
            </div>
          </Card>
        ))}
      </div>
      {recommendations.length > 3 && (
        <div className="text-center text-xs text-gray-500 mt-3">
          Showing top 3 recommended options. Contact us for more funding opportunities.
        </div>
      )}
    </div>
  )
}

export default FundingComparisonTable
