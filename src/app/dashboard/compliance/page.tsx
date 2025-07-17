'use client'

import React, { useState } from 'react'
import { 
  FileText, 
  Calculator, 
  Calendar, 
  Download, 
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  Plus,
  Filter,
  Search,
  Bell,
  TrendingUp,
  DollarSign,
  PieChart,
  BarChart3,
  Shield,
  AlertCircle
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import ComplianceReportCard from '@/components/compliance/ComplianceReportCard'
import { complianceReports, taxCalculation } from '@/lib/data'
import { formatCurrency, formatPercentage, formatDate } from '@/lib/utils'

export default function CompliancePage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'reports' | 'tax' | 'calendar'>('overview')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'submitted' | 'approved' | 'rejected'>('all')

  const handleRefreshData = async () => {
    setIsRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsRefreshing(false)
  }

  const handleViewReport = (reportId: string) => {
    console.log('Viewing report:', reportId)
  }

  const handleDownloadReport = (reportId: string) => {
    console.log('Downloading report:', reportId)
  }

  const handleSubmitReport = (reportId: string) => {
    console.log('Submitting report:', reportId)
  }

  const handleEditReport = (reportId: string) => {
    console.log('Editing report:', reportId)
  }

  const handleGenerateReport = () => {
    console.log('Generating new report')
  }

  const filteredReports = complianceReports.filter(report => {
    const matchesSearch = report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.period.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusCounts = () => {
    return complianceReports.reduce((counts, report) => {
      counts[report.status] = (counts[report.status] || 0) + 1
      return counts
    }, {} as Record<string, number>)
  }

  const getUpcomingDeadlines = () => {
    const now = new Date()
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
    
    return complianceReports
      .filter(report => {
        const dueDate = new Date(report.dueDate)
        return dueDate >= now && dueDate <= thirtyDaysFromNow && report.status === 'draft'
      })
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
  }

  const statusCounts = getStatusCounts()
  const upcomingDeadlines = getUpcomingDeadlines()

  const tabs = [
    { id: 'overview', label: 'Overview', icon: PieChart },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'tax', label: 'Tax Calculator', icon: Calculator },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Compliance & Reporting</h1>
              <p className="text-gray-600">Manage your business compliance and regulatory requirements</p>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={handleRefreshData}
                disabled={isRefreshing}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
              
              <Button
                onClick={handleGenerateReport}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Generate Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{complianceReports.length}</div>
                    <div className="text-sm text-gray-600">Total Reports</div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{statusCounts.approved || 0}</div>
                    <div className="text-sm text-gray-600">Approved</div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-50 rounded-lg">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{statusCounts.draft || 0}</div>
                    <div className="text-sm text-gray-600">Pending</div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-50 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{upcomingDeadlines.length}</div>
                    <div className="text-sm text-gray-600">Due Soon</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Upcoming Deadlines */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab('calendar')}
                  className="flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  View Calendar
                </Button>
              </div>
              
              {upcomingDeadlines.length > 0 ? (
                <div className="space-y-3">
                  {upcomingDeadlines.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        <div>
                          <div className="font-medium text-gray-900">{report.type} - {report.period}</div>
                          <div className="text-sm text-gray-600">Due: {formatDate(report.dueDate)}</div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleEditReport(report.id)}
                        className="flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        Complete
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
                  <p>No upcoming deadlines - you're all caught up!</p>
                </div>
              )}
            </Card>

            {/* Tax Summary */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {formatCurrency(taxCalculation.grossIncome)}
                  </div>
                  <div className="text-sm text-gray-600">Gross Income</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    {formatCurrency(taxCalculation.deductions)}
                  </div>
                  <div className="text-sm text-gray-600">Deductions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    {formatCurrency(taxCalculation.taxableIncome)}
                  </div>
                  <div className="text-sm text-gray-600">Taxable Income</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600 mb-2">
                    {formatCurrency(taxCalculation.taxOwed)}
                  </div>
                  <div className="text-sm text-gray-600">Tax Owed</div>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  onClick={handleGenerateReport}
                  className="flex flex-col items-center gap-2 h-auto py-4"
                >
                  <Plus className="h-6 w-6 text-blue-600" />
                  <span className="text-sm">Generate Report</span>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => setActiveTab('tax')}
                  className="flex flex-col items-center gap-2 h-auto py-4"
                >
                  <Calculator className="h-6 w-6 text-green-600" />
                  <span className="text-sm">Tax Calculator</span>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => setActiveTab('calendar')}
                  className="flex flex-col items-center gap-2 h-auto py-4"
                >
                  <Calendar className="h-6 w-6 text-purple-600" />
                  <span className="text-sm">View Calendar</span>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => setActiveTab('reports')}
                  className="flex flex-col items-center gap-2 h-auto py-4"
                >
                  <FileText className="h-6 w-6 text-orange-600" />
                  <span className="text-sm">Manage Reports</span>
                </Button>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="submitted">Submitted</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              
              <Button
                variant="outline"
                onClick={handleGenerateReport}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                New Report
              </Button>
            </div>

            {/* Reports Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredReports.map((report) => (
                <ComplianceReportCard
                  key={report.id}
                  report={report}
                  onViewReport={handleViewReport}
                  onDownloadReport={handleDownloadReport}
                  onSubmitReport={handleSubmitReport}
                  onEditReport={handleEditReport}
                />
              ))}
            </div>

            {filteredReports.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">No reports found matching your criteria.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'tax' && (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Calculator</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Income & Deductions</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Gross Income</span>
                      <span className="font-semibold">{formatCurrency(taxCalculation.grossIncome)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Deductions</span>
                      <span className="font-semibold text-green-600">-{formatCurrency(taxCalculation.deductions)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-gray-700">Taxable Income</span>
                      <span className="font-semibold text-blue-600">{formatCurrency(taxCalculation.taxableIncome)}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Tax Breakdown</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Income Tax</span>
                      <span className="font-semibold">{formatCurrency(taxCalculation.breakdown.incomeTax)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Sales Tax (GST)</span>
                      <span className="font-semibold">{formatCurrency(taxCalculation.breakdown.salesTax)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Payroll Tax</span>
                      <span className="font-semibold">{formatCurrency(taxCalculation.breakdown.payrollTax)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-gray-700 font-medium">Total Tax Owed</span>
                      <span className="font-bold text-red-600">{formatCurrency(taxCalculation.taxOwed)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Quarterly Payment</h4>
                <p className="text-sm text-blue-800 mb-2">
                  Estimated quarterly payment: <span className="font-semibold">{formatCurrency(taxCalculation.estimatedQuarterly)}</span>
                </p>
                <p className="text-sm text-blue-800">
                  Tax rate: <span className="font-semibold">{formatPercentage(taxCalculation.taxRate)}</span>
                </p>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Calendar</h3>
              
              <div className="space-y-4">
                <div className="text-sm text-gray-600 mb-4">Upcoming deadlines for the next 90 days:</div>
                
                {complianceReports
                  .filter(report => {
                    const dueDate = new Date(report.dueDate)
                    const now = new Date()
                    const ninetyDaysFromNow = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000)
                    return dueDate >= now && dueDate <= ninetyDaysFromNow
                  })
                  .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                  .map((report) => {
                    const dueDate = new Date(report.dueDate)
                    const now = new Date()
                    const daysUntilDue = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
                    const isOverdue = daysUntilDue < 0
                    const isDueSoon = daysUntilDue <= 7
                    
                    return (
                      <div
                        key={report.id}
                        className={`p-4 rounded-lg border-l-4 ${
                          isOverdue ? 'border-red-500 bg-red-50' :
                          isDueSoon ? 'border-yellow-500 bg-yellow-50' :
                          'border-blue-500 bg-blue-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">{report.type} - {report.period}</div>
                            <div className="text-sm text-gray-600">Due: {formatDate(report.dueDate)}</div>
                            <div className={`text-sm font-medium ${
                              isOverdue ? 'text-red-600' :
                              isDueSoon ? 'text-yellow-600' :
                              'text-blue-600'
                            }`}>
                              {isOverdue 
                                ? `Overdue by ${Math.abs(daysUntilDue)} days` 
                                : `Due in ${daysUntilDue} days`
                              }
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                              report.status === 'approved' ? 'text-green-600 bg-green-100' :
                              report.status === 'submitted' ? 'text-blue-600 bg-blue-100' :
                              report.status === 'rejected' ? 'text-red-600 bg-red-100' :
                              'text-gray-600 bg-gray-100'
                            }`}>
                              {report.status}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
} 