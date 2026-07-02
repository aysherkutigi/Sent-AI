import { useNavigate } from 'react-router-dom'
import { ArrowRight, Shield, Cloud, MapPin, AlertCircle } from 'lucide-react'
import Button from '../components/ui/Button'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue-400" />
            <span className="text-2xl font-bold">Sentinel</span>
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#features" className="hover:text-blue-400 transition">Features</a>
            <a href="#how-it-works" className="hover:text-blue-400 transition">How It Works</a>
            <a href="#about" className="hover:text-blue-400 transition">About</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              Sentinel<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
                Africa AI
              </span>
            </h1>
            <p className="text-2xl text-blue-200">
              Offline Community Intelligence Copilot
            </p>
          </div>

          <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
            Predict disasters before they happen. Protect lives using AI that works without internet. An intelligent early warning system built for African communities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => navigate('/dashboard')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 group"
            >
              Launch Dashboard
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </Button>
            <Button
              className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400/10 px-8 py-4 rounded-lg font-semibold transition"
            >
              View Documentation
            </Button>
          </div>

          <div className="flex gap-8 text-sm text-gray-400">
            <div>
              <p className="text-2xl font-bold text-green-400">100%</p>
              <p>Offline</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-400">AI</p>
              <p>Powered</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-400">24/7</p>
              <p>Monitoring</p>
            </div>
          </div>
        </div>

        {/* Hero Illustration */}
        <div className="hidden md:block relative">
          <div className="relative h-96 bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-2xl border border-white/10 backdrop-blur-sm p-8 flex flex-col items-center justify-center space-y-6">
            <div className="text-6xl">🌍</div>
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-300">African Communities</p>
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
                Protected by AI
              </p>
            </div>
            <div className="flex gap-4 text-3xl">
              <span title="Floods">🌊</span>
              <span title="Disease">🏥</span>
              <span title="Security">🛡️</span>
              <span title="Environment">🌱</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-24 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-bold">Powerful Features</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to monitor and respond to community risks
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <AlertCircle className="w-8 h-8" />,
              title: "Real-Time Alerts",
              description: "Instant notifications for emerging risks across your communities"
            },
            {
              icon: <MapPin className="w-8 h-8" />,
              title: "Interactive Maps",
              description: "Visualize risk zones and community locations on dynamic maps"
            },
            {
              icon: <Shield className="w-8 h-8" />,
              title: "AI Analysis",
              description: "Advanced threat detection and risk scoring powered by local AI"
            },
            {
              icon: <Cloud className="w-8 h-8" />,
              title: "100% Offline",
              description: "No internet required - everything runs locally on your device"
            },
            {
              icon: <AlertCircle className="w-8 h-8" />,
              title: "Smart Recommendations",
              description: "AI-powered action suggestions for emergency response teams"
            },
            {
              icon: <Shield className="w-8 h-8" />,
              title: "Multi-Language",
              description: "Support for English, Hausa, Yoruba, Igbo, French, and Swahili"
            }
          ].map((feature, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-blue-400/50 transition group">
              <div className="text-blue-400 mb-4 group-hover:scale-110 transition">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container mx-auto px-4 py-24 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-bold">How It Works</h2>
          <p className="text-xl text-gray-400">Simple workflow for community protection</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: "1", title: "Report", description: "Communities submit incident reports" },
            { step: "2", title: "Analyze", description: "AI analyzes threats and risks" },
            { step: "3", title: "Alert", description: "Authorities receive instant alerts" },
            { step: "4", title: "Respond", description: "Coordinated emergency response" }
          ].map((item, i) => (
            <div key={i} className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-center h-full flex flex-col justify-center space-y-4">
                <div className="text-5xl font-bold text-blue-200 opacity-20">{item.step}</div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-blue-100">{item.description}</p>
                </div>
              </div>
              {i < 3 && (
                <div className="hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-2xl">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24 bg-gradient-to-r from-blue-600/20 to-green-600/20 border border-white/10 rounded-2xl text-center space-y-6">
        <h2 className="text-4xl md:text-5xl font-bold">Ready to Protect Your Community?</h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Join African communities using AI-powered intelligence to predict and prevent disasters.
        </p>
        <Button
          onClick={() => navigate('/dashboard')}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 rounded-lg font-semibold inline-flex items-center gap-2"
        >
          Get Started Now
          <ArrowRight className="w-5 h-5" />
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-24 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-blue-400" />
                <span className="font-bold text-lg">Sentinel</span>
              </div>
              <p className="text-gray-400">Protecting African communities with offline AI</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition">Features</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition">Documentation</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Support</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition">Privacy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Terms</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">License</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Sentinel Africa AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
