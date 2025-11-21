# Image Generation - Quick Reference Guide
## Copy-Paste Solutions & Code Examples

---

## Quick Start

### 1. Basic Image Generation
```typescript
import { generateBusinessImages } from './ImageGenerationService';

// In your component
const handleGenerateImages = async () => {
  try {
    const images = await generateBusinessImages(
      'My Business Name',     // businessName
      'Consulting',           // businessType
      'Professional services...',  // description
      process.env.REACT_APP_GEMINI_API_KEY
    );

    console.log('Generated images:', images);
    // images.hero, images.feature1, images.feature2, images.feature3
  } catch (error) {
    console.error('Generation failed:', error);
  }
};
```

---

## Common Patterns

### Pattern 1: Display Generated Image
```typescript
<ImageWithFallback
  src={images.hero}
  alt="Business hero image"
  fallbackSrc="https://via.placeholder.com/1920x1080"
/>
```

### Pattern 2: With Loading State
```typescript
const [isGenerating, setIsGenerating] = useState(false);
const [images, setImages] = useState<GeneratedImageData | null>(null);

const handleGenerate = async () => {
  setIsGenerating(true);
  try {
    const result = await generateBusinessImages(
      businessName,
      businessType,
      description,
      process.env.REACT_APP_GEMINI_API_KEY
    );
    setImages(result);
  } finally {
    setIsGenerating(false);
  }
};

return (
  <>
    <button onClick={handleGenerate} disabled={isGenerating}>
      {isGenerating ? 'Generating...' : 'Generate Images'}
    </button>
    {images && (
      <img src={images.hero} alt="Generated hero" />
    )}
  </>
);
```

### Pattern 3: With Error Handling & Toast
```typescript
import { toast } from 'sonner@2.0.3';

try {
  setIsGenerating(true);
  toast.info('🎨 Creating custom images...');

  const images = await generateBusinessImages(
    businessName,
    businessType,
    description,
    process.env.REACT_APP_GEMINI_API_KEY
  );

  setImages(images);
  toast.success('✅ Images generated successfully!');
} catch (error) {
  console.error('Generation error:', error);
  toast.error('⚠️ Using fallback images');

  // Fallback to Unsplash
  setImages({
    hero: `https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop`,
    feature1: `https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=800&fit=crop`,
    feature2: `https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop`,
    feature3: `https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=800&fit=crop`
  });
} finally {
  setIsGenerating(false);
}
```

### Pattern 4: Batch Processing Multiple Businesses
```typescript
async function generateImagesForMultipleBusinesses(businesses: Business[]) {
  const results = await Promise.all(
    businesses.map(b =>
      generateBusinessImages(
        b.name,
        b.type,
        b.description,
        process.env.REACT_APP_GEMINI_API_KEY
      ).catch(err => {
        console.error(`Failed for ${b.name}:`, err);
        return null;
      })
    )
  );

  return results.filter(Boolean);
}
```

### Pattern 5: Conditional Generation
```typescript
// Only generate if images don't exist
if (!designSpec.generatedImages) {
  const images = await generateBusinessImages(
    businessName,
    businessType,
    description,
    process.env.REACT_APP_GEMINI_API_KEY
  );
  designSpec.generatedImages = images;
}
```

---

## Use Cases

### Use Case 1: E-Commerce Product Page
```typescript
// Generate product showcase images
const productImages = await generateBusinessImages(
  productName,
  'product-' + category,
  `High-quality product photo of ${productName}.
   Used for: ${useCase}.
   Style: professional product photography`,
  apiKey
);

// Use images
<img src={productImages.hero} alt="Product main" />        {/* Large hero */}
<img src={productImages.feature1} alt="Detail 1" />        {/* Close-up */}
<img src={productImages.feature2} alt="In-use" />          {/* Being used */}
<img src={productImages.feature3} alt="Packaging" />       {/* Packaging */}
```

### Use Case 2: Portfolio Website
```typescript
// Generate portfolio project images
const projectImages = await generateBusinessImages(
  projectName,
  'portfolio-project',
  `Portfolio project: ${description}.
   Created for: ${client}.
   Technologies: ${tech}`,
  apiKey
);

// Display in portfolio grid
<div className="portfolio-grid">
  <img src={projectImages.hero} />
  <div className="details">
    <p>{projectImages.feature1}</p>
  </div>
</div>
```

