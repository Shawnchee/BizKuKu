import React from "react";
import { CheckCircle2, Clock, AlertCircle, Plus } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useLanguage } from "@/contexts/LanguageContext";

export const getStatusIcon = (status: string): React.ReactElement => {
  switch (status) {
    case "connected":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case "in_progress":
      return <Clock className="h-5 w-5 text-yellow-500" />;
    case "error":
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    default:
      return <Plus className="h-5 w-5 text-gray-400" />;
  }
}

export const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const { t } = useLanguage();
  
  switch (status) {
    case "connected":
      return <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100 hover:text-green-800 hover:border-green-200">{t('online_business.status.connected')}</Badge>
    case "active":
      return <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100 hover:text-green-800 hover:border-green-200">{t('online_business.status.active')}</Badge>
    case "in_progress":
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100 hover:text-yellow-800 hover:border-yellow-200">{t('online_business.status.in_progress')}</Badge>
    case "pending_verification":
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100 hover:text-yellow-800 hover:border-yellow-200">{t('online_business.status.pending_verification')}</Badge>
    case "error":
      return <Badge className="bg-red-100 text-red-800 border-red-200 hover:bg-red-100 hover:text-red-800 hover:border-red-200">{t('online_business.status.error')}</Badge>
    default:
      return <Badge className="bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100 hover:text-gray-800 hover:border-gray-200">{t('online_business.status.available')}</Badge>
  }
}

// Legacy function for backward compatibility - now using the component
export const getStatusBadge = (status: string): React.ReactElement => {
  return <StatusBadge status={status} />;
}