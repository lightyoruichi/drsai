# 🎯 Model Configuration Examples

## Quick Examples

### Example 1: Use Claude Haiku for Development
**Fastest & cheapest for testing**

```env
# .env
OPENROUTER_API_KEY=your-key-here
OPENROUTER_MODEL=anthropic/claude-3-haiku
```

**Result**: ~$0.02 per analysis, very fast

---

### Example 2: Use Gemini Flash for Production (Budget)
**Ultra-affordable for high volume**

```env
# .env
OPENROUTER_API_KEY=your-key-here
OPENROUTER_MODEL=google/gemini-flash-1.5
```

**Result**: ~$0.01 per analysis, great quality

---

### Example 3: Use GPT-4o for OpenAI Fans
**OpenAI's best multimodal model**

```env
# .env
OPENROUTER_API_KEY=your-key-here
OPENROUTER_MODEL=openai/gpt-4o
```

**Result**: ~$0.06 per analysis, excellent quality

---

### Example 4: Use Claude 3.5 Sonnet for Best Quality
**Best overall (default)**

```env
# .env
OPENROUTER_API_KEY=your-key-here
OPENROUTER_MODEL=anthropic/claude-3.5-sonnet
```

**Result**: ~$0.07 per analysis, top quality

---

## Testing Different Models

### Terminal Output

When you run the app, you'll see which model is being used:

```bash
$ npm run dev

Using model: Claude 3.5 Sonnet (anthropic/claude-3.5-sonnet)
Estimated cost: $0.0075
```

### In Results Page

The full results page shows which model was used:

```
Analysis Details
├─ Analysis ID: abc123xyz
├─ AI Model: Claude 3.5 Sonnet (Anthropic)
├─ Analysis Date: 1/17/2025, 10:30 AM
└─ File Name: dental-scan.jpg
```

---

## Switching Models

### Method 1: Change Environment Variable

```bash
# Edit .env
nano .env

# Change the model
OPENROUTER_MODEL=google/gemini-flash-1.5

# Restart server
npm run dev
```

### Method 2: Command Line Override

```bash
OPENROUTER_MODEL=openai/gpt-4o npm run dev
```

### Method 3: Pass at Runtime (Advanced)

Modify the upload form to include model selection:

```javascript
// In src/pages/index.astro
const formData = new FormData();
formData.append('file', file);
formData.append('initialDiagnosis', diagnosis);
formData.append('model', 'openai/gpt-4o-mini'); // Custom model
```

---

## Model Comparison Chart

| Scenario | Recommended Model | Why |
|----------|------------------|-----|
| **Production (Quality)** | `anthropic/claude-3.5-sonnet` | Best accuracy for medical |
| **Production (Budget)** | `google/gemini-flash-1.5` | Extremely affordable |
| **Development/Testing** | `anthropic/claude-3-haiku` | Fast and cheap |
| **OpenAI Preference** | `openai/gpt-4o` | Excellent alternative |
| **Highest Accuracy** | `anthropic/claude-3-opus` | Top performance |
| **Fastest Response** | `google/gemini-flash-1.5` | Ultra-fast |
| **Huge Context Needed** | `google/gemini-pro-1.5` | 2M token context |

---

## Cost Breakdown (Per 1000 Analyses)

| Model | Cost |
|-------|-----:|
| Gemini Flash 1.5 | $10 |
| Claude Haiku | $20 |
| GPT-4o Mini | $20 |
| Gemini Pro 1.5 | $40 |
| GPT-4o | $60 |
| Claude 3.5 Sonnet | $70 |
| Claude Opus | $300 |

---

## Performance Test Results

Based on typical dental scan analysis:

| Model | Speed | Quality | Cost |
|-------|-------|---------|------|
| Gemini Flash | ⚡⚡⚡ | ⭐⭐⭐ | 💰 |
| Claude Haiku | ⚡⚡⚡ | ⭐⭐⭐⭐ | 💰 |
| GPT-4o Mini | ⚡⚡ | ⭐⭐⭐⭐ | 💰 |
| Gemini Pro | ⚡⚡ | ⭐⭐⭐⭐ | 💰💰 |
| GPT-4o | ⚡⚡ | ⭐⭐⭐⭐⭐ | 💰💰 |
| Claude Sonnet | ⚡⚡ | ⭐⭐⭐⭐⭐ | 💰💰 |
| Claude Opus | ⚡ | ⭐⭐⭐⭐⭐ | 💰💰💰💰 |

---

**Need more details?** See [MODEL_CONFIGURATION.md](./MODEL_CONFIGURATION.md)
