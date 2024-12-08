import React, { useState, useEffect } from 'react';

const AddRecipeForm = ({ addRecipe, editMode, initialData }) => {
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');

    //populate form if editing
    useEffect(() => {
        if (editMode && initialData) {
            setName(initialData.name);
            setIngredients(initialData.ingredients);
            setInstructions(initialData.instructions);
        }
    }, [editMode, initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && ingredients && instructions) {
            addRecipe({ name, ingredients, instructions });
            setName('');
            setIngredients('');
            setInstructions('');
        } else {
            alert('Please fill out all feilds!');
    }
};

return (
    <form onSubmit={handleSubmit}>
    <h3>{editMode ? 'Edit Recipe' : 'Add New Recipe'}</h3>
    <div>
        <label>Recipe Name:</label>
        <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter recipe name" />
    </div>
    <div>
        <label>Ingredients:</label>
        <textarea
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Enter ingredients (comma-separated)" />
    </div>
    <div>
        <label>Instructions:</label>
        <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Enter instructions" />
    </div>
    <button type="submit">{editMode ? 'Update Recipe' : 'Add Recipe'}</button>
    </form>
);
};

export default AddRecipeForm;