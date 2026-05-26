# Adarsh Singh – Cybersecurity Portfolio

![Demo Screenshot](screenshot.png)

A premium, interactive web portfolio showcasing **Adarsh Singh**'s cybersecurity expertise.  
Built with **HTML5, CSS3, and vanilla JavaScript**, the site mimics a hacker‑style terminal, canvas radar visualisation, scroll‑triggered skill animations, and simulated security‑scan modals.

---

## ✨ Features
- **Full‑screen hero** with dark‑mode glassmorphism and gradient accents.
- **Interactive terminal emulator** – type `help`, `about`, `skills`, `projects`, `certs`, `contact`, `matrix`, `clear`.
- **Canvas radar background** that reacts to mouse movement.
- **Scroll‑triggered skill progress bars** (via `IntersectionObserver`).
- **Project cards** with on‑demand simulated security scans.
- **Dynamic latency simulator** and real‑time status badges.
- **Responsive layout** – works on desktop, tablet, and mobile.
- **Vercel‑ready configuration** (`vercel.json`) for SPA fallback.

---

## 🛠️ Tech Stack
| Layer | Technology |
|------|------------|
| Markup | HTML5 |
| Styling | CSS3 (custom design tokens, glassmorphism, animations) |
| Logic | Vanilla JavaScript (ES6+) |
| Fonts | Fira Code, Orbitron, Plus Jakarta Sans, JetBrains Mono |
| Hosting | Vercel (static site) |

---

## 📦 Getting Started (Local Development)
```bash
# Clone the repo (after you push it)
git clone https://github.com/enm251/Portfolio.git
cd Portfolio

# No build step – just serve the files
# Option 1 – using live‑server (npm)
npm i -g live-server
live-server .

# Option 2 – Python simple server
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```
The site should load instantly.  All interactivity works without any backend.

---

## 🚀 Deploy to Vercel
1️⃣ Make sure `vercel.json` exists (already in the repo).  
2️⃣ Push the repo to GitHub.  
3️⃣ In the Vercel dashboard click **"New Project"**, import the GitHub repo, and deploy.  
Vercel automatically detects the static site and applies the rewrite rule so any route loads `index.html`.

---

## 🎨 Customisation
- **Colors & gradients** – edit the CSS variables in `style.css` under `:root`.
- **Terminal commands** – modify the `commands` object in `script.js`.
- **Project scan logs** – update the `vulnSageLogs` and `reconLogs` arrays in `script.js`.

---

## 🤝 Contributing
Feel free to open issues or submit pull‑requests if you spot bugs or want to add features such as:
- Dark‑mode toggle
- Additional project cards
- Real backend integration for the contact form

---

## 📄 License
This portfolio is released under the **MIT License** – you’re free to fork, modify, and reuse it for personal or commercial purposes.

---

*Built with love, neon glow, and a pinch of cyber‑hacker aesthetics.*
