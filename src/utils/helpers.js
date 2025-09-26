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
  return instructions
    .split('\r\n')
    .filter(step => step.trim())
    .map((step, index) => ({
      step: index + 1,
      instruction: step.trim()
    }));
};

export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};