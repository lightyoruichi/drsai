# 🤖 Custom LLM Model Configuration

DRS AI supports multiple AI models through OpenRouter. You can easily switch between different models based on your needs for quality, speed, and cost.

## 🎯 Quick Setup

### Method 1: Environment Variable (Recommended)

Add to your `.env` file:

```env
OPENROUTER_API_KEY=your-key-here
OPENROUTER_MODEL=anthropic/claude-3.5-sonnet
```

### Method 2: Pass Model at Runtime

The API endpoint accepts a `model` parameter in the form data. This allows dynamic model selection per request.

## 📊 Available Models

### Anthropic (Recommended for Medical Analysis)

| Model | ID | Cost/Analysis | Best For |
|-------|----|--------------:|----------|
| **Claude 3.5 Sonnet** | `anthropic/claude-3.5-sonnet` | $0.05-0.08 | Best quality, medical analysis ⭐ |
| Claude 3 Opus | `anthropic/claude-3-opus` | $0.25-0.35 | Highest accuracy |
| Claude 3 Sonnet | `anthropic/claude-3-sonnet` | $0.05-0.08 | Great balance |
| Claude 3 Haiku | `anthropic/claude-3-haiku` | $0.01-0.02 | Fastest & cheapest |

### OpenAI

| Model | ID | Cost/Analysis | Best For |
|-------|----|--------------:|----------|
| **GPT-4o** | `openai/gpt-4o` | $0.04-0.07 | Excellent alternative ⭐ |
| GPT-4 Turbo | `openai/gpt-4-turbo` | $0.15-0.25 | High quality |
| GPT-4o Mini | `openai/gpt-4o-mini` | $0.01-0.02 | Very affordable |

### Google

| Model | ID | Cost/Analysis | Best For |
|-------|----|--------------:|----------|
| **Gemini 1.5 Pro** | `google/gemini-pro-1.5` | $0.03-0.05 | Huge context (2M tokens) ⭐ |
| Gemini 1.5 Flash | `google/gemini-flash-1.5` | $0.01-0.02 | Ultra-fast & cheap |

### Mistral

| Model | ID | Cost/Analysis | Best For |
|-------|----|--------------:|----------|
| Mistral Large | `mistralai/mistral-large` | $0.05-0.10 | European privacy |

## 🎨 Choosing the Right Model

### For Production (Recommended)
```env
OPENROUTER_MODEL=anthropic/claude-3.5-sonnet
```
- Best accuracy for medical analysis
- Good balance of speed and cost
- Excellent reasoning abilities

### For Development/Testing
```env
OPENROUTER_MODEL=anthropic/claude-3-haiku
```
- 5-10x cheaper
- Very fast responses
- Good enough for testing

### For High Volume
```env
OPENROUTER_MODEL=google/gemini-flash-1.5
```
- Extremely affordable
- Very fast
- Good quality

### For Best Quality (Cost No Issue)
```env
OPENROUTER_MODEL=anthropic/claude-3-opus
```
- Highest accuracy
- Best reasoning
- Most expensive

## 💡 Configuration Examples

### Example 1: Use Different Models Per Environment

**`.env.development`**
```env
OPENROUTER_API_KEY=your-key-here
OPENROUTER_MODEL=anthropic/claude-3-haiku  # Cheap for testing
```

**`.env.production`**
```env
OPENROUTER_API_KEY=your-key-here
OPENROUTER_MODEL=anthropic/claude-3.5-sonnet  # Best quality
```

### Example 2: Custom Model in Code

Edit `src/config/models.ts` to change the default:

```typescript
export function getDefaultModelId(): string {
  return import.meta.env.OPENROUTER_MODEL || 'google/gemini-pro-1.5';
}
```

### Example 3: Runtime Model Selection

You can pass model in the API request:

```javascript
const formData = new FormData();
formData.append('file', file);
formData.append('initialDiagnosis', diagnosis);
formData.append('model', 'openai/gpt-4o');  // Custom model

const response = await fetch('/api/analyze', {
  method: 'POST',
  body: formData
});
```

## 📝 Model Configuration File

All models are configured in **`src/config/models.ts`**:

