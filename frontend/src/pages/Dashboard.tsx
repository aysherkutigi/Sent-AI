import TopNav from '../components/Dashboard/TopNav'
import Sidebar from '../components/Dashboard/Sidebar'
import RiskCard from '../components/Dashboard/RiskCard'
import AISummary from '../components/Dashboard/AISummary'

export default function Dashboard() {
  const mockSummary = "Sentinel AI has detected increased flood risk in Mokwa following multiple rainfall reports received during the last 48 hours. Two nearby communities have also reported rising river levels. Immediate monitoring is recommended."

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <TopNav />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-6 py-8 space-y-8">
            {/* AI Summary */}
            <AISummary
              summary={mockSummary}
              alerts={5}
              criticalThreats={2}
            />

            {/* Risk Cards */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Risk Assessment Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <RiskCard
                  title="Flood Risk"
                  score={76}
                  level="high"
                  trend="up"
                  confidence={92}
                  lastUpdated="2 hours ago"
                  icon="🌊"
                />
                <RiskCard
                  title="Disease Risk"
                  score={45}
                  level="medium"
                  trend="down"
                  confidence={85}
                  lastUpdated="1 hour ago"
                  icon="🏥"
                />
                <RiskCard
                  title="Security Risk"
                  score={32}
                  level="low"
                  trend="stable"
                  confidence={78}
                  lastUpdated="3 hours ago"
                  icon="🛡️"
                />
                <RiskCard
                  title="Environmental Risk"
                  score={58}
                  level="medium"
                  trend="up"
                  confidence={81}
                  lastUpdated="4 hours ago"
                  icon="🌱"
                />
              </div>
            </div>

            {/* Placeholder for additional sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Incidents</h3>
                <p className="text-gray-500">Incident list coming soon...</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Stats</h3>
                <p className="text-gray-500">Statistics dashboard coming soon...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
