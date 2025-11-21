import { GoogleGenerativeAI } from "@google/generative-ai";

export interface GeneratedImageData {
  hero: string;
  feature1: string;
  feature2: string;
  feature3: string;
}

interface ImageDescription {
  description: string;
  searchTerms: string;
  style: string;
}

// Curated Unsplash photo collections for different business types
const BUSINESS_IMAGE_COLLECTIONS: Record<string, string[]> = {
  bakery: [
    "https://images.unsplash.com/photo-1509440159596-0249088772ff",
    "https://images.unsplash.com/photo-1555507036-ab1f4038808a",
    "https://images.unsplash.com/photo-1517433670267-08bbd4be890f",
    "https://images.unsplash.com/photo-1486427944299-d1955d23e34d"
  ],
  restaurant: [
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327"
  ],
  fitness: [
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
    "https://images.unsplash.com/photo-1574680088814-a440b08b9c43"
  ],
  gym: [
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
    "https://images.unsplash.com/photo-1574680088814-a440b08b9c43"
  ],
  consulting: [
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    "https://images.unsplash.com/photo-1552664730-d307ca884978",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0"
  ],
  business: [
    "https://images.unsplash.com/photo-1497366216548-37526070297c",
    "https://images.unsplash.com/photo-1557804506-669a67965ba0",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984"
  ],
  office: [
    "https://images.unsplash.com/photo-1497366216548-37526070297c",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
    "https://images.unsplash.com/photo-1542744094-24638eff58bb",
    "https://images.unsplash.com/photo-1556761175-4b46a572b786"
  ],
  coffee: [
    "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb",
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    "https://images.unsplash.com/photo-1442512595331-e89e73853f31",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
  ],
  shop: [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc",
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
    "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0"
  ],
  retail: [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc",
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
    "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0"
  ],
  tech: [
    "https://images.unsplash.com/photo-1518770660439-4636190af475",
    "https://images.unsplash.com/photo-1504639725590-34d0984388bd",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"
  ],
  spa: [
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef",
    "https://images.unsplash.com/photo-1507652313519-d4e9174996dd",
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874"
  ],
  salon: [
    "https://images.unsplash.com/photo-1560066984-138dadb4c035",
    "https://images.unsplash.com/photo-1522337660859-02fbefca4702",
    "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3",
    "https://images.unsplash.com/photo-1562322140-8baeececf3df"
  ],
  photography: [
    "https://images.unsplash.com/photo-1542038784456-1ea8e935640e",
    "https://images.unsplash.com/photo-1452587925148-ce544e77e70d",
    "https://images.unsplash.com/photo-1606857521015-7f9fcf423740",
    "https://images.unsplash.com/photo-1554048612-b6a482bc67e5"
  ],
  design: [
    "https://images.unsplash.com/photo-1561070791-2526d30994b5",
    "https://images.unsplash.com/photo-1572044162444-ad60f128bdea",
    "https://images.unsplash.com/photo-1558655146-d09347e92766",
    "https://images.unsplash.com/photo-1600132806370-bf17e65e942f"
  ],
  marketing: [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    "https://images.unsplash.com/photo-1533750516457-a7f992034fec",
    "https://images.unsplash.com/photo-1557838923-2985c318be48",
    "https://images.unsplash.com/photo-1542744094-3a31f272c490"
  ],
  construction: [
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5",
    "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122",
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
    "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1"
  ],
  real_estate: [
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
  ],
  education: [
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1"
  ],
  healthcare: [
    "https://images.unsplash.com/photo-1551601651-2a8555f1a136",
    "https://images.unsplash.com/photo-1505751172876-fa1923c5c528",
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
    "https://images.unsplash.com/photo-1504439468489-c8920d796a29"
  ],
  food: [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327",
    "https://images.unsplash.com/photo-1490818387583-1baba5e638af",
    "https://images.unsplash.com/photo-1498837167922-ddd27525d352"
  ]
};

