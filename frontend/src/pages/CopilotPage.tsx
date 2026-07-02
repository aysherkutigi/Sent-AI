import { useState, useRef, useEffect } from 'react'
import { Send, MessageCircle, Loader2, Copy, ThumbsUp, ThumbsDown } from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  metadata?: {
    riskScore?: number
    communities?: string[]
    recommendations?: string[]
    confidence?: number
  }
}

export default function CopilotChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m Sentinel, your AI-powered Community Intelligence Assistant. I can help you analyze risks, predict disasters, and protect your communities. What would you like to know?',
      timestamp: new Date(),
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const suggestedPrompts = [
    {
      icon: '🌍',
      title: 'Most Vulnerable',
      prompt: 'What communities are most vulnerable to floods?'
    },
    {
      icon: '📊',
      title: 'Today\'s Summary',
      prompt: 'Summarize today\'s incidents and risks.'
    },
    {
      icon: '⚠️',
      title: 'Disease Trends',
      prompt: 'Show disease outbreak trends for the last 7 days.'
    },
    {
      icon: '🚨',
      title: 'Predictions',
      prompt: 'Predict flood risk for Mokwa in the next 48 hours.'
    },
    {
      icon: '📋',
      title: 'Response Plan',
      prompt: 'Generate emergency response recommendations.'
    },
    {
      icon: '📈',
      title: 'Analytics',
      prompt: 'Show security incident trends by location.'
    }
  ]

  const handleSendMessage = async (text?: string) => {
    const messageText = text || input
    if (!messageText.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    // Simulate API call and response
    setTimeout(() => {
      let assistantResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: '',
        timestamp: new Date(),
        metadata: {}
      }

      // Generate contextual responses
      if (messageText.toLowerCase().includes('vulnerable') || messageText.toLowerCase().includes('most at risk')) {
        assistantResponse.content = `Based on current data analysis, the most vulnerable communities are:\n\n1. **Mokwa** - Flood Risk Score: 92/100\n   - Located in flood-prone area\n   - Population: 45,000\n   - Limited evacuation routes\n   - Recommendation: Increase monitoring and prepare evacuation procedures\n\n2. **Suleja** - Disease Risk Score: 78/100\n   - Recent cholera outbreak detected\n   - Population density: High\n   - Healthcare facilities: Limited\n   - Recommendation: Deploy medical teams and increase surveillance\n\n3. **Nassarawa** - Environmental Risk Score: 71/100\n   - Deforestation increasing erosion risk\n   - Water contamination detected\n   - Population: 28,000\n   - Recommendation: Environmental remediation and water testing`
        assistantResponse.metadata = {
          communities: ['Mokwa', 'Suleja', 'Nassarawa'],
          riskScore: 80,
          confidence: 89
        }
      } else if (messageText.toLowerCase().includes('today') || messageText.toLowerCase().includes('incident') || messageText.toLowerCase().includes('summary')) {
        assistantResponse.content = `📊 **Today's Incident Summary (July 2, 2026)**\n\n**Total Incidents**: 12\n- Flood Reports: 5\n- Disease Cases: 4\n- Security Alerts: 2\n- Environmental: 1\n\n**Critical Alerts**: 2\n- Mokwa: Flood warning (CRITICAL)\n- Suleja: Disease outbreak (HIGH)\n\n**Communities Affected**: 8\n\n**Key Metrics**:\n- Average Risk Score: 68/100\n- Overall Trend: ↑ (Increasing)\n- Confidence Level: 87%\n\n**Recommended Actions**:\n1. Deploy emergency teams to Mokwa\n2. Increase health surveillance in Suleja\n3. Monitor weather patterns for next 48 hours\n4. Prepare contingency plans for neighboring communities`
        assistantResponse.metadata = {
          riskScore: 68,
          confidence: 87
        }
      } else if (messageText.toLowerCase().includes('disease') || messageText.toLowerCase().includes('health') || messageText.toLowerCase().includes('outbreak')) {
        assistantResponse.content = `📈 **Disease Outbreak Trends (Last 7 Days)**\n\n**Cholera Cases**:\n- Day 1-3: 2 cases\n- Day 4-6: 5 cases ↑\n- Day 7: 3 cases\n- Trend: Increasing then stabilizing\n\n**Malaria Cases**:\n- Consistent: 8-10 cases/day\n- Trend: Stable\n\n**Locations Most Affected**:\n1. Suleja: 6 cases\n2. Abuja: 3 cases\n3. Minna: 2 cases\n\n**Risk Assessment**: MEDIUM-HIGH\n\n**Recommendations**:\n- Increase water treatment in affected areas\n- Deploy mobile health clinics\n- Conduct public health awareness campaigns\n- Monitor neighboring communities for spread`
        assistantResponse.metadata = {
          recommendations: ['Water treatment', 'Mobile clinics', 'Health awareness'],
          confidence: 82
        }
      } else if (messageText.toLowerCase().includes('predict') || messageText.toLowerCase().includes('flood') || messageText.toLowerCase().includes('mokwa')) {
        assistantResponse.content = `🌊 **Flood Risk Prediction for Mokwa (Next 48 Hours)**\n\n**Current Status**: CRITICAL ⚠️\n**Risk Score**: 92/100\n**Confidence**: 94%\n\n**Rainfall Forecast**:\n- Next 6 hours: Heavy rainfall (40-50mm)\n- Next 12 hours: Moderate rainfall (20-30mm)\n- Next 48 hours: Total expected: 80-100mm\n\n**River Level Forecast**:\n- Current: 2.4m (Above normal)\n- Expected peak: 3.1m (Critical level)\n- Time to peak: 36 hours\n\n**Impact Assessment**:\n- Affected population: ~15,000\n- Expected flood area: 45 sq km\n- Severity: Very High\n\n**Urgent Recommendations**:\n1. ⚠️ Issue immediate flood warning\n2. 🚑 Prepare evacuation routes\n3. 📱 Send SMS alerts to residents\n4. 🏥 Pre-position emergency supplies\n5. 👥 Activate emergency response center`
        assistantResponse.metadata = {
          riskScore: 92,
          communities: ['Mokwa'],
          recommendations: ['Issue warnings', 'Evacuate', 'Deploy resources'],
          confidence: 94
        }
      } else if (messageText.toLowerCase().includes('recommend') || messageText.toLowerCase().includes('response') || messageText.toLowerCase().includes('action')) {
        assistantResponse.content = `📋 **Emergency Response Recommendations**\n\n**Immediate Actions (0-6 hours)**:\n✓ Activate Emergency Operations Center\n✓ Alert all relevant agencies\n✓ Pre-position emergency resources\n✓ Issue public warnings\n\n**Short-term (6-24 hours)**:\n✓ Deploy medical teams to high-risk areas\n✓ Establish coordination centers\n✓ Begin community evacuation if needed\n✓ Monitor situation updates\n\n**Resource Requirements**:\n- Personnel: 150 responders\n- Vehicles: 25\n- Medical supplies: Full kits for 5,000 people\n- Shelter capacity: 10,000\n\n**Responsible Agencies**:\n1. National Emergency Management Agency (NEMA)\n2. State Emergency Management Authority\n3. Health Ministry\n4. Security Forces\n\n**Estimated Response Time**: 4-6 hours\n**Success Probability**: 87%`
        assistantResponse.metadata = {
          recommendations: ['Activate EOC', 'Deploy teams', 'Issue warnings'],
          confidence: 85
        }
      } else {
        assistantResponse.content = `I'm here to help with community risk intelligence. I can assist you with:\n\n📊 **Data Analysis**\n- Analyze community incidents and trends\n- Generate risk assessments\n- Compare risk metrics across regions\n\n🚨 **Risk Predictions**\n- Predict flood, disease, and security risks\n- Forecast threat levels\n- Identify vulnerable communities\n\n📋 **Response Planning**\n- Generate emergency recommendations\n- Create action plans\n- Resource allocation\n\n📈 **Analytics & Reporting**\n- Generate detailed reports\n- Visualize trends\n- Historical comparisons\n\nWhat would you like to explore?`
      }

      setMessages((prev) => [...prev, assistantResponse])
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Sentinel AI Copilot</h1>
            <p className="text-sm text-gray-500">Community Risk Intelligence Assistant</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 1 && !loading && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-8 max-w-2xl">
              <div className="space-y-2">
                <MessageCircle className="w-16 h-16 text-blue-400 mx-auto" />
                <h2 className="text-3xl font-bold text-gray-900">Welcome to Sentinel</h2>
                <p className="text-gray-600">Ask me anything about community risks, disasters, and emergency response</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {suggestedPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(prompt.prompt)}
                    className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition text-left space-y-2 group"
                  >
                    <div className="text-2xl">{prompt.icon}</div>
                    <p className="font-semibold text-gray-900 group-hover:text-blue-600">{prompt.title}</p>
                    <p className="text-sm text-gray-500">{prompt.prompt}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-2xl px-6 py-4 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-white border border-gray-200 text-gray-900 rounded-bl-none shadow-sm'
              }`}
            >
              <div className="whitespace-pre-wrap text-base leading-relaxed">{message.content}</div>

              {/* Metadata Display */}
              {message.metadata && message.type === 'assistant' && (
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-3 text-sm">
                  {message.metadata.riskScore && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Risk Score</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              message.metadata.riskScore >= 70
                                ? 'bg-red-500'
                                : message.metadata.riskScore >= 50
                                ? 'bg-orange-500'
                                : 'bg-green-500'
                            }`}
                            style={{ width: `${message.metadata.riskScore}%` }}
                          />
                        </div>
                        <span className="font-semibold text-gray-900">{message.metadata.riskScore}/100</span>
                      </div>
                    </div>
                  )}
                  {message.metadata.confidence && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Confidence</span>
                      <span className="font-semibold text-gray-900">{message.metadata.confidence}%</span>
                    </div>
                  )}
                  {message.metadata.communities && (
                    <div>
                      <span className="text-gray-600 block mb-1">Affected Communities</span>
                      <div className="flex flex-wrap gap-1">
                        {message.metadata.communities.map((community) => (
                          <span key={community} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                            {community}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {message.metadata.recommendations && (
                    <div>
                      <span className="text-gray-600 block mb-1">Key Recommendations</span>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {message.metadata.recommendations.map((rec) => (
                          <li key={rec}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Message Actions */}
              {message.type === 'assistant' && (
                <div className="mt-4 flex gap-2 pt-3 border-t border-gray-200">
                  <button className="p-2 hover:bg-gray-100 rounded transition" title="Copy">
                    <Copy className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded transition" title="Helpful">
                    <ThumbsUp className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded transition" title="Not helpful">
                    <ThumbsDown className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-lg rounded-bl-none shadow-sm px-6 py-4 flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
              <span className="text-gray-600">Sentinel is thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-6">
        <div className="container mx-auto max-w-4xl">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about risks, predictions, or recommendations..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={loading || !input.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
              Send
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">Sentinel AI runs entirely offline. All data stays on your device.</p>
        </div>
      </div>
    </div>
  )
}
