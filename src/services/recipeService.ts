import { Recipe } from '../types/recipe';
import { Mood, DietaryRestriction, HealthGoal } from '../contexts/MoodContext';

// Mock database of recipes
const recipesDatabase: Recipe[] = [
  {
    id: '1',
    title: 'Comforting Mac and Cheese',
    description: 'A creamy, cheesy pasta dish that brings warmth and comfort to your day.',
    image: 'https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&w=1200',
    cookTime: 30,
    servings: 4,
    calories: 450,
    difficulty: 'Easy',
    tags: ['comfort food', 'pasta', 'cheesy', 'vegetarian'],
    ingredients: [
      '250g elbow macaroni',
      '3 tbsp butter',
      '3 tbsp all-purpose flour',
      '2 cups milk',
      '2 cups grated cheddar cheese',
      '1/2 cup grated parmesan cheese',
      'Salt and pepper to taste',
      '1/4 tsp paprika'
    ],
    instructions: [
      'Cook macaroni according to package directions. Drain and set aside.',
      'In a medium saucepan, melt butter over medium heat. Add flour and stir until combined.',
      'Gradually whisk in milk and cook until mixture thickens, about 5 minutes.',
      'Remove from heat and stir in cheeses until melted and smooth.',
      'Add cooked macaroni to cheese sauce and stir to combine. Season with salt, pepper, and paprika.',
      'Serve hot and enjoy your comforting meal!'
    ],
    nutrition: [
      { name: 'Calories', value: '450 kcal' },
      { name: 'Protein', value: '18g' },
      { name: 'Carbs', value: '45g' },
      { name: 'Fat', value: '22g' }
    ],
    moodCategories: ['sad', 'anxious']
  },
  {
    id: '2',
    title: 'Energizing Berry Smoothie Bowl',
    description: 'A vibrant, antioxidant-rich smoothie bowl that will boost your energy and mood.',
    image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=1200',
    cookTime: 10,
    servings: 1,
    calories: 320,
    difficulty: 'Easy',
    tags: ['breakfast', 'vegan', 'gluten-free', 'energizing'],
    ingredients: [
      '1 frozen banana',
      '1 cup mixed frozen berries (strawberries, blueberries, raspberries)',
      '1/4 cup almond milk',
      '1 tbsp chia seeds',
      '1 tbsp almond butter',
      'Toppings: fresh berries, granola, coconut flakes, banana slices'
    ],
    instructions: [
      'Add frozen banana, mixed berries, almond milk, and almond butter to a blender.',
      'Blend until smooth, adding more almond milk if needed to reach desired consistency.',
      'Pour into a bowl and sprinkle with chia seeds.',
      'Add toppings of your choice: fresh berries, granola, coconut flakes, and banana slices.',
      'Enjoy immediately for maximum energy boost!'
    ],
    nutrition: [
      { name: 'Calories', value: '320 kcal' },
      { name: 'Protein', value: '8g' },
      { name: 'Carbs', value: '55g' },
      { name: 'Fat', value: '10g' }
    ],
    moodCategories: ['tired', 'energetic', 'happy']
  },
  {
    id: '3',
    title: 'Calming Chamomile Lavender Tea Cookies',
    description: 'Delicate, lightly sweetened cookies infused with calming chamomile and lavender.',
    image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=1200',
    cookTime: 25,
    servings: 24,
    calories: 95,
    difficulty: 'Medium',
    tags: ['dessert', 'tea time', 'calming', 'baking'],
    ingredients: [
      '2 cups all-purpose flour',
      '1/2 cup granulated sugar',
      '1/2 cup unsalted butter, softened',
      '1 egg',
      '2 tbsp dried chamomile flowers',
      '1 tbsp dried culinary lavender',
      '1 tsp vanilla extract',
      '1/4 tsp salt',
      '1 tbsp honey'
    ],
    instructions: [
      'Preheat oven to 350°F (175°C) and line a baking sheet with parchment paper.',
      'In a medium bowl, whisk together flour and salt. Set aside.',
      'In a large bowl, cream together butter and sugar until light and fluffy.',
      'Beat in egg, vanilla extract, and honey.',
      'Stir in chamomile flowers and lavender.',
      'Gradually add flour mixture and mix until just combined.',
      'Roll dough into 1-inch balls and place on baking sheet, flattening slightly.',
      'Bake for 10-12 minutes until edges are lightly golden.',
      'Allow to cool on baking sheet for 5 minutes before transferring to a wire rack.'
    ],
    nutrition: [
      { name: 'Calories', value: '95 kcal' },
      { name: 'Protein', value: '1g' },
      { name: 'Carbs', value: '12g' },
      { name: 'Fat', value: '5g' }
    ],
    moodCategories: ['anxious', 'stressed']
  },
  {
    id: '4',
    title: 'Spicy Kimchi Fried Rice',
    description: 'A bold, flavorful dish with the perfect balance of heat and tanginess to awaken your senses.',
    image: 'https://images.pexels.com/photos/5339079/pexels-photo-5339079.jpeg?auto=compress&cs=tinysrgb&w=1200',
    cookTime: 20,
    servings: 2,
    calories: 380,
    difficulty: 'Easy',
    tags: ['korean', 'spicy', 'energizing', 'rice'],
    ingredients: [
      '2 cups cooked and cooled rice',
      '1 cup kimchi, chopped',
      '2 tbsp kimchi juice',
      '2 tbsp vegetable oil',
      '2 eggs',
      '2 green onions, sliced',
      '1 tbsp sesame oil',
      '1 tsp sesame seeds',
      'Optional: 1/2 cup diced spam or tofu'
    ],
    instructions: [
      'Heat vegetable oil in a large skillet or wok over medium-high heat.',
      'If using spam or tofu, add and cook until crispy, about 2-3 minutes.',
      'Add kimchi and stir-fry for 1-2 minutes until fragrant.',
      'Add rice, breaking up any clumps, and kimchi juice. Stir-fry for 3-4 minutes.',
      'Push rice mixture to one side and crack eggs into the empty space. Scramble until just set, then mix with rice.',
      'Stir in green onions and sesame oil. Cook for another minute.',
      'Serve hot, garnished with sesame seeds and additional green onions if desired.'
    ],
    nutrition: [
      { name: 'Calories', value: '380 kcal' },
      { name: 'Protein', value: '10g' },
      { name: 'Carbs', value: '45g' },
      { name: 'Fat', value: '18g' }
    ],
    moodCategories: ['tired', 'angry']
  },
  {
    id: '5',
    title: 'Chocolate Avocado Mousse',
    description: 'A rich, indulgent dessert that\'s secretly nutritious and perfect for boosting your mood.',
    image: 'https://images.pexels.com/photos/1028711/pexels-photo-1028711.jpeg?auto=compress&cs=tinysrgb&w=1200',
    cookTime: 15,
    servings: 4,
    calories: 220,
    difficulty: 'Easy',
    tags: ['dessert', 'chocolate', 'vegan', 'gluten-free'],
    ingredients: [
      '2 ripe avocados',
      '1/3 cup cocoa powder',
      '1/4 cup maple syrup or honey',
      '1/4 cup almond milk',
      '1 tsp vanilla extract',
      'Pinch of salt',
      'Berries for garnish'
    ],
    instructions: [
      'Cut avocados in half, remove pits, and scoop flesh into a food processor.',
      'Add cocoa powder, maple syrup, almond milk, vanilla extract, and salt.',
      'Process until completely smooth, stopping to scrape down the sides as needed.',
      'Taste and adjust sweetness if necessary.',
      'Transfer to serving glasses and refrigerate for at least 30 minutes.',
      'Garnish with berries before serving.'
    ],
    nutrition: [
      { name: 'Calories', value: '220 kcal' },
      { name: 'Protein', value: '4g' },
      { name: 'Carbs', value: '22g' },
      { name: 'Fat', value: '15g' }
    ],
    moodCategories: ['sad', 'happy']
  },
  {
    id: '6',
    title: 'Mediterranean Grilled Chicken Salad',
    description: 'A bright, flavorful salad with lean protein and plenty of vegetables for balanced energy.',
    image: 'https://images.pexels.com/photos/434258/pexels-photo-434258.jpeg?auto=compress&cs=tinysrgb&w=1200',
    cookTime: 25,
    servings: 2,
    calories: 420,
    difficulty: 'Medium',
    tags: ['mediterranean', 'healthy', 'protein', 'salad'],
    ingredients: [
      '2 boneless, skinless chicken breasts',
      '2 tbsp olive oil, divided',
      '1 tsp dried oregano',
      '1 tsp dried thyme',
      '4 cups mixed greens',
      '1 cucumber, diced',
      '1 cup cherry tomatoes, halved',
      '1/2 red onion, thinly sliced',
      '1/2 cup kalamata olives, pitted',
      '1/4 cup feta cheese, crumbled',
      'For dressing: 2 tbsp olive oil, 1 tbsp lemon juice, 1 tsp Dijon mustard, 1 clove garlic (minced), salt and pepper'
    ],
    instructions: [
      'Season chicken breasts with oregano, thyme, salt, and pepper.',
      'Heat 1 tbsp olive oil in a grill pan over medium-high heat. Grill chicken for 6-7 minutes per side until cooked through.',
      'Let chicken rest for 5 minutes, then slice.',
      'In a large bowl, combine mixed greens, cucumber, tomatoes, red onion, and olives.',
      'In a small bowl, whisk together dressing ingredients.',
      'Toss salad with dressing, top with grilled chicken and feta cheese.',
      'Serve immediately for a refreshing and energizing meal.'
    ],
    nutrition: [
      { name: 'Calories', value: '420 kcal' },
      { name: 'Protein', value: '35g' },
      { name: 'Carbs', value: '12g' },
      { name: 'Fat', value: '26g' }
    ],
    moodCategories: ['energetic', 'neutral']
  }
];

