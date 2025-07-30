# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BizKuKu is a comprehensive digital platform for Malaysian Micro, Small, and Medium Enterprises (MSMEs), providing one-stop onboarding and business management tools. The project uses a Next.js frontend with a FastAPI backend.

## Development Commands

### Frontend (Next.js)
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

### Backend (FastAPI)
```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Run development server with auto-reload
uvicorn main:app --reload
```

The frontend runs on http://localhost:3000 and the backend on http://localhost:8000.

## Architecture Overview

### Frontend Structure
- **Next.js 15.4.1** with App Router pattern
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **Key Dependencies**:
  - `recharts` for data visualization
  - `framer-motion` for animations
  - `react-markdown` for rendering markdown content
  - `axios` for API calls

### Backend Structure
- **FastAPI** framework
- **Google GenAI** integration for AI-powered features
- API endpoints organized under `src/api/`
- Services layer under `src/services/`
- Models defined in `src/models/`

### Key Application Routes
- `/` - Landing page
- `/onboarding` - Multi-step onboarding flow
- `/dashboard` - Main business dashboard
- `/financial-report` - Financial analytics
- `/open-finance` - Banking integrations
- `/recommendation` - AI-powered business recommendations
- `/application-status` - Application tracking
- `/services/grants`, `/services/loans`, `/services/subsidy` - Funding opportunities

### Component Organization
- `src/components/charts/` - Reusable chart components
- `src/components/chatbot/` - AI chatbot interface
- `src/components/dashboard/` - Dashboard-specific components
- `src/components/layout/` - Header, Footer components
- `src/components/onboarding/` - Onboarding flow components
- `src/components/ui/` - Reusable UI components

### State Management
- Context API for language switching (`LanguageContext`)
- Local storage for onboarding data persistence (`onboarding-storage.ts`)

### API Integration
- Frontend API calls defined in `src/api/`
- CORS configured for localhost:3000 in backend
- Chatbot endpoint at `/api/chat`

## Important Considerations

1. **Language Support**: The application supports both English and Bahasa Malaysia through the LanguageContext
2. **Target Audience**: Designed for users with low digital literacy - keep UI/UX simple and intuitive
3. **API Structure**: All backend routes are prefixed with `/api`
4. **Type Safety**: Use TypeScript interfaces defined in `src/lib/types/`
5. **Path Aliases**: Use `@/` for imports from the `src/` directory