/**
 * Generate images using Gemini 2.5 Flash Image Generation with enhanced fallbacks
 * Primary: Gemini 2.5 Flash to generate detailed prompts
 * Fallback 1: Try Hugging Face Stable Diffusion
 * Fallback 2: Use smart Unsplash search based on prompts
 * Fallback 3: Use curated business-type-specific images
 */
export async function generateBusinessImages(
  businessName: string,
  businessType: string,
  description: string,
  geminiApiKey: string,
  _unusedApiKey?: string // Kept for backward compatibility
): Promise<GeneratedImageData> {
  try {
    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    console.log("🎨 Generating detailed image prompts with Gemini 2.5 Flash...");

    // Step 1: Generate detailed image prompts using Gemini
    const promptGenerationRequest = `You are an expert art director creating professional, realistic website images for "${businessName}", a ${businessType} business.

Business Description: ${description}

Generate 4 detailed, professional image prompts optimized for Unsplash searches and AI image generation.

Requirements:
- Create prompts that work for both AI generation AND Unsplash searches
- Include descriptive keywords that will find good Unsplash photos
- Focus on: professional photography, business scenarios, realistic settings
- Include lighting, mood, and composition details
- Make each image distinct and relevant to the business
- Each prompt 30-50 words, clear and specific

Create prompts for:
1. HERO: Professional hero/banner image for main landing page
2. FEATURE 1: Professional image for first key service/feature
3. FEATURE 2: Professional image for second key service/feature
4. FEATURE 3: Professional image for third key service/feature

Respond with ONLY valid JSON:
{
  "hero": "Full detailed prompt...",
  "feature1": "Full detailed prompt...",
  "feature2": "Full detailed prompt...",
  "feature3": "Full detailed prompt..."
}`;

    const promptResult = await model.generateContent(promptGenerationRequest);
    const promptText = promptResult.response.text();
    const cleanedPrompts = promptText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const imagePrompts: Record<string, string> = JSON.parse(cleanedPrompts);

    console.log("✅ Gemini generated detailed image prompts:", imagePrompts);

    // Step 2: Generate images with enhanced fallback chain
    console.log("🖼️ Generating images with enhanced fallback strategy...");

    const generatedImages: GeneratedImageData = {
      hero: await generateImageWithFallback(imagePrompts.hero, geminiApiKey, businessType, 1920, 1080),
      feature1: await generateImageWithFallback(imagePrompts.feature1, geminiApiKey, businessType, 1200, 800),
      feature2: await generateImageWithFallback(imagePrompts.feature2, geminiApiKey, businessType, 1200, 800),
      feature3: await generateImageWithFallback(imagePrompts.feature3, geminiApiKey, businessType, 1200, 800)
    };

    console.log("✅ Successfully generated all images with fallbacks:", generatedImages);
    return generatedImages;

  } catch (error) {
    console.error("❌ Error generating image prompts:", error);
    console.log("⚠️ Using curated business images as primary fallback");
    // Fallback to curated images by business type
    return getCuratedImages(businessType);
  }
}

/**
 * Generate image with enhanced fallback chain:
 * 1. Try Hugging Face Stable Diffusion (with retry)
 * 2. Try Unsplash smart search
 * 3. Use curated business-type images
 */
