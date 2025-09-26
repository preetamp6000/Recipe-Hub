export const extractIngredients = (recipe) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure ? measure.trim() : ''
      });
    }
  }
  return ingredients;
};

export const formatInstructions = (instructions) => {
  if (!instructions) return [];
  return instructions
    .split(/\r\n|\r|\n/)
    .filter(step => step.trim())
    .map((instruction, index) => ({
      step: index + 1,
      instruction: instruction.trim()
    }));
};