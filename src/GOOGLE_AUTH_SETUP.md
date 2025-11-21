# 🔐 Google Authentication Setup Guide

## ✅ What's Been Implemented

Your XYZ Digilab website generator now has **Google OAuth authentication** powered by Supabase! Users must sign in with their Google account before they can generate websites.

---

## 🚀 Features Implemented

### 1. ✅ Google OAuth Login
- Beautiful login screen with Google sign-in button
- Secure authentication via Supabase Auth
- Automatic session management
- Protected website generation (must be logged in)

### 2. ✅ User Profile Display
- Shows user avatar and name in header
- Sign out button
- Persistent sessions (stays logged in)

### 3. ✅ Authentication Flow
```
User Opens App → Login Screen → Click "Continue with Google"
→ Google OAuth → Redirect Back → Authenticated → Access Website Generator
```

---

## ⚙️ REQUIRED SETUP (You MUST Do This!)

### **CRITICAL:** Configure Google OAuth in Supabase

Your app **WILL NOT WORK** until you complete this setup in your Supabase dashboard.

### Step-by-Step Setup:

#### 1. Open Your Supabase Dashboard
Go to: https://supabase.com/dashboard

#### 2. Navigate to Authentication Settings
1. Click on your project
2. Go to **Authentication** in the sidebar
3. Click on **Providers**
4. Find **Google** in the list

#### 3. Enable Google Provider
1. Toggle **Google** to ON/Enabled
2. You'll see fields for:
   - **Client ID**
   - **Client Secret**

#### 4. Get Google OAuth Credentials
You need to create a Google OAuth app:

**Option A: Quick Setup (Recommended)**
1. Go to: https://console.cloud.google.com/apis/credentials
2. Create a new project (or select existing)
3. Click **Create Credentials** → **OAuth 2.0 Client IDs**
4. Choose **Web application**
5. Add these URLs:
   - **Authorized JavaScript origins:**
     ```
     https://[YOUR-PROJECT-ID].supabase.co
     ```
   - **Authorized redirect URIs:**
     ```
     https://[YOUR-PROJECT-ID].supabase.co/auth/v1/callback
     ```
6. Click **Create**
7. Copy the **Client ID** and **Client Secret**

**Option B: Follow Supabase Guide**
Visit: https://supabase.com/docs/guides/auth/social-login/auth-google

#### 5. Add Credentials to Supabase
1. Paste **Client ID** into Supabase
2. Paste **Client Secret** into Supabase
3. Click **Save**

#### 6. Update Site URL (Important!)
1. In Supabase Dashboard → Settings → API
2. Set **Site URL** to your app's URL:
   - Local dev: `http://localhost:5173` (or your local port)
   - Production: Your actual domain

#### 7. Add Redirect URLs
1. In Supabase Dashboard → Authentication → URL Configuration
2. Add your redirect URLs:
   - Local: `http://localhost:5173/**`
   - Production: `https://yourdomain.com/**`

---

## 🧪 Testing the Authentication

### 1. Start Your App
The app should now show a login screen.

### 2. Click "Continue with Google"
You should be redirected to Google's OAuth consent screen.

### 3. Select Your Google Account
Choose which Google account to use.

### 4. Grant Permissions
Allow the app to access your basic profile info.

### 5. Redirected Back
You should be redirected back to the app, now logged in!

### 6. Verify You're Logged In
- You should see your Google profile picture/name in the header
- You should see a "Sign Out" button
- You can now access the website generator

---

## 🔍 Troubleshooting

### Error: "Provider is not enabled"
**Solution:** You haven't enabled Google in Supabase Auth settings. Follow Step 3 above.

### Error: "Invalid client"
**Solution:** Your Google OAuth Client ID/Secret is wrong. Double-check the credentials in both Google Console and Supabase.

### Error: "Redirect URI mismatch"
**Solution:** 
1. Check that redirect URIs in Google Console match exactly:
   ```
   https://[YOUR-PROJECT-ID].supabase.co/auth/v1/callback
   ```
2. Make sure there are no extra spaces or typos

### Not Redirecting After Login
**Solution:**
1. Check Site URL in Supabase Settings → API
2. Check Redirect URLs in Supabase Authentication → URL Configuration
3. Make sure URLs match your actual app URL

### Session Not Persisting (Logs Out on Refresh)
**Solution:**
1. Check browser cookies are enabled
2. Check Supabase JWT settings
3. Try clearing browser cache and cookies

---

## 📁 Files Created/Modified

### New Files:
1. **`/utils/supabase/client.tsx`** - Supabase client for browser
2. **`/components/AuthProvider.tsx`** - Authentication context and state management
3. **`/components/GoogleAuth.tsx`** - Login UI and user profile component
4. **`/GOOGLE_AUTH_SETUP.md`** - This setup guide

### Modified Files:
1. **`/App.tsx`** - Wrapped with AuthProvider, added auth checks
2. **`/components/TemplateSelection.tsx`** - Added user profile to header

---