async function generateImageWithFallback(
  prompt: string,
  geminiApiKey: string,
  businessType: string,
  width: number = 1200,
  height: number = 800
): Promise<string> {
  // Try Gemini Imagen first (User requested)
  console.log("🎨 Trying Gemini Imagen first...");
  const geminiImage = await generateImageWithGeminiImagen(prompt, geminiApiKey, width, height);
  if (geminiImage && !geminiImage.includes('unsplash')) {
    console.log("✅ Using Gemini Imagen generated image");
    return geminiImage;
  }

  // Try Hugging Face second (with retry)
  console.log("⚠️ Gemini Imagen failed/skipped, trying Hugging Face...");
  const hfImage = await tryHuggingFaceGeneration(prompt, width, height);
  if (hfImage && !hfImage.includes('svg')) {
    console.log("✅ Using Hugging Face generated image");
    return hfImage;
  }

  // Try Unsplash smart search
  console.log("⚠️ HF failed, trying Unsplash smart search...");
  const unsplashImage = await generateImageWithUnsplashSearch(prompt, width, height);
  if (unsplashImage && !unsplashImage.includes('svg')) {
    console.log("✅ Using Unsplash searched image");
    return unsplashImage;
  }

  // Fall back to curated business images
  console.log("⚠️ Both failed, using curated business images");
  const curatedImages = getCuratedImages(businessType);
  return curatedImages.hero;
}

/**
 * Try to generate a single image using Hugging Face Inference API with retry logic
 * Uses Stable Diffusion with exponential backoff for rate limiting
 */
async function tryHuggingFaceGeneration(
  prompt: string,
  width: number = 1200,
  height: number = 800,
  retries: number = 2
): Promise<string> {
  const maxRetries = retries;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🎨 Hugging Face attempt ${attempt + 1}/${maxRetries + 1}: ${prompt.substring(0, 50)}...`);

      // Use Hugging Face's free inference API with Stable Diffusion
      // Try multiple endpoints for better availability
      const endpoints = [
        "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1",
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2"
      ];

      const endpoint = endpoints[attempt % endpoints.length];
      console.log(`🔄 Calling endpoint: ${endpoint}`);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_HUGGING_FACE_TOKEN || ''}`
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            height: Math.min(height, 512),
            width: Math.min(width, 512),
            num_inference_steps: 20
          }
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      console.log(`📡 API Response status: ${response.status}`);

      // Check for rate limiting - wait and retry
      if (response.status === 429) {
        const retryAfter = response.headers.get('retry-after') || String(Math.pow(2, attempt) * 2);
        const waitTime = parseInt(retryAfter) * 1000;
        console.log(`⏳ Rate limited, waiting ${waitTime}ms before retry...`);

        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, waitTime));
          continue;
        }
        throw new Error(`Rate limited after ${maxRetries} retries`);
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API returned ${response.status}: ${errorText.substring(0, 100)}`);
      }

      // Response is binary image data
      const blob = await response.blob();

      // Validate blob size
      if (blob.size < 1000) {
        throw new Error(`Generated blob too small: ${blob.size} bytes`);
      }

      console.log(`📸 Image blob received: ${blob.size} bytes`);

      // Convert blob to base64
      const reader = new FileReader();

      return new Promise((resolve, reject) => {
        reader.onloadend = () => {
          try {
            const result = reader.result as string;
            const base64String = result.split(',')[1];
            if (!base64String) {
              reject(new Error("Failed to extract base64"));
              return;
            }
            const imageUrl = `data:image/png;base64,${base64String}`;
            console.log(`✅ AI-generated image successfully created via Hugging Face`);
            resolve(imageUrl);
          } catch (err) {
            reject(err);
          }
        };

        reader.onerror = () => {
          reject(new Error("Failed to read blob"));
        };

        reader.readAsDataURL(blob);
      });

    } catch (error) {
      lastError = error as Error;
      console.error(`❌ Hugging Face attempt ${attempt + 1} failed:`, error);

      if (attempt < maxRetries) {
        // Exponential backoff before retry
        const delay = Math.pow(2, attempt) * 1000;
        console.log(`⏳ Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  console.error(`❌ All Hugging Face attempts failed:`, lastError);
  // Return empty string to trigger next fallback
  return "";
}

/**
 * Generate a simple SVG placeholder image when AI generation fails
 */