```typescript
export const AVAILABLE_MODELS: Record<string, ModelConfig> = {
  'claude-3.5-sonnet': {
    id: 'anthropic/claude-3.5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    description: 'Most intelligent model, excellent for medical analysis',
    contextWindow: 200000,
    supportsVision: true,
    costPer1MInputTokens: 3,
    costPer1MOutputTokens: 15,
  },
  // ... more models
};
```

## 🔒 Important: Vision Support Required

**Only models with vision support can analyze dental scans!**

The API will automatically reject non-vision models with a helpful error message:
```json
{
  "error": "Model Llama 3.1 405B does not support vision.",
  "suggestion": "Try: anthropic/claude-3.5-sonnet, openai/gpt-4o, or google/gemini-pro-1.5"
}
```

## 💰 Cost Comparison

Estimated cost per dental scan analysis (including image + ~3500 tokens):

| Model | Cost | Speed | Quality |
|-------|-----:|-------|---------|
| Gemini Flash 1.5 | $0.01 | ⚡⚡⚡ | ★★★☆☆ |
| Claude Haiku | $0.02 | ⚡⚡⚡ | ★★★★☆ |
| GPT-4o Mini | $0.02 | ⚡⚡☆ | ★★★★☆ |
| Gemini Pro 1.5 | $0.04 | ⚡⚡☆ | ★★★★☆ |
| GPT-4o | $0.06 | ⚡⚡☆ | ★★★★★ |
| Claude 3.5 Sonnet | $0.07 | ⚡⚡☆ | ★★★★★ |
| Claude Opus | $0.30 | ⚡☆☆ | ★★★★★ |

## 🧪 Testing Different Models

1. **Set environment variable:**
   ```bash
   OPENROUTER_MODEL=google/gemini-flash-1.5 npm run dev
   ```

2. **Or edit `.env`:**
   ```env
   OPENROUTER_MODEL=openai/gpt-4o
   ```

3. **Restart server:**
   ```bash
   npm run dev
   ```

4. **Check logs:**
   The API will log which model is being used:
   ```
   Using model: Claude 3.5 Sonnet (anthropic/claude-3.5-sonnet)
   Estimated cost: $0.0075
   ```

## 🎯 Recommendations

### For Production
1. **Primary**: `anthropic/claude-3.5-sonnet` - Best quality/cost ratio
2. **Backup**: `openai/gpt-4o` - Great alternative
3. **Budget**: `google/gemini-flash-1.5` - Very affordable

### For Development
1. **Testing**: `anthropic/claude-3-haiku` - Fast & cheap
2. **Alternative**: `google/gemini-flash-1.5` - Cheapest option

### For High Stakes
1. **Critical**: `anthropic/claude-3-opus` - Highest accuracy
2. **Alternative**: `openai/gpt-4-turbo` - Excellent quality

## 🔧 Advanced: Adding Custom Models

To add a new model, edit `src/config/models.ts`:

```typescript
export const AVAILABLE_MODELS: Record<string, ModelConfig> = {
  // ... existing models
  
  'my-custom-model': {
    id: 'provider/model-name',
    name: 'My Custom Model',
    provider: 'Provider Name',
    description: 'Description here',
    contextWindow: 128000,
    supportsVision: true,  // MUST be true for dental scans
    costPer1MInputTokens: 1.0,
    costPer1MOutputTokens: 2.0,
  },
};
```

Then use it:
```env
OPENROUTER_MODEL=provider/model-name
```

## 📚 Resources

- [OpenRouter Models](https://openrouter.ai/models) - Browse all available models
- [OpenRouter Docs](https://openrouter.ai/docs) - API documentation
- [Model Pricing](https://openrouter.ai/docs#models) - Up-to-date pricing

## 🆘 Troubleshooting

### "Model does not support vision"
**Solution**: Use a vision-capable model (see table above)

### "Model not found"
**Solution**: Check model ID is correct. See available models in `src/config/models.ts`

### High costs
**Solution**: Switch to cheaper models:
- `anthropic/claude-3-haiku`
- `google/gemini-flash-1.5`
- `openai/gpt-4o-mini`

### Slow responses
**Solution**: Use faster models:
- `anthropic/claude-3-haiku`
- `google/gemini-flash-1.5`

---

**Need help?** Check the [main README](./README.md) or [OpenRouter documentation](https://openrouter.ai/docs).

