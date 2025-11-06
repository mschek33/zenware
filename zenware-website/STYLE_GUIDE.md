# Zenware Website - Kortex Dark Theme Style Guide

## 🎨 **Design Philosophy**
The Zenware website adopts a sophisticated dark theme inspired by Kortex's modern, minimalist aesthetic. This style guide ensures consistent implementation across all pages and components while maintaining the conscious technology brand identity.

---

## 🌈 **Color Palette**

### Primary Colors
```css
/* Dark Backgrounds */
--bg-primary: #0a0a0a;      /* Main background */
--bg-secondary: #111111;    /* Section backgrounds */
--bg-tertiary: #1a1a1a;     /* Card backgrounds */
--bg-quaternary: #1f1f1f;   /* Hover states */

/* Border Colors */
--border-primary: #2a2a2a;  /* Main borders */
--border-secondary: #3a3a3a;/* Hover borders */
--border-accent: #4a4a4a;   /* Active borders */

/* Text Colors */
--text-primary: #ffffff;    /* Primary text */
--text-secondary: #e5e5e5;  /* Secondary text */
--text-tertiary: #a3a3a3;   /* Tertiary text */
--text-muted: #6b7280;      /* Muted text */
```

### Accent Colors
```css
/* Purple Gradients */
--purple-500: #8b5cf6;
--purple-600: #7c3aed;
--purple-700: #6d28d9;
--pink-500: #ec4899;
--pink-600: #db2777;

/* Gradient Combinations */
--gradient-primary: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
--gradient-secondary: linear-gradient(135deg, #7c3aed 0%, #db2777 100%);
--gradient-accent: linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #c084fc 100%);
```

### Status Colors
```css
/* Status Indicators */
--success: #10b981;         /* Green for success */
--warning: #f59e0b;         /* Yellow for warning */
--error: #ef4444;           /* Red for errors */
--info: #3b82f6;            /* Blue for info */
```

---

## 📝 **Typography**

### Font Hierarchy
```css
/* Hero Titles - Kortex Style */
.kortex-hero-title {
  font-size: 6rem;           /* 96px */
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: -0.02em;
}

/* Section Titles */
.kortex-section-title {
  font-size: 4rem;           /* 64px */
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: -0.01em;
}

/* Subsection Titles */
.kortex-subsection-title {
  font-size: 2.25rem;        /* 36px */
  line-height: 1.3;
  font-weight: 600;
  letter-spacing: -0.01em;
}

/* Card Titles */
.kortex-card-title {
  font-size: 1.5rem;         /* 24px */
  line-height: 1.4;
  font-weight: 600;
}

/* Body Text */
.kortex-subtitle {
  font-size: 1.25rem;        /* 20px */
  line-height: 1.6;
  font-weight: 300;
  color: #a3a3a3;
}

.kortex-body {
  font-size: 1rem;           /* 16px */
  line-height: 1.7;
  font-weight: 400;
  color: #e5e5e5;
}

.kortex-small {
  font-size: 0.875rem;       /* 14px */
  line-height: 1.5;
  font-weight: 400;
  color: #a3a3a3;
}
```

### Text Gradients
```css
.kortex-text-gradient {
  background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #c084fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## 🏗️ **Layout System**

### Container Sizes
```css
/* Container Widths */
.container-sm { max-width: 640px; }   /* Small content */
.container-md { max-width: 768px; }   /* Medium content */
.container-lg { max-width: 1024px; }  /* Large content */
.container-xl { max-width: 1280px; }  /* Extra large content */
.container-2xl { max-width: 1536px; } /* Full width content */
```

### Spacing System
```css
/* Spacing Scale */
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
--space-24: 6rem;    /* 96px */
```

---

## 🎯 **Component Styles**

### Cards
```css
.kortex-card {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 1rem;
  padding: 2rem;
  transition: all 0.3s ease;
}

.kortex-card:hover {
  background: #1f1f1f;
  border-color: #3a3a3a;
  transform: translateY(-2px);
}

