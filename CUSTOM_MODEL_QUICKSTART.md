# 🚀 Quick Start: Using Custom Models

## Step 1: Choose Your Model

Pick a model based on your needs:

### 🎯 Best Quality (Recommended)
```env
OPENROUTER_MODEL=anthropic/claude-3.5-sonnet
```
Cost: ~$0.07/analysis

### ⚡ Fastest & Cheapest
```env
OPENROUTER_MODEL=google/gemini-flash-1.5
```
Cost: ~$0.01/analysis

### 💰 Good Balance
```env
OPENROUTER_MODEL=openai/gpt-4o-mini
```
Cost: ~$0.02/analysis

## Step 2: Add to .env File

Open your `.env` file and add:

```env
OPENROUTER_API_KEY=your-key-here
OPENROUTER_MODEL=anthropic/claude-3.5-sonnet
```

## Step 3: Restart Server

```bash
npm run dev
```

## Step 4: Test It!

Upload a dental scan and check the terminal logs:

```
Using model: Claude 3.5 Sonnet (anthropic/claude-3.5-sonnet)
Estimated cost: $0.0075
```

## 📋 All Available Models

| Model | Use When | Cost |
|-------|----------|-----:|
| `anthropic/claude-3.5-sonnet` | Best quality needed | $0.07 |
| `anthropic/claude-3-haiku` | Testing/development | $0.02 |
| `openai/gpt-4o` | Want OpenAI alternative | $0.06 |
| `openai/gpt-4o-mini` | Budget OpenAI option | $0.02 |
| `google/gemini-pro-1.5` | Need huge context | $0.04 |
| `google/gemini-flash-1.5` | Lowest cost | $0.01 |
| `mistralai/mistral-large` | European privacy | $0.08 |

## 🎨 Switch Models Anytime

Just change the `.env` file and restart:

```bash
# Try different models
OPENROUTER_MODEL=google/gemini-flash-1.5 npm run dev
```

## 💡 Pro Tips

1. **Development**: Use `claude-3-haiku` or `gemini-flash-1.5` (cheap)
2. **Production**: Use `claude-3.5-sonnet` or `gpt-4o` (quality)
3. **High Volume**: Use `gemini-flash-1.5` (most affordable)

## 📚 More Info

See [MODEL_CONFIGURATION.md](./MODEL_CONFIGURATION.md) for complete details.

---

**That's it!** You can now use any vision-capable model from OpenRouter. 🎉

