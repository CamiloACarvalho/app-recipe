// Bucar pelo nome
// -> www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
// -> www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita
// Padrão
// -> www.the{meal or cocktail}db.com/api/json/v1/1/search.php?s={search}

// -----------------------------------------------------------------------

// buscar pela primeira letra
// -> www.themealdb.com/api/json/v1/1/search.php?f=a
// -> www.thecocktaildb.com/api/json/v1/1/search.php?f=a
// Padrão
// -> www.the{meal or cocktail}db.com/api/json/v1/1/search.php?f={search}

// -----------------------------------------------------------------------

// buscar pelo nome do ingrediente
// -> www.themealdb.com/api/json/v1/1/search.php?i=list
// -> www.thecocktaildb.com/api/json/v1/1/search.php?i=vodka
// Padrão
// -> www.the{meal or cocktail}db.com/api/json/v1/1/search.php?i={search}

// A ideia aqui é criar uma função que gere a URL de acordo com o tipo de busca e o valor de busca.
export const baseURL = (resourceType: string) => (
  `www.the${resourceType}db.com/api/json/v1/1`
);

export const endPoint = (
  resource: string,
  search: string,
  value: string,
) => {
  switch (search) {
    case 'name':
      return `${baseURL(resource)}/search.php?s=${value}`;
    case 'firstLetter':
      return `${baseURL(resource)}/filter.php?f=${value}`;
    case 'ingredient':
      return `${baseURL(resource)}/search.php?i=${value}`;
    default:
      return `${baseURL(resource)}/defaultEndpoint.php`;
  }
};

export const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const mapData = (item: any, type: string) => {
  const ingredients = [];

  // Itera sobre os itens de ingredientes até encontrar um valor nulo ou vazio
  for (let i = 1; i <= 10; i++) {
    const ingredientName = item[`strIngredient${i}`];
    const ingredientMeasure = item[`strMeasure${i}`];

    if (!ingredientName || !ingredientMeasure) {
      // Se encontrou um valor nulo ou vazio, interrompe o loop
      break;
    }

    ingredients.push({ name: ingredientName, measure: ingredientMeasure });
  }

  return {
    id: item[`id${type}`],
    name: item[`str${type}`],
    category: item.strCategory,
    instructions: item.strInstructions,
    ingredients,
    thumbnail: item[`str${type}Thumb`],
  };
};

export const mapDrinkData = (drink: any) => mapData(drink, 'Drink');
export const mapMealData = (meal: any) => mapData(meal, 'Meal');
