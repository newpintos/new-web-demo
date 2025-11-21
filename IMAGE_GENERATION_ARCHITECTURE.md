# Image Generation Architecture - Visual Diagrams

---

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                    Frontend (React/TypeScript)                      │
│                                                                       │
│  ┌──────────────────────┐           ┌──────────────────────┐        │
│  │ GenerateWebsiteForm  │           │ GeneratedTemplate    │        │
│  │                      │           │                      │        │
│  │ • User input         │──────────>│ • Display results    │        │
│  │ • Form validation    │           │ • Image rendering    │        │
│  │ • Loading states     │           │ • Design colors      │        │
│  └──────────┬───────────┘           └──────────────────────┘        │
│             │                                    ▲                    │
│             │ calls                              │ uses              │
│             ▼                                    │                    │
│  ┌──────────────────────────────────────────────┴──────┐           │
│  │         ImageGenerationService (Core Logic)        │           │
│  │                                                      │           │
│  │  ┌────────────────────────────────────────────┐    │           │
│  │  │ generateBusinessImages()                   │    │           │
│  │  │ - Takes: businessName, type, description  │    │           │
│  │  │ - Returns: GeneratedImageData              │    │           │
│  │  └────────────────────────────────────────────┘    │           │
│  │                                                      │           │
│  │  ┌────────────────────────────────────────────┐    │           │
│  │  │ Fallback Chain:                            │    │           │
│  │  │ 1. generateImageWithGemini()               │    │           │
│  │  │    (Hugging Face Stable Diffusion)         │    │           │
│  │  │ 2. generateImageWithGeminiImagen()         │    │           │
│  │  │    (Gemini Imagen 3.0)                     │    │           │
│  │  │ 3. generateImageWithUnsplashSearch()       │    │           │
│  │  │    (Unsplash + Gemini search term gen)    │    │           │
│  │  │ 4. generatePlaceholderImage()              │    │           │
│  │  │    (SVG gradient)                          │    │           │
│  │  └────────────────────────────────────────────┘    │           │
│  │                                                      │           │
│  │  ┌────────────────────────────────────────────┐    │           │
│  │  │ getCuratedImages()                         │    │           │
│  │  │ - By business type (15+ categories)        │    │           │
│  │  └────────────────────────────────────────────┘    │           │
│  └──────────────────────────────────────────────────────┘           │
│             │                                                        │
│             │                ImageWithFallback                      │
│             └──────────────────────────────────────────────────────>│
│                    (Handles image loading errors)                   │
└─────────────────────────────────────────────────────────────────────┘
                             │
                API Calls    │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        External APIs                                │
│                                                                      │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐ │
│  │ Gemini 2.5 Flash │  │ Hugging Face     │  │ Gemini Imagen    │ │
│  │ (Prompt Gen)     │  │ (Image Gen)      │  │ 3.0 API          │ │
│  │                  │  │                  │  │ (Backup)         │ │
│  │ Generates        │  │ Stable Diffusion │  │                  │ │
│  │ detailed prompts │  │ v1.5             │  │ Higher quality   │ │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘ │
│                                                                      │
│  ┌──────────────────────────┐      ┌──────────────────────────┐   │
│  │ Unsplash API             │      │ Google Gemini (Search)   │   │
│  │ (Stock Images)           │      │ (Term Generation)        │   │
│  │                          │      │                          │   │
│  │ High-quality fallback    │      │ Converts prompts to      │   │
│  │ photos for any topic     │      │ search terms             │   │
│  └──────────────────────────┘      └──────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Image Generation Flow Diagram

