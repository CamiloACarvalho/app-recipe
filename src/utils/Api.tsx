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
export const baseURL = (path: string) => `www.the${path.includes('meal')
  ? 'meal'
  : 'cocktail'}db.com/api/json/v1/1/`;

// Aqui recebe um caminho, um tipo e um valor e retorna a URL do endpoint.
export const endPoint = (path: string, type: string, value: string) => {
  // Verifica o tipo e constrói a URL do endpoint conforme necessário.
  if (type === 'name') {
    return `${baseURL(path)}search.php?s=${value}`;
  } if (type === 'firstLetter') {
    return `${baseURL(path)}filter.php?f=${value}`;
  } if (type === 'ingredient') {
    return `${baseURL(path)}search.php?i=${value}`;
  }
  // Caso contrário, retorna o endpoint padrão.
  return `${baseURL(path)}defaultEndpoint.php`;
};

// Pensei em criar uma constante url que será a URL a ser buscada na API.
// const url = baseURL + endPoint;

// Seria fazer um fetch da URL que deseja buscar.
export const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// mapDrinkData que recebe um drink e retorna um objeto com os dados padronizados da API de cocktails, seria o retorno da API com as buscas desejadas
// O Thiago Paz na monitoria me disse para criar uma função de map para que fosse renderizado os dados da API de drinks e de meals de forma padronizada.
// Pesquisei como fazer isso mas fiquei com dúvida como passar os parâmetros para a função.
export const mapDrinkData = (drink) => {
  return {
    id: drink.idDrink,
    name: drink.strDrink,
    category: drink.strCategory,
    instructions: drink.strInstructions,
    ingredients: [
      { name: drink.strIngredient1, measure: drink.strMeasure1 },
      { name: drink.strIngredient2, measure: drink.strMeasure2 },
    ],
    thumbnail: drink.strDrinkThumb,
  };
};

// mapMealData que recebe uma refeição e retorna um objeto com os dados padronizados da API de refeições.
export const mapMealData = (meal) => {
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    category: meal.strCategory,
    instructions: meal.strInstructions,
    ingredients: [
      { name: meal.strIngredient1, measure: meal.strMeasure1 },
      { name: meal.strIngredient2, measure: meal.strMeasure2 },
    ],
    thumbnail: meal.strMealThumb,
  };
};
