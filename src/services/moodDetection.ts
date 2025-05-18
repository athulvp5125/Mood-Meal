import { Mood } from '../contexts/MoodContext';

// This is a simulated service that would normally use AI to detect mood
// In a real app, these would call external APIs for facial emotion recognition

/**
 * Simulates detecting mood from an image
 * @param imageData Base64 encoded image data
 * @returns Detected mood
 */
export const detectMoodFromImage = async (imageData: string): Promise<Mood> => {
  // In a real app, this would:
  // 1. Send the image to a facial emotion recognition API
  // 2. Get back detected emotions with confidence scores
  // 3. Return the highest confidence emotion
  
  // For demo purposes, we'll simulate a 1.5s API call and return a random mood
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const moods: Mood[] = ['happy', 'sad', 'tired', 'anxious', 'energetic', 'neutral'];
  return moods[Math.floor(Math.random() * moods.length)];
};

/**
 * Simulates analyzing mood from text input
 * @param text User's text input about their mood
 * @returns Detected mood
 */
export const analyzeMoodFromText = async (text: string): Promise<Mood> => {
  // In a real app, this would:
  // 1. Send the text to an NLP sentiment analysis API
  // 2. Get back sentiment/emotion classifications
  // 3. Return the appropriate mood category
  
  // Simple keyword matching for demo purposes
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const textLower = text.toLowerCase();
  
  if (textLower.includes('happy') || textLower.includes('joy') || textLower.includes('excited')) {
    return 'happy';
  } else if (textLower.includes('sad') || textLower.includes('depressed') || textLower.includes('down')) {
    return 'sad';
  } else if (textLower.includes('angry') || textLower.includes('upset') || textLower.includes('mad')) {
    return 'angry';
  } else if (textLower.includes('tired') || textLower.includes('exhausted') || textLower.includes('sleepy')) {
    return 'tired';
  } else if (textLower.includes('anxious') || textLower.includes('worried') || textLower.includes('stressed')) {
    return 'anxious';
  } else if (textLower.includes('energetic') || textLower.includes('active') || textLower.includes('motivated')) {
    return 'energetic';
  } else {
    return 'neutral';
  }
};

/**
 * Simulates analyzing mood from voice recording
 * @param audioData Audio recording data
 * @returns Detected mood
 */
export const analyzeMoodFromVoice = async (audioData: string): Promise<Mood> => {
  // In a real app, this would:
  // 1. Send the audio to a speech emotion recognition API
  // 2. Get back emotion classifications
  // 3. Return the appropriate mood category
  
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // For demo purposes, return a random mood
  const moods: Mood[] = ['happy', 'sad', 'tired', 'anxious', 'energetic', 'neutral'];
  return moods[Math.floor(Math.random() * moods.length)];
};