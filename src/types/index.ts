export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  link?: string;
  category: 'article' | 'video' | 'exercise' | 'tool';
}

export interface BreathingExercise {
  id: string;
  name: string;
  description: string;
  steps: string[];
  durationSeconds: number;
}

export interface CrisisContact {
  id: string;
  name: string;
  phone: string;
  description: string;
  hours: string;
}