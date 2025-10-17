# 🦷 DRS AI - AI-Powered Dental Scan Analysis

A modern web application that uses AI to analyze dental scans and provide comprehensive diagnosis with forever shareable results.

## Features

- 🤖 **AI-Powered Analysis**: Uses OpenRouter (Claude 3.5 Sonnet) to analyze dental scans
- 📸 **Multiple Format Support**: Upload dental X-rays, photos, or PDF files
- 🦷 **Tooth-by-Tooth Analysis**: Complete dental chart with Universal Numbering System
- 📊 **Comprehensive Reports**: Brief and full detailed analysis results
- 🔗 **Forever Shareable**: Permanent links that never expire
- 📱 **Responsive Design**: Beautiful UI that works on all devices
- 🔒 **Privacy Focused**: Client-side processing with secure API calls

## User Journey

1. **Upload Page**: User uploads dental scan and provides initial diagnosis
2. **Processing Page**: AI analyzes the scan (15-30 seconds)
3. **Brief Results Page**: 
   - Shows the scan
   - AI diagnosis and confidence score
   - Comparison with initial diagnosis (what's right/wrong)
   - Shareable link generation
4. **Full Results Page**: 
   - Complete tooth-by-tooth analysis
   - Interactive dental chart (32 teeth)
   - Detailed findings and recommendations
   - Technical details

## Tech Stack

- **Framework**: Astro 5.0 (SSR mode)
- **Styling**: Tailwind CSS
- **AI**: OpenRouter API (configurable models - Claude, GPT, Gemini, etc.)
- **Deployment**: Node.js adapter for server-side rendering

## Setup

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

\`\`\`env
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Optional: Choose a custom model (defaults to claude-3.5-sonnet)
# OPENROUTER_MODEL=anthropic/claude-3.5-sonnet
\`\`\`

Get your OpenRouter API key from [OpenRouter.ai](https://openrouter.ai)

**Want to use a different AI model?** See [MODEL_CONFIGURATION.md](./MODEL_CONFIGURATION.md) for all options.

### 3. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:4321` to see the app in action.

### 4. Build for Production

\`\`\`bash
npm run build
npm run preview
\`\`\`

## Project Structure

\`\`\`
/
├── src/
│   ├── components/
│   │   └── TeethChart.astro       # Interactive dental chart component
│   ├── layouts/
│   │   └── Layout.astro           # Main layout with nav and footer
│   ├── pages/
│   │   ├── api/
│   │   │   └── analyze.ts         # OpenRouter API endpoint
│   │   ├── results/
│   │   │   ├── [id].astro         # Brief results page
│   │   │   └── [id]/
│   │   │       └── full.astro     # Full results with teeth chart
│   │   ├── index.astro            # Upload page
│   │   └── processing.astro       # Processing/loading page
│   └── types/
│       └── dental.ts              # TypeScript interfaces
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
\`\`\`

## Pages Overview

### 1. Upload Page (`/`)
- File upload with drag & drop support
- Initial diagnosis text area
- Supports images (PNG, JPG, JPEG) and PDFs
- Real-time file preview

### 2. Processing Page (`/processing`)
- Animated loading states
- Step-by-step progress indicator
- Calls the `/api/analyze` endpoint
- Automatic redirect to results

### 3. Brief Results Page (`/results/[id]`)
- Shows the uploaded scan
- Overall assessment and confidence score
- Comparison with initial diagnosis
- Key findings with severity levels
- Shareable link with copy functionality
- Quick recommendations

### 4. Full Results Page (`/results/[id]/full`)
- Complete tooth-by-tooth analysis
- Interactive dental chart (32 teeth)
- Detailed findings breakdown
- All recommendations
- Technical details
- Print and download options

## API Endpoint

### POST `/api/analyze`

Analyzes a dental scan using OpenRouter's Claude 3.5 Sonnet.

**Request:**
- `file`: Image or PDF file
- `initialDiagnosis`: User's initial diagnosis text

**Response:**
\`\`\`json
{
  "id": "unique-analysis-id",
  "diagnosis": {
    "overallAssessment": "string",
    "confidenceScore": 95,
    "findings": [...],
    "comparisonWithInitialDiagnosis": {
      "correct": [...],
      "incorrect": [...],
      "additional": [...]
    },
    "teethChart": [...],
    "recommendations": [...],
    "urgency": "routine"
  },
  "initialDiagnosis": "string",
  "fileName": "string",
  "fileData": "base64-encoded-image",
  "timestamp": "ISO-8601-date"
}
\`\`\`

## Dental Chart

Uses the **Universal Numbering System**:
- **Teeth 1-16**: Upper jaw (right to left from patient's perspective)
- **Teeth 17-32**: Lower jaw (left to right from patient's perspective)

Each tooth can have:
- **Condition**: Healthy, Cavity, Crown, Missing, etc.
- **Severity**: None, Mild, Moderate, Severe
- **Notes**: Additional details

## Deployment

The app is configured for server-side rendering with the Node.js adapter.

### Deploy to Any Node.js Host

\`\`\`bash
npm run build
\`\`\`

The build output will be in `dist/` directory. Run with:

\`\`\`bash
node dist/server/entry.mjs
\`\`\`

### Environment Variables in Production

Make sure to set `OPENROUTER_API_KEY` in your production environment.

## Medical Disclaimer

⚠️ **Important**: This application is for informational and educational purposes only. It should not be used as a substitute for professional dental care. Always consult with a licensed dentist for medical advice, diagnosis, and treatment.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
