# 🌿 Casa Bayong — Handcrafted Filipino Artisan Bags

A luxury boutique website for Casa Bayong, a Filipino handmade artisan bag brand.

## 📁 Project Structure

```
casa-bayong/
├── index.html       ← Main page (all sections)
├── style.css        ← Complete styles & animations
├── script.js        ← All interactivity
├── netlify.toml     ← Netlify deployment config
└── README.md
```

## 🚀 Deployment

### Netlify (Recommended)
1. Drag and drop the `casa-bayong` folder to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Your site is live instantly — no build step required.

Or via Git:
1. Push this folder to a GitHub repository
2. Connect the repo in Netlify → **Add New Site → Import from Git**
3. Build command: *(leave blank)*  
   Publish directory: `.`
4. Click **Deploy**

### GitHub Pages
1. Push the folder contents to a GitHub repository
2. Go to **Settings → Pages**
3. Source: **Deploy from a branch** → `main` → `/ (root)`
4. Click **Save** — your site is live at `https://yourusername.github.io/your-repo`

## ✨ Features

- **Luxury dark boutique aesthetic** — dark brown, gold, and cream palette
- **CSS-only bag illustrations** — handcrafted look without external images
- **Custom cursor** — golden dot + ring follows mouse
- **Preloader** — elegant brand reveal on page load
- **Sticky navbar** with active section highlight
- **Tropical leaf decorations** with parallax scroll
- **Hero wooden shelf scene** — CSS-illustrated bayong bags on a plank
- **Product filter** — All / Tote / Clutch / Shoulder / Mini
- **3D card tilt effect** on product cards (desktop)
- **Testimonials slider** with auto-play on mobile
- **Scroll reveal animations** — staggered entrance effects
- **Gallery strip** with hover effects
- **Marquee strip** — pauses on hover
- **Back to top button**
- **Add to cart toast** notification
- **Fully responsive** — desktop, tablet, mobile
- **Hamburger menu** for mobile with overlay
- **Zero dependencies** — pure HTML, CSS, JavaScript

## 🎨 Adding Real Product Images

To replace the CSS bag illustrations with real photos, find lines like:

```html
<div class="product-img-placeholder tote-classic">
  <div class="bag-illustration tote"></div>
</div>
```

Replace with:
```html
<div class="product-img-placeholder">
  <img src="images/sampaguita-tote.jpg" alt="Sampaguita Classic Tote" 
       style="width:100%;height:100%;object-fit:cover;"/>
</div>
```

Place your images in the `images/` folder.

## 📱 Browser Support

Chrome, Firefox, Safari, Edge (all modern versions). Graceful fallback on older browsers.

---

Made with ❤️ in the Philippines.