# 🚀 Deployment Guide

This guide explains how to deploy your Advanced Calculator to Netlify with proper database configuration.

## 🎯 Quick Fix for Current Build Error

The build error you're experiencing is due to a missing `DATABASE_URL` environment variable. Here's how to fix it:

### Option 1: Deploy Without Database (Recommended for Testing)

The calculator works perfectly without a database - it uses local state for history management. To deploy immediately:

1. **Set a dummy DATABASE_URL in Netlify:**

   - Go to your Netlify dashboard
   - Navigate to: Site settings → Environment variables
   - Add: `DATABASE_URL=postgresql://dummy:dummy@localhost:5432/dummy`

2. **Redeploy:**
   - Trigger a new deployment from your Netlify dashboard
   - The app will work perfectly, just without persistent history storage

### Option 2: Set Up Neon Database (Full Functionality)

1. **Create a Neon Database:**

   - Go to [console.neon.tech](https://console.neon.tech/)
   - Create a new project
   - Copy the connection string

2. **Configure Netlify Environment:**

   - In Netlify dashboard: Site settings → Environment variables
   - Add: `DATABASE_URL=your_neon_connection_string`

3. **Run Database Migrations:**
   ```bash
   npm install -g drizzle-kit
   npx drizzle-kit push:pg
   ```

## 📋 Pre-deployment Checklist

✅ **Fixed Issues:**

- ✅ Database configuration now handles missing `DATABASE_URL` gracefully
- ✅ API routes return appropriate responses when database is unavailable
- ✅ Removed unused imports that caused lint warnings
- ✅ Updated Next.js configuration for better Netlify compatibility
- ✅ Added proper environment variable handling

## 🌐 Netlify Configuration

### netlify.toml

The project now includes a `netlify.toml` file with optimized settings:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "22.19.0"
  NPM_VERSION = "10.9.3"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Environment Variables Required

| Variable       | Required | Purpose             | Example                          |
| -------------- | -------- | ------------------- | -------------------------------- |
| `DATABASE_URL` | Optional | Database connection | `postgresql://user:pass@host/db` |
| `NODE_ENV`     | Auto-set | Environment         | `production`                     |

## 🔧 Local Development Setup

1. **Clone and install:**

   ```bash
   git clone <your-repo>
   cd calculadora-avancada
   npm install
   ```

2. **Environment setup:**

   ```bash
   cp env.example .env.local
   # Edit .env.local with your DATABASE_URL
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

## 🔍 Troubleshooting

### Build Fails with "No database connection string"

- **Solution:** Add `DATABASE_URL` to Netlify environment variables
- **Quick fix:** Use dummy URL: `postgresql://dummy:dummy@localhost:5432/dummy`

### App works but history doesn't persist

- **Cause:** No database configured
- **Solution:** Set up Neon database and configure `DATABASE_URL`

### TypeScript errors during build

- **Check:** All imports are correct and unused imports are removed
- **Verify:** Next.js configuration is properly set up

## 🏗️ Build Process Explanation

1. **Dependency Installation:** npm packages are installed
2. **Type Checking:** TypeScript files are validated
3. **Database Check:** App checks for `DATABASE_URL` availability
4. **Page Generation:** Static pages are generated
5. **API Routes:** Server functions are prepared
6. **Optimization:** Assets are optimized for production

## 🚀 Next Steps After Deployment

1. **Test the Calculator:**

   - Verify all mathematical operations work
   - Check responsive design on mobile
   - Test history functionality

2. **Set Up Database (Optional):**

   - Create Neon database account
   - Configure connection string
   - Test persistent history storage

3. **Performance Monitoring:**
   - Check Netlify analytics
   - Monitor build times
   - Optimize if needed

## 📞 Support

If you encounter issues:

1. Check Netlify build logs for specific errors
2. Verify environment variables are set correctly
3. Ensure the latest code changes are deployed
4. Test locally first to isolate deployment issues

---

**Current Status:** ✅ Ready for deployment with database graceful degradation
**Estimated Deploy Time:** 2-3 minutes
**Compatibility:** Netlify, Vercel, and other Node.js platforms
