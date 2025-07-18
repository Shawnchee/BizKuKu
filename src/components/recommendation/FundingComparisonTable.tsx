'use client'

import React, { useRef } from 'react'
import { Card, Button } from '@/components/ui'
import { Badge } from '@/components/ui/Badge'
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
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
}

interface FundingComparisonTableProps {
  recommendations: LoanRecommendation[];
}

const FundingComparisonTable: React.FC<FundingComparisonTableProps> = ({ recommendations }) => {
  const { t } = useLanguage()
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="mb-8 relative">
      {/* Scroll Buttons
      {recommendations.length > 3 && (
        <>
          <button
            className="absolute -left-14 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full shadow p-2 hover:bg-blue-50 transition disabled:opacity-30"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            type="button"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            className="absolute -right-14 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full shadow p-2 hover:bg-blue-50 transition disabled:opacity-30"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            type="button"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )} */}
      {/* Scrollable Cards */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide py-2 px-1"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="flex-shrink-0 w-80 scroll-snap-align-start"
          >
            <Card className="p-6 flex flex-col h-full border-2 border-blue-100 hover:border-blue-400 transition">
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
                <span className="font-semibold text-gray-700">{t('recommendation.card.max_amount')} </span>
                <span className="text-gray-900">RM{rec.max_amount.toLocaleString()}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-gray-700">{t('recommendation.card.for')} </span>
                <span className="text-gray-900">{rec.for_whom}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-gray-700">{t('recommendation.card.eligibility')} </span>
                <span className="text-gray-900">{rec.eligibility}</span>
              </div>
              <div className="mt-auto flex items-center gap-2">
                <Button asChild variant="primary" size="sm" className="w-full">
                  <a href={rec.apply_url} target="_blank" rel="noopener noreferrer">
                    {t('recommendation.card.apply_now')} <ExternalLink className="inline-block ml-1 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FundingComparisonTable