```
START
  │
  ▼
┌─────────────────────────────────────┐
│ User Input                          │
│ • Business Name                     │
│ • Business Type                     │
│ • Description                       │
└────────────────┬────────────────────┘
                 │
                 ▼
      ┌──────────────────────┐
      │ Design Specification │
      │ Generation           │
      │ (Gemini 2.0 Flash)   │
      └──────────┬───────────┘
                 │
                 ├─ Primary Color
                 ├─ Secondary Color
                 ├─ Accent Color
                 ├─ Hero Title
                 ├─ Features
                 └─ Image Prompts (4x)
                 │
                 ▼
      ┌──────────────────────┐
      │ Image Generation     │
      │ START                │
      └──────────┬───────────┘
                 │
        ┌────────┼────────┐
        ▼        ▼        ▼
      ┌─────┐ ┌─────┐ ┌─────┐
      │Hero │ │Feat1│ │Feat2│ ... (Parallel)
      └──┬──┘ └──┬──┘ └──┬──┘
         │       │       │
         ▼       ▼       ▼
    ┌────────────────────────┐
    │ Try: Hugging Face API  │
    │ POST image generation  │
    └────────────┬───────────┘
                 │
        ┌────────┴────────┐
        │                 │
       YES               NO
        │                 │
        ▼                 ▼
   ┌────────┐    ┌──────────────────┐
   │ Image  │    │ TRY: Gemini      │
   │ Blob   │    │ Imagen 3.0       │
   └───┬────┘    └────────┬─────────┘
       │                  │
       │         ┌────────┴────────┐
       │         │                 │
       │        YES               NO
       │         │                 │
       │         ▼                 ▼
       │    ┌────────┐     ┌──────────────────┐
       │    │ Image  │     │ TRY: Unsplash    │
       │    │ Data   │     │ Search           │
       │    └────────┘     └────────┬─────────┘
       │         │                  │
       └─────────┼──────────────────┘
                 │
                 ▼
      ┌──────────────────────┐
      │ Convert to Base64    │
      │ or get URL           │
      └──────────┬───────────┘
                 │
        ┌────────┴────────┐
        ▼                 ▼
   ┌─────────┐    ┌────────────┐
   │Base64   │    │Unsplash URL│
   │Data URL │    │(Fallback)  │
   └────┬────┘    └──────┬─────┘
        │                 │
        └─────────┬───────┘
                  │
                  ▼
      ┌──────────────────────┐
      │ Store in             │
      │ GeneratedImageData   │
      │ {                    │
      │   hero: "...",       │
      │   feature1: "...",   │
      │   feature2: "...",   │
      │   feature3: "..."    │
      │ }                    │
      └──────────┬───────────┘
                 │
                 ▼
      ┌──────────────────────┐
      │ Embed in Template    │
      │ Replace placeholders │
      └──────────┬───────────┘
                 │
                 ▼
      ┌──────────────────────┐
      │ Render to Browser    │
      │ Display Preview      │
      └──────────┬───────────┘
                 │
                 ▼
      ┌──────────────────────┐
      │ User Actions:        │
      │ • Download           │
      │ • Regenerate         │
      │ • Share              │
      └──────────────────────┘
```

---

## API Call Decision Tree

```
Generate Image Requested
│
├─ MOCK_MODE = true?
│  └─ YES → Return SVG placeholder (instant)
│
└─ NO → Attempt Real Generation
   │
   ├─ API Key available?
   │  └─ NO → Return SVG placeholder
   │
   └─ YES → Try Primary API
      │
      ├─ Hugging Face Stable Diffusion
      │  POST /models/runwayml/stable-diffusion-v1-5
      │  │
      │  ├─ SUCCESS (200) → Return image blob
      │  │                → Convert to Base64
      │  │                → Return data URL
      │  │
      │  └─ FAIL (4xx, 5xx, timeout)
      │     │
      │     └─ TRY BACKUP API #1
      │        │
      │        ├─ Gemini Imagen 3.0
      │        │  POST /v1beta/models/imagen-3.0-generate-001:generateImages
      │        │  │
      │        │  ├─ SUCCESS → Return image
      │        │  │
      │        │  └─ FAIL
      │        │     │
      │        │     └─ TRY BACKUP API #2
      │        │        │
      │        │        ├─ Unsplash Smart Search
      │        │        │  1. Generate search terms from prompt (Gemini)
      │        │        │  2. Query: GET /search?query=...
      │        │        │  │
      │        │        │  ├─ SUCCESS → Return image URL
      │        │        │  │
      │        │        │  └─ FAIL
      │        │        │     │
      │        │        │     └─ TRY BACKUP API #3
      │        │        │        │
      │        │        │        ├─ Curated Collection
      │        │        │        │  (By business type)
      │        │        │        │  Return pre-selected URL
      │        │        │        │  │
      │        │        │        │  └─ SUCCESS
      │        │        │        │
      │        │        │        └─ LAST RESORT
      │        │        │           Return SVG Placeholder
      │        │        │           (Gradient + text)
      │        │        │
      │        │        └─ SUCCESS → Return URL
      │        │
      │        └─ SUCCESS → Return image
      │
      └─ SUCCESS → Return data URL

RESULT: Always return image (AI-generated, stock, or placeholder)
```

---

## Data Flow Diagram

