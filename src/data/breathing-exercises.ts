import { BreathingExercise } from '../types';

export const breathingExercises: BreathingExercise[] = [
  {
    id: '1',
    name: '4-7-8 Breathing',
    description: 'A relaxing breath pattern that promotes calmness and helps with anxiety.',
    steps: [
      'Find a comfortable position sitting or lying down',
      'Breathe in quietly through your nose for 4 seconds',
      'Hold your breath for 7 seconds',
      'Exhale completely through your mouth for 8 seconds',
      'Repeat the cycle 3-4 times'
    ],
    durationSeconds: 90
  },
  {
    id: '2',
    name: 'Box Breathing',
    description: 'A technique used by Navy SEALs to reduce stress and improve concentration.',
    steps: [
      'Sit upright in a comfortable position',
      'Inhale through your nose for 4 seconds',
      'Hold your breath for 4 seconds',
      'Exhale through your mouth for 4 seconds',
      'Hold your breath for 4 seconds',
      'Repeat the cycle 4-5 times'
    ],
    durationSeconds: 80
  },
  {
    id: '3',
    name: 'Deep Belly Breathing',
    description: 'A simple technique to engage your diaphragm and promote relaxation.',
    steps: [
      'Lie down or sit in a comfortable position',
      'Place one hand on your chest and the other on your belly',
      'Breathe in deeply through your nose, feeling your belly rise',
      'Breathe out slowly through your mouth',
      'Focus on your belly rising and falling with each breath',
      'Continue for 5-10 breaths'
    ],
    durationSeconds: 120
  }
];