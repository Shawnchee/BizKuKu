'use client'

import { CheckCircle, Sparkles } from 'lucide-react'

interface OnboardingProgressBarProps {
  className?: string
}

export default function OnboardingProgressBar({ className = '' }: OnboardingProgressBarProps) {
  // Simple progress simulation - 3 out of 4 steps completed
  const completedSteps = 3
  const totalSteps = 4
  const progressPercentage = Math.round((completedSteps / totalSteps) * 100)

  return (
    <div className={`relative bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}>
      {/* Decorative elements */}
      <div className="absolute top-2 right-2 text-blue-300">
        <Sparkles className="w-4 h-4" />
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-green-100 rounded-full p-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              Setup Progress
              <span className="ml-2 text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                Almost Done!
              </span>
            </h3>
            <p className="text-sm text-gray-600">
              {completedSteps} of {totalSteps} steps completed • Kemajuan setup
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {progressPercentage}%
          </div>
          <button className="mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg text-sm font-medium">
            Continue Setup →
          </button>
        </div>
      </div>

      {/* Enhanced progress bar */}
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500 ease-out shadow-sm relative overflow-hidden"
            style={{ width: `${progressPercentage}%` }}
          >
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
          </div>
        </div>

        {/* Progress steps indicators */}
        <div className="flex justify-between mt-2">
          {Array.from({ length: totalSteps }, (_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index < completedSteps
                  ? 'bg-green-500 shadow-md'
                  : index === completedSteps
                  ? 'bg-blue-500 shadow-md animate-pulse'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Motivational message */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-700">
          <span className="font-medium text-blue-600">One more step</span> to unlock your business dashboard! 🚀
        </p>
      </div>
    </div>
  )
}
