"use client"

import BusinessDashboard from "@/components/online-bizz/BusinessDashboard"
import BusinessResources from "@/components/online-bizz/BusinessResources"
import { 
  platforms, 
  connectedAccounts, 
  consolidatedStats, 
  helpResources, 
  quickStartGuides 
} from "@/lib/online-bizz-data"

export default function OnlineBizzkuPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">🚀 Online BizzKu</h1>
            <p className="text-xl text-blue-100 mb-4">
              Connect and manage all your online business platforms in one place
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Business Dashboard Component (Overview, Connected Accounts, Available Platforms) */}
        <BusinessDashboard 
          platforms={platforms}
          connectedAccounts={connectedAccounts}
          consolidatedStats={consolidatedStats}
        />
        
        {/* Business Resources Component (Help Resources, Quick Start Guides) */}
        <BusinessResources 
          helpResources={helpResources}
          quickStartGuides={quickStartGuides}
        />
      </div>
    </div>
  )
}