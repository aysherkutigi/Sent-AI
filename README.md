# Sentinel Africa AI

**Offline Community Risk Intelligence Copilot for Africa**

An offline-first AI-powered desktop application that helps African communities detect, analyze, and respond to floods, disease outbreaks, environmental hazards, and community security threats.

## Vision

Sentinel Africa AI is designed to operate **100% offline** using local AI models and a local SQLite database. It combines the intelligence of Microsoft Copilot, ArcGIS, WHO Dashboard, and Emergency Operations Centers—simplified for low-resource environments.

### Target Users
- Local Governments
- Disaster Management Agencies
- Healthcare Workers
- NGOs
- Community Leaders
- Security Agencies
- Humanitarian Organizations

## Key Features

✅ **AI-Powered Dashboard** - Real-time risk intelligence summaries  
✅ **Interactive Risk Map** - Geospatial visualization of community threats  
✅ **AI Copilot (Sentinel)** - Conversational assistant for risk analysis  
✅ **Community Reports** - Professional incident submission and analysis  
✅ **Early Warning System** - Automated alerts and recommendations  
✅ **Analytics Hub** - Comprehensive trend analysis and reporting  
✅ **Multilingual Support** - English, Hausa, Yoruba, Igbo, French, Swahili  
✅ **100% Offline** - No internet required, SQLite + local AI models  
✅ **Government-Grade UI** - Professional, trustworthy, and accessible  

## Tech Stack

### Frontend
- **Framework**: React 18+ with TypeScript
- **Desktop**: Electron for cross-platform desktop support
- **Styling**: Tailwind CSS + shadcn/ui (Material Design 3)
- **State**: Zustand or Redux
- **Maps**: Leaflet.js for interactive risk mapping
- **Charts**: Chart.js or Recharts for analytics

### Backend
- **Language**: Python 3.10+
- **Framework**: FastAPI or Flask
- **Database**: SQLite with proper indexing
- **AI/LLM**: Ollama or LM Studio (local models)
- **Task Queue**: Celery (optional, for background tasks)

### Infrastructure
- **DevOps**: GitHub Actions for CI/CD
- **Testing**: Jest (frontend), Pytest (backend)
- **Packaging**: Electron Builder, PyInstaller

## Project Structure

```
Sent-AI/
├── frontend/                 # React + Electron app
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page views (Dashboard, Copilot, etc.)
│   │   ├── services/         # API client services
│   │   ├── hooks/            # Custom React hooks
│   │   ├── store/            # State management
│   │   ├── styles/           # Global styles & themes
│   │   ├── utils/            # Helper functions
│   │   └── App.tsx
│   ├── public/               # Static assets
│   ├── package.json
│   └── tsconfig.json
├── backend/                  # Python backend
│   ├── app/
│   │   ├── main.py           # FastAPI app entry
│   │   ├── models/           # SQLAlchemy/Pydantic models
│   │   ├── routes/           # API endpoints
│   │   ├── services/         # Business logic
│   │   ├── database/         # DB config & migrations
│   │   └── ai/               # AI/LLM integration
│   ├── tests/                # Test suite
│   ├── requirements.txt      # Python dependencies
│   └── config.py             # Configuration
├── database/                 # Database schemas
│   ├── migrations/           # Schema versioning
│   └── seed_data/            # Initial data
├── docs/                     # Documentation
│   ├── ARCHITECTURE.md       # System design
│   ├── API.md                # API documentation
│   ├── DATABASE.md           # Database schema
│   └── SETUP.md              # Development setup guide
├── .github/workflows/        # CI/CD pipelines
├── .gitignore
├── LICENSE
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- SQLite 3.x
- Ollama or LM Studio (for local AI models)

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/aysherkutigi/Sent-AI.git
   cd Sent-AI
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python app/main.py
   ```

## Core Features Roadmap

### Phase 1: Foundation
- [ ] Landing page & authentication
- [ ] Main dashboard layout
- [ ] SQLite database setup
- [ ] Basic API endpoints

### Phase 2: Intelligence
- [ ] AI Copilot (Sentinel) chatbot
- [ ] Risk analysis engine
- [ ] Community report submission
- [ ] Risk scoring algorithm

### Phase 3: Visualization
- [ ] Interactive Nigeria risk map
- [ ] Analytics dashboard
- [ ] Real-time incident tracking
- [ ] Historical timeline view

### Phase 4: Operations
- [ ] Early warning system
- [ ] Report generation (PDF/Excel)
- [ ] Multilingual support
- [ ] SMS/Voice alert integration

### Phase 5: Polish
- [ ] Performance optimization
- [ ] Mobile responsiveness (tablets)
- [ ] Offline sync mechanisms
- [ ] User testing & refinement

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT License - See [LICENSE](LICENSE) for details.

## Support

For questions or issues, please open a GitHub issue or contact the development team.

---

**Built for African communities. Powered by AI that works offline. 🌍**
