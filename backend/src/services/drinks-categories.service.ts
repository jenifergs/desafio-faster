import { PrismaClient } from '@prisma/client';
import { DrinkCategoryModel } from '../models/drinks-category.model';

/**
 * Drink categories service
 * @description Classe responsável por conter a lógica de negócio das categorias de bebidas.
 *
 * @export
 * @class DrinkCategoriesService
 */
export class DrinkCategoriesService {
  /**
   * Cria uma instancia de DrinkCategoriesService.
   * @param {PrismaClient} repository - Instancia do repositorio com conexão com o banco de dados.
   * @memberof DrinkCategoriesService
   */
  constructor(private readonly repository: PrismaClient) {}

  /**
   * @method getAllCategories
   * @description Metodo responsavel por retornar todas as categorias de bebidas
   *
   * @return {*}  {Promise<DrinkCategoryModel[]>}
   * @memberof DrinkCategoriesService
   */
  public async getAllCategories(): Promise<DrinkCategoryModel[]> {
    try {
      const categories = await this.repository.drink_categories.findMany();
      return categories;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
