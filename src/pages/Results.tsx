import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Bookmark, Info } from 'lucide-react';
import { useMoodContext } from '../contexts/MoodContext';
import { getRecipesForMood } from '../services/recipeService';
import { Recipe } from '../types/recipe';
import StepIndicator from '../components/ui/StepIndicator';

const Results = () => {
  const { detectedMood, dietaryRestrictions, healthGoal } = useMoodContext();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      // In a real app, this would call an API with the mood, dietary restrictions, etc.
      const recipesData = await getRecipesForMood(
        detectedMood || 'neutral',
        dietaryRestrictions,
        healthGoal
      );
      setRecipes(recipesData);
      setIsLoading(false);
    };

    fetchRecipes();
  }, [detectedMood, dietaryRestrictions, healthGoal]);

  const handleViewRecipe = (id: string) => {
    navigate(`/recipe/${id}`);
  };

  const handleBack = () => {
    navigate('/preferences');
  };

  const getEmotionDescription = () => {
    if (!detectedMood) return 'Your preferences';
    
    const descriptions = {
      happy: 'uplifting and celebratory',
      sad: 'comforting and nurturing',
      angry: 'calming and soothing',
      tired: 'energizing and revitalizing',
      anxious: 'grounding and relaxing',
      energetic: 'balanced and sustaining',
      neutral: 'balanced and nutritious'
    };
    
    return descriptions[detectedMood];
  };

  const getEmotionEmoji = () => {
    if (!detectedMood) return '😊';
    
    const emojis = {
      happy: '😊',
      sad: '😔',
      angry: '😠',
      tired: '😴',
      anxious: '😰',
      energetic: '⚡',
      neutral: '😐'
    };
    
    return emojis[detectedMood];
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <StepIndicator currentStep={4} totalSteps={4} />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-3">
              Your Personalized Recipe Recommendations {getEmotionEmoji()}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Based on your {detectedMood || 'preferences'} mood, we've curated these {getEmotionDescription()} recipes just for you
            </p>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">Finding the perfect recipes for your mood...</p>
            </div>
          ) : (
            <>
              {recipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recipes.map((recipe, index) => (
                    <motion.div
                      key={recipe.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="card overflow-hidden"
                    >
                      <div className="relative h-48">
                        <img 
                          src={recipe.image} 
                          alt={recipe.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
                            <Bookmark size={18} className="text-primary-500" />
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center text-xs text-gray-500 mb-2">
                          <Clock size={14} className="mr-1" />
                          <span>{recipe.cookTime} mins</span>
                          <span className="mx-2">•</span>
                          <span>{recipe.calories} cal</span>
                        </div>
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{recipe.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{recipe.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {recipe.tags.map((tag, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-600">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <button
                          onClick={() => handleViewRecipe(recipe.id)}
                          className="w-full py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
                        >
                          View Recipe
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <Info size={48} className="text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Recipes Found</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    We couldn't find recipes matching your current mood and preferences. 
                    Try adjusting your dietary restrictions or health goals.
                  </p>
                </div>
              )}
            </>
          )}

          <div className="mt-8 flex justify-between">
            <button
              onClick={handleBack}
              className="btn-outline flex items-center"
            >
              <ArrowLeft size={18} className="mr-2" /> Back to Preferences
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Results;