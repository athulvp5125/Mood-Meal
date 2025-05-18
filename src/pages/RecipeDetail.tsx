import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  ChefHat, 
  Flame, 
  Share2, 
  Bookmark, 
  Printer,
  Heart,
  AlertTriangle
} from 'lucide-react';
import { getRecipeById } from '../services/recipeService';
import { Recipe } from '../types/recipe';
import { useMoodContext } from '../contexts/MoodContext';

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { detectedMood } = useMoodContext();

  useEffect(() => {
    const fetchRecipe = async () => {
      if (id) {
        setIsLoading(true);
        const recipeData = await getRecipeById(id);
        setRecipe(recipeData);
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const getMoodExplanation = () => {
    if (!detectedMood || !recipe) return null;
    
    const explanations = {
      happy: `This ${recipe.title} is perfect for your happy mood! The bright flavors will complement your positive energy.`,
      sad: `We recommend this comforting ${recipe.title} to help lift your spirits with its warm, satisfying qualities.`,
      angry: `This soothing ${recipe.title} can help calm your angry mood with balanced flavors and comforting textures.`,
      tired: `This energizing ${recipe.title} contains ingredients that can help combat fatigue and boost your energy levels.`,
      anxious: `The ingredients in this ${recipe.title} have calming properties that may help ease anxiety and stress.`,
      energetic: `This balanced ${recipe.title} will help sustain your energy without causing a crash later.`,
      neutral: `This well-rounded ${recipe.title} is a great choice for your balanced mood, providing both nutrition and satisfaction.`
    };
    
    return explanations[detectedMood];
  };

  const handleBack = () => {
    navigate('/results');
  };

  if (isLoading) {
    return (
      <div className="pt-24 pb-16">
        <div className="container-custom">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Loading recipe details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="pt-24 pb-16">
        <div className="container-custom">
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <AlertTriangle size={48} className="text-warning-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Recipe Not Found</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              We couldn't find the recipe you're looking for. It may have been removed or the ID is incorrect.
            </p>
            <button
              onClick={() => navigate('/results')}
              className="btn-primary"
            >
              Back to Results
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <button
            onClick={handleBack}
            className="mb-6 flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" /> Back to Results
          </button>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Recipe Hero Section */}
            <div className="relative h-80 md:h-96">
              <img 
                src={recipe.image} 
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-6">
                <h1 className="text-3xl font-bold text-white mb-2">{recipe.title}</h1>
                <p className="text-white/90 max-w-2xl">{recipe.description}</p>
              </div>
            </div>

            {/* Recipe Content */}
            <div className="p-6">
              {/* Recipe Meta */}
              <div className="flex flex-wrap gap-4 mb-8 pt-2 border-t border-gray-100">
                <div className="flex items-center">
                  <Clock size={20} className="text-primary-500 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Total Time</p>
                    <p className="font-medium">{recipe.cookTime} mins</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <ChefHat size={20} className="text-primary-500 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Difficulty</p>
                    <p className="font-medium">{recipe.difficulty}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Flame size={20} className="text-primary-500 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Calories</p>
                    <p className="font-medium">{recipe.calories} cal</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users size={20} className="text-primary-500 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Serves</p>
                    <p className="font-medium">{recipe.servings} people</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 mb-8">
                <button className="btn-outline flex items-center">
                  <Bookmark size={18} className="mr-1" /> Save
                </button>
                <button className="btn-outline flex items-center">
                  <Share2 size={18} className="mr-1" /> Share
                </button>
                <button className="btn-outline flex items-center">
                  <Printer size={18} className="mr-1" /> Print
                </button>
                <button className="btn-outline flex items-center">
                  <Heart size={18} className="mr-1" /> Like
                </button>
              </div>

              {/* Mood Explanation */}
              {detectedMood && (
                <div className="mb-8 p-4 bg-primary-50 border-l-4 border-primary-500 rounded-r-lg">
                  <h3 className="font-semibold text-primary-700 mb-1">Why we recommended this recipe</h3>
                  <p className="text-primary-600">{getMoodExplanation()}</p>
                </div>
              )}

              {/* Two Column Layout for Ingredients and Instructions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Ingredients */}
                <div className="md:col-span-1">
                  <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
                  <ul className="space-y-3">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-2 h-2 rounded-full bg-primary-500 mt-2 mr-2"></span>
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                <div className="md:col-span-2">
                  <h2 className="text-xl font-semibold mb-4">Instructions</h2>
                  <ol className="space-y-6">
                    {recipe.instructions.map((instruction, index) => (
                      <li key={index} className="flex">
                        <span className="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center mr-3 mt-0.5">
                          {index + 1}
                        </span>
                        <p>{instruction}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Nutrition Info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h2 className="text-xl font-semibold mb-4">Nutrition Information</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {recipe.nutrition.map((item, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">{item.name}</p>
                      <p className="font-semibold">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RecipeDetail;