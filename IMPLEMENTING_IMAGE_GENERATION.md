# Implementing Image Generation - Practical Guide

---

## How to Extend Image Generation to Other Features

This guide shows you how to apply the same image generation pattern used for website builder to other features in your application.

---

## Table of Contents
1. [Basic Implementation Template](#basic-implementation-template)
2. [Real-World Examples](#real-world-examples)
3. [Advanced Patterns](#advanced-patterns)
4. [Performance Optimization](#performance-optimization)
5. [Testing & Debugging](#testing--debugging)

---

## Basic Implementation Template

### Step 1: Create a Custom Service

Create a new service file that follows the same pattern as `ImageGenerationService.tsx`:

```typescript
// src/services/CustomImageService.ts

import { GoogleGenerativeAI } from "@google/generative-ai";

interface CustomImageOutput {
  image: string;          // Base64 or URL
  alternativeImages?: string[];
  metadata?: Record<string, any>;
}

/**
 * Generate images for [YOUR USE CASE]
 * Follows the same pattern as ImageGenerationService
 */
export async function generateCustomImages(
  subject: string,
  category: string,
  description: string,
  apiKey: string
): Promise<CustomImageOutput> {
  try {
    console.log(`🎨 Generating images for ${subject}...`);

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Step 1: Generate detailed image prompt
    const promptRequest = `Generate a detailed, professional image prompt for:
      Subject: ${subject}
      Category: ${category}
      Description: ${description}

      Requirements:
      - Vivid, descriptive language
      - Professional quality
      - Specific visual details
      - 50-80 words

      Respond with ONLY the prompt text, no extra explanation.`;

    const promptResult = await model.generateContent(promptRequest);
    const detailedPrompt = promptResult.response.text();

    console.log("✅ Prompt generated:", detailedPrompt.substring(0, 50) + "...");

    // Step 2: Generate image using Hugging Face
    const imageUrl = await generateImageWithHuggingFace(
      detailedPrompt,
      1200,
      800
    );

    return {
      image: imageUrl,
      metadata: {
        originalPrompt: description,
        generatedPrompt: detailedPrompt,
        subject: subject,
        category: category
      }
    };

  } catch (error) {
    console.error("❌ Image generation failed:", error);
    return {
      image: generateSVGPlaceholder(subject),
      metadata: { error: String(error) }
    };
  }
}

// Reuse existing logic or create your own
async function generateImageWithHuggingFace(
  prompt: string,
  width: number,
  height: number
): Promise<string> {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer YOUR_HUGGING_FACE_TOKEN`
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            height: Math.min(height, 512),
            width: Math.min(width, 512)
          }
        })
      }
    );

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const blob = await response.blob();
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(",")[1];
        resolve(`data:image/png;base64,${base64}`);
      };
      reader.onerror = () => reject(new Error("Failed to read blob"));
      reader.readAsDataURL(blob);
    });

  } catch (error) {
    console.error("❌ Hugging Face generation failed:", error);
    throw error;
  }
}

function generateSVGPlaceholder(subject: string): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#grad)"/>
      <text x="600" y="400" font-size="48" font-weight="bold" fill="white" text-anchor="middle">
        ${subject}
      </text>
    </svg>
  `;
  const base64 = btoa(svg.trim());
  return `data:image/svg+xml;base64,${base64}`;
}
```

### Step 2: Use in Your Component

```typescript
// src/components/YourComponent.tsx

import { useState } from "react";
import { generateCustomImages } from "@/services/CustomImageService";
import { toast } from "sonner@2.0.3";

export function YourComponent() {
  const [images, setImages] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateImage = async () => {
    setIsGenerating(true);
    try {
      const result = await generateCustomImages(
        "My Subject",
        "My Category",
        "Description of what I want",
        process.env.REACT_APP_GEMINI_API_KEY || ""
      );

      setImages(result.image);
      toast.success("✅ Image generated!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("⚠️ Failed to generate image");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleGenerateImage}
        disabled={isGenerating}
      >
        {isGenerating ? "Generating..." : "Generate Image"}
      </button>

      {images && (
        <img
          src={images}
          alt="Generated"
          style={{ maxWidth: "100%", marginTop: "1rem" }}
        />
      )}
    </div>
  );
}
```

---

## Real-World Examples

### Example 1: Product Image Generation

