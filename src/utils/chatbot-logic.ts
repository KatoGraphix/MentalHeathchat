import { Message } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Simple response mapping for common mental health topics
const responseMap: Record<string, string[]> = {
  greeting: [
    "Hello! I'm here to support you with your mental health. How are you feeling today?",
    "Hi there! I'm your mental health companion. How can I help you today?",
    "Welcome! I'm here to listen and provide resources. What's on your mind?"
  ],
  anxiety: [
    "Anxiety can be challenging. Remember that feeling anxious is a normal response, but there are techniques that can help manage it.",
    "I hear you're feeling anxious. Deep breathing can help in the moment - would you like to try a breathing exercise?",
    "Anxiety is common and treatable. Consider reaching out to a mental health professional who can provide personalized support."
  ],
  depression: [
    "I'm sorry to hear you're feeling down. Remember that depression is a medical condition, not a personal failing.",
    "Depression can make everything feel more difficult. Small steps like light exercise or reaching out to a friend can sometimes help.",
    "It's important to know that depression is treatable. Have you considered speaking with a healthcare provider about how you're feeling?"
  ],
  stress: [
    "Stress affects us all differently. Taking breaks and practicing self-care can help manage stress levels.",
    "When you're feeling stressed, try to identify what's within your control and what isn't. Focus your energy on what you can change.",
    "Regular exercise, adequate sleep, and mindfulness practices can all help reduce stress levels."
  ],
  sleep: [
    "Sleep problems can significantly impact mental health. Try maintaining a consistent sleep schedule and creating a relaxing bedtime routine.",
    "Limiting screen time before bed and creating a comfortable sleep environment can help improve sleep quality.",
    "If sleep problems persist, consider speaking with a healthcare provider as they may be able to offer additional support."
  ],
  help: [
    "I can provide resources on mental health topics, guide you through breathing exercises, or connect you with crisis support if needed. What would be most helpful?",
    "I'm here to support you. I can share information about common mental health concerns, guide breathing exercises, or provide crisis resources.",
    "I can help by providing mental health resources, walking you through relaxation techniques, or connecting you with support services."
  ],
  crisis: [
    "If you're in crisis, please reach out to a crisis helpline immediately. The Suicide & Crisis Lifeline is available 24/7 at 988.",
    "Your safety is the priority. Please contact the Crisis Text Line by texting HOME to 741741 to speak with a trained counselor.",
    "If you're having thoughts of harming yourself, please call 988 for immediate support. Help is available."
  ],
  default: [
    "I'm here to listen and support you. Could you tell me more about what you're experiencing?",
    "Thank you for sharing. While I'm not a replacement for professional help, I can offer resources and support.",
    "I appreciate you reaching out. Would you like to explore some coping strategies or resources related to what you're going through?"
  ]
};

// Function to identify keywords in user messages
const identifyTopic = (message: string): string => {
  message = message.toLowerCase();
  
  if (/\b(hi|hello|hey|greetings)\b/.test(message)) {
    return 'greeting';
  } else if (/\b(anxious|anxiety|nervous|worry|worried|panic)\b/.test(message)) {
    return 'anxiety';
  } else if (/\b(depressed|depression|sad|hopeless|unmotivated)\b/.test(message)) {
    return 'depression';
  } else if (/\b(stress|stressed|overwhelmed|pressure)\b/.test(message)) {
    return 'stress';
  } else if (/\b(sleep|insomnia|tired|exhausted|rest)\b/.test(message)) {
    return 'sleep';
  } else if (/\b(help|support|resource|assist)\b/.test(message)) {
    return 'help';
  } else if (/\b(suicidal|suicide|harm|emergency|crisis|kill)\b/.test(message)) {
    return 'crisis';
  } else {
    return 'default';
  }
};

// Function to get a random response based on the identified topic
const getRandomResponse = (topic: string): string => {
  const responses = responseMap[topic] || responseMap.default;
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
};

// Function to generate a bot response
export const generateBotResponse = (userMessage: string): Message => {
  const topic = identifyTopic(userMessage);
  const responseText = getRandomResponse(topic);
  
  return {
    id: uuidv4(),
    text: responseText,
    sender: 'bot',
    timestamp: new Date()
  };
};