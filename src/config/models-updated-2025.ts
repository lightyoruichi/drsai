/**
 * UPDATED January 2025 - Latest AI Models Configuration
 * 
 * OpenRouter now supports 543+ models!
 * Data source: https://openrouter.ai/models (scraped January 17, 2025)
 * 
 * See all available models at: https://openrouter.ai/models
 */

export interface ModelConfig {
  id: string;
  name: string;
  provider: string;
  description: string;
  contextWindow: number;
  supportsVision: boolean;
  costPer1MInputTokens: number;
  costPer1MOutputTokens: number;
  released?: string;
  isNew?: boolean;
}

export const AVAILABLE_MODELS_2025: Record<string, ModelConfig> = {
  // ============================================
  // ANTHROPIC MODELS (Updated January 2025)
  // ============================================
  
  'claude-haiku-4.5': {
    id: 'anthropic/claude-haiku-4.5',
    name: 'Claude Haiku 4.5',
    provider: 'Anthropic',
    description: 'NEWEST! Near-frontier intelligence at fraction of cost. 73% on SWE-bench',
    contextWindow: 200000,
    supportsVision: true,
    costPer1MInputTokens: 1.0,    // Updated pricing Jan 2025
    costPer1MOutputTokens: 5.0,   // Updated pricing Jan 2025
    released: 'January 2025',
    isNew: true,
  },
  
  'claude-3.5-sonnet': {
    id: 'anthropic/claude-3.5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    description: 'Most intelligent model, excellent for medical analysis',
    contextWindow: 200000,
    supportsVision: true,
    costPer1MInputTokens: 3,
    costPer1MOutputTokens: 15,
  },

  'claude-3.5-haiku': {
    id: 'anthropic/claude-3.5-haiku',
    name: 'Claude 3.5 Haiku',
    provider: 'Anthropic',
    description: 'Fast and affordable, 4x more than 3.0 but better quality',
    contextWindow: 200000,
    supportsVision: true,
    costPer1MInputTokens: 0.8,    // Updated from 0.25
    costPer1MOutputTokens: 4.0,   // Updated from 1.25
  },
  
  'claude-3-opus': {
    id: 'anthropic/claude-3-opus',
    name: 'Claude 3 Opus',
    provider: 'Anthropic',
    description: 'Powerful model with strong reasoning',
    contextWindow: 200000,
    supportsVision: true,
    costPer1MInputTokens: 15,
    costPer1MOutputTokens: 75,
  },

  // ============================================
  // OPENAI MODELS (Updated January 2025)
  // ============================================

  'gpt-5-image-mini': {
    id: 'openai/gpt-5-image-mini',
    name: 'GPT-5 Image Mini',
    provider: 'OpenAI',
    description: 'NEW! GPT-5 Mini with image generation, low latency',
    contextWindow: 400000,
    supportsVision: true,
    costPer1MInputTokens: 2.5,
    costPer1MOutputTokens: 2.0,
    released: 'January 2025',
    isNew: true,
  },

  'gpt-5-image': {
    id: 'openai/gpt-5-image',
    name: 'GPT-5 Image',
    provider: 'OpenAI',
    description: 'NEW! Most advanced GPT with image generation',
    contextWindow: 400000,
    supportsVision: true,
    costPer1MInputTokens: 10.0,
    costPer1MOutputTokens: 10.0,
    released: 'January 2025',
    isNew: true,
  },
  
  'gpt-4o': {
    id: 'openai/gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    description: 'Multimodal flagship model',
    contextWindow: 128000,
    supportsVision: true,
    costPer1MInputTokens: 2.5,
    costPer1MOutputTokens: 10,
  },
  
  'gpt-4-turbo': {
    id: 'openai/gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'OpenAI',
    description: 'Vision-capable GPT-4',
    contextWindow: 128000,
    supportsVision: true,
    costPer1MInputTokens: 10,
    costPer1MOutputTokens: 30,
  },
  
  'gpt-4o-mini': {
    id: 'openai/gpt-4o-mini',
    name: 'GPT-4o Mini',
    provider: 'OpenAI',
    description: 'Affordable and fast',
    contextWindow: 128000,
    supportsVision: true,
    costPer1MInputTokens: 0.15,
    costPer1MOutputTokens: 0.6,
  },

  // ============================================
  // GOOGLE MODELS (Updated January 2025)
  // ============================================

  'gemini-2.5-flash': {
    id: 'google/gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    provider: 'Google',
    description: 'NEW! Workhorse thinking model with extended reasoning',
    contextWindow: 1000000,
    supportsVision: true,
    costPer1MInputTokens: 0.075,   // Estimated, check OpenRouter for latest
    costPer1MOutputTokens: 0.3,
    released: 'January 2025',
    isNew: true,
  },

  'gemini-2.5-pro': {
    id: 'google/gemini-2.5-pro',
    name: 'Gemini 2.5 Pro',
    provider: 'Google',
    description: 'NEW! Advanced model with thinking capabilities',
    contextWindow: 2000000,
    supportsVision: true,
    costPer1MInputTokens: 1.25,    // Estimated
    costPer1MOutputTokens: 5.0,
    released: 'January 2025',
    isNew: true,
  },

  'gemini-pro-1.5': {
    id: 'google/gemini-pro-1.5',
    name: 'Gemini 1.5 Pro',
    provider: 'Google',
    description: 'Large context window, vision support',
    contextWindow: 2000000,
    supportsVision: true,
    costPer1MInputTokens: 1.25,
    costPer1MOutputTokens: 5,
  },
  
  'gemini-flash-1.5': {
    id: 'google/gemini-flash-1.5',
    name: 'Gemini 1.5 Flash',
    provider: 'Google',
    description: 'Fast and cost-effective',
    contextWindow: 1000000,
    supportsVision: true,
    costPer1MInputTokens: 0.075,
    costPer1MOutputTokens: 0.3,
  },

  'gemini-2.0-flash': {
    id: 'google/gemini-2.0-flash',
    name: 'Gemini 2.0 Flash',
    provider: 'Google',
    description: 'Production-ready Gen 2 model',
    contextWindow: 1000000,
    supportsVision: true,
    costPer1MInputTokens: 0.075,
    costPer1MOutputTokens: 0.3,
  },

  // ============================================
  // QWEN MODELS (New Multimodal)
  // ============================================

  'qwen3-vl-8b-instruct': {
    id: 'qwen/qwen3-vl-8b-instruct',
    name: 'Qwen3 VL 8B Instruct',
    provider: 'Qwen',
    description: 'NEW! Multimodal vision-language model, 256K context',
    contextWindow: 262000,
    supportsVision: true,
    costPer1MInputTokens: 0.18,
    costPer1MOutputTokens: 0.69,
    released: 'January 2025',
    isNew: true,
  },

  'qwen3-vl-8b-thinking': {
    id: 'qwen/qwen3-vl-8b-thinking',
    name: 'Qwen3 VL 8B Thinking',
    provider: 'Qwen',
    description: 'NEW! Reasoning-optimized multimodal model',
    contextWindow: 256000,
    supportsVision: true,
    costPer1MInputTokens: 0.18,
    costPer1MOutputTokens: 2.10,
    released: 'January 2025',
    isNew: true,
  },

  // ============================================
  // MISTRAL MODELS
  // ============================================

  'mistral-large': {
    id: 'mistralai/mistral-large',
    name: 'Mistral Large',
    provider: 'Mistral',
    description: 'European model with vision',
    contextWindow: 128000,
    supportsVision: true,
    costPer1MInputTokens: 3,
    costPer1MOutputTokens: 9,
  },

  // ============================================
  // META MODELS (No vision support)
  // ============================================
  
  'llama-3.1-405b': {
    id: 'meta-llama/llama-3.1-405b-instruct',
    name: 'Llama 3.1 405B',
    provider: 'Meta',
    description: 'Largest open-source model (no vision)',
    contextWindow: 128000,
    supportsVision: false,
    costPer1MInputTokens: 2.7,
    costPer1MOutputTokens: 2.7,
  },
};

