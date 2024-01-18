/**
 * @file Arquivo responsável por exportar o roteador de usuarios.
 */

import { Router } from 'express';
import { Routers } from '../utils/routers';
import { UserController } from '../controllers/users.controller';
import { verifyUserCreation } from '../middlewares/verify-user-creation';
import { userController } from '../utils/instances';
import { verifyJwtAccessToken } from '../middlewares/verify-jwt-access-token';

export const usersRouter = new Routers('/users', userController).setupRoutes(
  (router: Router, controller: UserController) => {
    router
      .post('/', verifyUserCreation, (req, res) => controller.create(req, res))
      .get('/liked-drinks', verifyJwtAccessToken, (req, res) =>
        controller.getLikedDrinks(req, res),
      );
  },
);
