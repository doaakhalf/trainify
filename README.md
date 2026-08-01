# Trainify Landing Page

A world-class, premium Arabic-first landing page for Trainify - a marketplace connecting athletes with professional fitness coaches.

## 🎯 Overview

This is a production-ready Next.js 15 landing page built with:

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **shadcn/ui** components
- **Lucide Icons**
- **Google Fonts** (Alexandria & Cairo)

## 🚀 Features

### Design Quality
- Premium startup aesthetic inspired by Stripe, Linear, Preply, Airbnb, Notion, and Headspace
- Modern, minimal, elegant design with Apple-level polish
- Smooth micro-animations and transitions
- Beautiful typography hierarchy
- Responsive design for all devices

### Arabic-First
- RTL layout
- Natural Arabic copywriting (not AI-sounding)
- Professional UX writing
- Optimized for Arabic SEO

### Performance
- Optimized for Lighthouse 95+ scores
- Server Components
- Lazy loading
- Code splitting
- Optimized images and fonts

### SEO
- Complete metadata
- Open Graph tags
- Twitter Cards
- Structured Data (JSON-LD)
  - Organization Schema
  - SoftwareApplication Schema
  - FAQ Schema
- robots.txt
- sitemap.xml
- manifest.json
- Semantic HTML

### Sections
1. **Hero** - Eye-catching headline with CTAs
2. **Why Trainify** - 4 feature cards
3. **How It Works** - Step-by-step for athletes and coaches
4. **Trust** - Security and payment protection
5. **For Coaches** - Coach recruitment section
6. **Testimonials** - Social proof
7. **FAQ** - Common questions with accordion
8. **Final CTA** - Conversion-focused call-to-action
9. **Footer** - Links and social media

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎨 Design System

### Colors
- **Primary**: `#F97316` (Orange)
- **Background**: `#FFFFFF` (White)
- **Secondary Background**: `#F9FAFB` (Very Light Gray)
- **Text Primary**: `#1F2937` (Dark Gray)
- **Text Secondary**: `#6B7280` (Gray)

### Typography
- **Primary Font**: Alexandria
- **Fallback Font**: Cairo
- Beautiful hierarchy with large headlines and readable paragraphs

### Components
All components are reusable and follow best practices:
- `Button` - Multiple variants (primary, secondary, ghost)
- `Card` - Premium card component with hover effects
- All section components are modular

## 📁 Project Structure

```
trainify/
├── app/
│   ├── layout.tsx          # Root layout with fonts and metadata
│   ├── page.tsx            # Main landing page
│   ├── globals.css         # Global styles
│   ├── robots.ts           # SEO robots
│   ├── sitemap.ts          # SEO sitemap
│   └── manifest.ts         # PWA manifest
├── components/
│   ├── ui/
│   │   ├── button.tsx      # Button component
│   │   └── card.tsx        # Card component
│   └── sections/
│       ├── hero.tsx
│       ├── why-trainify.tsx
│       ├── how-it-works.tsx
│       ├── trust.tsx
│       ├── for-coaches.tsx
│       ├── testimonials.tsx
│       ├── faq.tsx
│       ├── final-cta.tsx
│       └── footer.tsx
├── content/
│   └── ar.ts               # All Arabic content (separated from components)
├── lib/
│   ├── utils.ts            # Utility functions
│   └── structured-data.ts  # SEO structured data
├── public/                 # Static assets (add images here)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## 🖼️ Required Assets

Add these images to the `public/` folder:

- `icon-192.png` - App icon (192x192)
- `icon-512.png` - App icon (512x512)
- `og-image.png` - Open Graph image (1200x630)
- `favicon.ico` - Favicon

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Environment Variables

No environment variables required for the landing page.

## 📝 Content Management

All Arabic content is centralized in `content/ar.ts`. To update copy:

1. Open `content/ar.ts`
2. Edit the relevant section
3. Save and rebuild

This separation makes it easy to:
- Update content without touching components
- Add translations in the future
- Maintain consistency

## 🎯 Conversion Goals

The landing page has two primary goals:

1. **Athletes**: Download the app
2. **Coaches**: Join the platform

Every section is optimized for these conversions.

## 🔧 Customization

### Update Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    DEFAULT: '#F97316', // Change this
    // ...
  },
}
```

### Update Fonts

Edit `app/layout.tsx`:

```typescript
const alexandria = Alexandria({
  // Font configuration
});
```

### Add Sections

1. Create component in `components/sections/`
2. Add content to `content/ar.ts`
3. Import and add to `app/page.tsx`

## 📊 Performance Targets

- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

## 🤝 Contributing

This is a production landing page. For updates:

1. Test thoroughly
2. Maintain design quality
3. Keep Arabic natural and professional
4. Ensure accessibility
5. Optimize performance

## 📄 License

Proprietary - Trainify

## 🎨 Design Inspiration

Quality inspired by:
- Stripe
- Linear
- Preply
- Airbnb
- Headspace
- Notion

(Design is original, not copied)

---

Built with ❤️ for Trainify
