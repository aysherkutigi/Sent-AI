import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import CopilotLayout from './components/Copilot/CopilotLayout'
import RiskMapPage from './pages/RiskMapPage'
import ReportsPage from './pages/ReportsPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/copilot" element={<CopilotLayout />} />
        <Route path="/map" element={<RiskMapPage />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Routes>
    </Router>
  )
}

export default App
