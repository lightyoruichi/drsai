/**
 * Supported AI Models Configuration
 * 
 * OpenRouter supports many models. Configure your preferred model here.
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
}

export const AVAILABLE_MODELS: Record<string, ModelConfig> = {
  // Anthropic Models (Recommended for medical imaging)
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
  'claude-3-sonnet': {
    id: 'anthropic/claude-3-sonnet',
    name: 'Claude 3 Sonnet',
    provider: 'Anthropic',
    description: 'Balanced performance and cost',
    contextWindow: 200000,
    supportsVision: true,
    costPer1MInputTokens: 3,
    costPer1MOutputTokens: 15,
  },
  'claude-3-haiku': {
    id: 'anthropic/claude-3-haiku',
    name: 'Claude 3 Haiku',
    provider: 'Anthropic',
    description: 'Fast and affordable',
    contextWindow: 200000,
    supportsVision: true,
    costPer1MInputTokens: 0.25,
    costPer1MOutputTokens: 1.25,
  },

  // OpenAI Models
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

  // Google Models
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

  // Meta Models (No vision support)
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

  // Mistral Models
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

  // Perplexity Models (Online models)
  'perplexity-online': {
    id: 'perplexity/llama-3.1-sonar-large-128k-online',
    name: 'Perplexity Online',
    provider: 'Perplexity',
    description: 'Has access to real-time web data',
    contextWindow: 127072,
    supportsVision: false,
    costPer1MInputTokens: 1,
    costPer1MOutputTokens: 1,
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
  if (AVAILABLE_MODELS[modelIdOrKey]) {
    return AVAILABLE_MODELS[modelIdOrKey];
  }

  // Try to find by full ID
  const model = Object.values(AVAILABLE_MODELS).find(m => m.id === modelIdOrKey);
  
  if (model) {
    return model;
  }

  // Fallback to Claude 3.5 Sonnet
  console.warn(`Model ${modelIdOrKey} not found in config, using default`);
  return AVAILABLE_MODELS['claude-3.5-sonnet'];
}

/**
 * Get all models that support vision
 */
export function getVisionModels(): ModelConfig[] {
  return Object.values(AVAILABLE_MODELS).filter(m => m.supportsVision);
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