/**
 * Get recipes based on user's mood and preferences
 * @param mood Detected mood
 * @param dietaryRestrictions User's dietary restrictions
 * @param healthGoal User's health goal
 * @returns Array of matching recipes
 */
export const getRecipesForMood = async (
  mood: Mood,
  dietaryRestrictions: DietaryRestriction[],
  healthGoal: HealthGoal
): Promise<Recipe[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1800));
  
  // Filter recipes that match the mood
  let matchingRecipes = recipesDatabase.filter(recipe => 
    recipe.moodCategories.includes(mood)
  );
  
  // If no matches found, return a subset of recipes
  if (matchingRecipes.length === 0) {
    matchingRecipes = recipesDatabase.slice(0, 3);
  }
  
  // Filter by dietary restrictions (except 'none')
  if (dietaryRestrictions.length > 0 && !dietaryRestrictions.includes('none')) {
    matchingRecipes = matchingRecipes.filter(recipe => {
      // Check if recipe tags include any of the dietary restrictions
      return dietaryRestrictions.some(restriction => 
        recipe.tags.includes(restriction)
      );
    });
  }
  
  // Apply health goal filtering (in a real app, this would be more sophisticated)
  if (healthGoal !== 'none') {
    switch (healthGoal) {
      case 'weight-loss':
        matchingRecipes = matchingRecipes.filter(recipe => recipe.calories < 400);
        break;
      case 'weight-gain':
        matchingRecipes = matchingRecipes.filter(recipe => recipe.calories > 350);
        break;
      case 'energy-boost':
        matchingRecipes = matchingRecipes.filter(recipe => 
          recipe.tags.includes('energizing')
        );
        break;
      case 'mood-improvement':
        // In a real app, we would have more sophisticated logic here
        matchingRecipes = matchingRecipes.filter(recipe => 
          recipe.tags.includes('chocolate') || 
          recipe.tags.includes('comfort food')
        );
        break;
    }
  }
  
  // Return all matching recipes, or at least a few if no matches
  if (matchingRecipes.length === 0) {
    return recipesDatabase.slice(0, 3);
  }
  return matchingRecipes;
};

/**
 * Get a specific recipe by ID
 * @param id Recipe ID
 * @returns Recipe object or null if not found
 */
export const getRecipeById = async (id: string): Promise<Recipe | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const recipe = recipesDatabase.find(r => r.id === id);
  return recipe || null;
};