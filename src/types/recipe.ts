export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  cookTime: number;
  servings: number;
  calories: number;
  difficulty: string;
  tags: string[];
  ingredients: string[];
  instructions: string[];
  nutrition: { name: string; value: string }[];
  moodCategories: string[];
}