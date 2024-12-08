/*DanCam8845-project-app*/
import './App.css';
import React, { useState } from 'react';
import Header from './components/Header';
import AddRecipeForm from './components/AddRecipeForm';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRecipeIndex, setEditingRecipeIndex] = useState(null);

  //Add a new recipe
  const addRecipe = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
    setShowAddForm(false);
  };

  //Update an existing recipe
  const updateRecipe = (updatedRecipe) => {
    const updatedRecipes = [...recipes];
    updatedRecipes[editingRecipeIndex] = updatedRecipe;
    setRecipes(updatedRecipes);
    setEditingRecipeIndex(null);
  };

  //delete a recipe
  const deleteRecipe = (index) => {
    const updatedRecipes = recipes.filter((_, i) => i !== index);
    setRecipes(updatedRecipes);
  };

  return (
    <div className="App">
      <Header />
      <div className="button-container">
      <button onClick={() => setShowAddForm(true)}>Add Recipe</button>
      <button onClick={() => editingRecipeIndex === null ? alert('Select a recipe to edit.') : setShowAddForm(true) } > Edit Recipe </button> 
      <button onClick={() => { if (recipes.length === 0) { alert('No recipes to delete.'); } 
          else { const index = prompt( 'Enter the index of the recipe to delete (starting from 0):' ); 
          if (index >= 0 && index < recipes.length) { deleteRecipe(parseInt(index, 10)); } 
            else { alert('Invalid index.'); } } }} > Delete Recipe </button>
      </div>
      {showAddForm && (
        <AddRecipeForm
          onAddRecipe={editingRecipeIndex === null ? addRecipe : updateRecipe}
          editingRecipe={editingRecipeIndex !==null ? recipes[editingRecipeIndex] : null}
        />
      )}

      <div>
        <h2>Your Recipes:</h2>
        {recipes.map((recipe, index) => (

          <div key={index} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}
          onClick={() => setEditingRecipeIndex(index)} //select recipe to edit
          >
          
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <p>Ingredients: {recipe.ingredients}</p>
          {recipe.imagePreview && (
            <img
            src={recipe.imagePreview}
            alt={recipe.title}
            style={{ width: "200px" }}
          />
          )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default App;