```typescript
// src/services/ProductImageService.ts

export interface ProductImages {
  hero: string;           // Main product photo
  gallery: string[];      // Multiple angles
  thumbnail: string;      // Small preview
  social: string;         // Social media optimized
}

export async function generateProductImages(
  productName: string,
  productDescription: string,
  category: string,
  apiKey: string
): Promise<ProductImages> {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Generate 4 different image prompts
    const promptRequest = `Generate 4 professional product photography prompts for:
      Product: ${productName}
      Description: ${productDescription}
      Category: ${category}

      Create prompts for:
      1. HERO: Main product photo (centered, well-lit)
      2. DETAIL: Close-up of features
      3. CONTEXT: Product in use
      4. LIFESTYLE: Product with complementary items

      Return as JSON:
      {
        "hero": "...",
        "detail": "...",
        "context": "...",
        "lifestyle": "..."
      }`;

    const result = await model.generateContent(promptRequest);
    const prompts = JSON.parse(result.response.text());

    // Generate all 4 images in parallel
    const [hero, detail, context, lifestyle] = await Promise.all([
      generateImageFromPrompt(prompts.hero, 1920, 1080, apiKey),
      generateImageFromPrompt(prompts.detail, 800, 800, apiKey),
      generateImageFromPrompt(prompts.context, 1200, 800, apiKey),
      generateImageFromPrompt(prompts.lifestyle, 1000, 1000, apiKey)
    ]);

    return {
      hero,
      gallery: [detail, context, lifestyle],
      thumbnail: detail,
      social: lifestyle
    };

  } catch (error) {
    console.error("Product image generation failed:", error);
    // Fallback to Unsplash
    return {
      hero: `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1920&h=1080&fit=crop`,
      gallery: [
        `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop`,
        `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=800&fit=crop`,
        `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&h=1000&fit=crop`
      ],
      thumbnail: `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop`,
      social: `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&h=1000&fit=crop`
    };
  }
}

// Used in product component:
const ProductCard = ({ product }) => {
  const [images, setImages] = useState<ProductImages | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    generateProductImages(
      product.name,
      product.description,
      product.category,
      process.env.REACT_APP_GEMINI_API_KEY || ""
    ).then(setImages).finally(() => setLoading(false));
  }, [product]);

  if (loading) return <div>Generating product images...</div>;
  if (!images) return <div>Failed to generate images</div>;

  return (
    <div className="product-card">
      <img src={images.hero} alt={product.name} />
      <div className="gallery">
        {images.gallery.map((img, i) => (
          <img key={i} src={img} alt={`Gallery ${i}`} />
        ))}
      </div>
    </div>
  );
};
```

### Example 2: Blog Post Featured Images

```typescript
// src/services/BlogImageService.ts

export async function generateBlogPostImage(
  title: string,
  topic: string,
  keywords: string[],
  apiKey: string
): Promise<string> {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const promptRequest = `Generate a professional blog featured image prompt:
      Title: ${title}
      Topic: ${topic}
      Keywords: ${keywords.join(", ")}

      Create a visually engaging, modern blog header image prompt.
      Should represent the topic and be eye-catching for social media.

      Respond with ONLY the prompt, 50-80 words.`;

    const promptResult = await model.generateContent(promptRequest);
    const prompt = promptResult.response.text();

    // Generate image (1200x630 is standard for blog featured images)
    return await generateImageFromPrompt(prompt, 1200, 630, apiKey);

  } catch (error) {
    console.error("Blog image generation failed:", error);
    // Fallback
    return `https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop`;
  }
}

// Used in blog editor:
const BlogEditor = ({ post }) => {
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);

  const generateFeaturedImage = async () => {
    const image = await generateBlogPostImage(
      post.title,
      post.category,
      post.keywords,
      process.env.REACT_APP_GEMINI_API_KEY || ""
    );
    setFeaturedImage(image);
  };

  return (
    <div className="blog-editor">
      <button onClick={generateFeaturedImage}>
        Generate Featured Image
      </button>
      {featuredImage && (
        <img src={featuredImage} alt="Featured" className="featured-image" />
      )}
    </div>
  );
};
```

### Example 3: Portfolio/Case Study Images

