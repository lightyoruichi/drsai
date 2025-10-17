# 🚀 Getting Started Checklist

Follow these steps to get your DRS AI dental analysis app up and running:

## ✅ Step-by-Step Setup

### 1️⃣ Install Node.js (if not already installed)
```bash
# Check if Node.js is installed
node --version
# Should show v18.0.0 or higher
```

If not installed, download from [nodejs.org](https://nodejs.org)

### 2️⃣ Install Dependencies
```bash
npm install
```

Wait for all packages to install (~1-2 minutes)

### 3️⃣ Get OpenRouter API Key

1. Go to **https://openrouter.ai**
2. Click "Sign Up" or "Log In"
3. Navigate to **https://openrouter.ai/keys**
4. Click "Create Key"
5. Copy your key (starts with `sk-or-v1-...`)
6. Add credits to your account if needed ($5 minimum)

### 4️⃣ Create Environment File
```bash
# Copy the example file
cp .env.example .env
```

Then open `.env` in your text editor and paste your API key:
```env
OPENROUTER_API_KEY=sk-or-v1-your-actual-key-here
```

### 5️⃣ Start Development Server
```bash
npm run dev
```

You should see:
```
🚀 astro v5.0.0 started in XXXms

┃ Local    http://localhost:4321/
┃ Network  use --host to expose
```

### 6️⃣ Open in Browser

Go to: **http://localhost:4321**

### 7️⃣ Test the Application

1. **Upload a test image**
   - Any dental scan or even a regular photo to test
   - Drag & drop or click to upload

2. **Enter initial diagnosis**
   ```
   I think I have a cavity in tooth #3, and my gums look inflamed.
   ```

3. **Click "Analyze with AI"**
   - Wait 15-30 seconds for AI processing
   - Watch the progress indicators

4. **View Results**
   - Brief results page with comparison
   - Click "View Full Results" for the complete teeth chart

5. **Test Shareable Links**
   - Copy the shareable link
   - Open in a new browser tab
   - Results should load (from sessionStorage in dev)

## 🎉 You're Done!

Your dental AI analysis app is now running!

## 📝 What You Built

- ✅ **Page 1**: Upload page with drag & drop
- ✅ **Page 2**: Processing page with animated progress
- ✅ **Page 3**: Brief results with AI comparison
- ✅ **Page 4**: Full results with 32-tooth chart

## 🔧 Common Issues & Solutions

### Issue: "OpenRouter API key not configured"
**Solution**: 
- Make sure `.env` file exists
- Check that API key is correct
- Restart dev server: `Ctrl+C` then `npm run dev`

### Issue: "Analysis failed"
**Solution**:
- Check API key has credits on OpenRouter
- Verify internet connection
- Check browser console for detailed error

### Issue: Port 4321 already in use
**Solution**:
```bash
# Kill process on port 4321
lsof -ti:4321 | xargs kill -9
# Then restart
npm run dev
```

### Issue: Dependencies won't install
**Solution**:
```bash
# Clear npm cache
npm cache clean --force
# Remove node_modules
rm -rf node_modules package-lock.json
# Reinstall
npm install
```

## 📚 Documentation Files

- **README.md** - Complete project documentation
- **SETUP.md** - Detailed setup instructions
- **PROJECT_SUMMARY.md** - Technical overview
- **GETTING_STARTED.md** - This file (quick start)

## 🚀 Ready for Production?

When ready to deploy:

1. **Build the app:**
   ```bash
   npm run build
   ```

2. **Test production build:**
   ```bash
   npm run preview
   ```

3. **Deploy to hosting:**
   - Vercel: `vercel` (easiest)
   - Netlify: Connect Git repo
   - Railway: Connect Git repo
   - Or any Node.js host

4. **Set environment variable** on your hosting platform:
   ```
   OPENROUTER_API_KEY=your-key-here
   ```

## 💡 Tips

- **Save money**: Monitor API usage at https://openrouter.ai/activity
- **Better results**: Use high-quality dental scan images
- **More accurate**: Provide detailed initial diagnosis
- **Share easily**: Links work forever (in production with database)

## 🆘 Need Help?

1. Check browser DevTools console (F12)
2. Check terminal for server errors
3. Review the error message carefully
4. Ensure API key is valid and has credits

## 🎯 What's Next?

- Test with real dental scans
- Deploy to production
- Add database for persistent storage
- Customize the UI/branding
- Add user authentication
- Set up monitoring

---

**Happy coding! 🦷💻**

