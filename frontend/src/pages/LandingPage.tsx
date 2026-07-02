import { Button } from '../components/ui/Button'
import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
              Sentinel Africa AI
            </h1>
            <p className="text-xl text-gray-600">
              Offline Community Intelligence Copilot
            </p>
            <p className="text-lg text-gray-500">
              Predict disasters before they happen. Protect lives using AI that works without internet.
            </p>

            <div className="flex gap-4 flex-wrap">
              <Button
                onClick={() => navigate('/dashboard')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
              >
                Launch Dashboard
              </Button>
              <Button
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold"
              >
                View Community
              </Button>
            </div>
          </div>

          <div className="hidden md:block bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl p-12">
            <div className="text-center text-gray-600">
              <p className="text-4xl mb-4">🌍</p>
              <p>Interactive Risk Map</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
