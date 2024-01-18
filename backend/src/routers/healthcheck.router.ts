/**
 * @file Arquivo responsável por exportar o roteador de healthcheck.
 */
import { Routers } from '../utils/routers';
import { healthcheckController } from '../utils/instances';

export const healthcheckRouterConfig = new Routers(
  '/',
  healthcheckController,
).setupRoutes((router, controller) => {
  router
    .get('/', (req, res) => controller.healthcheck(req, res))
    .get('/ping', (req, res) => controller.getPing(req, res))
    .head('/', (req, res) => controller.isAlive(req, res));
});
