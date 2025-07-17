import React from 'react'
import { 
  FileText, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  XCircle, 
  Download,
  Eye,
  Send
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ComplianceReport } from '@/lib/types'
import { formatDate } from '@/lib/utils'

interface ComplianceReportCardProps {
  report: ComplianceReport
  onViewReport?: (reportId: string) => void
  onDownloadReport?: (reportId: string) => void
  onSubmitReport?: (reportId: string) => void
  onEditReport?: (reportId: string) => void
}

export default function ComplianceReportCard({
  report,
  onViewReport,
  onDownloadReport,
  onSubmitReport,
  onEditReport
}: ComplianceReportCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-50'
      case 'submitted':
        return 'text-blue-600 bg-blue-50'
      case 'draft':
        return 'text-gray-600 bg-gray-50'
      case 'rejected':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return CheckCircle
      case 'submitted':
        return Clock
      case 'draft':
        return FileText
      case 'rejected':
        return XCircle
      default:
        return AlertCircle
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'tax':
        return 'Tax Report'
      case 'audit':
        return 'Audit Report'
      case 'regulatory':
        return 'Regulatory Report'
      case 'financial':
        return 'Financial Statement'
      default:
        return 'Report'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'tax':
        return '📋'
      case 'audit':
        return '🔍'
      case 'regulatory':
        return '⚖️'
      case 'financial':
        return '💰'
      default:
        return '📄'
    }
  }

  const isOverdue = () => {
    const dueDate = new Date(report.dueDate)
    const now = new Date()
    return now > dueDate && report.status === 'draft'
  }

  const getDaysUntilDue = () => {
    const dueDate = new Date(report.dueDate)
    const now = new Date()
    const diffTime = dueDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const StatusIcon = getStatusIcon(report.status)
  const daysUntilDue = getDaysUntilDue()

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{getTypeIcon(report.type)}</div>
          <div>
            <h3 className="font-semibold text-gray-900">{getTypeLabel(report.type)}</h3>
            <p className="text-sm text-gray-600">{report.period}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
            <StatusIcon className="h-3 w-3" />
            <span className="capitalize">{report.status}</span>
          </div>
          
          {isOverdue() && (
            <div className="flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 rounded-full text-xs font-medium">
              <AlertCircle className="h-3 w-3" />
              <span>Overdue</span>
            </div>
          )}
        </div>
      </div>

      {/* Due Date Information */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">Due Date:</span>
          <span className={`text-sm font-medium ${
            isOverdue() ? 'text-red-600' : daysUntilDue <= 7 ? 'text-yellow-600' : 'text-gray-900'
          }`}>
            {formatDate(report.dueDate)}
          </span>
        </div>
        
        {report.status === 'draft' && (
          <div className="text-sm text-gray-600">
            {isOverdue() ? (
              <span className="text-red-600">⚠️ Overdue by {Math.abs(daysUntilDue)} days</span>
            ) : daysUntilDue <= 7 ? (
              <span className="text-yellow-600">⏰ Due in {daysUntilDue} days</span>
            ) : (
              <span className="text-gray-600">📅 Due in {daysUntilDue} days</span>
            )}
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="mb-4">
        <div className="text-sm text-gray-600 mb-2">Timeline:</div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="h-3 w-3 text-green-600" />
            <span className="text-gray-600">Generated:</span>
            <span className="text-gray-900">{formatDate(report.generatedAt)}</span>
          </div>
          
          {report.submittedAt && (
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-3 w-3 text-blue-600" />
              <span className="text-gray-600">Submitted:</span>
              <span className="text-gray-900">{formatDate(report.submittedAt)}</span>
            </div>
          )}
          
          {report.status === 'draft' && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-3 w-3 text-gray-400" />
              <span className="text-gray-600">Submission:</span>
              <span className="text-gray-500">Pending</span>
            </div>
          )}
        </div>
      </div>

      {/* Requirements */}
      <div className="mb-4">
        <div className="text-sm text-gray-600 mb-2">Requirements:</div>
        <div className="space-y-1">
          {report.requirements.slice(0, 3).map((requirement, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">{requirement}</span>
            </div>
          ))}
          {report.requirements.length > 3 && (
            <div className="text-sm text-gray-500 ml-5">
              +{report.requirements.length - 3} more requirements
            </div>
          )}
        </div>
      </div>

      {/* Attachments */}
      {report.attachments.length > 0 && (
        <div className="mb-4">
          <div className="text-sm text-gray-600 mb-2">Attachments:</div>
          <div className="space-y-1">
            {report.attachments.map((attachment, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <FileText className="h-3 w-3 text-gray-500" />
                <span className="text-gray-700">{attachment}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewReport?.(report.id)}
          className="flex items-center gap-2"
        >
          <Eye className="h-4 w-4" />
          View
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDownloadReport?.(report.id)}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Download
        </Button>
        
        {report.status === 'draft' && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEditReport?.(report.id)}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Edit
            </Button>
            
            <Button
              size="sm"
              onClick={() => onSubmitReport?.(report.id)}
              className="flex items-center gap-2 ml-auto"
            >
              <Send className="h-4 w-4" />
              Submit
            </Button>
          </>
        )}
      </div>

      {/* Status-specific Information */}
      {report.status === 'submitted' && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Under Review</span>
          </div>
          <p className="text-sm text-blue-800">
            Your report is being reviewed by the relevant authorities. You will be notified once it's approved or if any changes are required.
          </p>
        </div>
      )}
      
      {report.status === 'approved' && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-900">Approved</span>
          </div>
          <p className="text-sm text-green-800">
            Your report has been approved and submitted successfully. No further action required.
          </p>
        </div>
      )}
      
      {report.status === 'rejected' && (
        <div className="mt-4 p-3 bg-red-50 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <XCircle className="h-4 w-4 text-red-600" />
            <span className="text-sm font-medium text-red-900">Rejected</span>
          </div>
          <p className="text-sm text-red-800">
            Your report was rejected and requires corrections. Please review the feedback and resubmit.
          </p>
        </div>
      )}
    </Card>
  )
} 