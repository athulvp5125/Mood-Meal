import React, { createContext, useContext, useState, ReactNode } from 'react';

export type DietaryRestriction = 'none' | 'vegetarian' | 'vegan' | 'gluten-free' | 'dairy-free' | 'keto' | 'paleo';
export type HealthGoal = 'none' | 'weight-loss' | 'weight-gain' | 'muscle-building' | 'energy-boost' | 'mood-improvement';
export type Mood = 'happy' | 'sad' | 'angry' | 'tired' | 'anxious' | 'energetic' | 'neutral';

interface MoodContextType {
  image: string | null;
  setImage: (image: string | null) => void;
  textInput: string;
  setTextInput: (text: string) => void;
  voiceInput: string | null;
  setVoiceInput: (voice: string | null) => void;
  detectedMood: Mood | null;
  setDetectedMood: (mood: Mood | null) => void;
  dietaryRestrictions: DietaryRestriction[];
  setDietaryRestrictions: (restrictions: DietaryRestriction[]) => void;
  healthGoal: HealthGoal;
  setHealthGoal: (goal: HealthGoal) => void;
  allergies: string[];
  setAllergies: (allergies: string[]) => void;
  resetContext: () => void;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const useMoodContext = () => {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error('useMoodContext must be used within a MoodContextProvider');
  }
  return context;
};

interface MoodContextProviderProps {
  children: ReactNode;
}

export const MoodContextProvider = ({ children }: MoodContextProviderProps) => {
  const [image, setImage] = useState<string | null>(null);
  const [textInput, setTextInput] = useState<string>('');
  const [voiceInput, setVoiceInput] = useState<string | null>(null);
  const [detectedMood, setDetectedMood] = useState<Mood | null>(null);
  const [dietaryRestrictions, setDietaryRestrictions] = useState<DietaryRestriction[]>([]);
  const [healthGoal, setHealthGoal] = useState<HealthGoal>('none');
  const [allergies, setAllergies] = useState<string[]>([]);

  const resetContext = () => {
    setImage(null);
    setTextInput('');
    setVoiceInput(null);
    setDetectedMood(null);
    setDietaryRestrictions([]);
    setHealthGoal('none');
    setAllergies([]);
  };

  return (
    <MoodContext.Provider
      value={{
        image,
        setImage,
        textInput,
        setTextInput,
        voiceInput,
        setVoiceInput,
        detectedMood,
        setDetectedMood,
        dietaryRestrictions,
        setDietaryRestrictions,
        healthGoal,
        setHealthGoal,
        allergies,
        setAllergies,
        resetContext,
      }}
    >
      {children}
    </MoodContext.Provider>
  );
};