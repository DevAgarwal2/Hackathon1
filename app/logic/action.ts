// lib/actions.ts

'use server';

import { fal } from '@fal-ai/client';
import OpenAI from 'openai';
import { v4 as uuidv4 } from 'uuid';

// --- Initialize API Clients ---
const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
});

// --- Type Definitions for structured data ---
interface CreativeConcept {
  variation_id: number;
  background_theme: string;
  surface_description: string;
  backdrop_description: string;
  lighting_setup: string;
  color_palette: string;
  overall_mood: string;
  rationale: string;
}

// FIX: Updated type definitions to match the actual FAL API response structure
interface FalImage {
  url: string;
  content_type?: string;
  file_name?: string;
  file_size?: number;
  width?: number;
  height?: number;
}

interface FalImageEditResult {
  data: {
    images: FalImage[];
    description: string;
  };
  requestId: string;
}

// --- Helper Functions ---

/**
 * Uploads an image buffer to FAL storage.
 */
async function uploadToFal(imageBuffer: Buffer, filename: string): Promise<string> {
  try {
    // Convert Buffer to Uint8Array to ensure compatibility with File constructor
    const uint8Array = new Uint8Array(imageBuffer);
    
    // Create a File object with the converted buffer
    const imageFile = new File([uint8Array], filename, { type: 'image/png' });
    
    // Call upload with the File object
    const url = await fal.storage.upload(imageFile);
    
    return url;
  } catch (error) {
    console.error('FAL upload failed:', error);
    throw new Error('Failed to upload image to FAL storage.');
  }
}

/**
 * Cleans and validates a JSON string from the AI response.
 */
function cleanAndParseJson(responseText: string): CreativeConcept | null {
  const cleaned = responseText.replace(/```json\s*|\s*```/g, '').trim();
  try {
    return JSON.parse(cleaned) as CreativeConcept;
  } catch (error) {
    console.error('JSON validation failed:', error);
    console.error('Problematic JSON string:', cleaned.substring(0, 200));
    return null;
  }
}

/**
 * Returns the structured prompt for Gemini to generate a creative brief.
 */
function getGeminiCreativeBriefPrompt(variationNumber: number): string {
  return `
You are a world-class Creative Director for luxury product photography. Create variation #${variationNumber} with a completely unique aesthetic.

⚠️ CRITICAL: The original product must remain 100% UNCHANGED - no alterations, filters, or modifications to the product itself. Only change the background/environment.

ANALYZE the product image first:
- What type of product is this?
- What's the target audience/market segment?  
- What emotions should this product evoke?

CREATE a premium background concept that avoids generic AI aesthetics:
✓ Use REAL, tangible materials (actual wood, metal, fabric, stone, paper)
✓ Embrace natural imperfections, wear, and authentic textures
✓ Reference classic photography styles, not digital art trends
✓ Think like a physical set designer, not a digital artist
✓ Avoid: oversaturated colors, perfect gradients, floating elements, fantasy scenes
✓ Focus on: craftsmanship, authenticity, timeless appeal

BACKGROUND VARIATION THEMES (choose ONE approach):
- Artisanal Craft: Handmade materials, workshop aesthetic, raw textures
- Editorial Luxury: Clean geometry, premium materials, sophisticated lighting  
- Lifestyle Context: Real environments where the product naturally belongs
- Material Story: Backgrounds that reflect the product's own materials/origins

MANDATORY REQUIREMENTS:
- Product itself is NEVER altered, enhanced, or modified
- Backgrounds feel like real photography, not digital composites
- Use studio-achievable setups with actual props and materials
- Avoid trendy AI visual clichés and overstyled effects
- Create timeless, professional commercial photography

OUTPUT FORMAT - Return ONLY this JSON (no extra text):
{
    "variation_id": ${variationNumber},
    "background_theme": "Concise theme name (2-3 words max)",
    "surface_description": "Specific material/texture the product rests on",
    "backdrop_description": "What appears behind the product",
    "lighting_setup": "Primary lighting direction and quality",
    "color_palette": "3-4 main colors used in the scene",
    "overall_mood": "Emotional atmosphere created",
    "rationale": "Why this specific concept enhances THIS product's appeal"
}
`;
}
/**
 * Calls Gemini to generate a creative brief for a background.
 */
