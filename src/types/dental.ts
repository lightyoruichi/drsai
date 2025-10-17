export interface ToothDiagnosis {
  toothNumber: number;
  condition: string;
  severity: 'none' | 'mild' | 'moderate' | 'severe';
  notes: string;
}

export interface DentalDiagnosis {
  overallAssessment: string;
  confidenceScore: number;
  findings: {
    category: string;
    description: string;
    severity: 'none' | 'mild' | 'moderate' | 'severe';
    confidence: number;
  }[];
  comparisonWithInitialDiagnosis: {
    correct: string[];
    incorrect: string[];
    additional: string[];
  };
  teethChart: ToothDiagnosis[];
  recommendations: string[];
  urgency: 'routine' | 'soon' | 'urgent' | 'emergency';
}

export interface AnalysisResult {
  id: string;
  diagnosis: DentalDiagnosis;
  initialDiagnosis: string;
  fileName: string;
  fileData: string; // base64 encoded
  timestamp: string;
}

