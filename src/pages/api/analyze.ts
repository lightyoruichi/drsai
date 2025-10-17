import type { APIRoute } from 'astro';
import type { DentalDiagnosis } from '../../types/dental';
import { getDefaultModelId, getModelConfig } from '../../config/models-updated-2025';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const initialDiagnosis = formData.get('initialDiagnosis') as string;
    const customModel = formData.get('model') as string | null;

    if (!file || !initialDiagnosis) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if file is an image
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    const fileType = file.type.toLowerCase();
    
    if (!validImageTypes.includes(fileType) && !fileType.startsWith('image/')) {
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
    
    console.log(`Processing ${file.name} (${file.type}, ${(file.size / 1024).toFixed(2)} KB)`);

    // Call OpenRouter API
    const openRouterApiKey = import.meta.env.OPENROUTER_API_KEY;
    
    if (!openRouterApiKey) {
      return new Response(JSON.stringify({ error: 'OpenRouter API key not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get model configuration
    const modelId = customModel || getDefaultModelId();
    const modelConfig = getModelConfig(modelId);

    // Check if model supports vision
    if (!modelConfig.supportsVision) {
      return new Response(JSON.stringify({ 
        error: `Model ${modelConfig.name} does not support vision. Please use a vision-capable model.`,
        suggestion: 'Try: anthropic/claude-3.5-sonnet, openai/gpt-4o, or google/gemini-pro-1.5'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log(`Using model: ${modelConfig.name} (${modelConfig.id})`);
    console.log(`Estimated cost: $${(modelConfig.costPer1MInputTokens * 2 + modelConfig.costPer1MOutputTokens * 1.5) / 1000}`)

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

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API error:', errorText);
      return new Response(JSON.stringify({ error: 'Failed to analyze image', details: errorText }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      return new Response(JSON.stringify({ error: 'No response from AI' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Parse the JSON response, handling potential markdown code blocks and extra text
    let diagnosis: DentalDiagnosis;
    try {
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
      
    } catch (parseError) {
      console.error('Failed to parse AI response:', content);
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

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Analysis error:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

