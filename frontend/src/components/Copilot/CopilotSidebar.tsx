import { MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function CopilotSidebar() {
  const navigate = useNavigate()

  const recentChats = [
    { id: 1, title: 'Mokwa Flood Risk Analysis', date: 'Today' },
    { id: 2, title: 'Disease Surveillance Report', date: 'Yesterday' },
    { id: 3, title: 'Emergency Response Plan', date: '2 days ago' },
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* New Chat */}
      <div className="p-4 border-b border-gray-200">
        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2">
          <MessageCircle className="w-5 h-5" />
          New Chat
        </button>
      </div>

      {/* Recent Chats */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2">Recent</p>
        {recentChats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => navigate(`/copilot/${chat.id}`)}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition group"
          >
            <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 truncate">
              {chat.title}
            </p>
            <p className="text-xs text-gray-500 mt-1">{chat.date}</p>
          </button>
        ))}
      </div>

      {/* Settings */}
      <div className="border-t border-gray-200 p-4 space-y-2">
        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition">
          Settings
        </button>
        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition">
          Clear History
        </button>
      </div>
    </div>
  )
}