```typescript
// src/services/PortfolioImageService.ts

export interface PortfolioImages {
  hero: string;
  process: string[];
  results: string[];
  testimonialBg: string;
}

export async function generatePortfolioImages(
  projectName: string,
  description: string,
  clientType: string,
  apiKey: string
): Promise<PortfolioImages> {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const promptRequest = `Generate 6 professional portfolio case study image prompts:
      Project: ${projectName}
      Description: ${description}
      Client Type: ${clientType}

      Create prompts for:
      1. HERO: Dramatic project showcase
      2-3. PROCESS: Step-by-step implementation
      4-5. RESULTS: Success and outcomes
      6. TESTIMONIAL: Client/team celebration

      Return as JSON array with 6 prompts.`;

    const result = await model.generateContent(promptRequest);
    const prompts = JSON.parse(result.response.text());

    // Generate in batches to avoid rate limiting
    const hero = await generateImageFromPrompt(prompts[0], 1920, 1080, apiKey);
    const [process1, process2] = await Promise.all([
      generateImageFromPrompt(prompts[1], 1200, 800, apiKey),
      generateImageFromPrompt(prompts[2], 1200, 800, apiKey)
    ]);
    const [results1, results2] = await Promise.all([
      generateImageFromPrompt(prompts[3], 1200, 800, apiKey),
      generateImageFromPrompt(prompts[4], 1200, 800, apiKey)
    ]);
    const testimonialBg = await generateImageFromPrompt(prompts[5], 1200, 600, apiKey);

    return {
      hero,
      process: [process1, process2],
      results: [results1, results2],
      testimonialBg
    };

  } catch (error) {
    console.error("Portfolio generation failed:", error);
    return {
      hero: `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080`,
      process: Array(2).fill(`https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800`),
      results: Array(2).fill(`https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=800`),
      testimonialBg: `https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600`
    };
  }
}
```

---

## Advanced Patterns

### Pattern 1: Batch Image Generation with Progress

```typescript
export async function generateImagesInBatches(
  items: Array<{ name: string; description: string }>,
  onProgress?: (current: number, total: number) => void
): Promise<string[]> {
  const results: string[] = [];
  const BATCH_SIZE = 3;

  for (let i = 0; i < items.length; i += BATCH_SIZE) {
    const batch = items.slice(i, i + BATCH_SIZE);

    const batchResults = await Promise.all(
      batch.map(item =>
        generateCustomImages(
          item.name,
          'default',
          item.description,
          process.env.REACT_APP_GEMINI_API_KEY || ""
        )
      )
    );

    results.push(...batchResults.map(r => r.image));

    if (onProgress) {
      onProgress(Math.min(i + BATCH_SIZE, items.length), items.length);
    }
  }

  return results;
}

// Usage in component:
const handleGenerateBatch = async () => {
  setProgress(0);
  const images = await generateImagesInBatches(
    items,
    (current, total) => {
      setProgress(Math.round((current / total) * 100));
    }
  );
  setGeneratedImages(images);
};

return (
  <div>
    <button onClick={handleGenerateBatch}>Generate All</button>
    <div className="progress-bar">
      <div style={{ width: `${progress}%` }}>{progress}%</div>
    </div>
  </div>
);
```

### Pattern 2: Image Generation with Caching

```typescript
export class ImageGenerationCache {
  private cache = new Map<string, string>();
  private readonly MAX_SIZE = 100;

  private getCacheKey(...parts: string[]): string {
    return parts.join(":::");
  }

  async generate(
    subject: string,
    category: string,
    description: string,
    apiKey: string
  ): Promise<string> {
    const key = this.getCacheKey(subject, category, description);

    // Check cache
    if (this.cache.has(key)) {
      console.log("📦 Using cached image");
      return this.cache.get(key)!;
    }

    // Generate new
    console.log("🎨 Generating new image (not in cache)");
    const result = await generateCustomImages(
      subject,
      category,
      description,
      apiKey
    );

    // Store in cache with size limit
    if (this.cache.size >= this.MAX_SIZE) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, result.image);
    return result.image;
  }

  clear(): void {
    this.cache.clear();
  }
}

// Singleton instance
export const imageCache = new ImageGenerationCache();

// Use in component:
const image = await imageCache.generate(
  productName,
  productCategory,
  productDescription,
  apiKey
);
```

### Pattern 3: Streaming Image Generation

```typescript
export async function* generateImagesStream(
  items: Array<{ name: string; description: string }>,
  apiKey: string
): AsyncGenerator<{ item: typeof items[0]; image: string; error?: Error }> {
  for (const item of items) {
    try {
      const result = await generateCustomImages(
        item.name,
        'category',
        item.description,
        apiKey
      );

      yield {
        item,
        image: result.image
      };
    } catch (error) {
      yield {
        item,
        image: "",
        error: error instanceof Error ? error : new Error(String(error))
      };
    }
  }
}

// Usage in component with streaming UI updates:
const handleGenerateStream = async () => {
  const generator = generateImagesStream(items, apiKey);

  for await (const { item, image, error } of generator) {
    if (error) {
      console.error(`Failed for ${item.name}:`, error);
      setFailed(prev => [...prev, item.name]);
    } else {
      setGeneratedImages(prev => [...prev, { item, image }]);
      setProgress(prev => prev + 1);
    }
  }
};
```

---

## Performance Optimization

### Optimization 1: Parallel Generation with Concurrency Control