async function generateCreativeConceptWithGemini(
  base64Image: string,
  variationNumber: number
): Promise<CreativeConcept | null> {
  console.log(`🧠 Calling Gemini for variation #${variationNumber} creative concept...`);
  try {
    const promptText = getGeminiCreativeBriefPrompt(variationNumber);
    const response = await openai.chat.completions.create({
      model: 'gemini-2.5-flash',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: promptText },
            { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${base64Image}` } },
          ],
        },
      ],
      temperature: 0.8,
    });

    const rawResponse = response.choices[0].message.content;
    if (!rawResponse) return null;

    const creativeConcept = cleanAndParseJson(rawResponse);
    if (creativeConcept) {
        console.log(`✅ Gemini concept received for variation #${variationNumber}`);
        return creativeConcept;
    }
    console.log(`❌ Gemini response for variation #${variationNumber} was not valid JSON.`);
    return null;

  } catch (error) {
    console.error(`❌ Error calling Gemini API for variation #${variationNumber}:`, error);
    return null;
  }
}


function getStaticFallbackPrompt(variationNumber: number): string {
  const prompts = [
    'Place this product on a modern white marble surface with soft natural lighting and a clean minimalist background',
    'Put this product in a warm wooden environment with natural textures and cozy lighting',
    'Create an industrial concrete background with dramatic lighting and urban atmosphere',
    'Place on a dark elegant surface with luxury lighting and sophisticated backdrop',
    'Create a colorful vibrant background with playful elements and bright lighting',
  ];
  return prompts[(variationNumber - 1) % prompts.length];
}


async function processSingleVariation(
  base64Image: string,
  imageUrl: string,
  variationNumber: number
) {
  const creativeConcept = await generateCreativeConceptWithGemini(base64Image, variationNumber);
  
  let finalPrompt: string;
  let promptSource: 'Gemini' | 'Static Fallback' = 'Static Fallback';

  if (creativeConcept) {
    finalPrompt = `Product photography: ${creativeConcept.background_theme}. The product sits on ${creativeConcept.surface_description}. The backdrop is ${creativeConcept.backdrop_description}. Lighting: ${creativeConcept.lighting_setup}. The mood is ${creativeConcept.overall_mood}. High-end, realistic, studio quality. Keep the product exactly the same, only change the background.`;
    promptSource = 'Gemini';
  } else {
    console.log(`⚠️ Using static fallback prompt for variation #${variationNumber}`);
    finalPrompt = getStaticFallbackPrompt(variationNumber);
  }

  console.log(`🎨 Generating variation #${variationNumber} with FAL using ${promptSource} prompt...`);

  try {
    // FIX: Updated to match the correct FAL API response structure
    const result = await fal.subscribe("fal-ai/gemini-25-flash-image/edit", {
        input: {
            prompt: finalPrompt,
            image_urls: [imageUrl],
            num_images: 1,
        },
        logs: true
    }) as FalImageEditResult;

    console.log(`📊 FAL API Response for variation #${variationNumber}:`, JSON.stringify(result, null, 2));

    // FIX: Access the correct path in the response structure
    if (!result || !result.data || !result.data.images || result.data.images.length === 0) {
      console.error(`❌ FAL API response structure for variation #${variationNumber}:`, result);
      throw new Error('FAL API did not return an image in the expected format.');
    }

    const generatedImageUrl = result.data.images[0].url;
    console.log(`✅ Successfully generated variation #${variationNumber}: ${generatedImageUrl}`);

    return {
      success: true,
      variation_number: variationNumber,
      image_url: generatedImageUrl,
      creative_concept: creativeConcept || { background_theme: 'Fallback', rationale: 'Gemini API failed or returned invalid data.' },
      prompt_source: promptSource,
    };

  } catch (error) {
    console.error(`❌ Error in processSingleVariation for variation #${variationNumber}:`, error);
    throw error;
  }
}

// --- The Main Server Action ---
export async function generateBackgrounds(prevState: any, formData: FormData) {
  const file = formData.get('file') as File;
  const numVariations = Number(formData.get('numVariations'));

  if (!file || file.size === 0) return { message: 'Please provide an image file.', error: true, data: null };
  if (isNaN(numVariations) || numVariations < 1 || numVariations > 5) return { message: 'Number of variations must be between 1 and 5.', error: true, data: null };

  try {
    const imageBuffer = Buffer.from(await file.arrayBuffer());
    const base64Image = imageBuffer.toString('base64');
    
    const uniqueFilename = `${uuidv4()}-${file.name}`;
    
    console.log(`📤 Uploading ${uniqueFilename} to FAL storage...`);
    const originalImageUrl = await uploadToFal(imageBuffer, uniqueFilename);
    console.log(`✅ Uploaded to FAL: ${originalImageUrl}`);

    const variationPromises = Array.from({ length: numVariations }, (_, i) =>
      processSingleVariation(base64Image, originalImageUrl, i + 1)
    );
    
    const settledResults = await Promise.allSettled(variationPromises);

    const successful = settledResults
      .filter((r) => r.status === 'fulfilled')
      .map((r) => (r as PromiseFulfilledResult<any>).value);
      
    const failed = settledResults
      .filter((r) => r.status === 'rejected')
      .map((r, i) => ({ variation_number: i + 1, error: (r as PromiseRejectedResult).reason.message }));

    console.log(`🎯 Final Results: ${successful.length} successful, ${failed.length} failed`);

    return {
      message: `Generated ${successful.length}/${numVariations} variations.`,
      error: false,
      data: {
        original_image_url: originalImageUrl,
        results: successful,
        errors: failed.length > 0 ? failed : null,
      },
    };
  } catch (e: any) {
    console.error("An unexpected error occurred in the server action:", e);
    return { message: `Generation failed: ${e.message}`, error: true, data: null };
  }
}