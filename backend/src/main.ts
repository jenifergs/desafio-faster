/**
 * @file Entry point da aplicação.
 * Arquivo responsavel por iniciar a aplicação - bootstrap.
 *
 *
 */
import express from 'express';
import cors from 'cors';
import { serve, setup } from 'swagger-ui-express';

import { Server } from './server';
import { healthcheckRouterConfig } from './routers/healthcheck.router';
import { usersRouter } from './routers/users.router';
import { authRouter } from './routers/auth.router';
import { drinksCategoriesRouter } from './routers/drinks-categories.router';
import { drinksRouter } from './routers/drinks.route';
import { dbHandler } from './utils/db-handler';

/**
 * @description Função responsavel por iniciar a aplicação.
 * Carrega porta, e inicializa o servidor.
 */
async function bootstrap() {
  const swaggerJson = require('../swagger.json');
  const PORT = Number(process.env.PORT) || 3000;
  const server = new Server({
    port: PORT,
    routers: [
      healthcheckRouterConfig,
      authRouter,
      usersRouter,
      drinksCategoriesRouter,
      drinksRouter,
    ],
    globalMiddlewares: [
      { middleware: [express.json()] },
      { middleware: [express.urlencoded({ extended: true })] },
      { middleware: [cors({
        origin: '*',
        allowedHeaders: '*',
        methods: '*',
      })] },
      { path: '/assets', middleware: [express.static('public')] },
      { path: '/docs/private', middleware: [express.static('docs/private')] },
      { path: '/docs/public', middleware: [serve, setup(swaggerJson)] },
    ],
  });

  await server.start();
}

console.log('Iniciando aplicação...');
bootstrap();