```typescript
import PQueue from "p-queue";

const imageQueue = new PQueue({ concurrency: 3 });

export async function generateImagesParallel(
  items: Array<{ name: string; description: string }>,
  apiKey: string
): Promise<string[]> {
  const results = await Promise.all(
    items.map(item =>
      imageQueue.add(() =>
        generateCustomImages(
          item.name,
          'default',
          item.description,
          apiKey
        ).then(r => r.image)
      )
    )
  );

  return results;
}
```

### Optimization 2: Image Compression

```typescript
export async function compressImage(
  dataUrl: string,
  quality: number = 0.8
): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/jpeg', quality));
      }
    };
    img.src = dataUrl;
  });
}

// Usage:
const compressedImage = await compressImage(generatedImage, 0.8);
```

### Optimization 3: Lazy Loading

```typescript
export function LazyImage({ src, alt }: { src: string; alt: string }) {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setImageSrc(src);
        observer.unobserve(entry.target);
      }
    });

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src]);

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      loading="lazy"
      onLoad={() => setLoading(false)}
      style={{ opacity: loading ? 0.5 : 1 }}
    />
  );
}
```

---

## Testing & Debugging

### Test 1: Mock Service for Development

```typescript
// src/services/__mocks__/CustomImageService.ts

export async function generateCustomImages() {
  // Return SVG placeholder instantly
  return {
    image: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjgwMCIgdmlld0JveD0iMCAwIDEyMDAgODAwIj48cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIGZpbGw9IiNlMGUwZTAiLz48dGV4dCB4PSI2MDAiIHk9IjQwMCIgZm9udC1zaXplPSI0OCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TW9jayBJbWFnZTwvdGV4dD48L3N2Zz4=`,
    metadata: { source: 'mock' }
  };
}
```

### Test 2: Unit Test

```typescript
// src/services/__tests__/CustomImageService.test.ts

import { describe, it, expect } from 'vitest';
import { generateCustomImages } from '../CustomImageService';

describe('CustomImageService', () => {
  it('should generate image with valid inputs', async () => {
    const result = await generateCustomImages(
      'Test Product',
      'Test Category',
      'Test Description',
      'fake-api-key'
    );

    expect(result.image).toBeDefined();
    expect(result.image.length).toBeGreaterThan(0);
    expect(result.metadata).toBeDefined();
  });

  it('should return SVG placeholder on error', async () => {
    const result = await generateCustomImages(
      'Test',
      'Test',
      'Test',
      'invalid-key'
    );

    expect(result.image).toContain('svg+xml');
  });
});
```

### Test 3: Component Test

```typescript
// src/components/__tests__/YourComponent.test.tsx

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { YourComponent } from '../YourComponent';
import * as ImageService from '@/services/CustomImageService';

vi.mock('@/services/CustomImageService');

describe('YourComponent', () => {
  it('should display generated image', async () => {
    vi.mocked(ImageService.generateCustomImages).mockResolvedValue({
      image: 'data:image/png;base64,test',
      metadata: {}
    });

    render(<YourComponent />);

    const button = screen.getByRole('button');
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByAltText('Generated')).toBeInTheDocument();
    });
  });
});
```

---

## Checklist for Implementation

Before deploying your image generation feature:

- [ ] **Setup**
  - [ ] Environment variables configured
  - [ ] API keys available
  - [ ] Dependencies installed

- [ ] **Implementation**
  - [ ] Service created following pattern
  - [ ] Component integrated
  - [ ] Error handling implemented
  - [ ] Fallbacks configured

- [ ] **UI/UX**
  - [ ] Loading states added
  - [ ] Toast notifications implemented
  - [ ] Responsive design tested
  - [ ] Mobile optimized

- [ ] **Performance**
  - [ ] Concurrency controlled
  - [ ] Caching implemented
  - [ ] Lazy loading enabled
  - [ ] Image optimization done

- [ ] **Testing**
  - [ ] Unit tests written
  - [ ] Component tests written
  - [ ] Error scenarios tested
  - [ ] Manual testing completed

- [ ] **Monitoring**
  - [ ] Console logs added
  - [ ] Error tracking enabled
  - [ ] API quota monitoring
  - [ ] Performance metrics collected

---

## Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Images not generating | Check API key, verify network, check console logs |
| SVG placeholders only | API failed, check fallback chain, verify credentials |
| Slow generation | Normal (5-30s), implement caching, use batching |
| CORS errors | Use proxy, check API settings, verify endpoint |
| Memory issues | Reduce image dimensions, use compression, implement pagination |

---

**Remember:** The pattern is flexible. You can adapt it to any use case - products, blog posts, profiles, documents, etc. The key principles remain the same:

1. Use Gemini to generate detailed prompts
2. Use Hugging Face for AI image generation
3. Implement fallback chain
4. Cache results
5. Always handle errors gracefully

