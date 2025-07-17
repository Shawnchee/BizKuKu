'use client'

import React, { useEffect, useState } from 'react'

const thinkingStages = [
  {
    id: 'analyzing',
    label: 'Analyzing company profile and financial data',
    duration: 1000,
    icon: (
      <span className="inline-block mr-2 text-blue-500">
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>
      </span>
    ),
    details: [
      'Processing financial statements',
      'Analyzing cash flow patterns',
      'Evaluating industry benchmarks',
      'Checking eligibility criteria'
    ]
  },
  {
    id: 'rag',
    label: 'Retrieving relevant funding information',
    duration: 2000,
    icon: (
      <span className="inline-block mr-2 text-blue-500">
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
      </span>
    ),
    details: [
      'Searching funding database',
      'Matching with industry requirements',
      'Filtering by eligibility criteria',
      'Ranking funding options by relevance'
    ]
  },
  {
    id: 'formulating',
    label: 'Formulating personalized recommendations',
    duration: 2000,
    icon: (
      <span className="inline-block mr-2 text-blue-500">
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 8h8v8H8z" /></svg>
      </span>
    ),
    details: [
      'Generating recommendation structure',
      'Calculating funding match score',
      'Determining reason for recommendation',
      'Finalizing eligibility assessment'
    ]
  },
  {
    id: 'finalizing',
    label: 'Preparing your funding options',
    duration: 1000,
    icon: (
      <span className="inline-block mr-2 text-blue-500">
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l-1.414-1.414M6.05 6.05L4.636 4.636" /></svg>
      </span>
    ),
    details: [
      'Creating visual presentation',
      'Formatting provider details',
      'Sorting by suitability score',
      'Finalizing recommendations'
    ]
  }
]

interface ThinkingProcessProps {
  isVisible: boolean
}

const ThinkingProcess: React.FC<ThinkingProcessProps> = ({ isVisible }) => {
  const [currentStage, setCurrentStage] = useState(0)
  const [detailIndex, setDetailIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isVisible) {
      setCurrentStage(0)
      setProgress(0)
      setDetailIndex(0)
    }
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    // Progress bar
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1))
    }, 100)

    // Stage transition
    let timeout: NodeJS.Timeout
    if (currentStage < thinkingStages.length) {
      const stage = thinkingStages[currentStage]
      timeout = setTimeout(() => {
        if (currentStage < thinkingStages.length - 1) {
          setCurrentStage(currentStage + 1)
          setDetailIndex(0)
        }
      }, stage.duration)
    }

    // Detail rotation
    const detailInterval = setInterval(() => {
      const stage = thinkingStages[currentStage]
      if (stage && stage.details) {
        setDetailIndex((prev) => (prev + 1) % stage.details.length)
      }
    }, 800)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
      clearInterval(detailInterval)
    }
  }, [currentStage, isVisible])

  if (!isVisible) return null

  return (
    <div className="my-6 p-6 border border-gray-200 rounded-lg bg-white shadow-sm relative overflow-hidden">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 w-full">
        <div className="h-1 bg-gradient-to-r from-blue-500 to-green-400" style={{ width: `${progress}%`, transition: 'width 0.2s' }} />
      </div>
      <div className="flex items-center mb-2 mt-2">
        <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" /></svg>
        <span className="font-semibold text-blue-700 text-lg">AI Agent is Thinking...</span>
      </div>
      <div className="text-gray-500 mb-4 text-sm">
        Give us a moment while our AI analyzes your requirements and generates personalized funding recommendations.
      </div>
      <div className="space-y-3">
        {thinkingStages.map((stage, idx) => (
          <div
            key={stage.id}
            className={`flex items-center p-3 rounded transition-all duration-300 ${idx === currentStage ? 'bg-blue-50 border border-blue-200' : 'opacity-60'}`}
            style={{
              transform: idx === currentStage ? 'scale(1.02)' : 'scale(1)'
            }}
          >
            <div>{stage.icon}</div>
            <div className="flex-1">
              <div className={`font-medium ${idx === currentStage ? 'text-blue-800' : 'text-gray-700'}`}>{stage.label}</div>
              {idx === currentStage && (
                <div className="text-xs text-blue-600 italic mt-1">{stage.details[detailIndex]}</div>
              )}
            </div>
            {idx < currentStage && (
              <span className="ml-2 px-2 py-0.5 text-xs rounded bg-green-100 text-green-700 border border-green-300">Completed</span>
            )}
            {idx === currentStage && (
              <span className="ml-2 px-2 py-0.5 text-xs rounded bg-blue-100 text-blue-700 border border-blue-300">In Progress</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ThinkingProcess