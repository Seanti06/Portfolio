# Modern Developer Portfolio

A pixel-perfect, clean, and responsive developer portfolio website inspired directly by your design mockup.

---

## ⚡ 1. How to Run on `localhost` (Choose either method)

### Method A: One-Click Start (Windows)
Double-click the **`start-server.bat`** file in this folder.
It will start the server and automatically launch your browser at:
```
http://localhost:3000
```

### Method B: Terminal / Command Prompt
Open PowerShell or Command Prompt in this folder and run:
```bash
python serve.py
```
*(Or simply open `index.html` directly in any web browser!)*

---

## 🎨 2. How to Personalize Your Portfolio

All your content is located in clean, well-commented files:

### 1. Change Your Name & Bio:
Open [index.html](file:///c:/Users/SEAN/Portfolio/index.html) and search for:
- Replace `Your Name` with your real name.
- Replace `Full Stack Developer` with your actual title or specialization.
- Replace the bio text under the Hero and About Me sections with your personal story.

### 2. Update Your Profile Photo:
- Place your photo into `assets/images/` and name it `profile.jpg` (or change the path in `index.html`).

### 3. Update Your Resume:
- Place your PDF resume in `assets/` and name it `resume.pdf`.

### 4. Update Projects & Links:
In [index.html](file:///c:/Users/SEAN/Portfolio/index.html), customize:
- Project titles, descriptions, and tech stacks in the **Selected Projects** section.
- GitHub and Live Demo URLs on each card.
- Your social links (GitHub, LinkedIn, Email) in the sidebar.

---

## 🌐 3. How to Publish for Free on the Internet

Once you're satisfied with how it looks on `localhost`, choose any of these free hosting platforms:

### Option 1: GitHub Pages (Recommended — 100% Free)
1. Go to [github.com](https://github.com) and create a new public repository (e.g., `portfolio` or `<your-username>.github.io`).
2. In your terminal in this folder, run:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```
3. In your GitHub repository:
   - Go to **Settings** > **Pages** (in the left sidebar).
   - Under **Build and deployment** > **Branch**, select `main` branch and `/ (root)` folder.
   - Click **Save**.
4. In 1–2 minutes, your website will be live at:
   `https://<your-username>.github.io/<your-repo-name>/`

---

### Option 2: Netlify (Drag-and-Drop — Fastest & No Terminal Required)
1. Go to [netlify.com](https://www.netlify.com) and sign up for a free account.
2. In the Netlify dashboard, go to **Sites**.
3. Simply drag and drop this entire `Portfolio` folder into the upload box on Netlify.
4. Your site is live instantly with an SSL-secured URL (e.g., `https://your-portfolio.netlify.app`), and you can connect a custom domain anytime for free!

---

### Option 3: Vercel (Free & Instant)
1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account.
2. Click **Add New...** > **Project**.
3. Import your GitHub repository.
4. Click **Deploy**. Vercel will build and serve your static site globally in seconds.
