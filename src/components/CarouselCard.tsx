import { Carousel } from 'react-bootstrap';
import { CarouselCardProps, DrinkType, MealType } from '../types/types';

export default function CarouselCard({ recomendation,
  handleSelect, carouselIndex }: CarouselCardProps) {
  return (
    <Carousel activeIndex={ carouselIndex } onSelect={ handleSelect }>
      {recomendation.map((item, index) => (
        index % 2 === 0 && (
          <Carousel.Item key={ index }>
            <div className="d-flex justify-content-around">
              <div>
                <img
                  data-testid={ `${index}-recommendation-card` }
                  src={
            (item as MealType).strMealThumb
            || (item as DrinkType).strDrinkThumb
          }
                  alt={
            (item as MealType).strMeal
            || (item as DrinkType).strDrink
          }
                />
                <Carousel.Caption
                  className="carousel-caption-1"
                >
                  <h3 data-testid={ `${index}-recommendation-title` }>
                    {(item as MealType).strMeal
              || (item as DrinkType).strDrink}
                  </h3>
                </Carousel.Caption>
              </div>
              {recomendation[index + 1] && (
                <div>
                  <img
                    data-testid={ `${index + 1}-recommendation-card` }
                    src={
              (recomendation[index + 1] as MealType).strMealThumb
              || (recomendation[index + 1] as DrinkType).strDrinkThumb
            }
                    alt={
              (recomendation[index + 1] as MealType).strMeal
              || (recomendation[index + 1] as DrinkType).strDrink
            }
                  />
                  <Carousel.Caption
                    className="carousel-caption-2"
                  >
                    <h3 data-testid={ `${index + 1}-recommendation-title` }>
                      {(recomendation[index + 1] as MealType).strMeal
                || (recomendation[index + 1] as DrinkType).strDrink}
                    </h3>
                  </Carousel.Caption>
                </div>
              )}
            </div>
          </Carousel.Item>
        )
      ))}
    </Carousel>
  );
}
