# Image Generation - 5-Minute Quick Start

**Goal:** Understand and use image generation in 5 minutes

---

## What Is It?

Your website builder can generate AI-powered, business-specific images using:
- **Google Gemini** for prompt generation
- **Hugging Face** for image generation
- **Unsplash** as fallback
- **SVG** as final fallback

**Result:** Perfect images, every time, automatically.

---

## How It Works (30 seconds)

```
User generates website
     ↓
Gemini creates detailed image prompts
     ↓
Hugging Face generates 4 AI images (hero + 3 features)
     ↓
Images converted to Base64 and embedded
     ↓
Website displays with custom AI images
```

**If Hugging Face fails → Tries Gemini Imagen → Tries Unsplash → Shows SVG placeholder**

---

## The 3 Pieces

### 1. Service: ImageGenerationService.tsx
Handles all image generation logic
```typescript
import { generateBusinessImages } from './ImageGenerationService';

const images = await generateBusinessImages(
  'My Business',      // Business name
  'Consulting',       // Business type
  'We help companies...', // Description
  apiKey
);
// Returns: { hero, feature1, feature2, feature3 }
```

### 2. Form: GenerateWebsiteForm.tsx
Collects user input and calls the service
```typescript
// User enters: business name, type, description
// Calls: generateBusinessImages()
// Shows: Loading toast and generates images
// Displays: Result in modal
```

### 3. Template: GeneratedTemplate.tsx
Renders the website with images
```typescript
// Takes: design colors + generated images
// Shows: Complete website preview
// User can: Download or regenerate
```

---

## Use It (2 minutes)

### Copy This Code

```typescript
import { generateBusinessImages } from '@/components/ImageGenerationService';
import { toast } from 'sonner@2.0.3';
import { useState } from 'react';

export function MyImageComponent() {
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generateBusinessImages(
        'My Business',
        'My Type',
        'My Description',
        process.env.REACT_APP_GEMINI_API_KEY
      );
      setImages(result);
      toast.success('✅ Images generated!');
    } catch (error) {
      toast.error('Failed to generate images');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Images'}
      </button>

      {images && (
        <div>
          <img src={images.hero} alt="Hero" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
}
```

### That's it!

You now have:
- ✅ 4 generated images
- ✅ Automatic fallback if APIs fail
- ✅ Error handling with toast
- ✅ Loading state

---

## Image Sizes

| Slot | Size | Use |
|------|------|-----|
| hero | 1920×1080 | Main banner |
| feature1 | 1200×800 | Feature 1 |
| feature2 | 1200×800 | Feature 2 |
| feature3 | 1200×800 | Feature 3 |

---

## Supported Business Types

```
Bakery, Restaurant, Fitness, Gym, Consulting, Business,
Office, Coffee, Shop, Retail, Tech, Spa, Salon,
Photography, Design, Marketing, Construction,
Real Estate, Education, Healthcare, Food
```

Want a different type? It still works - just uses generic images.

---

## If Something Goes Wrong

### Images Not Generating?

**Check 1:** API Key
```javascript
console.log('Key set?', process.env.REACT_APP_GEMINI_API_KEY ? '✅' : '❌');
```

**Check 2:** Network
- Open DevTools → Network tab
- Should see requests to `api-inference.huggingface.co`

**Check 3:** Fallback
- If Hugging Face fails, it uses Unsplash automatically
- If Unsplash fails, it shows SVG placeholder
- Images always appear (quality may vary)

### Getting SVG Placeholders?
This means APIs failed. Check error in console:
```javascript
// Console should show:
❌ Hugging Face generation failed: [error]
⚠️ Trying Gemini Imagen...
```

This is **not an error** - the system is working, just using fallback.

---

## Performance Tips

### 1. Cache Results
```typescript
const cacheKey = `images_${businessName}_${businessType}`;
const cached = localStorage.getItem(cacheKey);
if (cached) return JSON.parse(cached);
```

