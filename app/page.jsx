"use client";
import { useState } from 'react';
import axios from 'axios';

// Recipe Finder Component
export default function Home() {
  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!ingredient) return; // Prevent empty search

    setLoading(true); // Start loading
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients`,
        {
          params: {
            ingredients: ingredient,
            apiKey: process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY,
          },
        }
      );
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Recipe Finder</h1>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="Enter ingredient (egg, chicken, tomato ...)"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
        />
        <button
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {loading && <p className="text-center">Loading...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.length === 0 && !loading ? (
          <p className="text-center">No recipes found. Try searching again.</p>
        ) : (
          recipes.map((recipe) => (
            <div key={recipe.id} className="border p-4 rounded-lg shadow-lg">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold">{recipe.title}</h3>
              <a
                href={`https://spoonacular.com/recipes/${recipe.title
                  .replace(/\s+/g, '-')
                  .toLowerCase()}-${recipe.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 mt-2 block"
              >
                View Recipe
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
