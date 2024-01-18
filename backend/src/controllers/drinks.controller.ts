import { DrinksService } from '../services/drinks.service';
import { Request, Response } from 'express';

/**
 * @description Classe responsavel por controlar os metodos de bebidas. Permite consultar bebidas utilizando diversas formas de filtro.
 * @export
 * @class DrinksController
 */
export class DrinksController {
  /**
   * Cria uma instancia de DrinksController.
   * @param {DrinksService} drinksService - Instancia do serviço de bebidas.
   * @memberof DrinksController
   */
  constructor(private drinksService: DrinksService) {}

  /**
   * @method getAllDrinks
   * @description Metodo responsavel por retornar todas as bebidas cadastradas.
   * > Metodo utiliza o id do usuário para verificar se o usuário favoritou ou não a bebida.
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof DrinksController
   */
  public async getAllDrinks(req: Request, res: Response) {
    try {
      const { userId } = req.headers;
      const drinks = await this.drinksService.getAllDrinks(Number(userId));
      res.status(200).json(drinks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * @method searchDrinksByName
   * @description Metodo responsavel por retornar bebidas que contenham o nome passado como parametro.
   * > Metodo utiliza o id do usuário para verificar se o usuário favoritou ou não a bebida.
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof DrinksController
   */
  public async searchDrinksByName(req: Request, res: Response) {
    try {
      const { name } = req.query;
      const { userId } = req.headers;
      const drinks = await this.drinksService.searchDrinksByName(
        String(name),
        Number(userId),
      );
      res.status(200).json(drinks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * @method toggleDrinkLike
   * @description Metodo responsavel por favoritar ou desfavoritar uma bebida.
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof DrinksController
   */
  public async toggleDrinkLike(req: Request, res: Response) {
    try {
      const { userId } = req.headers;
      const { id } = req.params;

      await this.drinksService.toggleDrinkLike(Number(id), Number(userId));
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * @method getDrinksByCategoryAndName
   * @description Metodo responsavel por retornar bebidas que contenham o nome passado como parametro e que pertençam a categoria passada como parametro.
   * > Metodo utiliza o id do usuário para verificar se o usuário favoritou ou não a bebida.
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof DrinksController
   */
  public async getDrinksByCategoryAndName(req: Request, res: Response) {
    try {
      const { categoryId } = req.params;
      const { name } = req.query;
      const { userId } = req.headers;

      const drinks = await this.drinksService.getDrinksByCategoryAndName(
        Number(categoryId),
        String(name),
        Number(userId),
      );
      res.status(200).json(drinks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * @method getDrinksByCategory
   * @description Metodo responsavel por retornar bebidas que pertençam a categoria passada como parametro.
   *  > Metodo utiliza o id do usuário para verificar se o usuário favoritou ou não a bebida.
   * @param {Request} req
   * @param {Response} res
   * @memberof DrinksController
   */
  public async getDrinksByCategory(req: Request, res: Response) {
    try {
      const { categoryId } = req.params;
      const { userId } = req.headers;
      const drinks = await this.drinksService.getDrinksByCategoryId(
        Number(categoryId),
        Number(userId),
      );
      res.status(200).json(drinks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
