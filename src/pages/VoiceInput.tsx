import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mic, MicOff, Send, Loader, ArrowLeft, ArrowRight } from 'lucide-react';
import { useMoodContext } from '../contexts/MoodContext';
import { analyzeMoodFromText } from '../services/moodDetection';
import StepIndicator from '../components/ui/StepIndicator';

const VoiceInput = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const { detectedMood, setTextInput, setDetectedMood } = useMoodContext();

  const startRecording = () => {
    setIsRecording(true);
    timerRef.current = setInterval(() => {
      setRecordingTime((prevTime) => prevTime + 1);
    }, 1000);
    
    // In a real app, we would actually record audio here
    // For demo purposes, we'll simulate recording
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // In a real app, we would stop recording and convert audio to text
    // For demo purposes, we'll just update text with a placeholder
    setText("I'm feeling a bit tired today and need some energy.");
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    if (text.trim()) {
      setIsAnalyzing(true);
      setTextInput(text);
      
      // Analyze mood from text - in a real app, this would call an API
      const mood = await analyzeMoodFromText(text);
      
      // If we already have a mood from the image, we'll combine them
      // For simplicity, we'll just use the text-based mood if available
      if (!detectedMood) {
        setDetectedMood(mood);
      }
      
      setIsAnalyzing(false);
      navigate('/preferences');
    }
  };

  const handleSkip = () => {
    navigate('/preferences');
  };

  const handleBack = () => {
    navigate('/capture');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <StepIndicator currentStep={2} totalSteps={4} />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-2 text-center">Tell Us How You Feel</h1>
          <p className="text-gray-600 mb-8 text-center">
            Speak or type how you're feeling today to help us recommend the perfect meals
          </p>

          {/* Text Input */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <textarea
              value={text}
              onChange={handleTextChange}
              placeholder="Describe how you're feeling today... (e.g., 'I'm feeling tired and need an energy boost' or 'I'm happy but want something light')"
              className="w-full p-4 h-40 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              disabled={isRecording || isAnalyzing}
            ></textarea>
            
            {/* Voice recording button and indicator */}
            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`${
                  isRecording
                    ? 'bg-error-500 hover:bg-error-600'
                    : 'bg-secondary-500 hover:bg-secondary-600'
                } text-white px-4 py-2 rounded-lg transition-colors flex items-center`}
                disabled={isAnalyzing}
              >
                {isRecording ? (
                  <>
                    <MicOff size={18} className="mr-2" /> Stop Recording
                  </>
                ) : (
                  <>
                    <Mic size={18} className="mr-2" /> Start Recording
                  </>
                )}
              </button>
              
              {isRecording && (
                <div className="flex items-center text-sm">
                  <span className="inline-block h-3 w-3 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                  Recording... {formatTime(recordingTime)}
                </div>
              )}
              
              <button
                onClick={handleSubmit}
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center"
                disabled={!text.trim() || isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader size={18} className="mr-2 animate-spin" /> Analyzing...
                  </>
                ) : (
                  <>
                    <Send size={18} className="mr-2" /> Submit
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button 
              onClick={handleBack}
              className="btn-outline flex items-center"
            >
              <ArrowLeft size={18} className="mr-2" /> Back
            </button>
            
            <button 
              onClick={handleSkip}
              className="btn-outline flex items-center"
            >
              Skip <ArrowRight size={18} className="ml-2" />
            </button>
          </div>

          {/* Tips */}
          <div className="mt-8 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-2">For better recommendations:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-start">
                <span className="text-primary-500 mr-2">•</span>
                Be specific about your current mood (e.g., "I feel energetic but anxious")
              </li>
              <li className="flex items-start">
                <span className="text-primary-500 mr-2">•</span>
                Mention any cravings you might have
              </li>
              <li className="flex items-start">
                <span className="text-primary-500 mr-2">•</span>
                This step is optional - you can skip if you'd prefer to use just your photo
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VoiceInput;