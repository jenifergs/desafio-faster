import { Request, Response } from 'express';
import { DrinkCategoriesService } from '../services/drinks-categories.service';

/**
 * @description Classe responsavel por controlar os metodos de categorias de bebidas.
 *
 * @export
 * @class DrinkCategoriesController
 */
export class DrinkCategoriesController {
  /**
   * Cria uma instancia de DrinkCategoriesController.
   * @param {DrinkCategoriesService} service - Instancia do serviço de categorias de bebidas.
   * @memberof DrinkCategoriesController
   */
  constructor(private readonly service: DrinkCategoriesService) {}

  /**
   * @method getDrinkCategories
   * @description Metodo responsavel por retornar todas as categorias de bebidas
   *
   * @param {Request} req
   * @param {Response} res
   * @return {*}  {Promise<unknown>}
   * @memberof DrinkCategoriesController
   */
  public async getDrinkCategories(
    req: Request,
    res: Response,
  ): Promise<unknown> {
    try {
      const drinkCategories = await this.service.getAllCategories();
      return res.status(200).json(drinkCategories);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