```
┌────────────────────────────────────────┐
│      INPUT (GenerateWebsiteForm)       │
├────────────────────────────────────────┤
│ {                                      │
│   businessName: "Nature Bikes",        │
│   businessType: "Tour Company",        │
│   prompt: "Beautiful nature imagery... │
│ }                                      │
└───────────────┬────────────────────────┘
                │
                ▼
┌────────────────────────────────────────┐
│  PROCESS 1: Design Spec Generation     │
│  (Gemini 2.0 Flash)                    │
└───────────────┬────────────────────────┘
                │
                ▼
┌────────────────────────────────────────┐
│      INTERMEDIATE (DesignSpec)         │
├────────────────────────────────────────┤
│ {                                      │
│   primaryColor: "#FF6B35",             │
│   secondaryColor: "#4ECDC4",           │
│   accentColor: "#FFE66D",              │
│   heroTitle: "Explore Nature...",      │
│   features: ["Adventure", "Safe"...],  │
│   imagePrompts: {                      │
│     hero: "Mountain bikers on trail...",
│     feature1: "Group cycling...",      │
│     feature2: "Scenic landscape...",   │
│     feature3: "Happy cyclists..."      │
│   }                                    │
│ }                                      │
└───────────────┬────────────────────────┘
                │
                ▼
┌────────────────────────────────────────┐
│  PROCESS 2: Image Generation (Parallel)│
│  For each: hero, feature1, feature2,   │
│  feature3                              │
└───────────────┬────────────────────────┘
                │
         ┌──────┴──────┬──────────┬────────┐
         ▼             ▼          ▼        ▼
    ┌────────┐    ┌────────┐ ┌────────┐ ┌────────┐
    │ Hero   │    │Feature1│ │Feature2│ │Feature3│
    │ 1920x  │    │1200x800 │1200x800 │1200x800 │
    │ 1080   │    │        │        │        │
    └───┬────┘    └───┬────┘ └───┬────┘ └───┬────┘
        │             │          │          │
        │ (in        │ (in      │ (in     │ (in
        │  parallel) │ parallel) parallel) parallel)
        │             │          │          │
        ▼             ▼          ▼          ▼
    ┌──────────────────────────────────────────┐
    │ API Calls (PQueue: concurrency = 3)      │
    │                                          │
    │ Each: Hugging Face API                   │
    │ Input: Detailed prompt + dimensions      │
    │ Output: Image blob                       │
    └──────────────────────────────────────────┘
        │             │          │          │
        ▼             ▼          ▼          ▼
    ┌────────────────────────────────────────┐
    │ Convert Blob → Base64 Data URL         │
    │ Format: data:image/png;base64,...      │
    │                                        │
    │ OR Fallback URL (Unsplash/SVG)        │
    └───────────────┬────────────────────────┘
                    │
                    ▼
┌────────────────────────────────────────┐
│      OUTPUT (GeneratedImageData)       │
├────────────────────────────────────────┤
│ {                                      │
│   hero: "data:image/png;base64,...",   │
│   feature1: "data:image/png;base64...", │
│   feature2: "data:image/png;base64...", │
│   feature3: "data:image/png;base64..."  │
│ }                                      │
└───────────────┬────────────────────────┘
                │
                ▼
┌────────────────────────────────────────┐
│  PROCESS 3: Template Rendering         │
│  (GeneratedTemplate)                   │
│                                        │
│  Replace: {{image:hero}} with output   │
│  Apply: Colors, fonts, layout          │
│  Render: HTML to browser               │
└───────────────┬────────────────────────┘
                │
                ▼
┌────────────────────────────────────────┐
│      OUTPUT: Complete Website Preview  │
│      Ready for download/deployment     │
└────────────────────────────────────────┘
```

---

## Component Interaction Diagram

