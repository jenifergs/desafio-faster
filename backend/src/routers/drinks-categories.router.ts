/**
 * @file Arquivo responsável por exportar o roteador de categorias de drinks.
 */
import { drinkCategoriesController } from '../utils/instances';
import { Routers } from '../utils/routers';

export const drinksCategoriesRouter = new Routers(
  '/drinks-categories',
  drinkCategoriesController,
).setupRoutes((router, controller) => {
  router.get('/', async (req, res) => controller.getDrinkCategories(req, res));
});
