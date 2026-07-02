import { Zap, AlertCircle } from 'lucide-react'

interface AISummaryProps {
  summary: string
  alerts: number
  criticalThreats: number
}

export default function AISummary({ summary, alerts, criticalThreats }: AISummaryProps) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-600 rounded-lg p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <Zap className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-blue-900 mb-2">AI Situation Summary</h3>
            <p className="text-blue-800 leading-relaxed">{summary}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4 border-t border-blue-200">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-orange-600" />
          <div>
            <p className="text-sm font-semibold text-gray-700">{alerts} Active Alerts</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <div>
            <p className="text-sm font-semibold text-gray-700">{criticalThreats} Critical Threats</p>
          </div>
        </div>
      </div>
    </div>
  )
}
