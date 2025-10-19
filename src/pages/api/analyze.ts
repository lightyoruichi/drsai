import type { APIRoute } from 'astro';
import type { DentalDiagnosis } from '../../types/dental';
import { getDefaultModelId, getModelConfig } from '../../config/models-updated-2025';

export const POST: APIRoute = async ({ request }) => {
  const requestId = Math.random().toString(36).substring(7);
  console.log(`[${requestId}] ===== NEW REQUEST =====`);
  console.log(`[${requestId}] Timestamp: ${new Date().toISOString()}`);
  console.log(`[${requestId}] URL: ${request.url}`);
  
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const initialDiagnosis = formData.get('initialDiagnosis') as string;
    const customModel = formData.get('model') as string | null;

    console.log(`[${requestId}] Form data received:`, {
      hasFile: !!file,
      fileType: file?.type,
      fileSize: file?.size,
      hasDiagnosis: !!initialDiagnosis,
      customModel
    });

    if (!file || !initialDiagnosis) {
      console.error(`[${requestId}] ERROR: Missing required fields - file: ${!!file}, diagnosis: ${!!initialDiagnosis}`);
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if file is an image
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    const fileType = file.type.toLowerCase();
    
    if (!validImageTypes.includes(fileType) && !fileType.startsWith('image/')) {
      console.error(`[${requestId}] ERROR: Invalid file type - ${file.type}`);
      return new Response(JSON.stringify({ 
        error: 'Invalid file type. Please upload an image file (JPG, PNG, WebP, or GIF)',
        details: `Received: ${file.type}. PDFs are not supported by vision models. Please convert your PDF to images first.`
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Convert file to base64
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const mimeType = file.type || 'image/jpeg';
    const dataUrl = `data:${mimeType};base64,${base64}`;
    
    console.log(`[${requestId}] Processing ${file.name} (${file.type}, ${(file.size / 1024).toFixed(2)} KB)`);

    // Call OpenRouter API
    const openRouterApiKey = import.meta.env.OPENROUTER_API_KEY;
    
    if (!openRouterApiKey) {
      console.error(`[${requestId}] ERROR: OPENROUTER_API_KEY environment variable not set`);
      return new Response(JSON.stringify({ error: 'OpenRouter API key not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    console.log(`[${requestId}] API key found: ${openRouterApiKey.substring(0, 10)}...`);

    // Get model configuration
    const modelId = customModel || getDefaultModelId();
    const modelConfig = getModelConfig(modelId);

    console.log(`[${requestId}] Model selected: ${modelConfig.name} (${modelConfig.id})`);

    // Check if model supports vision
    if (!modelConfig.supportsVision) {
      console.error(`[${requestId}] ERROR: Model ${modelConfig.name} does not support vision`);
      return new Response(JSON.stringify({ 
        error: `Model ${modelConfig.name} does not support vision. Please use a vision-capable model.`,
        suggestion: 'Try: anthropic/claude-3.5-sonnet, openai/gpt-4o, or google/gemini-pro-1.5'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const estimatedCost = (modelConfig.costPer1MInputTokens * 2 + modelConfig.costPer1MOutputTokens * 1.5) / 1000;
    console.log(`[${requestId}] Using model: ${modelConfig.name} (${modelConfig.id})`);
    console.log(`[${requestId}] Estimated cost: $${estimatedCost.toFixed(4)}`);

    const systemPrompt = `You are an expert dental AI assistant analyzing dental scans. 
Provide a comprehensive dental diagnosis including:
1. Overall assessment
2. Confidence score (0-100)
3. Detailed findings with severity levels
4. Comparison with the patient's initial diagnosis (what they got right, wrong, and what you found additionally)
5. Individual tooth analysis for all 32 teeth (use Universal Numbering System: 1-32)
6. Recommendations
7. Urgency level

Return ONLY valid JSON matching this exact structure (no markdown, no code blocks):
{
  "overallAssessment": "string",
  "confidenceScore": number,
  "findings": [
    {
      "category": "string",
      "description": "string",
      "severity": "none" | "mild" | "moderate" | "severe",
      "confidence": number
    }
  ],
  "comparisonWithInitialDiagnosis": {
    "correct": ["string"],
    "incorrect": ["string"],
    "additional": ["string"]
  },
  "teethChart": [
    {
      "toothNumber": number (1-32),
      "condition": "string (e.g., 'Healthy', 'Cavity', 'Missing', 'Crown', etc.)",
      "severity": "none" | "mild" | "moderate" | "severe",
      "notes": "string"
    }
  ],
  "recommendations": ["string"],
  "urgency": "routine" | "soon" | "urgent" | "emergency"
}`;

    const userPrompt = `Analyze this dental scan image. The patient's initial diagnosis is: "${initialDiagnosis}"

Please provide a comprehensive dental analysis comparing your findings with their initial diagnosis.`;

    console.log(`[${requestId}] Sending request to OpenRouter API...`);
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openRouterApiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://drsai.app',
        'X-Title': 'DRS AI Dental Analysis'
      },
      body: JSON.stringify({
        model: modelConfig.id,
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: userPrompt
              },
              {
                type: 'image_url',
                image_url: {
                  url: dataUrl
                }
              }
            ]
          }
        ],
        temperature: 0.3,
        max_tokens: 4000
      })
    });

    console.log(`[${requestId}] OpenRouter response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[${requestId}] ERROR: OpenRouter API failed with status ${response.status}`);
      console.error(`[${requestId}] Error details:`, errorText);
      return new Response(JSON.stringify({ error: 'Failed to analyze image', details: errorText }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await response.json();
    console.log(`[${requestId}] Response received, parsing content...`);
    
    const content = data.choices[0]?.message?.content;

    if (!content) {
      console.error(`[${requestId}] ERROR: No content in AI response`, JSON.stringify(data, null, 2));
      return new Response(JSON.stringify({ error: 'No response from AI' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    console.log(`[${requestId}] Content length: ${content.length} characters`);

    // Parse the JSON response, handling potential markdown code blocks and extra text
    let diagnosis: DentalDiagnosis;
    try {
      console.log(`[${requestId}] Parsing AI response...`);
      
      // Remove markdown code blocks and extract JSON
      let cleanedContent = content
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      
      // Try to extract JSON from the response if it's wrapped in text
      const jsonMatch = cleanedContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cleanedContent = jsonMatch[0];
      }
      
      diagnosis = JSON.parse(cleanedContent);
      
      // Validate the response has required fields
      if (!diagnosis.overallAssessment || !diagnosis.teethChart || !diagnosis.findings) {
        throw new Error('Missing required fields in AI response');
      }
      
      console.log(`[${requestId}] Successfully parsed diagnosis with ${diagnosis.teethChart.length} teeth and ${diagnosis.findings.length} findings`);
      
    } catch (parseError) {
      console.error(`[${requestId}] ERROR: Failed to parse AI response`);
      console.error(`[${requestId}] Parse error:`, parseError);
      console.error(`[${requestId}] Raw content (first 500 chars):`, content.substring(0, 500));
      return new Response(JSON.stringify({ 
        error: 'Invalid AI response format', 
        details: parseError instanceof Error ? parseError.message : 'Could not parse JSON',
        rawResponse: content.substring(0, 500) // Include first 500 chars for debugging
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Generate unique ID
    const analysisId = Math.random().toString(36).substring(2, 15) + Date.now().toString(36);

    const result = {
      id: analysisId,
      diagnosis,
      initialDiagnosis,
      fileName: file.name,
      fileData: dataUrl,
      timestamp: new Date().toISOString(),
      modelUsed: {
        id: modelConfig.id,
        name: modelConfig.name,
        provider: modelConfig.provider
      }
    };

    console.log(`[${requestId}] ✅ SUCCESS - Analysis complete. Result ID: ${analysisId}`);
    console.log(`[${requestId}] ===== REQUEST END =====\n`);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error(`[${requestId}] ❌ FATAL ERROR in analysis:`, error);
    console.error(`[${requestId}] Error stack:`, error instanceof Error ? error.stack : 'No stack trace');
    console.error(`[${requestId}] ===== REQUEST END (ERROR) =====\n`);
    
    return new Response(JSON.stringify({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

