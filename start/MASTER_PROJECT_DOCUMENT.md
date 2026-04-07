# SCREEN-SHARE INDICATOR PROTOTYPE — MASTER PROJECT DOCUMENT

**Version:** 1.0  
**Created:** April 2026  
**Project Duration:** 8 weeks (50-70 hours total)  
**Current Phase:** Week 1 (Transition - 20 mins/day, Days 1-2 complete)  
**Next Phase:** Week 1-2 (Continuation - understand components, experiment with modifications)

---

## 📋 PROJECT OVERVIEW

### The Problem
During silent video calls (Teams, Zoom, Google Meet), when everyone stops talking, you can't tell if:
- People are actually listening
- The connection dropped
- Screen sharing is still active

### The Solution
A small animated indicator in the corner of shared screens:
- **Blue pulsing circle** = Screen is being shared
- **Red hollow circle** = Screen is being shared AND recorded
- Can be toggled on/off
- Accessible for colorblind users (shape + animation speed distinction)

### Why This Project
1. **Real problem** - Tanush identified during actual Teams call
2. **Production thinking** - Learn how professional software is built
3. **Pitchable** - Can be pitched to Zoom, Teams, Google Meet
4. **Portfolio** - Demonstrates product thinking + engineering skills
5. **Learning** - Deep understanding of React, components, state management, system design

---

## 👤 DEVELOPER INFO

**Name:** Tanush  
**Status:** B.Tech CSE Final Semester (Graduating May 2026)  
**Background:** Strong in product/system design thinking, weaker in pure coding  
**Career Stage:** Between Ramco Systems internship and LTI Mindtree full-time offer  
**Learning Focus:** Production-grade software architecture, system design  
**Timezone:** IST (Indian Standard Time)  
**Session Time:** ~6-7 PM (flexible, transitional period)  
**Study Duration:** 8 weeks, starting early April 2026

---

## 🎯 PROJECT GOALS & TIMELINE

### 8-Week Plan

| Week | Phase | Time/Day | Goal | Deliverable |
|------|-------|----------|------|------------|
| 1-2 | **Transition** | 20 mins | Setup, rough prototype | Working app locally |
| 2 | **Phase 1: Concept** | 1 hr | Design locked, tech decided | Design spec confirmed |
| 2 | **Phase 2: Core** | 1 hr | Functional prototype | All features working |
| 3-4 | **Phase 3: Polish** | 1 hr | Smooth animations, refinement | Portfolio-ready prototype |
| 5-6 | **Phase 4: Production** | 1 hr | Code quality, accessibility, deploy | Live on Vercel, fully tested |
| 7-8 | **Phase 5: Pitch** | 1 hr | Demo video, pitch deck | Cold emails sent to companies |

**Total Time Investment:** ~50-70 hours over 8 weeks

---

## 🎨 DESIGN SPECIFICATION (LOCKED)

### Sharing State (Blue)
```
Color: #0066FF (high saturation blue)
Shape: Solid filled circle
Size: 30px diameter
Position: Top-right corner, 10px inset from edges
Animation: Pulsing (100% → 60% → 100%) over 2 seconds
Behavior: Appears when screen is shared, disappears when stopped
Visual Effect: Subtle breathing animation, not jarring
```

### Recording State (Red/Orange)
```
Color: #FF4500 (high saturation red/orange)
Shape: Hollow circle (outline only, no fill)
Stroke Width: 2-3px
Size: 30px diameter (same as sharing)
Position: Same as sharing (top-right, 10px inset)
Animation: Faster pulsing (100% → 40% → 100%) over 1 second
Behavior: Only appears when both sharing AND recording
Visual Effect: More urgent than sharing (faster pulse, more dramatic opacity change)
```

