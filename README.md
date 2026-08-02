# 🦉 Happy Girlfriend's Day — For Ullu

A romantic single-page website built with Next.js 14, Framer Motion, and Tailwind CSS.

---

## 🚀 Run Locally

```bash
cd happy-girlfriends-day
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ✏️ Personalize

All text, memories, and coupons are in **one file**:

```
src/utils/constants.ts
```

### Add Your Photos

1. Drop photos into `public/images/`
2. Open `src/utils/constants.ts`
3. Find each memory's `image: null` and change it to `image: "/images/your-photo.jpg"`

### Add Background Music

1. Drop your `.mp3` file into `public/audio/`
2. Rename it to `song.mp3`
3. The floating music button (bottom-right) will play it

---

## 🌐 Deploy to Netlify (Free)

### Step 1: Push to GitHub

```bash
# In the project folder:
git init
git add .
git commit -m "🦉 Happy Girlfriend's Day"

# Create a new repo on GitHub (github.com/new), then:
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Netlify

1. Go to [netlify.com](https://netlify.com) and sign up / log in (free)
2. Click **"Add new site"** → **"Import an existing project"**
3. Select **GitHub** and authorize Netlify
4. Pick your repo from the list
5. Set these build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
6. Click **"Deploy site"**

### Step 3: Get Your Link

Netlify will give you a URL like `random-name-12345.netlify.app`.

**To rename it** (e.g., `for-ullu.netlify.app`):
1. Go to **Site settings** → **Domain management**
2. Click **"Options"** next to your Netlify subdomain → **"Edit site name"**
3. Type your preferred name (e.g., `for-ullu`)

### Step 4: Custom Domain (Optional)

1. In **Domain management** → **"Add custom domain"**
2. Enter your domain and follow the DNS instructions
3. Netlify provides free HTTPS automatically

---

## 🏗️ Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Fonts, meta tags, grain overlay
│   ├── page.tsx            # Assembles all sections
│   └── globals.css         # Design system, animations, textures
├── components/
│   ├── Hero.tsx            # Letter-by-letter name + typewriter
│   ├── Apology.tsx         # Handwritten letter card
│   ├── Timeline.tsx        # Memory timeline (4 cards)
│   ├── LiveCounter.tsx     # Live days/hours/mins/secs counter
│   ├── ReasonsGrid.tsx     # 8 flip-to-reveal reason cards
│   ├── CouponBook.tsx      # 6 IOU coupon cards (3D flip)
│   ├── ClosingNote.tsx     # Final love note + confetti
│   ├── Footer.tsx          # Minimal footer
│   ├── ScrollProgress.tsx  # Top gradient progress bar
│   ├── MusicToggle.tsx     # Floating audio toggle
│   ├── FloatingParticles.tsx # Owl + petal particles
│   └── CursorGlow.tsx      # Cursor-follow glow (desktop)
├── hooks/
│   └── useLiveCounter.ts   # Live counter hook
└── utils/
    └── constants.ts        # ⭐ ALL editable text lives here
```

---

## 💌 Made with love by Baby, for Ullu 🦉
