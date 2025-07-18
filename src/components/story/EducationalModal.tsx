'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { useLanguage } from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/Button'

interface EducationalModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  data: any[]
  metric: string
  explanation: string
  status: { text: string; color: string }
}

const CustomTooltip = ({ active, payload, label }: any) => {
    const { language } = useLanguage()
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/80 backdrop-blur-sm p-2 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-bold">{label}</p>
          <p style={{ color: payload[0].color }}>
            {`${language === 'ms' ? 'Nilai' : 'Value'}: ${payload[0].value.toFixed(2)}`}
          </p>
        </div>
      )
    }
  
    return null
}

const EducationalModal = memo<EducationalModalProps>(({ isOpen, onClose, title, data, metric, explanation, status }) => {
    const { language } = useLanguage();
    if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative"
        onClick={e => e.stopPropagation()}
      >
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-4 right-4 rounded-full"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </Button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        
        <div className="h-64 w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="day" tick={{ fill: '#6b7280' }} />
                    <YAxis tick={{ fill: '#6b7280' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey={metric} stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>

        <div>
            <h3 className="font-bold text-lg mb-2">{language === 'ms' ? 'Apa Maksudnya?' : 'What does this mean?'}</h3>
            <p className="text-gray-600 mb-4">{explanation}</p>
            <div className="flex items-center gap-2">
                <span className="font-bold">{language === 'ms' ? 'Status:' : 'Status:'}</span>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${status.color}`}>
                    {status.text}
                </span>
            </div>
        </div>

      </motion.div>
    </motion.div>
  )
})

EducationalModal.displayName = 'EducationalModal'
export default EducationalModal 