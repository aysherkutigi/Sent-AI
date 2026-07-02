import { useState } from 'react'
import CopilotChat from '../components/Copilot/CopilotChat'
import CopilotSidebar from '../components/Copilot/CopilotSidebar'

export default function CopilotLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <CopilotSidebar />
      <div className="flex-1 flex flex-col">
        <CopilotChat />
      </div>
    </div>
  )
}
