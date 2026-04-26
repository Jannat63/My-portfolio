# Ahsan Jannat – Portfolio

## Folder Structure

```
portfolio/
├── index.html                          ← Main HTML (all sections)
│
├── assets/
│   ├── css/
│   │   ├── style.css                   ← Core styles, variables, all components
│   │   ├── animations.css              ← Keyframes, entrance animations, hover effects
│   │   └── responsive.css              ← All media queries (tablet, mobile)
│   │
│   ├── js/
│   │   ├── script.js                   ← Navbar, mobile menu, filter, WhatsApp, form
│   │   └── animations.js               ← Typing effect, counters, scroll reveal
│   │
│   ├── images/
│   │   ├── portrait.png                ← ✅ Your oil painting image (ALREADY PLACED)
│   │   ├── avatar-1.png                ← Testimonial avatars (copy from old site)
│   │   ├── avatar-2.png
│   │   ├── avatar-3.png
│   │   ├── avatar-4.png
│   │   └── projects/
│   │       ├── project-1.jpg           ← Union Agrovet
│   │       ├── project-2.png           ← Faithness BD
│   │       ├── project-3.jpg           ← Cover Design
│   │       ├── project-4.png           ← Insoils
│   │       ├── project-5.png           ← Vassker
│   │       ├── project-6.png           ← Aloevera Glow
│   │       ├── project-7.png           ← Best Gear & Gadget
│   │       ├── project-8.jpg           ← Fitwelleats
│   │       └── project-9.png           ← Best Tech Planet
│   │
│   └── files/
│       └── ahsan-jannat-cv.pdf         ← Your CV file for download button
```

## What to Edit

### Personal Info → index.html
- Name, email, phone, address
- Social media links
- Stats numbers (Years, Projects, Keywords)
- Bio text in About section
- Service descriptions
- Project cards

### Colors → assets/css/style.css (top of file, :root block)
- `--orange` = main accent (default: #f97316)
- `--blue`   = secondary accent (default: #3b82f6)
- `--bg`     = background (default: #050816)

### Animations speed → assets/css/animations.css
### Breakpoints → assets/css/responsive.css

## Images to Replace from Old Site
Copy these from `./assets/images/` in your OLD site to the NEW site:
- avatar-1.png, avatar-2.png, avatar-3.png, avatar-4.png → assets/images/
- project-1.jpg through project-9.png → assets/images/projects/

## Contact Form
The form submits to Formspree (your existing account).
Form ID: mpwlpzny (already configured in index.html)

## WhatsApp Number
Already set to +8801643644550 in script.js (line with `const phone = ...`)
