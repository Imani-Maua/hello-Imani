# Maua Imani

**MauaImani** is my digital introduction, not only as a software engineer, but also as a quirky, fun-loving, young spirit who happens to love pink quite a lot. Through HeyImani, I showcase who I am, what I build, what I am building, and hopefully, it encourages us to connect!

---

## 📂 Project Structure

The project follows a modular, component-based architecture, making it easy to maintain and scale.

```
├── public/                 # Static assets (Favicon, etc.)
├── src/
│   ├── assets/             # Images and local media
│   ├── components/         # Reusable UI components
│   │   ├── ExperienceCard/ # Detailed work/leadership cards
│   │   ├── ProjectCard/    # Compact project showcase
│   │   ├── SidePanel/      # Collapsible navigation & bio
│   │   ├── Navbar/         # Mobile-first glassmorphic menu
│   │   └── Hero/           # Professional intro & socials
│   ├── data/               # Centralized experience & project data
│   ├── pages/              # Standalone page views
│   │   ├── About/          # Home page (Hero + Combined Grid)
│   │   ├── Experience/     # Professional milestones
│   │   ├── Projects/       # Compact project grid
│   │   └── Extracurriculars/ # Community & Impact
│   ├── styles/             # Global SCSS variables & themes
│   ├── App.jsx             # Routing & Layout
│   └── main.jsx            # Entry point
├── index.html              # Main HTML entry
└── vite.config.js          # Build & Dev configuration
```

---

## ✨ Fun Features

### 1. 🎡 Interactive Favorites Carousel (`src/components/Favorites`)
A custom-built carousel featuring auto-sliding logic, manual navigation buttons, and touch-gesture support for mobile users.
- **Circular Logic**: Uses modulo arithmetic to ensure seamless infinite looping.
- **Micro-Animations**: Glassmorphism effects and subtle hover scales enhance engagement.

### 2. 📱 Mobile-First Glassmorphic Navbar (`src/components/Navbar`)
A unique 🌸 flower-triggered navigation menu designed for one-handed modern mobile use. My name means flower. A flower was more fitting than a hamburger menu.
- **Glassmorphism**: Uses `backdrop-filter` for a sleek, translucent overlay.
- **Animations**: Smooth transitions for menu expansion and link hover states.

---

## 🚀 Setup

Follow these instructions to get the portfolio running locally.

### 1. Clone the repository
```bash
git clone https://github.com/Imani-Maua/HeyImani.git
cd heyimani-portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: SCSS (CSS Modules)
- **Navigation**: React Router 7
- **Aesthetics**: Glassmorphism, Google Fonts, Custom Micro-animations

---

## 🚀 Deployment

This portfolio is hosted on Netlify using Netlify's subdomain. Check it out here: [Maua Imani](https://mauaimani.netlify.app)

## 🛠️ Future Enhancements

- Live Demos for all my projects.

## License

MIT License