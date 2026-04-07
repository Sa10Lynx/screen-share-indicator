# Screen Share Indicator Prototype

> A React-based prototype demonstrating a screen share indicator for video conferencing applications (Teams, Zoom, Google Meet).

**Status:** 🚀 In Development  
**Start Date:** April 2026  
**Duration:** 8 weeks  
**Last Updated:** [TODAY]

---

## 🎯 Project Overview

### The Problem
During video calls, when everyone goes silent, you can't tell if people are actually there or if your connection has dropped. There's no visual indicator that the screen sharing is still active.

### The Solution
A small animated indicator in the corner of the screen that shows:
- **Blue pulsing circle** = Screen is being shared
- **Red pulsing circle** = Screen is being shared AND recorded

### Why This Matters
- **Real UX problem** — Tanush identified this during an actual Teams call
- **Production thinking** — We're learning how professional software is built
- **Pitchable idea** — Can be sent to Zoom, Teams, Google Meet
- **Portfolio piece** — Demonstrates product thinking + engineering skills

---

## 🎨 Design Specification

### Sharing State (Blue)
```
Color: #0066FF (Blue)
Shape: Solid filled circle
Size: 30px diameter
Position: Top-right corner, 10px inset from edge
Animation: Pulsing (100% → 60% → 100%) over 2 seconds
Meaning: "Screen is being shared"
```

### Recording State (Red)
```
Color: #FF4500 (Red/Orange)
Shape: Hollow circle (outline only)
Size: 30px diameter
Stroke width: 2px
Position: Top-right corner, 10px inset from edge
Animation: Faster pulsing (100% → 40% → 100%) over 1 second
Meaning: "Screen is being shared AND being recorded"
```

### Accessibility
- **Shape difference** — Solid vs. hollow (main distinction)
- **Animation speed** — Slow (2s) vs. Fast (1s) (secondary distinction)
- **Color** — Blue vs. Red (tertiary distinction)
- **Result:** Even if colorblind, shape + animation speed are enough to distinguish

---

## 🛠 Tech Stack

| Tool | Purpose | Why |
|------|---------|-----|
| **React 18** | UI Framework | Component-based, state management, industry standard |
| **Vite** | Build tool | Fast dev server, quick rebuilds |
| **Tailwind CSS** | Styling | Utility-first, production-ready, rapid iteration |
| **JavaScript ES6+** | Language | Modern syntax, widely understood |

### Development Tools
- **npm** — Package manager
- **ESLint** — Code quality (optional)
- **Git** — Version control

---

## 📁 Project Structure

```
screen-share-indicator/
├── src/
│   ├── components/
│   │   ├── Indicator.jsx       # The pulsing blue/red circle
│   │   ├── Controls.jsx        # Buttons to toggle states
│   │   ├── MockCall.jsx        # Mock video call interface
│   │   └── App.jsx             # Main component, state management
│   ├── index.js                # Entry point
│   └── index.css               # Global styles (Tailwind)
├── public/
│   └── index.html              # Main HTML file
├── docs/
│   ├── PROGRESS.md             # Daily progress tracking
│   ├── PROJECT_PLAN.md         # 8-week roadmap
│   ├── DESIGN_SPEC.md          # Design locked in
│   ├── WEEK1_WEEK2_SCHEDULE.md # Daily breakdown
│   └── QUICK_REFERENCE.md      # Quick lookup
├── package.json                # Dependencies
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
└── .gitignore                  # Git ignore file
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher) — [Download](https://nodejs.org)
- Git — [Download](https://git-scm.com)
- Code editor (VSCode recommended) — [Download](https://code.visualstudio.com)

### Installation

1. **Clone or navigate to the project**
   ```bash
   cd C:\Users\ASUS\Screen_Recorder_project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Automatically opens at `http://localhost:3000`
   - If not, open it manually

### Available Commands
```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run preview  # Preview production build locally
```

---

## 💡 How It Works

### Component Architecture

```
App.jsx
├── State management (sharing, recording, animation)
├── MockCall.jsx
│   ├── "Your Screen" section
│   │   └── Indicator.jsx (shows indicator)
│   └── "Participant View" section
│       └── Indicator.jsx (shows indicator)
└── Controls.jsx
    ├── "Start/Stop Sharing" button
    ├── "Start/Stop Recording" button
    └── "Animation ON/OFF" button
```

### State Flow
1. **User clicks button** → Button's onClick handler fires
2. **setState updates** → Component re-renders with new state
3. **Indicator responds** → Shows/hides based on new state
4. **Animation triggers** → If animationEnabled, applies animation class

### Example: User clicks "Start Sharing"
```
User clicks "Start Sharing"
  ↓
setIsSharing(true) runs
  ↓
App state updates
  ↓
MockCall and Indicator receive new props
  ↓
Indicator now renders (wasn't rendering before)
  ↓
Blue circle appears with slow pulse
```

---

## 🎬 Features (Week 2 Build)

