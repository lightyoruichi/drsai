# Quick Setup Guide for DRS AI

## Prerequisites

- Node.js 18+ installed
- OpenRouter API account and key

## Step 1: Get Your OpenRouter API Key

1. Go to [OpenRouter.ai](https://openrouter.ai)
2. Sign up or log in
3. Navigate to [Keys](https://openrouter.ai/keys)
4. Create a new API key
5. Copy the key (starts with `sk-or-...`)

## Step 2: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and replace `your_openrouter_api_key_here` with your actual API key:
   ```env
   OPENROUTER_API_KEY=sk-or-v1-...your-actual-key...
   ```

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:4321](http://localhost:4321) to see your app!

## Step 5: Test the Application

1. Go to the upload page
2. Upload a dental scan image (you can use any image for testing)
3. Enter some initial diagnosis text like:
   ```
   I think I have a cavity in my upper right molar, and my gums look a bit inflamed.
   ```
4. Click "Analyze with AI"
5. Wait for the processing (15-30 seconds)
6. View your results!

## Troubleshooting

### API Key Issues

If you see "OpenRouter API key not configured":
- Make sure you created the `.env` file
- Check that your API key is correct
- Restart the development server after changing `.env`

### Processing Takes Too Long

- OpenRouter API calls can take 15-30 seconds for image analysis
- Make sure you have API credits in your OpenRouter account
- Check the browser console for any error messages

### Build Errors

If you encounter TypeScript or build errors:
```bash
npm run astro check
```

## Production Deployment

### Build for Production

```bash
npm run build
```

### Run Production Server Locally

```bash
npm run preview
```

### Deploy to Hosting Platform

The app uses SSR (Server-Side Rendering) and needs Node.js hosting:

- **Vercel**: Deploy with `vercel` CLI or connect your Git repo
- **Netlify**: Use Netlify CLI or connect your repo
- **Railway**: Connect repo and deploy
- **Fly.io**: Use `flyctl deploy`
- **Any VPS**: Run `node dist/server/entry.mjs` after build

Make sure to set the `OPENROUTER_API_KEY` environment variable in your hosting platform!

## Cost Considerations

OpenRouter charges per API call. Claude 3.5 Sonnet costs approximately:
- **Input**: $3 per 1M tokens
- **Output**: $15 per 1M tokens

A typical dental scan analysis costs about $0.05-0.15 per request.

Monitor your usage at [OpenRouter Dashboard](https://openrouter.ai/activity).

## Need Help?

Check the main [README.md](./README.md) for more detailed information about the project structure and features.

