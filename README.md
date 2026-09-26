# 💪 FitLog — Workout Library & Routine Planner

A dark, sleek, no-nonsense gym companion application built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS**. Pick your lifts, lock them into today's routine, and monitor your training volume in real-time.

---

## 🚀 Live Demo & Repository

- **🌐 Live Demo (Vercel):** [https://fitlog-ten-ebon-33.vercel.app/](https://fitlog-ten-ebon-33.vercel.app/)
- **📁 GitHub Repository:** [https://github.com/mahmudulhasanmaruf78/fitlog](https://github.com/mahmudulhasanmaruf78/fitlog)

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Typography:** [Google Fonts](https://fonts.google.com/) (`Oswald` for high-impact uppercase display & `Inter` for clean body UI)
- **State Management:** React Context API + LocalStorage Synchronization
- **Deployment:** [Vercel](https://vercel.com/) with Turbopack static route pre-generation (`generateStaticParams`)

---

## ⚡ Key Features

### 1. 🔝 Sticky Navigation Bar with Real-time Pill Badges
- Modern dark navbar with glowing brand logo and route awareness (`Workouts` vs `My Plan`).
- Real-time pill counters:
  - **Plan Badge:** High-visibility neon lime badge (`#ccff00`) displaying current active lifts.
  - **Saved Badge:** Minimalist white bordered pill showing bookmarked workouts.
  - Both badges link directly to `/my-plan`.
  - Mobile-responsive navigation drawer.

### 2. 🅱️ High-Energy Hero Section with Smooth Anchor Scroll
- High-contrast visual layout featuring custom gym anime character art.
- Impactful typography: *"TRAIN WITH INTENT. LOG EVERY SET."*
- Interactive CTA button **"BROWSE WORKOUTS"** with auto smooth-scrolling directly down to `#library`.

### 3. ⚖️ 12-Lift Workout Library with Interactive Multi-Criteria Sorting
- Displays 12 comprehensive exercises targeting all primary muscle groups (Chest, Arms, Back, Legs, Core, Shoulders).
- **Challenge Requirement (C1):** Interactive `Sort By` dropdown offering instant client-side sorting by:
  - **Duration** (Ascending order)
  - **Calories** (Descending caloric burn)
  - **Rating** (Highest user score)
- Custom animated skeleton loading state during initial fetch.
- Each card highlights category pills, required gym equipment, and iconic stats row (duration, calories, star rating).

### 4. 📋 Rich Two-Column Workout Detail View (`/workout/[id]`)
- Left column: High-resolution artwork display.
- Right column: Clean specification grid detailing **Equipment**, **Difficulty**, **Sets**, **Reps**, **Duration**, **Calories**, and **Rating**.
- Formatted **4-step execution instructions** guiding proper lifting mechanics.
- Action buttons:
  - **Add to today's plan** (Enforces strict 5-lift cap and disables when plan is full).
  - **Save for later** bookmarking toggle.
- Pre-rendered statically via `generateStaticParams()` to guarantee instant reload safety on production hosts.

### 5. 📊 Interactive "My Plan" Dashboard & Real-time Metrics
- Live metric calculation cards tracking:
  - **Exercises** (in neon lime)
  - **Total Minutes**
  - **Total Calories Burned**
- Dual-tab filtering between **"Today's Plan"** and **"Saved"** collections.
- Horizontal plan cards complete with thumbnail, equipment tag, and quick-action toolbars.

### 6. ✅ "Mark as Done" & Remove Actions with Toast Notifications
- **Challenge Requirement (C3):**
  - **"Mark as Done"** checkmark button toggles completed status with instant visual strike-through feedback and toast notification.
  - **Remove (✕)** button instantly purges workout from the active plan and updates all navbar counters.
- **Top-Right Toast Notifications:** Clean, high-contrast alerts positioned at the top-right corner (`top-6 right-6`) confirming state additions, removals, and completions.

### 7. 💾 LocalStorage Persistence & Zero-Crash Fallback Engine
- Persistent local storage: Added workouts and saved routines remain intact across browser refreshes and tab re-openings.
- Embedded data fallback architecture: Prevents Cloudflare worker rate-limiting (`429 Too Many Requests`) from crashing the user experience.

### 8. 🚫 Custom 404 Error Page
- Fully themed gym-companion 404 page with return route button for non-existent URLs.

---

## 💻 Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mahmudulhasanmaruf78/fitlog.git
   cd fitlog
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Production Build:**
   ```bash
   npm run build
   npm run start
   ```

---

## 📝 Author & Submission Info
- **Project:** FitLog (Programming Hero Assignment 6)
- **Live URL:** [https://fitlog-ten-ebon-33.vercel.app/](https://fitlog-ten-ebon-33.vercel.app/)
- **Repository:** [https://github.com/mahmudulhasanmaruf78/fitlog](https://github.com/mahmudulhasanmaruf78/fitlog)