```
User Interface Layer
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ┌──────────────────┐           ┌──────────────────┐  │
│  │GenerateWebsite   │    call   │ Result Modal     │  │
│  │    Form          ├──────────>│  (Preview)       │  │
│  │                  │<──────────┤                  │  │
│  └────────┬─────────┘  result   └────────┬─────────┘  │
│           │                              │            │
│           │ form data                    │ design + images
│           ▼                              ▼            │
│  ┌────────────────────────────────┐                   │
│  │ generateBusinessImages()       │                   │
│  │ (ImageGenerationService)       │                   │
│  └────────────┬────────────────────┘                   │
│               │                                        │
└───────────────┼────────────────────────────────────────┘
                │
Service Layer   │
┌───────────────┼────────────────────────────────────────┐
│               │                                        │
│    ┌──────────▼──────────────────────┐               │
│    │ ImageGenerationService          │               │
│    │                                 │               │
│    │ • generateBusinessImages()      │               │
│    │ • generateImageWithGemini()     │               │
│    │ • generatePlaceholder()         │               │
│    │ • getCuratedImages()            │               │
│    │ • generateImageWithUnsplash()   │               │
│    └────────────┬────────────────────┘               │
│                 │                                     │
└─────────────────┼─────────────────────────────────────┘
                  │
API Integration   │
┌─────────────────┼─────────────────────────────────────┐
│                 │                                     │
│    ┌────────────┴──────────┐                         │
│    │ Google Generative AI  │                         │
│    │ (Client - Gemini)     │                         │
│    └────────┬──────────────┘                         │
│             │                                        │
│    ┌────────▼─────────────────────────┐            │
│    │ External API Calls:              │            │
│    │                                  │            │
│    │ • Hugging Face Inference API     │            │
│    │ • Gemini Imagen 3.0              │            │
│    │ • Unsplash API                   │            │
│    │ • Gemini 2.5 Flash (prompt gen)  │            │
│    └────────────────────────────────────┘           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Error Handling Flow

```
generateBusinessImages() called
│
├─ TRY: Gemini prompt generation
│  │
│  ├─ SUCCESS → Continue to image generation
│  │
│  └─ FAIL
│     │
│     └─ CATCH: Log error
│        └─ Return SVG placeholders
│
├─ FOR EACH IMAGE (hero, feature1, feature2, feature3)
│  │
│  ├─ TRY: Primary API (Hugging Face)
│  │  │
│  │  ├─ SUCCESS → Return Base64 data URL
│  │  │
│  │  └─ FAIL (4xx, 5xx, timeout)
│  │     │
│  │     ├─ CATCH: Log error
│  │     │
│  │     └─ TRY: Backup 1 (Gemini Imagen)
│  │        │
│  │        ├─ SUCCESS → Return image data
│  │        │
│  │        └─ FAIL
│  │           │
│  │           └─ TRY: Backup 2 (Unsplash Search)
│  │              │
│  │              ├─ SUCCESS → Return URL
│  │              │
│  │              └─ FAIL
│  │                 │
│  │                 └─ RETURN: SVG Placeholder
│  │
│  └─ FINALLY: Generate all 4 in parallel
│
├─ All images collected
│  │
│  ├─ Return: GeneratedImageData
│  │
│  └─ UI updates with images
│
└─ If FULL FAILURE
   │
   ├─ GenerateWebsiteForm catches error
   │
   ├─ Toast: "⚠️ Using fallback images"
   │
   └─ Use static Unsplash URLs
```

---

## State Management Flow

```
GenerateWebsiteForm Component
│
├─ State Variables:
│  │
│  ├─ [businessName, setBusinessName]
│  ├─ [businessType, setBusinessType]
│  ├─ [prompt, setPrompt]
│  ├─ [isGenerating, setIsGenerating]
│  ├─ [generatingImages, setGeneratingImages] ← Key for image gen
│  ├─ [designSpec, setDesignSpec]
│  └─ [showResultModal, setShowResultModal]
│
├─ On Form Submit (handleGenerate):
│  │
│  ├─ setIsGenerating(true)
│  ├─ Call: generateContent() → designSpec
│  ├─ setGeneratingImages(true)
│  ├─ Call: generateBusinessImages() → images
│  ├─ designSpec.generatedImages = images
│  ├─ setGeneratingImages(false)
│  ├─ setIsGenerating(false)
│  ├─ setDesignSpec(designSpec)
│  ├─ setShowResultModal(true)
│  └─ Toast: "✅ Generated!"
│
└─ Pass to GeneratedTemplate:
   │
   └─ <GeneratedTemplate
      businessName={businessName}
      businessType={businessType}
      designSpec={designSpec}  ← Contains generatedImages
      />
```

---

## Caching Strategy

```
User requests images for:
  businessName = "Nature Bikes"
  businessType = "Tour"
  prompt = "Mountain biking..."
│
▼
Generate cache key:
  key = hash(businessName + businessType + prompt)
│
▼
Check cache:
  if (cache.has(key)) {
    ✓ RETURN cached images (instant)
  }
│
▼
Cache miss:
  → Call APIs
  → Generate images
  → Store in cache[key] = generatedImages
  → RETURN new images
│
▼
Benefits:
  • Subsequent requests for same business: instant
  • Reduces API calls by 50-70%
  • Improves perceived performance
  • Saves API quota
```

---

## Fallback Image Priority

```
Image Selection Priority:
│
├─ PRIORITY 1: AI-Generated (Preferred)
│  └─ Source: Hugging Face Stable Diffusion
│     Quality: High, specific to business
│     Speed: 5-30 seconds per image
│
├─ PRIORITY 2: Curated Collection
│  └─ Source: Unsplash curated by business type
│     Quality: High, professional
│     Speed: Instant
│
├─ PRIORITY 3: Smart Unsplash Search
│  └─ Source: Gemini → Unsplash search
│     Quality: Medium to high
│     Speed: 2-5 seconds
│
├─ PRIORITY 4: Generic Unsplash
│  └─ Source: Generic business/professional image
│     Quality: Medium
│     Speed: Instant
│
└─ PRIORITY 5: SVG Placeholder
   └─ Source: Generated SVG gradient
      Quality: Low (but readable)
      Speed: Instant
      Fallback: Always available
```

---

**Diagram Legend:**
- `→` = Direct flow
- `├─` = Branch/option
- `▼` = Step progression
- `┌──┐` = Process box
- `│  │` = Container