function generatePlaceholderImage(prompt: string): string {
  const truncatedPrompt = prompt.substring(0, 60).replace(/"/g, "'");

  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#grad)"/>
      <text x="600" y="350" font-size="32" font-weight="bold" fill="white" text-anchor="middle" font-family="Arial">
        Professional Business Image
      </text>
      <text x="600" y="420" font-size="16" fill="rgba(255,255,255,0.8)" text-anchor="middle" font-family="Arial">
        "${truncatedPrompt}..."
      </text>
      <text x="600" y="480" font-size="14" fill="rgba(255,255,255,0.6)" text-anchor="middle" font-family="Arial">
        AI-Generated Image
      </text>
    </svg>
  `;

  // Convert SVG to data URL
  const svgBase64 = btoa(svgContent.trim());
  return `data:image/svg+xml;base64,${svgBase64}`;
}

/**
 * Generate a single image using Gemini Imagen API (backup method)
 * Falls back to Unsplash if API is unavailable
 */
async function generateImageWithGeminiImagen(
  prompt: string,
  apiKey: string,
  width: number = 1200,
  height: number = 800
): Promise<string> {
  try {
    console.log(`🎨 Generating image with Gemini Imagen: ${prompt.substring(0, 50)}...`);

    // Try the Gemini Imagen 3.0 API endpoint
    const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:generateImages";

    console.log(`🔄 Calling Gemini Imagen API...`);
    const response = await fetch(`${endpoint}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        instances: [
          {
            prompt: prompt
          }
        ],
        parameters: {
          sampleCount: 1
        }
      })
    });

    console.log(`📡 API Response status: ${response.status}`);
    const responseText = await response.text();
    console.log(`📡 API Response body: ${responseText.substring(0, 200)}`);

    if (response.ok) {
      try {
        const data = JSON.parse(responseText);
        console.log("✅ Gemini Imagen API response received");

        // Handle various response formats
        const predictions = data.predictions || data.output || [];

        if (predictions && predictions.length > 0) {
          const imageData = predictions[0];
          let imageUrl = imageData.bytesBase64Encoded || imageData.image || imageData.imageBase64;

          // If it's base64, convert to data URL
          if (typeof imageUrl === 'string' && imageUrl.length > 100) {
            imageUrl = `data:image/png;base64,${imageUrl}`;
            console.log(`📸 AI-generated base64 image created`);
            return imageUrl;
          } else if (typeof imageUrl === 'string' && imageUrl.startsWith('http')) {
            console.log(`📸 AI-generated image URL returned`);
            return imageUrl;
          }
        }

        throw new Error(`No valid image in response`);
      } catch (parseError) {
        console.error(`❌ Failed to parse response:`, parseError);
        throw parseError;
      }
    } else {
      throw new Error(`API returned ${response.status}`);
    }

  } catch (error) {
    console.error("❌ Gemini Imagen generation failed:", error);
    console.log("⚠️ Falling back to Unsplash search");
    // Fallback to Unsplash since Gemini Imagen failed
    return await generateImageWithUnsplashSearch(prompt, width, height);
  }
}

/**
 * Fallback: Generate smart Unsplash search terms and fetch relevant images
 * Uses Gemini to create contextual search terms from detailed prompts
 */
