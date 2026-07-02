import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapPin, Filter, Maximize2, Users, AlertTriangle } from 'lucide-react'

interface Community {
  id: string
  name: string
  state: string
  lat: number
  lng: number
  population: number
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  riskScore: number
  incidents: number
  lastUpdated: string
  recentIncidents: string[]
}

const mockCommunities: Community[] = [
  {
    id: '1',
    name: 'Mokwa',
    state: 'Niger',
    lat: 9.3075,
    lng: 5.3389,
    population: 45000,
    riskLevel: 'critical',
    riskScore: 92,
    incidents: 8,
    lastUpdated: '2 hours ago',
    recentIncidents: ['Flood warning', 'Heavy rainfall', 'Rising water levels']
  },
  {
    id: '2',
    name: 'Suleja',
    state: 'Niger',
    lat: 9.1667,
    lng: 7.1833,
    population: 65000,
    riskLevel: 'high',
    riskScore: 78,
    incidents: 6,
    lastUpdated: '1 hour ago',
    recentIncidents: ['Cholera cases', 'Water contamination', 'Health alert']
  },
  {
    id: '3',
    name: 'Nassarawa',
    state: 'Nasarawa',
    lat: 8.5667,
    lng: 7.7333,
    population: 28000,
    riskLevel: 'high',
    riskScore: 71,
    incidents: 4,
    lastUpdated: '3 hours ago',
    recentIncidents: ['Erosion risk', 'Deforestation', 'Environmental degradation']
  },
  {
    id: '4',
    name: 'Minna',
    state: 'Niger',
    lat: 9.6167,
    lng: 6.5833,
    population: 120000,
    riskLevel: 'medium',
    riskScore: 52,
    incidents: 3,
    lastUpdated: '4 hours ago',
    recentIncidents: ['Market incident', 'Minor flooding']
  },
  {
    id: '5',
    name: 'Ilorin',
    state: 'Kwara',
    lat: 8.4833,
    lng: 4.5667,
    population: 95000,
    riskLevel: 'medium',
    riskScore: 48,
    incidents: 2,
    lastUpdated: '5 hours ago',
    recentIncidents: ['Health screening', 'Community alert']
  },
  {
    id: '6',
    name: 'Abuja',
    state: 'FCT',
    lat: 9.0765,
    lng: 7.3986,
    population: 2900000,
    riskLevel: 'low',
    riskScore: 28,
    incidents: 1,
    lastUpdated: '6 hours ago',
    recentIncidents: ['Routine monitoring']
  },
  {
    id: '7',
    name: 'Kaduna',
    state: 'Kaduna',
    lat: 10.5211,
    lng: 7.4383,
    population: 815000,
    riskLevel: 'low',
    riskScore: 35,
    incidents: 2,
    lastUpdated: '2 hours ago',
    recentIncidents: ['Security patrol', 'Community check']
  },
  {
    id: '8',
    name: 'Jos',
    state: 'Plateau',
    lat: 9.9241,
    lng: 8.8911,
    population: 510000,
    riskLevel: 'medium',
    riskScore: 55,
    incidents: 4,
    lastUpdated: '1 hour ago',
    recentIncidents: ['Environmental concern', 'Disease surveillance']
  }
]

const getRiskColor = (riskLevel: string): string => {
  switch (riskLevel) {
    case 'critical':
      return '#dc2626'
    case 'high':
      return '#ea580c'
    case 'medium':
      return '#eab308'
    case 'low':
      return '#16a34a'
    default:
      return '#64748b'
  }
}

const getRiskLabel = (riskLevel: string): string => {
  return riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)
}

