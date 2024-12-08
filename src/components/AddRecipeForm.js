import React, { useState } from 'react';

const AddRecipeForm = ({ onAddRecipe }) => {
    const [recipe, setRecipe] = useState({
        title: "",
        description: "",
        ingredients: "",
        image: null,
        imagePreview: null,
    });

   const handleInputChange = (e) => {
       const { name, value } = e.target;
       setRecipe({ ...recipe, [name]: value });
   };

   const handleImageUpload = (e) => {
       const file = e.target.files[0];
       if (file) {
           setRecipe({
               ...recipe, 
               image: file, 
               imagePreview: URL.createObjectURL(file),
           });
       }
   };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!recipe.title || !recipe.description || !recipe.ingredients || !recipe.image) {
            alert("Please fill out all fields and upload an image.");
            return;
        }
        onAddRecipe(recipe);
        setRecipe({
            title: "", 
            description: "",
            ingredients: "",
            image: null, 
            imagePreview: null,
        });
};

return (
    <form onSubmit={handleSubmit}>
    <div>
        <label>Recipe Name:</label>
        <input 
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleInputChange}
            required
        />
    </div>
    <div>
        <label>Ingredients:</label>
        <input
            type="text"
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleInputChange}
        />
    </div>
    <div>
        <label>Instructions:</label>
        <textarea
            name="description"
            value={recipe.description}
            onChange={handleInputChange}
        />
    </div>
    <div>
        <label>Upload Image:</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {recipe.imagePreview && (
            <div>
                <img
                    src={recipe.imagePreview}
                    alt="Recipe Preview"
                    style={{ width: "200px", marginTop: "10px" }}
                />
            </div>
        )}
    </div>
    <button type="submit">Add Recipe</button>
    </form>
);
};

export default AddRecipeForm;