### Accessibility Features
- **Shape distinction:** Solid (sharing) vs. Hollow (recording) — primary distinction
- **Animation speed:** Slow 2s (sharing) vs. Fast 1s (recording) — secondary distinction
- **Color:** Blue (#0066FF) vs. Red (#FF4500) — tertiary distinction
- **Result:** Even colorblind users can distinguish via shape + animation speed
- **Future:** Can add text labels or high-contrast mode in Phase 4

### Interactive Controls
- **"Start/Stop Sharing" button** - Toggles screen sharing state
- **"Start/Stop Recording" button** - Only active when sharing, toggles recording
- **"Animation ON/OFF" button** - Toggles indicator animation (static vs animated)
- **Status display** - Shows current state of all three options

---

## 🛠 TECHNICAL STACK

### Frontend
- **React 18.2** - UI framework, component-based architecture
- **Vite 5.0** - Build tool, hot module replacement, fast dev server
- **Tailwind CSS 3.4** - Utility-first CSS, rapid styling, custom animations
- **JavaScript ES6+** - Modern syntax, async/await, destructuring

### Build & Development
- **npm** - Package manager
- **Node.js** (v18+) - Runtime environment
- **PostCSS** - CSS processing (required for Tailwind)
- **Autoprefixer** - Browser compatibility

### Deployment (Phase 4)
- **Vercel** - Free hosting, auto-deploys from GitHub
- **GitHub** - Version control, portfolio visibility

### Development Tools
- **VSCode** - Code editor
- **Git** - Version control
- **Browser DevTools** - Debugging

### Why This Stack
- **React:** Industry standard, teaches component architecture, used by Zoom/Teams
- **Vite:** Fast, modern, zero-config, excellent DX
- **Tailwind:** Rapid iteration, production-ready, custom animations support
- **Vercel:** Simplest deployment, free tier, GitHub integration

---

## 📁 PROJECT STRUCTURE

```
Screen_Recorder_project/
├── src/
│   ├── components/
│   │   ├── Indicator.jsx           # The blue/red pulsing circle (30 lines)
│   │   ├── Controls.jsx            # Buttons & state management UI (60 lines)
│   │   ├── MockCall.jsx            # Video call mock interface (80 lines)
│   │   └── [App.jsx moved here in future]
│   ├── App.jsx                     # Main component, state hub (70 lines)
│   ├── index.js                    # React entry point (10 lines)
│   └── index.css                   # Global styles, Tailwind imports (20 lines)
├── public/
│   └── index.html                  # HTML entry point (30 lines)
├── docs/
│   ├── PROGRESS.md                 # Daily progress tracking
│   ├── PROJECT_PLAN.md             # 8-week roadmap
│   ├── DESIGN_SPEC.md              # Design details (locked)
│   ├── WEEK1_WEEK2_SCHEDULE.md    # Daily breakdown for transition
│   ├── TECH_STACK_EXPLAINED.md    # Why each tool
│   ├── QUICK_REFERENCE.md          # Colors, sizes, schedule
│   └── [WEEK1_DAY1.md, WEEK1_DAY2.md, etc.]
├── .gitignore                      # Git ignore rules
├── package.json                    # Dependencies & scripts
├── package-lock.json               # Exact versions (auto-generated)
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind customization (animations, colors)
├── postcss.config.js               # PostCSS plugins
└── README.md                       # Project overview

Total lines of code (MVP): ~270 lines (very manageable)
```

---

## 🔧 COMPONENT ARCHITECTURE

### Component Hierarchy
```
<App />                              (State management)
├── <MockCall />                    (Display - two video screens)
│   ├── "Your Screen"
│   │   └── <Indicator />          (Blue/red circle, animated)
│   └── "Participant View"
│       └── <Indicator />          (Same indicator, confirms state)
└── <Controls />                    (User input - buttons)
    ├── "Start/Stop Sharing" button
    ├── "Start/Stop Recording" button
    ├── "Animation ON/OFF" button
    └── Info boxes (displays current state)
```

### Data Flow
```
App.jsx (Brain)
  ├─ State: isSharing (boolean)
  ├─ State: isRecording (boolean)
  ├─ State: animationEnabled (boolean)
  │
  ├─→ Pass DOWN (props):
  │   ├─ isSharing, isRecording, animationEnabled → MockCall
  │   └─ setIsSharing, setIsRecording, setAnimationEnabled → Controls
  │
  └─ Receive UP (callbacks):
      ├─ MockCall: just displays (no callbacks)
      └─ Controls: calls setState functions
```

### Component Responsibilities

**App.jsx:**
- Owns all state (isSharing, isRecording, animationEnabled)
- Passes state down as props
- Passes setState functions down to Controls
- Orchestrates the entire app

**MockCall.jsx:**
- Displays two video screens (mock)
- Shows Indicator component in both
- Receives props, doesn't modify state
- Pure display component

**Indicator.jsx:**
- Shows blue or red circle based on props
- Applies animations via Tailwind classes
- Returns null if not sharing
- Pure display component (no state)

**Controls.jsx:**
- Shows three buttons
- Each button has onClick handler
- Calls setState functions from App
- Shows instructions & current status
- Pure input component

---

## 🧠 KEY CONCEPTS FOR DEVELOPERS

### 1. React Components
A component is a JavaScript function that returns JSX (HTML-like code).

```javascript
function Indicator({ isSharing, isRecording, animationEnabled }) {
  if (!isSharing) return null
  
  const isRecording = isSharing && isRecording
  const color = isRecording ? '#FF4500' : '#0066FF'
  const animation = isRecording ? 'animate-pulse-fast' : 'animate-pulse-slow'
  
  return <div className={`w-8 h-8 rounded-full ${animation}`}></div>
}
```

**Key points:**
- Takes props as input
- Returns JSX (looks like HTML)
- Can have conditional logic
- No state (just displays what it receives)

### 2. State & useState Hook
State is data that can change. When it changes, React re-renders.

```javascript
const [isSharing, setIsSharing] = useState(false)
// isSharing = current value
// setIsSharing = function to change it
// useState(false) = initial value

// When user clicks button:
setIsSharing(true)  // Change state
// React detects change
// Component re-renders
// Props update
// Indicator shows
```

**Lifecycle:**
1. Component renders first time: isSharing = false
2. User clicks button: setIsSharing(true)
3. State updates: isSharing = true
4. React re-renders: component runs again
5. New props flow to children: <MockCall isSharing={true} />
6. Children re-render with new props
7. UI updates: indicator appears

### 3. Props (Properties)
Props are how parent components talk to children.

```javascript
// In App.jsx
<MockCall isSharing={isSharing} isRecording={isRecording} />

// In MockCall.jsx
function MockCall({ isSharing, isRecording }) {
  // Now MockCall can use these values
  // Can't change them (they're read-only)
  // If parent changes state, new props flow down
}
```

**Key points:**
- One-way flow (parent → child)
- Read-only in child
- Change in parent = new props in child = re-render

### 4. Conditional Rendering
Show different things based on state.

```javascript
// Show different text based on state
{isSharing ? 'Stop Sharing' : 'Start Sharing'}

// Return nothing if condition not met
if (!isSharing) return null

// Show component only if condition true
{isSharing && <Indicator />}
```

### 5. Tailwind CSS
Use utility classes instead of writing CSS.

```javascript
className="w-8 h-8 rounded-full bg-blue-500 animate-pulse"
// w-8 = width 32px
// h-8 = height 32px
// rounded-full = border-radius 9999px
// bg-blue-500 = background color
// animate-pulse = animation class (custom-defined)
```

**Custom animations** (in tailwind.config.js):
```javascript
keyframes: {
  'pulse-slow': {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '0.6' },
  },
}
animation: {
  'pulse-slow': 'pulse-slow 2s ease-in-out infinite',
}
```

### 6. Event Handling
Buttons trigger functions.

```javascript
<button onClick={() => setIsSharing(!isSharing)}>
  {isSharing ? 'Stop' : 'Start'}
</button>

// When clicked:
// onClick fires
// Arrow function executes
// setIsSharing(!isSharing) is called
// !isSharing flips the boolean
// State updates
// Component re-renders
```

---

## 💻 SETUP STATUS

### ✅ Completed
- Project folder created: `C:\Users\ASUS\Screen_Recorder_project`
- All dependencies installed (React, Vite, Tailwind)
- Project structure created (src/, public/, docs/, etc.)
- All configuration files created (package.json, vite.config.js, tailwind.config.js, postcss.config.js, .gitignore)
- All component files created (App.jsx, Indicator.jsx, Controls.jsx, MockCall.jsx)
- HTML entry point created (public/index.html)
- React entry point created (src/index.js)
- Global CSS created (src/index.css)
- All documentation created

### ✅ Running
- `npm run dev` starts the development server
- App loads at `http://localhost:3000`
- All buttons work
- Indicator appears/disappears correctly
- Animations (pulse-slow and pulse-fast) work
- No console errors

### 📝 Current Progress (Week 1)
- **Day 1:** Completed - Understand project structure and how components connect
- **Day 2:** Partial - Learn React hooks and useState, practice modifications

### ⏭️ Next Steps
1. Understand each component in detail
2. Practice modifying colors, sizes, animation speeds
3. Learn how props flow and state updates trigger re-renders
4. Experiment with conditional rendering
5. Move to Phase 2 (Week 2) - Build additional features, polish animations

---

## 📚 COMPONENT CODE REFERENCE

### App.jsx (Main Component - 70 lines)
**Purpose:** Manages all state, orchestrates child components

**Key Code:**
```javascript
import { useState } from 'react'
import Indicator from './components/Indicator'
import Controls from './components/Controls'
import MockCall from './components/MockCall'

export default function App() {
  // State management
  const [isSharing, setIsSharing] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [animationEnabled, setAnimationEnabled] = useState(true)

  return (
    <div className="...dark theme...">
      <h1>Screen Share Indicator Prototype</h1>
      
      <div className="...grid layout...">
        {/* Left side: Video call mockup */}
        <MockCall
          isSharing={isSharing}
          isRecording={isRecording}
          animationEnabled={animationEnabled}
        />
        
        {/* Right side: Controls */}
        <Controls
          isSharing={isSharing}
          setIsSharing={setIsSharing}
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          animationEnabled={animationEnabled}
          setAnimationEnabled={setAnimationEnabled}
        />
      </div>
      
      {/* Status info */}
      <div>
        Sharing: {isSharing ? 'ON' : 'OFF'}
        Recording: {isRecording ? 'ON' : 'OFF'}
        Animation: {animationEnabled ? 'ON' : 'OFF'}
      </div>
    </div>
  )
}
```

**What to understand:**
- Where state is created (useState calls)
- How state is passed down (props)
- How setState functions are passed to Controls
- Why App is the "brain"

---

### Indicator.jsx (Animation Component - 30 lines)
**Purpose:** Shows the blue/red pulsing circle

**Key Code:**
```javascript
export default function Indicator({ isSharing, isRecording, animationEnabled }) {
  // Don't show if not sharing
  if (!isSharing && !isRecording) {
    return null
  }

  // Determine state
  const isInRecordingMode = isSharing && isRecording

  // Build class string
  const baseClasses = `
    absolute top-3 right-3
    w-8 h-8 rounded-full
    border-2
  `

  const stateClasses = isInRecordingMode
    ? `border-[#FF4500] bg-transparent ${animationEnabled ? 'animate-pulse-fast' : ''}`
    : `bg-[#0066FF] ${animationEnabled ? 'animate-pulse-slow' : ''}`

  return (
    <div className={baseClasses + stateClasses} title={isInRecordingMode ? 'REC' : 'SHARE'}>
      <span className="text-xs font-bold">
        {isInRecordingMode ? 'REC' : 'SHARE'}
      </span>
    </div>
  )
}
```

**What to understand:**
- How props control behavior
- Conditional rendering (return null)
- Class string building based on state
- Animation classes from Tailwind

---

### Controls.jsx (Input Component - 60 lines)
**Purpose:** Shows buttons and handles user input

**Key Code:**
```javascript
export default function Controls({
  isSharing, setIsSharing,
  isRecording, setIsRecording,
  animationEnabled, setAnimationEnabled,
}) {
  return (
    <div className="...controls panel...">
      {/* Sharing button */}
      <button onClick={() => setIsSharing(!isSharing)}>
        {isSharing ? '⏹ Stop Sharing' : '▶ Start Sharing'}
      </button>

      {/* Recording button - disabled if not sharing */}
      <button 
        onClick={() => setIsRecording(!isRecording)}
        disabled={!isSharing}
      >
        {isRecording ? '⏹ Stop Recording' : '⏺ Start Recording'}
      </button>

      {/* Animation button */}
      <button onClick={() => setAnimationEnabled(!animationEnabled)}>
        {animationEnabled ? '✨ Animation ON' : '🔇 Animation OFF'}
      </button>
    </div>
  )
}
```

**What to understand:**
- How onClick handlers work
- How to call setState functions
- Conditional button text
- Disabled state logic

---

### MockCall.jsx (Display Component - 80 lines)
**Purpose:** Shows video call interface with indicator

**Key Code:**
```javascript
import Indicator from './Indicator'

export default function MockCall({
  isSharing,
  isRecording,
  animationEnabled,
}) {
  return (
    <div>
      {/* Your Screen */}
      <div className="...video box...">
        <div className="relative">
          {/* Content */}
          <div>Your Screen / Camera Feed</div>
          
          {/* Indicator always visible if sharing */}
          <Indicator
            isSharing={isSharing}
            isRecording={isRecording}
            animationEnabled={animationEnabled}
          />
        </div>
      </div>

      {/* Participant View */}
      <div className="...video box...">
        <div className="relative">
          {/* Content */}
          <div>What participants see</div>
          
          {/* Indicator visible if sharing */}
          {isSharing && (
            <Indicator
              isSharing={isSharing}
              isRecording={isRecording}
              animationEnabled={animationEnabled}
            />
          )}
        </div>
      </div>
    </div>
  )
}
```

**What to understand:**
- How to use child components
- Passing props down to children
- Conditional rendering of components
- Two identical indicators in different places

---

## 🧪 MODIFICATIONS YOU CAN TRY

### 1. Change Blue Color
**File:** `src/components/Indicator.jsx`  
**Change:** `bg-[#0066FF]` to `bg-[#00D9FF]` (cyan)  
**Result:** Blue circle becomes cyan

### 2. Change Animation Speed
**File:** `tailwind.config.js`  
**Change:** `'pulse-slow': 'pulse-slow 2s ...` to `'pulse-slow': 'pulse-slow 3s ...`  
**Result:** Blue circle pulses slower (3s instead of 2s)

### 3. Change Indicator Size
**File:** `src/components/Indicator.jsx`  
**Change:** `w-8 h-8` to `w-10 h-10`  
**Result:** Indicator becomes bigger (40px instead of 32px)

### 4. Move Indicator Position
**File:** `src/components/Indicator.jsx`  
**Change:** `top-3 right-3` to `bottom-3 left-3`  
**Result:** Indicator moves to bottom-left

### 5. Change Opacity Intensity
**File:** `tailwind.config.js`  
**Change:** `'50%': { opacity: '0.6' }` to `'50%': { opacity: '0.3' }`  
**Result:** Blue circle pulses more dramatically

---

## 📖 LEARNING RESOURCES IN PROJECT

| File | Purpose | When to Read |
|------|---------|-------------|
| `README.md` | Project overview | First time setup |
| `QUICK_START.md` | Quick copy-paste guide | Initial setup |
| `SETUP_INSTRUCTIONS.md` | Detailed setup steps | If stuck on setup |
| `WEEK1_DAY1.md` | Architecture explanation | Day 1 |
| `WEEK1_DAY2.md` | React hooks & useState | Day 2 |
| `PROGRESS.md` | Track daily learning | Update after each session |
| `DESIGN_SPEC.md` | Design locked in | Reference during build |
| `TECH_STACK_EXPLAINED.md` | Why each tool | When confused about tech choices |
| `PROJECT_PLAN.md` | Full 8-week roadmap | When planning next phase |

---

## ✅ CURRENT CHECKLIST

### Setup
- [x] Project folder created
- [x] npm initialized
- [x] Dependencies installed
- [x] Folder structure created
- [x] All files created and filled
- [x] App running locally
- [x] No errors in console

### Learning (Week 1)
- [x] Day 1: Understood architecture
- [x] Day 2: Learning React hooks
- [ ] Days 3-5: Practice modifications, experiment, finalize understanding

### Next Phase (Week 2)
- [ ] Finalize design understanding
- [ ] Plan Phase 2 features
- [ ] Begin testing modifications
- [ ] Prepare for full 1-hour daily sessions

---

## 🚀 HOW TO USE THIS DOCUMENT

### For Claude Code / Copilot
Copy this entire document into your AI assistant and provide this context:

**Prompt Example:**
```
I'm building a screen-share indicator prototype in React.

[PASTE THIS ENTIRE DOCUMENT]

Current task: [SPECIFIC TASK YOU WANT TO DO]

Please:
1. Understand the full project context
2. Explain what we're doing and why
3. Provide the solution with comments
4. Explain what you changed and why
```

### For Specific Tasks
You can now ask Claude Code or Copilot:

**Example 1:** "Based on the project document, can you explain how useState works in App.jsx?"

**Example 2:** "I want to change the sharing indicator color from blue to purple. Show me exactly what to change and why."

**Example 3:** "Walk me through what happens when a user clicks the 'Start Sharing' button, from the click to the indicator appearing."

**Example 4:** "Can you help me add a new feature: a text label next to the indicator saying what state we're in?"

---

## 📞 TROUBLESHOOTING

### Common Issues

| Issue | Solution |
|-------|----------|
| App won't start | Run `npm install`, then `npm run dev` |
| Styles look wrong | Restart dev server, check Tailwind config |
| Indicator doesn't show | Click "Start Sharing" first, check console |
| Animation not working | Check tailwind.config.js animation definitions |
| Port 3000 in use | Run `npm run dev -- --port 3001` |
| Colors not right | Check hex codes in Indicator.jsx (include # symbol) |
| Component not rendering | Check imports at top of file |
| Props undefined | Check App.jsx passes correct props |

---

## 🎓 WHAT THIS PROJECT TEACHES

### Core Concepts
1. **Component Architecture** - How to break UI into reusable pieces
2. **State Management** - How to manage data that changes
3. **Props & Data Flow** - How parent-child communication works
4. **React Hooks** - useState and how it works internally
5. **Rendering & Re-renders** - When and why React updates the UI
6. **Conditional Rendering** - Showing different things based on state
7. **CSS-in-JS** - Using Tailwind for styling
8. **Animations** - Keyframes and animation timing
9. **Build Tools** - How Vite and Tailwind work together
10. **Development Workflow** - Hot reloading, debugging, iteration

### Professional Skills
1. **System Design Thinking** - Breaking problems into components
2. **Code Organization** - Folder structure, file organization
3. **Production Thinking** - Accessibility, performance, scalability
4. **Iteration & Feedback** - Building incrementally, testing
5. **Documentation** - Explaining your code and decisions
6. **Version Control** - Git workflows (Phase 4)
7. **Deployment** - Hosting and sharing (Phase 4)

---

## 📊 PROGRESS TRACKING

**Week 1 Current Status:**
- Setup: ✅ Complete
- Day 1 (Architecture): ✅ Complete
- Day 2 (Hooks & useState): 🔄 In Progress
- Days 3-5: ⏳ Upcoming

**Success Criteria for Week 1-2:**
- [ ] Full understanding of all components
- [ ] Can modify code and see changes
- [ ] Understand how state flows through app
- [ ] Can explain React concepts to someone else
- [ ] App runs without errors
- [ ] All animations work correctly

---

## 🎯 NEXT SESSION AGENDA

**When ready to continue:**
1. Review this master document in your AI tool
2. Provide specific task or question
3. AI will have full context and can help effectively
4. Continue with Day 3 or specific modification

**Suggested next tasks:**
- Experiment with color modifications
- Change animation speeds
- Move indicator position
- Understand event handling in depth
- Plan Phase 2 features

---

## 📝 FINAL NOTES

This is a **real, production-grade project** that teaches:
- ✅ How actual companies build software
- ✅ Component-based architecture
- ✅ Professional tooling and workflows
- ✅ Thinking in terms of state, props, and re-renders
- ✅ Problem-solving and incremental development

You have **all the code, all the documentation, and full context** to:
- Continue learning
- Modify and experiment
- Understand the "why" behind each decision
- Build similar projects in the future
- Pitch this to real companies in Week 7-8

**The project is solid. You're ready to continue with any AI tool.** 🚀

---

**Questions? Ask your AI tool with this document as context. It has everything needed to help effectively.**