### 2. Show Loading State
```typescript
{loading && <div>🎨 Generating images...</div>}
```

### 3. Lazy Load Images
```typescript
<img src={images.hero} alt="Hero" loading="lazy" />
```

### 4. Use Fallbacks
```typescript
// Always have a fallback URL
fallbackSrc="https://images.unsplash.com/photo-..."
```

---

## Real Examples

### Example 1: Product Card
```typescript
const { hero } = await generateBusinessImages(productName, 'product', productDesc, key);
return <img src={hero} alt={productName} />;
```

### Example 2: Blog Post
```typescript
const { hero } = await generateBusinessImages(postTitle, 'blog', postContent, key);
return <img src={hero} alt={postTitle} className="featured-image" />;
```

### Example 3: Portfolio
```typescript
const images = await generateBusinessImages(projectName, 'portfolio', projectDesc, key);
return (
  <div>
    <img src={images.hero} alt="Hero" />
    <img src={images.feature1} alt="Details" />
  </div>
);
```

---

## Configuration

### Environment Variables
```bash
# .env.local
REACT_APP_GEMINI_API_KEY=your-key
REACT_APP_HUGGING_FACE_TOKEN=your-token
USE_MOCKS=false
```

### Test Without APIs (Development)
```bash
# .env.local
USE_MOCKS=true

# Now you get instant SVG placeholders
# No API calls = no costs, no delays
```

---

## Common Questions

**Q: How long does generation take?**
A: 5-30 seconds (normal). First image is slowest, rest are parallel.

**Q: Does it cost money?**
A: Free tier of Gemini: 10,000/month. Hugging Face: 1,000/month. Enough for most uses.

**Q: What if API is down?**
A: Fallback chain activates. Worst case: Shows gradient SVG. Never breaks UI.

**Q: Can I use my own images?**
A: Yes! Just pass any image URL instead of calling generateBusinessImages().

**Q: How do I show progress?**
A: Use state: `const [progress, setProgress] = useState(0);` → Update while generating.

**Q: Can I cache the images?**
A: Yes! Store in localStorage, check before generating.

---

## What to Read Next

1. **Quick Overview:** IMAGE_GENERATION_README.md
2. **Need Code Examples:** IMAGE_GENERATION_QUICK_REFERENCE.md
3. **Want to Understand:** IMAGE_GENERATION_GUIDE.md
4. **Building New Feature:** IMPLEMENTING_IMAGE_GENERATION.md
5. **Visual Learner:** IMAGE_GENERATION_ARCHITECTURE.md

---

## Cheat Sheet

```typescript
// Import
import { generateBusinessImages } from '@/components/ImageGenerationService';

// Generate
const images = await generateBusinessImages(name, type, desc, key);

// Use
<img src={images.hero} alt="Hero" />
<img src={images.feature1} alt="Feature 1" />

// Error Handle
try { const images = await generateBusinessImages(...); }
catch (error) { /* use fallback */ }

// Fallback
const fallback = {
  hero: 'https://images.unsplash.com/...',
  feature1: 'https://images.unsplash.com/...',
  feature2: 'https://images.unsplash.com/...',
  feature3: 'https://images.unsplash.com/...'
};
```

---

## You're Ready!

You now know:
✅ How image generation works
✅ How to use it in your code
✅ How to handle errors
✅ How to optimize performance
✅ Where to find more help

**Start implementing!** Pick a component and add image generation in 5 minutes.

---

## Still Have Questions?

| Question | Answer |
|----------|--------|
| How does it work? | Read IMAGE_GENERATION_GUIDE.md |
| Show me code | See IMAGE_GENERATION_QUICK_REFERENCE.md |
| I want diagrams | Check IMAGE_GENERATION_ARCHITECTURE.md |
| Building new feature | Use IMPLEMENTING_IMAGE_GENERATION.md |
| Something's broken | See Troubleshooting in IMAGE_GENERATION_GUIDE.md |

---

**Happy coding! 🚀**

Now go add image generation to your feature in 5 minutes.
