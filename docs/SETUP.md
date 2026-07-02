# Sentinel Africa AI - Development Setup

## Prerequisites

- Node.js 18+
- Python 3.10+
- SQLite 3.x
- Git
- Optional: Ollama or LM Studio for local LLM

## Frontend Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 3. Build for Production

```bash
npm run build
```

## Backend Setup

### 1. Create Virtual Environment

```bash
cd backend
python -m venv venv
```

### 2. Activate Virtual Environment

**On Linux/Mac:**
```bash
source venv/bin/activate
```

**On Windows:**
```bash
venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Initialize Database

```bash
python -m alembic upgrade head
```

### 5. Start Backend Server

```bash
python app/main.py
```

API will be available at `http://localhost:8000`

## Local LLM Setup (Optional)

### Using Ollama

1. Download and install [Ollama](https://ollama.ai)
2. Pull a model:
   ```bash
   ollama pull mistral
   ```
3. Start Ollama:
   ```bash
   ollama serve
   ```

### Using LM Studio

1. Download [LM Studio](https://lmstudio.ai/)
2. Load a model in the interface
3. Start the local server

## Running the Full Stack

### Option 1: Two Terminal Windows

**Terminal 1 - Frontend:**
```bash
cd frontend
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd backend
source venv/bin/activate
python app/main.py
```

### Option 2: Using Concurrently

```bash
# From project root
npm run dev:full
```

## Testing

### Frontend Tests
```bash
cd frontend
npm run test
```

### Backend Tests
```bash
cd backend
pytest
```

## Troubleshooting

**Port Already in Use:**
- Frontend (5173): Change in `vite.config.ts`
- Backend (8000): Change in `app/main.py`

**Python Virtual Environment Issues:**
- Delete `venv/` and recreate it
- Ensure Python 3.10+ is installed

**Node Modules Issues:**
- Delete `node_modules/` and `package-lock.json`
- Run `npm install` again

---

For more info, see [ARCHITECTURE.md](./ARCHITECTURE.md)