## 🎨 User Experience

### Login Screen
Users see a beautiful dark glassmorphism login screen with:
- XYZ Digilab branding
- Google sign-in button
- Feature list (unlimited websites, 5 templates, etc.)
- Setup instructions link for admins

### Authenticated Experience
Once logged in, users see:
- Their Google profile picture in the header
- Their name/email
- Sign out button
- Full access to website generator

### Sign Out
Clicking "Sign Out":
- Logs out the user
- Returns to login screen
- Clears session data
- Shows success toast

---

## 🔐 Security Features

### ✅ Protected Routes
- Website generation requires authentication
- Templates require authentication
- Automatic redirect to login if not authenticated

### ✅ Secure Session Management
- JWT tokens handled by Supabase
- Secure cookies
- Automatic token refresh
- Session persistence across page refreshes

### ✅ OAuth 2.0 Standard
- Industry-standard authentication flow
- No password storage
- Google handles credentials
- Secure redirect flow

---

## 🎯 Authentication Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│  User Opens App                                         │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│  AuthProvider checks session                            │
│  • supabase.auth.getSession()                           │
└─────────────────┬───────────────────────────────────────┘
                  │
          ┌───────┴───────┐
          │               │
     No Session      Has Session
          │               │
          ▼               ▼
┌──────────────────┐  ┌──────────────────────┐
│  Show Login      │  │  Show Main App       │
│  Screen          │  │  (Template Selection)│
│                  │  │                      │
│  [Google Button] │  │  [User Profile]      │
└────────┬─────────┘  └──────────────────────┘
         │
         ▼ (User clicks)
┌──────────────────────────────────────────────────────────┐
│  signInWithGoogle()                                      │
│  • supabase.auth.signInWithOAuth({ provider: 'google' })│
└────────┬─────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────┐
│  Redirect to Google OAuth                               │
│  • User selects Google account                          │
│  • User grants permissions                              │
└────────┬────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────┐
│  Redirect back to app                                   │
│  • Supabase callback URL                                │
│  • Session created automatically                        │
└────────┬────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────┐
│  onAuthStateChange triggered                            │
│  • Updates user state                                   │
│  • App shows authenticated view                         │
└─────────────────────────────────────────────────────────┘
```

---

## 📊 Session Management

### Session Storage
- **Location:** Browser localStorage/cookies
- **Type:** JWT tokens
- **Expiry:** Configurable in Supabase (default: 1 hour)
- **Refresh:** Automatic token refresh

### Session Check
Happens on:
- App initial load
- Page refresh
- Window focus
- Manual check

### Session Persistence
- ✅ Survives page refresh
- ✅ Survives browser close/reopen (optional)
- ✅ Automatic token refresh
- ✅ Secure token storage

---

## 🎨 Customization Options

### Change Login Screen Branding
Edit `/components/GoogleAuth.tsx`:
- Logo/icon
- Brand name
- Colors
- Feature list
- Description text

### Change User Profile Display
Edit `/components/GoogleAuth.tsx` → `UserProfile` component:
- Avatar size/style
- Display name format
- Button style
- Position

### Change Auth Behavior
Edit `/components/AuthProvider.tsx`:
- Session persistence
- Redirect URLs
- Error handling
- Toast notifications

---

## 📝 Environment Variables

### Required in Supabase Dashboard:
- Google OAuth Client ID
- Google OAuth Client Secret

### Already Configured:
- Supabase Project ID (in `/utils/supabase/info.tsx`)
- Supabase Anon Key (in `/utils/supabase/info.tsx`)

---

## ✅ Post-Setup Checklist

- [ ] Enabled Google provider in Supabase
- [ ] Created Google OAuth credentials
- [ ] Added Client ID and Secret to Supabase
- [ ] Configured redirect URIs in Google Console
- [ ] Set Site URL in Supabase
- [ ] Added redirect URLs in Supabase
- [ ] Tested login flow
- [ ] Tested sign out
- [ ] Verified session persistence
- [ ] Tested website generation (requires auth)

---

## 🆘 Need More Help?

### Official Documentation:
- **Supabase Auth:** https://supabase.com/docs/guides/auth
- **Google OAuth Setup:** https://supabase.com/docs/guides/auth/social-login/auth-google
- **Supabase Auth UI:** https://supabase.com/docs/guides/auth/auth-helpers

### Common Resources:
- Google Cloud Console: https://console.cloud.google.com
- Supabase Dashboard: https://supabase.com/dashboard
- OAuth 2.0 Guide: https://oauth.net/2/

---

## 🎉 That's It!

Once you complete the Supabase/Google setup, your authentication system is fully functional!

Users will now need to sign in with Google before they can:
- ✅ Access the website generator
- ✅ Generate AI-powered websites
- ✅ View templates
- ✅ Use any app features

**The app is now production-ready with secure authentication!** 🚀

---

*Last Updated: November 18, 2024*
*Authentication Status: ✅ Implemented (Requires Supabase OAuth Setup)*
