/**
 * @file Este arquivo exporta todas as instâncias dos serviços e controladores usados na aplicação.
 * @since 1.0.0
 * @description Este arquivo é usado para evitar dependências circulares. Ele é usado para importar os serviços e controladores em outros arquivos.
 * Ele é usado para proporcionar uma inversão de controle na aplicação, ou sej a, os serviços e controladores não precisam saber como são criados, eles apenas usam as instâncias criadas aqui.
 * Esse decisão de design é dada pelo fato de que os serviços e controladores não precisam saber como são criados, posteriormente, se for necessário, podemos alterar a forma como eles são criados sem alterar o código deles.
 */

import { PrismaClient } from '@prisma/client';
import { AuthService } from '../services/auth.service';
import { CypherService } from '../services/cypher.service';
import { JWTService } from '../services/jwt.service';
import { UserService } from '../services/users.service';
import { DrinksService } from '../services/drinks.service';
import { DrinkCategoriesService } from '../services/drinks-categories.service';
import { AuthController } from '../controllers/auth.controller';
import { UserController } from '../controllers/users.controller';
import { HealthcheckController } from '../controllers/healthcheck.controller';
import { DrinksController } from '../controllers/drinks.controller';
import { DrinkCategoriesController } from '../controllers/drink-categories.controller';

// variables
/**
 * @description Contém a instância principal do repositório do Prisma.
 */
const repository = new PrismaClient();
/**
 * @description É o número de rounds usados para gerar o salt do bcrypt.
 */
const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
/**
 * @description Está variável contém a chave secreta usada para gerar o token JWT.
 */
const jwtSecret = process.env.SECRET || 'secret';

// services

/**
 * @description Contém a instância do serviço de criptografia.
 * Capaz de criptografar e comparar senhas.
 */
export const cypherService = new CypherService(saltRounds);

/**
 * @description Contém a instância do serviço de token JWT.
 * Capaz de gerar e verificar tokens JWT.
 */
export const jwtService = new JWTService(jwtSecret);

/**
 * @description Contém a instância do serviço de autenticação.
 */
export const authService = new AuthService(cypherService, jwtService);

/**
 * @description Contém a instância do serviço de usuários.
 */
export const userService = new UserService(repository, cypherService);

/**
 * @description Contém a instância do serviço de bebidas.
 */
export const drinksService = new DrinksService(repository);

/**
 * @description Contém a instância do serviço de categorias de bebidas.
 */
export const drinksCategoriesService = new DrinkCategoriesService(repository);

// controllers

/**
 * @description Contém a instância do controlador de autenticação.
 */
export const authController = new AuthController(authService, userService);

/**
 * @description Contém a instância do controlador de usuários.
 */
export const userController = new UserController(userService);

/**
 * @description Contém a instância do controlador de healthcheck.
 */
export const healthcheckController = new HealthcheckController();

/**
 * @description Contém a instância do controlador de bebidas.
 */
export const drinksController = new DrinksController(drinksService);

/**
 * @description Contém a instância do controlador de categorias de bebidas.
 */
export const drinkCategoriesController = new DrinkCategoriesController(
  drinksCategoriesService,
);