- ✅ **Toggle Sharing** — Start/stop screen share
- ✅ **Toggle Recording** — Start/stop recording (only when sharing)
- ✅ **Toggle Animation** — Static vs. animated indicator
- ✅ **Two Views** — See how it looks on your screen and participant's screen
- ✅ **Real-time Status** — Shows current state (on/off)
- ✅ **Color Accuracy** — Blue (#0066FF) and Red (#FF4500)
- ✅ **Animation Accuracy** — 2s slow pulse (sharing), 1s fast pulse (recording)

---

## 📚 Learning Outcomes

### By End of Week 2
- ✅ React basics (components, JSX, props, state)
- ✅ React hooks (useState)
- ✅ Conditional rendering
- ✅ Event handling
- ✅ Tailwind CSS for styling
- ✅ CSS animations
- ✅ Project file structure

### By End of Week 4
- ✅ Component composition
- ✅ Lifting state up
- ✅ Advanced animations
- ✅ Responsive design
- ✅ Testing components
- ✅ Code organization

### By End of Week 6
- ✅ Code quality standards
- ✅ Accessibility (WCAG, ARIA)
- ✅ Performance optimization
- ✅ Deployment (Vercel)
- ✅ Git workflow
- ✅ Production thinking

---

## 📖 Documentation

- **[DESIGN_SPEC.md](./docs/DESIGN_SPEC.md)** — Exact visual design
- **[QUICK_REFERENCE.md](./docs/QUICK_REFERENCE.md)** — Colors, sizes, schedule
- **[PROJECT_PLAN.md](./docs/PROJECT_PLAN.md)** — Full 8-week roadmap
- **[WEEK1_WEEK2_SCHEDULE.md](./docs/WEEK1_WEEK2_SCHEDULE.md)** — Daily breakdown
- **[PROGRESS.md](./docs/PROGRESS.md)** — Track daily progress

---

## 🐛 Troubleshooting

### "npm: command not found"
**Solution:** Node.js not installed correctly
- Verify: `node --version`
- Reinstall from [nodejs.org](https://nodejs.org)
- Restart terminal/VSCode

### "Module not found" error
**Solution:** Dependencies not installed
```bash
npm install
```

### "Port 3000 is already in use"
**Solution:** Another app is using that port
```bash
# Find and kill the process, or use a different port
npm run dev -- --port 3001
```

### "Indicator not showing"
**Solution:** Check if sharing is enabled
- Click "Start Sharing" button first
- Open browser console for errors (F12)

### Styles not applying
**Solution:** Tailwind not compiled
- Make sure you ran `npm install`
- Restart dev server: `npm run dev`
- Check that CSS imports are correct

---

## 📝 Component Reference

### Indicator.jsx
Shows the blue or red pulsing circle

**Props:**
- `isSharing` — Is screen being shared?
- `isRecording` — Is recording enabled?
- `animationEnabled` — Should animation play?

**Returns:**
- `null` if not sharing
- Blue solid circle if sharing (not recording)
- Red hollow circle if recording

### Controls.jsx
Buttons to toggle states

**Props:**
- `isSharing, setIsSharing` — Sharing state
- `isRecording, setIsRecording` — Recording state
- `animationEnabled, setAnimationEnabled` — Animation state

**Features:**
- Start/stop sharing
- Start/stop recording (disabled unless sharing)
- Toggle animation
- Info box with instructions

### MockCall.jsx
Simulates a video call interface

**Props:**
- `isSharing` — Whether screen is shared
- `isRecording` — Whether recording is on
- `animationEnabled` — Whether to animate

**Layout:**
- "Your Screen" (top) — What you see
- "Participant View" (bottom) — What others see

---

## 🎯 Next Phases

### Phase 1: Concept (Week 1)
- Design finalization
- Tech stack decision
- Component planning

### Phase 2: Core Build (Week 2)
- Build functional prototype
- Get all features working
- Basic testing

### Phase 3: Polish (Weeks 3-4)
- Smooth animations
- Refinements based on feedback
- Cross-browser testing

### Phase 4: Production (Weeks 5-6)
- Code quality improvements
- Accessibility compliance
- Deploy to Vercel
- Documentation

### Phase 5: Pitch (Weeks 7-8)
- Create demo video
- Write pitch deck
- Send to Zoom, Teams, Google Meet
- Document results

---

## 📞 Support

**Questions?** Check:
1. [QUICK_REFERENCE.md](./docs/QUICK_REFERENCE.md) — Quick lookup
2. Browser console — F12, check for errors
3. [PROJECT_PLAN.md](./docs/PROJECT_PLAN.md) — Full explanation

---

## 📄 License

MIT — Feel free to use and modify for learning

---

## 👤 Author

**Tanush** — B.Tech CSE Student, System Design Enthusiast

**Project Start:** April 2026  
**Goal:** Learn production software thinking + build pitchable prototype

---

## 🎓 Learning Philosophy

This project teaches:
- ✅ Problem-solving (identifying real UX issues)
- ✅ Product thinking (designing solutions)
- ✅ Engineering skills (building with modern tools)
- ✅ System design (how production software works)
- ✅ Execution (shipping something real)

---

## ✅ Checklist

- [ ] Dependencies installed
- [ ] Project structure created
- [ ] `npm run dev` works
- [ ] App opens in browser
- [ ] Blue indicator shows when sharing
- [ ] Red indicator shows when recording
- [ ] Animation toggles work
- [ ] All buttons functional
- [ ] Console has no errors

---

**Ready to build? Let's go! 🚀**
