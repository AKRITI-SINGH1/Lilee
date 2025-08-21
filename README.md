<div align="center">

# ✨ Lilee

Build, run, and play with full-stack templates — right in your browser.

<a href="https://nextjs.org"><img alt="Next.js" src="https://img.shields.io/badge/Next.js-15-black?logo=next.js" /></a>
<a><img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" /></a>
<a><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" /></a>
<a><img alt="Prisma" src="https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma&logoColor=white" /></a>
<a><img alt="NextAuth.js" src="https://img.shields.io/badge/NextAuth.js-v5-000?logo=nextdotjs&logoColor=white" /></a>
<a><img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white" /></a>
<a><img alt="WebContainers" src="https://img.shields.io/badge/WebContainers-🚀-6C5CE7" /></a>
<a><img alt="xterm.js" src="https://img.shields.io/badge/xterm.js-5-0A0A0A?logo=gnometerminal&logoColor=white" /></a>
<a><img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwindcss&logoColor=white" /></a>
<a><img alt="shadcn/ui" src="https://img.shields.io/badge/shadcn/ui-❤️-111827" /></a>

<br/>

</div>

> A Next.js 15 app featuring an in-browser coding playground (WebContainers), Monaco editor with AI inline suggestions, a slick terminal (xterm.js), OAuth via NextAuth + Prisma (MongoDB), AI chat with Markdown/Math, and a modern shadcn/ui + Tailwind design.

---

## 📸 Preview

Coming soon — drop a GIF/screenshot of the playground + terminal here!

---

## 🧩 Features
- 🧪 Playground with Monaco: syntax highlight, smooth editing, AI inline suggestions
- 🖥️ In-browser terminal (xterm.js): run, search, copy, clear, download logs
- 📦 Starter templates in `lileecode-starters/*`
- 🤖 AI chat: Markdown + code blocks + KaTeX math
- 🔐 Auth: GitHub/Google via NextAuth v5 (JWT) + PrismaAdapter
- 🗄️ Data: Prisma v6 + MongoDB (User, Account, Playground, TemplateFile, StarMark, ChatMessage)
- 🎨 UI: Tailwind CSS + shadcn/ui components

---

## 🛠️ Tech Stack
- Next.js 15 (App Router), React 19, TypeScript 5
- Prisma 6 + MongoDB Atlas
- next-auth v5 beta, @auth/prisma-adapter
- @webcontainer/api, xterm (+ fit, search, weblinks)
- @monaco-editor/react, react-markdown, remark-math, rehype-katex, react-syntax-highlighter (Prism)
- Tailwind CSS, shadcn/ui, Zustand

---

## ⚙️ Requirements
- Node.js 18+ (20+ recommended)
- npm/pnpm/yarn
- MongoDB connection string
- GitHub/Google OAuth credentials (optional but recommended)

---

## 🔐 Environment Variables
Create `.env.local` in the root:

```
DATABASE_URL="mongodb+srv://USER:PASSWORD@HOST/db?retryWrites=true&w=majority"
AUTH_SECRET=your-random-secret
NEXTAUTH_URL=http://localhost:3000
GITHUB_ID=...           # optional
GITHUB_SECRET=...       # optional
GOOGLE_ID=...           # optional
GOOGLE_SECRET=...       # optional
```

Tip: generate a secret → `openssl rand -base64 32`

---

## 🚀 Quick Start
```bash
# 1) Install deps
npm install

# 2) Prisma client + schema
npx prisma generate
npx prisma db push

# 3) Run dev server
npm run dev
# Open http://localhost:3000
```

Scripts: `dev`, `build`, `start`, `lint`.

---

## 🗂️ Project Structure (highlights)
```
app/
  api/auth/...           # NextAuth routes
  api/template/[id]      # Template JSON generator
  playground/[id]        # Playground page
features/
  playground/            # Editor, file explorer, helpers
  webcontainers/         # xterm terminal, preview
  ai-chat/               # Markdown/Math/Code chat UI
lib/
  db.ts                  # Prisma client
  template.ts            # Starter template paths
prisma/
  schema.prisma          # Models
lileecode-starters/      # Template sources
```

---

## 🧯 Troubleshooting
- 🖥️ Terminal: ensure the container is visible and has non-zero height on mount
- 🔁 Prisma: re-run `npx prisma generate` if client types drift
- ⛓️ MongoDB: use `npx prisma db push` to sync schema
- 🔑 OAuth: configure callbacks in GitHub/Google console

---

## 🤝 Contributing
Issues and PRs welcome. Make it yours.

## 📜 License
- Starters under `lileecode-starters/` have their own licenses
- Project license: add your preferred license

<div align="center">

Made with ❤️  for the web.

</div>
