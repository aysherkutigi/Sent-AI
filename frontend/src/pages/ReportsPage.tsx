import { useState } from 'react'
import { AlertCircle, Camera, MapPin, Clock, User, Phone, MessageSquare, Send, CheckCircle } from 'lucide-react'

interface FormData {
  incidentType: string
  severity: string
  community: string
  latitude: string
  longitude: string
  description: string
  reporterName: string
  reporterPhone: string
  reporterEmail: string
  photos: File[]
  timestamp: string
}

interface SubmissionResponse {
  success: boolean
  message: string
  incidentId?: string
  riskScore?: number
  recommendations?: string[]
}

export default function CommunityReportsForm() {
  const [step, setStep] = useState<'form' | 'preview' | 'success'>('form')
  const [formData, setFormData] = useState<FormData>({
    incidentType: '',
    severity: '',
    community: '',
    latitude: '',
    longitude: '',
    description: '',
    reporterName: '',
    reporterPhone: '',
    reporterEmail: '',
    photos: [],
    timestamp: new Date().toISOString(),
  })
  const [submissionResponse, setSubmissionResponse] = useState<SubmissionResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const incidentTypes = [
    { value: 'flood', label: '🌊 Flood/Water Emergency', color: 'bg-blue-100 border-blue-300' },
    { value: 'disease', label: '🏥 Disease Outbreak', color: 'bg-red-100 border-red-300' },
    { value: 'security', label: '🛡️ Security Threat', color: 'bg-orange-100 border-orange-300' },
    { value: 'environmental', label: '🌱 Environmental Hazard', color: 'bg-green-100 border-green-300' },
    { value: 'other', label: '⚠️ Other Emergency', color: 'bg-gray-100 border-gray-300' },
  ]

  const severityLevels = [
    { value: 'low', label: 'Low', color: 'bg-green-500' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
    { value: 'high', label: 'High', color: 'bg-orange-500' },
    { value: 'critical', label: 'Critical', color: 'bg-red-500' },
  ]

  const nigerianCommunities = [
    'Abuja', 'Lagos', 'Kano', 'Ibadan', 'Kaduna',
    'Port Harcourt', 'Katsina', 'Gusau', 'Sokoto', 'Maiduguri',
    'Jos', 'Ilorin', 'Minna', 'Mokwa', 'Suleja',
    'Nassarawa', 'Lokoja', 'Abeokuta', 'Akure', 'Oshogbo',
  ]

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.incidentType) newErrors.incidentType = 'Incident type is required'
    if (!formData.severity) newErrors.severity = 'Severity level is required'
    if (!formData.community) newErrors.community = 'Community is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.reporterName.trim()) newErrors.reporterName = 'Name is required'
    if (!formData.reporterPhone.trim()) newErrors.reporterPhone = 'Phone is required'

    if (formData.latitude && isNaN(parseFloat(formData.latitude))) {
      newErrors.latitude = 'Invalid latitude'
    }
    if (formData.longitude && isNaN(parseFloat(formData.longitude))) {
      newErrors.longitude = 'Invalid longitude'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files)
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...newPhotos].slice(0, 5) // Max 5 photos
      }))
    }
  }

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }))
  }

  const handlePreview = () => {
    if (validateForm()) {
      setStep('preview')
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Mock AI analysis response
    const mockResponse: SubmissionResponse = {
      success: true,
      message: 'Incident report submitted successfully',
      incidentId: `INC-${Date.now()}`,
      riskScore: Math.floor(Math.random() * 100),
      recommendations: [
        'Deploy emergency response team to the area',
        'Initiate community alert system',
        'Coordinate with local authorities',
        'Establish coordination center',
      ]
    }

    setSubmissionResponse(mockResponse)
    setStep('success')
    setLoading(false)
  }

  const handleReset = () => {
    setStep('form')
    setFormData({
      incidentType: '',
      severity: '',
      community: '',
      latitude: '',
      longitude: '',
      description: '',
      reporterName: '',
      reporterPhone: '',
      reporterEmail: '',
      photos: [],
      timestamp: new Date().toISOString(),
    })
    setSubmissionResponse(null)
    setErrors({})
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <AlertCircle className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Community Incident Report</h1>
          </div>
          <p className="text-gray-600 text-lg">Report emergencies and threats in your community for immediate analysis</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12 flex justify-center gap-4">
          {['form', 'preview', 'success'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step === s
                    ? 'bg-blue-600 text-white'
                    : ['form', 'preview'].includes(s) && step === 'success'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {['form', 'preview'].includes(s) && step === 'success' ? '✓' : i + 1}
              </div>
              <span className="text-sm font-semibold text-gray-700">
                {s === 'form' ? 'Incident Details' : s === 'preview' ? 'Review' : 'Submitted'}
              </span>
              {i < 2 && <div className="w-8 h-0.5 bg-gray-300" />}
            </div>
          ))}
        </div>

        {/* Form Step */}
        {step === 'form' && (
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            {/* Incident Type */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-gray-900">Type of Incident *</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {incidentTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setFormData(prev => ({ ...prev, incidentType: type.value }))}
                    className={`p-4 rounded-lg border-2 transition font-semibold text-left ${
                      formData.incidentType === type.value
                        ? `${type.color} border-current bg-opacity-20 ring-2 ring-blue-600`
                        : `${type.color} border-current bg-opacity-10 hover:bg-opacity-20`
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
              {errors.incidentType && (
                <p className="text-red-600 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {errors.incidentType}
                </p>
              )}
            </div>

            {/* Severity Level */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-gray-900">Severity Level *</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {severityLevels.map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setFormData(prev => ({ ...prev, severity: level.value }))}
                    className={`p-4 rounded-lg font-bold text-white transition ${
                      formData.severity === level.value
                        ? `${level.color} ring-2 ring-offset-2 ring-gray-600 scale-105`
                        : `${level.color} opacity-60 hover:opacity-100`
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
              {errors.severity && (
                <p className="text-red-600 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {errors.severity}
                </p>
              )}
            </div>

            {/* Location Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Community/Location *
                </label>
                <select
                  name="community"
                  value={formData.community}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select a community...</option>
                  {nigerianCommunities.map((community) => (
                    <option key={community} value={community}>
                      {community}
                    </option>
                  ))}
                </select>
                {errors.community && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.community}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Time of Incident
                </label>
                <input
                  type="datetime-local"
                  name="timestamp"
                  value={formData.timestamp.slice(0, 16)}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Coordinates */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Latitude</label>
                <input
                  type="text"
                  name="latitude"
                  placeholder="e.g., 9.0765"
                  value={formData.latitude}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                {errors.latitude && (
                  <p className="text-red-600 text-sm mt-1">{errors.latitude}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Longitude</label>
                <input
                  type="text"
                  name="longitude"
                  placeholder="e.g., 7.3986"
                  value={formData.longitude}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                {errors.longitude && (
                  <p className="text-red-600 text-sm mt-1">{errors.longitude}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Incident Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Provide detailed information about the incident. Include affected areas, number of people involved, immediate threats, etc."
                rows={5}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
              />
              <p className="text-xs text-gray-500 mt-2">{formData.description.length}/500 characters</p>
              {errors.description && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {errors.description}
                </p>
              )}
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Camera className="w-4 h-4" />
                Upload Photos (max 5)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition">
                <input
                  type="file"
                  id="photo-upload"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-700">Click to upload photos</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                </label>
              </div>
              {formData.photos.length > 0 && (
                <div className="mt-4 grid grid-cols-3 md:grid-cols-5 gap-3">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Preview ${index}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removePhoto(index)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Reporter Information */}
            <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4" />
                Reporter Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="reporterName"
                    value={formData.reporterName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  {errors.reporterName && (
                    <p className="text-red-600 text-sm mt-1">{errors.reporterName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="reporterPhone"
                    value={formData.reporterPhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  {errors.reporterPhone && (
                    <p className="text-red-600 text-sm mt-1">{errors.reporterPhone}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Email (Optional)</label>
                <input
                  type="email"
                  name="reporterEmail"
                  value={formData.reporterEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                onClick={handlePreview}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Review Report
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Preview Step */}
        {step === 'preview' && (
          <div className="space-y-6">
            {/* Report Summary */}
            <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Review Your Report</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Incident Type</p>
                  <p className="text-lg font-semibold text-gray-900 mt-1">
                    {incidentTypes.find(t => t.value === formData.incidentType)?.label}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Severity</p>
                  <div className="mt-1">
                    <span
                      className={`px-4 py-2 rounded-lg text-white font-bold ${
                        severityLevels.find(s => s.value === formData.severity)?.color
                      }`}
                    >
                      {severityLevels.find(s => s.value === formData.severity)?.label}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Community</p>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{formData.community}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Time</p>
                  <p className="text-lg font-semibold text-gray-900 mt-1">
                    {new Date(formData.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Description</p>
                <p className="text-gray-700 leading-relaxed">{formData.description}</p>
              </div>

              {formData.photos.length > 0 && (
                <div className="border-t border-gray-200 pt-6">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Attached Photos</p>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {formData.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(photo)}
                        alt={`Preview ${index}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t border-gray-200 pt-6 space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Reporter Information</p>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                  <div><span className="font-semibold">Name:</span> {formData.reporterName}</div>
                  <div><span className="font-semibold">Phone:</span> {formData.reporterPhone}</div>
                  {formData.reporterEmail && (
                    <div className="col-span-2"><span className="font-semibold">Email:</span> {formData.reporterEmail}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Submit Report
                  </>
                )}
              </button>
              <button
                onClick={() => setStep('form')}
                disabled={loading}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition disabled:opacity-50"
              >
                Edit
              </button>
            </div>
          </div>
        )}

        {/* Success Step */}
        {step === 'success' && submissionResponse && (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-gray-900">Report Submitted!</h2>
              <p className="text-lg text-gray-600">{submissionResponse.message}</p>
            </div>

            {submissionResponse.incidentId && (
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
                <p className="text-sm text-gray-600">Incident ID</p>
                <p className="text-2xl font-bold text-blue-600 font-mono">{submissionResponse.incidentId}</p>
              </div>
            )}

            {submissionResponse.riskScore !== undefined && (
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <h3 className="font-bold text-gray-900">AI Analysis Results</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Risk Score</span>
                    <span className="text-2xl font-bold text-blue-600">{submissionResponse.riskScore}/100</span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all"
                      style={{ width: `${submissionResponse.riskScore}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {submissionResponse.recommendations && submissionResponse.recommendations.length > 0 && (
              <div className="bg-blue-50 rounded-lg p-6 text-left space-y-3">
                <h3 className="font-bold text-gray-900">AI Recommendations</h3>
                <ul className="space-y-2">
                  {submissionResponse.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <span className="text-blue-600 font-bold flex-shrink-0 mt-0.5">{i + 1}.</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-4 pt-6">
              <button
                onClick={handleReset}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Submit Another Report
              </button>
              <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition">
                View Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
