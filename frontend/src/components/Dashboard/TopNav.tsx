import { Bell, Settings, User, Wifi, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function TopNav() {
  const navigate = useNavigate()

  return (
    <div className="border-b border-gray-200 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold">
              S
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Sentinel</p>
              <p className="text-xs text-gray-500">Intelligence Platform</p>
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-8">
          <input
            type="text"
            placeholder="Search communities, incidents..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-6">
          <div className="text-sm">
            <p className="font-semibold text-gray-900">Nigeria</p>
            <p className="text-xs text-gray-500">Monitoring</p>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Wifi className="w-4 h-4 text-green-600" />
            <span className="text-green-600 font-semibold">Offline</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <AlertCircle className="w-4 h-4 text-blue-600" />
            <span className="text-blue-600 font-semibold">AI Ready</span>
          </div>

          <p className="text-sm text-gray-600">{new Date().toLocaleDateString()}</p>

          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
            <Bell className="w-5 h-5 text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
          </button>

          <button className="p-2 hover:bg-gray-100 rounded-lg transition">
            <Settings className="w-5 h-5 text-gray-700" />
          </button>

          <button className="p-2 hover:bg-gray-100 rounded-lg transition">
            <User className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  )
}
