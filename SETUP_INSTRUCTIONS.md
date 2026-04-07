# 🚀 Setup Instructions — GET YOUR PROJECT RUNNING

**Goal:** Get the working prototype running by end of this guide  
**Time:** 15-20 minutes  
**Success:** You'll see the app in your browser with working buttons

---

## Step 1: Open Terminal in Your Project Folder

**In VSCode:**
1. Open your project folder: `C:\Users\ASUS\Screen_Recorder_project`
2. Click "Terminal" in the top menu → "New Terminal"
3. You should see your folder path in the terminal

**In Command Prompt:**
1. Open Command Prompt
2. Navigate: `cd C:\Users\ASUS\Screen_Recorder_project`
3. You should see your folder path

**Verify:** You should see `C:\Users\ASUS\Screen_Recorder_project>` in terminal

---

## Step 2: Initialize NPM

Run this command:
```bash
npm init -y
```

**What this does:**
- Creates a `package.json` file
- Prepares your project for dependencies

**Expected output:**
```
wrote to C:\Users\ASUS\Screen_Recorder_project\package.json
```

---

## Step 3: Install Dependencies

Run all these commands one by one:

```bash
npm install react react-dom
```

Wait for this to finish (you'll see "added X packages")

Then run:
```bash
npm install -D vite @vitejs/plugin-react tailwindcss postcss autoprefixer
```

**What this does:**
- Installs React (UI library)
- Installs Vite (build tool)
- Installs Tailwind (CSS framework)

**Expected output:**
```
added 200+ packages
```

---

## Step 4: Create Folder Structure

In your project folder, create these folders:
- `src`
- `src/components`
- `src/styles`
- `public`
- `docs`

**In VSCode:** Right-click → "New Folder"

---

## Step 5: Copy Configuration Files

Create these files in the **root folder** (same level as `package.json`):

### A. `vite.config.js`
Copy this entire content:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    hmr: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
```

### B. `tailwind.config.js`
Copy this entire content:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'share-blue': '#0066FF',
        'record-red': '#FF4500',
      },
      animation: {
        'pulse-slow': 'pulse-slow 2s ease-in-out infinite',
        'pulse-fast': 'pulse-fast 1s ease-in-out infinite',
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'pulse-fast': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
    },
  },
  plugins: [],
}
```

### C. `postcss.config.js`
Copy this entire content:
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### D. `.gitignore`
Copy this entire content:
```
node_modules/
package-lock.json
dist/
build/
.env
.env.local
.vscode/
.idea/
.DS_Store
```

---

## Step 6: Create HTML Entry Point

Create file: `public/index.html`

Copy this entire content:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Screen Share Indicator Prototype</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
                'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica',
                'Arial', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            background: #f5f5f5;
        }
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/src/index.js"></script>
</body>
</html>
```

---

## Step 7: Create React Entry Point

Create file: `src/index.js`

Copy this entire content:
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

---

## Step 8: Create Global CSS

Create file: `src/index.css`

Copy this entire content:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --share-blue: #0066FF;
  --record-red: #FF4500;
}

html, body, #root {
  height: 100%;
  width: 100%;
}

body {
  background-color: #f9fafb;
  color: #1f2937;
}

* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

---

## Step 9: Create React Components

### A. Create `src/App.jsx`
(See the complete code in `/home/claude/src_App_jsx`)

### B. Create `src/components/Indicator.jsx`
(See the complete code in `/home/claude/src_components_Indicator_jsx`)

### C. Create `src/components/Controls.jsx`
(See the complete code in `/home/claude/src_components_Controls_jsx`)

### D. Create `src/components/MockCall.jsx`
(See the complete code in `/home/claude/src_components_MockCall_jsx`)

---

## Step 10: Start the Development Server

In your terminal, run:
```bash
npm run dev
```

**Expected output:**
```
  VITE v5.0.8  ready in 234 ms

  ➜  Local:   http://localhost:3000/
  ➜  press h + enter to show help
```

Browser should automatically open. If not, manually go to: `http://localhost:3000`

---

## Step 11: Test the App

You should see:
1. ✅ Dark background with light interface
2. ✅ "Screen Share Indicator Prototype" title
3. ✅ "Your Screen" and "Participant's View" boxes
4. ✅ Control buttons on the right
5. ✅ Status section at the bottom

---

## Step 12: Test the Buttons

1. **Click "Start Sharing"** → Blue circle should appear in top-right corner
2. **Watch the animation** → Should pulse slowly (2 second cycle)
3. **Click "Start Recording"** → Blue becomes red, pulsing faster (1 second)
4. **Click "Animation OFF"** → Indicator stops pulsing but stays visible
5. **Click "Animation ON"** → Indicator pulses again
6. **Click "Stop Sharing"** → Indicator disappears

---

## ✅ Success Checklist

- [ ] All commands ran without errors
- [ ] App opens in browser at `http://localhost:3000`
- [ ] You see the title and controls
- [ ] "Start Sharing" button works (blue indicator appears)
- [ ] Blue indicator pulses slowly
- [ ] "Start Recording" changes it to red, pulses faster
- [ ] Animation toggle works (indicator stops/starts pulsing)
- [ ] No errors in browser console (F12)

---

## 🐛 If Something Goes Wrong

### "npm: command not found"
- Node.js might not be installed
- Test: `node --version`
- Reinstall from https://nodejs.org

### "Cannot find module"
- You might have missed a dependency
- Run: `npm install`
- Restart terminal

### "Port 3000 already in use"
- Another app is using that port
- Close other applications, or:
- Run: `npm run dev -- --port 3001`

### "Module 'vite' not found"
- Make sure all installations completed
- Run: `npm install -D vite @vitejs/plugin-react`

### App doesn't open in browser
- Browser might be blocked
- Open manually: `http://localhost:3000`

### Indicator doesn't show
- Make sure you clicked "Start Sharing"
- Check browser console (F12) for errors
- Make sure no JavaScript errors appear

### Styles look wrong
- Tailwind might not be compiled
- Restart dev server: Stop (Ctrl+C) and run `npm run dev` again

---

## Next Steps

Once the app is running:

1. **Understand the code**
   - Read comments in each component
   - Understand how props flow
   - See how state works

2. **Experiment**
   - Try changing colors
   - Try changing animation speeds
   - Try changing sizes

3. **Progress tracking**
   - Update `docs/PROGRESS.md` with what you learned
   - Note any questions

4. **Daily checkins**
   - Each day, I'll ask what was learned
   - We'll iterate and improve

---

## 📝 Quick Commands Reference

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run preview  # Preview the production build
npm install      # Install dependencies
npm init -y      # Initialize npm project
```

---

## 🎉 Congratulations!

You've set up a **production-grade React project** with:
- ✅ Modern tooling (Vite)
- ✅ Professional styling (Tailwind)
- ✅ Component architecture (React)
- ✅ Animations (CSS)

This is real software development. Well done!

---

**Ready for Day 1? Tell me: "Setup complete, app is running!"**
