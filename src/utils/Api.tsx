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

export const getBase = (path: string) => `www.the${path.includes('meal')
  ? 'meal'
  : 'cocktail'}db.com/api/json/v1/1/`;

// Define uma função getEnd que recebe um caminho, um tipo e um valor, e retorna a URL do endpoint.
export const getEnd = (path: string, type: string, value: string) => {
  // Verifica o tipo e constrói a URL do endpoint conforme necessário.
  if (type === 'search') {
    return `${getBase(path)}search.php?s=${value}`;
  } if (type === 'filter') {
    return `${getBase(path)}filter.php?f=${value}`;
  } if (type === 'ingredient') {
    return `${getBase(path)}search.php?i=${value}`;
  }
  // Trata outros casos, se necessário
  return `${getBase(path)}defaultEndpoint.php`;
};