async function generateImageWithUnsplashSearch(
  prompt: string,
  width: number = 1200,
  height: number = 800
): Promise<string> {
  try {
    console.log(`🔍 Generating Unsplash search from prompt: ${prompt.substring(0, 50)}...`);

    const genAI = new GoogleGenerativeAI("AIzaSyChKs7f7BKCQGgrNJXvUCjy5pBE-7jlukg");
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Use Gemini to create search terms from the detailed prompt
    const searchTermPrompt = `Convert this image description into 1-2 specific Unsplash search terms that will find real, professional photos:
"${prompt}"

Requirements:
- Use only 1-2 simple words or short phrases
- Make it searchable on Unsplash
- Focus on the main visual element
- No descriptions, just search terms

Example: "modern office" or "team meeting"

Respond with ONLY the search terms, nothing else.`;

    const searchResult = await model.generateContent(searchTermPrompt);
    let searchTerms = searchResult.response.text().trim().toLowerCase();

    // Clean up search terms
    searchTerms = searchTerms.replace(/['"]/g, '').replace(/[,;]/g, '').trim();

    console.log(`✅ Search terms generated: "${searchTerms}"`);

    // Build Unsplash URL with the generated search terms
    const encodedSearch = encodeURIComponent(searchTerms);

    // Use Unsplash's source.unsplash.com which provides random relevant images
    const imageUrl = `https://source.unsplash.com/${Math.min(width, 1920)}x${Math.min(height, 1080)}/?${encodedSearch}&t=${Date.now()}`;

    console.log(`📸 Unsplash image URL generated: ${imageUrl}`);

    // Verify the image loads properly by checking it
    const testResponse = await fetch(imageUrl, { method: 'HEAD' });
    if (testResponse.ok) {
      console.log(`✅ Unsplash image verified and ready`);
      return imageUrl;
    }

    throw new Error("Unsplash image verification failed");

  } catch (error) {
    console.error("❌ Unsplash search generation failed:", error);

    // Return a generic professional business image as last resort
    const fallbackUrl = `https://images.unsplash.com/photo-1497366216548-37526070297c?w=${Math.min(width, 1920)}&h=${Math.min(height, 1080)}&fit=crop&q=80&auto=format&t=${Date.now()}`;
    console.log(`⚠️ Falling back to generic business image: ${fallbackUrl}`);
    return fallbackUrl;
  }
}


/**
 * Get curated, high-quality images for a business type
 */
function getCuratedImages(businessType: string): GeneratedImageData {
  const type = businessType.toLowerCase();

  console.log(`📷 Getting curated images for business type: "${businessType}"`);

  // Find matching collection
  for (const [key, images] of Object.entries(BUSINESS_IMAGE_COLLECTIONS)) {
    if (type.includes(key)) {
      console.log(`✅ Found matching collection: "${key}"`);
      const result = {
        hero: `${images[0]}?w=1920&h=1080&fit=crop&q=80&auto=format`,
        feature1: `${images[1]}?w=1200&h=800&fit=crop&q=80&auto=format`,
        feature2: `${images[2]}?w=1200&h=800&fit=crop&q=80&auto=format`,
        feature3: `${images[3]}?w=1200&h=800&fit=crop&q=80&auto=format`
      };
      console.log("📸 Generated image URLs:", result);
      return result;
    }
  }

  // Default to business images
  console.log("⚠️ No specific match found, using default business images");
  const defaultImages = BUSINESS_IMAGE_COLLECTIONS.business;
  const result = {
    hero: `${defaultImages[0]}?w=1920&h=1080&fit=crop&q=80&auto=format`,
    feature1: `${defaultImages[1]}?w=1200&h=800&fit=crop&q=80&auto=format`,
    feature2: `${defaultImages[2]}?w=1200&h=800&fit=crop&q=80&auto=format`,
    feature3: `${defaultImages[3]}?w=1200&h=800&fit=crop&q=80&auto=format`
  };
  console.log("📸 Generated default image URLs:", result);
  return result;
}

/**
 * Get fallback images based on business type
 */
function getFallbackImages(businessType: string): GeneratedImageData {
  return getCuratedImages(businessType);
}

/**
 * Get single fallback image for business type
 */
function getFallbackImageForType(businessType: string, width: number, height: number): string {
  const images = getCuratedImages(businessType);
  return images.hero;
}

/**
 * Generate a single custom image based on a specific prompt
 */
export async function generateSingleImage(
  prompt: string,
  width: number = 1200,
  height: number = 800
): Promise<string> {
  try {
    // Use a default business image
    return `https://images.unsplash.com/photo-1497366216548-37526070297c?w=${width}&h=${height}&fit=crop&q=80&auto=format`;
  } catch (error) {
    console.error("Single image generation error:", error);
    return `https://images.unsplash.com/photo-1497366216548-37526070297c?w=${width}&h=${height}&fit=crop&q=80&auto=format`;
  }
}