/**
 * Get the default model ID from environment or use fallback
 */
export function getDefaultModelId(): string {
  return import.meta.env.OPENROUTER_MODEL || 'anthropic/claude-3.5-sonnet';
}

/**
 * Get model configuration by ID or key
 */
export function getModelConfig(modelIdOrKey: string): ModelConfig {
  // Try to find by key first
  if (AVAILABLE_MODELS_2025[modelIdOrKey]) {
    return AVAILABLE_MODELS_2025[modelIdOrKey];
  }

  // Try to find by full ID
  const model = Object.values(AVAILABLE_MODELS_2025).find(m => m.id === modelIdOrKey);
  
  if (model) {
    return model;
  }

  // Fallback to Claude 3.5 Sonnet
  console.warn(`Model ${modelIdOrKey} not found in config, using default`);
  return AVAILABLE_MODELS_2025['claude-3.5-sonnet'];
}

/**
 * Get all models that support vision
 */
export function getVisionModels(): ModelConfig[] {
  return Object.values(AVAILABLE_MODELS_2025).filter(m => m.supportsVision);
}

/**
 * Get new models released in 2025
 */
export function getNewModels(): ModelConfig[] {
  return Object.values(AVAILABLE_MODELS_2025).filter(m => m.isNew);
}

/**
 * Estimate cost for an analysis
 */
export function estimateCost(
  modelId: string,
  estimatedInputTokens: number = 2000,
  estimatedOutputTokens: number = 1500
): number {
  const model = getModelConfig(modelId);
  
  const inputCost = (estimatedInputTokens / 1_000_000) * model.costPer1MInputTokens;
  const outputCost = (estimatedOutputTokens / 1_000_000) * model.costPer1MOutputTokens;
  
  return inputCost + outputCost;
}

/**
 * Get recommended models for dental analysis
 */
export function getRecommendedModels(): {
  production: ModelConfig[];
  budget: ModelConfig[];
  development: ModelConfig[];
} {
  return {
    production: [
      AVAILABLE_MODELS_2025['claude-3.5-sonnet'],
      AVAILABLE_MODELS_2025['gpt-4o'],
      AVAILABLE_MODELS_2025['gemini-pro-1.5'],
    ],
    budget: [
      AVAILABLE_MODELS_2025['gemini-flash-1.5'],
      AVAILABLE_MODELS_2025['gemini-2.0-flash'],
      AVAILABLE_MODELS_2025['gpt-4o-mini'],
    ],
    development: [
      AVAILABLE_MODELS_2025['claude-haiku-4.5'],
      AVAILABLE_MODELS_2025['claude-3.5-haiku'],
      AVAILABLE_MODELS_2025['qwen3-vl-8b-instruct'],
    ],
  };
}

