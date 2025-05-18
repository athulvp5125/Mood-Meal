import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, X, Plus } from 'lucide-react';
import { useMoodContext } from '../contexts/MoodContext';
import { DietaryRestriction, HealthGoal } from '../contexts/MoodContext';
import StepIndicator from '../components/ui/StepIndicator';

const Preferences = () => {
  const navigate = useNavigate();
  const { 
    dietaryRestrictions, 
    setDietaryRestrictions, 
    healthGoal, 
    setHealthGoal, 
    allergies, 
    setAllergies 
  } = useMoodContext();
  
  const [allergyInput, setAllergyInput] = useState('');

  const dietaryOptions: { value: DietaryRestriction; label: string }[] = [
    { value: 'none', label: 'No Restrictions' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'gluten-free', label: 'Gluten Free' },
    { value: 'dairy-free', label: 'Dairy Free' },
    { value: 'keto', label: 'Keto' },
    { value: 'paleo', label: 'Paleo' },
  ];

  const healthGoalOptions: { value: HealthGoal; label: string }[] = [
    { value: 'none', label: 'No Specific Goal' },
    { value: 'weight-loss', label: 'Weight Loss' },
    { value: 'weight-gain', label: 'Weight Gain' },
    { value: 'muscle-building', label: 'Muscle Building' },
    { value: 'energy-boost', label: 'Energy Boost' },
    { value: 'mood-improvement', label: 'Mood Improvement' },
  ];

  const handleDietaryChange = (restriction: DietaryRestriction) => {
    if (restriction === 'none') {
      setDietaryRestrictions(['none']);
      return;
    }
    
    // If "none" is already selected, remove it when selecting any other restriction
    const updatedRestrictions = dietaryRestrictions.includes('none')
      ? [restriction]
      : dietaryRestrictions.includes(restriction)
        ? dietaryRestrictions.filter(r => r !== restriction)
        : [...dietaryRestrictions, restriction];
    
    setDietaryRestrictions(updatedRestrictions.length ? updatedRestrictions : ['none']);
  };

  const handleHealthGoalChange = (goal: HealthGoal) => {
    setHealthGoal(goal);
  };

  const handleAddAllergy = () => {
    if (allergyInput.trim() && !allergies.includes(allergyInput.trim().toLowerCase())) {
      setAllergies([...allergies, allergyInput.trim().toLowerCase()]);
      setAllergyInput('');
    }
  };

  const handleRemoveAllergy = (allergy: string) => {
    setAllergies(allergies.filter(a => a !== allergy));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddAllergy();
    }
  };

  const handleBack = () => {
    navigate('/voice');
  };

  const handleContinue = () => {
    navigate('/results');
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <StepIndicator currentStep={3} totalSteps={4} />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-2 text-center">Your Preferences</h1>
          <p className="text-gray-600 mb-8 text-center">
            Tell us about your dietary needs so we can personalize your recipe recommendations
          </p>

          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            {/* Dietary Restrictions */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Dietary Restrictions</h2>
              <div className="flex flex-wrap gap-2">
                {dietaryOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => handleDietaryChange(option.value)}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                      dietaryRestrictions.includes(option.value)
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Health Goals */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Health Goal</h2>
              <div className="flex flex-wrap gap-2">
                {healthGoalOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => handleHealthGoalChange(option.value)}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                      healthGoal === option.value
                        ? 'bg-secondary-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Allergies */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Allergies</h2>
              <div className="flex mb-3">
                <input
                  type="text"
                  value={allergyInput}
                  onChange={(e) => setAllergyInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Add allergy (e.g., peanuts, shellfish)"
                  className="input flex-grow"
                />
                <button
                  onClick={handleAddAllergy}
                  className="bg-primary-500 text-white ml-2 px-3 rounded-md hover:bg-primary-600 transition-colors"
                  disabled={!allergyInput.trim()}
                >
                  <Plus size={18} />
                </button>
              </div>
              
              {allergies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {allergies.map((allergy, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {allergy}
                      <button
                        onClick={() => handleRemoveAllergy(allergy)}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
              onClick={handleContinue}
              className="btn-primary flex items-center"
            >
              Continue <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Preferences;