.kortex-feature-card {
  background: linear-gradient(135deg, #1a1a1a 0%, #151515 100%);
  border: 1px solid #2a2a2a;
  border-radius: 1rem;
  padding: 2rem;
  transition: all 0.3s ease;
}

.kortex-feature-card:hover {
  background: linear-gradient(135deg, #1f1f1f 0%, #1a1a1a 100%);
  box-shadow: 0 20px 40px rgba(139, 92, 246, 0.1);
}
```

### Buttons
```css
.kortex-button {
  background: #2a2a2a;
  border: 1px solid #3a3a3a;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.kortex-button:hover {
  background: #3a3a3a;
  border-color: #4a4a4a;
  transform: translateY(-1px);
}

.kortex-button-primary {
  background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
  border: none;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.25);
}

.kortex-button-primary:hover {
  background: linear-gradient(135deg, #7c3aed 0%, #9333ea 100%);
  box-shadow: 0 8px 24px rgba(139, 92, 246, 0.4);
  transform: translateY(-1px);
}
```

### Form Elements
```css
.kortex-input {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.kortex-input:focus {
  outline: none;
  border-color: #8b5cf6;
  box-shadow: 0 0 0 1px #8b5cf6;
}

.kortex-input::placeholder {
  color: #6b7280;
}
```

### Badges
```css
.kortex-badge {
  background: #2a2a2a;
  color: #e5e5e5;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid #3a3a3a;
}

.kortex-badge-primary {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%);
  color: #c084fc;
  border: 1px solid rgba(139, 92, 246, 0.3);
}
```

---

## 🎭 **Section Layouts**

### Hero Section
```css
/* Full-height hero for homepage */
.kortex-hero {
  background: linear-gradient(180deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.kortex-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

/* Shorter hero for other pages */
.kortex-hero-short {
  background: linear-gradient(180deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%);
  padding: 8rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.kortex-hero-short::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.1) 0%, transparent 50%);
  pointer-events: none;
}
```

### Standard Section
```css
.kortex-section {
  background: #0a0a0a;
  padding: 5rem 1rem;
}

.kortex-section-alt {
  background: #111111;
  padding: 5rem 1rem;
}
```

### Navigation
```css
.kortex-nav {
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #2a2a2a;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
}
```

---

## ✨ **Animations & Effects**

### Keyframes
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes fadeIn {
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.2); }
  50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.4); }
}
```

### Animation Classes
```css
.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-fadeIn {
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-pulse-glow {
  animation: pulse-glow 3s ease-in-out infinite;
}

.kortex-glow {
  box-shadow: 0 20px 40px rgba(139, 92, 246, 0.2);
}
```

---

## 🌐 **Background Patterns**

### Grid Pattern
```css
.bg-grid-pattern {
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 50px 50px;
}
```

### Noise Texture
```css
.bg-noise {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E");
}
```

---

## 📱 **Responsive Design**

### Breakpoints
```css
/* Mobile First Approach */
.responsive-text {
  font-size: 2rem;        /* Mobile: 32px */
}

@media (min-width: 640px) {
  .responsive-text {
    font-size: 3rem;      /* Tablet: 48px */
  }
}

@media (min-width: 1024px) {
  .responsive-text {
    font-size: 4rem;      /* Desktop: 64px */
  }
}

@media (min-width: 1280px) {
  .responsive-text {
    font-size: 5rem;      /* Large: 80px */
  }
}
```

### Mobile Navigation
```css
.mobile-nav {
  background: #1a1a1a;
  border-top: 1px solid #2a2a2a;
  padding: 1rem;
}

.mobile-nav-item {
  display: block;
  padding: 0.75rem 1rem;
  color: #e5e5e5;
  text-decoration: none;
  transition: color 0.2s ease;
}

.mobile-nav-item:hover {
  color: #8b5cf6;
}
```

---

## 🎨 **Icon Guidelines**

### Icon Sizing
```css
.icon-sm { width: 1rem; height: 1rem; }      /* 16px */
.icon-md { width: 1.5rem; height: 1.5rem; }  /* 24px */
.icon-lg { width: 2rem; height: 2rem; }      /* 32px */
.icon-xl { width: 3rem; height: 3rem; }      /* 48px */
```

### Icon Colors
```css
.icon-primary { color: #ffffff; }
.icon-secondary { color: #a3a3a3; }
.icon-accent { color: #8b5cf6; }
.icon-muted { color: #6b7280; }
```

---

## 🔧 **Utility Classes**

### Spacing Utilities
```css
.space-y-1 > * + * { margin-top: 0.25rem; }
.space-y-2 > * + * { margin-top: 0.5rem; }
.space-y-3 > * + * { margin-top: 0.75rem; }
.space-y-4 > * + * { margin-top: 1rem; }
.space-y-6 > * + * { margin-top: 1.5rem; }
.space-y-8 > * + * { margin-top: 2rem; }
```

### Text Utilities
```css
.text-balance { text-wrap: balance; }
.text-gradient { @apply kortex-text-gradient; }
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }
```

---

## 📋 **Implementation Checklist**

### For Each Component:
- [ ] Apply dark background colors
- [ ] Use white/gray text colors
- [ ] Add purple accent colors
- [ ] Include hover animations
- [ ] Add gradient effects where appropriate
- [ ] Ensure responsive design
- [ ] Test across browsers
- [ ] Validate accessibility

### For Each Page:
- [ ] Apply `kortex-section` or `kortex-section-alt` backgrounds
- [ ] Use `kortex-hero` for homepage, `kortex-hero-short` for other pages
- [ ] Apply `kortex-card` for content blocks
- [ ] Use `kortex-button-primary` for CTAs
- [ ] Add `kortex-text-gradient` for highlights
- [ ] Include appropriate animations
- [ ] Ensure mobile responsiveness

### Hero Section Usage:
- **Homepage**: Use `kortex-hero` (full viewport height)
- **Other pages**: Use `kortex-hero-short` (6rem padding, more compact)
- **Typography**: Use `kortex-hero-title` for main titles, `kortex-subtitle` for descriptions

---

## 🎯 **Brand Consistency**

### Zenware Brand Elements
- **Logo**: Purple-to-pink gradient circle with "Z"
- **Primary CTA**: "Get Started" with gradient button
- **Accent Color**: Purple (#8b5cf6) to Pink (#ec4899) gradients
- **Typography**: Large, bold headlines with gradient text
- **Imagery**: Dark backgrounds with purple accent lighting

### Messaging Consistency
- **Primary**: "Conscious Technology for New Earth Systems"
- **Secondary**: "AI Powered Conscious Technology"
- **Tertiary**: "Bridging ancient wisdom with cutting-edge AI"

---

*This style guide serves as the definitive reference for maintaining consistent Kortex-inspired dark theme styling across the entire Zenware website.*