### Use Case 3: Blog Featured Images
```typescript
// Generate blog header images
const blogImages = await generateBusinessImages(
  blogTitle,
  'blog-article',
  `Blog article: ${title}. Topics: ${topics}.
   Target audience: ${audience}`,
  apiKey
);

// Use as featured image
<img
  src={blogImages.hero}
  alt={blogTitle}
  className="featured-image"
/>
```

### Use Case 4: SaaS Feature Pages
```typescript
// Generate feature showcase images
const featureImages = await generateBusinessImages(
  featureName,
  'saas-feature',
  `Software feature: ${featureName}.
   Benefit: ${benefit}.
   Use case: ${useCase}`,
  apiKey
);

// Create feature cards
features.forEach((feature, i) => {
  const img = [
    featureImages.hero,
    featureImages.feature1,
    featureImages.feature2,
    featureImages.feature3
  ][i];

  return <FeatureCard image={img} title={feature.title} />;
});
```

---

## Image Dimensions & Formats

### Size Reference
```typescript
// Hero sections
const heroWidth = 1920;
const heroHeight = 1080;

// Feature sections
const featureWidth = 1200;
const featureHeight = 800;

// Small thumbnails (optional)
const thumbWidth = 800;
const thumbHeight = 600;

// Mobile
const mobileWidth = 800;
const mobileHeight = 600;
```

### Format Options
```typescript
// Option 1: Base64 data URL (embedded)
src="data:image/png;base64,iVBORw0KGgo..."

// Option 2: External URL (Unsplash)
src="https://images.unsplash.com/photo-...?w=1920&h=1080"

// Option 3: Relative path (if saved to disk)
src="/images/generated/hero.jpg"
```

---

## Error Recovery Strategies

### Strategy 1: Automatic Retry with Exponential Backoff
```typescript
async function generateWithRetry(
  businessName: string,
  businessType: string,
  description: string,
  apiKey: string,
  maxRetries = 3
): Promise<GeneratedImageData> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await generateBusinessImages(
        businessName,
        businessType,
        description,
        apiKey
      );
    } catch (error) {
      if (i === maxRetries - 1) throw error;

      const delay = Math.pow(2, i) * 1000; // 1s, 2s, 4s
      await new Promise(resolve => setTimeout(resolve, delay));
      console.log(`Retry ${i + 1}/${maxRetries}...`);
    }
  }
}
```

### Strategy 2: Fallback Chain
```typescript
async function generateWithFallback(
  businessName: string,
  businessType: string,
  description: string,
  apiKey: string
): Promise<GeneratedImageData> {
  try {
    // Try primary generation
    return await generateBusinessImages(
      businessName,
      businessType,
      description,
      apiKey
    );
  } catch (error) {
    console.log('Primary generation failed, using fallback...');

    // Fallback to static Unsplash URLs
    return {
      hero: `https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop`,
      feature1: `https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=800&fit=crop`,
      feature2: `https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop`,
      feature3: `https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=800&fit=crop`
    };
  }
}
```

### Strategy 3: Partial Success Handling
```typescript
async function generateImagesPartial(
  businessName: string,
  businessType: string,
  description: string,
  apiKey: string
): Promise<GeneratedImageData> {
  const fallbacks = {
    hero: `https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080`,
    feature1: `https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=800`,
    feature2: `https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800`,
    feature3: `https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=800`
  };

  try {
    return await generateBusinessImages(
      businessName,
      businessType,
      description,
      apiKey
    );
  } catch (error) {
    console.warn('Using partial fallback:', error);
    return fallbacks;
  }
}
```

---

## Performance Tips

### Tip 1: Cache Generated Images
```typescript
// Store in localStorage or session storage
const cacheKey = `images_${businessName}_${businessType}`;

// Check cache first
const cached = localStorage.getItem(cacheKey);
if (cached) {
  return JSON.parse(cached);
}

// Generate and cache
const images = await generateBusinessImages(...);
localStorage.setItem(cacheKey, JSON.stringify(images));
```

### Tip 2: Lazy Load Images
```typescript
<img
  src={images.hero}
  alt="Hero"
  loading="lazy"
  decoding="async"
/>
```

