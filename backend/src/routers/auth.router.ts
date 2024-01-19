/**
 * @file Arquivo responsável por exportar o roteador de autenticação.
 */
import { Routers } from '../utils/routers';
import { authController } from '../utils/instances';
import { verifyLogin } from '../middlewares/verify-login';

export const authRouter = new Routers('/auth', authController).setupRoutes(
  (router, controller) => {
    router.post('/login', verifyLogin, async (req, res) =>
      controller.login(req, res),
    );
  },
);
