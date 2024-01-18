/**
 * Drinks model
 * @description Interface que representa o modelo de bebidas.
 *
 * @export
 * @interface DrinksModel
 */
export interface DrinksModel {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  categoryId: number;
  categoryName: string;
  isLiked: boolean;
}