### Tip 3: Progressive Image Loading
```typescript
// Load placeholder first, then high-res
<picture>
  <source srcSet={images.heroThumb} media="(max-width: 600px)" />
  <img src={images.hero} alt="Hero" />
</picture>
```

### Tip 4: Parallel Generation with Promise.all
```typescript
// Generate all images in parallel
const [hero, feature1, feature2, feature3] = await Promise.all([
  generateSingleImage(prompts.hero, 1920, 1080),
  generateSingleImage(prompts.feature1, 1200, 800),
  generateSingleImage(prompts.feature2, 1200, 800),
  generateSingleImage(prompts.feature3, 1200, 800)
]);
```

---

## Business Type Reference

Complete list of supported business types for curated images:

```
'bakery'        → Baked goods, pastries
'restaurant'    → Food, dining, culinary
'fitness'       → Gym, workouts, health
'gym'           → Equipment, training
'consulting'    → Professional, office
'business'      → Corporate, meetings
'office'        → Workplace, desks
'coffee'        → Beverages, cafes
'shop'          → Retail, products
'retail'        → Shopping, stores
'tech'          → Technology, startups
'spa'           → Wellness, relaxation
'salon'         → Hair, beauty, grooming
'photography'   → Photos, cameras
'design'        → Creative, digital
'marketing'     → Analytics, campaigns
'construction'  → Building, tools
'real_estate'   → Properties, homes
'education'     → Learning, school
'healthcare'    → Medical, wellness
'food'          → Cooking, ingredients
```

---

## Debugging

### Enable Console Logging
The service includes helpful console logs:
```
🎨 Generating detailed image prompts...
✅ Gemini generated detailed image prompts
🖼️ Generating AI images...
🎨 Generating image with Hugging Face: [prompt]...
📡 API Response status: 200
📸 Image blob received: 456234 bytes
📸 AI-generated image created via Hugging Face
✅ Successfully generated all AI images
```

### Check Environment Setup
```typescript
// Verify API key is available
console.log('GEMINI_API_KEY:', process.env.REACT_APP_GEMINI_API_KEY ? '✅' : '❌');
console.log('MOCK_MODE:', process.env.USE_MOCKS === 'true' ? '✅' : '❌');
```

### Test with Mock Data
```typescript
// In .env.local
USE_MOCKS=true

// Service will return instant SVG placeholders
// No API calls made
```

---

## Common Mistakes & Solutions

❌ **Mistake 1:** Forgetting error handling
```typescript
// ❌ Bad - will crash if API fails
const images = await generateBusinessImages(...);
```

✅ **Solution:**
```typescript
// ✅ Good - handles errors gracefully
try {
  const images = await generateBusinessImages(...);
} catch (error) {
  setImages(getFallbackImages(businessType));
}
```

---

❌ **Mistake 2:** Not checking API key
```typescript
// ❌ Bad - API key undefined
const images = await generateBusinessImages(
  name, type, desc,
  process.env.REACT_APP_GEMINI_API_KEY  // undefined
);
```

✅ **Solution:**
```typescript
// ✅ Good - validate before use
const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
if (!apiKey) throw new Error('REACT_APP_GEMINI_API_KEY not set');

const images = await generateBusinessImages(name, type, desc, apiKey);
```

---

❌ **Mistake 3:** Blocking UI while generating
```typescript
// ❌ Bad - user can't interact while generating
const images = await generateBusinessImages(...);
render();
```

✅ **Solution:**
```typescript
// ✅ Good - async with loading state
const [isLoading, setIsLoading] = useState(false);

const handleGenerate = async () => {
  setIsLoading(true);
  try {
    const images = await generateBusinessImages(...);
    setImages(images);
  } finally {
    setIsLoading(false);
  }
};
```

---

## Summary

**Remember:**
- Always handle errors with fallbacks
- Use loading states for better UX
- Cache results when possible
- Monitor API quotas
- Test with mock data first
- Check console logs for debugging

**Quick checklist before deploying:**
- [ ] Environment variables set
- [ ] Error handling implemented
- [ ] Fallback images configured
- [ ] Loading states added
- [ ] API quotas verified
- [ ] Browser console clear
- [ ] Mobile responsive

---

**Need Help?** Check `IMAGE_GENERATION_GUIDE.md` for detailed documentation.
