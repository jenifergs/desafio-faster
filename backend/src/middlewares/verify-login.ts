/**
 * @file Exporta a função de middleware que verifica se os parametros de login são válidos.
 */

import { NextFunction, Request, Response } from 'express';
import { verifyExistenceAndFormat } from '../utils/verify-existence-and-format.middleware';

/**
 * @function verifyLogin
 * @description Middleware responsavel por verificar se os parametros de login são válidos. Ou seja, se o email e a senha estão no formato correto.
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const verifyLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const emailRegEx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const validators = [
    verifyExistenceAndFormat(req, res, 'email', emailRegEx),
  ];

  for (const validator of validators) {
    const response = await validator;
    if (response.hasError) {
      return;
    }
  }
  next(); 
};
