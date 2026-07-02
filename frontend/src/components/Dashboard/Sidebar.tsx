import { LayoutDashboard, MessageCircle, FileText, Waves, Activity, MapPin, AlertTriangle, BarChart3, Clock, Settings, HelpCircle } from 'lucide-react'
import { useLocation } from 'react-router-dom'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: MessageCircle, label: 'AI Copilot', href: '/copilot' },
  { icon: FileText, label: 'Community Reports', href: '/reports' },
  { icon: Waves, label: 'Flood Monitoring', href: '/flood' },
  { icon: Activity, label: 'Disease Surveillance', href: '/disease' },
  { icon: AlertTriangle, label: 'Security Intelligence', href: '/security' },
  { icon: Activity, label: 'Environmental Hazards', href: '/environment' },
  { icon: MapPin, label: 'Nigeria Risk Map', href: '/map' },
  { icon: Clock, label: 'Historical Incidents', href: '/history' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: AlertTriangle, label: 'Alerts', href: '/alerts' },
]

const bottomItems = [
  { icon: Settings, label: 'Settings', href: '/settings' },
  { icon: HelpCircle, label: 'Help', href: '/help' },
]

export default function Sidebar() {
  const location = useLocation()

  const isActive = (href: string) => location.pathname === href

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto flex flex-col">
      <div className="flex-1">
        <nav className="space-y-1 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)

            return (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  active
                    ? 'bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </a>
            )
          })}
        </nav>
      </div>

      <div className="border-t border-gray-200 p-4 space-y-1">
        {bottomItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)

          return (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                active
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </a>
          )
        })}
      </div>
    </div>
  )
}
