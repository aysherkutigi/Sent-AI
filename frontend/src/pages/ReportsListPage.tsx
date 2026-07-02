import { FileText, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'

interface IncidentReport {
  id: string
  title: string
  type: string
  community: string
  severity: string
  date: string
  riskScore: number
  status: string
}

const mockReports: IncidentReport[] = [
  {
    id: '1',
    title: 'Severe Flooding in Mokwa',
    type: 'flood',
    community: 'Mokwa',
    severity: 'critical',
    date: '2026-07-02',
    riskScore: 92,
    status: 'active'
  },
  {
    id: '2',
    title: 'Cholera Outbreak Alert',
    type: 'disease',
    community: 'Suleja',
    severity: 'high',
    date: '2026-07-01',
    riskScore: 78,
    status: 'active'
  },
  {
    id: '3',
    title: 'Community Security Concern',
    type: 'security',
    community: 'Abuja',
    severity: 'medium',
    date: '2026-06-30',
    riskScore: 45,
    status: 'resolved'
  },
]

export default function ReportsListPage() {
  const navigate = useNavigate()

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800'
      case 'high':
        return 'bg-orange-100 text-orange-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Community Reports</h1>
          </div>
          <button
            onClick={() => navigate('/reports')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Report
          </button>
        </div>

        {/* Reports Grid */}
        <div className="grid gap-6">
          {mockReports.map((report) => (
            <Card key={report.id} variant="elevated" className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{report.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{report.community} • {report.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getSeverityColor(report.severity)}`}>
                    {report.severity.charAt(0).toUpperCase() + report.severity.slice(1)}
                  </span>
                </div>
              </div>

              <div className="mt-4 grid md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">Type</p>
                  <p className="text-sm font-semibold text-gray-900 mt-1">{report.type}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">Risk Score</p>
                  <p className="text-sm font-semibold text-gray-900 mt-1">{report.riskScore}/100</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">Status</p>
                  <p className={`text-sm font-semibold mt-1 ${
                    report.status === 'active' ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
