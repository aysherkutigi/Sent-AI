import { TrendingUp, TrendingDown } from 'lucide-react'
import Card from '../ui/Card'

interface RiskCardProps {
  title: string
  score: number
  level: 'low' | 'medium' | 'high' | 'critical'
  trend: 'up' | 'down' | 'stable'
  confidence: number
  lastUpdated: string
  icon: React.ReactNode
}

export default function RiskCard({
  title,
  score,
  level,
  trend,
  confidence,
  lastUpdated,
  icon
}: RiskCardProps) {
  const riskColors = {
    low: 'bg-green-100 text-green-800 border-green-300',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    high: 'bg-orange-100 text-orange-800 border-orange-300',
    critical: 'bg-red-100 text-red-800 border-red-300',
  }

  const scoreColor = {
    low: 'text-green-600',
    medium: 'text-yellow-600',
    high: 'text-orange-600',
    critical: 'text-red-600',
  }

  return (
    <Card variant="elevated" className="p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className={`text-4xl font-bold ${scoreColor[level]}`}>
              {score}
            </span>
            <span className="text-xs text-gray-500">/100</span>
          </div>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>

      <div className="flex items-center justify-between">
        <div className={`px-3 py-1 rounded-full text-sm font-semibold border ${riskColors[level]}`}>
          {level.charAt(0).toUpperCase() + level.slice(1)}
        </div>
        <div className="flex items-center gap-1 text-sm font-semibold">
          {trend === 'up' && <TrendingUp className="w-4 h-4 text-red-600" />}
          {trend === 'down' && <TrendingDown className="w-4 h-4 text-green-600" />}
          {trend === 'stable' && <span className="text-gray-600">→</span>}
          <span className={trend === 'up' ? 'text-red-600' : trend === 'down' ? 'text-green-600' : 'text-gray-600'}>
            {trend === 'up' && '+2%'}
            {trend === 'down' && '-1%'}
            {trend === 'stable' && 'Stable'}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Confidence</span>
          <span className="font-semibold text-gray-800">{confidence}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${confidence}%` }}
          />
        </div>
      </div>

      <p className="text-xs text-gray-500">Last updated: {lastUpdated}</p>
    </Card>
  )
}