export default function InteractiveMap() {
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const markersRef = useRef<{ [key: string]: L.Marker }>({})
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null)
  const [filterRisk, setFilterRisk] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all')
  const [mapLoaded, setMapLoaded] = useState(false)

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current) return

    // Create map centered on Nigeria
    const map = L.map(mapContainerRef.current).setView([9.0765, 7.3986], 6)

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map)

    mapRef.current = map
    setMapLoaded(true)

    return () => {
      map.remove()
    }
  }, [])

  // Add markers to map
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) => marker.remove())
    markersRef.current = {}

    // Filter communities
    const filteredCommunities = filterRisk === 'all'
      ? mockCommunities
      : mockCommunities.filter((c) => c.riskLevel === filterRisk)

    // Add new markers
    filteredCommunities.forEach((community) => {
      const riskColor = getRiskColor(community.riskLevel)

      // Create custom icon
      const icon = L.divIcon({
        html: `
          <div style="
            background-color: ${riskColor};
            border: 3px solid white;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            cursor: pointer;
            transition: transform 0.2s;
          "
            onmouseover="this.style.transform='scale(1.2)'"
            onmouseout="this.style.transform='scale(1)'"
          >
            ${community.riskScore}
          </div>
        `,
        iconSize: [40, 40],
        className: 'risk-marker',
      })

      const marker = L.marker([community.lat, community.lng], { icon }).addTo(mapRef.current)

      // Bind popup
      marker.bindPopup(`
        <div style="min-width: 250px; font-family: system-ui, sans-serif;">
          <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold; color: #111;">${community.name}</h3>
          <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">${community.state} State</p>
          <p style="margin: 0 0 12px 0; font-size: 12px; color: #999;">Last updated: ${community.lastUpdated}</p>
          <div style="padding: 8px 0; border-top: 1px solid #eee; border-bottom: 1px solid #eee;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
              <span style="font-size: 12px; font-weight: 600; color: #333;">Risk Score</span>
              <span style="font-size: 12px; font-weight: bold; color: ${riskColor};">${community.riskScore}/100</span>
            </div>
            <div style="background-color: #e5e7eb; height: 6px; border-radius: 3px; overflow: hidden;">
              <div style="background-color: ${riskColor}; height: 100%; width: ${community.riskScore}%; border-radius: 3px;"></div>
            </div>
          </div>
          <div style="margin-top: 8px;">
            <div style="font-size: 12px; font-weight: 600; color: #333; margin-bottom: 4px;">Level: <span style="color: ${riskColor};">${getRiskLabel(community.riskLevel)}</span></div>
            <div style="font-size: 12px; color: #666; margin-bottom: 4px;">Population: ${(community.population / 1000).toFixed(0)}K</div>
            <div style="font-size: 12px; color: #666; margin-bottom: 8px;">Recent Incidents: ${community.incidents}</div>
            <div style="font-size: 11px; color: #666; line-height: 1.5;">${community.recentIncidents.map(i => `• ${i}`).join('<br>')}</div>
          </div>
          <button onclick="document.getElementById('view-details-${community.id}').click()" style="margin-top: 8px; padding: 6px 12px; background-color: #2563eb; color: white; border: none; border-radius: 4px; font-size: 12px; font-weight: 600; cursor: pointer; width: 100%;">View Details</button>
        </div>
      `)

      marker.on('click', () => {
        setSelectedCommunity(community)
      })

      markersRef.current[community.id] = marker
    })
  }, [mapLoaded, filterRisk])

  const filteredCommunities = filterRisk === 'all'
    ? mockCommunities
    : mockCommunities.filter((c) => c.riskLevel === filterRisk)

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Map Container */}
      <div className="flex-1 relative">
        <div ref={mapContainerRef} className="w-full h-full rounded-lg" />

        {/* Map Controls */}
        <div className="absolute top-6 right-6 space-y-3 z-10">
          <button
            onClick={() => mapRef.current?.setView([9.0765, 7.3986], 6)}
            className="bg-white border border-gray-300 rounded-lg p-3 hover:bg-gray-50 shadow-md transition"
            title="Fit to view"
          >
            <Maximize2 className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Filter Controls */}
        <div className="absolute top-6 left-6 z-10">
          <div className="bg-white rounded-lg shadow-md p-4 space-y-3 max-w-xs">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Risk Level Filter
            </h3>
            <div className="space-y-2">
              {[
                { value: 'all', label: 'All Communities', color: '#64748b' },
                { value: 'critical', label: 'Critical', color: '#dc2626' },
                { value: 'high', label: 'High', color: '#ea580c' },
                { value: 'medium', label: 'Medium', color: '#eab308' },
                { value: 'low', label: 'Low', color: '#16a34a' },
              ].map((option) => (
                <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="risk-filter"
                    value={option.value}
                    checked={filterRisk === option.value}
                    onChange={(e) => setFilterRisk(e.target.value as any)}
                    className="w-4 h-4"
                  />
                  <div className="flex items-center gap-2 flex-1">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: option.color }}
                    />
                    <span className="text-sm text-gray-700">{option.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Community Details */}
      <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
        {selectedCommunity ? (
          <>
            {/* Header */}
            <div className="border-b border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedCommunity.name}</h2>
                  <p className="text-sm text-gray-500 mt-1">{selectedCommunity.state} State</p>
                </div>
                <button
                  onClick={() => setSelectedCommunity(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Risk Status */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Risk Assessment
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Risk Level</span>
                    <span
                      className="px-3 py-1 rounded-full font-semibold text-sm text-white"
                      style={{ backgroundColor: getRiskColor(selectedCommunity.riskLevel) }}
                    >
                      {getRiskLabel(selectedCommunity.riskLevel)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600 text-sm">Risk Score</span>
                      <span className="font-bold text-gray-900">
                        {selectedCommunity.riskScore}/100
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full transition-all"
                        style={{
                          width: `${selectedCommunity.riskScore}%`,
                          backgroundColor: getRiskColor(selectedCommunity.riskLevel),
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Community Stats */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Community Information
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Population</span>
                    <span className="font-semibold text-gray-900">
                      {(selectedCommunity.population / 1000).toFixed(0)}K
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Recent Incidents</span>
                    <span className="font-semibold text-gray-900">{selectedCommunity.incidents}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Last Updated</span>
                    <span className="font-semibold text-gray-900">{selectedCommunity.lastUpdated}</span>
                  </div>
                </div>
              </div>

              {/* Recent Incidents */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Recent Incidents</h3>
                <div className="space-y-2">
                  {selectedCommunity.recentIncidents.map((incident, i) => (
                    <div key={i} className="flex items-start gap-2 p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-700">{incident}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="border-t border-gray-200 p-6 space-y-3">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                View Full Report
              </button>
              <button className="w-full px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold">
                Generate Alert
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <MapPin className="w-12 h-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Community Selected</h3>
            <p className="text-gray-500 text-sm">
              Click on a marker on the map to view detailed information about a community.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
