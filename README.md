# SkillGap - AI-Powered Career Roadmap

SkillGap is a modern web application that analyzes resumes and provides personalized career growth roadmaps using AI.

## 🚀 Getting Started

1. Install dependencies: `npm install`
2. Set up your `.env.local` with your `GROQ_API_KEY`.
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

---

## 🎓 Examiner's Guide: Project Structure

If an examiner asks about the files in the left sidebar, here is the simple 1-sentence explanation for each:

### 📁 Folders
- **`src/`**: Contains all the source code of the application (where the magic happens).
- **`public/`**: Static assets like images, fonts, and icons.
- **`.next/`**: (Hidden) Temporary folder created when the app runs; it contains the optimized build.
- **`node_modules/`**: (Hidden) Contains all the third-party libraries/tools used in the project.

### 📄 Configuration Files
- **`package.json`**: The "ID card" of the project; lists the name, version, and all libraries used.
- **`.env.local`**: Stores secret "Environment Variables" (like API keys) that shouldn't be shared publicly.
- **`.gitignore`**: Tells Git which files to ignore (like secret keys or heavy temporary folders).
- **`tsconfig.json`**: Configuration for TypeScript (ensures the code is typed correctly and error-free).
- **`next.config.ts`**: Main configuration for Next.js settings.
- **`postcss.config.mjs`**: Configuration for PostCSS, which helps in processing our CSS/Tailwind.
- **`eslint.config.mjs`**: Rules for the "Linter" which checks our code for small mistakes and style issues.
- **`next-env.d.ts`**: A technical file that helps TypeScript understand Next.js specific features.

---

## 🛠️ Tech Stack
- **Framework**: Next.js 15 (React)
- **Styling**: Tailwind CSS
- **AI Engine**: Groq API (Llama 3)
- **Animations**: Framer Motion
