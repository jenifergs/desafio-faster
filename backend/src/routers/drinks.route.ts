/**
 * @file Arquivo responsável por exportar o roteador de bedidas.
 */

import { Routers } from '../utils/routers';
import { drinksController } from '../utils/instances';
import { verifyJwtAccessToken } from '../middlewares/verify-jwt-access-token';

export const drinksRouter = new Routers(
  '/drinks',
  drinksController,
).setupRoutes((router, controller) => {
  router
    .get('/', verifyJwtAccessToken, async (req, res) =>
      controller.getAllDrinks(req, res),
    )
    .get('/search', verifyJwtAccessToken, async (req, res) =>
      controller.searchDrinksByName(req, res),
    )
    .get('/categories/:categoryId', verifyJwtAccessToken, async (req, res) =>
      controller.getDrinksByCategory(req, res),
    )
    .get('/categories/:categoryId/search', verifyJwtAccessToken, async (req, res) =>
      controller.getDrinksByCategoryAndName(req, res),
    )
    .patch('/:id/like', verifyJwtAccessToken, async (req, res) =>
      controller.toggleDrinkLike(req, res),
    );
});
